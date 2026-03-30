import { useState, useEffect, useRef } from 'react'

export default function MemoEditor({ memo, onSave }) {
  const [text, setText] = useState(memo)
  const [saved, setSaved] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    setText(memo)
  }, [memo])

  const handleChange = (e) => {
    const value = e.target.value
    setText(value)
    setSaved(false)

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      onSave(value)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 1000)
  }

  const handleSaveClick = () => {
    onSave(text)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-gray-700">
          📝 학습 메모
        </label>
        {saved && (
          <span className="text-xs text-green-600 animate-pulse">
            ✓ 저장됨
          </span>
        )}
      </div>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="오늘 배운 내용, 느낀 점, 어려웠던 부분 등을 자유롭게 메모하세요..."
        className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
      />
      <button
        onClick={handleSaveClick}
        className="mt-2 px-4 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
      >
        저장
      </button>
    </div>
  )
}
