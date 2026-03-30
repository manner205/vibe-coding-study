import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import DayDetail from './pages/DayDetail'
import Roadmap from './pages/Roadmap'
import Memos from './pages/Memos'
import { useProgress } from './hooks/useProgress'

function App() {
  const {
    loading,
    getStatus,
    getMemo,
    getStats,
    updateStatus,
    updateMemo,
  } = useProgress()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                getStatus={getStatus}
                getStats={getStats}
                loading={loading}
              />
            }
          />
          <Route
            path="/session/:sessionId"
            element={
              <DayDetail
                getStatus={getStatus}
                getMemo={getMemo}
                updateStatus={updateStatus}
                updateMemo={updateMemo}
              />
            }
          />
          <Route path="/roadmap" element={<Roadmap getStatus={getStatus} />} />
          <Route path="/memos" element={<Memos getMemo={getMemo} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
