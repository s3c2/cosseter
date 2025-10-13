import json
import sys
import os
# Add parent directory to path to import progressTracker
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# Get the directory where this script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

from BashAnalyzer.progressTracker import *
import re
from BashAnalyzer.permExtract.commands import *
import pickle
from BashAnalyzer.permExtract.context_mapping import contexts



# load regexDict pickle from regexDictUpdated
with open(os.path.join(SCRIPT_DIR, "regexDictUpdated2"), "rb") as f:
    regexDict = pickle.load(f)
    compiled_patterns = [(re.compile(regex), perms) for regex, perms in regexDict.items()]

with open(os.path.join(SCRIPT_DIR, "routesToPermissions"), "rb") as f:
        routesToPermissions = pickle.load(f)
        # print("Route to Permissions")
        # print(routesToPermissions)    

# os.chdir("/home/shared/GitHub_Permission_Evaluation/wolsrkflowStepExtractor")

def extractURL(command_val, workflow_vars, permissions, command_type, k, file):
    flags_values = {}
    flags = []
    commands = []
    second_commands = []
    urls = []
    type = []
    url_present = False
    # file the command is in
    present_file = ""
    index = 0
    for key, sections in command_val.items():
        
        for words in sections:
            
            if "FILE" in words:
                present_file = words[1]
            
            if "$COM" in words:
                if(words[1] not in commands):
                    commands.append(words[1])
                
            elif "$URL" in words:
                url = words[1]
                if "WORKFLOW_VAR" in url:
                    for key, value in workflow_vars.items():
                        if key in url:
                            url = url.replace(key, value)
                urls.append(url)
                if len(type) <= index:
                    type.append("GET")
                url_present = True
            elif "$SEC" in words:
                if words[1] not in second_commands:
                    second_commands.append(words[1])
            elif "$FLAG" in words:
                flags.append(words[1])
            elif "$VAL" in words:
                if "$FLAG" not in words[1][1]:
                    print("ERROR, SHOULD NEVER BE FLAG VALUE WITHOUT FLAG")
                    print("KEY WITH ERROR: " + k + ": " + key)
                    exit(1)
                flags_values[words[1][1][1]] = words[1][0]
                if command_type == "CURL":   
                    if (words[1][1][1] == "--request" or words[1][1][1] == "-X"):
                        if len(type) > index:
                            if words[1][0] == "POST":
                                type[index] = "POST"
                            elif words[1][0] == "PUT":
                                type[index] = "PUT"
                        else:
                            if words[1][0] == "POST":
                                type.append("POST")
                            elif words[1][0] == "PUT":
                                type.append("PUT")
                            
                    # print(f"{flag} + {value}")   
                    
                elif command_type == "WGET":   
                    if words[1][1][1] == "--post-data" or words[1][1][1] == "--post-file":
                        if len(type) > index:
                            type[index] = "POST"
                        else:
                            type.append("POST")
                            
            
            if url_present:
                index += 1   
    # if urls:    
    #     print(f"{command_type}: {flags_values} + {type} + {urls}")
    
    for idx, url in enumerate(urls):
            try:
                # if we saved a 
                perms = getPermFromUrl(url, type[idx])
            except:
                print("ERROR")
                print("file: ", file)
                print("url: ", url)
                print("idx: ", idx)
                print("type: ", type)
                print("urls: ", urls)
                print("Present file: ", present_file)
                exit(1)
            if perms != "none":
                for perm in perms:
                    if not ":" in perm:
                        scope = "SPECIAL"
                        permission = perm.strip()
                    else:
                        scope, permission = perm.strip().split(":")
                    # scope, permission = perm.strip().split(":")
                        
                        # Check if the scope already exists in permissions
                    existing_permission = next((p for p in permissions if p.startswith(scope + ':')), None)
                    
                    if existing_permission:
                        # If the scope exists and the permission is 'read', overwrite it
                        if permission.strip() == 'write':
                            permissions.remove(existing_permission)
                            permissions.append(perm.strip())
                    else:
                        # If the scope doesn't exist, add the entire permission to permissions
                        permissions.append(perm.strip())

# print("Two different reges found")
# print(bestRoute)
# print(currRoute)
# print("-")
# print(rs)
# print("-")
# print(r)
# print("-")
# if re.sub(r"{.*?}", "", currRoute) > re.sub(r"{.*?}", "", bestRoute):
#     bestRoute = currRoute
# print("Picked:")
# print(bestRoute)
# print("---")

def parse_message_for_var(message, var):
    """Parse the message field to extract variable values when metavars is missing."""
    if not message:
        return ""

    # Messages are formatted like: "Found X with:|||$VAR1|||value1|||$VAR2|||value2|||..."
    parts = message.split("|||")
    for i, part in enumerate(parts):
        if part.strip() == var and i + 1 < len(parts):
            return parts[i + 1]
    return ""

needsChecked = set()
def getPermFromUrl(url, method):
    global needsChecked
    print(url)
    bestRoute = ""
    # print(len(compiled_patterns))
    for pattern, perms in compiled_patterns:
        if pattern.search(url):
            currRoute = f"{method} {perms[2]}"
            if bestRoute == "":
                bestRoute = currRoute
            elif bestRoute in currRoute:
                bestRoute = currRoute
            elif currRoute in bestRoute:
                continue
            else:
                print("Two different reges found")
                print(bestRoute)
                print(currRoute)
                if re.sub(r"{.*?}", "", currRoute) > re.sub(r"{.*?}", "", bestRoute):
                    bestRoute = currRoute
                print("Picked:")
                print(bestRoute)
                print("---")

            # method_route = f"{perms[1]} {perms[2]}"
            # method_route = f"{method} {perms[2]}"

    print(f'[{bestRoute}]')
    if bestRoute in routesToPermissions:
        print(f"PERM FOUND: + {routesToPermissions[bestRoute][0]}")
        # return routesToPermissions[bestRoute][0][0].replace("|", ":")
        permsToSet = []
        if type(routesToPermissions[bestRoute][0][0]) == list:
            for item in routesToPermissions[bestRoute][0][0]:
                permsToSet.append(item.replace("|", ":"))
        else:
            for item in routesToPermissions[bestRoute][0]:
                permsToSet.append(item.replace("|", ":"))
        return permsToSet
    elif bestRoute != "":
        print("Method above needs checked!")
        needsChecked.add(bestRoute)

    return "none"
# dirToCheck = "/home/jonah/Actions/GitHub_Permission_Evaluation/workflowStepExtractor/tests/results"
# dirToCheck = "/home/jonah/Actions/GitHub_Permission_Evaluation/workflowStepExtractor/results"
# Note: seperateResults directory doesn't exist, only using results
# Results directory is in the parent folder
parent_dir = os.path.dirname(SCRIPT_DIR)
dirToChecks = [os.path.join(parent_dir, "results")]

# dirToChecks = ["./seperateResults"]
# dirToChecks = ["/home/shared/GitHub_Permission_Evaluation/workflowStepExtractor/results_test"]
# dirToChecks = ["/home/gttystah/GitHub_Permission_Evaluation/workflowStepExtractor/HighVulnResults/"]
def getResults():
    fileReses = {}
    errors = []
    numFiles = 0
    print("Getting results")

    for dirToCheck in dirToChecks:
        if not os.path.exists(dirToCheck):
            print(f"Warning: Directory {dirToCheck} does not exist, skipping...")
            continue
        for f in os.listdir(dirToCheck):
            present_file = f
            start_progress("Going through all of the results for %s" % f)
            idx = 0
            with open(dirToCheck + "/" + f, "r") as f:
                data = json.load(f)
            for e in data["errors"]:
                errors.append(e)
            numFiles += len(data["paths"]["scanned"])
            for item in data["results"]:
                progress(idx, len(data["results"]))
                # print(item)
                file = item["path"]
                place = str(item["start"]["col"]) + "-" + str(item["start"]["line"]) + "-" + str(item["start"]["offset"]) + ":" + str(item["end"]["col"]) + "-" + str(item["end"]["line"]) + "-" + str(item["end"]["offset"])
                
                if not file in fileReses:
                    fileReses[file] = {"CURL": {}, "WGET": {}, "GITS": {}, "GHS": {}, "ROUTES": [], "MISSINGS": [], "WORKFLOW" : {}}
                
                if "find-routes" in item["check_id"]:
                    if not "ROUTES" in fileReses[file]:
                        fileReses[file]["ROUTES"] = []
                    fileReses[file]["ROUTES"].append(item)

                    # print("Route found:")
                    # print(item["extra"]["metavars"]["$1"]["abstract_content"])
                    # print("---")
                    continue


                elif "git" in item["check_id"] or "git-" in item["check_id"]:
                    if not place in fileReses[file]["GITS"]:
                        fileReses[file]["GITS"][place] = {}

                    # Special handling for git commands - extract actual command from message
                    if "message" in item["extra"] and "Found git command" in item["extra"]["message"]:
                        # Parse message like: "Found git command with: [$FLAG] [$VAL] [clone] [origin] [$FEQVAL]"
                        msg = item["extra"]["message"]
                        # Extract values within brackets
                        bracket_values = re.findall(r'\[([^\]]+)\]', msg)

                        if len(bracket_values) >= 3:
                            # Position 2 is the git command (e.g., "clone", "push", "pull")
                            git_cmd = bracket_values[2] if bracket_values[2] not in ["$FLAG", "$VAL", "$FEQVAL"] else ""
                            if git_cmd:
                                varPlace = place + "_$COM"
                                fileReses[file]["GITS"][place][varPlace] = [["$COM", git_cmd]]
                                fileReses[file]["GITS"][place][varPlace].append(["FILE", present_file])

                            # Position 3 might have secondary value (e.g., "origin", URL, etc.)
                            if len(bracket_values) >= 4:
                                sec_val = bracket_values[3] if bracket_values[3] not in ["$FLAG", "$VAL", "$FEQVAL", "$SEC"] else ""
                                if sec_val:
                                    varPlace = place + "_$SEC"
                                    fileReses[file]["GITS"][place][varPlace] = [["$SEC", sec_val]]
                                    fileReses[file]["GITS"][place][varPlace].append(["FILE", present_file])

                    flag = None
                    vars = ["$COM", "$SEC", "$FLAG", "$VAL"]
                    for var in vars:
                        varVal = ""
                        if "metavars" in item["extra"] and var in item["extra"]["metavars"].keys():
                            varVal = item["extra"]["metavars"][var]["abstract_content"]
                        elif "message" in item["extra"]:
                            # Fallback: parse from message when metavars is missing
                            varVal = parse_message_for_var(item["extra"]["message"], var)
                        if varVal != "":
                            if "metavars" in item["extra"] and var in item["extra"]["metavars"].keys():
                                varPlace = str(item["extra"]["metavars"][var]["start"]["col"]) + "-" + str(item["extra"]["metavars"][var]["start"]["line"]) + "-" + str(item["extra"]["metavars"][var]["start"]["offset"]) + ":" + str(item["extra"]["metavars"][var]["end"]["col"]) + "-" + str(item["extra"]["metavars"][var]["end"]["line"]) + "-" + str(item["extra"]["metavars"][var]["end"]["offset"])
                            else:
                                # Use the overall item position when metavars is not available
                                varPlace = place + "_" + var

                                                  
                            if var == "$FLAG":
                                flag = [var, varVal]
                                
                            if var == "$VAL" and flag:
                                varVal = [varVal, flag]
                                
                            if var == "$VAL" and not flag:
                                print("Var with no flag. impossible")
                                print(f)
                                print(item)
                                exit(1)
                                
                            if varPlace in fileReses[file]["GITS"][place]:
                                fileReses[file]["GITS"][place][varPlace].append([var, varVal])
                            else:
                                fileReses[file]["GITS"][place][varPlace] = [[var, varVal]]

                elif "gh" in item["check_id"]:
                    if not place in fileReses[file]["GHS"]:
                        fileReses[file]["GHS"][place] = {}

                    vars = ["$POT", "$URL", "$FLAG", "$VAL", "$COM", "$SEC"]

                    # Special handling for gh commands - extract actual commands from message
                    if "message" in item["extra"] and "Found gh command" in item["extra"]["message"]:
                        msg_parts = item["extra"]["message"].split("|||")
                        if len(msg_parts) > 6:
                            # Position 5 contains the first command (e.g., "release")
                            # Position 6 contains the second command (e.g., "download")
                            first_cmd = msg_parts[5] if len(msg_parts) > 5 else ""
                            second_cmd = msg_parts[6].replace("||$FEQVAL\n", "") if len(msg_parts) > 6 else ""

                            # Add $COM and $SEC to the data structure
                            if first_cmd and first_cmd != "$SEC":
                                varPlace = place + "_$COM"
                                fileReses[file]["GHS"][place][varPlace] = [["$COM", first_cmd]]
                                fileReses[file]["GHS"][place][varPlace].append(["FILE", present_file])

                            if second_cmd and second_cmd != "$FEQVAL\n":
                                varPlace = place + "_$SEC"
                                fileReses[file]["GHS"][place][varPlace] = [["$SEC", second_cmd]]
                                fileReses[file]["GHS"][place][varPlace].append(["FILE", present_file])

                    for var in vars:
                        varVal = ""
                        if "metavars" in item["extra"] and var in item["extra"]["metavars"].keys():
                            varVal = item["extra"]["metavars"][var]["abstract_content"]
                        elif "message" in item["extra"]:
                            # Fallback: parse from message when metavars is missing
                            varVal = parse_message_for_var(item["extra"]["message"], var)
                        if varVal != "" :
                            if "metavars" in item["extra"] and var in item["extra"]["metavars"].keys():
                                varPlace = str(item["extra"]["metavars"][var]["start"]["col"]) + "-" + str(item["extra"]["metavars"][var]["start"]["line"]) + "-" + str(item["extra"]["metavars"][var]["start"]["offset"]) + ":" + str(item["extra"]["metavars"][var]["end"]["col"]) + "-" + str(item["extra"]["metavars"][var]["end"]["line"]) + "-" + str(item["extra"]["metavars"][var]["end"]["offset"])
                            else:
                                # Use the overall item position when metavars is not available
                                varPlace = place + "_" + var

                                                  
                            if var == "$FLAG":
                                flag = [var, varVal]
                                
                            if var == "$VAL" and flag:
                                varVal = [varVal, flag]
                                
                            if var == "$VAL" and not flag:
                                print("Var with no flag. impossible")
                                print(f)
                                print(item)
                                exit(1)
                                
                            if varPlace in fileReses[file]["GHS"][place]:
                                fileReses[file]["GHS"][place][varPlace].append([var, varVal])
                            else:
                                fileReses[file]["GHS"][place][varPlace] = [[var, varVal]]
                                fileReses[file]["GHS"][place][varPlace].append(["FILE", present_file])
                
                elif "curl" in item["check_id"]:
                    if not place in fileReses[file]["CURL"]:
                        fileReses[file]["CURL"][place] = {}

                    vars = ["$POT", "$URL", "$FLAG", "$VAL"]
                    
                    for var in vars:
                        varVal = ""
                        if "metavars" in item["extra"] and var in item["extra"]["metavars"].keys():
                            varVal = item["extra"]["metavars"][var]["abstract_content"]
                        elif "message" in item["extra"]:
                            # Fallback: parse from message when metavars is missing
                            varVal = parse_message_for_var(item["extra"]["message"], var)
                        if varVal != "":
                            if "metavars" in item["extra"] and var in item["extra"]["metavars"].keys():
                                varPlace = str(item["extra"]["metavars"][var]["start"]["col"]) + "-" + str(item["extra"]["metavars"][var]["start"]["line"]) + "-" + str(item["extra"]["metavars"][var]["start"]["offset"]) + ":" + str(item["extra"]["metavars"][var]["end"]["col"]) + "-" + str(item["extra"]["metavars"][var]["end"]["line"]) + "-" + str(item["extra"]["metavars"][var]["end"]["offset"])
                            else:
                                # Use the overall item position when metavars is not available
                                varPlace = place + "_" + var

                                                  
                            if var == "$FLAG":
                                flag = [var, varVal]
                                
                            if var == "$VAL" and flag:
                                varVal = [varVal, flag]
                                
                            if var == "$VAL" and not flag:
                                print("Var with no flag. impossible")
                                print(f)
                                print(item)
                                exit(1)
                                
                            if varPlace in fileReses[file]["CURL"][place]:
                                fileReses[file]["CURL"][place][varPlace].append([var, varVal])
                            else:
                                fileReses[file]["CURL"][place][varPlace] = [[var, varVal]]
                                fileReses[file]["CURL"][place][varPlace].append(["FILE", present_file])
                               

                elif "wget" in item["check_id"]:
                    if not place in fileReses[file]["WGET"]:
                        fileReses[file]["WGET"][place] = {}
                                                
                    vars = ["$POT", "$URL", "$FLAG", "$VAL"]
                    
                    for var in vars:
                        varVal = ""
                        if "metavars" in item["extra"] and var in item["extra"]["metavars"].keys():
                            varVal = item["extra"]["metavars"][var]["abstract_content"]
                        elif "message" in item["extra"]:
                            # Fallback: parse from message when metavars is missing
                            varVal = parse_message_for_var(item["extra"]["message"], var)     
                        if varVal != "":
                            if "metavars" in item["extra"] and var in item["extra"]["metavars"].keys():
                                varPlace = str(item["extra"]["metavars"][var]["start"]["col"]) + "-" + str(item["extra"]["metavars"][var]["start"]["line"]) + "-" + str(item["extra"]["metavars"][var]["start"]["offset"]) + ":" + str(item["extra"]["metavars"][var]["end"]["col"]) + "-" + str(item["extra"]["metavars"][var]["end"]["line"]) + "-" + str(item["extra"]["metavars"][var]["end"]["offset"])
                            else:
                                # Use the overall item position when metavars is not available
                                varPlace = place + "_" + var

                                                  
                            if var == "$FLAG":
                                flag = [var, varVal]
                                
                            if var == "$VAL" and flag:
                                if "post" in varVal:
                                    fileReses[file]["WGET"][place]["TYPE"] = "POST"
                                varVal = [varVal, flag]
                              
                                
                            if var == "$VAL" and not flag:
                                print("Var with no flag. impossible")
                                print(f)
                                print(item)
                                exit(1)
                                
                            if varPlace in fileReses[file]["WGET"][place]:
                                fileReses[file]["WGET"][place][varPlace].append([var, varVal])

                            else:
                                fileReses[file]["WGET"][place][varPlace] = [[var, varVal]]
                                fileReses[file]["WGET"][place][varPlace].append(["FILE", present_file])


                    if not "TYPE" in fileReses[file]["WGET"][place]:
                        fileReses[file]["WGET"][place]["TYPE"] = "GET"
                        
                        
                elif "var" in item["check_id"]:
                    if not place in fileReses[file]["WORKFLOW"]:
                        fileReses[file]["WORKFLOW"][place] = {}
                                                
                    vars = ["$1"]
                    
                    for var in vars:
                        varVal = ""
                        if "metavars" in item["extra"] and var in item["extra"]["metavars"].keys():
                            varVal = item["extra"]["metavars"][var]["abstract_content"]
                        elif "message" in item["extra"]:
                            # Fallback: parse from message when metavars is missing
                            varVal = parse_message_for_var(item["extra"]["message"], var)
                        if varVal != "":
                            if "metavars" in item["extra"] and var in item["extra"]["metavars"].keys():
                                varPlace = str(item["extra"]["metavars"][var]["start"]["col"]) + "-" + str(item["extra"]["metavars"][var]["start"]["line"]) + "-" + str(item["extra"]["metavars"][var]["start"]["offset"]) + ":" + str(item["extra"]["metavars"][var]["end"]["col"]) + "-" + str(item["extra"]["metavars"][var]["end"]["line"]) + "-" + str(item["extra"]["metavars"][var]["end"]["offset"])
                            else:
                                # Use the overall item position when metavars is not available
                                varPlace = place + "_" + var
                            if varPlace in fileReses[file]["WORKFLOW"][place]:
                                fileReses[file]["WORKFLOW"][place][varPlace].append([var, varVal])
                            else:
                                fileReses[file]["WORKFLOW"][place][varPlace] = [[var, varVal]]

                    
                
                # elif "find-wget-post" in item["check_id"]:
                #     if not place in fileReses[file]["WGET"]:
                #         fileReses[file]["WGET"][place] = {}

                #     fileReses[file]["WGET"][place]["TYPE"] = "POST"
                    
                    # print(file)
                    # print(place)
                    # print(fileReses[file]["GHS"][place])
                    # print(item["start"])
                    # print(item["end"])
                    # print("---")
                idx += 1         

            end_progress()

    start_progress("Going through each of the files")
    # idx = 0
    idx = 0
    
    
    with open(os.path.join(SCRIPT_DIR, "results_check.json"), "w") as f:
        json.dump(fileReses, f)
        
    
    # git commands as a dictionary, key is the command, value is the permission
    git_commands = extract_commands(os.path.join(SCRIPT_DIR, 'git_valid_commands.csv'))
    # gh commands as a dictionary, key is the command, value is the permission
    gh_commands = extract_gh_commands(os.path.join(SCRIPT_DIR, 'gh_valid_commands.csv'))     
    # remove the commands that dhave nothing for permission
    git_commands = {key: value for key, value in git_commands.items() if value != "nothing"}
    
    # turn gh values into arrays with | as a delimter between two items
    for key, value in gh_commands.items():
        gh_commands[key] = value.split("|")
        
    count = 0
    
    gh_commands = {key: value for key, value in gh_commands.items() if value[0] != "nothing"}
    
    # print(gh_commands)
    
    file_to_permissions = {}
    
    #load FileReses in from results_check.json as a dictionary
    # with open("/home/jonah/Actions/GitHub_Permission_Evaluation/workflowStepExtractor/results_check.json", "r") as f:
    #     fileReses = json.load(f)
        
    workflows = set()
    # print(fileReses)

    github_workflow = set()
    
    
    
    
    # with open("routesToPermissions", "rb") as f:    
    #     routesToPermissions = pickle.load(f)
        
    # print(routesToPermissions)
    

    # with open("regexSetUpdated", "rb") as f:
    #     regexset = pickle.load(f)
        
    # print("regexSET")    
    # print(regexset)
    
    
    for file in fileReses:
        # idx = 0
        
        progress(idx, len(fileReses))
        idx += 1
        # Check the verification for the git commands
        
        workflows = fileReses[file]["WORKFLOW"]
        
        permissions = []
        
                
        # Workflow pattern
        pattern1 = r'(WORKFLOW_VAR_\d+)=\${{(.*?)}}'
        pattern2 = r'WORKFLOW_VAR_\d+=\${{(.*?)}}'
        # Load WORKFLOW variables
        workflow_vars = {}  
        for place in fileReses[file]["WORKFLOW"].keys():
            if place == "ROUTES" or place == "MISSINGS":
                continue
            pStart = place.split(":")[0].split("-")
            pEnd = place.split(":")[1].split("-")
            
            
            insideOne = False
            # 1-1-0:54-1-53
            
                    
            for k,workflow  in workflows.items():
                # if(k == "1-1-0:54-1-53"):
                    git_command = []
                    flags_values = {}
                    flags = []
                    commands = []
                    second_commands = []
                    for key, sections in workflow.items():
                        for words in sections:
                            
                            if "$1" in words:                                                    
                                match1 = re.search(pattern1, words[1])
                                match2 = re.search(pattern2, words[1])
                                
                                # if "github.event" in match2.group(1):
                                #     github_workflow.add(match2.group(1))
                                if(match1 and match2):
                                    workflow_vars[match1.group(1)] = match2.group(1).strip()
                                
                                for reg in re.findall(r"github\.event[a-zA-Z_\.]+url", match2.group(1)):
                                    if not reg.endswith("html_url"):
                                        if(reg in contexts):
                                            words[1] = words[1].replace(reg, contexts[reg])
                                            workflow_vars[match1.group(1)] = contexts[reg]
                                        # print(words)
                                        github_workflow.add(reg)

                            
            
            
            
            # print(workflow_vars)
        # print(workflow_vars)
        gits = fileReses[file]["GITS"]

        # Check the verification for the git commands
        for place in fileReses[file]["GITS"].keys():
            if place == "ROUTES" or place == "MISSINGS":
                continue
            pStart = place.split(":")[0].split("-")
            pEnd = place.split(":")[1].split("-")
            
            
            insideOne = False
            # 1-1-0:54-1-53
            
                
            for k,git  in gits.items():
                # if(k == "1-1-0:54-1-53"):
                    git_command = []
                    flags_values = {}
                    flags = []
                    commands = []
                    second_commands = []
                    for key, sections in git.items():
                        for words in sections:
                            
                            if "$COM" in words:
                                if words[1] not in git_commands:
                                    # print(f"Command: {words[1]} not found in key: {k} + {key}")
                                    count += 1
                                else:
                                    if(words[1] not in commands):
                                        commands.append(words[1])
            
                            elif "$SEC" in words:
                                if words[1] not in second_commands:
                                    second_commands.append(words[1])
                            elif "$FLAG" in words:
                                flags.append(words[1])
                            elif "$VAL" in words:
                                if "$FLAG" not in words[1][1]:
                                    print("ERROR, SHOULD NEVER BE FLAG VALUE WITHOUT FLAG")
                                    print("KEY WITH ERROR: " + k + ": " + key)
                                    exit(1)
                                flags_values[words[1][1][1]] = words[1][0]
                                # print(f"{flag} + {value}")            
                    
                    
                    # print(f"Command: {commands} + {flags} + {flags_values} + {second_commands}")
                    
                    for command in commands:
                        if git_commands[command]:
                            if command == "archive" and "--remote" in flags:
                                command = "archive --remote"
                            elif command == "replay" and "--remotes" in flags:
                                command = "replay --remotes"                                       
                            if git_commands[command]:
                                if permissions:
                                    for i, permission in enumerate(permissions):
                                        if git_commands[command].split(":")[1] == "write" and permission.split(":")[1] == "read":
                                            permissions[i] = git_commands[command]
                                    
                                else:
                                    permissions.append(git_commands[command])
                                
                                
                            
                                
                    # purge second commands if in flags_values
                    if second_commands:
                        for second_command in second_commands:
                            if second_command in flags_values:
                                second_commands.remove(second_command)
                    
                    for second_command in second_commands:
                        if second_command in git_commands:
                            if second_command == "archive" and "--remote" in flags:
                                second_command = "archive --remote"
                            elif second_command == "replay" and "--remotes" in flags:
                                second_command = "replay --remotes"                                       
                            if git_commands[second_command]:
                                if permissions:
                                    for i, permission in enumerate(permissions):
                                        if git_commands[second_command].split(":")[1] == "write" and permission.split(":")[1]  == "read":
                                            permissions[i] = git_commands[second_command]
                                    
                                else:
                                    permissions.append(git_commands[second_command])
        file_to_permissions[file] = permissions
        # print(f"File: {file} + Permission: {permissions}")                        
                                    
                    
            
        # GH
        ghs = fileReses[file]["GHS"]
        # Check the verification for the git commands
        for place in fileReses[file]["GHS"].keys():
            if place == "ROUTES" or place == "MISSINGS":
                continue
            pStart = place.split(":")[0].split("-")
            pEnd = place.split(":")[1].split("-")
            
            
            insideOne = False
            # 1-1-0:54-1-53 
            for k,gh  in ghs.items():
                                  
                flags_values = {}
                flags = []
                commands = []
                second_commands = []
                urls = []
                type = []
                url_present = False
                present_file = ""
                
                index = 0
                
                for key, sections in gh.items():
                    for words in sections:
                        
                        
                        if "FILE" in words:
                            present_file = words[1]
                        if "$COM" in words:
                            if(words[1] not in commands):
                                commands.append(words[1])
                            
                        elif "$URL" in words:
                            url = words[1]
                            if "WORKFLOW_VAR" in url:
                                for key, value in workflow_vars.items():
                                    if key in url:
                                        url = url.replace(key, value)
                            urls.append(url)
                            if len(type) <= index:
                                type.append("GET")
                                index += 1
                            url_present = True      
                        elif "$SEC" in words:
                            if words[1] not in second_commands:
                                second_commands.append(words[1])
                        elif "$FLAG" in words:
                            flags.append(words[1])
                        elif "$VAL" in words:
                            if "$FLAG" not in words[1][1]:
                                print("ERROR, SHOULD NEVER BE FLAG VALUE WITHOUT FLAG")
                                print("KEY WITH ERROR: " + k + ": " + key)
                                exit(1)
                            flags_values[words[1][1][1]] = words[1][0]
                            
                            # Seems off
                            if url_present:
                                if words[1][1][1] == "-X":
                                    print("present_file ", present_file)
                                    print("file ", file)
                                    type[index - 1] = "POST"
                                
                        # if url_present:
                        #     idx += 1   
                if second_commands:
                    for second_command in second_commands:
                        if second_command in flags_values:
                            second_commands.remove(second_command)
                                
                    
                for idx, url in enumerate(urls):
                    print(file)

                    try:
                        perms = getPermFromUrl(url, type[idx])
                    except:
                        print("ERROR GH")
                        print("file: ", file)
                        print("url: ", url)
                        print("idx: ", idx)
                        print("type: ", type)
                        print("urls: ", urls)
                        print("Present file: ", present_file)
                        exit(1)
                    
                    if perms != "none":
                        for perm in perms:
                            scope = None
                            permission = None
                            if not ":" in perm:
                                scope = "SPECIAL"
                                permission = perm.strip()
                            else:
                                scope, permission = perm.strip().split(":")
                            
                            # Check if the scope already exists in permissions
                            existing_permission = next((p for p in permissions if p.startswith(scope + ':')), None)
                            
                            if existing_permission:
                                # If the scope exists and the permission is 'read', overwrite it
                                if permission.strip() == 'write':
                                    permissions.remove(existing_permission)
                                    permissions.append(perm.strip())
                            else:
                                # If the scope doesn't exist, add the entire permission to permissions
                                permissions.append(perm.strip())
                for command in commands:   
                    for second_command in second_commands:
                        gh_command = command + " " + second_command  
                        # print(gh_command)
                        # print(f"GH Command: {gh_command}")                  
                        if gh_command in gh_commands:
                            for gh_perm in gh_commands[gh_command]:
                                scope, permission = gh_perm.split(':')
                            
                                # Check if the scope already exists in permissions
                                existing_permission = next((p for p in permissions if p.startswith(scope + ':')), None)
                                
                                if existing_permission:
                                    # If the scope exists and the permission is 'write', overwrite it
                                    if permission.strip() == 'write':
                                        permissions.remove(existing_permission)
                                        permissions.append(gh_perm.strip())
                                else:
                                    # If the scope doesn't exist, add the entire permission to permissions
                                    permissions.append(gh_perm.strip())
                                                            
                                
                            
        
                    
        curls = fileReses[file]["CURL"]
        # Check the verification for the git commands
        for place in fileReses[file]["CURL"].keys():
            if place == "ROUTES" or place == "MISSINGS":
                continue
            pStart = place.split(":")[0].split("-")
            pEnd = place.split(":")[1].split("-")
            
            
            insideOne = False
            # 1-1-0:54-1-53
            
            
            for k,curl  in curls.items():
                extractURL(curl, workflow_vars, permissions, "CURL", k, file)
                
        wgets = fileReses[file]["WGET"]
        # Check the verification for the git commands
        for place in fileReses[file]["WGET"].keys():
            if place == "ROUTES" or place == "MISSINGS":
                continue
            pStart = place.split(":")[0].split("-")
            pEnd = place.split(":")[1].split("-")
            
            
            insideOne = False
            # 1-1-0:54-1-53
            
            
            for k,wget  in wgets.items():
                extractURL(wget, workflow_vars, permissions, "WGET", k, file)
       
        file_to_permissions[file] = permissions
        # print(f"File: {file} + Permission: {permission}")             
    with open(os.path.join(SCRIPT_DIR, "workflows_github"), "wb") as f:
        pickle.dump(github_workflow, f)
    # print(file_to_permissions)   
    
    # Where did my errors go?

    # "trials1/63dd94ac3c0647426a8ca45a/issuePredicterType___check-info___0.sh":
    # to this: {"63dd94ac3c0647426a8ca45a": {"issuePredicterType": {"check-info": [PERMS]}}}
    formCorrectedPermissions = {}
    for key, value in file_to_permissions.items():
        spl = key.split("/")
        workflowId = spl[1]
        spl2 = spl[2].split("___")
        jobname = spl2[0]
        stepid = spl2[1]

        if not workflowId in formCorrectedPermissions:
            formCorrectedPermissions[workflowId] = {}
        
        if not jobname in formCorrectedPermissions[workflowId]:
            formCorrectedPermissions[workflowId][jobname] = {}

        if not stepid in formCorrectedPermissions[workflowId][jobname]:
            formCorrectedPermissions[workflowId][jobname][stepid] = []

        for perm in value:
            formCorrectedPermissions[workflowId][jobname][stepid].append(perm)

    with open(os.path.join(SCRIPT_DIR, "file_permissions.json"), "w") as f:
        json.dump(formCorrectedPermissions, f)    

    # print("Exited Properly")                                
    # exit(0)
                

if __name__ == "__main__":
    getResults()