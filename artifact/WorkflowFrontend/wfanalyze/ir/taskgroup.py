from wfanalyze.ir.task import Task

class TaskGroup:
    
    def __init__(self, task_group_id : str, task_group_dict : dict):
        """
        {
            "name" : <name>,
            "dependencies" : [],
            "tasks" : {
                "task1" : {},
                "task2" : {},
                "task3" : {},
            }
        }
        """

        self.id = task_group_id
        self.name = task_group_dict.get("name", None)
        self.dependencies = task_group_dict.get("dependencies", [])
        self.env = task_group_dict.get("job_env", [])
        self.workflow_step = task_group_dict.get("workflow_step", False)
        self.outputs = task_group_dict.get("outputs", [])

        self.tasks = []
        for task_id, task_dict in task_group_dict.get("tasks", {}).items():
            self.tasks.append(Task(task_id, task_dict))

    def __str__(self):
        ret = f"TaskGroup {self.id} : {self.name}\n"
        for task in self.tasks:
            ret += str(task)
        return ret