const RunSummaryCard = ({ result }) => {
  if (!result) return null;

  const formatTime = (seconds) => {
    if (!seconds) return "N/A";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="card run-summary">
      <h3>Run Summary</h3>
      <div className="summary-grid">
        <div className="summary-item">
          <span className="label">Repository:</span>
          <span className="value">{result.repository || result.repo_url}</span>
        </div>
        <div className="summary-item">
          <span className="label">Team:</span>
          <span className="value">{result.team_name}</span>
        </div>
        <div className="summary-item">
          <span className="label">Leader:</span>
          <span className="value">{result.leader_name}</span>
        </div>
        <div className="summary-item">
          <span className="label">Branch Created:</span>
          <span className="value">{result.branch_name || "N/A"}</span>
        </div>
        <div className="summary-item">
          <span className="label">Total Failures Detected:</span>
          <span className="value highlight">{result.total_failures || 0}</span>
        </div>
        <div className="summary-item">
          <span className="label">Total Fixes Applied:</span>
          <span className="value highlight">{result.total_fixes || result.fixes_applied || 0}</span>
        </div>
        <div className="summary-item full-width">
          <span className="label">Final Status:</span>
          <span className={`badge ${result.final_status === "PASSED" ? "badge-success" : "badge-error"}`}>
            {result.final_status === "PASSED" ? "✓ PASSED" : "✗ FAILED"}
          </span>
        </div>
        <div className="summary-item full-width">
          <span className="label">Total Time Taken:</span>
          <span className="value">{formatTime(result.total_time)}</span>
        </div>
      </div>
    </div>
  );
};

export default RunSummaryCard;
