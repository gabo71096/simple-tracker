import { useState, useEffect, useCallback } from 'react'
import { db } from '@/db'
import type { TimeEntry, TrackerStatus, TimeEntryType } from '@/db/schema'

export function useTimeTracker() {
  const [status, setStatus] = useState<TrackerStatus>('checked-out')
  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [loading, setLoading] = useState(true)

  const today = new Date().toISOString().split('T')[0]

  const loadTodayEntries = useCallback(async () => {
    const todayEntries = await db.entries
      .where('date')
      .equals(today)
      .sortBy('timestamp')
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
    loadTodayEntries()
  }, [loadTodayEntries])

  const addEntry = useCallback(
    async (type: TimeEntryType, latitude?: number, longitude?: number) => {
      const now = new Date()
      const entry: TimeEntry = {
        type,
        timestamp: now,
        date: today,
        latitude,
        longitude,
      }
      await db.entries.add(entry)
      await loadTodayEntries()
      return entry
    },
    [today, loadTodayEntries]
  )

  const updateEntry = useCallback(
    async (id: number, timestamp: Date) => {
      await db.entries.update(id, { timestamp })
      await loadTodayEntries()
    },
    [loadTodayEntries]
  )

  const deleteEntry = useCallback(
    async (id: number) => {
      await db.entries.delete(id)
      await loadTodayEntries()
    },
    [loadTodayEntries]
  )

  return {
    status,
    entries,
    loading,
    addEntry,
    updateEntry,
    deleteEntry,
    refresh: loadTodayEntries,
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
