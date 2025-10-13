#!/usr/bin/env python3
"""
Module for updating GitHub workflow YAML files with permissions from analyzed JSON.

Primary usage as a module:
    from permission_updater import process_json_data
    success = process_json_data(workflow_json_data)

Secondary usage from command line:
    cat workflow.json | python3 permission_updater.py -
    python3 permission_updater.py workflow.json
"""

import json
import yaml
import os
import sys
from pathlib import Path
from typing import Dict, Any, Optional
from collections import OrderedDict

classifiedPermissions = {
    "actions",
    "contents",
    "deployments", 
    "id-token", 
    "packages",
    "pages",
    "checks",
    "discussions",
    "issues",
    "pull_requests",
    "repository_projects",
    "security_events",
    "statuses"
}

# Module exports
__all__ = ['process_json_data', 'process_workflow']


def filter_permissions(perms: Dict[str, str], context: str) -> Dict[str, str]:
    """
    Filter permissions to only include those in classifiedPermissions.

    Args:
        perms: Dictionary of permissions to filter
        context: Context for logging (e.g., "Global" or "Job 'build'")

    Returns:
        Filtered dictionary containing only valid permissions
    """
    if not perms:
        return {}

    filtered = {}
    skipped = []

    for perm_name, perm_value in perms.items():
        if perm_name in classifiedPermissions:
            filtered[perm_name] = perm_value
        else:
            skipped.append(f"{perm_name}:{perm_value}")

    if skipped:
        print(f"  ⚠️  Skipping unclassified permissions in {context}: {', '.join(skipped)}")

    return filtered


def yaml_ordered_load(stream):
    """Load YAML preserving order using OrderedDict."""
    class OrderedLoader(yaml.SafeLoader):
        pass

    def construct_mapping(loader, node):
        loader.flatten_mapping(node)
        pairs = loader.construct_pairs(node)
        # Ensure keys remain as strings, not converted to booleans
        fixed_pairs = []
        for key, value in pairs:
            # Force problematic keys to remain strings
            if isinstance(key, bool):
                key = 'on' if key else 'off'
            fixed_pairs.append((key, value))
        return OrderedDict(fixed_pairs)

    OrderedLoader.add_constructor(
        yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG,
        construct_mapping)

    return yaml.load(stream, OrderedLoader)


def yaml_ordered_dump(data, stream=None, **kwargs):
    """Dump YAML preserving order and handling special keys."""
    class OrderedDumper(yaml.SafeDumper):
        pass

    def _dict_representer(dumper, data):
        return dumper.represent_mapping(
            yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG,
            data.items())

    # Custom representer for strings to avoid boolean interpretation
    def str_representer(dumper, data):
        if data in ('on', 'off', 'yes', 'no', 'true', 'false'):
            return dumper.represent_scalar('tag:yaml.org,2002:str', data, style="'")
        return dumper.represent_scalar('tag:yaml.org,2002:str', data)

    OrderedDumper.add_representer(OrderedDict, _dict_representer)
    OrderedDumper.add_representer(str, str_representer)
    OrderedDumper.add_representer(type(None), lambda dumper, value: dumper.represent_scalar('tag:yaml.org,2002:null', ''))

    # Set default flow style to False for better formatting
    kwargs['default_flow_style'] = kwargs.get('default_flow_style', False)
    kwargs['sort_keys'] = False
    kwargs['allow_unicode'] = True

    return yaml.dump(data, stream, OrderedDumper, **kwargs)


def load_json_output(json_path: Path) -> Dict[str, Any]:
    """Load and parse JSON output file."""
    try:
        with open(json_path, 'r') as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError) as e:
        print(f"Error loading {json_path}: {e}")
        return None


def insert_permissions_at_position(workflow_data: OrderedDict,
                                  permissions: Dict[str, str],
                                  after_key: str,
                                  permission_key: str = 'permissions') -> OrderedDict:
    """Insert permissions after a specific key in the ordered dict."""
    if not permissions:
        return workflow_data

    new_workflow = OrderedDict()

    for key, value in workflow_data.items():
        new_workflow[key] = value

        # Insert permissions after the specified key
        if key == after_key and permission_key not in workflow_data:
            new_workflow[permission_key] = permissions

    # If the permission key already exists, update it
    if permission_key in workflow_data:
        new_workflow[permission_key] = permissions

    return new_workflow


def update_workflow_permissions(yaml_data: OrderedDict,
                              global_perms: Optional[Dict[str, str]],
                              job_perms: Dict[str, Dict[str, str]]) -> OrderedDict:
    """
    Update workflow with global and job-level permissions.

    Args:
        yaml_data: The workflow YAML data as OrderedDict
        global_perms: Global permissions to set at workflow level
        job_perms: Dictionary mapping job names to their permissions

    Returns:
        Updated workflow data with permissions
    """
    # Insert global permissions after 'on' section
    if global_perms:
        yaml_data = insert_permissions_at_position(yaml_data, global_perms, 'on', 'permissions')

    # Update job-level permissions
    if 'jobs' in yaml_data and job_perms:
        jobs = yaml_data['jobs']

        for job_name, permissions in job_perms.items():
            if job_name in jobs and permissions:
                job_data = jobs[job_name]

                # Find the position to insert permissions (after 'runs-on' if it exists)
                if isinstance(job_data, dict):
                    new_job = OrderedDict()

                    for key, value in job_data.items():
                        new_job[key] = value

                        # Insert permissions after 'runs-on'
                        if key == 'runs-on' and 'permissions' not in job_data:
                            new_job['permissions'] = permissions

                    # If permissions already exist, update them
                    if 'permissions' in job_data:
                        new_job['permissions'] = permissions

                    jobs[job_name] = new_job

    return yaml_data


def get_source_yaml_path(metadata: Dict[str, Any]) -> Optional[Path]:
    """Extract and resolve the source YAML path from metadata."""
    if 'file_path' not in metadata:
        return None

    file_path = metadata['file_path']
    if file_path.startswith("/app/"):
        file_path = file_path.replace("/app/", "")
    base_dir = Path('./')

    # Try the path as-is first
    full_path = base_dir / file_path
    if full_path.exists():
        return full_path

    # Try without leading slash
    if file_path.startswith('/'):
        full_path = base_dir / file_path[1:]
        if full_path.exists():
            return full_path

    # Try just the filename in common directories
    filename = Path(file_path).name
    for search_dir in ['temp', '.github/workflows', 'workflowInputs']:
        test_path = base_dir / search_dir / filename
        if test_path.exists():
            return test_path

    return None


def process_json_data(json_data: Dict[str, Any], output_dir: Path = None) -> bool:
    """
    Process JSON data directly (instead of reading from file).

    Args:
        json_data: The JSON data dictionary
        output_dir: Directory to write updated YAML files (default: updatedWorkflows)

    Returns:
        True if successful, False otherwise
    """
    # Default output directory
    if output_dir is None:
        output_dir = Path('./')

    # Ensure output directory exists
    output_dir.mkdir(exist_ok=True)

    # Get workflow name for logging
    wf_name = json_data.get('wf_name', 'Unknown')
    print(f"Processing workflow: {wf_name}...")

    # Extract and filter permissions
    raw_global_perms = json_data.get('GlobalPermissionsToSet', {})
    global_perms = filter_permissions(raw_global_perms, "Global")

    # Extract and filter job-level permissions from taskgroups
    job_perms = {}
    if 'taskgroups' in json_data:
        for job_name, job_data in json_data['taskgroups'].items():
            if 'PermissionsToSet' in job_data:
                raw_perms = job_data['PermissionsToSet']
                filtered_perms = filter_permissions(raw_perms, f"Job '{job_name}'")
                if filtered_perms:  # Only add if there are valid permissions
                    job_perms[job_name] = filtered_perms

    # Skip if no permissions to set
    if not global_perms and not job_perms:
        print(f"  No permissions found in workflow")
        return True

    # Find source YAML file
    source_yaml = get_source_yaml_path(json_data.get('metadata', {}))
    if not source_yaml:
        print(f"  ERROR: Could not find source YAML for workflow")
        print(f"  Metadata file_path: {json_data.get('metadata', {}).get('file_path', 'N/A')}")
        return False

    print(f"  Source YAML: {source_yaml}")

    # Load YAML file
    try:
        with open(source_yaml, 'r') as f:
            yaml_data = yaml_ordered_load(f)
    except Exception as e:
        print(f"  ERROR loading YAML {source_yaml}: {e}")
        return False

    # Update permissions
    updated_yaml = update_workflow_permissions(yaml_data, global_perms, job_perms)

    # Determine output filename
    output_file = output_dir / source_yaml.name

    # Write updated YAML
    try:
        with open(output_file, 'w') as f:
            yaml_ordered_dump(updated_yaml, f)
        print(f"  ✓ Written to {output_file}")

        # Print what permissions were added
        if global_perms:
            print(f"    Global permissions: {', '.join(f'{k}:{v}' for k, v in global_perms.items())}")
        if job_perms:
            for job_name, perms in job_perms.items():
                print(f"    Job '{job_name}' permissions: {', '.join(f'{k}:{v}' for k, v in perms.items())}")

        return True
    except Exception as e:
        print(f"  ERROR writing {output_file}: {e}")
        return False


def process_workflow(json_file: Path, output_dir: Path) -> bool:
    """
    Process a single workflow from JSON file (backward compatible).

    Args:
        json_file: Path to the JSON output file
        output_dir: Directory to write updated YAML files

    Returns:
        True if successful, False otherwise
    """
    print(f"Processing {json_file.name}...")

    # Load JSON output
    json_data = load_json_output(json_file)
    if not json_data:
        return False

    # Delegate to new function
    return process_json_data(json_data, output_dir)


def main():
    """Process a single workflow from stdin or file argument."""
    output_dir = Path('./')
    output_dir.mkdir(exist_ok=True)

    # Check for stdin input
    if len(sys.argv) > 1 and sys.argv[1] == '-':
        try:
            json_data = json.load(sys.stdin)
            success = process_json_data(json_data, output_dir)
            return 0 if success else 1
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON from stdin: {e}")
            return 1

    # Show usage if no arguments
    if len(sys.argv) < 2:
        print("Usage:")
        print("  As module: from permission_updater import process_json_data")
        print("  From stdin: cat workflow.json | python3 permission_updater.py -")
        print("  From file: python3 permission_updater.py workflow.json")
        return 1

    # Process single file (for debugging/testing)
    json_file = Path(sys.argv[1])
    if not json_file.exists():
        print(f"Error: File {json_file} not found")
        return 1

    success = process_workflow(json_file, output_dir)
    return 0 if success else 1


if __name__ == '__main__':
    sys.exit(main())