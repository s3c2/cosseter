import csv


# Extract git commands from csv into dictionary, 1st column is the command, 2nd column is the permission
def extract_commands(file_path):
    commands = {}
    with open(file_path, newline='') as csvfile:
        csvreader = csv.reader(csvfile)
        # Skip header
        next(csvreader)
        for row in csvreader:
            commands[row[0].removeprefix("git ")] = row[1]
    return commands


# git_commands = extract_commands('git_valid_commands.csv')

# print(git_commands)


# Extract gh commands from csv into dictionary, 1st column is the command, 2nd column is the permission

def extract_gh_commands(file_path):
    commands = {}
    with open(file_path, newline='') as csvfile:
        csvreader = csv.reader(csvfile)
        # Skip header
        next(csvreader)
        for row in csvreader:
            commands[row[0]] = row[1]
    return commands

# gh_commands = extract_gh_commands('gh_valid_commands.csv')

# print(gh_commands)
