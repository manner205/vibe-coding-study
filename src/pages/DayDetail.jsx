import { useParams, Link } from 'react-router-dom'
import curriculum from '../data/curriculum.json'
import StatusToggle from '../components/StatusToggle'
import MemoEditor from '../components/MemoEditor'

function findDay(dayNum) {
  for (const track of curriculum.tracks) {
    for (const phase of track.phases) {
      for (const day of phase.sessions) {
        if (day.session === dayNum) {
          return { ...day, trackTitle: track.title, trackEmoji: track.emoji, phaseTitle: phase.title }
        }
      }
    }
  }
  return null
}

export default function DayDetail({ getStatus, getMemo, updateStatus, updateMemo }) {
  const { sessionId } = useParams()
  const dayNum = parseInt(sessionId, 10)
  const dayData = findDay(dayNum)

  if (!dayData) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500 text-lg">해당 학습회차를 찾을 수 없습니다.</p>
        <Link to="/" className="text-purple-600 hover:underline mt-4 inline-block">
          ← 대시보드로 돌아가기
        </Link>
      </div>
    )
  }

  const currentStatus = getStatus(dayNum)
  const currentMemo = getMemo(dayNum)
  const prevDay = dayNum > 1 ? dayNum - 1 : null
  const nextDay = dayNum < 45 ? dayNum + 1 : null

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* 브레드크럼 */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-purple-600">대시보드</Link>
        <span className="mx-2">›</span>
        <span>{dayData.trackEmoji} {dayData.trackTitle}</span>
        <span className="mx-2">›</span>
        <span>{dayData.phaseTitle}</span>
      </div>

      {/* 제목 */}
      <div className="mb-6">
        <span className="text-sm font-semibold text-purple-600">{dayNum}회차</span>
        <h1 className="text-2xl font-bold text-gray-800 mt-1">{dayData.title}</h1>
      </div>

      {/* 학습 상태 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">학습 상태</h2>
        <StatusToggle
          currentStatus={currentStatus}
          onStatusChange={(status) => updateStatus(dayNum, status)}
        />
      </div>

      {/* 학습 내용 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">📖 학습 내용</h2>
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
          {dayData.description}
        </p>
      </div>

      {/* 생성 예시 */}
      <div className="bg-purple-50 rounded-xl border border-purple-200 p-4 mb-4">
        <h2 className="text-sm font-semibold text-purple-700 mb-2">💡 실습 예시</h2>
        <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
          {dayData.example}
        </pre>
      </div>

      {/* 메모 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <MemoEditor
          memo={currentMemo}
          onSave={(memo) => updateMemo(dayNum, memo)}
        />
      </div>

      {/* 이전/다음 네비게이션 */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        {prevDay ? (
          <Link
            to={`/session/${prevDay}`}
            className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
          >
            ← {prevDay}회차
          </Link>
        ) : (
          <span />
        )}
        {nextDay ? (
          <Link
            to={`/session/${nextDay}`}
            className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
          >
            {nextDay}회차 →
          </Link>
        ) : (
          <span className="text-sm text-green-600 font-semibold">
            🎉 마지막 학습!
          </span>
        )}
      </div>
    </div>
  )
}
