import { useState, useEffect, useCallback } from 'react'

const COLLECTION = 'progress'
const LOCAL_KEY = 'vibe-coding-progress'

// Firebase가 설정되어 있는지 확인
function isFirebaseConfigured() {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
  return apiKey && apiKey !== 'your_api_key' && apiKey.length > 10
}

// localStorage에서 데이터 읽기
function loadLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

// localStorage에 데이터 쓰기
function saveLocal(data) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
}

export function useProgress() {
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)
  const [useFirestore, setUseFirestore] = useState(false)

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      // Firebase 미설정 → localStorage 모드
      console.log('Firebase 미설정 → localStorage 모드로 동작합니다.')
      setProgress(loadLocal())
      setLoading(false)
      return
    }

    // Firebase 설정됨 → Firestore 모드
    let unsubscribe = () => {}

    import('../firebase').then(({ db }) => {
      import('firebase/firestore').then(({ collection, onSnapshot }) => {
        setUseFirestore(true)
        unsubscribe = onSnapshot(
          collection(db, COLLECTION),
          (snapshot) => {
            const data = {}
            snapshot.forEach((docSnap) => {
              data[docSnap.id] = docSnap.data()
            })
            setProgress(data)
            setLoading(false)
          },
          (error) => {
            console.error('Firestore 연결 에러:', error)
            // Firestore 실패 시 localStorage 폴백
            setProgress(loadLocal())
            setUseFirestore(false)
            setLoading(false)
          }
        )
      })
    }).catch(() => {
      setProgress(loadLocal())
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const updateStatus = useCallback(async (dayId, status) => {
    const key = `day-${dayId}`

    if (useFirestore) {
      const { db } = await import('../firebase')
      const { doc, setDoc, serverTimestamp } = await import('firebase/firestore')
      const docRef = doc(db, COLLECTION, key)
      const existing = progress[key] || {}
      await setDoc(docRef, {
        ...existing,
        status,
        updatedAt: serverTimestamp(),
      }, { merge: true })
    } else {
      const updated = {
        ...progress,
        [key]: { ...(progress[key] || {}), status, updatedAt: new Date().toISOString() }
      }
      setProgress(updated)
      saveLocal(updated)
    }
  }, [useFirestore, progress])

  const updateMemo = useCallback(async (dayId, memo) => {
    const key = `day-${dayId}`

    if (useFirestore) {
      const { db } = await import('../firebase')
      const { doc, setDoc, serverTimestamp } = await import('firebase/firestore')
      const docRef = doc(db, COLLECTION, key)
      const existing = progress[key] || {}
      await setDoc(docRef, {
        ...existing,
        memo,
        updatedAt: serverTimestamp(),
      }, { merge: true })
    } else {
      const updated = {
        ...progress,
        [key]: { ...(progress[key] || {}), memo, updatedAt: new Date().toISOString() }
      }
      setProgress(updated)
      saveLocal(updated)
    }
  }, [useFirestore, progress])

  const getStatus = useCallback((dayId) => {
    const data = progress[`day-${dayId}`]
    return data?.status || 'not_started'
  }, [progress])

  const getMemo = useCallback((dayId) => {
    const data = progress[`day-${dayId}`]
    return data?.memo || ''
  }, [progress])

  const getStats = useCallback(() => {
    const allDays = Array.from({ length: 45 }, (_, i) => i + 1)
    let completed = 0
    let reviewLater = 0
    let notStarted = 0

    allDays.forEach((day) => {
      const status = getStatus(day)
      if (status === 'completed') completed++
      else if (status === 'review_later') reviewLater++
      else notStarted++
    })

    return { total: 45, completed, reviewLater, notStarted }
  }, [getStatus])

  return {
    progress,
    loading,
    useFirestore,
    updateStatus,
    updateMemo,
    getStatus,
    getMemo,
    getStats,
  }
}
