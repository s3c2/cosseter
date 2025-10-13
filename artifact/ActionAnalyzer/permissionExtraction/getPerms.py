import pickle
import os
import re
from permissionExtraction.endpointsUpdated import Endpoints
from pymongo import MongoClient
from tqdm import tqdm

def permissionExtraction(db, extractedPermissionsClassCol):
    # TODO Change this from a path too
    print(os.listdir())
    os.chdir("./ActionAnalyzer/permissionExtraction")
    with open("methodsToPermissions", "rb") as f:
        methodToPermissions = pickle.load(f)

    with open("routesToPermissions", "rb") as f:
        routesToPermissions = pickle.load(f)

    nrtp = {}
    for k,v in routesToPermissions.items():
        nv = []
        if len(v[0]) == 2:
            iss = ""
            pull = ""
            for item in v[0]:
                if "issues" in item:
                    iss = item
                elif "pull" in item:
                    pull = item
            if iss != "" and pull != "":
                v[0] = [iss.replace("issues", "issuesO" if "read" in iss else "issuesWO"), pull.replace("pull_requests", "pull_requestsO" if "read" in pull else "pull_requestsWO")]

        for item in v[1]:
            if type(item) == list:
                for nitem in item:
                    nv.append(nitem)
            else:
                nv.append(item)
        nrtp[k] = [v[0], nv]
    routesToPermissions = nrtp

    with open("regexSetUpdated", "rb") as f:
        regexSet = pickle.load(f)

    with open("regexDictUpdated", "rb") as f:
        regToRoute = pickle.load(f)

    client = MongoClient()
    getCol = client[db]["ExtractedPermissions"]
    updateCol = client[db][extractedPermissionsClassCol]

    # Classifications we want to skip. Right now just unknowns but possibly User-Token and JWT-Token
    skips = ["unknown", "empty", "skipped"]

    foundPerms = {"write": 0, "read": 0}
    permNames = set()
    missingPerms = set()
    missingRoutes = set()
    skippedRoutes = set()
    foundRoutes = set()

    # Debug
    releaseReges = set()

    i = 0

    clen = getCol.count_documents({})
    progress_bar = tqdm(total=clen, desc="Gathering the permissions for action results", unit="actions")
    totalContentsWrite = 0

    for item in getCol.find():
        if updateCol.find_one({"File": item["File"], "Version": item["Version"]}):
            i += 1
            progress_bar.update(1)
            continue

        progress_bar.update(1)
        updated = {}

        bashToPerm = {
            "git archive --remote": "contents|read",
            "git clone": "contents|read",
            "git fetch": "contents|read",
            "git fetch-pack": "contents|read",
            "git http-fetch": "contents|read",
            "git ls-remote": "contents|read",
            "git pull": "contents|read",
            "git receive-pack": "contents|read",
            "git replay --remotes": "contents|read",
            "git request-pull": "contents|read",
            "git scaler": "contents|write",
            "git http-push": "contents|write",
            "git push": "contents|write",
            "git read-tree": "contents|write",
            "git send-pack": "contents|write",
            "git submodule": "contents|write",
            "git upload-archive": "contents|write",
        }

        if "Exec Git Extracted" in item.keys() and len(item["Exec Git Extracted"]) > 0:
            for command in item["Exec Git Extracted"]:
                for k,v in bashToPerm.items():
                    searchK = k
                    searchRemotes = False
                    if "--remote" in k:
                        searchK = k.replace(" --remotes", "").replace("--remote", "")
                        searchRemotes = True

                    if searchK in command and (not searchRemotes or "--remote" in command):
                        p = bashToPerm[k]
                        fullPerm = p
                        p = p.split("|")[-1]

                        permNames.add(fullPerm)
                        if not p in foundPerms:
                            foundPerms[p] = 0
                        foundPerms[p] += 1

                        if not p.lower() in skips:
                            updated[fullPerm] = True

        if "Extracted Git Calls" in item.keys() and len(item["Extracted Git Calls"]) > 0:
            for k,v in item["Extracted Git Calls"].items():
                perm = ""
                if v == "read":
                    perm = "contents|read"
                elif v == "write":
                    perm = "contents|write"
                
                if perm != "":
                    p = perm
                    fullPerm = p
                    p = p.split("|")[-1]

                    permNames.add(fullPerm)
                    if not p in foundPerms:
                        foundPerms[p] = 0
                    foundPerms[p] += 1

                    if not p.lower() in skips:
                        updated[fullPerm] = True

        if "Octokit Methods with Paths" in item.keys() and len(item["Octokit Methods with Paths"]) != 0:
            for pair in item["Octokit Methods with Paths"]:
                spl = pair.split("|")
                if not len(spl) == 2:
                    continue
                both = ".".join(spl)
                if spl[0] in Endpoints.keys() and spl[1] in Endpoints[spl[0]].keys():
                    route = Endpoints[spl[0]][spl[1]][0]
                elif both == "getIDToken.getIDToken":
                    updated["id-token|write"] = True
                    foundPerms["write"] += 1
                    permNames.add("id-token|write")
                elif both == "repos.uploadReleaseAsset":
                    updated["contents|write"] = True
                    foundPerms["write"] += 1
                    permNames.add("contents|write")
                else:
                    missingPerms.add(both)
                    continue
                if route in routesToPermissions.keys():
                    permGroup = routesToPermissions[route][1]
                    if both in permGroup:
                        for p in routesToPermissions[route][0]:
                            if type(p) == list:
                                # Missing fix I think
                                p = p[0]
                            fullPerm = p
                            p = p.split("|")[-1]

                            permNames.add(fullPerm)
                            if not p in foundPerms:
                                foundPerms[p] = 0
                            foundPerms[p] += 1

                            if not p.lower() in skips:
                                updated[fullPerm] = True
                        
        if "Control Dependence" in item.keys() and len(item["Control Dependence"]) != 0:
            bigBreak = False
            for parent, calls in item["Control Dependence"].items():
                if bigBreak:
                    break
                for c in calls:
                    route = "NO_ROUTE_FOUND"
                    both = parent + "." + c
                    if parent in Endpoints.keys() and c in Endpoints[parent].keys():
                        route = Endpoints[parent][c][0]
                    elif both == "getIDToken.getIDToken":
                        updated["id-token|write"] = True
                        foundPerms["write"] += 1
                        permNames.add("id-token|write")
                    else:
                        missingPerms.add(both)
                        continue
                    if route in routesToPermissions.keys():
                        permGroup = routesToPermissions[route][1]
                        if both in permGroup:
                            for p in routesToPermissions[route][0]:
                                if type(p) == list:
                                    # Missing fix I think
                                    p = p[0]
                                fullPerm = p
                                p = p.split("|")[-1]

                                permNames.add(fullPerm)
                                if not p in foundPerms:
                                    foundPerms[p] = 0
                                foundPerms[p] += 1

                                if not p.lower() in skips:
                                    updated[fullPerm] = True

        goodRouteStrings = {}
        routeIndexToPerms = {}
        if "Routes Found" in item.keys() and len(item["Routes Found"]):
            checkedRoutes = set()
            cleanRoutes = {"Routes Found": {}}
            for route in item["Routes Found"]:
                if len(route["Routes"]) > 0 and (len(route["GitHub Apis"]) > 0 or len(route["Rest Types"]) > 0):
                    found = ""
                    for rType in route["Rest Types"]:
                        for t in ["get", "delete", "patch", "post", "put"]:
                            # Not checking for patch in routes that contain patch
                            if t in rType.lower() and found == "":
                                found = t
                            elif t in rType.lower() and not found == t:
                                print("Two different types found")
                                print(rType)
                                print(found)
                                print(t)
                                print("---")
                    if found == "":
                        found = "get"

                    if not found in cleanRoutes["Routes Found"]:
                        cleanRoutes["Routes Found"][found] = {"Routes": set(), "Rest Types": {found}, "GitHub Apis": ["api"]}
                    for r in route["Routes"]:
                        cleanRoutes["Routes Found"][found]["Routes"].add(r)

            newClean = []
            for k,v in cleanRoutes["Routes Found"].items():
                newClean.append(v)
            cleanRoutes["Routes Found"] = newClean

            for route in cleanRoutes["Routes Found"]:
                if len(route["Routes"]) > 0 and (len(route["GitHub Apis"]) > 0 or len(route["Rest Types"]) > 0):
                    for r in route["Routes"]:
                        bestRoute = ""
                        for rs in regexSet:
                            if "releases" in rs:
                                releaseReges.add(rs)
                            if re.search(rs, r):
                                currRoute = "NO_ROUTE_FOUND"
                                if rs in regToRoute.keys():
                                    currRoute = regToRoute[rs][2]
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
                                    print("-")
                                    print(rs)
                                    print("-")
                                    print(r)
                                    print("-")
                                    if re.sub(r"{.*?}", "", currRoute) > re.sub(r"{.*?}", "", bestRoute):
                                        bestRoute = currRoute
                                    print("Picked:")
                                    print(bestRoute)
                                    print("---")
                        if bestRoute == "":
                            skippedRoutes.add(r)
                            continue
                        else:
                            foundRoutes.add(r)

                        found = ""
                        for rType in route["Rest Types"]:
                            for t in ["get", "delete", "patch", "post", "put"]:
                                # Not checking for patch in routes that contain patch
                                if t == "patch":
                                    if bestRoute == "/repos/{owner}/{repo}/dispatches" or bestRoute == "/repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches":
                                        continue
                                if t in rType.lower() and found == "":
                                    bestRoute = t.upper() + " " + bestRoute
                                    found = t
                                elif t in rType.lower() and not found == t:
                                    print("Two different types found")
                                    print(rType)
                                    print(found)
                                    print(t)
                                    print("---")
                        if found == "":
                            bestRoute = "GET " + bestRoute
    
                        if bestRoute in routesToPermissions.keys() and not bestRoute in checkedRoutes:
                            checkedRoutes.add(bestRoute)
                            permGroup = routesToPermissions[bestRoute][0]
                            if not r in goodRouteStrings:
                                goodRouteStrings[r] = {"Permissions": permGroup}
                            elif goodRouteStrings[r]["Permissions"] != permGroup:
                                print("Two different perms found for a route")
                                print(r)
                                print(goodRouteStrings[r]["Permissions"])
                                print(permGroup)
                                print("---")
                                
                            for p in permGroup:
                                if type(p) == list:
                                    # Missing fix I think
                                    p = p[0]
                                fullPerm = p
                                p = p.split("|")[-1]

                                permNames.add(fullPerm)
                                if not p in foundPerms:
                                    foundPerms[p] = 0
                                foundPerms[p] += 1

                                if not p.lower() in skips:
                                    updated[fullPerm] = True
                        elif not bestRoute in checkedRoutes:
                            missingRoutes.add(bestRoute)

                else:
                    for r in route["Routes"]:
                        skippedRoutes.add(r)

            # Capturing any input / where permissions come from for routes
            for routeString in goodRouteStrings:
                for ind, route in enumerate(item["Routes Found"]):
                    if len(route["Routes"]) > 0 and (len(route["GitHub Apis"]) > 0 or len(route["Rest Types"]) > 0):
                        if routeString in route["Routes"]:
                            doubleInd = route["Routes"].index(routeString)
                            indKey = str(ind) + "|" + str(doubleInd)
                            routeIndexToPerms[indKey] = goodRouteStrings[routeString]["Permissions"]

                            if "inputs" in route.keys():
                                for input in route["inputs"]:
                                    if input not in updated:
                                        updated[input] = True
                            if "permissions" in route.keys():
                                for perm in route["permissions"]:
                                    if perm not in updated:
                                        updated[perm] = True

        if not len(updated) == 0 or len(goodRouteStrings) > 0:
            item["Route Indexes To Specific Permissions"] = routeIndexToPerms
            if "contents|write" in updated:
                totalContentsWrite += 1
            item["All Permissions"] = updated
            updateCol.insert_one(item)
        
        i += 1 

    client.close()
    print("Missing Permissions, manually search and add to list")
    print(len(missingPerms))
    for item in missingPerms:
        print(item)
    print("---")
    print(len(missingRoutes))
    for item in missingRoutes:
        print(item)
    print("---")
    print(foundPerms)
    print(permNames)

    with open("nonRoutes.txt", "w") as f:
        for item in skippedRoutes:
            f.write(item + "\n")

    with open("FoundRoutes.txt", "w") as f:
        for item in foundRoutes:
            f.write(item + "\n")

    print(totalContentsWrite)
