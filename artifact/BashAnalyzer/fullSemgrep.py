import os
from subprocess import check_output
import json
from pymongo import MongoClient
from BashAnalyzer.config import fname, resultsDir

def checkGroup(file: str, ind):
    # Call semgrep on the file with the file template to find the created functions
    print("semgrep scan --no-git-ignore --json --config ./{} {}".format(fname, file))
    results = check_output("semgrep scan --no-git-ignore --json --config ./{} {}".format(fname, file), shell=True)
    
    with open("./%s/storedResults%d.json" % (resultsDir, ind), "w") as f:
        f.write(results.decode('utf-8'))
