import { useState, useEffect, useCallback } from 'react'
import type { TimeEntry, TrackerStatus, TimeEntryType } from '@/db/schema'
import { getEntriesByDate, addEntry as addEntryService, updateEntryTimestamp, deleteEntry as deleteEntryService } from '@/db/service'

export function useTimeTracker() {
  const [status, setStatus] = useState<TrackerStatus>('checked-out')
  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [loading, setLoading] = useState(true)

  const today = new Date().toISOString().split('T')[0]

  const refresh = useCallback(async () => {
    const todayEntries = await getEntriesByDate(today)
    setEntries(todayEntries)

    if (todayEntries.length === 0) {
      setStatus('checked-out')
    } else {
      const last = todayEntries[todayEntries.length - 1]
      setStatus(mapTypeToStatus(last.type))
    }
    setLoading(false)
  }, [today])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const todayEntries = await getEntriesByDate(today)
      if (cancelled) return
      setEntries(todayEntries)

      if (todayEntries.length === 0) {
        setStatus('checked-out')
      } else {
        const last = todayEntries[todayEntries.length - 1]
        setStatus(mapTypeToStatus(last.type))
      }
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [today])

  const addEntry = useCallback(
    async (type: TimeEntryType, latitude?: number, longitude?: number) => {
      const entry = await addEntryService(type, { latitude, longitude })
      await refresh()
      return entry
    },
    [refresh]
  )

  const updateEntry = useCallback(
    async (id: number, timestamp: Date) => {
      await updateEntryTimestamp(id, timestamp)
      await refresh()
    },
    [refresh]
  )

  const deleteEntry = useCallback(
    async (id: number) => {
      await deleteEntryService(id)
      await refresh()
    },
    [refresh]
  )

  return {
    status,
    entries,
    loading,
    addEntry,
    updateEntry,
    deleteEntry,
    refresh,
  }
}

function mapTypeToStatus(type: TimeEntryType): TrackerStatus {
  switch (type) {
    case 'check-in':
    case 'break-out':
      return 'checked-in'
    case 'break-in':
      return 'on-break'
    case 'check-out':
      return 'checked-out'
  }
}
