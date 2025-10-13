from CosseterJavaScript.simurun.launcher import main
from CosseterJavaScript.simurun.graph import *

G = main()

if G.success_detect:
    exit(0)
elif len(G.cf_paths) != 0:
    print("CF FOUND")
    exit(4)
else:
    print("NOTHING FOUND")
    exit(5)