import { useContext } from "react";
import { AgentContext } from "../context/AgentContext";
import InputSection from "../components/InputSection";
import RunSummaryCard from "../components/RunSummaryCard";
import ScoreBreakdown from "../components/ScoreBreakdown";
import FixesTable from "../components/FixesTable";
import Timeline from "../components/TimeLine";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const { result, loading } = useContext(AgentContext);

  return (
    <div className="dashboard-container">
      <InputSection />
      
      {loading && (
        <div className="loading-container">
          <LoadingSpinner />
          <p>Running agent analysis...</p>
        </div>
      )}
      
      {!loading && result && (
        <>
          <RunSummaryCard result={result} />
          <ScoreBreakdown result={result} />
          <FixesTable fixes={result?.fixes} />
          <Timeline timeline={result?.timeline} iterations={result?.iterations || 5} />
        </>
      )}
      
      {!loading && !result && (
        <div className="empty-state">
          <p>Submit a repository URL above to begin analysis</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
