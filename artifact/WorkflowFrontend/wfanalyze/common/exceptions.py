
# create an exception class for utils exception
class UtilsError(Exception):
    def __init__(self, message):
        self.message = message
    
    def __str__(self):
        return self.message

class CodeQLError(Exception):
    def __init__(self, reason, log):
        self.reason = reason
        self.log = log
    
    def get_error_dict(self):
        return {
            "error": self.reason,
            "error_log": self.log
        }

    def __str__(self):
        return self.reason 

# workflow error class
class WorkflowError(Exception):
    def __init__(self, message):
        self.message = message

    def __str__(self):
        return self.message
