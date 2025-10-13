# Regular modules
import pymongo
from pymongo import MongoClient
from celery import Celery
from celeryApp.customAutoscaler import DAAutoscaler
import os
import subprocess
from celeryApp import config
import time

app = Celery('worker')
default_config = 'celeryApp.celeryconfig'
app.config_from_object(default_config)
app.conf.update(    
    worker_autoscaler='celeryApp.customAutoscaler.DAAutoscaler',
    worker_concurrency=30,
    worker_max_concurrency=30,
    worker_min_concurrency=5
)

# dbName = "NonCompiledRestIncluded"
# dbName = "100ncctest"
# dbName = "nccCompileTimeoutFix"
# dbName = "nccCompileTimeoutREDO"
# dbName = "webpackCompileTest"
# dbName = "nccCompileMissClassifiedREDO"
# dbName = "fullTestNov"
# dbName = "nccCompileTimeoutFull"
# dbName = "fullTestCallReduction"
# dbName = "fullPermissionExtraction"
# dbName = "fullPermissionExtractionPostBugfix"

@app.task
def getRes(file, version, fileNum):
    buffer = 600
    timeout = (3600 * 2) + buffer
    try:
        # Basically zero out the log file to save disk space
        with open("run_log.log", "w") as f:
            pass
        result = subprocess.run(["python3", "runAnalysis.py", "-pft", str(timeout - buffer), "-G", '-v', version, file], capture_output=True, timeout=timeout)
    except Exception as e:
        client = MongoClient(config.mongoLink) 
        if "timed out after %d seconds" % timeout in str(e):
            maybeCol = client[config.databaseName]["Timeout Errors"]
            maybeCol.insert_one({"File": file, "Out": "Should be timeout error", "Error": str(e)})
            addCol = client[config.databaseName][config.collectionName]
            addCol.update_one({"File": file}, {"$set": {"Timeout": True}}, upsert=True)
        else:
            addCol = client[config.databaseName][config.collectionName]
            maybeCol = client[config.databaseName]["Uncaught Errors"]
            maybeCol.insert_one({"File": file, "Out": "Unknown Error", "Error": str(e)})
            addCol.update_one({"File": file}, {"$set": {"Unknown Error": True}}, upsert=True)
        
        client.close()
        return 2


    """
    client = MongoClient(config.mongoLink)
    addCol = client[config.databaseName]["No Errors"]
    addCol.insert_one({"File": file})
    client.close()
    """

    # print(result.stdout.decode())
    with open("run_result.txt", "w") as f:
        f.write(result.stdout.decode())

    special = False
    if result.returncode == 0:
        client = MongoClient(config.mongoLink)
        addCol = client[config.databaseName]["Founds"]
        addCol.insert_one({"File": file})
        client.close()
        return 0
    else: 
        if "CalledProcessError:" in str(result.stderr) or "CalledProcessError:" in str(result.stdout):
            if "ENOENT: no such file or directory" in str(result.stdout) or "ENOENT: no such file or directory" in str(result.stderr):
                client = MongoClient(config.mongoLink)
                addCol = client[config.databaseName]["File Not Found"]
                addCol.insert_one({"File": file, "Out": str(result.stdout), "Error": str(result.stderr)})
                client.close()
                return 15
            elif "\\'import\\' and \\'export\\' may appear only with \\'sourceType: module\\'" in str(result.stdout) or "\\'import\\' and \\'export\\' may appear only with \\'sourceType: module\\'" in str(result.stderr):
                client = MongoClient(config.mongoLink)
                addCol = client[config.databaseName]["Module Analysis Needed"]
                addCol.insert_one({"File": file, "Out": str(result.stdout), "Error": str(result.stderr)})
                client.close()
                return 20
            client = MongoClient(config.mongoLink)
            addCol = client[config.databaseName]["Esprima Errors"]
            addCol.insert_one({"File": file, "Out": str(result.stdout), "Error": str(result.stderr)})
            client.close()
            return 10
        else:
            special = True

    if special:
        if result.returncode == 4 and "CF FOUND" in str(result.stdout):
            client = MongoClient(config.mongoLink)
            maybeCol = client[config.databaseName]["CF Possible"]
            maybeCol.insert_one({"File": file})
            client.close()
            return 4
        elif result.returncode == 5 and "NOTHING FOUND" in str(result.stdout):
            client = MongoClient(config.mongoLink)
            maybeCol = client[config.databaseName]["Nothing Found"]
            maybeCol.insert_one({"File": file})
            client.close()
            return 5
        else:
            client = MongoClient(config.mongoLink)
            maybeCol = client[config.databaseName]["Uncaught Errors"]
            maybeCol.insert_one({"File": file, "Out": str(result.stdout), "Error": str(result.stderr)})
            client.close()
            return result.returncode
    
    return 0
