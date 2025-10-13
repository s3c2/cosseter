import git
import logging

from wfanalyze.common.pylogger  import get_logger

logger = get_logger("git_utils", logging.DEBUG)

def get_current_HEAD(repo : git.repo):
    try:
        return repo.active_branch.name
    except TypeError:
        return repo.head.commit.hexsha

# Open the given repository and check if the given branch is used, if not switch to it.
def git_switch_to_branch(repo_path, branch_name):
    try:
        repo = git.Repo(repo_path)
    except Exception as e:
        logger.error("Error creating repo object %s: %s" % (repo_path, e))
        return False
    
    logger.info(f"Repo : {repo_path} | Branch : {branch_name} | Current branch : {get_current_HEAD(repo)}")

    try: 
        # git stash
        repo.git.stash()
    except Exception as e:
        logger.error("Error stashing changes %s: %s" % (repo_path, e))

    try:
        if get_current_HEAD(repo) != branch_name:
            repo.git.checkout(branch_name)
    except Exception as e:
        logger.error("Error switching to branch %s: %s" % (branch_name, e))
        return False
    return True

# Open the given repository and check if the given tag exists, if not switch to it.
def git_switch_to_tag(repo_path, tag_name):
    try:
        repo = git.Repo(repo_path)
    except Exception as e:
        logger.error("Error creating repo object %s: %s" % (repo_path, e))
        return False

    logger.info(f"Repo : {repo_path} | Tag : {tag_name} | Current branch : {get_current_HEAD(repo)}")
    try: 
        # git stash
        repo.git.stash()
    except Exception as e:
        logger.error("Error stashing changes %s: %s" % (repo_path, e))
    
    try: 
        repo.git.checkout(tag_name)
    except Exception as e:
        logger.error("Error switching to tag %s: %s" % (tag_name, e))
        return False
    return True

# Open the given repository and check if the given commit exists, if not switch to it.
def git_switch_to_commit(repo_path, commit_hash):
    try:
        repo = git.Repo(repo_path)
    except Exception as e:
        logger.error("Error creating repo object %s: %s" % (repo_path, e))
        return False

    logger.info(f"Repo : {repo_path} | Commit : {commit_hash} | Current branch : {get_current_HEAD(repo)}")
    try: 
        # git stash
        repo.git.stash()
    except Exception as e:
        logger.error("Error stashing changes %s: %s" % (repo_path, e))

    try: 
        repo.git.checkout(commit_hash)
    except Exception as e:
        logger.error("Error switching to commit %s: %s" % (commit_hash, e))
        return False
    return True

# Open the given repository and revert the last checkout that was made.
def git_revert_checkout(repo_path):
    try:
        repo = git.Repo(repo_path)
    except Exception as e:
        logger.error("Error creating repo object %s: %s" % (repo_path, e))
        return False

    logger.info(f"Repo : {repo_path} | Current branch : {get_current_HEAD(repo)}")
    try: 
        # git stash
        repo.git.stash()
    except Exception as e:
        logger.error("Error stashing changes %s: %s" % (repo_path, e))

    try: 
        repo.git.checkout("-")
    except Exception as e:
        logger.error("Error reverting checkout: %s" % e)
        return False
    return True
