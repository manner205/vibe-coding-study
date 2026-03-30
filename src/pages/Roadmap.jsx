import { Link } from 'react-router-dom'

const tracks = [
  {
    id: 1,
    title: 'AI 도구 활용 코딩 입문',
    emoji: '🤖',
    color: 'purple',
    sessions: '1 ~ 12회',
    phases: [
      {
        title: 'AI와 친해지기',
        sessions: [
          { n: 1, label: '바이브 코딩이란?' },
          { n: 2, label: '좋은 프롬프트 작성법' },
          { n: 3, label: '프롬프트 반복 개선하기' },
          { n: 4, label: 'VS Code + Claude Code 설치' },
        ],
      },
      {
        title: 'AI와 함께 만들기',
        sessions: [
          { n: 5, label: '자기소개 페이지' },
          { n: 6, label: '간단한 계산기' },
          { n: 7, label: '퀴즈 게임' },
          { n: 8, label: 'To-Do 리스트' },
        ],
      },
      {
        title: 'AI 코딩 실전 팁',
        sessions: [
          { n: 9, label: 'AI 디버깅 요청' },
          { n: 10, label: '코드 설명 요청' },
          { n: 11, label: '기능 추가 요청' },
          { n: 12, label: '미니 프로젝트 (자유)' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: '웹 개발 기초 HTML/CSS/JS',
    emoji: '🌐',
    color: 'blue',
    sessions: '13 ~ 30회',
    phases: [
      {
        title: 'HTML 기초',
        sessions: [
          { n: 13, label: '첫 HTML 파일' },
          { n: 14, label: '목록과 링크' },
          { n: 15, label: '이미지와 멀티미디어' },
          { n: 16, label: '폼(입력양식)' },
          { n: 17, label: 'HTML 종합 실습' },
        ],
      },
      {
        title: 'CSS 기초',
        sessions: [
          { n: 18, label: '색상과 글꼴' },
          { n: 19, label: '박스 모델' },
          { n: 20, label: 'Flexbox 정렬' },
          { n: 21, label: '반응형 디자인' },
          { n: 22, label: '애니메이션 효과' },
          { n: 23, label: 'CSS 종합 실습' },
        ],
      },
      {
        title: 'JavaScript 기초',
        sessions: [
          { n: 24, label: '변수와 출력' },
          { n: 25, label: '조건문 if/else' },
          { n: 26, label: '반복문 for' },
          { n: 27, label: '함수' },
          { n: 28, label: 'DOM 조작' },
          { n: 29, label: '이벤트' },
          { n: 30, label: '종합 프로젝트' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: '배포와 데이터베이스',
    emoji: '🚀',
    color: 'green',
    sessions: '31 ~ 45회',
    phases: [
      {
        title: 'GitHub — 코드 저장소',
        sessions: [
          { n: 31, label: 'GitHub 계정 만들기' },
          { n: 32, label: '파일 올리기' },
          { n: 33, label: 'Git Commit / Push' },
          { n: 34, label: 'GitHub Pages 배포' },
        ],
      },
      {
        title: 'Vercel — 자동 배포',
        sessions: [
          { n: 35, label: 'Vercel 연결 + 첫 배포' },
          { n: 36, label: 'Push → 자동 배포 체험' },
          { n: 37, label: '환경변수(.env) 관리' },
        ],
      },
      {
        title: 'Firebase — 데이터베이스',
        sessions: [
          { n: 38, label: 'Firebase 프로젝트 생성' },
          { n: 39, label: 'React에 Firebase 연결' },
          { n: 40, label: '데이터 저장 (addDoc)' },
          { n: 41, label: '데이터 읽기 (onSnapshot)' },
          { n: 42, label: '수정 / 삭제' },
        ],
      },
      {
        title: '실전 프로젝트 — 전체 연결',
        sessions: [
          { n: 43, label: '구글 로그인' },
          { n: 44, label: 'Firebase To-Do 앱 완성' },
          { n: 45, label: 'GitHub → Vercel 최종 배포' },
        ],
      },
    ],
  },
]

const colorMap = {
  purple: {
    track: 'bg-purple-600',
    trackLight: 'bg-purple-50 border-purple-200',
    phase: 'bg-purple-100 text-purple-700',
    badge: 'bg-purple-600 text-white',
    badgeLight: 'bg-purple-100 text-purple-700',
    arrow: 'text-purple-400',
    connector: 'bg-purple-300',
    ring: 'ring-purple-200',
  },
  blue: {
    track: 'bg-blue-600',
    trackLight: 'bg-blue-50 border-blue-200',
    phase: 'bg-blue-100 text-blue-700',
    badge: 'bg-blue-600 text-white',
    badgeLight: 'bg-blue-100 text-blue-700',
    arrow: 'text-blue-400',
    connector: 'bg-blue-300',
    ring: 'ring-blue-200',
  },
  green: {
    track: 'bg-emerald-600',
    trackLight: 'bg-emerald-50 border-emerald-200',
    phase: 'bg-emerald-100 text-emerald-700',
    badge: 'bg-emerald-600 text-white',
    badgeLight: 'bg-emerald-100 text-emerald-700',
    arrow: 'text-emerald-400',
    connector: 'bg-emerald-300',
    ring: 'ring-emerald-200',
  },
}

const statusStyle = {
  completed: {
    pill: 'bg-green-50 border-green-300 ring-green-200',
    icon: '✅',
    label: 'text-green-800',
  },
  review_later: {
    pill: 'bg-yellow-50 border-yellow-300 ring-yellow-200',
    icon: '🔖',
    label: 'text-yellow-800',
  },
  not_started: null,
}

function SessionPill({ n, label, color, status }) {
  const c = colorMap[color]
  const s = statusStyle[status]
  const pillClass = s
    ? `${s.pill} ring-1`
    : `${c.trackLight} ring-1 ${c.ring}`
  const labelClass = s ? s.label : 'text-gray-700'

  return (
    <Link
      to={`/session/${n}`}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${pillClass} hover:brightness-95 active:scale-95 transition-all duration-150 no-underline`}
    >
      {s ? (
        <span className="text-xs leading-none flex-shrink-0">{s.icon}</span>
      ) : (
        <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${c.badge}`}>
          {n}
        </span>
      )}
      <span className={`text-xs font-medium leading-tight ${labelClass}`}>{label}</span>
    </Link>
  )
}

function PhaseBlock({ phase, color, isLast, getStatus }) {
  const c = colorMap[color]
  const total = phase.sessions.length
  const done = phase.sessions.filter((s) => getStatus(s.n) === 'completed').length
  const allCompleted = done === total

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={`w-full rounded-xl border p-4 transition-all duration-500 ${
          allCompleted
            ? 'bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 border-yellow-400 shadow-md shadow-yellow-200/60'
            : `${c.trackLight}`
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {allCompleted && <span className="text-base leading-none">👑</span>}
            <div
              className={`inline-block text-xs font-bold px-2 py-0.5 rounded-md ${
                allCompleted ? 'bg-yellow-400 text-yellow-900' : c.phase
              }`}
            >
              {phase.title}
            </div>
          </div>
          {allCompleted ? (
            <span className="text-xs font-bold text-yellow-600 bg-yellow-200 border border-yellow-400 px-2 py-0.5 rounded-full">
              🎉 완주!
            </span>
          ) : (
            <span className="text-xs text-gray-400">{done}/{total} 완료</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {phase.sessions.map((s) => (
            <SessionPill key={s.n} n={s.n} label={s.label} color={color} status={getStatus(s.n)} />
          ))}
        </div>
      </div>
      {!isLast && (
        <div className="flex flex-col items-center my-1">
          <div className={`w-0.5 h-4 ${c.connector}`} />
          <div className={`text-lg leading-none ${c.arrow}`}>▼</div>
        </div>
      )}
    </div>
  )
}

function TrackBlock({ track, isLast, getStatus }) {
  const c = colorMap[track.color]
  const allSessions = track.phases.flatMap((p) => p.sessions)
  const total = allSessions.length
  const done = allSessions.filter((s) => getStatus(s.n) === 'completed').length
  const allDone = done === total
  return (
    <div className="flex flex-col items-center w-full">
      {/* 트랙 헤더 */}
      <div className={`w-full rounded-2xl p-4 text-white mb-4 ${c.track}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{allDone ? '🏆' : track.emoji}</span>
            <div>
              <div className="font-bold text-base leading-tight">{track.title}</div>
              <div className="text-white/70 text-xs mt-0.5">Track {track.id}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="bg-white/20 rounded-lg px-3 py-1 text-sm font-bold">
              {track.sessions}
            </div>
            <div className="text-white/80 text-xs">{done}/{total} 완료</div>
          </div>
        </div>
        {/* 트랙 진도바 */}
        <div className="mt-3 w-full bg-white/20 rounded-full h-1.5">
          <div
            className="bg-white rounded-full h-1.5 transition-all duration-500"
            style={{ width: `${Math.round((done / total) * 100)}%` }}
          />
        </div>
      </div>

      {/* 페이즈 목록 */}
      <div className="w-full flex flex-col items-center gap-0">
        {track.phases.map((phase, i) => (
          <PhaseBlock
            key={i}
            phase={phase}
            color={track.color}
            isLast={i === track.phases.length - 1}
            getStatus={getStatus}
          />
        ))}
      </div>

      {/* 트랙 간 연결 화살표 */}
      {!isLast && (
        <div className="flex flex-col items-center my-4">
          <div className="w-0.5 h-6 bg-gray-300" />
          <div className="bg-gray-200 rounded-full px-4 py-1 text-xs text-gray-500 font-semibold my-1">
            다음 단계
          </div>
          <div className="w-0.5 h-6 bg-gray-300" />
          <div className="text-2xl leading-none text-gray-400">▼</div>
        </div>
      )}
    </div>
  )
}

export default function Roadmap({ getStatus }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* 상단 요약 */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-5 text-white mb-8">
        <div className="text-center">
          <div className="text-3xl mb-2">🗺️</div>
          <h1 className="text-xl font-bold mb-1">바이브코딩 전체 학습 로드맵</h1>
          <p className="text-gray-300 text-sm mb-4">1회부터 45회까지 한눈에 보기</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <div className="bg-purple-500/30 border border-purple-400/40 rounded-lg px-4 py-2 text-center">
              <div className="text-lg font-bold">1~12회</div>
              <div className="text-xs text-gray-300">🤖 AI 입문</div>
            </div>
            <div className="flex items-center text-gray-500 text-xl">→</div>
            <div className="bg-blue-500/30 border border-blue-400/40 rounded-lg px-4 py-2 text-center">
              <div className="text-lg font-bold">13~30회</div>
              <div className="text-xs text-gray-300">🌐 웹 기초</div>
            </div>
            <div className="flex items-center text-gray-500 text-xl">→</div>
            <div className="bg-emerald-500/30 border border-emerald-400/40 rounded-lg px-4 py-2 text-center">
              <div className="text-lg font-bold">31~45회</div>
              <div className="text-xs text-gray-300">🚀 배포+DB</div>
            </div>
          </div>
        </div>
      </div>

      {/* 플로우차트 */}
      <div className="flex flex-col items-center">
        {/* 시작 노드 */}
        <div className="bg-gray-800 text-white text-sm font-bold px-6 py-2 rounded-full mb-4 shadow">
          🚦 학습 시작
        </div>
        <div className="w-0.5 h-6 bg-gray-300 mb-0" />
        <div className="text-xl text-gray-400 mb-4">▼</div>

        {/* 트랙 블록들 */}
        {tracks.map((track, i) => (
          <TrackBlock key={track.id} track={track} isLast={i === tracks.length - 1} getStatus={getStatus} />
        ))}

        {/* 종료 노드 */}
        <div className="flex flex-col items-center mt-4">
          <div className="w-0.5 h-6 bg-gray-300" />
          <div className="text-xl text-gray-400 mb-3">▼</div>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg text-center">
            🎉 완주! 나만의 앱을 인터넷에 배포했어요
          </div>
        </div>
      </div>

      {/* 범례 */}
      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">범례</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-600 flex-shrink-0" />
            <span className="text-xs text-gray-600">Track 1 — AI 도구로 코딩 시작하기 (1~12회)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-600 flex-shrink-0" />
            <span className="text-xs text-gray-600">Track 2 — HTML/CSS/JS 웹 기초 (13~30회)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-600 flex-shrink-0" />
            <span className="text-xs text-gray-600">Track 3 — GitHub·Vercel·Firebase 실전 배포 (31~45회)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
