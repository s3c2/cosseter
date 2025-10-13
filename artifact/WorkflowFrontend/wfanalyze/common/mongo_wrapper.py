import pymongo
import logging

from pymongo import MongoClient
from wfanalyze.common.pylogger import get_logger
from bson.objectid import ObjectId

workflow_collection = None
action_collection = None
ir_collection = None
connection = False
result_collection = None

log = get_logger("mongo_wrapper", logging.INFO)

def set_database(uri, db_name):
    global action_collection, workflow_collection, ir_collection, connection, result_collection
    try:
        client = MongoClient(uri)
        db = client[db_name]

        workflow_collection = db["workflows-new"]
        ir_collection = db["workflows-ir"]
        action_collection = db["actions_col"]
        result_collection = db["results_fin"]
        connection = True
    except pymongo.errors.ServerSelectionTimeoutError:
        log.critical("Unable to establish connection to MongoDB")
        raise Exception("Unable to establish connection to MongoDB")
    
    log.info("Connected to MongoDB...")
    connecton = True

'''
    WORKFLOW FUNCTIONS

    for interaction with the workflow_collection, which is the "workflows-new" collection present in the database
'''

def get_workflow_iter():
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    for workflow in workflow_collection.find():
        yield workflow

def get_workflow(name):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    return workflow_collection.find_one({"name": name})

def update_workflow_converted(workflow_id):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    workflow_collection.update_one({"_id": workflow_id}, {"$set": {"converted": True, "error": ""}})

def update_workflow_error(workflow_id, error):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    workflow_collection.update_one({"_id": workflow_id}, {"$set": {"converted": False, "error": error}})

def update_workflow_by_name_with_converted(workflow_name):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    workflow_collection.update_one({"name": workflow_name}, {"$set": {"converted": True}})

def update_workflow_by_name_with_error(workflow_name, error):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    workflow_collection.update_one({"name": workflow_name}, {"$set": {"converted": False, "error": error}})

'''
    ACTION ANALYSIS FUNCTIONS 

    for interaction with the action_collection, which is the "actions_analysis" collection present in the database
'''

def get_action_iter():
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    for action in action_collection.find():
        yield action

# Check if a specific action and version exists in the actions collection
def get_action(action_name, action_version):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    return action_collection.find_one({"name": action_name, "version": action_version})

# Add a new action to the actions collection
def add_action(action_name, action_version, error, default_dict, action_dict):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    action_collection.insert_one(
            {"name": action_name, "version": action_version,
            "error" : error, "defaults": default_dict, "details": action_dict}
    )

def add_action_default(action_name, action_version, action_type, default_dict):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    action_collection.insert_one({"name": action_name, "version": action_version, "defaults": default_dict, 
        "type": action_type, "hasDefault": True, "codeQL": False, "count": 1})

def add_action_no_default(action_name, action_version, action_type):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    action_collection.insert_one({"name": action_name, "version": action_version, 
        "type": action_type, "hasDefault": False, "hasCodeQL": False, "count": 1, "added_res": True})

def add_action_default_error(action_name, action_version, action_type, error):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    action_collection.insert_one({"name": action_name, "version": action_version, "def_error": error, 
        "type": action_type, "hasDefault": False, "codeQL": False, "count": 1})

def update_action_default(action_name, action_version, action_type, default_dict):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    action_collection.update_one({"name": action_name, "version": action_version}, {"$set": {"type": action_type, "defaults": default_dict, "hasDefault": True}})

# Update the action in the actions collection with new details
def update_action(action_name, action_version, action_dict):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    action_collection.update_one({"name": action_name, "version": action_version}, {"$set": action_dict})

def update_action_count(action_name, action_version):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    action_collection.update_one({"name": action_name, "version": action_version}, {"$inc": {"count": 1}})

def update_action_default_error(action_name, action_version, error):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    action_collection.update_one({"name": action_name, "version": action_version}, {"$set": {"def_error": error, "hasDefault": False}})

def update_action_default_error_by_id(action_id, error):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    action_collection.update_one({"_id": action_id}, {"$set": {"def_error": error, "hasDefault": False}})

def update_action_codeql_error_by_id(action_id, error):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    action_collection.update_one({"_id": action_id}, {"$set": {"ql_error": error, "hasCodeQL": False, "round": 2}})

def update_action_default_by_id(id, action_type, default_dict):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    if isinstance(id, str):
        id = ObjectId(id)
    # add the default dict to the action
    # remove the def_error field
    action_collection.update_one({"_id": id}, {"$set": {"type": action_type, "defaults": default_dict, "hasDefault": True}, "$unset": {"def_error": ""}})

def get_action_by_id(id):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    if isinstance(id, str):
        id = ObjectId(id)
    return action_collection.find_one({"_id": id})

def update_interesting_action_by_id(id, boolval, round):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    if isinstance(id, str):
        id = ObjectId(id)
    action_collection.update_one({"_id": id}, {"$set": {"isInteresting": boolval, "round": round}})

def update_action_count_with_id(id):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    action_collection.update_one({"_id": id}, {"$inc": {"count": 1}})

def get_action_with_id(id):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    if isinstance(id, str):
        id = ObjectId(id)
    return action_collection.find_one({"_id": id})



def update_action_error_by_id(action_id, error):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    action_collection.update_one({"_id": action_id}, {"$set": {"error": error}})

def update_action_results_by_id(action_id, results):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    action_collection.update_one({"_id": action_id}, {"$set": {"ql_results": results, "hasCodeQL": True, "round" : 2}})

# Get the details of a specific action and version
def get_action_details(action_name, action_version):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    return action_collection.find_one({"name": action_name, "version": action_version})

def set_action_count_by_id(id, count):
    global action_collection, workflow_collection, connection
    if connection == False:
        raise Exception("No connection to MongoDB (Need to set_database())")
    action_collection.update_one({"_id": id}, {"$set": {"count": count}})

'''
    IR WORKFLOW FUNCTIONS

    for interacting with the ir_workflow collection, which stores the IR for each workflow in the "workflows-ir" collection
'''

def add_ir_workflow(name, wf_name, wf_path, wf_yml, wf_metadata, ir_dict, metadata):
    global ir_collection, connection
    if connection == False or ir_collection == None:
        raise Exception("No connection to MongoDB (Need to set_database())")
    ir_collection.insert_one({
        "repo": name, 
        "workflow_name": wf_name, 
        "workflow_path": wf_path, 
        "ir": ir_dict, 
        "workflow_yaml": wf_yml,
        "wf_metadata": wf_metadata,
        "repo_metadata": metadata,
        "analyzed": False,
        "isInteresting": False
    })

def get_ir_workflow(name, wf_path):
    global ir_collection, connection
    if connection == False or ir_collection == None:
        raise Exception("No connection to MongoDB (Need to set_database())")
    return ir_collection.find_one({"repo": name, "workflow_path": wf_path})

def get_ir_workflow_by_id(id):
    global ir_collection, connection
    if connection == False or ir_collection == None:
        raise Exception("No connection to MongoDB (Need to set_database())")
    if isinstance(id, str):
        id = ObjectId(id)
    # get only the "ir" field
    return ir_collection.find_one({"_id": id})

def get_all_ir_workflows():
    global ir_collection, connection
    if connection == False or ir_collection == None:
        raise Exception("No connection to MongoDB (Need to set_database())")
    return ir_collection.find()

def update_interesting(name, wf_path, isInteresting, round):
    global ir_collection, connection
    if connection == False or ir_collection == None:
        raise Exception("No connection to MongoDB (Need to set_database())")
    ir_collection.update_one({"repo": name, "workflow_path": wf_path}, {"$set": {"isInteresting": isInteresting, "round": round}})

def update_interesting_by_id(id, isInteresting, round):
    global ir_collection, connection
    if connection == False or ir_collection == None:
        raise Exception("No connection to MongoDB (Need to set_database())")
    ir_collection.update_one({"_id": id}, {"$set": {"isInteresting": isInteresting, "round": round}})

def get_uninteresing_workflows():
    global ir_collection, connection
    if connection == False or ir_collection == None:
        raise Exception("No connection to MongoDB (Need to set_database())")
    return ir_collection.find({"isInteresting": False})

def update_ir_workflow_error(name, wf_path, round, error):
    global ir_collection, connection
    if connection == False or ir_collection == None:
        raise Exception("No connection to MongoDB (Need to set_database())")
    ir_collection.update_one({"repo": name, "workflow_path": wf_path}, {"$set": {"round": round, "error": error}})

def update_ir_workflow_error_by_id(id, round, error):
    global ir_collection, connection
    if connection == False or ir_collection == None:
        raise Exception("No connection to MongoDB (Need to set_database())")
    ir_collection.update_one({"_id": id}, {"$set": {"round": round, "error": error}})

def update_ir_workflow_success(name, wf_path, round):
    global ir_collection, connection
    if connection == False or ir_collection == None:
        raise Exception("No connection to MongoDB (Need to set_database())")
    ir_collection.update_one({"repo": name, "workflow_path": wf_path}, {"$set": {"round": round, "error": ""}})

def update_ir_workflow_success_by_id(id, round):
    global ir_collection, connection
    if connection == False or ir_collection == None:
        raise Exception("No connection to MongoDB (Need to set_database())")
    ir_collection.update_one({"_id": id}, {"$set": {"round": round, "error": ""}})

def initialize_results(id, yaml, ir, metadata):
    global result_collection, connection
    if connection == False or result_collection == None:
        raise Exception("No connection to MongoDB (Need to set_database())")
    result_collection.insert_one({
        "wf_id": id,
        "hasAlerts": False,
        "alerts": [],
        "yaml": yaml,
        "metadata": metadata,
        "ir": ir
    })

def get_results(id): 
    global result_collection, connection
    if connection == False or result_collection == None:
        raise Exception("No connection to MongoDB (Need to set_database())")
    return result_collection.find_one({"wf_id": id})

def add_result(id, res_type, result, details):
    global result_collection, connection
    if connection == False or result_collection == None:
        raise Exception(f"No connection to MongoDB (Need to set_database()), {result_collection}")
    result_collection.update_one({"wf_id": id}, {"$push": {"alerts": {"type": res_type, "result": result, "details": details}}})