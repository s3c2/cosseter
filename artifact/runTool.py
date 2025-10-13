# This is the one file I hope the evaluators will need to run after starting up the compose file
# It should have the ability to run any of the workflow input groups located in workflowInputs
#     One that is our motivating example and then another of around 10 random workflows (verified of course)


# Setup and start the analysis for Bash steps

import os
import sys
import time
from pymongo import MongoClient
import pickle
from pathlib import Path 

os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Strange way of doing it, but since it needs to work for both docker and local this must be done:
sys.path.append(os.path.join(os.path.dirname(__file__), 'ActionAnalyzer'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'BashAnalyzer'))
from ActionAnalyzer.celeryApp.autoscaleMain import sendToCelery
from ActionAnalyzer.permissionExtraction.getPerms import permissionExtraction
from BashAnalyzer.batchAndRunBash import runFullBashAnalysis
from BashAnalyzer.permExtract.checkResults import getResults
from BashAnalyzer.permExtract.extractPerms import extractPerms
from PermissionEvaluation.mainWorkflowAnalysis import getWorkflowAnalysisResults
from outputWorkflows.permission_updater import process_json_data


# Configuration for MongoDB result checking
RESULT_DATABASE_NAME = "ArtifactEvaluationOne"
RESULT_COLLECTION_NAME = "ExtractedPermissions"

print("Starting Cosseter:")
print("NOTE: Make sure that all docker containers are up and running before continueing")
inp = input("Are all dockers up? ('y' for yes or anything else for no): ")

if inp.rstrip() != "y":
    print("Please startup the docker containers using 'docker compose up --build' in the directory with the compose.yaml")
    exit(1)

workflowRuns = os.listdir("./workflowInputs/")
print("Potential workflow tests:")
for i, testDir in enumerate(workflowRuns):
    print("%d: %s" % (i, testDir))

inp = input("Enter the test index to run: ")

try:
    ind = int(inp.rstrip())
    if not (-1 < ind < len(workflowRuns)):
        print("Index is not valid. Exiting")
        exit(1)

    selectedTest = workflowRuns[ind]
except Exception as e:
    print("Error occured with evaluating the index: [%s]" % (e))
    print("Exiting")
    exit(1)

if os.path.exists("./sharedDirectory/workflows"):
    for f in os.listdir("./sharedDirectory/workflows"):
        os.remove(os.path.join("./sharedDirectory/workflows", f))

for f in os.listdir("./workflowInputs/%s/" % (selectedTest)):
    with open("./workflowInputs/%s/%s" % (selectedTest, f), "r") as outF:
        with open("./sharedDirectory/workflows/%s" % (f), "w") as inF:
            inF.write(outF.read())

# To switch collections after the test
with open("./sharedDirectory/workflows/reset", "w") as f:
    f.write("RESET")

# Check for when the workflow IR population is done
currentCollection = "none"
print("Waiting for workflow IR population to finish...")
while True:
    if os.path.exists("./sharedDirectory/configs/old_collection.txt"):
        with open("./sharedDirectory/configs/old_collection.txt", "r") as f:
            currentCollection = f.read().rstrip()
        print("Population done file found. Continuing...")
        os.remove("./sharedDirectory/configs/old_collection.txt")
        break

    time.sleep(5)

# NOTE - I should not run both of these at the same time cause it will need the CPU and ram each
# Setup and start the analysis for JavaScript actions
actionFilesToCheck = {}
try:
    client = MongoClient("mongodb://localhost:27017/")
    col = client["workflow_analysis"][currentCollection]
    for workflow in col.find():
        if "metadata" in workflow and "action_verification" in workflow["metadata"] and "verification_details" in workflow["metadata"]["action_verification"]:
            for verification_key, verification_value in workflow["metadata"]["action_verification"]["verification_details"].items():
                if verification_value.get("verified_type", "") != "javascript" or not verification_value.get("downloaded", False):
                    continue
                # This may not work for actions where it is owner/repo/subdir/
                # For the examples given, it is not a problem
                if verification_value.get("action_path", "") != "":
                    if verification_value["action_name"] in actionFilesToCheck:
                        if verification_value["action_version"] != actionFilesToCheck[verification_value["action_name"]][1]:
                            print("Warning: Duplicate action name with different versions found [%s] versions [%s] and [%s]" % (verification_value["action_name"], verification_value["action_version"], actionFilesToCheck[verification_value["action_name"]]))
                            actionFilesToCheck[verification_value["action_name"]][1] = "MIXED_VERSIONS"
                    else:
                        actionFilesToCheck[verification_value["action_name"]] = [verification_value["action_path"], verification_value["action_version"]]
                else:
                    print("No action path for workflow [%s] action [%s]" % (workflow.get("name", "UNKNOWN"), verification_key))
except Exception as e:
    print("Error connecting to mongoDB: [%s]" % (e))
    print("Exiting")
    client.close()
    exit(1)
finally:
    client.close()

# Gather the action files and begin the celery push
print("Number of Actions to check: %d" % (len(actionFilesToCheck)))

# Send action files to the celery server
files = []
skipped_count = 0

# Connect to the results database to check for existing results
try:
    result_client = MongoClient("mongodb://localhost:27017/")
    result_collection = result_client[RESULT_DATABASE_NAME][RESULT_COLLECTION_NAME]
    
    for k, v in actionFilesToCheck.items():
        # Check to see if a result is already done for this action, skip it if so
        # v[0] is action_path (File), v[1] is action_version (Version)
        existing_result = result_collection.find_one({
            "File": v[0],
            "Version": v[1]
        })
        
        if existing_result:
            print("Skipping action [%s] - result already exists (File: %s, Version: %s)" % (k, v[0], v[1]))
            skipped_count += 1
        else:
            files.append(v)
            
except Exception as e:
    print("Error connecting to results database: [%s]" % (e))
    print("Continuing without result checking...")
    # If there's an error connecting to results DB, proceed with all actions
    for k, v in actionFilesToCheck.items():
        files.append(v)
finally:
    result_client.close()

print("Actions to process: %d (skipped %d already completed)" % (len(files), skipped_count))
print(actionFilesToCheck)
print(files)
sendToCelery(files)

# TODO change the classified col name each time
base = os.getcwd()
permissionExtraction("ArtifactEvaluationOne", "ExtractedPermissionsClassified")
os.chdir(base)

# Extract the specific action data for the run and populate the needed pkl file

# Gather the Bash scripts and send to the Bash analyzer
runFullBashAnalysis("workflow_analysis", currentCollection)

getResults()

extractPerms("./permExtract/results_check.json")
os.chdir(base)

actionToPerms = {}
client = MongoClient("mongodb://localhost:27017/")
col = client["ArtifactEvaluationOne"]["ExtractedPermissionsClassified"]
for a, v in actionFilesToCheck.items():
    a = a.lower().replace("/", "#")
    res = col.find_one({"File": v[0], "Version": v[1]})
    if not res:
        res = col.find_one({"File": v[0]})

    if not res:
        res = client["ArtifactEvaluationOne"]["ExtractedPermissions"].find_one({"File": v[0], "Version": v[1]})
        if res and res.get("Finished", False) and res.get("Completed Prep For Second Pass", False):
            print("No permissions found for action [%s] File: %s Version: %s" % (a, v[0], v[1]))
            actionToPerms[a] = {"Action File": v[0], "Version": v[1], "Permissions": {}}
        else:
            print("Warning: Action errored out before finishing")
        continue

    if not a in actionToPerms:
        actionToPerms[a] = {"Action File": v[0], "Version": v[1], "Permissions": res.get("All Permissions", {})}

with open("./PermissionEvaluation/actionToRelevantInfo.pkl", "wb") as f:
    pickle.dump(actionToPerms, f)

# Copy or move the other files to permission evaluation
if os.path.exists("./PermissionEvaluation/file_permissions.json"):
    os.remove("./PermissionEvaluation/file_permissions.json")
if os.path.exists("./BashAnalyzer/permExtract/file_permissions.json"):
    os.system("cp ./BashAnalyzer/permExtract/file_permissions.json ./PermissionEvaluation/file_permissions.json")

if os.path.exists("./PermissionEvaluation/errors_tool.json"):
    os.remove("./PermissionEvaluation/errors_tool.json")
if os.path.exists("./BashAnalyzer/permExtract/errors_tool.json"):
    os.system("cp ./BashAnalyzer/permExtract/errors_tool.json ./PermissionEvaluation/errors_tool.json")

getWorkflowAnalysisResults("workflow_analysis", currentCollection)
os.chdir(base)

print("Generating Updated Workflows for Current Collection: %s" % currentCollection)
client = MongoClient("mongodb://localhost:27017/")
findCol = client["workflow_analysis"][currentCollection]
lookCol = client["FinalWorkflowResults"]["FinalResultsDataset"]
updatedDir = "./updatedWorkflows/"
for item in findCol.find():
    item = lookCol.find_one({"uid": item["uid"]})
    if not item:
        print("No matching item found in FinalResultsDataset for uid: %s" % item.get("uid", "UNKNOWN"))
        continue
    try:
        metadata = item.get("metadata", {})
        filePath = metadata.get("file_path", "")
        fileName = metadata.get("file", "EMPTY")
        updatedDirPath = os.path.join(updatedDir, currentCollection)
        os.makedirs(updatedDirPath, exist_ok=True)
        # process_workflow(Path(filePath.replace("/app/", "./")), )
        process_json_data(item, Path(updatedDirPath))
    except Exception as e:
        print("Error processing workflow [%s]: %s" % (fileName, e))
client.close()


print("\n----------------------------------------------------------------------------------")
print("Done with the analysis! You can find your updated workflows in 'updatedWorkflows'!")
print("----------------------------------------------------------------------------------")