#!/usr/bin/env python3
"""
Workflow Processor Service
Reads GitHub Actions workflow YAML files from sharedDirectory/workflows,
generates IRs using wfanalyze functionality, and stores them in MongoDB.
"""

import os
import sys
import time
import yaml
import json
import logging
import hashlib
import threading
from pathlib import Path
from typing import List, Dict, Any, Set, Tuple
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Add the current directory to Python path to import wfanalyze
sys.path.insert(0, '/app')

from wfanalyze.ghworkflow.workflow import Workflow, THIRD_PARTY_ACTION
from wfanalyze.ghworkflow.action_core import WorkflowStep
from wfanalyze.ghworkflow.action_parser import parse_action_yaml, ActionYML
from wfanalyze.common.exceptions import WorkflowError
from wfanalyze.common.pylogger import get_logger
from wfanalyze.common.clone_action import clone_repo
from wfanalyze.saengine.gh_action import split_action_name

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = get_logger("workflow_processor", logging.INFO)


class WorkflowProcessor:
    def __init__(self):
        self.mongodb_uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
        self.db_name = os.getenv('MONGODB_DB', 'workflow_analysis')
        self.workflows_dir = os.getenv('WORKFLOWS_DIR', '/app/sharedDirectory/workflows')
        self.configs_dir = os.getenv('CONFIGS_DIR', '/app/sharedDirectory/configs')
        self.actions_dir = os.getenv('ACTIONS_DIR', '/app/sharedDirectory/actions')
        self.client = None
        self.db = None
        self.collection = None
        self.current_collection_name = None
        self.collection_config_file = os.path.join(self.configs_dir, 'current_collection.txt')
        
        # Ensure actions directory exists
        os.makedirs(self.actions_dir, exist_ok=True)
        # Also ensure the relative path used by clone_repo exists
        os.makedirs('/app/sharedDirectory/actions', exist_ok=True)
        # Make sure the workflow directory exists as well
        os.makedirs(self.workflows_dir, exist_ok=True)
        
        self.connect_to_mongodb()
        self.setup_collection()
        
    def connect_to_mongodb(self):
        """Connect to MongoDB with retry logic"""
        max_retries = 30
        retry_delay = 2
        
        for attempt in range(max_retries):
            try:
                logger.info(f"Attempting to connect to MongoDB at {self.mongodb_uri} (attempt {attempt + 1}/{max_retries})")
                self.client = MongoClient(self.mongodb_uri, serverSelectionTimeoutMS=5000)
                # Simple connection test without admin privileges
                self.db = self.client[self.db_name]
                # Test basic connection by listing collections
                self.db.list_collection_names()
                logger.info("Successfully connected to MongoDB")
                return
                
            except ConnectionFailure as e:
                logger.warning(f"Failed to connect to MongoDB: {e}")
                if attempt < max_retries - 1:
                    logger.info(f"Retrying in {retry_delay} seconds...")
                    time.sleep(retry_delay)
                else:
                    logger.error("Failed to connect to MongoDB after all retries")
                    raise
            except Exception as e:
                logger.warning(f"Connection test failed: {e}")
                if attempt < max_retries - 1:
                    logger.info(f"Retrying in {retry_delay} seconds...")
                    time.sleep(retry_delay)
                else:
                    logger.error("Failed to connect to MongoDB after all retries")
                    raise
    
    def calculate_workflows_hash(self) -> str:
        """Calculate a hash of all workflow files to detect changes"""
        hash_obj = hashlib.sha256()
        
        if not os.path.exists(self.workflows_dir):
            return hash_obj.hexdigest()[:8]
        
        # Get all workflow files and their modification times
        workflow_files = []
        for root, dirs, files in os.walk(self.workflows_dir):
            for file in files:
                file_path = os.path.join(root, file)
                if self.is_workflow_file(file_path):
                    try:
                        # Include file path and modification time in hash
                        rel_path = os.path.relpath(file_path, self.workflows_dir)
                        mod_time = os.path.getmtime(file_path)
                        workflow_files.append((rel_path, mod_time))
                    except OSError:
                        continue
        
        # Sort files for consistent hashing
        workflow_files.sort()
        
        # Hash the file list and modification times
        for file_path, mod_time in workflow_files:
            hash_obj.update(f"{file_path}:{mod_time}".encode('utf-8'))
        
        return hash_obj.hexdigest()[:8]
    
    def load_current_collection_name(self) -> str:
        """Load the current collection name from config file"""
        try:
            if os.path.exists(self.collection_config_file):
                with open(self.collection_config_file, 'r') as f:
                    return f.read().strip()
        except Exception as e:
            logger.warning(f"Failed to read collection config file: {e}")
        return None
    
    def save_current_collection_name(self, collection_name: str):
        """Save the current collection name to config file"""
        try:
            os.makedirs(self.configs_dir, exist_ok=True)
            with open(self.collection_config_file, 'w') as f:
                f.write(collection_name)
            logger.info(f"Saved current collection name '{collection_name}' to {self.collection_config_file}")
        except Exception as e:
            logger.error(f"Failed to save collection config file: {e}")
    
    def setup_collection(self):
        """Setup the collection based on workflow changes"""
        current_hash = self.calculate_workflows_hash()
        saved_collection = self.load_current_collection_name()
        
        # Extract hash from saved collection name if it exists
        saved_hash = None
        if saved_collection and saved_collection.startswith('workflow_irs_'):
            saved_hash = saved_collection.replace('workflow_irs_', '')
        
        if saved_hash == current_hash and saved_collection:
            # No changes detected, use existing collection
            self.current_collection_name = saved_collection
            logger.info(f"No changes detected. Using existing collection: {self.current_collection_name}")
        else:
            # Changes detected or no previous collection, create new one
            self.current_collection_name = f"workflow_irs_{current_hash}"
            logger.info(f"Changes detected or new run. Creating new collection: {self.current_collection_name}")
            self.save_current_collection_name(self.current_collection_name)
        
        self.collection = self.db[self.current_collection_name]
    
    def is_workflow_file(self, file_path: str) -> bool:
        """Check if a file is a valid workflow YAML file"""
        if not file_path.endswith(('.yml', '.yaml')):
            return False
        
        # Check if it's in a .github/workflows directory or similar
        path_parts = Path(file_path).parts
        return 'workflows' in path_parts or file_path.endswith('.yml') or file_path.endswith('.yaml')
    
    def load_yaml_file(self, file_path: str) -> Dict[Any, Any]:
        """Load and parse a YAML file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = yaml.safe_load(f)
                if content is None:
                    logger.warning(f"Empty YAML file: {file_path}")
                    return {}
                return content
        except yaml.YAMLError as e:
            logger.error(f"Error parsing YAML file {file_path}: {e}")
            return {}
        except Exception as e:
            logger.error(f"Error reading file {file_path}: {e}")
            return {}
    
    def process_workflow_file(self, file_path: str) -> bool:
        """Process a single workflow file and store its IR in MongoDB"""
        try:
            logger.info(f"Processing workflow file: {file_path}")
            
            # Load the YAML content
            content = self.load_yaml_file(file_path)
            if not content:
                logger.warning(f"Skipping empty or invalid file: {file_path}")
                return False
            
            # Extract repo and file info from path
            path_obj = Path(file_path)
            repo = "unknown"
            file_name = path_obj.name
            
            # Try to extract repo from path structure
            parts = path_obj.parts
            if len(parts) >= 2:
                # Look for typical GitHub structure
                for i, part in enumerate(parts):
                    if part == '.github' and i > 0:
                        repo = parts[i-1]
                        break
                    elif part == 'workflows' and i > 1:
                        repo = parts[i-2]
                        break
            
            # Create Workflow object and generate IR
            workflow = Workflow(content, repo=repo, file=file_name, debug=False)
            ir_data = workflow.convert_to_IR()
            
            # Download and verify third-party actions
            third_party_actions = self.extract_third_party_actions(workflow)
            action_verification_results = self.download_and_verify_actions(third_party_actions)
            
            # Update IR with verified action information
            self.update_ir_with_action_verification(ir_data, action_verification_results)
            
            # Add metadata (append to existing if present)
            if 'metadata' not in ir_data:
                ir_data['metadata'] = {}
            
            ir_data['metadata'].update({
                'file_path': file_path,
                'repo': repo,
                'file': file_name,
                'processed_at': time.time(),
                'third_party_actions_count': len(third_party_actions),
                'verified_actions_count': len(action_verification_results)
            })
            
            # Store in MongoDB
            self.store_ir_in_mongodb(ir_data, file_path)
            
            logger.info(f"Successfully processed and stored IR for: {file_path}")
            return True
            
        except WorkflowError as e:
            logger.error(f"Workflow parsing error for {file_path}: {e}")
            return False
        except Exception as e:
            logger.error(f"Unexpected error processing {file_path}: {e}")
            return False
    
    def store_ir_in_mongodb(self, ir_data: Dict, file_path: str):
        """Store the IR data in MongoDB"""
        try:
            # Use file path as unique identifier to avoid duplicates
            filter_query = {'metadata.file_path': file_path}
            
            # Upsert the document
            result = self.collection.replace_one(
                filter_query, 
                ir_data, 
                upsert=True
            )
            
            if result.upserted_id:
                logger.info(f"Inserted new IR document for {file_path}")
            else:
                logger.info(f"Updated existing IR document for {file_path}")
                
        except Exception as e:
            logger.error(f"Error storing IR in MongoDB for {file_path}: {e}")
            raise

    def extract_third_party_actions(self, workflow: Workflow) -> List[Dict[str, str]]:
        """Extract third-party actions from a workflow"""
        third_party_actions = []
        
        try:
            # Get all actions from the workflow
            all_actions = workflow.depending_actions()
            
            for action in all_actions:
                action_name = action.get('name', '')
                action_version = action.get('version', '')
                
                # Check if it's a third-party action (not GitHub official actions)
                if action_name and not action_name.startswith('docker:') and not action_name.startswith('./'):
                    third_party_actions.append({
                        'name': action_name,
                        'version': action_version,
                        'type': action.get('type', 'unknown')
                    })
                    
            logger.info(f"Found {len(third_party_actions)} third-party actions")
            return third_party_actions
            
        except Exception as e:
            logger.error(f"Error extracting third-party actions: {e}")
            return []

    def download_and_verify_actions(self, actions: List[Dict[str, str]]) -> Dict[str, Dict[str, Any]]:
        """Download third-party actions and verify their types"""
        verification_results = {}
        
        for action in actions:
            action_name = action['name']
            action_version = action['version']
            
            try:
                logger.info(f"Processing action: {action_name}@{action_version}")
                
                # Skip if already processed
                action_key = f"{action_name}@{action_version}"
                if action_key in verification_results:
                    continue
                
                # Check if action is already downloaded
                # The clone_repo function uses "./sharedDirectory/actions/" path
                repo_name = action_name.replace('/', '#')
                action_dir = os.path.join('./sharedDirectory/actions', repo_name)
                
                if not os.path.exists(action_dir):
                    logger.info(f"Downloading action: {action_name}")
                    try:
                        # Change to the correct directory before cloning
                        original_cwd = os.getcwd()
                        try:
                            # Ensure we're in the right directory for the clone_repo function
                            os.chdir('/app')
                            clone_repo(action_name)
                            logger.info(f"Successfully downloaded: {action_name}")
                        finally:
                            os.chdir(original_cwd)
                    except Exception as e:
                        logger.error(f"Failed to download action {action_name}: {e}")
                        verification_results[action_key] = {
                            'downloaded': False,
                            'error': str(e),
                            'verified_type': None
                        }
                        continue
                else:
                    logger.info(f"Action {action_name} already exists locally")
                
                # Verify action type
                verified_type = self.verify_action_type(action_name, action_version)

                # Gather the filepath for the action
                verified_file_path = self.verify_action_file(action_name)
                
                verification_results[action_key] = {
                    'downloaded': True,
                    'verified_type': verified_type,
                    'original_type': action.get('type', 'unknown'),
                    'action_name': action_name,
                    'action_version': action_version
                }
                
                if verified_file_path is not None:
                    verification_results[action_key]['action_path'] = verified_file_path
                
                logger.info(f"Action {action_name} verified as: {verified_type}")
                
            except Exception as e:
                logger.error(f"Error processing action {action_name}: {e}")
                verification_results[action_key] = {
                    'downloaded': False,
                    'error': str(e),
                    'verified_type': None
                }
        
        return verification_results

    def verify_action_file(self, action_name: str) -> str:
        """Verify the actual file path of a downloaded action"""
        try:
            repo_name = action_name.replace('/', '#')
            action_dir = os.path.join('/app/sharedDirectory/actions', repo_name)
            
            if not os.path.exists(action_dir):
                return None

            # Check for action.yml or action.yaml
            action_yml_path = None
            for filename in ['action.yml', 'action.yaml']:
                potential_path = os.path.join(action_dir, filename)
                if os.path.exists(potential_path):
                    action_yml_path = potential_path
                    break

            if not action_yml_path:
                return None

            # Parse the action.yml manually to get the type
            with open(action_yml_path, 'r') as f:
                action_content = yaml.safe_load(f)

            runs = action_content.get('runs', {})
            main = runs.get('main', None)

            if main is not None:
                return os.path.join(action_dir, main)
            else:
                return None

        except Exception as e:
            logger.warning(f"Action file path not found for {action_name}: {e}")
            return None

    # This does not work at all. Should be replaced with the correct fallback
    def verify_action_type(self, action_name: str, action_version: str) -> str:
        """Verify the actual type of a downloaded action by examining its action.yml"""
        try:
            # Create a minimal config for the action parser
            config = {
                'actions_dir': '/app/sharedDirectory/actions',
                'temp_dir': '/tmp'
            }
            
            # Parse the action YAML to get detailed information
            action_yml = parse_action_yaml(action_name, action_version, config)
            
            if action_yml is None:
                return 'unknown'
            
            # Determine action type based on the 'runs.using' field
            action_type = action_yml.type.lower() if action_yml.type else 'unknown'
            
            if action_type.startswith('node'):
                return 'javascript'
            elif action_type == 'docker':
                return 'docker'
            elif action_type == 'composite':
                return 'composite'
            else:
                return action_type
                
        except Exception as e:
            logger.warning(f"Could not verify action type for {action_name}: {e}")
            # Fallback: try to determine type from directory structure
            return self.fallback_action_type_detection(action_name)

    def fallback_action_type_detection(self, action_name: str) -> str:
        """Fallback method to detect action type from directory structure"""
        try:
            repo_name = action_name.replace('/', '#')
            action_dir = os.path.join('/app/sharedDirectory/actions', repo_name)
            
            if not os.path.exists(action_dir):
                return 'unknown'
            
            # Check for action.yml or action.yaml
            action_yml_path = None
            for filename in ['action.yml', 'action.yaml']:
                potential_path = os.path.join(action_dir, filename)
                if os.path.exists(potential_path):
                    action_yml_path = potential_path
                    break
            
            if not action_yml_path:
                return 'unknown'
            
            # Parse the action.yml manually to get the type
            with open(action_yml_path, 'r') as f:
                action_content = yaml.safe_load(f)
            
            runs = action_content.get('runs', {})
            using = runs.get('using', '').lower()

            # The composite detection here is a little wonky. Could be improved 
            if using.startswith('node'):
                return 'javascript'
            elif using == 'docker':
                return 'docker'
            elif using == 'composite':
                return 'composite'
            else:
                return using if using else 'unknown'
                
        except Exception as e:
            logger.warning(f"Fallback action type detection failed for {action_name}: {e}")
            return 'unknown'

    def update_ir_with_action_verification(self, ir_data: Dict, verification_results: Dict[str, Dict[str, Any]]):
        """Update the IR with verified action type information"""
        try:
            # Navigate through the IR structure to find and update action information
            if "taskgroups" in ir_data:
                for jobName, job in ir_data['taskgroups'].items():
                    if 'tasks' in job:
                        for task_id, task_data in job['tasks'].items():
                            logger.info(f"Checking if task '{task_id}' is verified")
                            if 'exec' in task_data and 'command' in task_data['exec']:
                                logger.info(f"Task '{task_id}' has exec and command")
                                command = task_data['exec'].get('command', '')
                                
                                # Try to match with verified actions
                                for action_key, verification in verification_results.items():
                                    action_name = verification.get('action_name', '')
                                    logger.info(f"Checking if action '{action_name}' is in command '{command}'")
                                    if action_name in command:
                                        logger.info(f"Found action '{action_name}' in command '{command}'")
                                        verified_type = verification.get('verified_type')
                                        if verified_type:
                                            logger.info(f"Found action type '{verified_type}' for action '{action_name}'")
                                            # Update the action type based on verification
                                            if verified_type == 'javascript':
                                                task_data['exec']['type'] = 'gh_js_action'
                                                task_data['exec']['verified_type'] = 'javascript'
                                            elif verified_type == 'docker':
                                                task_data['exec']['type'] = 'docker-action'
                                                task_data['exec']['verified_type'] = 'docker'
                                            elif verified_type == 'composite':
                                                task_data['exec']['type'] = 'composite-action'
                                                task_data['exec']['verified_type'] = 'composite'
                                            
                                            # Add verification metadata
                                            task_data['exec']['verification_status'] = 'verified'
                                            task_data['exec']['downloaded'] = verification.get('downloaded', False)
                                            break
            
            # Add verification summary to metadata
            if 'metadata' not in ir_data:
                ir_data['metadata'] = {}
            
            ir_data['metadata']['action_verification'] = {
                'total_verified': len(verification_results),
                'successfully_downloaded': sum(1 for v in verification_results.values() if v.get('downloaded', False)),
                'javascript_actions': sum(1 for v in verification_results.values() if v.get('verified_type') == 'javascript'),
                'docker_actions': sum(1 for v in verification_results.values() if v.get('verified_type') == 'docker'),
                'composite_actions': sum(1 for v in verification_results.values() if v.get('verified_type') == 'composite'),
                'verification_details': verification_results
            }
            
        except Exception as e:
            logger.error(f"Error updating IR with action verification: {e}")
    
    def scan_workflows_directory(self):
        """Scan the workflows directory for all YAML files and process them"""
        if not os.path.exists(self.workflows_dir):
            logger.warning(f"Workflows directory does not exist: {self.workflows_dir}")
            return
        
        logger.info(f"Scanning workflows directory: {self.workflows_dir}")
        
        processed_count = 0
        error_count = 0
        
        for root, dirs, files in os.walk(self.workflows_dir):
            for file in files:
                file_path = os.path.join(root, file)
                
                if self.is_workflow_file(file_path):
                    if self.process_workflow_file(file_path):
                        processed_count += 1
                    else:
                        error_count += 1
        
        logger.info(f"Completed initial scan. Processed: {processed_count}, Errors: {error_count}")

    def get_collection_info(self) -> Dict:
        """Get information about the current collection"""
        try:
            collection_count = self.collection.count_documents({})
            all_collections = self.db.list_collection_names()
            workflow_collections = [col for col in all_collections if col.startswith('workflow_irs_')]
            
            return {
                'current_collection': self.current_collection_name,
                'document_count': collection_count,
                'all_workflow_collections': workflow_collections,
                'total_collections': len(workflow_collections)
            }
        except Exception as e:
            logger.error(f"Error getting collection info: {e}")
            return {
                'current_collection': self.current_collection_name,
                'error': str(e)
            }


class WorkflowFileHandler(FileSystemEventHandler):
    """Handler for file system events to process new/modified workflow files"""
    
    def __init__(self, processor: WorkflowProcessor):
        self.processor = processor
        self._processing_files = set()  # Track files currently being processed
        self._lock = threading.Lock()   # Thread lock for race condition protection
    
    def on_modified(self, event):
        if not event.is_directory and self.processor.is_workflow_file(event.src_path):
            logger.info(f"Detected modification: {event.src_path}")
            with self._lock:
                self._processing_files.add(event.src_path)
            try:
                self.processor.process_workflow_file(event.src_path)
            finally:
                with self._lock:
                    self._processing_files.discard(event.src_path)
    
    def on_created(self, event):
        if not event.is_directory:
            # Check if this is a reset file
            if os.path.basename(event.src_path) == "reset":
                logger.info(f"Detected reset file: {event.src_path}")
                self._handle_reset_file(event.src_path)
                return
            
            # Handle normal workflow files
            if self.processor.is_workflow_file(event.src_path):
                logger.info(f"Detected new file: {event.src_path}")
                with self._lock:
                    self._processing_files.add(event.src_path)
                try:
                    self.processor.process_workflow_file(event.src_path)
                finally:
                    with self._lock:
                        self._processing_files.discard(event.src_path)
    
    def _handle_reset_file(self, reset_file_path: str):
        """Handle reset file creation - triggers collection setup after ensuring no race conditions"""
        # Wait for any currently processing files to complete
        max_wait_time = 600  # Maximum wait time in seconds
        wait_interval = 5  # Wait interval in seconds
        total_waited = 0
        
        while total_waited < max_wait_time:
            with self._lock:
                if not self._processing_files:
                    break
                processing_count = len(self._processing_files)

            if processing_count > 0: 
                logger.info(f"Waiting for {processing_count} files to finish processing before reset...")
                time.sleep(wait_interval)
                total_waited += wait_interval
            else:
                break
        
        with self._lock:
            if self._processing_files:
                logger.warning(f"Reset triggered but {len(self._processing_files)} files still processing. Proceeding anyway.")
            else:
                logger.info("All files finished processing. Safe to reset collection.")

        # Write the old collection name to a file for the run tool
        old_collection_file = os.path.join(self.processor.configs_dir, 'old_collection.txt')
        try:
            with open(old_collection_file, 'w') as f:
                f.write(self.processor.current_collection_name or 'none')
            logger.info(f"Wrote old collection name to {old_collection_file}")
        except Exception as e:
            logger.warning(f"Could not write old collection name to {old_collection_file}: {e}")

        # Trigger collection setup
        try:
            logger.info("Triggering collection setup due to reset file")
            self.processor.setup_collection()
            logger.info("Collection setup completed successfully")
        except Exception as e:
            logger.error(f"Error during collection setup after reset: {e}")
        
        # Clean up the reset file
        try:
            os.remove(reset_file_path)
            logger.info(f"Removed reset file: {reset_file_path}")
        except Exception as e:
            logger.warning(f"Could not remove reset file {reset_file_path}: {e}")


def main():
    """Main function to run the workflow processor service"""
    logger.info("Starting Workflow Processor Service")
    
    try:
        # Initialize processor
        processor = WorkflowProcessor()
        
        # Perform initial scan
        processor.scan_workflows_directory()
        
        # Log collection information
        collection_info = processor.get_collection_info()
        logger.info(f"Collection info: {json.dumps(collection_info, indent=2)}")
        
        # Set up file watcher
        event_handler = WorkflowFileHandler(processor)
        observer = Observer()
        observer.schedule(event_handler, processor.workflows_dir, recursive=True)
        observer.start()
        
        logger.info("File watcher started. Monitoring for changes...")
        
        try:
            while True:
                time.sleep(10)
                # Periodic health check without admin privileges
                if processor.client:
                    try:
                        # Simple connection test
                        processor.db.list_collection_names()
                    except Exception as e:
                        logger.error(f"MongoDB connection lost: {e}")
                        processor.connect_to_mongodb()
                        processor.setup_collection()
                        
        except KeyboardInterrupt:
            logger.info("Received interrupt signal, shutting down...")
        finally:
            observer.stop()
            observer.join()
            if processor.client:
                processor.client.close()
            logger.info("Workflow Processor Service stopped")
            
    except Exception as e:
        logger.error(f"Fatal error in main: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
