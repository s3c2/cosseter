import psutil

# We need this percentage of free memory to scale up.
MEM_FREE_SCALE_UP = .4
# Any less than this memory and we scale down.
MEM_FREE_SCALE_DOWN = .3

def get_used_mem():
    return 1 - psutil.virtual_memory().percent / 100