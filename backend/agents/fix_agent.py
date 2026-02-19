import os
import re
from agents.llm_fix_agent import llm_fix_code


def parse_test_output(logs, project_type):
    failure_info = {"error_type": None, "file": None, "line": None}
    lines = logs.split("\n")

    for line in lines:
        if "NameError" in line:
            return {"file": extract_file(line), "error_type": "NameError"}
        if "TypeError" in line:
            return {"file": extract_file(line), "error_type": "TypeError"}
        if "ReferenceError" in line:
            return {"file": extract_file(line), "error_type": "ReferenceError"}

    if project_type == "python":
        match = re.search(r'(.+\.py):(\d+):', logs)
        if match:
            failure_info["file"] = match.group(1)
            failure_info["line"] = match.group(2)

    return failure_info if failure_info["file"] else None


def extract_file(log_line):
    parts = log_line.split(":")
    return parts[0] if parts else None


def read_file(repo_path, file_path):
    full_path = os.path.join(repo_path, file_path)
    if not os.path.exists(full_path):
        return None
    with open(full_path, "r", encoding="utf-8") as f:
        return f.read()


def write_file(repo_path, file_path, new_content):
    full_path = os.path.join(repo_path, file_path)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(new_content)


def apply_fix(repo_name, logs, project_type):
    failure = parse_test_output(logs, project_type)
    if not failure or not failure["file"]:
        return False, None

    file_path = failure["file"]
    file_content = read_file(repo_name, file_path)
    if not file_content:
        return False, None

    new_content = llm_fix_code(file_content, logs)
    if not new_content:
        return False, None

    write_file(repo_name, file_path, new_content)
    return True, f"{file_path}_llm_fix"
