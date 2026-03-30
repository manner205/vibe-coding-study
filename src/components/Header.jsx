import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const isRoadmap = location.pathname === '/roadmap'
  const isMemos = location.pathname === '/memos'

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="text-xl">🎵</span>
          <span className="font-bold text-gray-800 text-lg">
            귀염뽀짝 이슬우의 바이브코딩
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className={`text-sm px-3 py-1.5 rounded-full transition-colors font-medium ${
              !isRoadmap
                ? 'bg-purple-600 text-white'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            📋 대시보드
          </Link>
          <Link
            to="/roadmap"
            className={`text-sm px-3 py-1.5 rounded-full transition-colors font-medium ${
              isRoadmap
                ? 'bg-purple-600 text-white'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            🗺️ 로드맵
          </Link>
          <Link
            to="/memos"
            className={`text-sm px-3 py-1.5 rounded-full transition-colors font-medium ${
              isMemos
                ? 'bg-purple-600 text-white'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            📝 메모
          </Link>
        </nav>
      </div>
    </header>
  )
}
