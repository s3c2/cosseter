import time
import sys

def start_progress(title):
    global progress_x
    sys.stdout.write(title + ": [" + "-"*40 + "]" + chr(8)*41)
    sys.stdout.flush()
    progress_x = 0

def progress(curr, goal):
    x = int((curr / goal) * 100)
    global progress_x
    x = int(x * 40 // 100)
    sys.stdout.write("#" * (x - progress_x))
    sys.stdout.flush()
    progress_x = x

def end_progress():
    sys.stdout.write("#" * (40 - progress_x) + "]\n")
    sys.stdout.flush()


if __name__ == "__main__":
    start_progress("Trial for replaceing the screen")
    for i in range(1000):
        progress(i, 1000)
        time.sleep(0.01)
    end_progress()