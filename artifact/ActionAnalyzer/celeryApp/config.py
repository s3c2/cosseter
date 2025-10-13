import os
# This file holds all of the little configurations that each of the files run in this repo rely on

# The format of the output csv:
# [      0                 1             2          3             4                    5                    6              7   ]
# ["Repository", "Workflow (File)", "File Path", "Link", "Contains Secrets", "Write Permissions", "Read permissions", "On type"]

global resFile, inpFile, filterFile, outFile, mongoLink, databaseName, logFile, collectionName, resultDatabase, resultCollection

# This is the csv file we are getting our workflow info from
inpFile = "vuln_workflows.csv"

# This is the filter file that is outputed by workflowFilter that contains only the needed rerunable workflows
filterFile = "filtered_workflows.csv"

# This is the output file that will be uploaded to a spreadsheet once all the results are in
outFile = "permissions.csv"

# This is the directory all of the temporary files will be located on the docker
# tmp = "/temporary"
tmp = "./logFiles"
base = "./"

# These are the ip for the database and the name of the current one we are looking at
mongoLink = os.environ.get("CELERY_RESULT_BACKEND", "mongodb://localhost:27017/") 
databaseName = "ArtifactEvaluationOne" # Final run for S&P
collectionName = "ExtractedPermissions"

debugLog = False
logWriteLoc = "/home/gttystah/GitHub_Permission_Reduction/Log_Capture_Remastered/logFiles" 