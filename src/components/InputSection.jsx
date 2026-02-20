import { useState, useContext } from "react";
import { motion } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="card input-section"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.7) 100%)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(226, 232, 240, 0.1)",
        borderRadius: "16px",
      }}
    >
      <motion.div
        className="card-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 21H3V3h9V1H3a2 2 0 00-2 2v18a2 2 0 002 2h18a2 2 0 002-2v-9h-2v9z"/>
          <path d="M17 1v6h6M9 13h6M9 17h4"/>
        </svg>
        <motion.h2
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Autonomous CI/CD Healing Agent
        </motion.h2>
      </motion.div>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="input-group"
          variants={itemVariants}
          style={{
            background: "rgba(51, 65, 85, 0.3)",
            backdropFilter: "blur(8px)",
            borderRadius: "12px",
            padding: "12px",
            border: "1px solid rgba(148, 163, 184, 0.2)",
          }}
        >
          <motion.label
            className="text-sm font-semibold text-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            GitHub Repository URL *
          </motion.label>
          <input
            type="text"
            placeholder="e.g., https://github.com/user/repo"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            disabled={loading}
            style={{
              background: "rgba(30, 41, 59, 0.5)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "8px",
              color: "white",
              padding: "10px 12px",
              marginTop: "8px",
            }}
            className="w-full focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </motion.div>

        <motion.div
          className="input-group"
          variants={itemVariants}
          style={{
            background: "rgba(51, 65, 85, 0.3)",
            backdropFilter: "blur(8px)",
            borderRadius: "12px",
            padding: "12px",
            border: "1px solid rgba(148, 163, 184, 0.2)",
          }}
        >
          <motion.label
            className="text-sm font-semibold text-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Team Name *
          </motion.label>
          <input
            type="text"
            placeholder="e.g., Code Warriors"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            disabled={loading}
            style={{
              background: "rgba(30, 41, 59, 0.5)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "8px",
              color: "white",
              padding: "10px 12px",
              marginTop: "8px",
            }}
            className="w-full focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </motion.div>

        <motion.div
          className="input-group"
          variants={itemVariants}
          style={{
            background: "rgba(51, 65, 85, 0.3)",
            backdropFilter: "blur(8px)",
            borderRadius: "12px",
            padding: "12px",
            border: "1px solid rgba(148, 163, 184, 0.2)",
          }}
        >
          <motion.label
            className="text-sm font-semibold text-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Team Leader Name *
          </motion.label>
          <input
            type="text"
            placeholder="e.g., John Doe"
            value={leaderName}
            onChange={(e) => setLeaderName(e.target.value)}
            disabled={loading}
            style={{
              background: "rgba(30, 41, 59, 0.5)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "8px",
              color: "white",
              padding: "10px 12px",
              marginTop: "8px",
            }}
            className="w-full focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </motion.div>
      </motion.div>

      <div className="flex justify-center mt-6">
        <motion.div
          className="group relative bg-gradient-to-b from-blue-500/20 to-cyan-500/20 p-px rounded-lg backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          style={{ width: "fit-content" }}
        >
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-[0.6rem] px-8 py-3 text-base font-semibold backdrop-blur-md bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white transition-all duration-300 group-hover:-translate-y-0.5 border border-blue-400/30 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-500/30 whitespace-nowrap"
          >
            {loading ? <LoadingSpinner /> : "Run Agent"}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InputSection;
