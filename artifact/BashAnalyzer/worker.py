# Add parent directory to Python path for package imports
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Regular modules
from celery import Celery
from BashAnalyzer.fullSemgrep import *
from subprocess import CalledProcessError
from BashAnalyzer.testEachGroup import test_each_group_celery

brokerVal = os.getenv('CELERY_BROKER', 'redis://localhost:6379/10')
backendVal = os.getenv('CELERY_BACKEND', 'mongodb://localhost:27017/BashCeleryBackend')

app = Celery('worker', broker=brokerVal, result_backend=backendVal)

@app.task(name='BashAnalyzer.worker.runSemCelery')
def runSemCelery(dir, resultInd):
    try:
        checkGroup(dir, resultInd)
        os.system("rm -rf %s" % dir)
    except CalledProcessError as e:
        with open("semgrep_log.log", "a") as f:
            f.write(str(e))
        return 1

    return 0

@app.task(name='BashAnalyzer.worker.test_each_group_celery_task')
def test_each_group_celery_task(trialDir):
    """Celery task wrapper for test_each_group_celery function"""
    try:
        result = test_each_group_celery(trialDir)
        return 0 if result else 1
    except CalledProcessError as e:
        with open("semgrep_log.log", "a") as f:
            f.write(str(e))
        return 1
    except Exception as e:
        with open("semgrep_log.log", "a") as f:
            f.write(str(e))
        return 1
