const ScoreBreakdown = ({ result }) => {
  if (!result) return null;

  const baseScore = 100;
  const speedBonus = result.speed_bonus || (result.total_time < 300 ? 10 : 0);
  const penalty = result.efficiency_penalty || (result.total_commits > 20 ? (result.total_commits - 20) * 2 : 0);

  const finalScore = result.final_score || (baseScore + speedBonus - penalty);

  return (
    <div className="card score-breakdown">
      <div className="card-header">
        <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        <h3>Score Breakdown</h3>
      </div>
      <div className="score-items">
        <div className="score-item">
          <span className="label">Base Score:</span>
          <span className="value">+100</span>
        </div>
        <div className="score-item bonus">
          <span className="label">Speed Bonus (less than 5 min):</span>
          <span className="value">+{speedBonus}</span>
        </div>
        <div className="score-item penalty">
          <span className="label">Efficiency Penalty (over 20 commits):</span>
          <span className="value">-{Math.abs(penalty)}</span>
        </div>
      </div>
      
      <div className="score-bar">
        <div className="score-fill" style={{ width: `${Math.min((finalScore / 120) * 100, 100)}%` }}></div>
      </div>

      <div className="final-score">
        <h2>{finalScore}</h2>
        <p>Total Score</p>
      </div>
    </div>
  );
};

export default ScoreBreakdown;
