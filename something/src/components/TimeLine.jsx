const Timeline = ({ timeline, iterations = 5 }) => {
  if (!timeline || timeline.length === 0) return null;

  const currentIteration = timeline.length;

  return (
    <div className="card timeline">
      <h3>CI/CD Status Timeline</h3>
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
