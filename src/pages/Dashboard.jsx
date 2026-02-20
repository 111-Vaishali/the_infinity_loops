"use client"

import { useContext } from "react";
import { motion } from "framer-motion";
import { AgentContext } from "../context/AgentContext";
import InputSection from "../components/InputSection";
import RunSummaryCard from "../components/RunSummaryCard";
import ScoreBreakdown from "../components/ScoreBreakdown";
import FixesTable from "../components/FixesTable";
import Timeline from "../components/TimeLine";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const { result, loading } = useContext(AgentContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const DataWrapper = ({ children, delay = 0 }) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(30, 41, 59, 0.4) 100%)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(148, 163, 184, 0.15)",
        borderRadius: "16px",
        padding: "2px",
        overflow: "hidden",
      }}
      whileHover={{ 
        boxShadow: "0 20px 60px rgba(59, 130, 246, 0.2)",
        transition: { duration: 0.3 }
      }}
    >
      <div
        style={{
          background: "rgba(15, 23, 42, 0.6)",
          borderRadius: "14px",
          padding: "24px",
        }}
      >
        {children}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <motion.div
        className="dashboard-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <InputSection />
        </motion.div>

        {loading && (
          <motion.div
            className="loading-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(34, 197, 234, 0.1) 100%)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              borderRadius: "16px",
              padding: "48px 24px",
              textAlign: "center",
              marginTop: "32px",
            }}
          >
            <LoadingSpinner />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-cyan-300 font-medium"
            >
              Running agent analysis...
            </motion.p>
          </motion.div>
        )}

        {!loading && result && (
          <motion.div
            className="space-y-6 mt-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <DataWrapper delay={0}>
              <RunSummaryCard result={result} />
            </DataWrapper>

            <DataWrapper delay={0.15}>
              <ScoreBreakdown result={result} />
            </DataWrapper>

            <DataWrapper delay={0.3}>
              <FixesTable fixes={result?.fixes} />
            </DataWrapper>

            <DataWrapper delay={0.45}>
              <Timeline timeline={result?.timeline} iterations={result?.iterations || 5} />
            </DataWrapper>
          </motion.div>
        )}

        {!loading && !result && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: "linear-gradient(135deg, rgba(100, 116, 139, 0.1) 0%, rgba(71, 85, 105, 0.1) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              borderRadius: "16px",
              padding: "60px 24px",
              textAlign: "center",
              marginTop: "32px",
            }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-300 text-lg"
            >
              Submit a repository URL above to begin analysis
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
