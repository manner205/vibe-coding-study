import { useState, useEffect, useCallback } from 'react'

const COLLECTION = 'kjso-progress'
const LOCAL_KEY = 'kjso-progress'

function isFirebaseConfigured() {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
  return apiKey && apiKey !== 'your_api_key' && apiKey.length > 10
}

function loadLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveLocal(data) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
}

export function useKJSOProgress() {
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)
  const [useFirestore, setUseFirestore] = useState(false)

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setProgress(loadLocal())
      setLoading(false)
      return
    }

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

  const toggleDone = useCallback(async (lectureId) => {
    const key = `kjso-${lectureId}`
    const existing = progress[key] || {}
    const newDone = !existing.done

    if (useFirestore) {
      const { db } = await import('../firebase')
      const { doc, setDoc, serverTimestamp } = await import('firebase/firestore')
      await setDoc(doc(db, COLLECTION, key), {
        ...existing,
        done: newDone,
        updatedAt: serverTimestamp(),
      }, { merge: true })
    } else {
      const updated = {
        ...progress,
        [key]: { ...existing, done: newDone, updatedAt: new Date().toISOString() },
      }
      setProgress(updated)
      saveLocal(updated)
    }
  }, [useFirestore, progress])

  const updateMemo = useCallback(async (lectureId, memo) => {
    const key = `kjso-${lectureId}`
    const existing = progress[key] || {}

    if (useFirestore) {
      const { db } = await import('../firebase')
      const { doc, setDoc, serverTimestamp } = await import('firebase/firestore')
      await setDoc(doc(db, COLLECTION, key), {
        ...existing,
        memo,
        updatedAt: serverTimestamp(),
      }, { merge: true })
    } else {
      const updated = {
        ...progress,
        [key]: { ...existing, memo, updatedAt: new Date().toISOString() },
      }
      setProgress(updated)
      saveLocal(updated)
    }
  }, [useFirestore, progress])

  const isDone = useCallback((lectureId) => {
    return !!progress[`kjso-${lectureId}`]?.done
  }, [progress])

  const getMemo = useCallback((lectureId) => {
    return progress[`kjso-${lectureId}`]?.memo || ''
  }, [progress])

  const getStats = useCallback((lectures) => {
    const total = lectures.length
    const completed = lectures.filter((l) => isDone(l.id)).length
    return { total, completed }
  }, [isDone])

  return { loading, useFirestore, isDone, getMemo, toggleDone, updateMemo, getStats }
}
