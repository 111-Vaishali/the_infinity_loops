import os
from agents.test_agent import parse_test_output


def parse_test_output(logs, project_type):
    

    lines = logs.split("\n")

    for line in lines:
        if "NameError" in line:
            return {"file": extract_file(line), "error_type": "NameError"}

        if "TypeError" in line:
            return {"file": extract_file(line), "error_type": "TypeError"}

        if "ReferenceError" in line:
            return {"file": extract_file(line), "error_type": "ReferenceError"}

    return None

def extract_file(log_line):
    
    parts = log_line.split(":")
    if len(parts) > 0:
        return parts[0]
    return None



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

from agents.llm_fix_agent import llm_fix_code
from agents.fix_agent import read_file, write_file

def apply_fix(repo_name, logs, project_type):

    # Extract failing file from logs
    failure = parse_test_output(logs, project_type)

if not failure or not failure["file"]:
    return False, None

file_path = failure["file"]
   # use your parser

    if not file_path:
        return False, None

    file_content = read_file(repo_name, file_path)

    if not file_content:
        return False, None

    new_content = llm_fix_code(file_content, logs)

    if not new_content:
        return False, None

    write_file(repo_name, file_path, new_content)

    return True, f"{file_path}_llm_fix"
     


def simple_fix_logic(file_content, error_type):

    if error_type == "NameError":
        # Example: add dummy variable definition
        return "dummy_variable = None\n" + file_content

    if error_type == "TypeError":
        # Example: wrap risky operations
        return file_content.replace(" + ", " + str(")  # simple demo fix

    if error_type == "ReferenceError":
        return "// auto fix placeholder\n" + file_content

    return file_content
