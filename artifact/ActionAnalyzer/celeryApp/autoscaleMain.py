from celeryApp.worker import getRes, app
import random
import time
from time import gmtime, strftime
from celeryApp import scalerConfig
from celery.result import AsyncResult
import pickle


def sendToCelery(files):
    total = len(files)
    # NOTE SUPER IMPORTANT!! MAKE SURE THE CPU NUMBER HERE MATCHES THE MAX CPU (Or is below)!!
    cpus = 20

    resultQueue = []
    curr = 0

    memRecorded = False

    while len(files) > 0 or len(resultQueue) > 0:
        memOver = False
        mem = scalerConfig.get_used_mem()
        print("Current Memory[%.2f]" % mem)
        if mem >= 0.6 and len(resultQueue) < cpus and len(files) > 0:
            file, version = files.pop()
            print("%d out of %d" % (curr, total))
            print(file)
            print(version)
            result = getRes.delay(file, version, curr).id
            resultQueue.append([result, file])
            curr += 1
        elif mem >= 0.6:
            print("Buffering for 15 seconds...")
            time.sleep(15)
            good = False
            nq = []
            for item in resultQueue:
                itemId = item[0]
                itemFile = item[1]
                res = AsyncResult(itemId, app=app)
                 
                if res.ready():
                    good = True
                else:
                    nq.append([itemId, itemFile])
            if good:
                print("Files Completed. Should continue")

            resultQueue = nq
        elif mem <= 0.1:
            print("Memory Reaching limit. Recording files and ids")
            memOver = True

            if not memRecorded:
                with open(strftime("%Y-%m-%d_%H-%M-%S.txt", gmtime()), "w") as f:
                    for item in resultQueue:
                        f.write(item[0] + "\n")
                        f.write(item[1] + "\n")
                        f.write("---\n")
            
                memRecorded = True
            
            time.sleep(15)
        else:
            print("Memory Over at [%.2f]. Waiting 15..." % mem)
            time.sleep(15)

        if not memOver and memRecorded:
            memRecorded = False

    return True

if __name__ == "__main__":
    files = []
    # with open("nccTimeoutCheck.txt", "r") as f:
    # with open("MissCatagorizedExperiment.txt", "r") as f:
    # with open("filesRevamped.txt", "r") as f:
    # with open("missingsRerun.txt", "r") as f:
    # with open("bads.txt", "r") as f:
    # with open("redoFiles.txt", "r") as f:
    ## with open("actionsFileComparison.txt", "r") as f:
    # with open("rerunErrorFiles.txt", "r") as f:
    ## with open("verifiedFoundActionsSemiFinal.txt", "r") as f:
    # with open("simpleTest.txt", "r") as f: # Single test that should yield results if done correctly
    # with open("Founds100Test.txt", "r") as f: # Tested on 100 that had found something last time
    # with open("Timeout100Test.txt", "r") as f:
    #     rl = f.readlines()

    # for l in rl:
    #     l = l.rstrip()
    #     if l != "": # and not "maxkomarychev" in l:
    #         files.append(l)

    with open("actionFilesWithVersions0.pkl", "rb") as f: # Half of the actions
        fwv = pickle.load(f)

    with open("actionFilesWithVersions1.pkl", "rb") as f: # Half of the actions
        fwv2 = pickle.load(f)

    for k,v in fwv2.items():
        fwv[k] = v

    # with open("allFileListsDedeuped.txt", "w") as f:
    #     for k in fwv:
    #         f.write(k + "\n")
    # print("Exiting early")
    # exit(0)


    # with open("RecursionFix1.txt", "r") as f:
    #     rfs = f.readlines()

    # with open("falseNegativeTest.txt", "r") as f:
    #     rfs = f.readlines()

    # with open("actionsFileComparison.txt", "r") as f:
    #     rfs = f.readlines()

    with open("actionsManualCompDeduplicated.txt", "r") as f:
        rfs = f.readlines()

    # with open("actionsManualExtraMissed.txt", "r") as f:
    #     rfs = f.readlines()

    # with open("benchmarkRerun.txt", "r") as f:
    #     rfs = f.readlines()

    recursionErrorFiles = set()
    for l in rfs:
        l = l.rstrip().replace(" ", "")
        if l != "":
            recursionErrorFiles.add(l)

    print(len(recursionErrorFiles))
    # A test to make sure everything is working properly
    test = False
    if test:
        fwv = {
            "/home/gttystah/newClonedActions/ankitects#setup-protoc/lib/main.js": "TEST",
            "/home/gttystah/pulledActions/actions/ChristiaanScheermeijer#jest-reporter-action/index.js": "TEST"
            }

    # for k,v in fwv.items():
    #     if k in recursionErrorFiles or True:
    #         files.append((k, v))

    for f in recursionErrorFiles:
        files.append((f, "BENCHMARK"))

    random.Random().shuffle(files)

    print(total)
    # exit(0)

    sendToCelery(files)