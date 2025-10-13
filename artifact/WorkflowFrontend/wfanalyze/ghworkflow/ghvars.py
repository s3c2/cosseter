from __future__ import annotations
from typing import List, Dict

import re
import logging

from wfanalyze.common.pylogger import get_logger

logger = get_logger("ghworkflow.ghvars", logging.INFO)

def get_github_variables_from_string(cmd_string : str) -> List[Dict[str, str]]:
    """
    Returns a dictionary of GitHub variables from a string.
    """
    # GitHub variables are in the form of ${{VAR_NAME}}
    # This regex matches the variable name
    if not isinstance(cmd_string, str):
        # log the type of the cmd_string
        logger.debug(f"cmd_string is not a string. It is of type {type(cmd_string)}")
        return []

    # Use a more complex regex
    #regex = r"\${{([a-zA-Z.\-_\(\)= ]+)}}"
    # TODO: check with the team
    # Catch both ${{VAR}} and ${{VAR}}
    regex = r"\${+(.*?)}+"
    matches = re.findall(regex, cmd_string)

    results = []
    for match in matches:
        #print(match)
        # Remove leading and trailing whitespace
        match = match.strip()

        # try to parse it as a github variable
        result = parse_github_var(match)
        if result:
            # check if the result's expression is already in the results
            if result["expression"] not in [x["expression"] for x in results]:
                results.append(result)
        
        # There is a chance that it might be a function
        # merge results with the results from the function and skip duplicates
        results.extend([x for x in parse_github_function(match) if x not in results])

    return results 

# echo \"PULL_REQUEST_TITLE=${{steps.set-branch-name.outputs.result}}\" >> $GITHUB_ENV


GITHUB_FUNC_LIST = [
    "contains",
    "fromJSON",
    "toJSON",
    "startsWith",
    "endsWith",
    "format",
    "join",
    "hashFiles",
    "success",
    "failure",
    "cancelled",
    "always",
]

regex_strings_vars = [
    r"secrets.[A-Za-z0-9_\-.]+",
    r"github.[A-Za-z0-9_\-.]+",
    r"env.[A-Za-z0-9_\-.]+",
    r"steps.[A-Za-z0-9_\-.]+",
    r"matrix.[A-Za-z0-9_\-.]+",
    r"needs.[A-Za-z0-9_\-.]+",
    r"strategy.[A-Za-z0-9_\-.]+",
    r"runner.[A-Za-z0-9_\-.]+",
    r"job.[A-Za-z0-9_\-.]+",
    r"jobs.[A-Za-z0-9_\-.]+",
    r"inputs.[A-Za-z0-9_\-.]+",
    r"GITHUB_[A-Za-z0-9_\-.]+",
    r"RUNNER_[A-Za-z0-9_\-.]+",
]


def parse_github_function(func_str : str):
    """
    Check if the string is a github defined function name
    """
    results = []
    for regexstr in regex_strings_vars:
        matches = re.findall(regexstr, func_str)
        for match in matches:
            result = parse_github_var(match)
            # avoid duplicates, by checking the expression
            if result and result["expression"] not in [x["expression"] for x in results]:
                is_duplicate = False
                for x in results:
                    if result["expression"] in x["expression"]:
                        is_duplicate = True
                        break
                if not is_duplicate:
                    results.append(result)
    return results

def parse_github_var(match : str):
    # check if it's a secret by checking if the match starts with secrets.
    if match.startswith("secrets."):
        # store the secret name, splitting on the first dot
        secret_name = match
        if "." in secret_name:
            secret_name = secret_name.split(".")[1]
        return {
            "name" : secret_name,
            "expression" : f"{match}",
            "type" : "secret"
        }

    # check if it's a github context variable
    if match.startswith("github.") or match.startswith("GITHUB_"):
        # store the context variable name
        context_name = match
        if "." in match:
            context_name = match.split(".", 1)[1]
            if " " in context_name:
                context_name = context_name.split(" ", 1)[0]
        return {
            "name" : context_name,
            "expression" : f"{match}",
            "type" : "context"
        }

    # check if it's an env variable
    if match.startswith("env."):
        # store the env variable name
        env_name = match
        if "." in match:
            env_name = match.split(".", 1)[1]
            if " " in env_name:
                env_name = env_name.split(" ")[0]
        return {
            "name" : env_name,
            "expression" : f"{match}",
            "type" : "env"
        }

    # check if it's a matrix variable
    if match.startswith("matrix."):
        # store the matrix variable name
        matrix_name = match
        if "." in match:
            matrix_name = match.split(".", 1)[1]
        return {
            "name" : matrix_name,
            "expression" : f"{match}",
            "type" : "matrix"
        }
 
    # check if it's a job output variable
    if match.startswith("job."):
        # store the job output variable name
        job_name = match
        if "." in match:
            job_name = match.split(".", 1)[1]
        return {
            "name" : job_name,
            "expression" : f"{match}",
            "type" : "job"
        }
    
    # check if it's a runner variable
    if match.startswith("runner.") or match.startswith("RUNNER_"):
        # store the runner variable name
        runner_name = match
        if "." in match:
            runner_name = match.split(".", 1)[1]
        return {
            "name" : runner_name,
            "expression" : f"{match}",
            "type" : "runner"
        }

    # check if it's a needs variable
    if match.startswith("needs."):
        # TODO: needs variables are a bit more complicated
        # we need to parse the variable name possibly
        # store the needs variable name
        needs_name = match
        if "." in match:
            needs_name = match.split(".", 1)[1]
            if " " in needs_name:
                needs_name = needs_name.split(" ")[0]
        return {
            "name" : needs_name,
            "expression" : f"{match}",
            "type" : "needs"
        }

    # check if it's a steps variable
    if match.startswith("steps."):
        # store the steps variable name
        steps_name = match.split(".", 1)[1]
        return {
            "name" : steps_name,
            "expression" : f"{match}",
            "type" : "steps"
        }

    # check if it's a strategy variable
    if match.startswith("strategy."):
        # store the strategy variable name
        strategy_name = match.split(".", 1)[1]
        return {
            "name" : strategy_name,
            "expression" : f"{match}",
            "type" : "strategy"
        }
    
    # check if it's a inputs variable
    if match.startswith("inputs."):
        # store the inputs variable name
        inputs_name = match.split(".", 1)[1]
        return {
            "name" : inputs_name,
            "expression" : f"{match}",
            "type" : "inputs"
        }
    
    # check if it's a jobs variable
    if match.startswith("jobs."):
        # store the jobs variable name
        jobs_name = match.split(".", 1)[1]
        return {
            "name" : jobs_name,
            "expression" : f"{match}",
            "type" : "jobs"
        }

    
    return None