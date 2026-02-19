import os
import subprocess
import re

def parse_test_output(logs, project_type):
    failure_info = {
        "error_type": None,
        "file": None,
        "line": None
    }

    if project_type == "python":
        match = re.search(r'(.+\.py):(\d+):', logs)
        if match:
            failure_info["file"] = match.group(1)
            failure_info["line"] = match.group(2)

        if "AssertionError" in logs:
            failure_info["error_type"] = "AssertionError"
        elif "TypeError" in logs:
            failure_info["error_type"] = "TypeError"
        elif "NameError" in logs:
            failure_info["error_type"] = "NameError"

    if project_type == "node":
        match = re.search(r'(.+\.js):(\d+):', logs)
        if match:
            failure_info["file"] = match.group(1)
            failure_info["line"] = match.group(2)

        if "ReferenceError" in logs:
            failure_info["error_type"] = "ReferenceError"
        elif "TypeError" in logs:
            failure_info["error_type"] = "TypeError"

    return failure_info


import os


def detect_project_type(repo_path):
    files = os.listdir(repo_path)

    if "requirements.txt" in files or "setup.py" in files or "pyproject.toml" in files:
        return "python"

    if "package.json" in files:
        return "node"

    return None


    


def install_dependencies(repo_path, project_type):
    try:
        if project_type == "python":
            req_file = os.path.join(repo_path, "requirements.txt")
            if os.path.exists(req_file):
                subprocess.run(
                    ["pip", "install", "-r", "requirements.txt"],
                    cwd=repo_path,
                    check=True
                )

        elif project_type == "node":
            subprocess.run(
                ["npm", "install"],
                cwd=repo_path,
                check=True
            )

        return True, "Dependencies installed successfully"

    except Exception as e:
        return False, str(e)


def run_tests(repo_name, project_type):

    try:
        abs_path = os.path.abspath(repo_name)

        if project_type == "python":
            test_command = "pytest --maxfail=1 --disable-warnings -q"
        elif project_type == "node":
            test_command = "npm test"
        else:
            return -1, "Unsupported project type"

        command = [
            "docker", "run", "--rm",
            "-v", f"{os.path.abspath(repo_name)}:/app",
            "-w", "/app",
            "cicd-sandbox",
            "bash", "-c",
        ]

        if project_type == "python":
            test_command = "pytest --maxfail=1 --disable-warnings -q"
        elif project_type == "node":
            test_command = "npm test"
        else:
            return -1, "Unsupported project type"

        result = subprocess.run(
            command + [test_command],
            capture_output=True,
            text=True
        )

        return result.returncode, result.stdout + result.stderr

    except Exception as e:
        return -1, str(e)
