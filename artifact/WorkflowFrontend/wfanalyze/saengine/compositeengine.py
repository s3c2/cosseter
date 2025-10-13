from typing import Dict, List
from wfanalyze.ir.task import Task
from wfanalyze.ir.taskgroup import TaskGroup
from wfanalyze.ir.workflow import Workflow
from wfanalyze.saengine.tainted_inputs import is_CIvar_tainted, is_CIvar_tainted_object
from wfanalyze.saengine.shell_command import parse_shell_command
from wfanalyze.common.mongo_wrapper import get_action, add_result, get_results, initialize_results, get_ir_workflow


def split_action_name(action_name):
    chunks = action_name.split("/") 
    if len(chunks) < 2:
        return None, None
    
    if len(chunks) > 2:
        return chunks[0] + "/" + chunks[1], "/".join(chunks[2:])
    else:
        return chunks[0] + "/" + chunks[1], None

class TaintObj(object):
    IN_WORKFLOW = 0
    IN_REUSABLE = 1
    IN_COMPOSITE = 2

    def __init__(self, name, type, parent_nodes = [], location = IN_WORKFLOW, is_object=False, curr_task = "unk"):
        self.name = name
        self.type = type
        self.location = location
        self.curr_task = curr_task
        self.is_object = False

        if parent_nodes == None: 
            parent_nodes = []
        elif isinstance(parent_nodes, TaintObj):
            parent_nodes = [parent_nodes]

        assert (isinstance(parent_nodes, list) and all(isinstance(x, TaintObj) for x in parent_nodes))

        if parent_nodes == []:
            self.parent_nodes = []            
            self.is_root = True
        else:
            self.parent_nodes = parent_nodes
            self.is_root = False

    def __str__(self):
        return f"{self.name} | {self.type} | {self.path}"

    @property
    def path_count(self):
        if self.is_root:
            return 0
        return max([parent_node.path_count + 1 for parent_node in self.parent_nodes])
    
    @property
    def multiple_paths(self):
        if self.is_root:
            return False
        if len(self.parent_nodes) > 1:
            return True
        else:
            return self.parent_nodes[0].multiple_paths

    @property
    def path(self):
        if self.is_root:
            return [(self.name, self.type)]
        if len(self.parent_nodes) == 1:
            return self.parent_nodes[0].path + [(self.name, self.type)]
        else:
            #TODO: Handle multiple parents
            return self.parent_nodes[0].path + [self.name] 

    @property
    def root_name(self):
        if self.is_root:
            return [self.name]
        return list(set([roots for parent_node in self.parent_nodes for roots in parent_node.root_name]))

    @property
    def root_location(self):
        if self.is_root:
            return [self.location]
        return list(set([loc for parent_node in self.parent_nodes for loc in parent_node.root_location]))

    @property
    def is_root_object(self):
        if self.is_root:
            return self.is_object
        return any([parent_node.is_root_object for parent_node in self.parent_nodes])

class TaintEngine(object):
    WORKFLOW_LEVEL = 0
    TASK_GROUP_LEVEL = 1
    TASK_LEVEL = 2

    ALERT_NONE = 0
    ARG_TO_SINK = 1 
    ENV_TO_SINK = 2
    TAINT_TO_SINK = 3
    SHELL_WITH_TAINT = 4
    TAINT_TO_LOCAL = 5
    ENV_TO_SHELL_WITH_TAINT = 6
    TAINT_TO_DOCKER = 7
    TAINT_TO_DEF_DOCKER = 8
    TAINT_TO_UNKNOWN = 9

    ALERT_NAME = [
        "NONE", "ARG_TO_SINK", "ENV_TO_SINK", "TAINT_TO_SINK", "SHELL_WITH_TAINT", "TAINT_TO_LOCAL", "ENV_TO_SHELL_WITH_TAINT", "TAINT_TO_DOCKER", "TAINT_TO_DEF_DOCKER", "TAINT_TO_UNKNOWN"
    ]
    TAINT_LEVELS = [WORKFLOW_LEVEL, TASK_GROUP_LEVEL, TASK_LEVEL]

    def __init__(self, action, metadata : dict, debug_mode = False):
        self.workflow = workflow
        self.debug = debug_mode
        
        self.id = metadata["id"]
        
        self.current_task_group = None
        self.current_task = None
        self.intitialized = False
        self.in_composite = False
        
        self.tainted_args = []

        self.tainted_inputs = []
        self.composite_inputs = []
        self.tainted_variables = []
        self.tainted_outputs : Dict[str, Dict[str, List[TaintObj]]] = {}
        self.tainted_job_outputs : Dict[str, List[TaintObj]] = {}

        self.nested_composite_count = 0
        self.current_composite_action = None
        self.nested_composite_inputs = []
        self.composite_ctr = 0
        self.saved_task_groups = []
        
        # Initialize the tainted envs
        self.tainted_envs = {}
        self.tainted_envs[self.WORKFLOW_LEVEL] = []
        self.tainted_envs[self.TASK_GROUP_LEVEL] = []
        self.tainted_envs[self.TASK_LEVEL] = []
        
        self.wf_inputs = inputs
        self.in_reusable = False
        if len(self.wf_inputs) != 0:
            self.in_reusable = True
        for inp in self.wf_inputs:
            self.taint_input(inp)

    def initialize(self):
        if self.intitialized:
            return

        res = get_results(self.id)
        if res == None:
            initialize_results(self.id, self.wf_yaml, self.ir, self.wf_metadata)
        self.intitialized = True

    def run(self):
        # Let's start by tainting the env variables, that are used in the workflow
        for env in self.workflow.workflow_env:
            if self.debug:
                self.print_str(f"Checking env : {env['name']} | workflow level") 
            sources = self.contains_tainted_variable(env)
            if sources != []:
                obj = TaintObj(
                    name=env['name'],
                    type="env",
                    parent_nodes=sources,
                    location=self.get_location()
                )
                self.taint_env(obj, self.WORKFLOW_LEVEL)                               

        for task_group in self.workflow.task_groups:
            self.current_task_group = task_group.id
            for env in task_group.env:
                if self.debug:
                    self.print_str(f"Checking env : {env['name']} | task group level")
                sources = self.contains_tainted_variable(env)
                if sources != []:
                    obj = TaintObj(
                        name=env['name'],
                        type="env",
                        parent_nodes=sources,
                        location=self.get_location()
                    ) 
                    self.taint_env(obj, self.TASK_GROUP_LEVEL)

            if task_group.workflow_step:
                if self.debug:
                    self.print_str(f"Reusable workflow used")
                self.handle_reusable_workflow(task_group)
                continue

            for task in task_group.tasks:
                self.current_task = task.id
                self.handle_task(task)

            if task_group.outputs != None:
                for output in task_group.outputs:
                    if self.debug:
                        self.print_str(f"Checking output : {output['name']} | task group level")
                    sources = self.contains_tainted_variable(output)
                    if sources != []:
                        obj = TaintObj(
                            name=output['name'],
                            type="output",
                            parent_nodes=sources,
                            location=self.get_location()
                        )
                        self.taint_job_output(output['name'])

            self.clear_taint_task_group_level()

    def handle_task(self, task : Task):
        if self.debug:
            self.print_str(f"Handling task {task.name}")

        for arg in task.args:
            if self.debug:
                self.print_str(f"Checking {arg['type']} : {arg['name']} | task level")
            if arg['type'] == "env":
                sources = self.contains_tainted_variable(arg)
                if sources != []:
                    obj = TaintObj(
                        name=arg['name'],
                        type="env",
                        parent_nodes=sources,
                        location=self.get_location()
                    )
                    self.taint_env(obj, self.TASK_LEVEL)
            elif arg['type'] == "arg":
                sources = self.contains_tainted_variable(arg)
                if sources != []:
                    obj = TaintObj(
                        name=arg['name'],
                        type="arg",
                        parent_nodes=sources,
                        location=self.get_location()
                    )
                    self.taint_arg(obj)

        if task.exec_type == "gh_local_action":
            self.handle_local_action(task)
        elif task.exec_type == "gh_js_action":
            self.handle_js_action(task)
        elif task.exec_type == "gh_docker_action":
            self.handle_docker_action(task)
        elif task.exec_type == "shell_cmd":
            self.handle_shell_cmd(task)

        self.clear_taint_task_level()

#
# handle actions
# 

    def handle_local_action(self, task : Task):
        if self.debug:
            self.print_str(f"Handling local action {task.exec_command}")

        tainted_args = self.get_arg_taint()
        if tainted_args != []:
            self.raise_alert(
                atype=self.TAINT_TO_LOCAL,
                alert=f"Local action {task.exec_command} is tainted with {self.get_tainted_args_string()}",
                details = {
                    "local_action": task.exec_command,
                    "tainted_args": self.get_tainted_args_string(),
                    "TaintRes" : self.get_taint_object_res(tainted_args)
                }
            )

    def handle_js_action(self, task : Task):
        if "@" not in task.exec_command:
            return

        action = get_action(task.exec_command.split("@")[0], task.exec_command.split("@")[1])
        if action is None:
            self.print_str(f"Action {task.exec_command} not found")
            return

        if action["hasDefault"] != False:
            for default_input in action["defaults"]["inputs"]:
                if default_input["name"] in [arg["name"] for arg in task.args]:
                    continue
                
                if self.debug:
                    self.print_str(f"Checking default input {default_input['name']} | action level")
                sources = self.contains_tainted_variable(default_input)
                if sources != []:
                    obj = TaintObj(
                        name=default_input['name'],
                        type="default_input",
                        parent_nodes=sources,
                        location=self.get_location()
                    )
                    self.taint_arg(obj)

        if action["type"] == "composite":
            if self.debug:
                self.print_str(f"Handling composite action {task.exec_command}")
            self.run_composite_action(task, action)
        elif action["type"] == "docker":
            if self.debug:
                self.print_str(f"Handling docker action {task.exec_command}")
            self.run_docker_action(task, action)
        elif action["type"] == "node12" or action["type"] == "node16":
            if self.debug:
                self.print_str(f"Handling node action {task.exec_command}")
            # Check if action has codeQL results
            if action.get("hasCodeQL", False) != True:
                print(f"Action {task.exec_command} does not have codeQL results")
                if self.debug:
                    self.print_str(f"Action {task.exec_command} does not have codeQL results")
                return
            self.check_sinks(task, action["ql_results"], action["name"])           
            self.propogate_taint(task, action["ql_results"])
        else:
            self.unknown_action(task)

    def handle_docker_action(self, task : Task):
        if self.debug:
            self.print_str(f"Handling docker action {task.exec_command}")

        tainted_args = self.get_arg_taint()
        if tainted_args != []:  
            self.raise_alert(
                atype=self.TAINT_TO_DOCKER,
                alert=f"Docker action {task.exec_command} is tainted with {self.get_tainted_args_string()}",
                details = {
                    "docker_action": task.exec_command,
                    "tainted_args": self.get_tainted_args_string(),
                    "TaintRes" : self.get_taint_object_res(tainted_args)
                }
            )

    def run_docker_action(self, task : Task, action : dict):
        if self.debug:
            self.print_str(f"Handling docker action {task.exec_command}")
        
        if action["hasDefault"] != False:
            for default_input in action["defaults"]["inputs"]:
                if default_input["name"] in [arg["name"] for arg in task.args]:
                    continue
                
                if self.debug:
                    self.print_str(f"Checking default input {default_input['name']} | action level")
                sources = self.contains_tainted_variable(default_input)
                if sources != []:
                    obj = TaintObj(
                        name=default_input['name'],
                        type="default_input",
                        parent_nodes=sources,
                        location=self.get_location()
                    )
                    self.taint_arg(obj)

        tainted_args = self.get_arg_taint()
        if tainted_args != []:
            self.raise_alert(
                atype=self.TAINT_TO_DEF_DOCKER,
                alert=f"Docker action {task.exec_command} is tainted with {self.get_tainted_args_string()}",
                details = {
                    "def_docker_action": task.exec_command,
                    "tainted_args": self.get_tainted_args_string(),
                    "TaintRes" : self.get_taint_object_res(tainted_args)
                }
            )

    def unknown_action(self, task : Task): 
        if self.debug:
            self.print_str(f"Unknown action {task.exec_command}")
        
        tainted_args = self.get_arg_taint()
        if tainted_args != []:
            self.raise_alert(
                atype=self.TAINT_TO_UNKNOWN,
                alert=f"Unknown action {task.exec_command} is tainted with {self.get_tainted_args_string()}",
                details = {
                    "unknown_action": task.exec_command,
                    "tainted_args": self.get_tainted_args_string(),
                    "TaintRes" : self.get_taint_object_res(tainted_args)
                }
            )

    def handle_shell_cmd(self, task : Task):
        if self.debug:
            self.print_str(f"Handling shell command")

        for ci_var in task.exec_CIvars:
            if self.debug:
                self.print_str(f"Checking CI var {ci_var['name']} | in shell cmd")
            tainted = self.is_tainted_variable(ci_var)
            if tainted:
                if self.debug:
                    self.print_str(f"CI var {ci_var['name']} is tainted")
                self.raise_alert(
                    atype=self.SHELL_WITH_TAINT, 
                    alert=f"Shell command in {task.id} - with tainted exec",
                    details={
                        "shell_cmd": task.exec_command,
                        "tainted_var": ci_var["name"],
                        "shell": task.exec_shell,
                        "TaintRes": self.get_taint_object_res(tainted)
                    }
                )
            else: 
                if self.debug:
                    self.print_str(f"CI var {ci_var['name']} is not tainted")

        shell_parsed = parse_shell_command(task.exec_command, task.exec_shell)
        self.handle_shell_parsed(shell_parsed, task.exec_shell)

        # handle outputs of the shell_cmd
        for output in task.outputs: 
            if self.debug:
                self.print_str(f"Checking shell output {output['name']} | task level")
            sources = self.contains_tainted_variable(output)
            if sources != []:
                if self.debug:
                    self.print_str(f"Shell output {output['name']} is tainted")
                obj = TaintObj(
                    name=output["name"],
                    type="shell_output",
                    parent_nodes=sources,
                    location=self.get_location()
                )
                self.taint_output(obj)
            
#
# Composite action
# 

    def run_composite_action(self, task : Task, action):
        # Run all the steps in the composite actions
        if self.debug:
            self.print_str(f"Running composite action {task.exec_command}")
        
        self.set_composite_task()
        self.current_composite_action = task.exec_command

        for input_val in action["defaults"]["inputs"]:
            if input_val["name"] in [arg["name"] for arg in task.args]:
                continue

            if self.debug:
                self.print_str(f"Checking input {input_val['name']} | composite level")
            sources = self.contains_tainted_variable(input_val)
            if sources != []:
                obj = TaintObj(
                    name=input_val['name'],
                    type="js_default_input",
                    parent_nodes=sources,
                    location=self.get_location()
                )
                self.taint_arg(obj)

        for arg_obj in self.get_arg_taint():
            self.taint_input(arg_obj)

        for ctask in TaskGroup("composite_task", action["defaults"]).tasks:
            self.current_task = ctask.id
            self.handle_task(ctask)

        for output_val in action["defaults"]["outputs"]:
            if self.debug:
                self.print_str(f"Checking output {output_val['name']} | composite level")
            sources = self.contains_tainted_variable(output_val)
            if sources != []:
                if self.debug:
                    self.print_str(f"Output {output_val['name']} is tainted")
                obj = TaintObj(
                    name=output_val['name'],
                    type="js_default_output",
                    parent_nodes=sources,
                    location=self.get_location()
                )
                self.taint_output(obj)

        self.current_composite_action = None
        self.clear_composite_task()

#
# JS actions
# 

    hardcoded_sinks = {
        "actions/github-script" : [{
            "type" : "arg",
            "name" : "script",
            "addedBy" : "r3x" 
        }]
    }

    ignore_sinks = {
        "actions/checkout" : [{
            "name" : "ref"
            # exec.exec() 2nd arg is not a sink
        }],
        "peaceiris/actions-gh-pages" : [{
            "name" : "commit-message"
            # exec.exec() 2nd arg is not a sink
        }],
        "peter-evans/create-pull-request" : [{
            "name" : "ref"  
            # exec.exec() 2nd arg is not a sink
        }]
    }
    
    def check_sinks(self, task : Task, results, name):
        if name in self.ignore_sinks:
            return

        # First check if we have any taint going into a sink
        ArgToSink = results["ArgToSink"]
        for arg in ArgToSink:
            taint_arg = self.is_arg_tainted(arg["name"])
            if taint_arg:
                self.raise_alert(
                    atype=self.ARG_TO_SINK, 
                    alert=f"{arg['name']}",
                    details={
                        "action": task.exec_command,
                        "arg": arg["name"],
                        "ArgToSink": arg,
                        "TaintRes" : self.get_taint_object_res(taint_arg)
                    }
                )
        
        EnvToSink = results.get("EnvtoSink", [])
        for env in EnvToSink:
            taint_env = self.is_env_tainted(env["name"])
            if taint_env:
                self.raise_alert(
                    atype=self.ENV_TO_SINK, 
                    alert=f"{env['name']}",
                    details={
                        "action": task.exec_command,
                        "env": env["name"],
                        "EnvToSink": env,
                        "TaintRes" : self.get_taint_object_res(taint_env)
                    }
                )

        if name in self.hardcoded_sinks:
            for sink in self.hardcoded_sinks[name]:
                if sink["type"] == "arg":
                    taint_arg = self.is_arg_tainted(sink["name"])
                    if taint_arg:
                        self.raise_alert(
                            atype=self.ARG_TO_SINK, 
                            alert=f"{sink['name']}",
                            details={
                                "action": task.exec_command,
                                "arg": sink["name"],
                                "ArgToSink": sink,
                                "TaintRes" : self.get_taint_object_res(taint_arg)
                            },
                        )
                elif sink["type"] == "env":
                    taint_env = self.is_env_tainted(sink["name"])
                    if taint_env:
                        self.raise_alert(
                            atype=self.ENV_TO_SINK, 
                            alert=f"{sink['name']}",
                            details={
                                "action": task.exec_command,
                                "env": sink["name"],
                                "EnvToSink": sink,
                                "TaintRes" : self.get_taint_object_res(taint_env)
                            }
                        )

    def propogate_taint(self, task : Task, results):
        # Then check if we have any taint going into an output
        ArgToOutput = results.get("ArgToOutput", [])
        for arg in ArgToOutput:
            taint_arg = self.is_arg_tainted(arg["name"])
            if taint_arg:
                for argout in arg["output"]:
                    if argout["function"] == "setOutput":
                        obj = TaintObj(
                            name=argout["name"],
                            type="jsaction_output",
                            parent_nodes=taint_arg,
                            location=self.get_location()  
                        )
                        self.taint_output(obj)
                    elif argout["function"] == "exportVariable":
                        obj = TaintObj(
                            name=argout["name"],
                            type="jsaction_env",
                            parent_nodes=taint_arg,
                            location=self.get_location()  
                        )
                        self.taint_env(obj)
        
        EnvToOutput = results.get("EnvToOutput", [])
        for env in EnvToOutput:
            taint_env = self.is_env_tainted(env["name"])
            if taint_env:
                for argout in arg["output"]:
                    if argout["function"] == "setOutput":
                        obj = TaintObj(
                            name=argout["name"],
                            type="jsaction_output",
                            parent_nodes=taint_env,
                            location=self.get_location()  
                        )
                        self.taint_output(obj)
                    elif argout["function"] == "exportVariable":
                        obj = TaintObj(
                            name=argout["name"],
                            type="jsaction_env",
                            parent_nodes=taint_env,
                            location=self.get_location()  
                        )
                        self.taint_env(obj)
#
# Handle shell commands 
#

    def handle_shell_parsed(self, parsed, shell):
        if shell == "bash" or shell == "":
            for envname in parsed["env_vars"]:
                taint_env = self.is_env_tainted(envname)
                if taint_env:
                    self.raise_alert(
                        atype=self.ENV_TO_SHELL_WITH_TAINT,
                        alert=f"Shell command in {task.id} - with tainted env {envname}",
                        details={
                            "shell_cmd": task.exec_command,
                            "tainted_var": envname,
                            "TaintRes" : self.get_taint_object_res(taint_env)
                        }
                    )
            
            for env_set in parsed["set_envs"]:
                sources = self.contains_tainted_variable(env_set)
                if sources != []:
                    obj = TaintObj(
                        name=env_set["name"],
                        type="shell_env",
                        parent_nodes=sources,
                        location=self.get_location()
                    )
                    self.taint_env(obj, self.TASK_GROUP_LEVEL)
            
            for output_set in parsed["set_outputs"]:
                sources = self.contains_tainted_variable(output_set)
                if sources != []:
                    obj = TaintObj(
                        name=output_set["name"],
                        type="shell_output",
                        parent_nodes=sources,
                        location=self.get_location()
                    )
                    self.taint_output(obj)

#
# Check if a CIvar is tainted
#

    def contains_tainted_variable(self, object):
        if self.debug:
            self.print_str(f"Checking CIvar {object['name']}")
    
        source_set = []
        for civar in object["CIvars"]:
            taint_obj = self.is_tainted_variable(civar)
            if taint_obj:
                if isinstance(taint_obj, list):
                    source_set.extend(taint_obj)
                else:
                    source_set.append(taint_obj)
        return source_set

    def is_tainted_variable(self, civar) -> TaintObj:
        if self.debug:
            self.print_str(f"is_tainted_variable:  Checking CIvar {civar['name']} : {civar['type']}")

        # check if it's a taint source
        if is_CIvar_tainted(civar):
            # Create a new taint object
            return TaintObj(
                    name=civar["expression"], 
                    type=civar["type"],
                    location=self.get_location()
                ) 

        if is_CIvar_tainted_object(civar):
            # Create a new taint object
            return TaintObj(
                    name=civar["expression"], 
                    type=civar["type"],
                    location=self.get_location(),
                    is_object=True
                )        

        if civar["type"] == "context":
            if civar["name"].startswith("event.inputs."):
                taint_obj = self.is_input_tainted(civar["name"][13:])
                if taint_obj:
                    return taint_obj

        # check if it's a step output that's tainted
        if civar["type"] == "steps":
            taint_obj = self.is_output_tainted(civar["name"])
            if taint_obj:
                return taint_obj

        # check if it's a job output that's tainted
        if civar["type"] == "needs":
            taint_obj = self.is_job_output_tainted(civar["name"])
            if taint_obj:
                return taint_obj

        if civar["type"] == "env":
            taint_obj = self.is_env_tainted(civar["name"])
            if taint_obj:
                return taint_obj

        if civar["type"] == "inputs":
            taint_obj = self.is_input_tainted(civar["name"])
            if taint_obj:
                return taint_obj

        return None

#
# Env taint tracking features
#

    def is_any_env_tainted(self) -> bool:
        for level in self.TAINT_LEVELS:
            if len(self.tainted_envs[level]) > 0:
                return True
        return False

    def taint_env(self, env : TaintObj, level : int):
        if env in self.tainted_envs[level]:
            if self.debug:
                self.print_str(f"Env {env.name} is already tainted")
            return
        
        if self.debug:
            self.print_str(f"Tainting env {env.name} at level {level}")
        self.tainted_envs[level].append(env)

    def is_env_tainted(self, curr_env : str):
        for level in self.TAINT_LEVELS:
            for env in self.tainted_envs[level]:
                if env.name == curr_env:
                    return env
        return None
    
    def is_tainted_env(self, env, level = 3):
        if level == 3:
            return self.is_tainted_env(env, self.WORKFLOW_LEVEL) or self.is_tainted_env(env, self.TASK_GROUP_LEVEL) or self.is_tainted_env(env, self.TASK_LEVEL) 
        return env in self.tainted_envs[level]

#
# Arg taint tracking features
#    

    def is_arg_tainted(self, curr_arg):
        for arg in self.tainted_args:
            if arg.name == curr_arg:
                return arg
        return None

    def get_arg_taint(self):
        return self.tainted_args
    
    def get_tainted_args_string(self):
        ret = ""
        for arg in self.tainted_args:
            ret += f"{arg.name}, "
        return ret[:-2]

    def is_any_arg_tainted(self):
        return len(self.tainted_args) > 0

    def taint_arg(self, arg : TaintObj):
        if arg in self.tainted_args:
            if self.debug:
                self.print_str(f"Arg {arg.name} is already tainted")
            return
        if self.debug:
            self.print_str(f"Tainting arg {arg.name}")
        self.tainted_args.append(arg)

    def get_tainted_args(self):
        return [arg.name for arg in self.tainted_args]

#
#  Output taint tracking features
#

    def taint_output(self, output : TaintObj):
        if self.debug:
            self.print_str(f"Tainting output {output}")
        if self.current_task_group in self.tainted_outputs:
            task_outputs = self.tainted_outputs[self.current_task_group]
            if self.current_task in task_outputs:
                task_outputs[self.current_task].append(output)
            else:
                task_outputs[self.current_task] = [output]
        else:
            task_outputs = {}
            self.tainted_outputs[self.current_task_group] = task_outputs
            task_outputs[self.current_task] = [output]
        self._print_tainted_outputs()
 
    def is_output_tainted(self, output : str):
        if "==" in output:
            output = output.split("==")[0].strip()
        path = output.split(".")
        if len(path) <= 1:
            if self.current_task_group in self.tainted_outputs:
                task_outputs = self.tainted_outputs[self.current_task_group]
                if self.current_task in task_outputs:
                    return task_outputs[self.current_task]    
            return None
        elif len(path) == 2:
            if path[1] == "outputs" and self.current_task_group in self.tainted_outputs:
                task_outputs = self.tainted_outputs[self.current_task_group]
                if path[0] in task_outputs:
                    return task_outputs[path[0]]
            return None 
        elif path[1] != "outputs":
            print(f"Invalid output path: {output}")
            return None 
        elif self.current_task_group in self.tainted_outputs:
            task_outputs = self.tainted_outputs[self.current_task_group]
            if path[0] in task_outputs:
                for curr_output in task_outputs[path[0]]:
                    if curr_output.name == path[2]:
                        return curr_output
        return None

    def _print_tainted_outputs(self):
        for task_group in self.tainted_outputs:
            self.print_str(f"Task Group: {task_group}")
            for task in self.tainted_outputs[task_group]:
                self.print_str(f"\tTask: {task}")
                for output in self.tainted_outputs[task_group][task]:
                    self.print_str(f"\t\tOutput: {output}")

#
#  Job output taint tracking features
# 

    def taint_job_output(self, output):
        if self.debug:
            self.print_str(f"Tainting job output {self.current_task_group} || {output}")
        if self.current_task_group in self.tainted_job_outputs:
            self.tainted_job_outputs[self.current_task_group].append(output)
        else:
            self.tainted_job_outputs[self.current_task_group] = [output]

    def is_job_output_tainted(self, output_name):
        path = output_name.split(".")
        if len(path) == 0:
            if output_name in self.tainted_job_outputs:
                return self.tainted_job_outputs[output_name]
            return None 
        elif len(path) == 1 or len(path) == 2:
            # this is passing the entire output object
            if path[0] in self.tainted_job_outputs:
                return self.tainted_job_outputs[path[0]]
            return None 
        elif path[1] == "outputs":
            if path[0] in self.tainted_job_outputs:
                for output in self.tainted_job_outputs[path[0]]:
                    if output.name == path[2]:
                        return output
        return None 

#
#  Input taint tracking features
# 

    def taint_input(self, input_obj):
        if self.debug:
            self.print_str(f"Tainting input {self.current_task_group} || {input_obj}")

        if self.in_composite:
            if input_obj not in self.composite_inputs:
                self.composite_inputs.append(input_obj)
        else:
            if input_obj not in self.tainted_inputs:
                self.tainted_inputs.append(input_obj)
    
    def is_input_tainted(self, input_name):
        if self.debug:
            self.print_str(f"Checking if input {self.current_task_group} || {input_name} is tainted")
        if self.in_composite:
            for input_obj in self.composite_inputs:
                if input_obj.name == input_name:
                    return input_obj
        else:
            for input_obj in self.tainted_inputs:
                if input_obj.name == input_name:
                    return input_obj
        return None

#
#  Taint cleanup functions 
#

    def clear_taint_task_group_level(self):
        self.tainted_envs[self.TASK_GROUP_LEVEL] = []
        self.tainted_args = []

    def clear_taint_task_level(self):
        self.tainted_envs[self.TASK_LEVEL] = []
        self.tainted_args = []

    def set_composite_task(self):
        if self.in_composite:
            self.nested_composite_count += 1
            self.nested_composite_inputs.append(self.composite_inputs)
            self.composite_inputs = []
        else:
            self.in_composite = True
            self.composite_inputs = []
            self.nested_composite_count = 1
        self.saved_task_groups.append(self.current_task_group)
        self.current_task_group = "composite" + str(self.composite_ctr)

    def clear_composite_task(self):
        if self.nested_composite_count > 1:
            self.nested_composite_count -= 1
            self.composite_inputs = self.nested_composite_inputs.pop()
        else:
            self.in_composite = False
            self.composite_inputs = []
            self.nested_composite_count = 0
        self.current_task_group = self.saved_task_groups.pop()

#
# Print functions
# 

    def print_str(self, string):
        prefix = ""
        if self.in_composite:
            prefix = "[Composite] :\t"
        if self.in_reusable:
            prefix = "[Reusable] :\t"
        print(f"{prefix}{string}")

#
# Raise alerts 
# 

    def raise_alert(self, atype, alert, details):
        if self.debug:
            self.print_str(f"!!!!!Raising alert - {self.ALERT_NAME[atype]} {alert}") 
            for alertval in details["TaintRes"]:
                for key, value in alertval.items():
                    self.print_str(f"\t{key} : {value}")
        else:
            self.initialize()
            atype = self.switch_alert(atype)
            if self.in_composite:
                details["composite_action"] = self.current_composite_action
            if self.in_reusable:
                details["reusable_workflow"] = self.reusable_wf_name
            add_result(self.id, atype, alert, details)

    def get_location(self):
        if self.in_composite:
            return TaintObj.IN_COMPOSITE
        elif self.in_reusable:
            return TaintObj.IN_REUSABLE
        else:
            return TaintObj.IN_WORKFLOW

    def get_taint_object_res(self, taint_obj : TaintObj):
        if isinstance(taint_obj, TaintObj):
            return [{
                "name" : taint_obj.name,
                "curr_location" : self.get_location(),
                "root_name" : taint_obj.root_name,
                "root_location" : taint_obj.root_location,
                "root_object" : taint_obj.is_root_object,
                "path" : taint_obj.path,
                "path_count" : taint_obj.path_count,
                "multiple_paths" : taint_obj.multiple_paths,
            }]
        elif isinstance(taint_obj, list) and all(isinstance(x, TaintObj) for x in taint_obj):
            res = []
            for tobj in taint_obj:
                res.extend(self.get_taint_object_res(tobj))
            return res
    
    def switch_alert(self, atype): 
        if self.in_composite:
            return atype * 100
        elif self.in_reusable:
            return atype * 10
        return atype
    