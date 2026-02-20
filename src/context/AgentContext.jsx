import { createContext, useState } from "react";

export const AgentContext = createContext();

export const AgentProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  return (
    <AgentContext.Provider value={{ loading, setLoading, result, setResult }}>
      {children}
    </AgentContext.Provider>
  );
};
