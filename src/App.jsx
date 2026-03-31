import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useRef } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import DayDetail from './pages/DayDetail'
import Roadmap from './pages/Roadmap'
import Memos from './pages/Memos'
import KJSOProgress from './pages/KJSOProgress'
import { useProgress } from './hooks/useProgress'

const tabOrder = ['/', '/roadmap', '/memos', '/kjso']

function SwipeContainer({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const touchStartX = useRef(null)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) < 60) return // 60px 이상 스와이프

    const currentIndex = tabOrder.indexOf(location.pathname)
    if (currentIndex === -1) return // 세션 상세 페이지는 스와이프 제외

    if (diff > 0 && currentIndex < tabOrder.length - 1) {
      navigate(tabOrder[currentIndex + 1])
    } else if (diff < 0 && currentIndex > 0) {
      navigate(tabOrder[currentIndex - 1])
    }
    touchStartX.current = null
  }

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {children}
    </div>
  )
}

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
        <SwipeContainer>
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
            <Route path="/kjso" element={<KJSOProgress />} />
          </Routes>
        </SwipeContainer>
      </div>
    </BrowserRouter>
  )
}

export default App
