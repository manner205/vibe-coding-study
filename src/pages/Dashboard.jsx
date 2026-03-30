import { useState } from 'react'
import { Link } from 'react-router-dom'
import curriculum from '../data/curriculum.json'
import DayCard from '../components/DayCard'

const filterOptions = [
  { key: 'all', label: '전체', emoji: '📋' },
  { key: 'not_started', label: '미학습', emoji: '📭' },
  { key: 'completed', label: '학습완료', emoji: '✅' },
  { key: 'review_later', label: '나중에', emoji: '🔖' },
]

export default function Dashboard({ getStatus, getStats, loading }) {
  const [filter, setFilter] = useState('all')
  const stats = getStats()
  const progressPercent = Math.round((stats.completed / stats.total) * 100)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-500">불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* 진도율 카드 */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white mb-6">
        <h2 className="text-lg font-semibold mb-1">전체 진도율</h2>
        <div className="flex items-end gap-3 mb-3">
          <span className="text-4xl font-bold">{progressPercent}%</span>
          <span className="text-purple-200 text-sm mb-1">
            {stats.completed} / {stats.total}회차 완료
          </span>
        </div>
        <div className="w-full bg-purple-400/40 rounded-full h-3">
          <div
            className="bg-white rounded-full h-3 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex gap-4 mt-4 text-sm">
          <span>✅ 완료 {stats.completed}</span>
          <span>🔖 나중에 {stats.reviewLater}</span>
          <span>📭 미학습 {stats.notStarted}</span>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {filterOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setFilter(opt.key)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === opt.key
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {opt.emoji} {opt.label}
          </button>
        ))}
      </div>

      {/* 트랙별 표시 */}
      {curriculum.tracks.map((track, trackIdx) => {
        const trackColor = ['purple', 'blue', 'emerald'][trackIdx] || 'purple'
        const headerClass = { purple: 'bg-purple-600', blue: 'bg-blue-600', emerald: 'bg-emerald-600' }[trackColor]
        const phaseBoxClass = { purple: 'bg-purple-50 border-purple-200', blue: 'bg-blue-50 border-blue-200', emerald: 'bg-emerald-50 border-emerald-200' }[trackColor]
        const phaseBadgeClass = { purple: 'bg-purple-100 text-purple-700', blue: 'bg-blue-100 text-blue-700', emerald: 'bg-emerald-100 text-emerald-700' }[trackColor]

        const hasAnySession = track.phases.some((phase) =>
          phase.sessions.some((d) => filter === 'all' || getStatus(d.session) === filter)
        )
        if (!hasAnySession) return null

        return (
          <div key={track.id} className="mb-10">
            {/* 트랙 헤더 */}
            <div className={`${headerClass} rounded-2xl px-5 py-4 text-white mb-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{track.emoji}</span>
                  <h2 className="text-base font-bold leading-tight">{track.title}</h2>
                </div>
                <span className="flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full">
                  ⏱️ 하루 10분
                </span>
              </div>
            </div>

            {/* 페이즈별 묶음 */}
            <div className="flex flex-col gap-4">
              {track.phases.map((phase) => {
                const days = phase.sessions.filter(
                  (d) => filter === 'all' || getStatus(d.session) === filter
                )
                if (days.length === 0) return null

                const allCompleted = phase.sessions.every(
                  (d) => getStatus(d.session) === 'completed'
                )

                return (
                  <div
                    key={phase.id}
                    className={`rounded-xl border p-4 transition-all duration-500 ${
                      allCompleted
                        ? 'bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 border-yellow-400 shadow-md shadow-yellow-200/60'
                        : `${phaseBoxClass}`
                    }`}
                  >
                    {/* 페이즈 헤더 */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {allCompleted && (
                          <span className="text-lg leading-none">👑</span>
                        )}
                        <span
                          className={`inline-block text-xs font-bold px-2 py-0.5 rounded-md ${
                            allCompleted
                              ? 'bg-yellow-400 text-yellow-900'
                              : phaseBadgeClass
                          }`}
                        >
                          {phase.title}
                        </span>
                      </div>
                      {allCompleted && (
                        <span className="text-xs font-bold text-yellow-600 bg-yellow-200 border border-yellow-400 px-2 py-0.5 rounded-full">
                          🎉 완주!
                        </span>
                      )}
                    </div>

                    {/* 카드 그리드 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {days.map((day) => (
                        <DayCard
                          key={day.session}
                          day={day}
                          status={getStatus(day.session)}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
