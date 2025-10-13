class Task:
    EXEC_TYPE_JS_ACTION = 1
    EXEC_TYPE_DOCKER_ACTION = 2
    EXEC_TYPE_CMD = 3
    
    def __init__(self, task_id : str, task_dict : dict):
        """
        "taskgroup1" : { # TaskGroup is a job
            "dependencies" :  ["taskgroup2", "taskgroup3"], # Needs
            "tasks" : {
                "task1" : { # "task1" is the ID of the step 
                    "name" : "task1",
                    "exec" : {
                        "type" : "js-action|docker-action|cmd", # Type of action run 
                        "command" : "<action-name>/<shell-command>/<docker>", # Action name or shell command
                        "shell" : "<shell>",  # Shell args (python/perl/bash)
                        "CIvars" : [ # CI Variables used in the command ],
                    },
                    "args" : [  # Stores ENV variables, action args, docker stuff
                        {
                            "type" : "string", # string|env|entrypoint|arg
                            "value" : "arg1", # value of the arg
                            "CIvars" : [
                                {
                                    "type" : "env|input|output",
                                    "name" : "GIT_BRANCH",
                                }
                            ]
                        },
                        {
                            "type" : "ENV",
                            "value" : "arg2"
                            "CIvars" : [],
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
        }
        """
        self.id = task_id
        self.name = task_dict.get("name", None)
        
        self.exec = task_dict.get("exec", None)
        if self.exec:
            self.exec_type = self.exec.get("type", None)
            self.exec_command = self.exec.get("command", None)
            self.exec_shell = self.exec.get("shell", None)
            self.exec_CIvars = self.exec.get("CIvars", None)
        else:
            self.exec_type = None
            self.exec_command = None
            self.exec_shell = None
            self.exec_CIvars = None        

        self.args = task_dict.get("args", []) 
        self.outputs = task_dict.get("outputs", [])
        self.inputs = task_dict.get("inputs", [])

    def __str__(self):
        ret = f"\tTask {self.id} : {self.name}\n"
        if self.exec_command:
            ret += f"\t\tExec : {self.exec_type} : {self.exec_command[:min(len(self.exec_command), 20)].replace(chr(10), '<nline>')}...\n"
        else:
            ret += f"\t\tExec : {self.exec_type} : {self.exec_command}\n"
        return ret