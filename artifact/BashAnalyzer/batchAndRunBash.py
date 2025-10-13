import json
import os

import sys
from bson import ObjectId
from subprocess import check_output, CalledProcessError
from pymongo import MongoClient
from BashAnalyzer.progressTracker import *
import re
import pickle
# from testEachGroup import test_each_group_celery
from BashAnalyzer.worker import runSemCelery, test_each_group_celery_task
from BashAnalyzer.config import fname



def findFuncs(file: str, ind):
    # Call semgrep on the file with the file template to find the created functions
    results = check_output("semgrep --json --config ./{} {}".format(fname, file), shell=True)
    
    with open("./compare_results/storedResults%d.json" % ind, "w") as f:
        f.write(results.decode('utf-8'))

    # This converts the json to a python dict
    result_dic = json.loads(results) 

    if len(result_dic["results"]) != 0:
        print("File has Git or Gh: [%s]" % file)
        return True

    return False


def runFullBashAnalysis(DB, COL):
    # TODO Try not to have to move to directories to work
    os.chdir("./BashAnalyzer")

    # Clear all of the files for the Bash analysis and remake them
    if os.path.exists("./trials*"):
        os.system("rm -rf ./trials*")
    if os.path.exists("./goods"):
        os.system("rm -rf ./goods")
    if os.path.exists("./hugeErrors"):
        os.system("rm -rf ./hugeErrors")
    if os.path.exists("./seperateResults"):
        os.system("rm -rf ./seperateResults")
    if os.path.exists("./batches"):
        os.system("rm -rf ./batches")
    if os.path.exists("./results"):
        os.system("rm -rf ./results")
    
    os.makedirs("./results")
    os.makedirs("./goods")
    os.makedirs("./hugeErrors")
    os.makedirs("./seperateResults")
    os.makedirs("./batches")

    # permExtract files
    if os.path.exists("./permExtract/results_check.json"):
        os.remove("./permExtract/results_check.json")
    if os.path.exists("./permExtract/file_permissions.json"):
        os.remove("./permExtract/file_permissions.json")

    graphql_count = 0

    try:
        with open("dones", "rb") as f:
            dones = pickle.load(f)
    except:
        dones = []

    moreBashes = []
    with open("./moreBashes", "rb") as f:
        moreBashes = pickle.load(f)

    i = 0
    ids = set()
    shellTypes = {}
    resultInd = 0
    batch_size = 1000
    batches_done = 0

    cpus = 40
    dirNum = 0
    countx = 0

    # This intentionally errors to not keep rerunning
    runGetBatches = True
    testGetBatches = runGetBatches or False
    
    batchDir = "./batches/"
    currentBatchID = 0
    if runGetBatches:
        client = MongoClient()
        getCol = client[DB][COL]
        currentBatch = []
        t = 0

        start_progress("Get Results In Batches")
        # Get the total count from the collection
        total_count = getCol.count_documents({})
        for item in getCol.find():
            progress(t, total_count)
            workflowId = str(item["_id"])
            shellScript = 0
            foundBashStep = False
            t += 1
            if "taskgroups" in item.keys():
                for taskname, task in item["taskgroups"].items():
                    if "tasks" in task.keys():
                        for stepname, step in task["tasks"].items():
                            if "exec" in step.keys():
                                if step["exec"]["type"] == "shell_cmd":
                                    com = step["exec"]["command"]
                                    shell = step["exec"]["shell"]
                
                                    if shell == "":
                                        shell = "bash"
                                    
                                    shell = shell.lower()
                                    if not shell in shellTypes.keys():
                                        shellTypes[shell] = 0
                                    shellTypes[shell] += 1

                                    if shell == "bash" or shell in moreBashes:
                                        fileName = "%s___%s___%s" % (taskname, stepname, str(shellScript)) + ".sh"
                                        shellScript += 1
                                        foundBashStep = True
            if not foundBashStep:
                continue

            currentBatch.append(item["_id"])
            i += 1
            if i > batch_size * cpus:
                with open(batchDir + "batch%d.pkl" % currentBatchID, "wb") as f:
                    pickle.dump(currentBatch, f)
                currentBatch = []
                i = 0
                currentBatchID += 1
            
        if i != 0:
            with open(batchDir + "batch%d.pkl" % currentBatchID, "wb") as f:
                pickle.dump(currentBatch, f)

        i = 0
        end_progress()
        client.close()

    if currentBatchID != 0:
        batchTotal = currentBatchID
    else:
        # NOTE Look at the batch numbers to get this value
        batchTotal = 70
    
    if testGetBatches:
        averageLength = 0
        allIds = set()
        currentBatchID = 0
        start_progress("Checking each batch")
        while True:
            progress(currentBatchID, batchTotal)
            try:
                with open(batchDir + "batch%d.pkl" % currentBatchID, "rb") as f:
                    currentBatch = pickle.load(f)
                averageLength += len(currentBatch)
                for item in currentBatch:
                    allIds.add(str(item))
                currentBatchID += 1
            except Exception as e:
                print(e)
                print("Done getting ids")
                print(currentBatchID)
                break
        end_progress()

        if currentBatchID != 0:
            print("Avg len: %d" % (averageLength / currentBatchID))
        else:
            print("Avg len: 0")
        print(len(allIds))
     
    start_progress("Starting batch %d out of %d" % (currentBatchID, batchTotal))
    t = 0
    runsSome = True
    batchIdsComplete = set()
    currentBatchID = 0
    while runsSome:
        try:
            with open(batchDir + "batch%d.pkl" % currentBatchID, "rb") as f:
                currentBatch = pickle.load(f)
        except Exception as e:
            print("No more batches found. Continueing...")
            break
 
        runsSome = False
        client = MongoClient()
        getCol = client[DB][COL]
        
        for item in getCol.find({"_id": {"$in": currentBatch}}):
            runsSome = True
            progress(t, len(currentBatch))

            workflowId = str(item["_id"]) 
            countx += 1
            shellScript = 0
                
            if "taskgroups" in item.keys():
                for taskname, task in item["taskgroups"].items():
                    if "tasks" in task.keys():
                        for stepname, step in task["tasks"].items():
                            if "exec" in step.keys():
                                if step["exec"]["type"] == "shell_cmd":
                                    com = step["exec"]["command"]
                                    shell = step["exec"]["shell"]
                                    if "gh api graphql" in com or "https://api.github.com/graphql" in com:
                                        graphql_count = graphql_count + 1
                                        with open("graphql", "a") as f:
                                            f.write(f"{workflowId}: ") 
                                            f.write(f"{com}\n")
                                    if shell == "":
                                        shell = "bash"
                                    
                                    shell = shell.lower()
                                    if not shell in shellTypes.keys():
                                        shellTypes[shell] = 0
                                    shellTypes[shell] += 1

                                    if shell == "bash" or shell in moreBashes:
                                        if not os.path.exists("./trials{}/{}".format(dirNum, workflowId)):
                                            os.makedirs("./trials{}/{}".format(dirNum, workflowId))

                                        vars = []
                                        contexts = {}
                                        for idx, item1 in enumerate(re.findall(r"\${{.*?}}", com)):
                                            com = com.replace(item1, "WORKFLOW_VAR_%d" % idx)
                                            if not item1 in contexts:
                                                contexts[item1] = idx
                                                vars.append("# GREG_JONAH_LOOK_HERE: WORKFLOW_VAR_%d=%s\n" % (idx, item1))
                                                
                                        com = re.sub(r"\$[a-zA-Z0-9_]+", "ENV_VAR", com)
                                        vars.append(com)
                                        fileName = "%s___%s___%s" % (taskname, stepname, str(shellScript)) + ".sh"
                                        shellScript += 1
                                        
                                        with open("./trials{}/{}/{}".format(dirNum, workflowId, fileName), "w") as f:
                                            f.writelines(vars)                                
                                        

            dones.append(item["_id"])
            i += 1
            t += 1

            if i % batch_size == 0 and i != 0:
                dirNum += 1
                # In case it goes over by one workflow
                if dirNum >= cpus:
                    dirNum -= 1
                i = 0

        dirNum += 1

        client.close()
        with open("dones", "wb") as f:
            pickle.dump(dones, f)
         
        batchIdsComplete.add(currentBatchID)
        with open("batchIdsComplete.pkl", "wb") as f:
            pickle.dump(batchIdsComplete, f)

        
        end_progress()
        print("Did %d out of %d" % (t, len(currentBatch))) 
        t = 0

        print("Adding tasks to celery")
        tasks = []
        for i in range(dirNum):
            d = "./trials%d" % i
            if os.path.exists(d) and len(os.listdir(d)) > 0:
                tasks.append(runSemCelery.delay(d, resultInd))
                resultInd += 1

        print("Waiting for tasks to complete")
        for task in tasks:
            task.get()
        print("Tasks completed. Checking errors")

        for i in range(dirNum):
            d = "./trials%d" % i
            if os.path.exists(d) and len(os.listdir(d)) > 0:
                semiTask = test_each_group_celery_task.delay(d)
                semiTaskResult = semiTask.get()

        print(dirNum)
        dirNum = 0
        currentBatchID += 1
        start_progress("Starting batch %d out of %d" % (currentBatchID, batchTotal))

    client.close()
     
    dirNum += 1
    with open("dones", "wb") as f:
        pickle.dump(dones, f)
    end_progress()

    print("Adding tasks to celery")
    tasks = []
    for i in range(dirNum):
        d = "./trials%d" % i
        if os.path.exists(d) and len(os.listdir(d)) > 0:
            tasks.append(runSemCelery.delay(d, resultInd))
            resultInd += 1

    print("Waiting for tasks to complete")
    task_count = 0
    for task in tasks:
        print(f"Waiting for task {task_count} to complete")
        task.get()
    print("Tasks completed. Checking errors")

    for i in range(dirNum):
        d = "./trials%d" % i
        if os.path.exists(d) and len(os.listdir(d)) > 0:
            semiTask = test_each_group_celery_task.delay(d)
            semiTaskResult = semiTask.get()

    print(dirNum)
    print(i)
    print(ids)
    with open("shellTypes.txt", "w") as f:
        for t,num in shellTypes.items():
            f.write("%s: %d\n" % (t, num))

    print("Done with Bash Analysis")
    print("GraphQL COUNT", graphql_count)                            

if __name__ == "__main__":
    # Start the full bash analysis
    runFullBashAnalysis("workflow_analysis", "workflow_irs_32243c76")