import logging
import git

from wfanalyze.common.pylogger import get_logger

logger = get_logger("action_parser", logging.DEBUG)

def clone_repo(repo):
    folder = f"./sharedDirectory/actions/{repo.replace('/', '#')}"
    try:
        git.Repo.clone_from(f"https://github.com/{repo}.git", folder)
    except Exception as e:
        logger.error(f"Could not clone action {repo} - {e}")
        raise e
    return folder