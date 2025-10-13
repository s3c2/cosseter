import re

GITHUB_TAINT_CI_LIST = [
    r"event\.issue\.title",
    r"event\.issue\.body",
    
    r"event\.pull_request\.title",
    r"event\.pull_request\.body",
    r"event\.pull_request\.head\.ref",
    #r"event\.pull_request\.head\.repo\.default_branch",
    #r"event\.pull_request\.head\.repo\.name",
    #r"event\.pull_request\.changed_files",
    #r"event\.pull_request\.description",
    r"event\.pull_request\.head\.label",
    
    # r"event\.pull_request\.labels.*\.name",
    # r"event\.issue\.labels",
    # r"event\.label\.name",
    
    r"event\.discussion\.title",
    r"event\.discussion\.body",

    r"event\.comment\.body",
    
    r"event\.review\.body",
    r"event\.review_comment\.body",
    r"event\.pages.*\.page_name",
    
    r"event\.commits.*\.message",
    r"event\.commits.*\.author\.email",
    r"event\.commits.*\.author\.name",

    r"event\.head_commit\.message",
    r"event\.head_commit\.author\.email",
    r"event\.head_commit\.author\.name",
    r"event\.head_commit\.committer\.email",
    r"event\.head_commit\.committer\.name",

    r"event\.workflow_run\.head_branch",
    r"event\.workflow_run\.head_commit\.message",
    r"event\.workflow_run\.head_commit\.author\.email",
    r"event\.workflow_run\.head_commit\.author\.name",
    r"event\.workflow_run\.pull_requests.*\.head\.ref",
    r"head_ref",
]

GITHUB_TAINT_CI_OBJECT_LIST = [
    "event.comment",
    
    "event.issue.pull_request",
    "event.issue",

    "event.pull_request",
    "event.pull_request.requested_teams",
    "event.pull_request.commits",
    "event.pull_request.head.repo",
    "event.pull_request.labels",
   
    "event.commits",
    
    "event.workflow_run",
    "event.workflow_run.pull_requests",
]

def is_CIvar_tainted(ci_var : dict, CIplatfrom : str = "github"):
    '''
        Check if the current CI variable is tainted or not
        Return True if it is supposed to be tainted
        This only accounts for the CI variables that can be controlled by some attacker

    Sample ci_var:
        {   
            "name" : env_name,
            "expression" : f"{match}",
            "type" : "env"
        }

    
        Currently only supports Github CI variables
    '''

    if ci_var["type"] == "context":
        # check if the context variable matches any of the regex
        # expressions in GITHUB_TAINT_CI_LIST
        for regexstr in GITHUB_TAINT_CI_LIST:
            if re.match(regexstr, ci_var["name"]):
                return True
    return False

def is_CIvar_tainted_object(ci_var : dict, CIplatfrom : str = "github"):
    if ci_var["type"] == "context":
        # check if the context variable matches any of the regex
        # expressions in GITHUB_TAINT_CI_LIST
        for rstr in GITHUB_TAINT_CI_OBJECT_LIST:
            if rstr == ci_var["name"]:
                return True
    return False

def is_CIvar_tainted_dual(ci_var : dict, CIplatform : str = "github"):
    return is_CIvar_tainted(ci_var, CIplatform) or is_CIvar_tainted_object(ci_var, CIplatform)