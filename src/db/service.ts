import { db } from './index'
import type { TimeEntry, TimeEntryType } from './schema'

export async function getEntriesByDate(date: string): Promise<TimeEntry[]> {
  return db.entries.where('date').equals(date).sortBy('timestamp')
}

export async function addEntry(
  type: TimeEntryType,
  options?: { latitude?: number; longitude?: number }
): Promise<TimeEntry> {
  const now = new Date()
  const entry: TimeEntry = {
    type,
    timestamp: now,
    date: now.toISOString().split('T')[0],
    latitude: options?.latitude,
    longitude: options?.longitude,
  }
  const id = await db.entries.add(entry)
  return { ...entry, id }
}

export async function updateEntryTimestamp(id: number, timestamp: Date): Promise<void> {
  await db.entries.update(id, { timestamp })
}

export async function deleteEntry(id: number): Promise<void> {
  await db.entries.delete(id)
}

export async function getAllDates(): Promise<string[]> {
  const dates = await db.entries.orderBy('date').uniqueKeys()
  return dates as string[]
}

export async function getEntriesBetween(startDate: string, endDate: string): Promise<TimeEntry[]> {
  return db.entries.where('date').between(startDate, endDate, true, true).sortBy('timestamp')
}

export async function exportAllEntries(): Promise<TimeEntry[]> {
  return db.entries.toArray()
}

export async function importEntries(entries: Omit<TimeEntry, 'id'>[]): Promise<void> {
  await db.entries.bulkAdd(entries as TimeEntry[])
}

export async function clearAllEntries(): Promise<void> {
  await db.entries.clear()
}
