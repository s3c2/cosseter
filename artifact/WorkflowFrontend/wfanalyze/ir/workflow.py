from wfanalyze.ir.taskgroup import TaskGroup

class Workflow:
    """
        Main class encapsulating the workflow    
    """

    def __init__(self, workflow_dict : dict):
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
            
            "taskgroups" : {
                "XXX" : {},
                "YYY" : {},
                "ZZZ" : {}
            }
        }
        """

        self.uid = workflow_dict.get("uid", None)
        self.wf_name = workflow_dict.get("wf_name", None)

        dependencies = workflow_dict.get("dependencies", {})
        self.dependent_actions = dependencies.get("actions", [])
        self.dependent_workflows = dependencies.get("workflows", [])

        self.reusable = workflow_dict.get("reusable", False)

        self.workflow_inputs = workflow_dict.get("workflow_inputs", [])
        self.workflow_outputs = workflow_dict.get("workflow_outputs", [])
        self.workflow_env = workflow_dict.get("workflow_env", [])

        self.task_groups = []
        for task_group_name, task_group_dict in workflow_dict.get("taskgroups", {}).items():
            self.task_groups.append(TaskGroup(task_group_name, task_group_dict))
    
    def __str__(self):
        ret = "=====================\n"
        ret += f"Workflow : {self.uid}\n"
        ret += f"Reusable : {self.reusable}\n"
        for task_group in self.task_groups:
            ret += str(task_group)
        ret += "=====================\n"
        return ret