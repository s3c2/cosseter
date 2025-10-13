import json
import os

from wfanalyze.common.exceptions import CodeQLError
from wfanalyze.common.utils import files_in_folder, find_folder, join_paths, parse_url, path_exists, read_file_all_lines, run_cmd

CODEQL_BIN = os.environ.get("WFANALYZE_CODEQL_BIN", "/mnt/drive/codeql-home/codeql/codeql")
QUERY_PATH = os.environ.get("WFANALYZE_QUERY_PATH", "/home/r3x/WorkflowAnalyzer/qlqueries/")

RESULT_FILES = {"ArgToSink":"DangerousSinks.bqrs", "ArgToOutput":"OutputTainting.bqrs"}
DANGEROUS_SINKS_FILE = "DangerousSinks.bqrs"
LESS_DANGEROUS_SINKS_FILE = "LessDangerousSinks.bqrs"
ENV_SINKS_FILE = "EnvSinks.bqrs"
LESS_ENV_SINKS_FILE = "LessEnvSinks.bqrs"
ENV_OUTPUT_TAINTING_FILE = "EnvOutputTainting.bqrs"
OUTPUT_TAINTING_FILE = "OutputTainting.bqrs"
CONTEXT_SINKS_FILE = "ContextSinks.bqrs"
LESS_CONTEXT_SINKS_FILE = "LessContextSinks.bqrs"
CONTEXT_OUTPUT_FILE = "ContextOutput.bqrs"

# Create Codeql Database for the corresponding repository
def compile_codeql_db(repo_path, output_dir):
    cmd = f"{CODEQL_BIN} database create --language=javascript --mode=brutal --finalize-dataset -s {repo_path} {output_dir}"
    run_cmd(cmd, verbose=True)
    if not _check_if_db_exists(output_dir):
        raise CodeQLError(f"Error Creating DB : {repo_path}", _extract_db_error(repo_path))

def is_valid_codeql_db(repo_path) -> bool:
    if not _check_if_db_exists(repo_path):
        return False
    return True

def run_codeql_query(repo_path):
    # Run Codeql Query
    cmd = f"{CODEQL_BIN} database run-queries --threads=2 {repo_path} {QUERY_PATH}"
    stdout, stderr = run_cmd(cmd, verbose=True)

    # if the query failed, raise an error
    if "A fatal error occurred" in stderr:
        raise CodeQLError(f"Error Running Query : {repo_path} with Error Message on STDERR as : {stderr}", _extract_db_error(repo_path, "queries"))

    # Check if results are present
    folder = find_folder(repo_path, "results/actions-codeql")
    if folder == None:
        raise CodeQLError(f"No results folder found for {repo_path}", _extract_db_error(repo_path, "queries"))

    error = []
    results = {}

    results["ArgToSink"] = parse_arg_to_sink(folder, repo_path)
    results["ArgToLSink"] = parse_arg_to_lsink(folder, repo_path)
    
    results["EnvtoSink"] = parse_env_to_sink(folder, repo_path)
    results["EnvtoLSink"] = parse_env_to_lsink(folder, repo_path)
    
    results["ArgToOutput"] = parse_arg_to_output(folder, repo_path)
    results["EnvtoOutput"] = parse_env_to_output(folder, repo_path)
    
    results["ContextToSink"] = parse_context_to_sink(folder, repo_path)
    results["ContextToLSink"] = parse_context_to_lsink(folder, repo_path)
    results["ContextToOutput"] = parse_context_to_output(folder, repo_path)
    return results


def parse_arg_to_sink(ql_results_folder, repo_path) -> list:
    result_file = join_paths(ql_results_folder, DANGEROUS_SINKS_FILE)
    if not path_exists(result_file):
        raise CodeQLError(f"Unable to find ArgToSink  file - {result_file}", _extract_db_error(repo_path, "queries"))  
    
    # Decode the task
    cmd = f"{CODEQL_BIN} bqrs decode --entities=id,url,string --format json {result_file}"
    stdout, stderr = run_cmd(cmd, trim=False)

    try:
        codeql_res = json.loads(stdout)
    except Exception as e:
        raise CodeQLError(f"Unable to json parse ArgToSink  file - {result_file}", _extract_db_error(repo_path, "queries"))

    return _parse_ArgToSink_results(codeql_res)


def parse_arg_to_lsink(ql_results_folder, repo_path) -> list:
    result_file = join_paths(ql_results_folder, LESS_DANGEROUS_SINKS_FILE)
    if not path_exists(result_file):
        raise CodeQLError(f"Unable to find ArgToLSink  file - {result_file}", _extract_db_error(repo_path, "queries"))  
    
    # Decode the task
    cmd = f"{CODEQL_BIN} bqrs decode --entities=id,url,string --format json {result_file}"
    stdout, stderr = run_cmd(cmd, trim=False)

    try:
        codeql_res = json.loads(stdout)
    except Exception as e:
        raise CodeQLError(f"Unable to json parse ArgToLSink  file - {result_file}", _extract_db_error(repo_path, "queries"))

    return _parse_ArgToSink_results(codeql_res)

def parse_env_to_sink(ql_results_folder, repo_path) -> list:
    result_file = join_paths(ql_results_folder, ENV_SINKS_FILE)
    if not path_exists(result_file):
        raise CodeQLError(f"Unable to find EnvToSink  file - {result_file}", _extract_db_error(repo_path, "queries"))  
    
    # Decode the task
    cmd = f"{CODEQL_BIN} bqrs decode --entities=id,url,string --format json {result_file}"
    stdout, stderr = run_cmd(cmd, trim=False)

    try:
        codeql_res = json.loads(stdout)
    except Exception as e:
        raise CodeQLError(f"Unable to json parse EnvToSink  file - {result_file}", _extract_db_error(repo_path, "queries"))

    return _parse_EnvToSink_results(codeql_res)

def parse_env_to_lsink(ql_results_folder, repo_path) -> list:
    result_file = join_paths(ql_results_folder, LESS_ENV_SINKS_FILE)
    if not path_exists(result_file):
        raise CodeQLError(f"Unable to find EnvToLSink  file - {result_file}", _extract_db_error(repo_path, "queries"))  
    
    # Decode the task
    cmd = f"{CODEQL_BIN} bqrs decode --entities=id,url,string --format json {result_file}"
    stdout, stderr = run_cmd(cmd, trim=False)

    try:
        codeql_res = json.loads(stdout)
    except Exception as e:
        raise CodeQLError(f"Unable to json parse EnvToLSink  file - {result_file}", _extract_db_error(repo_path, "queries"))

    return _parse_EnvToSink_results(codeql_res)

def parse_arg_to_output(ql_results_folder, repo_path) -> list:
    result_file = join_paths(ql_results_folder, OUTPUT_TAINTING_FILE)
    if not path_exists(result_file):
        raise CodeQLError(f"Unable to find ArgToOutput  file - {result_file}", _extract_db_error(repo_path, "queries"))  
    
    # Decode the task
    cmd = f"{CODEQL_BIN} bqrs decode --entities=id,url,string --format json {result_file}"
    stdout, stderr = run_cmd(cmd, trim=False)

    try:
        codeql_res = json.loads(stdout)
    except Exception as e:
        raise CodeQLError(f"Unable to json parse ArgToOutput file - {result_file}", _extract_db_error(repo_path, "queries"))
    
    return _parse_ArgToOutput_results(codeql_res)

def parse_env_to_output(ql_results_folder, repo_path) -> list:
    result_file = join_paths(ql_results_folder, ENV_OUTPUT_TAINTING_FILE)
    if not path_exists(result_file):
        raise CodeQLError(f"Unable to find EnvToOutput  file - {result_file}", _extract_db_error(repo_path, "queries"))  
    
    # Decode the task
    cmd = f"{CODEQL_BIN} bqrs decode --entities=id,url,string --format json {result_file}"
    stdout, stderr = run_cmd(cmd, trim=False)

    try:
        codeql_res = json.loads(stdout)
    except Exception as e:
        raise CodeQLError(f"Unable to json parse EnvToOutput file - {result_file}", _extract_db_error(repo_path, "queries"))
    
    return _parse_EnvToOutput_results(codeql_res)

# 
# Context 
# 

def parse_context_to_sink(ql_results_folder, repo_path) -> list:
    result_file = join_paths(ql_results_folder, CONTEXT_SINKS_FILE)
    if not path_exists(result_file):
        raise CodeQLError(f"Unable to find ContextToSink  file - {result_file}", _extract_db_error(repo_path, "queries"))  
    
    # Decode the task
    cmd = f"{CODEQL_BIN} bqrs decode --entities=id,url,string --format json {result_file}"
    stdout, stderr = run_cmd(cmd, trim=False)

    try:
        codeql_res = json.loads(stdout)
    except Exception as e:
        raise CodeQLError(f"Unable to json parse ContextToSink  file - {result_file}", _extract_db_error(repo_path, "queries"))

    return _parse_ContextToSink_results(codeql_res)

def parse_context_to_output(ql_results_folder, repo_path) -> list:
    result_file = join_paths(ql_results_folder, CONTEXT_OUTPUT_FILE)
    if not path_exists(result_file):
        raise CodeQLError(f"Unable to find ContextToOutput  file - {result_file}", _extract_db_error(repo_path, "queries"))  
    
    # Decode the task
    cmd = f"{CODEQL_BIN} bqrs decode --entities=id,url,string --format json {result_file}"
    stdout, stderr = run_cmd(cmd, trim=False)

    try:
        codeql_res = json.loads(stdout)
    except Exception as e:
        raise CodeQLError(f"Unable to json parse ContextToOutput file - {result_file}", _extract_db_error(repo_path, "queries"))
    
    return _parse_ContextToOutput_results(codeql_res)

def parse_context_to_lsink(ql_results_folder, repo_path) -> list:
    result_file = join_paths(ql_results_folder, LESS_CONTEXT_SINKS_FILE)
    if not path_exists(result_file):
        raise CodeQLError(f"Unable to find ContextToLSink  file - {result_file}", _extract_db_error(repo_path, "queries"))  
    
    # Decode the task
    cmd = f"{CODEQL_BIN} bqrs decode --entities=id,url,string --format json {result_file}"
    stdout, stderr = run_cmd(cmd, trim=False)

    try:
        codeql_res = json.loads(stdout)
    except Exception as e:
        raise CodeQLError(f"Unable to json parse ContextToLSink  file - {result_file}", _extract_db_error(repo_path, "queries"))

    return _parse_ContextToSink_results(codeql_res)

"""
[{'id': 1370617, 'label': "'repository'", 
'url': {'uri': 'file:/home/r3x/projects/WorkflowAnalyzer/test/actions%23checkout/src/input-helper.ts', 'startLine': 22, 'startColumn': 19, 'endLine': 22, 'endColumn': 30}}, 
{'id': 6, 'label': "ghworkflow.ge ... itory')", 
'url': {'uri': 'file:/home/r3x/projects/WorkflowAnalyzer/test/actions%23checkout/src/input-helper.ts', 'startLine': 22, 'startColumn': 5, 'endLine': 22, 'endColumn': 31}}, 
{'id': 0, 'label': 'args',
'url': {'uri': 'file:/home/r3x/projects/WorkflowAnalyzer/test/actions%23checkout/src/git-command-manager.ts', 'startLine': 426, 'startColumn': 60, 'endLine': 426, 'endColumn': 63}},
 'exec']

Format : | Arg | Source | Sink | Function Name | 

Output:
{[
    {
        "name" : "<ArgName>",
        "source" : "<Source URI>",
        "sinks" : [
            {
                "function" : "<functionName>",
                "sink" : "<Sink URI>"
            },
            ... 
        ]
        "sinkset" : set(<functionNames>)
    },
]
}

"""
def _parse_ArgToSink_results(json_data : dict) -> list:
    if "#select" not in json_data:
        return []
    
    tuples = json_data["#select"]['tuples']

    if len(tuples) == 0:
        return []

    # Array of dicts to store the results
    action_arg_set = []
    action_name_set = []

    for tuple in tuples:
        # each row is a tuple
        # This is the label 
        action_arg_name = tuple[0]['label'].strip("'")

        # if the action_arg_name is already present in "name" field, skip it        
        if action_arg_name in action_name_set:
            curr_arg = action_arg_set[action_name_set.index(action_arg_name)]
        else:
            action_name_set.append(action_arg_name)
            curr_arg = {
                "name" : action_arg_name,
                "source" : parse_url(tuple[1]['url']['uri']) + ":" + str(tuple[1]['url']['startLine']) + ":" + str(tuple[1]['url']['startColumn']), 
                "type" : "input",
                "sinks" : [],
                "sinkset" : set()
            }
            action_arg_set.append(curr_arg)

        # Add the details of the sink to the arg_set
        curr_arg["sinks"].append({
            "function" : tuple[3],
            "sink" : parse_url(tuple[2]['url']['uri']) + ":" + str(tuple[2]['url']['startLine']) + ":" + str(tuple[2]['url']['startColumn'])
        })               

        # Add the sink to the list
        curr_arg["sinkset"].add(tuple[3])

    for arg in action_arg_set:
        arg["sinkset"] = list(arg["sinkset"])

    return action_arg_set 

def _parse_EnvToSink_results(json_data : dict) -> list:
    if "#select" not in json_data:
        return []
    
    tuples = json_data["#select"]['tuples']

    if len(tuples) == 0:
        return []

    # Array of dicts to store the results
    action_arg_set = []
    action_name_set = []

    for tuple in tuples:
        # each row is a tuple
        # This is the label 
        action_arg_name = tuple[0].strip("'")

        # if the action_arg_name is already present in "name" field, skip it        
        if action_arg_name in action_name_set:
            curr_arg = action_arg_set[action_name_set.index(action_arg_name)]
        else:
            action_name_set.append(action_arg_name)
            curr_arg = {
                "name" : action_arg_name,
                "source" : parse_url(tuple[1]['url']['uri']) + ":" + str(tuple[1]['url']['startLine']) + ":" + str(tuple[1]['url']['startColumn']), 
                "type" : "env",
                "sinks" : [],
                "sinkset" : set()
            }
            action_arg_set.append(curr_arg)

        # Add the details of the sink to the arg_set
        curr_arg["sinks"].append({
            "function" : tuple[3],
            "sink" : parse_url(tuple[2]['url']['uri']) + ":" + str(tuple[2]['url']['startLine']) + ":" + str(tuple[2]['url']['startColumn'])
        })               

        # Add the sink to the list
        curr_arg["sinkset"].add(tuple[3])

    for arg in action_arg_set:
        arg["sinkset"] = list(arg["sinkset"])

    return action_arg_set 

def _parse_ArgToOutput_results(json_data : dict) -> list:
    if "#select" not in json_data:
        return []

    tuples = json_data["#select"]['tuples']

    if len(tuples) == 0:
        return []

    # Array of dicts to store the results
    action_arg_set = []
    action_name_set = []

    for tuple in tuples:
        # This is the input argument name
        action_arg_name = tuple[0]['label'].strip("'")

        if action_arg_name in action_name_set:
            curr_arg = action_arg_set[action_name_set.index(action_arg_name)]
        else:
            action_name_set.append(action_arg_name)
            curr_arg = {
                "name" : action_arg_name,
                "source" : parse_url(tuple[1]['url']['uri']) + ":" + str(tuple[1]['url']['startLine']) + ":" + str(tuple[1]['url']['startColumn']),
                "type" : "input",
                "output" : [],
                "outputset" : set(),
                "envset" : set(),
                "saveset" : set()
            }
            action_arg_set.append(curr_arg)

        # Add the details of the sink to the arg_set
        curr_arg["output"].append({
            "function" : tuple[3],
            "name" : tuple[4],
            "sink" : parse_url(tuple[2]['url']['uri']) + ":" + str(tuple[2]['url']['startLine']) + ":" + str(tuple[2]['url']['startColumn'])
        }) 

        if tuple[3] == "setOutput":
            curr_arg["outputset"].add(tuple[4])
        elif tuple[3] == "exportVariable":
            curr_arg["envset"].add(tuple[4])
        elif tuple[3] == "saveState":
            curr_arg["saveset"].add(tuple[4])

    for arg in action_arg_set:
        arg["outputset"] = list(arg["outputset"])
        arg["envset"] = list(arg["envset"])
        arg["saveset"] = list(arg["saveset"])        

    return action_arg_set

def _parse_EnvToOutput_results(json_data : dict) -> list:
    if "#select" not in json_data:
        return []

    tuples = json_data["#select"]['tuples']

    if len(tuples) == 0:
        return []

    # Array of dicts to store the results
    action_arg_set = []
    action_name_set = []

    for tuple in tuples:
        # This is the input argument name
        action_arg_name = tuple[0].strip("'")

        if action_arg_name in action_name_set:
            curr_arg = action_arg_set[action_name_set.index(action_arg_name)]
        else:
            action_name_set.append(action_arg_name)
            curr_arg = {
                "name" : action_arg_name,
                "source" : parse_url(tuple[1]['url']['uri']) + ":" + str(tuple[1]['url']['startLine']) + ":" + str(tuple[1]['url']['startColumn']),
                "type" : "env",
                "output" : [],
                "outputset" : set(),
                "envset" : set(),
                "saveset" : set()
            }
            action_arg_set.append(curr_arg)

        # Add the details of the sink to the arg_set
        curr_arg["output"].append({
            "function" : tuple[3],
            "name" : tuple[4],
            "sink" : parse_url(tuple[2]['url']['uri']) + ":" + str(tuple[2]['url']['startLine']) + ":" + str(tuple[2]['url']['startColumn'])
        }) 

        if tuple[3] == "setOutput":
            curr_arg["outputset"].add(tuple[4])
        elif tuple[3] == "exportVariable":
            curr_arg["envset"].add(tuple[4])
        elif tuple[3] == "saveState":
            curr_arg["saveset"].add(tuple[4])

    for arg in action_arg_set:
        arg["outputset"] = list(arg["outputset"])
        arg["envset"] = list(arg["envset"])
        arg["saveset"] = list(arg["saveset"])        

    return action_arg_set

def _parse_ContextToSink_results(json_data : dict) -> list:
    if "#select" not in json_data:
        return []
    
    tuples = json_data["#select"]['tuples']

    if len(tuples) == 0:
        return []

    # Array of dicts to store the results
    action_arg_set = []
    action_name_set = []

    for tuple in tuples:
        # each row is a tuple
        # This is the label 
        action_arg_name = tuple[0]['label'].strip("'")

        # if the action_arg_name is already present in "name" field, skip it        
        if action_arg_name in action_name_set:
            curr_arg = action_arg_set[action_name_set.index(action_arg_name)]
        else:
            action_name_set.append(action_arg_name)
            curr_arg = {
                "name" : action_arg_name,
                "source" : parse_url(tuple[1]['url']['uri']) + ":" + str(tuple[1]['url']['startLine']) + ":" + str(tuple[1]['url']['startColumn']), 
                "type" : "context",
                "sinks" : [],
                "sinkset" : set()
            }
            action_arg_set.append(curr_arg)

        # Add the details of the sink to the arg_set
        curr_arg["sinks"].append({
            "function" : tuple[3],
            "sink" : parse_url(tuple[2]['url']['uri']) + ":" + str(tuple[2]['url']['startLine']) + ":" + str(tuple[2]['url']['startColumn'])
        })               

        # Add the sink to the list
        curr_arg["sinkset"].add(tuple[3])

    for arg in action_arg_set:
        arg["sinkset"] = list(arg["sinkset"])

    return action_arg_set 

def _parse_ContextToOutput_results(json_data : dict) -> list:
    if "#select" not in json_data:
        return []

    tuples = json_data["#select"]['tuples']

    if len(tuples) == 0:
        return []

    # Array of dicts to store the results
    action_arg_set = []
    action_name_set = []

    for tuple in tuples:
        # This is the input argument name
        action_arg_name = tuple[0]

        if action_arg_name in action_name_set:
            curr_arg = action_arg_set[action_name_set.index(action_arg_name)]
        else:
            action_name_set.append(action_arg_name)
            curr_arg = {
                "name" : action_arg_name,
                "source" : parse_url(tuple[1]['url']['uri']) + ":" + str(tuple[1]['url']['startLine']) + ":" + str(tuple[1]['url']['startColumn']),
                "type" : "context",
                "output" : [],
                "outputset" : set(),
                "envset" : set(),
                "saveset" : set()
            }
            action_arg_set.append(curr_arg)

        # Add the details of the sink to the arg_set
        curr_arg["output"].append({
            "function" : tuple[3],
            "name" : tuple[4],
            "sink" : parse_url(tuple[2]['url']['uri']) + ":" + str(tuple[2]['url']['startLine']) + ":" + str(tuple[2]['url']['startColumn'])
        }) 

        if tuple[3] == "setOutput":
            curr_arg["outputset"].add(tuple[4])
        elif tuple[3] == "exportVariable":
            curr_arg["envset"].add(tuple[4])
        elif tuple[3] == "saveState":
            curr_arg["saveset"].add(tuple[4])

    for arg in action_arg_set:
        arg["outputset"] = list(arg["outputset"])
        arg["envset"] = list(arg["envset"])
        arg["saveset"] = list(arg["saveset"])        

    return action_arg_set

def _check_if_db_exists(repo_path) -> bool:
    folder = find_folder(repo_path, "db-javascript")
    if folder == None:
        return False
    return True

def _extract_db_error(repo_path, etype = "create") -> str:
    folder = find_folder(repo_path, "log")
    if folder == None:
        return "No log folder found in {folder} to parse error"
    
    for file in files_in_folder(folder):
        if file.endswith(".log") and etype in file:
            return read_file_all_lines(file)
    
    return "No log file found in log folder : {folder} to parse error"