const statusConfig = {
  not_started: {
    label: '미학습',
    emoji: '📭',
    color: 'bg-gray-100 text-gray-600 border-gray-300',
  },
  completed: {
    label: '학습완료',
    emoji: '✅',
    color: 'bg-green-100 text-green-700 border-green-400',
  },
  review_later: {
    label: '나중에 다시보기',
    emoji: '🔖',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-400',
  },
}

const statuses = ['not_started', 'completed', 'review_later']

export default function StatusToggle({ currentStatus, onStatusChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => {
        const config = statusConfig[status]
        const isActive = currentStatus === status
        return (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? config.color + ' border-current shadow-sm'
                : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
            }`}
          >
            {config.emoji} {config.label}
          </button>
        )
      })}
    </div>
  )
}
