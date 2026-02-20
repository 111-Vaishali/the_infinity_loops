import { useState, useContext } from "react";
import { AgentContext } from "../context/AgentContext";
import { runAgent } from "../api/agentApi";
import LoadingSpinner from "./LoadingSpinner";

const InputSection = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");

  const { loading, setLoading, setResult } = useContext(AgentContext);

  const handleSubmit = async () => {
    if (!repoUrl || !teamName || !leaderName) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const data = await runAgent({
        repo_url: repoUrl,
        team_name: teamName,
        leader_name: leaderName
      });
      setResult(data);
    } catch (err) {
      alert("Agent failed to run: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="card input-section">
      <h2>Autonomous CI/CD Healing Agent</h2>

      <div className="input-group">
        <label>GitHub Repository URL *</label>
        <input
          type="text"
          placeholder="e.g., https://github.com/user/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="input-group">
        <label>Team Name *</label>
        <input
          type="text"
          placeholder="e.g., Code Warriors"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="input-group">
        <label>Team Leader Name *</label>
        <input
          type="text"
          placeholder="e.g., John Doe"
          value={leaderName}
          onChange={(e) => setLeaderName(e.target.value)}
          disabled={loading}
        />
      </div>

      <button 
        onClick={handleSubmit} 
        disabled={loading}
        className="btn-primary"
      >
        {loading ? <LoadingSpinner /> : "Run Agent"}
      </button>
    </div>
  );
};

export default InputSection;
