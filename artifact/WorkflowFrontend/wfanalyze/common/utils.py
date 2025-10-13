import os
import subprocess
import logging
import shutil
import base64
import re
import tempfile
import tarfile
import json
import random
import hashlib
import binascii
import string
import urllib

from wfanalyze.common.exceptions import UtilsError
from wfanalyze.common.pylogger import get_logger

logger = get_logger("utils", logging.DEBUG)

def path_exists(path):
    return os.path.exists(path)

def join_paths(root, *name):
    return os.path.join(root, *name)


def normalize_path(path):
    return os.path.normpath(path)


def get_file_size(path):
    return os.path.getsize(path)


def is_file(path):
    return os.path.isfile(path)


def is_dir(path):
    return os.path.isdir(path)

def copy_folder(src, dest):
    if not path_exists(src):
        raise UtilsError(f"Source folder [{src}] does not exist")
    if path_exists(dest):
        raise UtilsError(f"Destination folder [{dest}] already exists")
    return shutil.copytree(src, dest)


def is_valid_file(path):
    return path_exists(path) and is_file(path) and get_file_size(path) != 0

def get_next_file_name(root : str = "", prefix : str = "", extension : str = ""):
    for i in range(1, 1000):
        if extension == "":
            name = f"{prefix}{i}"
        else:
            name = f"{prefix}{i}.{extension}"
        path = join_paths(root, name)
        if not is_valid_file(path):
            return path
    return None

def read_file(path):
    data = None

    if is_valid_file(path):
        with open(path, "rb") as fd:
            data = fd.read()
    return data

def read_file_str(path):
    data = None

    if is_valid_file(path):
        with open(path, "rb") as fd:
            data = fd.read().decode("utf-8")
    return data

def get_file_hash(filename):
    md5 = hashlib.md5()
    with open(filename, 'rb') as f:
        while True:
            # read file in 32 kb chunks
            data = f.read(32768)
            if not data:
                break
            md5.update(data)
    return md5.hexdigest()

def read_file_as_json(path):
    return json.loads(read_file(path))

def read_file_all_lines(path):
    lines = []

    if is_valid_file(path):
        with open(path, "r") as fd:
            lines = fd.readlines()
    return lines

def delete_file(path):
    deleted = False

    try:
        if path_exists(path):
            os.remove(path)
        deleted = True
        logger.debug("Deleted file: {0}".format(path))
    except (UtilsError, Exception) as e:
        logger.exception("Error deleting file {0}: {1}".format(path, e))
    finally:
        return deleted


def delete_folder(path):
    deleted = False

    try:
        if os.path.exists(path):
            shutil.rmtree(path)
        deleted = True
        logger.debug("Deleted folder: {0}".format(path))
    except UtilsError as e:
        logger.exception("Error deleting folder {0}: {1}".format(path, e))
    finally:
        return deleted

def create_folder(root=None, folder=None):
    if root != None:
        if not path_exists(join_paths(root, folder)) and folder:
            folder_path = join_paths(root, folder)
            if not is_dir(folder_path):
                try:
                    os.makedirs(folder_path)
                except OSError as e:
                    raise UtilsError(
                        "Unable to create folder: {0} : {1}".format(folder_path, e))
            return folder_path
        return join_paths(root, folder)
    else:
        if not path_exists(folder) and folder:
            if not is_dir(folder):
                try:
                    os.makedirs(folder)
                except OSError as e:
                    raise UtilsError(
                        "Unable to create folder: {0} : {1}".format(folder, e))
        return folder 

def create_temp_folder(root=".", prefix=None):
    return tempfile.mkdtemp(dir=root, prefix=prefix)

def get_temp_folder_name(root = ".", prefix=""):
    while True:
        name = prefix
        name += "".join(random.choices(string.ascii_letters + string.digits, k=10))
        if name not in os.listdir(root):
            return join_paths(root, name)

def find_folder(root, name = "", startswith = ""):
    if name != "":
        path = join_paths(root, name)
        if is_dir(path):
            return path
    elif startswith != "":
        for folder in os.listdir(root):
            if is_dir(join_paths(root, folder)) and folder.startswith(startswith):
                return join_paths(root, folder)
    return None

def folders_in_folder(folder):
    _folders = set()

    if path_exists(folder):
        try:
            for root, dirs, files in os.walk(folder):
                for d in dirs:
                    _folders.add(absolute_path(join_paths(root, d)))
        except (UtilsError, Exception) as e:
            logger.exception(
                "Unable to find files in: {0} : {1}".format(folder, e))

    return list(_folders)


def files_in_folder(folder, extension="", reverse=False):
    _files = set()

    if path_exists(folder):
        try:
            for root, dirs, files in os.walk(folder):
                for filename in files:
                    if extension != "":
                        ext = os.path.splitext(filename)[1][1:]
                        if ext.lower() == extension.lower():
                            _files.add(absolute_path(
                                join_paths(root, filename)))
                    else:
                        _files.add(join_paths(root, filename))
        except (UtilsError, Exception) as e:
            logger.exception(
                "Unable to find files in: {0} : {1}".format(folder, e))

    try:
        return sorted(list(_files), key=get_file_size, reverse=reverse)
    except:
        return _files

def get_file_name_from_path_without_extension(path):
    return os.path.splitext(get_file_name_from_path(path))[0]

def get_file_name_from_path(path):
    dir_path, filename = os.path.split(path)
    return filename if filename else os.path.basename(dir_path)

def get_dir_name_from_path(path):
    return os.path.dirname(path)


def absolute_path(relative_path):
    return os.path.abspath(relative_path)


def store_temp_file(base_dir, data, extension):
    tmp_path = tempfile.mktemp(suffix=".{0}".format(extension), dir=base_dir)

    with open(tmp_path, "wb") as fd:
        if type(data) == bytes:
            fd.write(data)
        elif type(data) == str:
            fd.write(data.encode())

def run_cmd(command, env=None, cwd=None, verbose=False, timeout=25 * 60, trim=True, error_msg = "", raise_timeout=False):
    try:
        logger.debug(f"Running command : {command}\n with {cwd} and {env}")
        out = subprocess.run(
            command, env=env, shell=True, cwd=cwd, timeout=timeout,
            stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        if verbose:
            logger.debug(f"STDOUT has {trimmed_output(out.stdout.decode('latin-1'))}")
            logger.debug(f"STDERR has {trimmed_output(out.stderr.decode('latin-1'))}")
        if trim:
            return trimmed_output(out.stdout.decode("latin-1")), trimmed_output(out.stderr.decode("latin-1"))
        else:    
            return out.stdout.decode("latin-1"), out.stderr.decode("latin-1")
    except subprocess.TimeoutExpired as e:
        logger.error(f"The {error_msg} Command Timed out", extra={"cmd" : command, "error" : e})
        if raise_timeout:
            raise UtilsError(f"The {error_msg} Command Timed out")
        return "", ""
    except Exception as e:
        logger.exception(f"{error_msg} failed", extra={'cmd' : command, 'error' : e})

def trimmed_output(output):
    if isinstance(output, str):
        # if the length is greater than 2000, trim it and return the last 2000 characters
        if len(output) > 4000:
            return output[-4000:]
        return output
    else:
        return output

def join_lines(lines):    
    outb = b""
    outs = ""
    for line in lines:
        if isinstance(line, bytes):
            outb += line
        elif isinstance(line, str):
            outs += line
        else:
            return lines
    return outs if len(outb) == 0 else outb.decode("latin-1")


def parse_url(url):
    return urllib.parse.unquote(url)