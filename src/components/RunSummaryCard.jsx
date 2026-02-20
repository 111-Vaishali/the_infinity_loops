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
      <div className="card-header">
        <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
        <h3>Run Summary</h3>
      </div>
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
