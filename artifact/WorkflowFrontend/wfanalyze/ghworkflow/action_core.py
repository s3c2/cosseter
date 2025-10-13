from __future__ import annotations
from functools import lru_cache
import json
import logging
import re
from hashlib import sha256

from wfanalyze.common.exceptions import CodeQLError, WorkflowError
from wfanalyze.common.githandler import git_switch_to_branch, git_switch_to_tag, git_switch_to_commit
from wfanalyze.common.mongo_wrapper import add_action 
from wfanalyze.common.utils import find_folder, is_dir, join_paths
from wfanalyze.common.pylogger import get_logger

from wfanalyze.ghworkflow.ghvars import get_github_variables_from_string

NO_ACTION = 0
GITHUB_ACTION = 1
THIRD_PARTY_ACTION = 2
DOCKER_ACTION = 3
LOCAL_ACTION = 4

COMMIT_REF = 0
TAG_REF = 1
BRANCH_REF = 2
NON_THIRD_PARTY_REF = 3
NO_VERSION = 4
DOCKER_TAG_REF = 5
DOCKER_COMMIT_REF = 6
DOCKER_NO_REF = 7
NON_FIRST_PARTY_REF = 8

logger = get_logger("ghworkflow.action_core", logging.INFO)

class WorkflowStep(object):

    def __init__(self, step_config : dict):
        # Create a random id for the step if it's not present
        self.id = step_config.get("id", "wfan_" + sha256(json.dumps(step_config).encode()).hexdigest()[:10])
        
        self.step_name = step_config.get("name", "")

        # Parse the commands
        self.run = step_config.get("run", None)
        if self.run:
            self.step_type = "shell_cmd"
            self.step_cmd = self.run
    
        self.action = step_config.get("uses", None)
        self.action_dict = {}
        if self.action:
            try:     
                self.action_name, self.action_version = self.action.split("@")
            except Exception:
                self.action_name = self.action
                self.action_version = None
             
            if self.get_action_type() == GITHUB_ACTION or self.get_action_type() == THIRD_PARTY_ACTION:
                self.step_type = "gh_js_action"
            elif self.get_action_type() == DOCKER_ACTION:
                self.step_type = "gh_docker_action"
            elif self.get_action_type() == LOCAL_ACTION:
                self.step_type = "gh_local_action"
            else:
                self.step_type = "gh_unknown_action"

            self.step_cmd = self.action
        
            self.action_dict = {
                "type" : self.step_type,
                "name" : self.action_name,
                "version" : self.action_version
            }

        if self.action != None and self.run != None:
            raise WorkflowError(f"Step [{self.id}] has both action and run commands")

        self.step_shell = step_config.get("shell", "")

        # Parse Arguments      
        self.condition = step_config.get("if", "") 
        self.arguments = step_config.get("with", {})
        self.env = step_config.get("env", {})

    def convert_to_IR(self, order : int = 0):
        '''
        "task1" : { # "task1" is the ID of the step 
                "name" : "task1",
                "exec" : {
                    "type" : "js-action|docker-action|cmd", # Type of action run 
                    "command" : "<action-name>/<shell-command>/<docker>", # Action name or shell command
                    "shell" : "<shell>",  # Shell args (python/perl/bash)
                }
                "args" : [  # Stores ENV variables, action args, docker stuff
                        {
                            "type" : "string", # string|env|entrypoint|arg
                            "value" : "arg1", # value of the arg
                            "source" : <bool>, # Is this a source for taint-tracking
                        },
                        {
                            "type" : "ENV",
                            "value" : "arg2"
                            "source" : <bool>,
                        }
                ],
                "outputs" : [
                    {
                        "name" : "output1",
                        "comesFrom" : "", # determines if the output comes from the shell cmd or the action (Possibly redundant)
                    },
                    {
                        "name" : "output2",
                        "comesFrom" : "",
                    }
                ]
            }
        '''
        ir = {} 
        ir["name"] = self.step_name
        ir["order_no"] = order
        ir["condition"] = {
            "value" : self.condition,
            "CIvars" : get_github_variables_from_string(self.condition),
        }

        ir["exec"] = {
            "type" : self.step_type,
            "command" : self.step_cmd,
            "shell" : self.step_shell,
            "CIvars" : get_github_variables_from_string(self.step_cmd),
        }
        
        ir["args"] = self.prepare_args()
        ir["outputs"] = self.analyze_outputs()

        return ir

    def analyze_outputs(self):
        '''
        Let's do a regex match for outputs set by the step and then
        return a list of outputs

        Outputs can also be found by checking for other steps that use ouputs
        '''
        outputs = []
        if self.step_type == "shell_cmd":
            # Create a Regex to match outputs
            output_regex = r"::set-output name=(?P<output_name>\w+?)::(?P<output_value>.*)"
            # Match the regex
            output_matches = re.findall(output_regex, self.step_cmd)
            for output_name, output_value in output_matches:
                outputs.append({
                    "name" : output_name,
                    "value" : output_value,
                    "type" : "output",
                    "CIvars" : get_github_variables_from_string(output_value),
                    "comesFrom" : "shell_cmd",
                })

            # Create regex to match env variables
            env_regex = r"::set-env name=(?P<env_name>\w+?)::(?P<env_value>.*)"
            env_matches = re.findall(env_regex, self.step_cmd)
            for env_name, env_value in env_matches:
                outputs.append({
                    "name" : env_name,
                    "value" : env_value,
                    "type" : "env",
                    "CIvars" : get_github_variables_from_string(env_value),
                    "comesFrom" : "shell_cmd",
                })
        
            # TODO: Create regex to match type1 set output commands
        return outputs

    def get_CI_vars(self):
        '''
        Return a list of CI variables used in the step
        '''
        ret = []
        
        ir = self.convert_to_IR()
        for arg in ir["args"]:
            ret.extend(arg["CIvars"])
        
        for output in ir["outputs"]:
            ret.extend(output["CIvars"])
        
        ret.extend(ir["exec"]["CIvars"])

        return ret

    def prepare_args(self):
        args = []
        if self.arguments != {}:
            for arg_id, arg_val in self.arguments.items():
                args.append({
                    "name" : arg_id,
                    "type" : "arg",
                    "value" : arg_val,
                    "CIvars" : get_github_variables_from_string(arg_val),
                })
    
        if self.env != {}:
            if isinstance(self.env, str):
                args.append({
                    "name" : "special_case_env_string",
                    "type" : "env",
                    "value" : self.env,
                    "CIvars" : get_github_variables_from_string(self.env),
                })
                return args

            for env_id, env_val in self.env.items():
                args.append({
                    "name" : env_id,
                    "type" : "env",
                    "value" : env_val,
                    "CIvars" : get_github_variables_from_string(env_val),
                })

        return args

    @property
    def uses_an_action(self):
        return True if self.action_name != None else False

    def get_action_type(self):
        if self.action_name == None:
            return NO_ACTION
        name = self.action_name.strip()
        if name.startswith("actions/"):
            return GITHUB_ACTION
        elif name.startswith("docker:"):
            return DOCKER_ACTION
        elif name.startswith("./"):
            return LOCAL_ACTION
        else:
            return THIRD_PARTY_ACTION

    def __str__(self):
        ret = f"Step Name: {self.step_name if self.step_name != None else 'No-name-specifed'}\n"
        return ret

# def version_type():
#     if self.get_action_type() == GITHUB_ACTION:
#         return NON_THIRD_PARTY_REF
#     elif self.get_action_type() == DOCKER_ACTION:
#         if self.action_version == None:
#             try:
#                 label = self.action.split(":")[2]
#                 return DOCKER_TAG_REF
#             except Exception:
#                 pass
#             return DOCKER_NO_REF
#         else:
#             if self.action_version.startswith("sha256:"):
#                 return DOCKER_COMMIT_REF
#             else:
#                 logger.error(f"[Error] Wrong type for action_version : {type(self.action_version), self.action_version}")
#                 return DOCKER_NO_REF
    
#     return self.get_version_type(self.action_version)
    
