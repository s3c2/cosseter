import os
import logging
from colorlog import ColoredFormatter

def get_logger(name, level):
    l = logging.getLogger(name)
    l.setLevel(level)

    logs_path = os.path.join(os.getcwd(), "logs")
    if not os.path.exists(logs_path):
        os.makedirs(logs_path)
        
    stream_h = logging.StreamHandler()
    file_h = logging.FileHandler('logs/%s.log' % name)

    formatter = ColoredFormatter(
        "%(asctime)-s %(name)s [%(levelname)s] %(log_color)s%(message)s%(reset)s",
        datefmt=None, reset=True,
        log_colors={
            "DEBUG": "purple",
            "INFO": "green",
            "WARNING": "yellow",
            "ERROR": "red",
            "CRITICAL": "red",
        }
    )
    stream_h.setFormatter(formatter)
    file_h.setFormatter(formatter)
    l.addHandler(stream_h)
    l.addHandler(file_h)

    return l