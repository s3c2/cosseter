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


# GREG NOTE Overall note: Printing anything during the progress bar will break the progress bar. Will need to remove after debugging

graphql_count = 0
multipleMethods = 0

ghExtractedWithPermissions = {}
gitExtractedWithPermissions = {}
routeExtractedWithPermissions = {}

# load regexDict pickle from regexDictUpdated
with open(os.path.join(SCRIPT_DIR, "regexDictUpdated2"), "rb") as f:
    regexDict = pickle.load(f)
    compiled_patterns = [(re.compile(regex), perms) for regex, perms in regexDict.items()]
    
with open(os.path.join(SCRIPT_DIR, "routesToPermissions"), "rb") as f:    
        routesToPermissions = pickle.load(f)
        # print("Route to Permissions")
        # print(routesToPermissions)  
        # exit(0)  


def extractURL(command_val, workflow_vars, permissions, command_type, k, file):
    global graphql_count, routeExtractedWithPermissions
    flags_values = {}
    flags = []
    commands = []
    second_commands = []
    urls = []
    # methods = []
    method = ''
    url_present = False
    # file the command is in
    present_file = ""
    index = 0
    for key, sections in command_val.items():
        if key == "line":
            # print("sections: ", sections)
            if "gh api graphql" in sections or "https://api.github.com/graphql" in sections:
               graphql_count = graphql_count + 1
               with open(os.path.join(SCRIPT_DIR, "graphql"), "a") as f:
                   f.write(f"{file}: ") 
                   f.write(f"{sections}\n")

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
                # if len(methods) == 0:
                #     methods.append("GET")
                if not method:
                    method = "GET"
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
                    if (words[1][1][1] == "--request" or re.search(r'^-.*X', words[1][1][1])):
                        if words[1][0] == "POST":
                                method = "POST"
                        elif words[1][0] == "PUT":
                            method = "PUT"
                        elif words[1][0] == "DELETE":
                            method = "DELETE"
                        elif words[1][0] == "PATCH":
                            method = "PATCH"
                        elif words[1][0] == "GET":
                            method = "GET"
                        
                            
                    # print(f"{flag} + {value}")   
                    
                elif command_type == "WGET":   
                    if  "--post-data" in words[1][0] or "--post-file" in words[1][0]:
                        method = "POST"
                    elif words[1][0] == "--method=PUT":
                        method = "PUT"
                    elif words[1][0] == "--method=DELETE":
                        method = "DELETE"
                    elif words[1][0] == "--method=PATCH":
                        method = "PATCH"
                    elif words[1][0] == "--method=GET":
                        method = "GET"
                            
            
            if url_present:
                index += 1   
    # if urls:    
    #     print(f"{command_type}: {flags_values} + {type} + {urls}")
    
    for idx, url in enumerate(urls):
        try:
            # if we saved a 
            perms = getPermFromUrl(url, method)
        except:
            print("ERROR")
            print("file: ", file)
            print("url: ", url)
            print("idx: ", idx)
            print("methods: ", method)
            print("urls: ", urls)
            print("Present file: ", present_file)
            exit(1)
        if perms != "none":
            if len(perms) > 0:
                if not url in routeExtractedWithPermissions:
                    routeExtractedWithPermissions[url] = 0
                routeExtractedWithPermissions[url] += 1
            for perm in perms:
                # GREG Note - Special might not be the best way to handle this and I am pretty sure I was the one who put it here lol
                if not ":" in perm:
                    # Not really sure what to do with these values, will need to relook into them
                    if perm == "default":
                        continue
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



needsChecked = set()
def getPermFromUrl(url, method):
    global needsChecked
    # print(url)
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

    # print(f'[{bestRoute}]')
    if bestRoute in routesToPermissions:
        # print(f"PERM FOUND: + {routesToPermissions[bestRoute][0]}")
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


def extractPerms(file):
    # Count for graphql calls that are not handled as of yet
    global graphql_count, multipleMethods, gitExtractedWithPermissions, ghExtractedWithPermissions, routeExtractedWithPermissions

    # load the file with the results extracted by extractResults.py
    with open(file, "r") as f:
        fileReses = json.load(f)

    # 
    with open(os.path.join(SCRIPT_DIR, "routeRuleToRoute"), "rb") as f:
        routeRuleToRoute = pickle.load(f)
        # print(routeRuleToRoute)

    count = 0
    # index for progress bar
    idx = 0
    # permissions extracted from results
    file_to_permissions = {}      
    workflows = set()
    github_workflow = set()
    

    # git commands as a dictionary, key is the command, value is the permission
    git_commands = extract_commands(os.path.join(SCRIPT_DIR, 'git_valid_commands.csv'))
    # gh commands as a dictionary, key is the command, value is the permission
    gh_commands = extract_gh_commands(os.path.join(SCRIPT_DIR, 'gh_valid_commands.csv'))     
    # remove the commands that have nothing for permission
    # GREG NOTE What about the special values? How are they handled (GraphQL)
    git_commands = {key: value for key, value in git_commands.items() if value != "nothing"}

    start_progress("Going through each of the files")

    # turn gh values into arrays with | as a delimter between two items
    for key, value in gh_commands.items():
        gh_commands[key] = value.split("|")
        
    # remove the commands that have nothing for permission
    gh_commands = {key: value for key, value in gh_commands.items() if value[0] != "nothing"}
    
    # Extract permissions from each file in the results
    for file in fileReses:
        # increment progress bar
        progress(idx, len(fileReses))
        permissions = []
        idx += 1
        # Check the verification for the git commands
        
        workflows = fileReses[file]["WORKFLOW"]
        # Workflow pattern
        pattern1 = r'(WORKFLOW_VAR_\d+)=\${{(.*?)}}'
        pattern2 = r'WORKFLOW_VAR_\d+=\${{(.*?)}}'
        # Load WORKFLOW variables
        workflow_vars = {}  
        
        # Workflow variables are replaced with WORKFLOW_VAR_# in the commands 
        for place in fileReses[file]["WORKFLOW"].keys():
            if place == "ROUTES" or place == "MISSINGS":
                continue
            for k,workflow  in workflows.items():
                for key, sections in workflow.items():
                    for words in sections:
                        # $1 is used to store Workflow variables
                        if "$1" in words:
                            # Use regex to extract the workflow variable                                                   
                            match1 = re.search(pattern1, words[1])
                            match2 = re.search(pattern2, words[1])
                            if(match1 and match2):
                                workflow_vars[match1.group(1)] = match2.group(1).strip()
                            
                            # If the workflow variable is a github event url, add it to the workflow_vars dictionary
                            for reg in re.findall(r"github\.event[a-zA-Z_\.]+url", match2.group(1)):
                                if not reg.endswith("html_url"):
                                    if(reg in contexts):
                                        words[1] = words[1].replace(reg, contexts[reg])
                                        workflow_vars[match1.group(1)] = contexts[reg]
                                    github_workflow.add(reg)

       

        # Go through each of the git commands in results
        gits = fileReses[file]["GITS"]
        for place in fileReses[file]["GITS"].keys():
            if place == "ROUTES" or place == "MISSINGS":
                continue
            for k,git  in gits.items():

                flags_values = {}
                flags = []
                commands = []
                second_commands = []
                for key, sections in git.items():
                    if key == "line":
                        # print("sections: ", sections)
                        if "gh api graphql" in sections or "https://api.github.com/graphql" in sections:
                            graphql_count = graphql_count + 1
                            with open(os.path.join(SCRIPT_DIR, "graphql"), "a") as f:
                                f.write(f"{file}: ") 
                                f.write(f"{sections}\n")


                    
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
                            if not command in gitExtractedWithPermissions:
                                gitExtractedWithPermissions[command] = 0
                            gitExtractedWithPermissions[command] += 1
                            
                            # GREG NOTE This seems wrong. This looks like if there is every a write set everything to write?
                            # I think it evens out since almost all git commands are just contents:read or contents:write but should maybe change
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
                            if not second_command in gitExtractedWithPermissions:
                                gitExtractedWithPermissions[second_command] = 0
                            gitExtractedWithPermissions[second_command] += 1
                            if permissions:
                                for i, permission in enumerate(permissions):
                                    if git_commands[second_command].split(":")[1] == "write" and permission.split(":")[1]  == "read":
                                        permissions[i] = git_commands[second_command]
                                
                            else:
                                permissions.append(git_commands[second_command])
        file_to_permissions[file] = permissions
        # print(f"File: {file} + Permission: {permissions}")                        
                                    
        coverages = [] 
            
        # GH
        ghs = fileReses[file]["GHS"]
        # Check the verification for the git commands
        for place in fileReses[file]["GHS"].keys():
            if place == "ROUTES" or place == "MISSINGS":
                continue
            pStart = place.split(":")[0].split("-")
            pEnd = place.split(":")[1].split("-")
            
            coverages.append([pStart, pEnd])
            
            # 1-1-0:54-1-53 
            for k,gh  in ghs.items():
                                  
                flags_values = {}
                flags = []
                commands = []
                second_commands = []
                urls = []
                # methods = []
                method = ''
                url_present = False
                present_file = ""
                
                index = 0
                
                for key, sections in gh.items():
                    if key == "line":
                        # print("sections: ", sections)
                        if "gh api graphql" in sections or "https://api.github.com/graphql" in sections:
                            graphql_count = graphql_count + 1
                            with open(os.path.join(SCRIPT_DIR, "graphql"), "a") as f:
                                f.write(f"{file}: ") 
                                f.write(f"{sections}\n")
                                
                        continue


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
                            if not method:
                                method = "GET"
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
                            
                            
                            if (words[1][1][1] == "--method" or re.search(r'^-.*X', words[1][1][1])):
                                if words[1][0] == "POST":
                                    method = "POST"
                                elif words[1][0] == "PUT":
                                    method = "PUT"
                                elif words[1][0] == "DELETE":
                                    method = "DELETE"
                                elif words[1][0] == "PATCH":
                                    method = "PATCH"
                                elif words[1][0] == "GET":
                                    method = "GET"
                        
                                
                                
                        if url_present:
                            index += 1   
                if second_commands:
                    for second_command in second_commands:
                        if second_command in flags_values:
                            second_commands.remove(second_command)
                                
                # [DONE] GREG NOTE ERROR: Need to change this idx because it matches the main one above 
                for index, url in enumerate(urls):
                    # print(file)

                    try:
                        perms = getPermFromUrl(url, method)
                    except:
                        print("ERROR GH")
                        print("file: ", file)
                        print("url: ", url)
                        print("index: ", index)
                        print("methods: ", method)
                        print("urls: ", urls)
                        print("Present file: ", present_file)
                        exit(1)

                    # NOTE - You might set this in the getPermFromUrl but if you don't, none is not what we use to say no permissions 
                    if perms != "none":
                        if len(perms) > 0:
                            apiCom = "api " + url
                            if not apiCom in ghExtractedWithPermissions:
                                ghExtractedWithPermissions[apiCom] = 0
                            ghExtractedWithPermissions[apiCom] += 1

                        for perm in perms:
                            scope = None
                            permission = None
                            # GREG NOTE I believe this is what I put in to account for the error above
                            if not ":" in perm:
                                # Not really sure what to do with these values, will need to relook into them
                                if perm == "default":
                                    continue
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
                            if len(gh_commands[gh_command]) > 0:
                                if not gh_command in ghExtractedWithPermissions:
                                    ghExtractedWithPermissions[gh_command] = 0
                                ghExtractedWithPermissions[gh_command] += 1
                            
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
             
            coverages.append([pStart, pEnd])
            
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
            
            
            coverages.append([pStart, pEnd])
            
            # 1-1-0:54-1-53
            
            
            for k,wget  in wgets.items():
                extractURL(wget, workflow_vars, permissions, "WGET", k, file)

        # GREG NOTE -> Add Alone url matching (to above curls, wgets and ghs) and if it doesn't match, 
        # do simple regex to find the method (GET, POST, etc), api.github.com, and the route itself (Regex match)
        # Most of this code is in the route section of getPerms (Need to be synced with fastester1 first!!!)

        aloneRoutes = []
        for route in fileReses[file]["ROUTES"]:
            # GREG Note - We also need to match the routes against themselves so we don't have multiple duplicates
            print("Looking at routes now")
            rStart = [route["start"]["col"], route["start"]["line"], route["start"]["offset"]]
            rEnd = [route["end"]["col"], route["end"]["line"], route["end"]["offset"]]

            insideEver = False
            for c in coverages:
                if insideEver:
                    break
                cStart = c[0]
                cEnd = c[1]

                inside = True
                
                if int(cStart[1]) == rStart[1]:
                    if not (int(cStart[0]) <= rStart[0]):
                        inside = False
                        continue
                elif not(int(cStart[1]) < rStart[1]):
                    inside = False
                    continue

                if rEnd[1] == int(cEnd[1]):
                    if not (rEnd[0] <= int(cEnd[0])):
                        inside = False
                        continue
                elif not (rEnd[1] < int(cEnd[1])):
                    inside = False
                    continue
                
                if inside:
                    insideEver = True
            
            if not insideEver:
                # GREG Note - There used to be a file that converted regexs to routes but it needs to be remade
                # Might be easier to map the route found number on the yaml to the 
                # START HERE Tomorrow

                print("Never inside")
                aloneGroup = []
                aloneGroup.append(routeRuleToRoute.get(route["check_id"]))
                place = [route["start"]["col"], route["start"]["line"]]
                aloneGroup.append(place)
                aloneGroup.append(route["extra"]["lines"])

                aloneRoutes.append(aloneGroup)

        actuals = {}
        for a,r in enumerate(aloneRoutes):
            for b,r2 in enumerate(aloneRoutes):
                if a != b:
                    # GREG Note - The routes should have the same start
                    if r[1][0] == r2[1][0] and r[1][1] == r2[1][1]:
                        cPlace = str(r[1][0]) + "-" + str(r[1][1])
                        cRoute = r[0]
                        cLines = r[2]

                        if len(r2[0]) > len(r[0]):
                            cRoute = r2[0]
                            cLines = r2[2]

                        if not cPlace in actuals:
                            actuals[cPlace] = [cRoute, cLines]
                        elif actuals[cPlace][0] != cRoute and len(actuals[cPlace][0]) < len(cRoute):
                            actuals[cPlace] = [cRoute, cLines]

        # Add the permissions attached to the routes
        ts = ["POST", "PUT", "DELETE", "PATCH"]
        for k,v in actuals.items():
            ft = ""
            for t in ts:
                if re.search(t, v[1]):
                    if ft == "":
                        ft = t
                    else:
                        search2 = re.search("[^a-zA-Z]" + ft + "[^a-zA-Z]", v[1])
                        search3 = re.search("[^a-zA-Z]" + t + "[^a-zA-Z]", v[1])

                        if search3 and not search2:
                            ft = t
                        elif search3 and search2:
                            print("MULTIPLE TYPES FOUND")
                            print(ft)
                            print(t)
                            print("-")
                            print(v[1])
                            # exit(1)
                            multipleMethods += 1
                        elif not search2 and not search3:
                            print("No correct method was found BAD")
                            print(ft)
                            print(f)
                            print("-")
                            print(v[1])
                            # exit(1)
                            multipleMethods += 1
            if ft == "":
                ft = "GET"

            fullRoute = ft + " " + v[0]

            # GREG START HERE - Something seems off in the matching of ruleid to the regex that matched. Shouldn't be too crazy of a fix
            if fullRoute in routesToPermissions:
                # print(f"PERM FOUND: + {routesToPermissions[fullRoute][0]}")
                # return routesToPermissions[bestRoute][0][0].replace("|", ":")
                permsToSet = []
                # GREG Note - There is an error here because we overwrote type above. Need to switch that @jonah cause I don't want to break it
                # JONAH Note - CHANGED type to methods 
                if type(routesToPermissions[fullRoute][0][0]) == list:
                    for item in routesToPermissions[fullRoute][0][0]:
                        permsToSet.append(item.replace("|", ":"))
                else:
                    for item in routesToPermissions[fullRoute][0]:
                        permsToSet.append(item.replace("|", ":"))
                # return permsToSet
                if len(permsToSet) != 0:
                    if not fullRoute in routeExtractedWithPermissions:
                        routeExtractedWithPermissions[fullRoute] = 0
                    routeExtractedWithPermissions[fullRoute] += 1

                    for perm in permsToSet:
                        # GREG Note - Special might not be the best way to handle this and I am pretty sure I was the one who put it here lol
                        if not ":" in perm:
                            # Not really sure what to do with these values, will need to relook into them
                            if perm == "default":
                                continue
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

            elif fullRoute != "":
                print("Route needs to be checked: ")
                needsChecked.add(fullRoute)

        file_to_permissions[file] = permissions
        # print(f"File: {file} + Permission: {permission}")             
    with open(os.path.join(SCRIPT_DIR, "workflows_github"), "wb") as f:  
        pickle.dump(github_workflow, f)
    # print(file_to_permissions)   
    
    # Where did my errors go?

    # "trials1/63dd94ac3c0647426a8ca45a/issuePredicterType___check-info___0.sh":
    # to this: {"63dd94ac3c0647426a8ca45a": {"issuePredicterType": {"check-info": [PERMS]}}}

    # formCorrectedPermissions = {}
    # for key, value in file_to_permissions.items():
    #     spl = key.split("/")
    #     workflowId = spl[1]
    #     spl2 = spl[2].split("___")
    #     jobname = spl2[0]
    #     stepid = spl2[1]

    #     if not workflowId in formCorrectedPermissions:
    #         formCorrectedPermissions[workflowId] = {}
        
    #     if not jobname in formCorrectedPermissions[workflowId]:
    #         formCorrectedPermissions[workflowId][jobname] = {}

    #     if not stepid in formCorrectedPermissions[workflowId][jobname]:
    #         formCorrectedPermissions[workflowId][jobname][stepid] = []

    #     for perm in value:
    #         formCorrectedPermissions[workflowId][jobname][stepid].append(perm)

    # with open("file_permissions.json", "w") as f:
    #     json.dump(formCorrectedPermissions, f)    

    with open(os.path.join(SCRIPT_DIR, "file_permissions.json"), "w") as f:
        json.dump(file_to_permissions, f)

    with open(os.path.join(SCRIPT_DIR, "missingRoutesBash.txt"), "w") as f:
        for item in needsChecked:
            f.write(item + "\n")
    
    print("---")
    print("Number of graphql: %d" % graphql_count)
    print("-")
    print("Number of multiple methods: %d" % multipleMethods)
    print("-")
    print("---")
    
    gitPermExtracted = 0
    ghPermExtracted = 0
    routePermExtracted = 0

    for k,v in gitExtractedWithPermissions.items():
        gitPermExtracted += v
    
    for k,v in ghExtractedWithPermissions.items():
        ghPermExtracted += v

    for k,v in routeExtractedWithPermissions.items():
        routePermExtracted += v

    print("Git commands with permissions: %d" % gitPermExtracted)
    print("Gh commands with permissions: %d" % ghPermExtracted)
    print("Routes with permissions: %d" % routePermExtracted)

    # print("Exited Properly")    
    # exit(0)
    
if __name__ == "__main__":
    if len(sys.argv) > 1:
        extractPerms(sys.argv[1])
    else:
        print("Usage: python3 extractPerms.py <results_check.json>")
        print("Note: This script expects the processed output from checkResults.py, not raw Semgrep output")
        sys.exit(1)
    