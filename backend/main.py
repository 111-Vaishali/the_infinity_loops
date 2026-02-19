from fastapi import FastAPI
from pydantic import BaseModel
from agents.orchestrator import run_pipeline

app = FastAPI()

class AgentRequest(BaseModel):
    repoUrl: str
    teamName: str
    leaderName: str

@app.get("/")
def home():
    return {"message": "Autonomous CI/CD Agent Running"}

@app.post("/run-agent")
def run_agent(data: AgentRequest):
    return run_pipeline(data)
