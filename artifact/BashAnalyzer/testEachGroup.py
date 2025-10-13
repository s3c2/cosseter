from subprocess import check_output, CalledProcessError
import os
from BashAnalyzer.config import fname


def checkGroupAdjusted(file: str):

    # Call semgrep on the file with the file template to find the created functions
    results = check_output("semgrep scan --json --config ./{} {}".format(fname, file), shell=True)
    
    with open("./seperateResults/storedResults%d.json" % len(os.listdir("./seperateResults")), "w") as f:
        f.write(results.decode('utf-8'))


def test_each_group():
    if not os.path.exists("./trials"):
        print("Trials folder is not found")
        return False

    res = 0
    
    oldLen = 0
    while len(os.listdir("./trials")) > 10 and oldLen != len(os.listdir("./trials")):
        ind = 0 
        group = 0
        fileGroup = []
        dirs = os.listdir("./trials")
        for dir in dirs:
            fileGroup.append(dir)
            if ind % (len(dirs) // 4) == 0 and ind != 0:
                for f in fileGroup:
                    os.system("mv ./trials/%s ./group%d/" % (f, group))
                fileGroup = []
                group += 1
                if group >= 4:
                    group = 0
            
            ind += 1

        for f in fileGroup:
            os.system("mv ./trials/%s ./group%d/" % (f, group))

        for i in range(4):
            try:
                results = check_output("semgrep scan --json --config ./{} {}".format(fname, "group%d" % i), shell=True)
                os.system("mv ./group%d/* ./goods/" % i)
            except CalledProcessError as e:
                os.system("mv ./group%d/* ./trials/" % i)
            res += 1


    for d in os.listdir("./trials"):
        try:
            results = check_output("semgrep scan --json --config ./{} ./trials/{}".format(fname, d), shell=True)
            os.system("mv ./trials/%s ./goods/" % d)
        except CalledProcessError as e:
            os.system("mv ./trials/%s ./hugeErrors/" % d)

    checkGroupAdjusted("goods")

    os.system("rm -rf ./goods/*")

    return True

def test_each_group_celery(trialDir):
    if not os.path.exists(trialDir):
        return False
    
    res = 0
    
    oldLen = 0
    while len(os.listdir(trialDir)) > 10 and oldLen != len(os.listdir(trialDir)):
        ind = 0 
        group = 0
        fileGroup = []
        dirs = os.listdir(trialDir)
        for dir in dirs:
            fileGroup.append(dir)
            if ind % (len(dirs) // 4) == 0 and ind != 0:
                for f in fileGroup:
                    os.system("mv %s/%s ./group%d/" % (trialDir, f, group))
                fileGroup = []
                group += 1
                if group >= 4:
                    group = 0
            
            ind += 1

        for f in fileGroup:
            os.system("mv %s/%s ./group%d/" % (trialDir, f, group))

        for i in range(4):
            try:
                results = check_output("semgrep scan --json --config ./{} {}".format(fname, "group%d" % i), shell=True)
                os.system("mv ./group%d/* ./goods/" % i)
            except CalledProcessError as e:
                os.system("mv ./group%d/* %s/" % (i, trialDir))
            res += 1


    for d in os.listdir(trialDir):
        try:
            results = check_output("semgrep scan --json --config ./{} {}/{}".format(fname, trialDir, d), shell=True)
            os.system("mv %s/%s ./goods/" % (trialDir, d))
        except CalledProcessError as e:
            os.system("mv %s/%s ./hugeErrors/" % (trialDir, d))

    checkGroupAdjusted("goods")

    os.system("rm -rf ./goods/*")

    return True
