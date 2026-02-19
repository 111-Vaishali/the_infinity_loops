import os
import git
import shutil

def clone_repo(repo_url):
    repo_name = repo_url.split("/")[-1].replace(".git", "")

    # Clean existing folder safely
    if os.path.exists(repo_name):
        shutil.rmtree(repo_name, ignore_errors=True)

    # Shallow clone (VERY IMPORTANT)
    repo = git.Repo.clone_from(
        repo_url,
        repo_name,
        depth=1  # 👈 Only latest commit
    )

    return repo, repo_name


def create_branch(repo, branch_name):
    branch_names = [branch.name for branch in repo.branches]

    if branch_name in branch_names:
        repo.git.checkout(branch_name)
    else:
        new_branch = repo.create_head(branch_name)
        repo.head.reference = new_branch
        repo.head.reset(index=True, working_tree=True)

def commit_changes(repo, message="Auto-fix commit"):
    repo.git.add(A=True)
    repo.index.commit(message)


def push_branch(repo, branch_name):
    """
    Push the current branch to origin.
    """
    try:
        repo.git.push("origin", branch_name)
        return True, f"Branch {branch_name} pushed successfully."
    except Exception as e:
        return False, str(e)
