import { db } from './index'
import type { TimeEntry, TimeEntryType } from './schema'

function handleDbError(operation: string, error: unknown): never {
  console.error(`Database error during ${operation}:`, error)
  if (error instanceof Error) {
    if (error.name === 'QuotaExceededError' || error.message.includes('quota')) {
      alert('Storage quota exceeded. Please free up space or backup and clear old data.')
    } else if (error.name === 'VersionError') {
      alert('Database version mismatch. The app will reload to fix this.')
      window.location.reload()
    } else {
      alert(`An error occurred while ${operation}. Please try again.`)
    }
  }
  throw error
}

export async function getEntriesByDate(date: string): Promise<TimeEntry[]> {
  try {
    return db.entries.where('date').equals(date).sortBy('timestamp')
  } catch (e) {
    handleDbError('fetching entries', e)
  }
}

export async function addEntry(
  type: TimeEntryType,
  options?: { latitude?: number; longitude?: number },
): Promise<TimeEntry> {
  const now = new Date()
  const entry: TimeEntry = {
    type,
    timestamp: now,
    date: now.toISOString().split('T')[0],
    latitude: options?.latitude,
    longitude: options?.longitude,
  }
  try {
    const id = await db.entries.add(entry)
    return { ...entry, id }
  } catch (e) {
    handleDbError('adding entry', e)
  }
}

export async function updateEntryTimestamp(id: number, timestamp: Date): Promise<void> {
  try {
    await db.entries.update(id, { timestamp })
  } catch (e) {
    handleDbError('updating entry', e)
  }
}

export async function deleteEntry(id: number): Promise<void> {
  try {
    await db.entries.delete(id)
  } catch (e) {
    handleDbError('deleting entry', e)
  }
}

export async function getAllDates(): Promise<string[]> {
  try {
    const dates = await db.entries.orderBy('date').uniqueKeys()
    return dates as string[]
  } catch (e) {
    handleDbError('fetching dates', e)
  }
}

export async function getEntriesBetween(startDate: string, endDate: string): Promise<TimeEntry[]> {
  try {
    return db.entries.where('date').between(startDate, endDate, true, true).sortBy('timestamp')
  } catch (e) {
    handleDbError('fetching entries', e)
  }
}

export async function exportAllEntries(): Promise<TimeEntry[]> {
  try {
    return db.entries.toArray()
  } catch (e) {
    handleDbError('exporting entries', e)
  }
}

export async function importEntries(entries: Omit<TimeEntry, 'id'>[]): Promise<void> {
  try {
    await db.entries.bulkAdd(entries as TimeEntry[])
  } catch (e) {
    handleDbError('importing entries', e)
  }
}

export async function clearAllEntries(): Promise<void> {
  try {
    await db.entries.clear()
  } catch (e) {
    handleDbError('clearing entries', e)
  }
}
