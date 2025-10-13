## Purpose:
* This will house all of the config files shared across dockerfiles (such as current mongo collection, etc)

## Files:

### `current_collection.txt`
Automatically generated file that contains the current MongoDB collection name being used by the WorkflowFrontend service.

- **Format**: `workflow_irs_<hash>`
- **Hash**: 8-character SHA256 hash of all workflow files and their modification times
- **Purpose**: Allows the system to create new collections when workflows change and maintain consistency across service restarts
- **Updated**: Automatically when workflow files change or service starts

### `current_collection.txt.example`
Example/documentation file showing the format and purpose of the collection configuration file.

## Collection Versioning Strategy:

The system creates a new MongoDB collection whenever:
1. Workflow files are added, removed, or modified
2. The service detects changes in file modification times
3. The service starts for the first time

This approach ensures:
- **Data Integrity**: Previous analysis results are preserved
- **Change Tracking**: Easy to identify when workflows were modified
- **Rollback Capability**: Can access previous analysis results
- **Consistency**: All services use the same collection for a given workflow state