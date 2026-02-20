import './App.css'
import { AgentProvider } from './context/AgentContext'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <AgentProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Autonomous CI/CD Healing Agent Dashboard</h1>
          <p>RIFT 2026 Hackathon - AI/ML Track</p>
        </header>
        <main className="app-main">
          <Dashboard />
        </main>
        <footer className="app-footer">
          <p>&copy; 2026 RIFT Hackathon. All rights reserved.</p>
        </footer>
      </div>
    </AgentProvider>
  )
}

export default App
