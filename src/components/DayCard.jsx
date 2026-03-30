import { Link, useLocation } from 'react-router-dom'

const statusColors = {
  completed: 'bg-green-500',
  review_later: 'bg-yellow-500',
  not_started: 'bg-gray-300',
}

const statusLabels = {
  completed: '학습완료',
  review_later: '나중에',
  not_started: '미학습',
}

export default function DayCard({ day, status }) {
  return (
    <Link
      to={`/session/${day.session}`}
      className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-purple-300 transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-purple-600">
          {day.session}회차
        </span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full text-white ${statusColors[status]}`}
        >
          {statusLabels[status]}
        </span>
      </div>
      <h3 className="font-medium text-gray-800 text-sm leading-snug">
        {day.title}
      </h3>
    </Link>
  )
}
