import re
from wfanalyze.ghworkflow.ghvars import get_github_variables_from_string

def parse_shell_command(command : str, shell : str):
    if shell == "":
        return parse_bash_command(command)
    if shell == "bash":
        return parse_bash_command(command)
    return {}

def parse_bash_command(command : str):
    # first we get all the ENV variables from the command
    env_vars = re.findall(r"\$[A-Z_]+", command)
    set_envs = []

    # Check if it contians a write to the GITHUB_ENV file
    github_env = re.compile(r"echo \"(?P<output_name>\w+?)=(?P<output_value>.*)\"[ \t]*>>[ \t]*\$GITHUB_ENV")
    github_env_matches = github_env.findall(command)
    for output_name, output_value in github_env_matches:
        set_envs.append({
            "name" : output_name,
            "value" : output_value,
            "type" : "env",
            "CIvars" : get_github_variables_from_string(output_value),
            "comesFrom" : "shell_cmd",
        })

    set_outputs = []
    # Check if it contains a write to the GITHUB_OUTPUT file
    github_output = r"echo \"(?P<output_name>\w+?)=(?P<output_value>.*)\"[ \t]*>>[ \t]*\$GITHUB_OUTPUT"
    github_output_matches = re.findall(github_output, command)
    for output_name, output_value in github_output_matches:
        set_outputs.append({
            "name" : output_name,
            "value" : output_value,
            "type" : "output",
            "CIvars" : get_github_variables_from_string(output_value),
            "comesFrom" : "shell_cmd",
        })

    return {
        "env_vars" : env_vars,
        "set_envs" : set_envs,
        "set_outputs" : set_outputs,
    }

