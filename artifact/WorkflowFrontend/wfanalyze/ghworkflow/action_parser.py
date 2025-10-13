import logging
import random
from typing import List

import yaml
from wfanalyze.common.clone_action import clone_repo
from wfanalyze.common.githandler import git_switch_to_branch, git_switch_to_commit, git_switch_to_tag

from wfanalyze.common.pylogger import get_logger
from wfanalyze.common.utils import copy_folder, delete_folder, find_folder, is_file, join_paths
from wfanalyze.ghworkflow.action_core import BRANCH_REF, COMMIT_REF, NO_VERSION, TAG_REF, WorkflowStep
from wfanalyze.ghworkflow.ghvars import get_github_variables_from_string
from wfanalyze.saengine.gh_action import get_version_type
from wfanalyze.saengine.tainted_inputs import is_CIvar_tainted

logger = get_logger("action_parser", logging.DEBUG)

def split_action_name(action_name):
    chunks = action_name.split("/") 
    if len(chunks) < 2:
        return None, None
    
    if len(chunks) > 2:
        return chunks[0] + "/" + chunks[1], "/".join(chunks[2:])
    else:
        return chunks[0] + "/" + chunks[1], None

def parse_action_yaml(action_name, action_version, config : dict = {}):
    repo, path = split_action_name(action_name)

    if repo == None:
        return None
    
    folder_name = repo.replace("/", "#")
    action_dir = find_folder(config['actions_dir'], folder_name)

    if action_dir == None:
        folder_name = repo.replace("/", "\#")
        action_dir = find_folder(config['actions_dir'], folder_name)

        if action_dir == None:
            action_dir = clone_repo(repo)
    
    action_temp_dir = join_paths(config['temp_dir'], folder_name + "##" + action_version + "##" + str(random.randint(0, 1000000)))
    try:
        copy_folder(action_dir, action_temp_dir)
    except Exception as e:
        logger.info(f"Action copying error.. but still continuing {e}")
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

    if path != None:
        action_yml_path = join_paths(action_temp_dir, path, "action.yml")
    else:
        action_yml_path = join_paths(action_temp_dir, "action.yml")

    if not is_file(action_yml_path):
        if path != None:
            action_yml_path = join_paths(action_temp_dir, path, "action.yaml")
        else:
            action_yml_path = join_paths(action_temp_dir, "action.yaml")

        if not is_file(action_yml_path):
            logger.error(f"Could not find action.yml {action_yml_path} for action [{action_name}]")
            raise Exception(f"Could not find action.yml {action_yml_path} for action [{action_name}]")

    try:
        yaml_dict = yaml.safe_load(open(action_yml_path, "r").read())
    except:
        logger.error(f"Could not parse action.yml for action [{action_name}]")
        raise Exception(f"Could not parse action.yml for action [{action_name}]")

    delete_folder(action_temp_dir)
    return ActionYML(yaml_dict)

class ActionYML(object):
    def __init__(self, content : dict = {}):
        self.content = content
        self.parsed_inputs = []
        self.parsed_outputs = []
        self.steps : List[WorkflowStep] = []
        self.deps = []
        self.parse()
    
    def parse(self):
        self.name = self.content.get("name", "")
        self.inputs = self.content.get("inputs", {})
        self.outputs = self.content.get("outputs", {})
        self.runs = self.content.get("runs", None)
        self.parse_inputs()
        self.parse_outputs()
        self.parse_runs()

    def convert_to_IR(self):
        ir = {}
        
        ir["name"] = self.name

        ir["inputs"] = self.parsed_inputs
        ir["outputs"] = self.parsed_outputs
        ir["CIvars"] = []

        ir["plugin"] = self.plugin
        ir["type"] = self.type
        ir["isComposite"] = self.is_composite
        ir["dependencies"] = self.deps

        if self.is_composite:
            ir["tasks"] = {}
            for step in self.steps:
                ir["tasks"][step.id] = step.convert_to_IR()
                ir["CIvars"] += step.get_CI_vars()
        return ir

    def parse_runs(self):
        self.type = self.runs.get("using", "")
        self.plugin = self.runs.get("plugin", "")
        if self.is_composite:
            for step in self.runs["steps"]:
                self.steps.append(WorkflowStep(step))
            self.parse_deps()

    def parse_deps(self):
        for step in self.steps:
            if step.action_dict != None and step.action_dict != {} :
                self.deps.append(step.action_dict)

    def parse_inputs(self):
        for input_name, input_value in self.inputs.items():
            self.parsed_inputs.append({
                "name": input_name,
                "type": "action_input",
                "required" : input_value.get("required", True),
                "value" : input_value.get("default", ""),
                "CIvars": get_github_variables_from_string(input_value.get("default", ""))
            })

    def parse_outputs(self):
        for output_name, output_value in self.outputs.items():
            self.parsed_outputs.append({
                "name": output_name,
                "type": "action_output",
                "value" : output_value.get("default", ""),
                "CIvars": get_github_variables_from_string(output_value.get("default", ""))
            })

    @property
    def is_interesting(self):
        for input in self.parsed_inputs:
            for civar in input["CIvars"]:
                if is_CIvar_tainted(civar):
                    return True
                
        for output in self.parsed_outputs:
            for civar in output["CIvars"]:
                if is_CIvar_tainted(civar):
                    return True

        if self.is_composite:
            # we need to handle dependencies
            for step in self.steps:
                for civar in step.get_CI_vars():
                    if is_CIvar_tainted(civar):
                        return True


    @property
    def is_composite(self):
        try:
            return True if self.type == 'composite' else False
        except:
            return False
