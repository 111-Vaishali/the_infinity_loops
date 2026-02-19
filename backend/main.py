from fastapi import FastAPI
from pydantic import BaseModel
from services.git_service import clone_repo, create_branch,push_branch
from utils.branch_formatter import format_branch
from agents.orchestrator import run_pipeline

from agents.test_agent import (
    detect_project_type,
    install_dependencies,
    run_tests
)


app = FastAPI()

class AgentRequest(BaseModel):
    repoUrl: str
    teamName: str
    leaderName: str

@app.get("/")
def home():
    return {"message": "Autonomous CI/CD Agent Running"}

# @app.post("/run-agent")
# def run_agent(data: AgentRequest):
#     try:
#         repo, repo_name = clone_repo(data.repoUrl)

#         branch_name = format_branch(data.teamName, data.leaderName)
#         create_branch(repo, branch_name)

#         project_type = detect_project_type(repo_name)

#         if not project_type:
#             return {"error": "Unsupported project type"}

#         dep_status, dep_msg = install_dependencies(repo_name, project_type)

#         if not dep_status:
#             return {"error": f"Dependency installation failed: {dep_msg}"}

#         status_code, logs = run_tests(repo_name, project_type)

#         failure_details = None
#         fix_applied = False

#         if status_code != 0:
#             from agents.test_agent import parse_test_output
#             from agents.fix_agent import read_file, write_file, simple_fix_logic
#             from services.git_service import commit_changes

#             failure_details = parse_test_output(logs, project_type)

#             if failure_details and failure_details["file"]:
#                 file_content = read_file(repo_name, failure_details["file"])

#                 if file_content:
#                     new_content = simple_fix_logic(
#                         file_content,
#                         failure_details["error_type"]
#                     )

#                     write_file(repo_name, failure_details["file"], new_content)
#                     commit_changes(repo, "AI Auto Fix Applied")
#                     fix_applied = True

#                     push_status = False
#                     push_msg = None

#                     if fix_applied:
#                         push_status, push_msg = push_branch(repo, branch_name)



#                 return {
#                     "repo_name": repo_name,
#                     "project_type": project_type,
#                     "branch_created": branch_name,
#                     "tests_passed": status_code == 0,
#                     "failure_details": failure_details,
#                     "fix_applied": fix_applied,
#                     "push_status": push_status,
#                     "push_msg": push_msg,
#                     "logs_preview": logs[:500]
#                 }

#     except Exception as e:
#         return {"CRASH_ERROR": str(e)}


# @app.post("/run-agent")
# def run_agent(data: AgentRequest):

#     repo, repo_name = clone_repo(data.repoUrl)

#     branch_name = format_branch(data.teamName, data.leaderName)
#     create_branch(repo, branch_name)

#     project_type = detect_project_type(repo_name)

#     if not project_type:
#         return {"error": "Unsupported project type"}

#     dep_status, dep_msg = install_dependencies(repo_name, project_type)

#     if not dep_status:
#         return {"error": f"Dependency installation failed: {dep_msg}"}

#     status_code, logs = run_tests(repo_name, project_type)
#     failure_details = None
#     fix_applied = False
#     push_status = False
#     push_msg = None
#     return {
#         "repo_name": repo_name,
#         "project_type": project_type,
#         "branch_created": branch_name,
#         "tests_passed": status_code == 0,
#         "failure_details": failure_details,
#         "fix_applied": fix_applied,
#         "push_status": push_status,
#         "push_msg": push_msg,
#         "logs_preview": logs[:500]
#     }
@app.post("/run-agent")
def run_agent(data: AgentRequest):
    return run_pipeline(data)
