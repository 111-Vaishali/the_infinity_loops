import time
import json
import os

from config import MAX_RETRIES
from agents.test_agent import run_tests, detect_project_type, install_dependencies
from agents.fix_agent import apply_fix
from agents.score_agent import calculate_score
from services.git_service import clone_repo, create_branch
from services.git_service import push_branch, commit_changes
from utils.branch_formatter import format_branch


def run_pipeline(data):

    start_time = time.time()

    # ---------------------------
    # 1. Clone & Setup
    # ---------------------------
    repo, repo_name = clone_repo(data.repoUrl)

    branch_name = format_branch(data.teamName, data.leaderName)
    create_branch(repo, branch_name)

    project_type = detect_project_type(repo_name)
    if not project_type:
        return {"error": "Unsupported project type"}

    dep_status, dep_msg = install_dependencies(repo_name, project_type)
    if not dep_status:
        return {"error": f"Dependency installation failed: {dep_msg}"}

    # ---------------------------
    # 2. Retry Fix Loop
    # ---------------------------
    retry_count = 0
    fix_history = []
    repeated_fix = False
    passed = False
    last_logs = ""

    while retry_count < MAX_RETRIES:

        status_code, logs = run_tests(repo_name, project_type)
        last_logs = logs

        # ✅ Tests Passed
        if status_code == 0:
            passed = True
            break

        # ⏱ Timeout Protection
        if status_code == -1:
            print("Execution timed out. Stopping retries.")
            break

        # 🔧 Apply Fix
        success, fix_signature = apply_fix(repo_name, logs, project_type)

        if not success:
            break

        # Commit after successful fix
        commit_changes(repo, "AI Auto Fix Applied")

        # Prevent infinite same-fix loop
        if fix_signature in fix_history:
            repeated_fix = True
            break
        else:
            fix_history.append(fix_signature)

        retry_count += 1

    # ---------------------------
    # 3. Push If Successful
    # ---------------------------
    push_status = False
    push_msg = None

    if passed:
        push_status, push_msg = push_branch(repo, branch_name)

    # ---------------------------
    # 4. Scoring & Metrics
    # ---------------------------
    end_time = time.time()
    total_time = round(end_time - start_time, 2)

    score = calculate_score(
        attempts=retry_count + 1,
        time_taken=total_time,
        repeated_fix=repeated_fix,
        passed=passed
    )

    # ---------------------------
    # 5. Final Results
    # ---------------------------
    results_data = {
        "repo_name": repo_name,
        "branch": branch_name,
        "attempts": retry_count + 1,
        "tests_passed": passed,
        "score": score,
        "time_taken_seconds": total_time,
        "fix_history": fix_history,
        "push_status": push_status,
        "push_message": push_msg,
        "logs_preview": last_logs[:500]
    }

    os.makedirs("results", exist_ok=True)

    with open("results/results.json", "w") as f:
        json.dump(results_data, f, indent=4)

    return results_data
 