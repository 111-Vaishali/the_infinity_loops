🚀 Autonomous CI/CD Healing Agent
AI-Powered Self-Healing DevOps Pipeline

 🌟 What Is This Project?
Autonomous CI/CD Healing Agent is an intelligent DevOps system that automatically detects CI failures, understands what went wrong, fixes the issue using AI, and pushes a verified solution — without human intervention.

It works like a self-healing engineer for your codebase.


🧠 The Core Idea
Instead of developers manually:

Checking failing CI logs
Debugging the issue
Fixing the bug
Re-running tests
Committing again
Our system does it automatically.

#How It Works — Flowchart

```
┌──────────────────────────────┐
│ 1️⃣ User Enters GitHub Repo   │
│    (React Dashboard)         │
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────┐
│ 2️⃣ Backend Clones Repository │
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────┐
│ 3️⃣ Run Tests Automatically   │
│    Python → pytest           │
│    Node   → npm test         │
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────┐
│ 4️⃣ Tests Passing?            │
└───────┬─────────────┬────────┘
        │ YES         │ NO
        ▼             ▼
 ┌──────────────┐   ┌──────────────────────────────┐
 │ ✅ Success    │   │ 5️⃣ Analyze Error Logs        │
 │ Show Result  │   │    File, Line, Error Type    │
 └──────────────┘   └───────────────┬──────────────┘
                                     │
                                     ▼
                        ┌──────────────────────────────┐
                        │ 6️⃣ AI Generates Fix          │
                        │    Creates Minimal Patch     │
                        └───────────────┬──────────────┘
                                     │
                                     ▼
                        ┌──────────────────────────────┐
                        │ 7️⃣ Commit to New Branch      │
                        │    (ai-fix-1)                │
                        └───────────────┬──────────────┘
                                     │
                                     ▼
                        ┌──────────────────────────────┐
                        │ 8️⃣ Push Branch to GitHub     │
                        └───────────────┬──────────────┘
                                     │
                                     ▼
                        ┌──────────────────────────────┐
                        │ 9️⃣ Wait for CI/CD Pipeline   │
                        └───────────────┬──────────────┘
                                     │
                                     ▼
                        ┌──────────────────────────────┐
                        │ 🔟 CI Passed?                 │
                        └───────┬─────────────┬────────┘
                                │ YES         │ NO
                                ▼             ▼
                      ┌──────────────┐   ┌────────────────┐
                      │ ✅ Done       │   │ Retry Fix      │
                      │ Save results │   │ (Max 5 Times)  │
                      └──────────────┘   └─────────┬──────┘
                                                   │
                                                   ▼
                                              (Back to Step 5)
```



🎯 One-Line Explanation
User gives a repo → we test → if broken → AI fixes → pushes → waits for CI → retries if needed → shows everything in dashboard.


