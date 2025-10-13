from pymongo import MongoClient
import pickle
import yaml
import json
from tqdm import tqdm
import os

# Globally used throughout
classifications = {"High": {"actions": "write", "contents": "write", "deployments": "write", "id-token": ["write", "read"], "packages": "write", "pages": "write"},
                    "Medium": {"actions": "read", "checks": "read", "checks": ["write", "read"], "discussions": "write", "issues": "write", "pull_requests": "write", "repository_projects": "write", "security_events": ["read", "write"], "statuses": "write"},
                    "Low": {"contents": "read", "deployments": "read",  "issues": "read", "packages": "read", "pages": "read", "pull_requests": "read", "repository_projects": "read", "statuses": "read", "metadata": "read"}}


classifiedPermissions = {
    "actions",
    "contents",
    "deployments", 
    "id-token", 
    "packages",
    "pages",
    "checks",
    "discussions",
    "issues",
    "pull_requests",
    "repository_projects",
    "security_events",
    "statuses"
}


def getPermClassification(
        currentStep = "", # WorkflowId + taskName + StepName
        currentPermissions = {}, # ["contents:write", etc] or {"contents": "write"}
        weirdPerms = {}, # Perms that aren't in the scope: access form
        stepWithSomePermissions = set(), # Number of steps with any permission
        stepWithNonDefault = set(), # Default / Read/Write perm counts
        stepWithDefault = set(),
        stepWithReadOnly = set(),
        stepWithWriteOnly = set(),
        stepWithMixedRW = set(),
        currentHighClassifiedPermissions = {}, # Permission count in total for a step type
        currentMediumClassifiedPermissions = {},
        currentLowClassifiedPermissions = {},
        highStep = set(), # High, Medium, Low, None classification steps
        mediumStep = set(),
        lowStep = set(),
        noneStep = set(),
        errorStep = set(),
        unknownStep = set(),
        otherThanUserSet = set(), # Extracted permissions that aren't available to workflows
        missings = {}, # Permissions that are attached to these "other" permissions 
        extraKeys = set(), # Permission scopes for these
        level = "NONE" # Sets the level (used for the workflow / job level perms)
    ):

    np = {}
    if type(currentPermissions) == list:
        for item in currentPermissions:
            if ":" in item:
                s,a = item.split(":")
                if s != "id-token":
                    s = s.replace("-", "_")
                if s == "pullrequest" or s == "pull_request":
                    s = "pull_requests"
                elif s == "content":
                    s = "contents"
                elif s == "issue":
                    s = "issues"
                
                np[s] = a
            elif not item in ["nothing", "usertoken"]:
                print(item)
                weirdPerms.add(item)
        
        poss = np
    elif type(currentPermissions) == dict:
        ncp = {}
        for k in currentPermissions.keys():
            s = k
            if s != "id-token":
                s = s.replace("-", "_")
            if s == "pullrequest" or s == "pull_request":
                s = "pull_requests"
            elif s == "content":
                s = "contents"
            elif s == "issue":
                s = "issues"
            if s != k:
                pass
                # print(s)
                # print(k)
                # print("---")
            ncp[s] = currentPermissions[k]
        poss = ncp
    else:
        # If this happens in the set permissions that is ok
        print("Wrong input type for the permissions:")
        print(type(currentPermissions))
        print(currentPermissions)
        # exit(1)
        poss = {}

    stepLevel = level

    otherThanUser = False
    for k2, v2 in poss.items():
        if k2 in classifiedPermissions:
            otherThanUser = True
            break
        else:
            extraKeys.add(k2)

    default = None
    readFound = None
    writeFound = None

    if otherThanUser:
        stepWithSomePermissions.add(currentStep)

        default = True
        readFound = False
        writeFound = False
        for k2,v2 in poss.items():
            if not k2 in classifiedPermissions:
                if not k2 in missings.keys():
                    missings[k2] = 0
                missings[k2] += 1
            
            if not (k2 in ["contents", "metadata", "packages"] and v2 == "read"):
                default = False

            if v2 == "read":
                readFound = True

            if v2 == "write":
                writeFound = True

            # Found this error when checking their permissions
            if v2 is None:
                v2 = "BAD_PERM"
            classPerm = k2 + ":" + v2
            
            # If the permission is not in any of the catagories.
            if not k2 in classifications["Medium"].keys() and not k2 in classifications["Low"].keys() and not k2 in classifications["High"].keys():
                if not k2 in missings.keys():
                    missings[k2] = 0
                missings[k2] += 1

                # print(poss)
                continue
            
            # If the permission is just in high
            if not k2 in classifications["Medium"].keys() and not k2 in classifications["Low"].keys():
                stepLevel = "HIGH"
                
                if classPerm not in currentHighClassifiedPermissions:
                    currentHighClassifiedPermissions[classPerm] = 0
                currentHighClassifiedPermissions[classPerm] += 1
                continue
            else:
                if k2 in classifications["High"].keys() and v2 in classifications["High"][k2]:
                    stepLevel = "HIGH"
                    
                    if classPerm not in currentHighClassifiedPermissions:
                        currentHighClassifiedPermissions[classPerm] = 0
                    currentHighClassifiedPermissions[classPerm] += 1
                    continue 
            
            # If the permission is in medium
            if k2 in classifications["Medium"]:
                if not v2 in classifications["Medium"][k2]:
                    # Check to see if the permission is also in low to be safe
                    if k2 in classifications["Low"]:
                        if not v2 in classifications["Low"][k2]:
                            stepLevel = "HIGH"
                            if classPerm not in currentHighClassifiedPermissions:
                                currentHighClassifiedPermissions[classPerm] = 0
                            currentHighClassifiedPermissions[classPerm] += 1
                            continue
                        else:
                            if classPerm not in currentLowClassifiedPermissions:
                                currentLowClassifiedPermissions[classPerm] = 0
                            currentLowClassifiedPermissions[classPerm] += 1
                            if stepLevel == "NONE":
                                stepLevel = "LOW"
                            continue
                else:
                    if classPerm not in currentMediumClassifiedPermissions:
                        currentMediumClassifiedPermissions[classPerm] = 0
                    currentMediumClassifiedPermissions[classPerm] += 1
                    if stepLevel == "LOW" or stepLevel == "NONE":
                        stepLevel = "MEDIUM"
                    continue

            # If the permission is in low
            if k2 in classifications["Low"]:
                if not v2 in classifications["Low"][k2]:
                    stepLevel = "HIGH"
                    if classPerm not in currentHighClassifiedPermissions:
                        currentHighClassifiedPermissions[classPerm] = 0
                    currentHighClassifiedPermissions[classPerm] += 1
                    continue
                else:
                    if classPerm not in currentLowClassifiedPermissions:
                        currentLowClassifiedPermissions[classPerm] = 0
                    currentLowClassifiedPermissions[classPerm] += 1
                    if stepLevel == "NONE":
                        stepLevel = "LOW"
                    continue

        if default:
            stepWithDefault.add(currentStep)
        else:
            stepWithNonDefault.add(currentStep)
            if readFound and writeFound:
                stepWithMixedRW.add(currentStep)
            elif readFound:
                stepWithReadOnly.add(currentStep)
            elif writeFound:
                stepWithWriteOnly.add(currentStep)

    elif len(poss) > 0:
        otherThanUserSet.add(currentStep)

    if stepLevel == "HIGH":
        highStep.add(currentStep)
    elif stepLevel == "MEDIUM":
        mediumStep.add(currentStep)
    elif stepLevel == "LOW":
        lowStep.add(currentStep)
    elif stepLevel == "ERROR":
        errorStep.add(currentStep)
    elif stepLevel == "NONE":
        noneStep.add(currentStep)
    elif stepLevel == "MISSING":
        unknownStep.add(currentStep)
    elif stepLevel == "HIGH-cosseter":
        pass
    else:
        print("Something Missing!")

    return stepLevel, default, readFound, writeFound


def printPermClassifications(
        stepType, # "Bash" or "Action"
        stepWithSomePermissions, # Number of steps with any permission
        stepWithNonDefault, # Default / Read/Write perm counts
        stepWithDefault,
        stepWithReadOnly,
        stepWithWriteOnly,
        stepWithMixedRW,
        currentHighClassifiedPermissions, # Permission count in total for a step type
        currentMediumClassifiedPermissions,
        currentLowClassifiedPermissions,
        highStep, # High, Medium, Low, None classification steps
        mediumStep,
        lowStep,
        noneStep,
        errorStep,
        unknownStep,
        otherThanUserSet, # Extracted permissions that aren't available to workflows
        missings, # Permissions that are attached to these "other" permissions 
        extraKeys # Permission scopes for these
    ):

    print("%s with a high classification: %d" % (stepType, len(highStep)))
    print("%s with a medium classification: %d" % (stepType, len(mediumStep)))
    print("%s with a low classification: %d" % (stepType, len(lowStep)))
    print("%s with no permissions: %d" % (stepType, len(noneStep)))
    print("%s with extra: %d" % (stepType, len(otherThanUserSet)))
    print("%s with an error: %d" % (stepType, len(errorStep)))
    # print("Errored bash with partial permissions: %d" % len(partials))
    print("%s with no data: %d" % (stepType, len(unknownStep)))
    # 354 is the number of not found errors found. These wouldn't show up in the permissions at all
    print("Total Run %s: %d" % (stepType, len(highStep) + len(mediumStep) + len(lowStep) + len(noneStep)))
    print()

    lowPerms = 0
    medPerms = 0
    highPerms = 0

    for k,v in currentHighClassifiedPermissions.items():
        highPerms += v

    for k,v in currentMediumClassifiedPermissions.items():
        medPerms += v

    for k,v in currentLowClassifiedPermissions.items():
        lowPerms += v

    print("Permissions with a high classification: %d" % highPerms)
    print("Permissions with a medium classification: %d" % medPerms)
    print("Permissions with a low classification: %d" % lowPerms)
    print()
                
    print("%s with some permission: %d" % (stepType, len(stepWithSomePermissions)))
    print("%s with default permissions: %d" % (stepType, len(stepWithDefault)))
    print("%s with non default permissions: %d" % (stepType, len(stepWithNonDefault)))
    print("%s with read only permissions: %d" % (stepType, len(stepWithReadOnly)))
    print("%s with write only permissions: %d" % (stepType, len(stepWithWriteOnly)))
    print("%s with mixed R/W permissions: %d" % (stepType, len(stepWithMixedRW)))

    print(extraKeys)
    print("done")


# Any permission types unsure on
unsureActionPermissions = set()

def handleWorkflowContextsIfApplicable(action, actionsToFileAndPerms):
    # Use workflows to get correct permissions for tracked inputs

    permissions = actionsToFileAndPerms[action]["Permissions"]
    finalPermissions = {}
    if type(permissions) == str:
        return [permissions]

    for p in permissions:
        # Change this when needing to verify
        p = p.replace("WO", "").replace("O", "")
        spl = p.split("|")
        if len(spl) == 2:
            k2 = spl[0]
            v2 = spl[1].lower()
        else:
            # print("Unsure on permission [%s] for action [%s]" % (p, action))
            # print(permissions)
            # exit(1)
            unsureActionPermissions.add(p)
            continue

        if k2 == "pull_request" or k2 == "pull_requests" or k2 == "pull-request" or k2 == "pull-requests":
            k2 = "pull_requests"
        if k2 == "issue" or k2 == "issues":
            k2 = "issues"
        if k2 == "content":
            k2 = "contents"

        if not k2 in finalPermissions:
            finalPermissions[k2] = v2
        elif v2 == "write":
            finalPermissions[k2] = v2

    return [finalPermissions]


def getWorkflowAnalysisResults(DB, COL):
    os.chdir("./PermissionEvaluation")
    # Get the Bash script types that are more than just bash 
    with open("./moreBashes", "rb") as f:
        moreBashes = pickle.load(f)

    # Updated permission mapping
    with open("./actionToRelevantInfo.pkl", "rb") as f:
        actionsToFileAndPerms = pickle.load(f)

    bashNums = 0
    mbn = []
    for item in moreBashes:
        num = item.split(" ")[-1]
        try:
            bashNums += int(num)
        except:
            print("[%s] missing num" % item)
        num = " " + num
        item = item[:len(item) - len(num)]
        mbn.append(item)
    moreBashes = mbn

    print()
    datasetClassification = "FULL"
    clientMain = MongoClient("mongodb://localhost:27017/")
    setMainCol = clientMain[DB][COL]
    progressTotal = setMainCol.count_documents({})

    print("Starting the analysis with the following parameters:")
    print("---")
    print(datasetClassification)
    print(COL)
    print(progressTotal)
    print("---")
    
    i = 0
    # Workflows
    workflowsWithJsActions = 0
    workflowsWithOnlyJSActions = 0
    workflowsWithBothJsAndBashCompActions = 0
    workflowUnknowns = 0
    workflowComposition = {}
    workflowOnlyUnknowns = 0

    # Jobs
    jobs = 0
    jobsWithOnlyJavaScriptActions = 0
    jobsWithJsActions = 0
    jobsWithBothJsAndBashCompActions = 0
    jobsUnknown = 0
    jobsOnlyUnknowns = 0

    # new
    workflowsMixed = 0
    jobsMixed = 0
    workflowsWithOnlyBoth = set()
    jobsWithOnlyBoth = {}
    jobsWithOnlyBothNum = 0


    wierds = set()
    steps = 0
    stepsMissed = 0
    stepsTypeNums = {}
    missingAction = {}
    wierds = set()
    tagMissingDict = {}
    nonVerified = set()

    i = 0

    # TODO Change this filepath. Heck add it as input!
    with open("./file_permissions.json", "r") as f:
        stepPermissions = json.load(f)

    # formatting
    formCorrectedPermissions = {}
    perms = {}
    multis = 0
    for key, value in stepPermissions.items():
        if len(value) > 0:
            perms[key] = value
        spl = key.split("/")
        workflowid = spl[1]

        printer = False
        handleCheck = False
        if "____" in key:
            print("FOUND")
            printer = True
            print(key)
            if spl[2].startswith("____"):
                spl[2] = spl[2].replace("____", "DASH___")
                handleCheck = True
        spl2 = spl[2].split("___")
        if spl2[2].startswith("_"):
            spl2[2] = spl[2][1:]
            spl2[1] = spl2[1] + "_"
        if spl2[0] == "DASH" and handleCheck:
            spl2[0] = "_"

        if len(spl) != 3:
            print(spl)
        jobname = spl2[0]
        if len(jobname) == 0:
            print("Bad job name")
            print(spl)
        stepid = spl2[1]
        if len(stepid) == 0:
            print("Step id")
        
        # Known bad:
        if key == "trials1/63c49a1733b087f6bde435b8/update____wfan_d107a51a4f___0.sh":
            workflowid = "63c49a1733b087f6bde435b8"
            jobname = "update_"
            stepid = "wfan_d107a51a4f"
        
        if printer:
            print(workflowid)
            print(jobname)
            print(stepid)
            print("---")



        if not workflowid in formCorrectedPermissions:
            formCorrectedPermissions[workflowid] = {}
        
        if not jobname in formCorrectedPermissions[workflowid]:
            formCorrectedPermissions[workflowid][jobname] = {}

        if not stepid in formCorrectedPermissions[workflowid][jobname]:
            formCorrectedPermissions[workflowid][jobname][stepid] = {}

        if len(formCorrectedPermissions[workflowid][jobname][stepid]) > 0 and len(value) > 0:
            print(jobname)
            print(stepid)
            multis += 1

        for perm in value:    
            if type(perm) == str:
                if ":" in perm:
                    spl = perm.split(":")
                    spl[0] = spl[0].replace("-", "_")
                    if spl[0] == "pullrequest" or spl[0] == "pull_request":
                        spl[0] = "pull_requests"
                    elif spl[0] == "content":
                        spl[0] = "contents"
                    formCorrectedPermissions[workflowid][jobname][stepid][spl[0]] = spl[1]

            elif type(perm) == dict:
                formCorrectedPermissions[workflowid][jobname][stepid] = perm
            else:
                print("Unknown type of perms")
                print(perm)
                exit(1)

    # exit(0)
    stepPermissions = formCorrectedPermissions
    print(multis)
    print(len(stepPermissions))
    stpn = 0
    for k,v in stepPermissions.items():
        for k2, v2 in v.items():
            for k3, v3 in v2.items():
                if len(v3) > 0:
                    stpn += 1
    print(stpn)
    print(len(perms))

    try:
        with open("./errors_tool.json", "r") as f:
            errorStepBig = json.load(f)
    except:
        print("No error file found")
        errorStepBig = {}

    semgrepErrorSteps = {}
    for key in errorStepBig:
        spl = key.split("/")
        workflowid = spl[1]
        spl2 = spl[2].split("___")
        jobname = spl2[0]
        stepid = spl2[1]

        if not workflowid in semgrepErrorSteps:
            semgrepErrorSteps[workflowid] = {}
        
        if not jobname in semgrepErrorSteps[workflowid]:
            semgrepErrorSteps[workflowid][jobname] = set()

        semgrepErrorSteps[workflowid][jobname].add(stepid)
    
    workflowPerms = {}
    workflowCaptures = set()
    workflowPartialCaptures = set()
    jobCaptures = set()
    jobsWithFullCoverage = {}
    jobsWithPartialCoverage = {}

    # Set as a number to remove the erorrs from it later
    bashStepsAnalyzed = 0

    # Bash permission classification sets
    bashWithSomePermissions = set()
    bashWithNonDefault = set()
    bashWithDefault = set()
    bashWithReadOnly = set()
    bashWithWriteOnly = set()
    bashWithMixedRW = set()

    bashHighClassifiedPermissions = {}
    bashMediumClassifiedPermissions = {}
    bashLowClassifiedPermissions = {}

    bashHighStep = set()
    bashMediumStep = set()
    bashLowStep = set()
    bashNoneStep = set()
    bashErrorStep = set()
    bashUnknownStep = set()

    bashOtherThanUserSet = set()
    missings = {}
    bashExtraKeys = set()

    actionWithSomePermissions = set()
    actionWithNonDefault = set()
    actionWithDefault = set()
    actionWithReadOnly = set() 
    actionWithWriteOnly = set() 
    actionWithMixedRW = set()

    actionHighClassifiedPermissions = {}
    actionMediumClassifiedPermissions = {}
    actionLowClassifiedPermissions = {}

    actionHighStep = set()
    actionMediumStep = set()
    actionLowStep = set()
    actionNoneStep = set() 
    actionErrorStep = set()
    actionUnknownStep = set()
    
    actionOtherThanUserSet = set()
    missings = {}
    actionExtraKeys = set()
    
    highStep = set()
    mediumStep = set()
    lowStep = set()
    stepErrors = set()
    noneStep = set()
    
    repoPerms = {}

    bashShellType = 0
    nonBashShellType = 0

    nonFoundwid = set()
    nonFoundJob = set()
    nonFoundStep = set()

    nonFoundAtAll = set()

    filesAgain = set()

    count = 0
    weirdPerms = {}
    errorAction = {}

    workflowGlobalPerms = {}
    workflowsWithSetPerms = {}
    updateFinalResults = False

    if datasetClassification == "FULL":
        updateFinalResults = True

    if updateFinalResults:
        # uDB = "FinalWorkflowResultsS&PAlreadySetInc"
        uDB = "FinalWorkflowResults"
        uCol = "FinalResultsDataset"
        updateClient = MongoClient()
        updateCol = updateClient[uDB][uCol]

    # start_progress("Getting permissions for workflows")

    pb = tqdm(total=progressTotal, desc="Workflow Permissions Extraction", unit="workflow")
    for item in setMainCol.find():
        # progress(i, progressTotal)
        pb.update(1)

        workflowOnlyJSFound = True
        workflowJsContained = False
        workflowBashCompContained = False
        workflowUnknownContain = False
        workflowId = str(item["_id"])
        workflowPerms[workflowId] = {}
        workflowFullCapture = True
        workflowPartialCapture = False
        currentComposition = {"Jobs": [], "Knowns": {}, "Unknowns": {}}
        currentWorkflowGlobalPerms = {}

        # Only works on the main dataset
        # Moved to below
        if COL == "workflowsIrWithPermissions":
            if i >= 100000 and False:
                break

            if not item["repo"] in repoPerms:
                # Set of workflows within, Js or Bash only repo
                repoPerms[item["repo"]] = [set(), True]
            repoPerms[item["repo"]][0].add(workflowId)

        if "taskgroups" in item.keys(): 
            for taskName, task in item["taskgroups"].items(): # Get the job
                jobs += 1
                jobJsOnly = True
                jobJsContained = False
                jobBashCompContained = False
                jobUnknownContain = False
                jobFullCapture = True
                jobPartialCapture = False
                jobPerms = {}
                currentJobComposition = {"Knowns": {}, "Unknowns": {}}

                if "tasks" in task.keys():
                    for stepName, step in task["tasks"].items():
                        count += 1
                        steps += 1
                        stepDone = False
                        bashCheck = False
                        bashPerms = {}
                        actionPerms = {}
                        if "exec" in step.keys():
                            if step["exec"]["type"] == "gh_js_action":
                                jobJsContained = True
                                workflowJsContained = True
                                a = step["exec"]["command"].split("@")[0].replace("/", "#")
                                a = a.lower()
                                if not a in actionsToFileAndPerms.keys():
                                    if a not in missingAction:
                                        missingAction[a] = 0
                                    missingAction[a] += 1
                                    actionErrorStep.add(workflowId + taskName + stepName)
                                    JobsSuAIs = False
                                    workflowSuAIs = False
                                    if "ActionErrors" not in currentJobComposition:
                                        currentJobComposition["ActionErrors"] = set()
                                    currentJobComposition["ActionErrors"].add(a)

                                    if "ActionErrors" not in currentComposition:
                                        currentComposition["ActionErrors"] = set()
                                    currentComposition["ActionErrors"].add(a)
                                else:
                                    stepDone = True
                                    everGood = False
                                    err = False
                                    justErr = False
                                    permResultsForAction = handleWorkflowContextsIfApplicable(a, actionsToFileAndPerms)
                                    for permFull in permResultsForAction:
                                        # If there is a good of the action, then missing isn't bad
                                        if not everGood and type(permFull) != dict and (permFull.upper() == "ERROR" or permFull.upper() == "MISSING"):
                                            # print(permFull)
                                            if permFull == "ERROR":
                                                justErr = True
                                            
                                            actionPerms = permFull
                                            err = True
                                            continue
                                        else:
                                            if type(actionPerms) == str:
                                                actionPerms = {}
                                                everGood = True
                                            elif everGood and type(permFull) != dict:
                                                continue
                                        # print(permFull)
                                        for perm, val in permFull.items():
                                            if not perm in jobPerms:
                                                jobPerms[perm] = val
                                            else:
                                                if val.lower() == "write":
                                                    jobPerms[perm] = val  

                                            if not perm in actionPerms:
                                                actionPerms[perm] = val
                                            else:
                                                if val.lower() == "write":
                                                    actionPerms[perm] = val
                                    if err and not everGood:
                                        if "ActionErrors" not in currentJobComposition:
                                            currentJobComposition["ActionErrors"] = set()
                                        currentJobComposition["ActionErrors"].add(a)

                                        if "ActionErrors" not in currentComposition:
                                            currentComposition["ActionErrors"] = set()
                                        currentComposition["ActionErrors"].add(a)

                                        if justErr:
                                            if a not in errorAction:
                                                errorAction[a] = 0
                                            errorAction[a] += 1
                                        else:
                                            if a not in missingAction:
                                                missingAction[a] = 0
                                            missingAction[a] += 1

                                        stepDone = False
                                        actionErrorStep.add(workflowId + taskName + stepName)
                                    else:
                                        if "gh_js_action" not in currentJobComposition["Knowns"]:
                                            currentJobComposition["Knowns"]["gh_js_action"] = set()
                                        currentJobComposition["Knowns"]["gh_js_action"].add(a)

                                        if "gh_js_action" not in currentComposition["Knowns"]:
                                            currentComposition["Knowns"]["gh_js_action"] = set()
                                        currentComposition["Knowns"]["gh_js_action"].add(a)

                            elif step["exec"]["type"] == "shell_cmd":
                                jobJsOnly = False
                                workflowOnlyJSFound = False
                                shell = step["exec"]["shell"]
                                if shell == "":
                                    shell = "bash"

                                shell = shell.lower()
                                if shell == "bash" or shell in moreBashes:
                                    bashShellType += 1
                                    bashStepsAnalyzed += 1
                                    jobBashCompContained = True
                                    workflowBashCompContained = True
                                    stepDone = True
                                    bashCheck = True

                                    if "bash" not in currentJobComposition["Knowns"]:
                                        currentJobComposition["Knowns"]["bash"] = 0
                                    currentJobComposition["Knowns"]["bash"] += 1

                                    if "bash" not in currentComposition["Knowns"]:
                                        currentComposition["Knowns"]["bash"] = 0
                                    currentComposition["Knowns"]["bash"] += 1

                                    filesAgain.add("%s/%s___%s___" % (workflowId, taskName, stepName))

                                else:
                                    nonBashShellType += 1
                                    if "BashErrors" not in currentJobComposition:
                                        currentJobComposition["BashErrors"] = 0
                                    currentJobComposition["BashErrors"] += 1

                                    if "BashErrors" not in currentComposition:
                                        currentComposition["BashErrors"] = 0
                                    currentComposition["BashErrors"] += 1

                            else:
                                jobUnknownContain = True
                                workflowUnknownContain = True
                                jobJsOnly = False
                                workflowOnlyJSFound = False

                                if not step["exec"]["type"] in currentJobComposition["Unknowns"]:
                                    currentJobComposition["Unknowns"][step["exec"]["type"]] = 0
                                currentJobComposition["Unknowns"][step["exec"]["type"]] += 1

                                if not step["exec"]["type"] in currentComposition["Unknowns"]:
                                    currentComposition["Unknowns"][step["exec"]["type"]] = 0
                                currentComposition["Unknowns"][step["exec"]["type"]] += 1

                            if not step["exec"]["type"] in stepsTypeNums.keys():
                                stepsTypeNums[step["exec"]["type"]] = 0
                            stepsTypeNums[step["exec"]["type"]] += 1

                        else:
                            jobUnknownContain = True
                            workflowUnknownContain = True
                            jobJsOnly = False
                            workflowOnlyJSFound = False

                            if not "MISSING EXEC" in stepsTypeNums.keys():
                                stepsTypeNums["MISSING EXEC"] = 0
                            stepsTypeNums["MISSING EXEC"] += 1

                            if not "MISSING_EXEC" in currentJobComposition["Unknowns"]:
                                currentJobComposition["Unknowns"]["MISSING_EXEC"] = 0
                            currentJobComposition["Unknowns"]["MISSING_EXEC"] += 1

                            if not "MISSING_EXEC" in currentComposition["Unknowns"]:
                                currentComposition["Unknowns"]["MISSING_EXEC"] = 0
                            currentComposition["Unknowns"]["MISSING_EXEC"] += 1

                        if stepDone and workflowId in semgrepErrorSteps.keys():
                            if taskName in semgrepErrorSteps[workflowId].keys():
                                if stepName in semgrepErrorSteps[workflowId][taskName]:
                                    bashCheck = True
                                    bashPerms = "ERROR"
                                    stepDone = False

                        if workflowId in stepPermissions.keys():
                            if taskName in stepPermissions[workflowId].keys():
                                if stepName in stepPermissions[workflowId][taskName].keys():
                                    for perm, val in stepPermissions[workflowId][taskName][stepName].items():
                                        if not perm in jobPerms:
                                            jobPerms[perm] = val
                                        else:
                                            if val.lower() == "write":
                                                jobPerms[perm] = val
                                    stepDone = True
                                    bashCheck = True
                                    bashPerms = stepPermissions[workflowId][taskName][stepName]
                                else:
                                    nonFoundStep.add(stepName)
                            else:
                                nonFoundJob.add(taskName)
                        else:
                            nonFoundwid.add(workflowId)

                        # Sometimes the bash step had a minor error, but that didn't prevent analysis (very rarely)
                        if not stepDone and bashCheck and bashPerms == "ERROR":
                            currentJobComposition["Knowns"]["bash"] -= 1

                            currentComposition["Knowns"]["bash"] -= 1

                            if "BashErrors" not in currentJobComposition:
                                currentJobComposition["BashErrors"] = 0
                            currentJobComposition["BashErrors"] += 1

                            if "BashErrors" not in currentComposition:
                                currentComposition["BashErrors"] = 0
                            currentComposition["BashErrors"] += 1
 
                        if not stepDone:
                            jobFullCapture = False
                            workflowFullCapture = False
                            stepsMissed += 1
                            if bashCheck:
                                bashErrorStep.add(workflowId + taskName + stepName)
                            stepErrors.add(workflowId + taskName + stepName)
                        else:
                            jobPartialCapture = True
                            workflowPartialCapture = True
                            uniqueStepID = workflowId + taskName + stepName
                            

                            if bashCheck:
                                getPermClassification(uniqueStepID, bashPerms, weirdPerms, bashWithSomePermissions, bashWithNonDefault, bashWithDefault, 
                                                  bashWithReadOnly, bashWithWriteOnly, bashWithMixedRW, bashHighClassifiedPermissions, bashMediumClassifiedPermissions, 
                                                  bashLowClassifiedPermissions, bashHighStep, bashMediumStep, bashLowStep, bashNoneStep, bashErrorStep, bashUnknownStep, 
                                                  bashOtherThanUserSet, missings, bashExtraKeys)
                            else:
                                getPermClassification(uniqueStepID, actionPerms, weirdPerms, actionWithSomePermissions, actionWithNonDefault, actionWithDefault, 
                                                  actionWithReadOnly, actionWithWriteOnly, actionWithMixedRW, actionHighClassifiedPermissions, actionMediumClassifiedPermissions, 
                                                  actionLowClassifiedPermissions, actionHighStep, actionMediumStep, actionLowStep, actionNoneStep, actionErrorStep, actionUnknownStep, 
                                                  actionOtherThanUserSet, missings, actionExtraKeys)

                            if uniqueStepID in bashHighStep or uniqueStepID in actionHighStep:
                                highStep.add(uniqueStepID)
                            
                            if uniqueStepID in bashMediumStep or uniqueStepID in actionMediumStep:
                                mediumStep.add(uniqueStepID)
                            
                            if uniqueStepID in bashLowStep or uniqueStepID in actionLowStep:
                                lowStep.add(uniqueStepID)

                            if uniqueStepID in bashNoneStep or uniqueStepID in actionNoneStep:
                                noneStep.add(uniqueStepID)

                currentComposition["Jobs"].append(currentJobComposition)     

                if not jobFullCapture:
                    workflowFullCapture = False
                    if jobPartialCapture:
                        if not workflowId in jobsWithPartialCoverage:
                            jobsWithPartialCoverage[workflowId] = []
                        jobsWithPartialCoverage[workflowId].append(taskName)
                else:
                    if not workflowId in jobsWithPartialCoverage:
                        jobsWithPartialCoverage[workflowId] = []
                    jobsWithPartialCoverage[workflowId].append(taskName)
                    
                    if not workflowId in jobsWithFullCoverage:
                        jobsWithFullCoverage[workflowId] = []
                    jobsWithFullCoverage[workflowId].append(taskName)
                    jobCaptures.add(workflowId)

                if jobJsOnly:
                    jobsWithOnlyJavaScriptActions += 1
                
                if jobJsContained:
                    jobsWithJsActions += 1

                if jobJsContained and jobBashCompContained:
                    jobsWithBothJsAndBashCompActions += 1
                
                if (jobJsContained or jobBashCompContained) and not jobUnknownContain:
                    if not workflowId in jobsWithOnlyBoth:
                        jobsWithOnlyBoth[workflowId] = []
                    jobsWithOnlyBoth[workflowId].append(taskName)
                    jobsWithOnlyBothNum += 1
                     
                if (jobJsContained or jobBashCompContained) and jobUnknownContain:
                    jobsMixed += 1

                if jobUnknownContain:
                    jobsUnknown += 1

                if not (jobJsContained or jobBashCompContained) and jobUnknownContain:
                    jobsOnlyUnknowns += 1

                workflowPerms[workflowId][taskName] = jobPerms

                item["taskgroups"][taskName]["PermissionsToSet"] = jobPerms
                for k,v in jobPerms.items():
                    if not k in classifiedPermissions:
                        continue

                    if not k in currentWorkflowGlobalPerms:
                        currentWorkflowGlobalPerms[k] = v
                    else:
                        if currentWorkflowGlobalPerms[k].lower() == "read":
                            currentWorkflowGlobalPerms[k] = v
                

        if workflowOnlyJSFound:
            workflowsWithOnlyJSActions += 1

        if workflowJsContained:
            workflowsWithJsActions += 1
                            
        if workflowJsContained and workflowBashCompContained:
            workflowsWithBothJsAndBashCompActions += 1
        
        if (workflowJsContained or workflowBashCompContained) and not workflowUnknownContain:
            workflowsWithOnlyBoth.add(workflowId)
        else:
            if COL == "workflowsIrWithPermissions":
                repoPerms[item["repo"]][1] = False
         
        if (workflowJsContained or workflowBashCompContained) and workflowUnknownContain:
            workflowsMixed += 1

        if workflowFullCapture:
            workflowCaptures.add(workflowId)
        elif workflowPartialCapture and ((workflowJsContained or workflowBashCompContained) and not workflowUnknownContain):
            workflowPartialCaptures.add(workflowId)

        if workflowUnknownContain:
            workflowUnknowns += 1
        
        if not (workflowJsContained or workflowBashCompContained) and workflowUnknownContain:
            workflowOnlyUnknowns += 1

        workflowComposition[workflowId] = currentComposition
        
        item["GlobalPermissionsToSet"] = currentWorkflowGlobalPerms

        if workflowFullCapture:
            workflowGlobalPerms[workflowId] = currentWorkflowGlobalPerms
            currentSetJobPerms = {}
            currentSetGlobalPerms = {}
            if ("yaml" in item and "permissions" in item["yaml"]) or ("workflow_yaml" in item and "permissions" in item["workflow_yaml"]):
                gatherStr = "yaml"
                if "workflow_yaml" in item:
                    gatherStr = "workflow_yaml"
                try:
                    glob = False
                    wf = yaml.safe_load(item[gatherStr])
                    if "permissions" in wf.keys():
                        glob = True
                        currentSetGlobalPerms = wf["permissions"]
                    
                    for k,v in wf["jobs"].items():
                        if "permissions" in v.keys():
                            currentSetJobPerms[k] = v["permissions"]
                        elif glob:
                            currentSetJobPerms[k] = currentSetGlobalPerms
                        else: # Setting perms to high if none are specified
                            currentSetJobPerms[k] = ["write-all-cosseter"]

                except Exception as e:
                    print("Error: [%s]" % str(e))
            if len(currentSetJobPerms) > 0 or len(currentSetGlobalPerms):
                workflowsWithSetPerms[workflowId] = [currentSetGlobalPerms, currentSetJobPerms]
                item["AlreadySetPerms"] = [currentSetGlobalPerms, currentSetJobPerms]

        # Relaxed this contraint for open sourcing the tool. If you only want the full capture workflows, move it back
        if updateFinalResults:
            updateCol.insert_one(item)
        
        i += 1


    clientMain.close()
    if updateFinalResults:
        updateClient.close()
    # end_progress()

    print("Unsure permission types for JavaScript actions: %d" % len(unsureActionPermissions))
    print("---")
    for uap in unsureActionPermissions:
        print(uap)
    print("---")

    levelsForSet = {"HIGH-cosseter":set(), "HIGH": set(), "MEDIUM": set(), "LOW": set(), "NONE": set()}
    for k,v in workflowsWithSetPerms.items():
        level = "NONE"
        # print(k)
        # print("---")
        # print("Global")
        if len(v[0]) > 0 and False: # captured in jobs now
            print(v[0])
            if "write-all" in v[0]:
                level = "HIGH"
                continue
            res = getPermClassification(currentPermissions=v[0], level=level)
            level = res[0]
            print(res)
        # print("---")
        # print("Job Level")
        for k2, v2 in v[1].items():
            # print(v2)
            if len(v2) > 0:
                if "write-all-cosseter" in v2:
                    level = "HIGH-cosseter"
                    continue
                if "write-all" in v2:
                    level = "HIGH"
                    continue
                if "read-all" in v2:
                    level = "MEDIUM"
                    continue
                res = getPermClassification(currentPermissions=v2, level=level)
                level = res[0]
                # print(res)
        # print("---")
        # print("Level: %s" % level)
        levelsForSet[level].add(k)

        # break
    print("Levels for set perms:")
    for k,v in levelsForSet.items():
        print("%s: %s" % (k,len(v)))

    print("Number of captured permissions: %d" % len(workflowGlobalPerms))
    print("Number of workflows with full coverage: %d" % len(workflowCaptures))
    print("Number of workflows with already set perms: %d" % len(workflowsWithSetPerms))
    # print("Number of high permissions already set: %d" % numHighs)

    permissionAvg = 0
    for k,v in workflowGlobalPerms.items():
        permissionAvg += len(v)
    if len(workflowCaptures) > 0:
        permissionAvg = permissionAvg / len(workflowCaptures)
    else:
        permissionAvg = 0
    print("Avg permissions per workflow: %d" % permissionAvg)

    ## Table variables
    # Repo
    repoTableTotal = 0
    repoTableFull = 0
    repoTablePartial = 0
    repoTableNone = 0
    repoTableHigh = 0
    repoTableMedium = 0
    repoTableLow = 0
    repoTableNoPerm = 0
    repoTableDefault = 0
    repoTableNonDefaultRead = 0
    repoTableNonDefaultWrite = 0
    repoTableNonMixed = 0

    # Workflow
    workflowTableTotal = 0
    workflowTableFull = 0
    workflowTablePartial = 0
    workflowTableNone = 0
    workflowTableHigh = 0
    workflowTableMedium = 0
    workflowTableLow = 0
    workflowTableNoPerm = 0
    workflowTableDefault = 0
    workflowTableNonDefaultRead = 0
    workflowTableNonDefaultWrite = 0
    workflowTableNonMixed = 0

    # Job
    jobTableTotal = 0
    jobTableFull = 0
    jobTablePartial = 0
    jobTableNone = 0
    jobTableHigh = 0
    jobTableMedium = 0
    jobTableLow = 0
    jobTableNoPerm = 0
    jobTableDefault = 0
    jobTableNonDefaultRead = 0
    jobTableNonDefaultWrite = 0
    jobTableNonMixed = 0

    # StepAll
    stepAllTableTotal = 0
    stepAllTableFull = 0
    stepAllTablePartial = 0
    stepAllTableNone = 0
    stepAllTableHigh = 0
    stepAllTableMedium = 0
    stepAllTableLow = 0
    stepAllTableNoPerm = 0
    stepAllTableDefault = 0
    stepAllTableNonDefaultRead = 0
    stepAllTableNonDefaultWrite = 0
    stepAllTableNonMixed = 0

    # Action
    actionTableTotal = 0
    actionTableFull = 0
    actionTablePartial = 0
    actionTableNone = 0
    actionTableHigh = 0
    actionTableMedium = 0
    actionTableLow = 0
    actionTableNoPerm = 0
    actionTableDefault = 0
    actionTableNonDefaultRead = 0
    actionTableNonDefaultWrite = 0
    actionTableNonMixed = 0

    # Bash
    bashTableTotal = 0
    bashTableFull = 0
    bashTablePartial = 0
    bashTableNone = 0
    bashTableHigh = 0
    bashTableMedium = 0
    bashTableLow = 0
    bashTableNoPerm = 0
    bashTableDefault = 0
    bashTableNonDefaultRead = 0
    bashTableNonDefaultWrite = 0
    bashTableNonMixed = 0

    # Extra's just in case
    repoTableOtherTotal = 0
    repoTableOtherFull = 0
    repoTableOtherPartial = 0
    repoTableOtherNone = 0
    workflowTableOtherTotal = 0
    workflowTableOtherFull = 0
    workflowTableOtherPartial = 0
    workflowTableOtherNone = 0
    jobTableOtherTotal = 0
    jobTableOtherFull = 0
    jobTableOtherPartial = 0
    jobTableOtherNone = 0
    stepAllTableOtherTotal = 0
    stepAllTableOtherFull = 0
    stepAllTableOtherPartial = 0
    stepAllTableOtherNone = 0
    actionTableOtherTotal = 0
    actionTableOtherFull = 0
    actionTableOtherPartial = 0
    actionTableOtherNone = 0
    bashTableOtherTotal = 0
    bashTableOtherFull = 0
    bashTableOtherPartial = 0
    bashTableOtherNone = 0
    
    print(len(nonFoundwid))
    print(len(nonFoundJob))
    print(len(nonFoundStep))
    print(len(nonFoundAtAll))
    print(len(filesAgain))
    print(count)
    print(bashStepsAnalyzed)
    # print(nonFoundAtAll)
    # exit(0)

    print("Shell steps that are bash: %d" % bashShellType)
    print("Shell steps that aren't bash: %d" % nonBashShellType)
    
    print("Missing Actions: %d" % len(missingAction))
    print("Error Actions: %d" % len(errorAction))

    print("Weird Workflows: %d" % len(wierds))
    print("Total Workflows: %d" % (i - 1))
    # workflowTableTotal = i - 1
    workflowTableOtherTotal = i - 1
    print("Workflows with JS Actions: %d" % workflowsWithJsActions)
    print("Workflows with only JS Actions: %d" % workflowsWithOnlyJSActions)
    print("Workflows with Bash and JS Actions: %d" % workflowsWithBothJsAndBashCompActions)
    print("Workflows with Only Both: %d" % len(workflowsWithOnlyBoth))
    # workflowTableFull = len(workflowsWithOnlyBoth)
    workflowTableTotal = len(workflowsWithOnlyBoth)
    workflowTableOtherFull = len(workflowsWithOnlyBoth)
    print("Workflows with Unknown Mix: %d" % workflowsMixed)
    # workflowTablePartial = workflowsMixed
    workflowTableOtherPartial = workflowsMixed
    print("Workflows with unknown: %d" % workflowUnknowns)
    print("Workflows with only unknown: %d" % workflowOnlyUnknowns)
    # workflowTableNone = workflowOnlyUnknowns
    workflowTableOtherNone = workflowOnlyUnknowns
    totalUnknowns = 0
    totalKnownSteps = 0
    totalUnknownSteps = 0
    averagesWorkflow = []
    skipAverageWorkflowIncluded = []
    for k,v in workflowComposition.items():
        # total steps
        ts = 0
        # unknown steps
        us = 0
        # known steps
        ks = 0
        if len(v["Unknowns"]) > 0:
            totalUnknowns += 1
            for k2, v2 in v["Unknowns"].items():
                totalUnknownSteps += v2 if type(v2) == int else len(v2)
                us += v2 if type(v2) == int else len(v2)
        # if len(v["Knowns"]) > 0:
        #     print(v["Knowns"])
        #     exit(0)
        for k2, v2 in v["Knowns"].items():
            totalKnownSteps += v2 if type(v2) == int else len(v2)
            ks += v2 if type(v2) == int else len(v2)

        ts = us + ks
        if ks != 0:
            averagesWorkflow.append(ks / ts)
        if ts == 0:
            skipAverageWorkflowIncluded.append(0)
        else:
            skipAverageWorkflowIncluded.append(ks / ts)
    
    totalAverage = 0
    for item in averagesWorkflow:
        totalAverage += item
    totalAverage = totalAverage / len(averagesWorkflow)

    skipAverage = 0
    for item in skipAverageWorkflowIncluded:
        skipAverage += item
    skipAverage = skipAverage / len(skipAverageWorkflowIncluded)

    with open("./WorkflowComposition.pkl", "wb") as f:
        pickle.dump(workflowComposition, f)

    print("Workflows with unknown check: %d" % totalUnknowns)
    print("Average coverage per workflow: %0.2f" % totalAverage)
    print("Average coverage for all workflows (0 coverage included): %0.2f" % skipAverage)
    print()
    print("Total Jobs: %d" % jobs)
    # jobTableTotal = jobs
    jobTableOtherTotal = jobs
    print("Jobs with only JavaScript Actions: %d" % jobsWithOnlyJavaScriptActions)
    print("Jobs with JS Actions: %d" % jobsWithJsActions)
    print("Jobs with Bash and JS Actions: %d" % jobsWithBothJsAndBashCompActions)
    print("Jobs with Only Both: %d" % jobsWithOnlyBothNum)
    # jobTableFull = jobsWithOnlyBothNum
    jobTableTotal = jobsWithOnlyBothNum
    jobTableOtherFull = jobsWithOnlyBothNum
    print("Jobs with Unknown Mix: %d" % jobsMixed)
    # jobTablePartial = jobsMixed
    jobTableOtherPartial = jobsMixed
    print("Jobs with unknown: %d" % jobsUnknown)
    print("Jobs with only unknown: %d" % jobsOnlyUnknowns)
    # jobTableNone = jobsOnlyUnknowns
    jobTableOtherNone = jobsOnlyUnknowns

    totalUnknowns = 0
    averagesJobs = []
    skipAverageIncluded = []
    for k,v in workflowComposition.items():
        for j in v["Jobs"]:
            # total steps
            ts = 0
            # unknown steps
            us = 0
            # known steps
            ks = 0
            if len(j["Unknowns"]) > 0:
                totalUnknowns += 1
                for k2, v2 in j["Unknowns"].items():
                    us += v2 if type(v2) == int else len(v2)
            
            for k2, v2 in j["Knowns"].items():
                ks += v2 if type(v2) == int else len(v2)

            ts = us + ks
            if ks != 0:
                averagesJobs.append(ks / ts)

            if ts == 0:
                skipAverageIncluded.append(0)
            else:
                skipAverageIncluded.append(ks / ts)

    totalAverage = 0
    for item in averagesJobs:
        totalAverage += item
    totalAverage = totalAverage / len(averagesJobs)

    skipAverage = 0
    for item in skipAverageIncluded:
        skipAverage += item
    skipAverage = skipAverage / len(skipAverageIncluded)
            
    print("Jobs with unknown check: %d" % totalUnknowns)
    print("Average coverage for jobs: %0.2f" % totalAverage)
    print("Average coverage for all jobs (0 coverage included): %0.2f" % skipAverage)
    print()
    print("Steps: %d" % steps)
    # stepAllTableTotal = steps
    stepAllTableOtherTotal = steps
    stepAllTableOtherPartial = "N/A"
    print("Steps Missed: %d" % stepsMissed)
    # stepAllTableNone = stepsMissed
    stepAllTableOtherNone = stepsMissed
    for s, n in stepsTypeNums.items():
        print("Number of steps with type [%s]: [%d]" % (s, n))

    print("-----")
    
    printPermClassifications("Bash", bashWithSomePermissions, bashWithNonDefault, bashWithDefault, bashWithReadOnly, bashWithWriteOnly, bashWithMixedRW, 
                             bashHighClassifiedPermissions, bashMediumClassifiedPermissions, bashLowClassifiedPermissions, bashHighStep, bashMediumStep, 
                             bashLowStep, bashNoneStep, bashErrorStep, bashUnknownStep, bashOtherThanUserSet, missings, bashExtraKeys)
    
    bashTableFull = len(bashHighStep) + len(bashMediumStep) + len(bashLowStep) + len(bashNoneStep)
    bashTableTotal = bashTableFull + (len(bashErrorStep) + len(bashUnknownStep))
    bashTablePartial = "N/A"
    bashTableNone = (len(bashErrorStep) + len(bashUnknownStep))
    bashTableHigh = len(bashHighStep)
    bashTableMedium = len(bashMediumStep)
    bashTableLow = len(bashLowStep)
    bashTableNoPerm = len(bashNoneStep)
    bashTableDefault = len(bashWithDefault)
    bashTableNonDefaultRead = len(bashWithReadOnly)
    bashTableNonDefaultWrite = len(bashWithWriteOnly)
    bashTableNonMixed = len(bashWithMixedRW)
    
    print()
    
    printPermClassifications("Action", actionWithSomePermissions, actionWithNonDefault, actionWithDefault, actionWithReadOnly, actionWithWriteOnly, actionWithMixedRW, 
                             actionHighClassifiedPermissions, actionMediumClassifiedPermissions, actionLowClassifiedPermissions, actionHighStep, actionMediumStep, 
                             actionLowStep, actionNoneStep, actionErrorStep, actionUnknownStep, actionOtherThanUserSet, missings, actionExtraKeys)

    actionTableFull = len(actionHighStep) + len(actionMediumStep) + len(actionLowStep) + len(actionNoneStep)
    actionTableTotal = actionTableFull + (len(actionErrorStep) + len(actionUnknownStep))
    actionTablePartial = "N/A"
    actionTableNone = (len(actionErrorStep) + len(actionUnknownStep))
    actionTableHigh = len(actionHighStep)
    actionTableMedium = len(actionMediumStep)
    actionTableLow = len(actionLowStep)
    actionTableNoPerm = len(actionNoneStep)
    actionTableDefault = len(actionWithDefault)
    actionTableNonDefaultRead = len(actionWithReadOnly)
    actionTableNonDefaultWrite = len(actionWithWriteOnly)
    actionTableNonMixed = len(actionWithMixedRW)
    
    print()

    stepAllTableTotal = bashTableTotal + actionTableTotal
    stepAllTableFull = bashTableFull + actionTableFull
    stepAllTablePartial = "N/A"
    stepAllTableNone = actionTableNone + bashTableNone
    print("Steps with a high classification: %d" % len(highStep))
    stepAllTableHigh = len(highStep)
    print("Steps with a medium classification: %d" % len(mediumStep))
    stepAllTableMedium = len(mediumStep)
    print("Steps with a low classification: %d" % len(lowStep))
    stepAllTableLow = len(lowStep)
    print("Steps with an empty classification: %d" % len(noneStep))
    stepAllTableNoPerm = len(noneStep)
    print("Steps with an error: %d" % len(stepErrors))
    # 354 is the number of not found errors found. These wouldn't show up in the permissions at all
    print("Total Run Steps: %d" % (len(highStep) + len(mediumStep) + len(lowStep) + len(noneStep) + len(stepErrors)))
    print()

    # Default taken out for now      
    defaults = len(bashWithDefault) + len(actionWithDefault)
    nonread = len(bashWithReadOnly) + len(actionWithReadOnly)
    nonwrite = len(bashWithWriteOnly) + len(actionWithWriteOnly)
    mixed = len(bashWithMixedRW) + len(actionWithMixedRW)
    unknown = 0

    print("Steps with default: %d" % defaults)
    stepAllTableDefault = defaults
    print("Steps with Read only non-default: %d" % nonread)
    stepAllTableNonDefaultRead = nonread
    print("Steps with Write only: %d" % nonwrite)
    stepAllTableNonDefaultWrite = nonwrite
    print("Steps with Mixed: %d" % mixed)
    stepAllTableNonMixed = mixed
    print("Steps with unknowns included: %d" % unknown)
    print()

    missings = {}
    names = {}
    WorkflowLevel = {}
    JobLevel = {}

    defaultWorkflowLevel = {}
    defaultJobLevel = {}

    print("Total High Workflows: ", len(workflowPerms))
    print("Total with at least one analyzed step: ", (len(jobsWithPartialCoverage)))
    print("Total with partial coverage: ", len(jobCaptures))
    print("Total with full coverage: ", len(workflowCaptures))
    print("Total with partial coverage: ", len(workflowPartialCaptures))
    print("Total with no coverage: ", (workflowTableTotal - (len(workflowCaptures) + len(workflowPartialCaptures))))
    workflowTableFull = len(workflowCaptures)
    workflowTablePartial = len(workflowPartialCaptures)
    workflowTableNone = (workflowTableTotal - (len(workflowCaptures) + len(workflowPartialCaptures)))

    print("---------")

    print(len(workflowsWithOnlyBoth))
    totalJobs = 0
    workflowSeen = 0
    for k,v in workflowPerms.items(): # Workflow
        # if not k in workflowsWithOnlyBoth or not k in workflowCaptures:
        # if not k in workflowCaptures:
        # if not k in workflowsWithOnlyBoth:
            # continue

        if not k in WorkflowLevel:
            WorkflowLevel[k] = "NONE"
            defaultWorkflowLevel[k] = "NONE"
        
        if not k in workflowCaptures:
            # fullWorkflowCoverage = False
            WorkflowLevel[k] = "UNKNOWN"
            defaultWorkflowLevel[k] = "UNKNOWN"

            if not k in jobCaptures:
                continue
        
        """
        if not k in jobCaptures:
            WorkflowLevel[k] = "UNKNOWN"
            defaultWorkflowLevel[k] = "UNKNOWN"
            print("---")
            print(k)
            print("---")
            continue
        """

        workflowSeen += 1


        # print(type(k))
        # print(type(WorkflowLevel))

        for k2, v2 in v.items(): # Job
            totalJobs += 1
            if not k in JobLevel:
                JobLevel[k] = {}
                defaultJobLevel[k] = {}
            
            JobLevel[k][k2] = "NONE"
            defaultJobLevel[k][k2] = "NONE"
            
            # if k2 == "GREG_JOB_COVERAGE" or not k2 in jobsWithFullCoverage[k]:
            if not k2 in jobsWithFullCoverage[k]:
                fullCoverage = False
                WorkflowLevel[k] = "UNKNOWN"
                JobLevel[k][k2] = "UNKNOWN"
                defaultWorkflowLevel[k] = "UNKNOWN"
                defaultJobLevel[k][k2] = "UNKNOWN"
                continue

            # I might need to change this as it doesn't match up
            # for k3, v3 in v2.items():
                # print(v2)
            JobLevel[k][k2], stepDefault, stepRead, stepWrite = getPermClassification(currentPermissions=v2, level=JobLevel[k][k2])
            # print(JobLevel[k][k2])

            if JobLevel[k][k2] == "LOW" and WorkflowLevel[k] in ["NONE"]:
                WorkflowLevel[k] = "LOW"
            if JobLevel[k][k2] == "MEDIUM" and WorkflowLevel[k] in ["NONE", "LOW"]:
                WorkflowLevel[k] = "MEDIUM"
            if JobLevel[k][k2] == "HIGH" and WorkflowLevel[k] in ["NONE", "LOW", "MEDIUM"]:
                WorkflowLevel[k] = "HIGH"

            if not stepDefault:
                if stepRead and stepWrite:
                    defaultJobLevel[k][k2] = "NON-MIXED"
                    if defaultWorkflowLevel != "UNKNOWN":
                        defaultWorkflowLevel[k] = "NON-MIXED"
                elif stepRead:
                    defaultJobLevel[k][k2] = "NON-READONLY"
                    if defaultWorkflowLevel[k] == "DEFAULT":
                        defaultWorkflowLevel[k] = "NON-READONLY"
                    elif defaultWorkflowLevel[k] == "NON-WRITEONLY":
                        defaultWorkflowLevel[k] = "NON-MIXED"
                    elif defaultWorkflowLevel[k] == "NONE":
                        defaultWorkflowLevel[k] = "NON-READONLY"
                elif stepWrite:
                    defaultJobLevel[k][k2] = "NON-WRITEONLY"
                    if defaultWorkflowLevel[k] == "DEFAULT":
                        defaultWorkflowLevel[k] = "NON-WRITEONLY"
                    elif defaultWorkflowLevel[k] == "NON-READONLY":
                        defaultWorkflowLevel[k] = "NON-MIXED"
                    elif defaultWorkflowLevel[k] == "NONE":
                        defaultWorkflowLevel[k] = "NON-WRITEONLY"
            else:
                defaultJobLevel[k][k2] = "DEFAULT"
                if defaultWorkflowLevel[k] == "NONE":
                    defaultWorkflowLevel[k] = "DEFAULT"

            if not k in workflowCaptures:
                # fullWorkflowCoverage = False
                WorkflowLevel[k] = "UNKNOWN"
                defaultWorkflowLevel[k] = "UNKNOWN"


    print(workflowSeen)
    workflowLows = 0
    workflowMediums = 0
    workflowHighs = 0
    workflowNones = 0
    wfLows = set()

    alreadyHigh = set()
    alreadyMedium = set()
    alreadyLow = set()
    for w,v in WorkflowLevel.items():
        if v == "HIGH":
            if w in levelsForSet["MEDIUM"] or w in levelsForSet["LOW"]:
                alreadyHigh.add(w)
            workflowHighs += 1
        elif v == "MEDIUM":
            if w in levelsForSet["MEDIUM"] or w in levelsForSet["LOW"]:
                alreadyMedium.add(w)
            workflowMediums += 1
        elif v == "LOW":
            if w in levelsForSet["LOW"]:
                alreadyLow.add(w)
            workflowLows += 1
            wfLows.add(w)
        elif v == "NONE":
            workflowNones += 1
            wfLows.add(w)

    jobLows = 0
    jobMediums = 0
    jobHighs = 0
    jobNones = 0
    
    fullReduction = 0
    partialReduction = 0
    
    for w,v in JobLevel.items():
        fr = True
        pr = False
        for j,v2 in v.items():
            if v2 == "HIGH":
                fr = False
                jobHighs += 1
            elif v2 == "MEDIUM":
                pr = True
                jobMediums += 1
            elif v2 == "LOW":
                pr = True
                jobLows += 1
            elif v2 == "NONE":
                pr = True
                jobNones += 1
            else:
                fr = False

        if len(v) == 0:
            fr = False

        if fr:
            fullReduction += 1
        elif pr and not fr:
            partialReduction += 1
        
    print("Workflows with full reduction: %d" % fullReduction)
    print("Workflows with partial reduction: %d" % partialReduction)
    print("Workflows with high permissions: %d" % workflowHighs)
    workflowTableHigh = workflowHighs
    print("Workflows with medium permissions: %d" % workflowMediums)
    workflowTableMedium = workflowMediums
    print("Workflows with low: %d" % workflowLows)
    workflowTableLow = workflowLows
    print("Workflows with no permissions: %d" % workflowNones)
    workflowTableNoPerm = workflowNones
    print("Workflows with already mitigated high vulnerabilities: %d" % len(alreadyHigh))
    print("Workflows with already medium or lower vulnerabilities: %d" % len(alreadyMedium))
    print("Workflows with already lower vulnerabilities: %d" % len(alreadyLow))

    # print("Total Jobs: %d" % totalJobs)
    print(jobs)
    jfc = 0
    for k,v in jobsWithFullCoverage.items():
        for item in v:
            jfc += 1
    
    jpc = 0
    for k,v in jobsWithPartialCoverage.items():
        if not k in jobsWithOnlyBoth or k in jobsWithFullCoverage:
            continue

        for item in v:
            jpc += 1
    print("Jobs with partial coverage: %d" % jpc)
    jobTablePartial = jpc
    print("Jobs with full coverage: %d" % jfc)
    jobTableFull = jfc
    print("Jobs with no coverage: %d" % (jobTableTotal - (jfc + jpc)))
    jobTableNone = jobTableTotal - (jfc + jpc)
    print("Jobs with high permissions: %d" % jobHighs)
    jobTableHigh = jobHighs
    print("Jobs with medium permissions: %d" % jobMediums)
    jobTableMedium = jobMediums
    print("Jobs with low permissions: %d" % jobLows)
    jobTableLow = jobLows
    print("Jobs with no permissions: %d" % jobNones)
    jobTableNoPerm = jobNones
    print("Missings: %d" % len(missings))
    for k,v in missings.items():
        print("Missing [%s]: [%d]" % (k,v))
    print("---")
    print(names)
    print()

    defaults = 0
    defaultsSet = set()
    nonread = 0
    nonwrite = 0
    mixed = 0
    unknown = 0
    for k,v in defaultWorkflowLevel.items():
        if v == "DEFAULT":
            defaults += 1
            defaultsSet.add(k)
        elif v == "NON-READONLY":
            nonread += 1
        elif v == "NON-WRITEONLY":
            nonwrite += 1
        elif v == "NON-MIXED":
            mixed += 1
        else:
            unknown += 1

    print("Workflows with default: %d" % defaults)
    workflowTableDefault = defaults
    print("Workflows with Read only non-default: %d" % nonread)
    workflowTableNonDefaultRead = nonread
    print("Workflows with Write only: %d" % nonwrite)
    workflowTableNonDefaultWrite = nonwrite
    print("Workflows with Mixed: %d" % mixed)
    workflowTableNonMixed = mixed
    print("Workflows with unknowns included: %d" % unknown)
    print()
    
    highRepo = set()
    mediumRepo = set()
    lowRepo = set()
    noneRepo = set()
    repoErrors = set()
    drl = {}

    repoReduction = set()
    reposWithFullCoverage = 0
    reposWithPartialCoverage = 0
    totalRepos = 0
    for k,v in repoPerms.items():
        # Don't count non-jsBash repos
        if not v[1]:
            continue
        totalRepos += 1
        repoLevel = "NONE"
        defaultRepoLevel = "NONE"
        onlyLow = True
        fullCoverage = True
        partialCoverage = False
        for wi in v[0]:
            if not wi in defaultsSet:
                onlyLow = False
                # break

            if not wi in workflowCaptures:
                fullCoverage = False
                if wi in workflowPartialCaptures:
                    partialCoverage = True
                repoLevel = "UNKNOWN"
                defaultRepoLevel = "UNKNOWN"
                continue
            else:
                partialCoverage = True

            if wi in WorkflowLevel:
                if WorkflowLevel[wi] == "HIGH" and repoLevel in ["MEDIUM", "LOW", "NONE"]:
                    repoLevel = "HIGH"
                elif WorkflowLevel[wi] == "MEDIUM" and (repoLevel == "LOW" or repoLevel == "NONE"):
                    repoLevel = "MEDIUM"
                elif WorkflowLevel[wi] == "LOW" and repoLevel == "NONE":
                    repoLevel = "LOW"
            else:
                repoLevel = "UNKNOWN"

            if wi in defaultWorkflowLevel:
                if defaultWorkflowLevel[wi] == "NON-READONLY":
                    if defaultRepoLevel == "NON-WRITEONLY":
                        defaultRepoLevel = "NON-MIXED"
                    elif defaultRepoLevel in ["DEFAULT", "NONE"]:
                        defaultRepoLevel = "NON-READONLY"
                elif defaultWorkflowLevel[wi] == "NON-WRITEONLY":
                    if defaultRepoLevel == "NON-READONLY":
                        defaultRepoLevel = "NON-MIXED"
                    elif defaultRepoLevel in ["DEFAULT", "NONE"]:
                        defaultRepoLevel = "NON-WRITEONLY"
                elif defaultRepoLevel == "DEFAULT" and defaultWorkflowLevel[wi] != "NONE":
                    defaultRepoLevel = defaultWorkflowLevel[wi]
                elif defaultWorkflowLevel[wi] == "NON-MIXED" and defaultRepoLevel != "UNKNOWN":
                    defaultRepoLevel = "NON-MIXED"
                elif defaultWorkflowLevel[wi] == "DEFAULT" and defaultRepoLevel == "NONE":
                    defaultRepoLevel = "DEFAULT"
            else:
                defaultRepoLevel = "UNKNOWN"
            
        if repoLevel == "HIGH":
            highRepo.add(k)
        elif repoLevel == "MEDIUM":
            mediumRepo.add(k)
        elif repoLevel == "LOW":
            lowRepo.add(k)
        elif repoLevel == "NONE":
            noneRepo.add(k)
        else:
            repoErrors.add(k)

        drl[k] = defaultRepoLevel
        # print(drl[k])
        
        if onlyLow:
            if defaultRepoLevel == "NON-MIXED":
                print(k)
                print(v)
                exit(1)
            repoReduction.add(k)
        
        if fullCoverage:
            reposWithFullCoverage += 1

        if partialCoverage and not fullCoverage:
            reposWithPartialCoverage += 1

    print("Total Repos: %d" % totalRepos)
    repoTableTotal = totalRepos
    print("Total Repos with full coverage: %d" % reposWithFullCoverage)
    repoTableFull = reposWithFullCoverage
    print("Total Repos with partial coverage: %d" % reposWithPartialCoverage)
    repoTablePartial = reposWithPartialCoverage
    print("Total Repos with unknowns: %d" % (len(repoPerms) - reposWithPartialCoverage))
    repoTableNone = repoTableTotal - (repoTablePartial + repoTableFull)
    print("Total Repo Reduction: %d" % len(repoReduction))
    print()

    print("Repos with a high classification: %d" % len(highRepo))
    repoTableHigh = len(highRepo)
    print("Repos with a medium classification: %d" % len(mediumRepo))
    repoTableMedium = len(mediumRepo)
    print("Repos with a low classification: %d" % len(lowRepo))
    repoTableLow = len(lowRepo)
    print("Repos with no permissions: %d" % len(noneRepo))
    repoTableNoPerm = len(noneRepo)
    print("Repos with an error: %d" % len(repoErrors))
    # 354 is the number of not found errors found. These wouldn't show up in the permissions at all
    print("Total Repos: %d" % (len(highRepo) + len(mediumRepo) + len(lowRepo) + len(noneRepo)))
    print()
                
    defaults = 0
    nonread = 0
    nonwrite = 0
    mixed = 0
    unknown = 0
    for k,v in drl.items():
        if v == "DEFAULT":
            defaults += 1
            # defaultsSet.add(k)
        elif v == "NON-READONLY":
            nonread += 1
        elif v == "NON-WRITEONLY":
            nonwrite += 1
        elif v == "NON-MIXED":
            mixed += 1
        else:
            unknown += 1

    print("Repos with default: %d" % defaults)
    repoTableDefault = defaults
    print("Repos with Read only non-default: %d" % nonread)
    repoTableNonDefaultRead = nonread
    print("Repos with Write only: %d" % nonwrite)
    repoTableNonDefaultWrite = nonwrite
    print("Repos with Mixed: %d" % mixed)
    repoTableNonMixed = mixed
    print("Repos with unknowns included: %d" % unknown)
    print()

    defaults = 0
    nonread = 0
    nonwrite = 0
    mixed = 0
    unknown = 0
    for k,v2 in defaultJobLevel.items():
        for k2, v in v2.items():
            if v == "DEFAULT":
                defaults += 1
            elif v == "NON-READONLY":
                nonread += 1
            elif v == "NON-WRITEONLY":
                nonwrite += 1
            elif v == "NON-MIXED":
                mixed += 1
            else:
                unknown += 1

    print("Jobs with default: %d" % defaults)
    jobTableDefault = defaults
    print("Jobs with Read only non-default: %d" % nonread)
    jobTableNonDefaultRead = nonread
    print("Jobs with Write only: %d" % nonwrite)
    jobTableNonDefaultWrite = nonwrite
    print("Jobs with Mixed: %d" % mixed)
    jobTableNonMixed = mixed
    print("Jobs with unknowns included: %d" % unknown)
    
    with open("possibleHighToLowExamples.txt", "w") as f:
        for w in wfLows:
            f.write(w + "\n")

    tableResults = {
        "repoTableTotal": repoTableTotal,
        "repoTableFull": repoTableFull,
        "repoTablePartial": repoTablePartial,
        "repoTableNone": repoTableNone,
        "repoTableHigh": repoTableHigh,
        "repoTableMedium": repoTableMedium,
        "repoTableLow": repoTableLow,
        "repoTableNoPerm": repoTableNoPerm,
        "repoTableDefault": repoTableDefault,
        "repoTableNonDefaultRead": repoTableNonDefaultRead,
        "repoTableNonDefaultWrite": repoTableNonDefaultWrite,
        "repoTableNonMixed": repoTableNonMixed,
        "workflowTableTotal": workflowTableTotal,
        "workflowTableFull": workflowTableFull,
        "workflowTablePartial": workflowTablePartial,
        "workflowTableNone": workflowTableNone,
        "workflowTableHigh": workflowTableHigh,
        "workflowTableMedium": workflowTableMedium,
        "workflowTableLow": workflowTableLow,
        "workflowTableNoPerm": workflowTableNoPerm,
        "workflowTableDefault": workflowTableDefault,
        "workflowTableNonDefaultRead": workflowTableNonDefaultRead,
        "workflowTableNonDefaultWrite": workflowTableNonDefaultWrite,
        "workflowTableNonMixed": workflowTableNonMixed,
        "jobTableTotal": jobTableTotal,
        "jobTableFull": jobTableFull,
        "jobTablePartial": jobTablePartial,
        "jobTableNone": jobTableNone,
        "jobTableHigh": jobTableHigh,
        "jobTableMedium": jobTableMedium,
        "jobTableLow": jobTableLow,
        "jobTableNoPerm": jobTableNoPerm,
        "jobTableDefault": jobTableDefault,
        "jobTableNonDefaultRead": jobTableNonDefaultRead,
        "jobTableNonDefaultWrite": jobTableNonDefaultWrite,
        "jobTableNonMixed": jobTableNonMixed,
        "stepAllTableTotal": stepAllTableTotal,
        "stepAllTableFull": stepAllTableFull,
        "stepAllTablePartial": stepAllTablePartial,
        "stepAllTableNone": stepAllTableNone,
        "stepAllTableHigh": stepAllTableHigh,
        "stepAllTableMedium": stepAllTableMedium,
        "stepAllTableLow": stepAllTableLow,
        "stepAllTableNoPerm": stepAllTableNoPerm,
        "stepAllTableDefault": stepAllTableDefault,
        "stepAllTableNonDefaultRead": stepAllTableNonDefaultRead,
        "stepAllTableNonDefaultWrite": stepAllTableNonDefaultWrite,
        "stepAllTableNonMixed": stepAllTableNonMixed,
        "actionTableTotal": actionTableTotal,
        "actionTableFull": actionTableFull,
        "actionTablePartial": actionTablePartial,
        "actionTableNone": actionTableNone,
        "actionTableHigh": actionTableHigh,
        "actionTableMedium": actionTableMedium,
        "actionTableLow": actionTableLow,
        "actionTableNoPerm": actionTableNoPerm,
        "actionTableDefault": actionTableDefault,
        "actionTableNonDefaultRead": actionTableNonDefaultRead,
        "actionTableNonDefaultWrite": actionTableNonDefaultWrite,
        "actionTableNonMixed": actionTableNonMixed,
        "bashTableTotal": bashTableTotal,
        "bashTableFull": bashTableFull,
        "bashTablePartial": bashTablePartial,
        "bashTableNone": bashTableNone,
        "bashTableHigh": bashTableHigh,
        "bashTableMedium": bashTableMedium,
        "bashTableLow": bashTableLow,
        "bashTableNoPerm": bashTableNoPerm,
        "bashTableDefault": bashTableDefault,
        "bashTableNonDefaultRead": bashTableNonDefaultRead,
        "bashTableNonDefaultWrite": bashTableNonDefaultWrite,
        "bashTableNonMixed": bashTableNonMixed
    }

    with open("./tableResults.pkl", "wb") as f:
        pickle.dump(tableResults, f)

    extraTableResults = {    
        "repoTableOtherTotal": repoTableOtherTotal,
        "repoTableOtherFull": repoTableOtherFull,
        "repoTableOtherPartial": repoTableOtherPartial,
        "repoTableOtherNone": repoTableOtherNone,
        "workflowTableOtherTotal": workflowTableOtherTotal,
        "workflowTableOtherFull": workflowTableOtherFull,
        "workflowTableOtherPartial": workflowTableOtherPartial,
        "workflowTableOtherNone": workflowTableOtherNone,
        "jobTableOtherTotal": jobTableOtherTotal,
        "jobTableOtherFull": jobTableOtherFull,
        "jobTableOtherPartial": jobTableOtherPartial,
        "jobTableOtherNone": jobTableOtherNone,
        "stepAllTableOtherTotal": stepAllTableOtherTotal,
        "stepAllTableOtherFull": stepAllTableOtherFull,
        "stepAllTableOtherPartial": stepAllTableOtherPartial,
        "stepAllTableOtherNone": stepAllTableOtherNone,
        "actionTableOtherTotal": actionTableOtherTotal,
        "actionTableOtherFull": actionTableOtherFull,
        "actionTableOtherPartial": actionTableOtherPartial,
        "actionTableOtherNone": actionTableOtherNone,
        "bashTableOtherTotal": bashTableOtherTotal,
        "bashTableOtherFull": bashTableOtherFull,
        "bashTableOtherPartial": bashTableOtherPartial,
        "bashTableOtherNone": bashTableOtherNone
    }

    with open("./extraTableResults.pkl", "wb") as f:
        pickle.dump(extraTableResults, f)

    print("\n---\n")
    missLst = []
    for k,v in missingAction.items():
        missLst.append((k,v))

    missLst.sort(key=lambda x: x[1], reverse=True)
    for k,v in missLst[:20]:
        print("Missing [%s]: [%d]" % (k,v))

    with open("missedActions.txt", "w") as f:
        for n,v in missLst:
            f.write("%s: %d\n" % (n,v))

    with open("workflowsWithFullCoverage.pkl", "wb") as f:
        pickle.dump(workflowCaptures, f)

if __name__ == "__main__":
    getWorkflowAnalysisResults()