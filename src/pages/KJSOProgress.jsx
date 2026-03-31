import { useState, useCallback } from 'react'
import { KJSO_LECTURES, SUBJECT_CONFIG } from '../data/kjso'
import { useKJSOProgress } from '../hooks/useKJSOProgress'

// 과목별 색상 클래스
const colorMap = {
  blue: {
    header: 'bg-blue-600',
    badge: 'bg-blue-100 text-blue-700',
    check: 'accent-blue-600',
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    tag: 'bg-blue-600 text-white',
    progress: 'bg-blue-500',
    filter: 'bg-blue-600 text-white',
  },
  green: {
    header: 'bg-emerald-600',
    badge: 'bg-emerald-100 text-emerald-700',
    check: 'accent-emerald-600',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    tag: 'bg-emerald-600 text-white',
    progress: 'bg-emerald-500',
    filter: 'bg-emerald-600 text-white',
  },
  purple: {
    header: 'bg-purple-600',
    badge: 'bg-purple-100 text-purple-700',
    check: 'accent-purple-600',
    border: 'border-purple-200',
    bg: 'bg-purple-50',
    tag: 'bg-purple-600 text-white',
    progress: 'bg-purple-500',
    filter: 'bg-purple-600 text-white',
  },
}

// 주차/차시별 그룹핑
function groupByWeek(lectures) {
  const groups = {}
  for (const lec of lectures) {
    if (!groups[lec.week]) groups[lec.week] = []
    groups[lec.week].push(lec)
  }
  return groups
}

// 메모 입력 행
function MemoRow({ lectureId, memo, onSave }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(memo)

  const handleSave = () => {
    onSave(lectureId, draft)
    setEditing(false)
  }

  const handleCancel = () => {
    setDraft(memo)
    setEditing(false)
  }

  if (!editing && !memo) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="text-xs text-gray-400 hover:text-gray-600 mt-1.5 flex items-center gap-1"
      >
        <span>✏️</span> 메모 추가
      </button>
    )
  }

  if (!editing) {
    return (
      <div
        className="mt-2 bg-white border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-gray-300 transition"
        onClick={() => { setDraft(memo); setEditing(true) }}
      >
        <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">{memo}</p>
        <span className="text-xs text-gray-400 mt-1 block">탭하여 수정</span>
      </div>
    )
  }

  return (
    <div className="mt-2">
      <textarea
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="학습 내용을 기록하세요..."
        rows={3}
        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 resize-none"
      />
      <div className="flex gap-2 mt-1">
        <button
          onClick={handleSave}
          className="text-xs bg-gray-800 text-white px-3 py-1 rounded-full"
        >
          저장
        </button>
        <button
          onClick={handleCancel}
          className="text-xs text-gray-500 px-3 py-1 rounded-full border border-gray-300"
        >
          취소
        </button>
      </div>
    </div>
  )
}

// 강의 항목 한 줄
function LectureRow({ lecture, done, memo, onToggle, onSaveMemo, color }) {
  const c = colorMap[color]
  return (
    <div className={`px-3 py-2.5 border-b border-gray-100 last:border-b-0 ${done ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex items-start gap-3">
        {/* 체크박스 */}
        <input
          type="checkbox"
          checked={done}
          onChange={() => onToggle(lecture.id)}
          className={`mt-0.5 w-4 h-4 flex-shrink-0 rounded cursor-pointer ${c.check}`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${c.tag}`}>
              {lecture.id}회
            </span>
            <span className={`text-sm font-medium leading-snug ${done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {lecture.title}
            </span>
          </div>
          <MemoRow lectureId={lecture.id} memo={memo} onSave={onSaveMemo} />
        </div>
      </div>
    </div>
  )
}

// 과목 섹션
function SubjectSection({ subject, lectures, isDone, getMemo, onToggle, onSaveMemo, totalStats }) {
  const cfg = SUBJECT_CONFIG[subject]
  const c = colorMap[cfg.color]
  const { completed, total } = totalStats
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  const weekGroups = groupByWeek(lectures)

  return (
    <div className={`rounded-xl border ${c.border} overflow-hidden mb-4`}>
      {/* 과목 헤더 */}
      <div className={`${c.header} px-4 py-3 text-white`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{cfg.emoji}</span>
            <span className="font-bold">{subject}</span>
          </div>
          <span className="text-white/80 text-sm">{completed}/{total} 완료</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-1.5">
          <div
            className="bg-white rounded-full h-1.5 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* 주차별 그룹 */}
      {Object.entries(weekGroups).map(([week, lecs]) => (
        <div key={week}>
          <div className={`px-3 py-1.5 ${c.bg} border-b ${c.border}`}>
            <span className={`text-xs font-bold ${c.badge.replace('bg-', 'text-').split(' ')[1] || 'text-gray-600'}`}>
              📅 {week}
            </span>
          </div>
          {lecs.map((lec) => (
            <LectureRow
              key={lec.id}
              lecture={lec}
              done={isDone(lec.id)}
              memo={getMemo(lec.id)}
              onToggle={onToggle}
              onSaveMemo={onSaveMemo}
              color={cfg.color}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// 메모 모아보기 탭
function AllMemos({ lectures, getMemo, isDone }) {
  const memoList = lectures
    .map((lec) => ({ ...lec, memo: getMemo(lec.id), done: isDone(lec.id) }))
    .filter((lec) => lec.memo.trim())

  if (memoList.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-5xl mb-4">📒</div>
        <p className="text-base font-medium text-gray-500 mb-1">아직 작성한 메모가 없어요</p>
        <p className="text-sm">각 강의의 메모 추가 버튼을 눌러 기록해보세요!</p>
      </div>
    )
  }

  // 과목별 그룹핑
  const grouped = {}
  for (const lec of memoList) {
    if (!grouped[lec.subject]) grouped[lec.subject] = []
    grouped[lec.subject].push(lec)
  }

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(grouped).map(([subject, lecs]) => {
        const cfg = SUBJECT_CONFIG[subject]
        const c = colorMap[cfg.color]
        return (
          <div key={subject}>
            <div className={`flex items-center gap-2 mb-3`}>
              <span className="text-lg">{cfg.emoji}</span>
              <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${c.badge}`}>{subject}</span>
              <span className="text-xs text-gray-400">{lecs.length}개</span>
            </div>
            <div className="flex flex-col gap-3">
              {lecs.map((lec) => (
                <div
                  key={lec.id}
                  className={`bg-white rounded-xl border ${c.border} p-4`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${c.tag}`}>
                      {lec.id}회
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{lec.title}</span>
                    {lec.done && <span className="ml-auto text-xs text-green-600 font-medium">✅ 완료</span>}
                  </div>
                  <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{lec.memo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// 메인 페이지
export default function KJSOProgress() {
  const { loading, isDone, getMemo, toggleDone, updateMemo, getStats } = useKJSOProgress()
  const [activeTab, setActiveTab] = useState('progress') // 'progress' | 'memos'
  const [subjectFilter, setSubjectFilter] = useState('전체')

  const subjects = ['전체', '물리', '화학', '생물']

  const allStats = getStats(KJSO_LECTURES)
  const progressPct = Math.round((allStats.completed / allStats.total) * 100)

  const filteredBySubject = subjectFilter === '전체'
    ? KJSO_LECTURES
    : KJSO_LECTURES.filter((l) => l.subject === subjectFilter)

  const subjectGroups = ['물리', '화학', '생물']
    .filter((s) => subjectFilter === '전체' || s === subjectFilter)
    .map((s) => ({
      subject: s,
      lectures: filteredBySubject.filter((l) => l.subject === s),
    }))

  const handleToggle = useCallback((id) => toggleDone(id), [toggleDone])
  const handleSaveMemo = useCallback((id, memo) => updateMemo(id, memo), [updateMemo])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-4" />
          <p className="text-gray-500">불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* 상단 진도 카드 */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-5 text-white mb-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🔬</span>
          <div>
            <h1 className="text-lg font-bold leading-tight">KJSO 1단계 진도</h1>
            <p className="text-indigo-200 text-sm">물리 · 화학 · 생물 인터넷 강의</p>
          </div>
        </div>
        <div className="flex items-end gap-3 mb-2">
          <span className="text-3xl font-bold">{progressPct}%</span>
          <span className="text-indigo-200 text-sm mb-1">{allStats.completed} / {allStats.total}회차 완료</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2.5">
          <div
            className="bg-white rounded-full h-2.5 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {/* 과목별 미니 통계 */}
        <div className="flex gap-3 mt-3 text-xs">
          {['물리', '화학', '생물'].map((s) => {
            const cfg = SUBJECT_CONFIG[s]
            const lecs = KJSO_LECTURES.filter((l) => l.subject === s)
            const { completed, total } = getStats(lecs)
            return (
              <div key={s} className="bg-white/15 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                <span>{cfg.emoji}</span>
                <span className="font-medium">{s}</span>
                <span className="text-white/70">{completed}/{total}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* 탭 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'progress'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          ☑️ 진도 체크
        </button>
        <button
          onClick={() => setActiveTab('memos')}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'memos'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          📒 학습 메모 모아보기
        </button>
      </div>

      {/* 진도 체크 탭 */}
      {activeTab === 'progress' && (
        <>
          {/* 과목 필터 */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {subjects.map((s) => {
              const isActive = subjectFilter === s
              const cfg = s !== '전체' ? SUBJECT_CONFIG[s] : null
              const activeClass = cfg ? colorMap[cfg.color].filter : 'bg-indigo-600 text-white'
              return (
                <button
                  key={s}
                  onClick={() => setSubjectFilter(s)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? activeClass
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {cfg ? `${cfg.emoji} ${s}` : `📋 ${s}`}
                </button>
              )
            })}
          </div>

          {subjectGroups.map(({ subject, lectures }) => (
            <SubjectSection
              key={subject}
              subject={subject}
              lectures={lectures}
              isDone={isDone}
              getMemo={getMemo}
              onToggle={handleToggle}
              onSaveMemo={handleSaveMemo}
              totalStats={getStats(lectures)}
            />
          ))}
        </>
      )}

      {/* 메모 모아보기 탭 */}
      {activeTab === 'memos' && (
        <AllMemos
          lectures={KJSO_LECTURES}
          getMemo={getMemo}
          isDone={isDone}
        />
      )}
    </div>
  )
}
