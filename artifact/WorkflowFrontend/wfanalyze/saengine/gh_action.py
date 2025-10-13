import json
import logging
from distutils.version import StrictVersion
import os
import random
from wfanalyze.common.clone_action import clone_repo

from wfanalyze.common.exceptions import CodeQLError
from wfanalyze.common.githandler import (git_switch_to_branch,
                                         git_switch_to_commit,
                                         git_switch_to_tag)
from wfanalyze.common.pylogger import get_logger
from wfanalyze.common.utils import copy_folder, delete_folder, find_folder, is_dir, join_paths, create_folder
from wfanalyze.saengine.codeql_handler import (compile_codeql_db,
                                               is_valid_codeql_db,
                                               run_codeql_query)

ACTIONS_DIR = "FIX_ME"
CODEQL_DIR = "FIX_ME"

COMMIT_REF = 0
TAG_REF = 1
BRANCH_REF = 2
NON_THIRD_PARTY_REF = 3
NO_VERSION = 4
DOCKER_TAG_REF = 5
DOCKER_COMMIT_REF = 6
DOCKER_NO_REF = 7
NON_FIRST_PARTY_REF = 8

logger = get_logger("GHAction", logging.DEBUG)

def split_action_name(action_name):
    chunks = action_name.split("/") 
    if len(chunks) < 2:
        return None, None
    
    if len(chunks) > 2:
        return chunks[0] + "/" + chunks[1], "/".join(chunks[2:])
    else:
        return chunks[0] + "/" + chunks[1], None

def get_action_db(action, config : dict = {}):
    action_name = action["name"]
    action_version = action["version"]
    repo, path = split_action_name(action["name"])

    if repo == None:
        return None

    codeql_dir = join_paths(config['codeql_db_dir'], repo.replace("/", "#") + "#" + action_version.replace("/", "@") + "#1")
    action_temp_dir = join_paths(config['temp_dir'], repo.replace("/", "#") + "##" + action_version.replace("/", "@") + "##" + str(random.randint(0, 1000)))
    delete_folder(codeql_dir)
    if not is_dir(codeql_dir) or not is_valid_codeql_db(codeql_dir):
        logger.info(f"CodeQL database for {action_name}:{action_version} not found")
        delete_folder(codeql_dir)

        folder_name = repo.replace("/", "#")
        action_dir = find_folder(config['actions_dir'], folder_name)

        if action_dir == None:
            folder_name = repo.replace("/", "\#")
            action_dir = find_folder(config['actions_dir'], folder_name)

            if action_dir == None:
                action_dir = clone_repo(repo)

        try:
            copy_folder(action_dir, action_temp_dir)
        except Exception as e:
            logger.error(f"Could not copy action {action_name} to {action_temp_dir} - {e}")
        logger.info(f"Action {action_name} copied to {action_temp_dir}") 

        vtype = get_version_type(action_version)
        if vtype == NO_VERSION:
            logger.error(f"Could not find version for action [{action_name}]")
            raise Exception(f"Could not find version for action [{action_name}]")
        elif vtype == COMMIT_REF:
            if not git_switch_to_commit(action_temp_dir, action_version):
                logger.error(f"Could not switch to commit [{action_version}] for action [{action_name}]")
                raise Exception(f"Could not switch to commit [{action_version}] for action [{action_name}]")
        elif vtype == TAG_REF:
            if not git_switch_to_tag(action_temp_dir, action_version):
                logger.error(f"Could not switch to tag [{action_version}] for action [{action_name}]")
                raise Exception(f"Could not switch to tag [{action_version}] for action [{action_name}]")
        elif vtype == BRANCH_REF:
            if not git_switch_to_branch(action_temp_dir, action_version):
                logger.error(f"Could not switch to branch [{action_version}] for action [{action_name}]")
                raise Exception(f"Could not switch to branch [{action_version}] for action [{action_name}]")
        else:
            logger.error(f"Unknown version type [{vtype}] for action [{action_name}]")
            raise Exception(f"Unknown version type [{vtype}] for action [{action_name}]")

        #logger.info(f"Now creating codeql DB for {config['action_name']}")11
        compile_codeql_db(action_temp_dir, codeql_dir)

    # Step 4 : Run the Codeql Queries on the DB
    results = run_codeql_query(codeql_dir)

    # remove action_temp_dir
    if is_dir(action_temp_dir):
        delete_folder(action_temp_dir)
    return results

def do_actions_static_analysis(action_name, action_version, action_dir) -> bool:
    work_dir = os.environ.get("WFANALYZE_WORK_DIR", "/mnt/drive/reactions/actions")
    # temp dir
    if not is_dir(join_paths(work_dir, "temp")):
        create_folder(work_dir, "temp")

    if not is_dir(join_paths(work_dir, "dbs")):
        create_folder(work_dir, "dbs")

    # copy the action_dir to a temp dir
    temp_dir = join_paths(work_dir, "temp", action_name.replace("/", "#") + "#" + action_version.replace("/", "@") + "#" + str(random.randint(0, 1000000)))
    codeql_dir = join_paths(work_dir, "dbs", action_name.replace("/", "#") + "#" + action_version.replace("/", "@") + "#" + str(random.randint(0, 1000000)))
    try:
        copy_folder(action_dir, temp_dir)
    except Exception as e:
        logger.error(f"Could not copy action [{action_name}] to temp dir [{temp_dir}].. continuing")

    compile_codeql_db(temp_dir, codeql_dir)
    # Step 4 : Run the Codeql Queries on the DB
    results = run_codeql_query(codeql_dir)

    # Step 5 : Add the results to the MongoDB
    # TODO: revisit to check error is added properly
    # IF error is not raised, then it is not added to the DB
    return {"details" : results}

def get_action_taint(self):
    if self.action_version != None and self.action_version != None:
        curr_action = action_exists(self.action_name, self.action_version)
        if curr_action != None:
            print(curr_action)
            print(json.dumps(curr_action['details']))
        else:
            # Action is not there in the DB
            try:
                do_actions_static_analysis({
                    "action_name": self.action_name,
                    "action_version": self.action_version,
                    "actions_dir" : ACTIONS_DIR,
                    "codeql_db_dir" : CODEQL_DIR,
                })
            except CodeQLError as ce:
                logger.error(f"Codeql error for {self.action_name} @ {self.action_version}")
                add_action(self.action_name, self.action_version, True, ce.get_error_dict())

def get_version_type(version):
    if version == None:
        return NO_VERSION
    if len(version) == 40:
        try:
            int(version, 16)
            return COMMIT_REF
        except Exception:
            pass
    elif version.startswith("v") and is_version_number(version[1:]):
        return TAG_REF
    elif version == "latest":
        return TAG_REF
    elif version.startswith("releases/v") and is_version_number(version[11:]):
        return TAG_REF
    else:
        if is_version_number(version.strip()): 
            return TAG_REF
        else:
            return BRANCH_REF


def is_version_number(number):
    # Try to convert to int
    try:
        int(number)
        return True
    except Exception:
        pass
    # try to convert to version number
    try:
        StrictVersion(number)
        return True
    except Exception:
        return False