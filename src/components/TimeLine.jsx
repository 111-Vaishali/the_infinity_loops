const Timeline = ({ timeline, iterations = 5 }) => {
  if (!timeline || timeline.length === 0) return null;

  const currentIteration = timeline.length;

  return (
    <div className="card timeline">
      <div className="card-header">
        <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20m0-20a9 9 0 019 9m0 0a9 9 0 01-9 9m9-9H3m0-9a9 9 0 019 9"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <h3>CI/CD Status Timeline</h3>
      </div>
      <div className="iteration-counter">
        Iterations Used: <strong>{currentIteration}/{iterations}</strong>
      </div>
      <div className="timeline-container">
        {timeline.map((run, index) => (
          <div key={index} className="timeline-item">
            <div className={`timeline-dot ${run.status === "PASSED" ? "success" : "error"}`}>
              {run.status === "PASSED" ? "✓" : "✗"}
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <span className="iteration-label">Iteration {index + 1}</span>
                <span className={`status-badge ${run.status === "PASSED" ? "success" : "error"}`}>
                  {run.status}
                </span>
              </div>
              <div className="timeline-timestamp">
                {new Date(run.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
