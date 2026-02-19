from langgraph.graph import StateGraph
from config import MAX_RETRIES

from agents.test_agent import (
    detect_project_type,
    install_dependencies,
    run_tests
)

from agents.fix_agent import apply_fix
from services.git_service import (
    clone_repo,
    create_branch,
    commit_changes,
    push_branch
)

from utils.branch_formatter import format_branch


# -------------------------
# State Definition
# -------------------------
class AgentState(dict):
    pass


# -------------------------
# Nodes
# -------------------------

def setup_node(state):
    repo, repo_name = clone_repo(state["repo_url"])

    branch_name = format_branch(state["team"], state["leader"])
    create_branch(repo, branch_name)

    state["repo"] = repo
    state["repo_name"] = repo_name
    state["branch"] = branch_name
    state["retry_count"] = 0
    state["fix_history"] = []

    return state


def detect_node(state):
    project_type = detect_project_type(state["repo_name"])
    state["project_type"] = project_type
    return state


def dependency_node(state):
    install_dependencies(state["repo_name"], state["project_type"])
    return state


def test_node(state):
    status_code, logs = run_tests(
        state["repo_name"],
        state["project_type"]
    )

    state["status_code"] = status_code
    state["logs"] = logs
    return state


def fix_node(state):
    success, signature = apply_fix(
        state["repo_name"],
        state["logs"],
        state["project_type"]
    )

    if not success:
        state["fix_success"] = False
        return state

    commit_changes(state["repo"], "AI Auto Fix Applied")

    # Prevent repeated same fix
    if signature in state["fix_history"]:
        state["fix_success"] = False
        return state

    state["fix_history"].append(signature)
    state["retry_count"] += 1
    state["fix_success"] = True

    return state


def push_node(state):
    push_status, push_msg = push_branch(
        state["repo"],
        state["branch"]
    )

    state["push_status"] = push_status
    state["push_message"] = push_msg
    return state


# -------------------------
# Conditional Routing
# -------------------------

def test_router(state):

    # If passed
    if state["status_code"] == 0:
        return "push"

    # Timeout or too many retries
    if state["status_code"] == -1:
        return "end"

    if state["retry_count"] >= MAX_RETRIES:
        return "end"

    return "fix"


def fix_router(state):

    if not state.get("fix_success"):
        return "end"

    return "test"


# -------------------------
# Graph Definition
# -------------------------

graph = StateGraph(AgentState)

graph.add_node("setup", setup_node)
graph.add_node("detect", detect_node)
graph.add_node("dependency", dependency_node)
graph.add_node("test", test_node)
graph.add_node("fix", fix_node)
graph.add_node("push", push_node)

graph.set_entry_point("setup")

graph.add_edge("setup", "detect")
graph.add_edge("detect", "dependency")
graph.add_edge("dependency", "test")

graph.add_conditional_edges(
    "test",
    test_router,
    {
        "fix": "fix",
        "push": "push",
        "end": "__end__"
    }
)

graph.add_conditional_edges(
    "fix",
    fix_router,
    {
        "test": "test",
        "end": "__end__"
    }
)

graph.add_edge("push", "__end__")

app_graph = graph.compile()
