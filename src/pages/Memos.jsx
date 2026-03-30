import { Link } from 'react-router-dom'
import curriculum from '../data/curriculum.json'

const trackColor = {
  'track-1': { badge: 'bg-purple-100 text-purple-700', border: 'border-purple-200', dot: 'bg-purple-400' },
  'track-2': { badge: 'bg-blue-100 text-blue-700', border: 'border-blue-200', dot: 'bg-blue-400' },
  'track-3': { badge: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' },
}

export default function Memos({ getMemo }) {
  // 메모가 있는 세션만 수집
  const memoList = []
  for (const track of curriculum.tracks) {
    for (const phase of track.phases) {
      for (const session of phase.sessions) {
        const memo = getMemo(session.session)
        if (memo.trim()) {
          memoList.push({
            session: session.session,
            title: session.title,
            memo,
            trackId: track.id,
            trackTitle: track.title,
            trackEmoji: track.emoji,
            phaseTitle: phase.title,
          })
        }
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-2xl p-5 text-white mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📝</span>
          <div>
            <h1 className="text-lg font-bold">나의 학습 메모</h1>
            <p className="text-slate-300 text-sm mt-0.5">
              {memoList.length > 0
                ? `총 ${memoList.length}개의 메모가 있어요`
                : '아직 작성한 메모가 없어요'}
            </p>
          </div>
        </div>
      </div>

      {/* 메모 없을 때 */}
      {memoList.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🗒️</div>
          <p className="text-base font-medium text-gray-500 mb-1">아직 메모가 없어요</p>
          <p className="text-sm">각 학습 페이지에서 메모를 남겨보세요!</p>
          <Link
            to="/"
            className="inline-block mt-5 text-sm text-purple-600 hover:text-purple-800 font-medium"
          >
            → 대시보드로 가기
          </Link>
        </div>
      )}

      {/* 메모 목록 */}
      <div className="flex flex-col gap-4">
        {memoList.map(({ session, title, memo, trackId, trackTitle, trackEmoji, phaseTitle }) => {
          const c = trackColor[trackId] || trackColor['track-1']
          return (
            <Link
              key={session}
              to={`/session/${session}`}
              className={`block bg-white rounded-xl border ${c.border} p-4 hover:shadow-md transition-all duration-200 no-underline`}
            >
              {/* 상단: 트랙 + 페이즈 */}
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.badge}`}>
                  {trackEmoji} {trackTitle}
                </span>
                <span className="text-xs text-gray-400">{phaseTitle}</span>
              </div>

              {/* 회차 + 제목 */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${c.dot}`}>
                  {session}
                </span>
                <span className="text-sm font-semibold text-gray-800">{title}</span>
              </div>

              {/* 메모 내용 */}
              <div className="bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {memo}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
