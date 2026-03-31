import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: '대시보드', emoji: '📋' },
  { to: '/roadmap', label: '로드맵', emoji: '🗺️' },
  { to: '/memos', label: '메모', emoji: '📝' },
  { to: '/kjso', label: 'KJSO 진도', emoji: '🔬' },
]

export default function Header() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* 1행: 타이틀 */}
      <div className="max-w-3xl mx-auto px-4 pt-3 pb-2 flex items-center gap-2">
        <span className="text-xl">🎵</span>
        <Link to="/" className="no-underline">
          <span className="font-bold text-gray-800 text-base leading-tight">
            귀염뽀짝 이슬우의 바이브코딩
          </span>
        </Link>
      </div>
      {/* 2행: 탭 메뉴 */}
      <nav className="max-w-3xl mx-auto px-4 pb-2 flex gap-1.5 overflow-x-auto">
        {navItems.map(({ to, label, emoji }) => {
          const active = to === '/'
            ? currentPath === '/' || currentPath.startsWith('/session')
            : currentPath === to
          return (
            <Link
              key={to}
              to={to}
              className={`flex-shrink-0 text-center text-xs px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap ${
                active
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {emoji} {label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
