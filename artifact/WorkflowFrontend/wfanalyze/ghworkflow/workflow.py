# Created by R3x on Apr 11

from __future__ import annotations
import json
import logging
from typing import Dict, List
from uuid import uuid4

from wfanalyze.ghworkflow.action_core import WorkflowStep

from wfanalyze.common.pylogger import get_logger
from wfanalyze.common.exceptions import WorkflowError
from wfanalyze.ghworkflow.ghvars import get_github_variables_from_string

logger = get_logger("workflow", logging.INFO)

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

class Workflow(object):
    def __init__(self, content : dict, repo : str = "", file : str = "", debug = False):
        self.content = content
        #print(self.content)
        if self.content is None:
            raise WorkflowError("WFERROR")
        self.workflow_name = self.content.get("name", None)
        self.permissions = None
        self.triggers = []
        self.debug = debug
        self.repo = repo
        self.file = file
        self.jobs = []   
        # Inputs thatr are passed to the workflow if it;s a resuable workflow
        self.workflow_inputs : List[Dict] = []
        # Secrets that are passed to the workflow if it's a reusable workflow
        self.workflow_input_secrets : List[Dict] = [] 
        # Outputs that are passed from the workflow if it's a reusable workflow
        self.workflow_outputs : List[Dict] = []
        # We order the jobs as a tree structure, so store the root jobs here
        self.workflow_env : List[Dict] = []
        # store the trigger events here
        self.trigger_events = []
        self.root_jobs = []
        self.jobs_in_order : List[WorkflowJob] = []
        self.root_parser()
    
    def root_parser(self):
        self.trigger_events.extend(self.on_keyword_parser(self.content.get("on", None)))
        # This is because the `on` keyword is sometimes considered as the True keyword
        # Json/Yaml parser issues
        self.trigger_events.extend(self.on_keyword_parser(self.content.get(True, None)))
        self.parse_workflow_env(self.content.get("env", None))
        for job_name, body in self.content.get("jobs", {}).items():
            self.jobs.append(WorkflowJob(job_name, body))

        self.parse_order()
        self.get_ordered_jobs()

    def convert_to_IR(self):
        """
        {
        "uid" : <uid>,
        "metadata" : {
            "repo" : <repo>,
            "file" : <file>,
        }

        "dependencies" : [
            "actions" : [
                "action-name",
                "action-name".
            ]
            "workflows" : [
                <uid>,
            ]
        ],

        "reusable" : <bool>,
        "workflow_inputs" : [
            <input>,
        ],
        "workflow_outputs" : [
            <output>,
        ],
        """
        ir_dict = {}
        ir_dict["uid"] = str(uuid4())
        ir_dict["wf_name"] = self.workflow_name
        ir_dict["type"] = "GithubCI"
        
        ir_dict["dependencies"] = {
            "actions" : self.depending_actions(),
            "workflows" : self.depending_workflows(),
        }
        ir_dict["triggers"] = self.trigger_events

        ir_dict["CIvars_set"] = self.get_unique_CI_vars()
        ir_dict["workflow_env"] = self.workflow_env

        # Workflow is reusable if it has workflow inputs or workflow outputs
        if self.workflow_inputs != [] or self.workflow_outputs != []:
            ir_dict["reusable"] = True
        else:
            ir_dict["reusable"] = False
        
        ir_dict["workflow_inputs"] = self.workflow_inputs + self.workflow_input_secrets
        ir_dict["workflow_outputs"] = self.workflow_outputs

        ir_dict["taskgroups"] = {}
        for ctr, job in enumerate(self.jobs_in_order):
            ir_dict["taskgroups"][job.id] = job.convert_to_IR(ctr)

        return ir_dict

    def get_unique_CI_vars(self):
        CI_vars = []
        visited_vars = []
        
        for variables in self.workflow_inputs + self.workflow_input_secrets + self.workflow_outputs + self.workflow_env:
            for ci_var in variables["CIvars"]:
                if ci_var["expression"] not in visited_vars:
                    visited_vars.append(ci_var["expression"])
                    CI_vars.append(ci_var)
    
        for job in self.jobs:
            jlist = job.get_CI_vars()
            for var in jlist:
                if var["expression"] not in visited_vars:
                    visited_vars.append(var["expression"])
                    CI_vars.append(var)
        return CI_vars

    '''
    Each job is a WorkflowJob object
     each has a needs element, which is a list of job names that this job depends on
    
    jobs = [WorkflowJob('job1', []), WorkflowJob('job2', ['job1']), 
        WorkflowJob('job3', ['job1', 'job2']), ...]

    '''
    def parse_order(self):
        for job in self.jobs:
            if job.needs == []:
                self.root_jobs.append(job)
                continue

            for needed_job in job.needs:
                parent_job = self.find_job(needed_job)
                if parent_job == None:
                    raise WorkflowError(f"Got a invalid dependency job, {needed_job} is not a valid job name")
                parent_job.add_child(job)
                job.add_parent(parent_job)
    
    # Iterate through the root jobs and get the jobs in order
    def get_ordered_jobs(self):
        for root_job in self.root_jobs:
            self.jobs_in_order.append(root_job)
        
        
        non_root_jobs = [job for job in self.jobs if job not in self.root_jobs] 

        cnt = 0
        while len(non_root_jobs) > 0:
            for job in non_root_jobs:
                if all(x in self.jobs_in_order for x in job.parents):
                    self.jobs_in_order.append(job)
                    non_root_jobs.remove(job)
                    break
            cnt += 1

            if cnt > 1000:
                raise WorkflowError("Got a circular dependency in the workflow")

    def find_job(self, job_name : str):
        for job in self.jobs:
            if job.job_name == job_name:
                return job
        return None

    def print_job_order(self, root_job : WorkflowJob = None, prefix = ""):
        if root_job == None:
            return
        
        print(f"{prefix}job : {root_job.job_name}")
        for child_job in root_job.children:
            if child_job.has_children:
                self.print_job_order(child_job, prefix + "\t")
            else:
                prefix = prefix + "\t"
                print(f"{prefix}leaf_job : {child_job.job_name}")

    def analyse_workflow(self, root_job : WorkflowJob, visited = []):
        
        if root_job in visited:
            return
        visited.append(root_job)

        root_job.analyse_job()

        if root_job.has_children:
            for child_job in root_job.children:
                self.analyse_workflow(child_job, visited)


    def on_keyword_parser(self, trigger : dict):
        if trigger == None:
            return []
        if isinstance(trigger, dict):
            # let's check if it's the on workflow_call keyword
            items = []
            for keyword, config in trigger.items():
                if keyword == "workflow_call":
                    if config == None:
                        items.append({
                            "type" : "workflow_call",
                            "condition" : ""
                        })
                        continue
                    self.parse_workflow_inputs(config)
                    self.parse_workflow_input_secrets(config)
                    self.parse_worfklow_outputs(config)
                else: 
                    items.append({
                        "type" : keyword,
                        "condition" : json.dumps(config)
                    })
            return items
        elif isinstance(trigger, list):
            items = []
            for item in trigger:
                items.append(
                    {
                        "type" : item,
                        "condition" : ""
                    }
                )
            return items
        elif isinstance(trigger, str):
            return [{
                "type" : trigger,
                "condition" : ""
            }]
        else:
            logger.error(f"[Error] Wrong type for trigger : {type(trigger), trigger}")
    

    # https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-git1hub-actions#onworkflow_callinputs 
    def parse_workflow_inputs(self, config : dict):
        if config.get("inputs", None) == None:
            return
        
        for input_name, input_value in config.get("inputs", {}).items():
            if input_value == None:
                continue
            self.workflow_inputs.append({
                "name" : input_name,
                "type" : "reusable_input",
                "datatype" : input_value.get('type', "unknown"),
                "required" : input_value.get('required', True),
                "value" : input_value.get('default', ""),
                "CIvars" : get_github_variables_from_string(input_value.get('default', ""))
            })

        if self.debug:
            print("Workflow inputs : ", self.workflow_inputs)

    # https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onworkflow_callsecrets     
    def parse_workflow_input_secrets(self, config : dict):
        if config.get("secrets", None) == None:
            return
        for secret_name, details in config.get("secrets", {}).items():
            self.workflow_input_secrets.append({
                "name" : secret_name,
                "type" : "reusable_secret",
                "required" : details.get('required', True),
                "datatype" : "unknown",
                "value" : "",
                "CIvars" : []
            })

        if self.debug:
            print("Workflow input secrets : ", self.workflow_input_secrets)

    # https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onworkflow_calloutputs
    def parse_worfklow_outputs(self, config : dict):
        if config.get("outputs", None) == None:
            return
        for output_name, output_value in config.get("outputs", {}).items():
            self.workflow_outputs.append({
                "name" : output_name,
                "type" : "reusable_output",
                "value" : output_value.get("value", ""), 
                "CIvars" : get_github_variables_from_string(output_value.get("value", ""))     
            })

        if self.debug:
            print("Workflow outputs : ", self.workflow_outputs)

    # https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#env    
    def parse_workflow_env(self, env : dict):
        if env == None:
            return
        
        if isinstance(env, str):
            self.workflow_env.append({
                "type" : "env",
                "value" : env,
                "name" : "special_case_env_string",
                "CIvars" : get_github_variables_from_string(env)
            })
            return env
        
        for env_name, env_value in env.items():
            self.workflow_env.append({
                "type" : "env",
                "value" : env_value,
                "name" : env_name,
                "CIvars" : get_github_variables_from_string(env_value)
            })

        if self.debug:
            print("Workflow env : ", self.workflow_env)

    def depending_actions(self):
        actions = []
        for job in self.jobs:
            actions.extend(job.actions)
        
        # remove duplicates of the list of dicts
        # the name and version should be unique
        visited = []
        set_actions = []
        for action in actions:
            if (action["name"], action["version"]) in visited:
                continue
            visited.append((action["name"], action["version"]))
            set_actions.append(action)
        return set_actions

    def depending_workflows(self):
        wfs = set()
        for job in self.jobs:
            if job.reusable_wfl == None:
                continue
            wfs.add(job.reusable_wfl)
        return list(wfs)

    @property
    def is_self_hosted(self):
        for job in self.jobs:
            if job.is_self_hosted:
                return True

    @property
    def actions(self):
        actions = []
        for job in self.jobs:
            actions.extend(job.actions)
        return actions

    def __str__(self):
        ret = "=====================\n"
        ret += f"Workflow : {self.workflow_name}\n"
        ret += f"Permissions: {self.permissions}\n"
        ret += f"Triggers: {self.triggers}\n"
        for job in self.jobs:    
            ret += str(job)
        ret += "=====================\n"
        return ret

class WorkflowJob(object):
    
    def __init__(self, job_name, body : dict):
        self.id = job_name
        self.job_name = job_name
        self.body = body
        self.steps : List[WorkflowStep] = []
        self.needs = []
        self.children = []
        self.parents = []
        self.root_parser()

    def root_parser(self):    
        self.permissions = self.body.get("permissions", None)
        self.runs = self.body.get("runs-on", None)
        self.outputs = self.body.get("outputs", None)
        self.condition = self.body.get("if", "")
        for step in self.body.get("steps", []):
            self.steps.append(WorkflowStep(step))
        self.reusable_wfl = self.body.get("uses", None)
        self.reusable_wfl_inputs = self.body.get("with", None)
        self.parse_needs()           

    def analyse_job(self):
        for step in self.steps:
            step.analyse_step()

    def parse_job_env(self):
        env = []
        env_dict = self.body.get("env", {})

        if isinstance(env_dict, str):
            env.append({
                "type" : "env",
                "value" : env_dict,
                "name" : "special_case_env_string",
                "CIvars" : get_github_variables_from_string(env_dict)
            })
            return env

        for env_name, env_value in env_dict.items():
            env.append({
                "type" : "env",
                "value" : env_value,
                "name" : env_name,
                "CIvars" : get_github_variables_from_string(env_value)
            })
        return env

    def convert_to_IR(self, ctr : int = 0):
        ir = {}
        ir['name'] = self.job_name
        ir['dependencies'] = self.needs
        ir['order_no'] = ctr

        # Add outputs        
        ir['outputs'] = self.parse_job_outputs()
        ir['self_hosted'] = self.is_self_hosted
        ir['condition'] = {
            'condition' : self.condition,
            'CIvars' : get_github_variables_from_string(self.condition),
        }        
        ir['job_env'] = self.parse_job_env()

        ir['tasks'] = {}
        for ctr, step in enumerate(self.steps):
            ir['tasks'][step.id] = step.convert_to_IR(ctr)

        # If the job uses a reusable workflow,
        # the entire job is a workflow step - which is another workflow        
        ir['workflow_step'] = False
        if self.reusable_wfl != None:
            ir['workflow_step'] = True
            ir['tasks']['workflow'] = {
                'name' : self.reusable_wfl,
                'inputs' : self.get_wfl_args()
            }

        return ir

    def get_CI_vars(self):
        CI_vars = []

        for env in self.parse_job_env():
            CI_vars.extend(env.get("CIvars", []))

        for step in self.steps:
            CI_vars.extend(step.get_CI_vars())

        if self.reusable_wfl_inputs != None:
            for arg_name, arg_value in self.reusable_wfl_inputs.items():
                CI_vars.extend(get_github_variables_from_string(arg_value))

        return CI_vars

    def get_wfl_args(self):
        ret = []
        if self.reusable_wfl_inputs == None:
            return ret
        for arg_name, arg_value in self.reusable_wfl_inputs.items():
            ret.append({
                'name' : arg_name,
                'value' : arg_value,
                'type' : "arg",
                'CIvars' : get_github_variables_from_string(arg_value)
            })
        return ret
        
    def parse_job_outputs(self):
        ret = []
        if self.outputs == None:
            return ret
        for output_name, output_value in self.outputs.items():
            ret.append({
                'name' : output_name,
                'value' : output_value,
                'CIvars' : get_github_variables_from_string(output_value)
            })

    def __str__(self):
        ret = "=====================\n"
        ret += f"Job : {self.job_name}\n"
        ret += f"Permissions: {self.permissions}\n"
        for step in self.steps:
            ret += "\t" + str(step).replace("\n", "\n\t")
            ret += "\n"
        ret += "=====================\n"
        return ret

    def parse_needs(self):
        needs = self.body.get("needs", None)
        if needs == None:
            return
        if isinstance(needs, str):
            self.needs.append(needs)
        elif isinstance(needs, list):
            self.needs.extend(needs)

    def add_child(self, child_job : WorkflowJob):
        self.children.append(child_job)
    
    def add_parent(self, parent_job : WorkflowJob):
        self.parents.append(parent_job)
    
    @property
    def has_children(self):
        return len(self.children) > 0

    @property
    def actions(self) -> set():
        actions = []
        if self.steps != None:
            for step in self.steps:
                if step.action != None:
                    actions.append(step.action_dict)
        return actions

    @property
    def is_self_hosted(self):
        if isinstance(self.runs, list):
            for run in self.runs:
                if run == "self-hosted":
                    return True
        elif isinstance(self.runs, str):
            if self.runs == "self-hosted":
                return True
        else:
            #logger.error(f"[Error] Wrong type for runs-on : {type(self.runs), self.runs}")
            return False
        return False