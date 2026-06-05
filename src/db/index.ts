import Dexie, { type Table } from 'dexie'
import type { TimeEntry } from './schema'

export class TimeTrackerDatabase extends Dexie {
  entries!: Table<TimeEntry, number>

  constructor() {
    super('TimeTrackerDB')
    this.version(1).stores({
      entries: '++id, date, type',
    })
  }
}

export const db = new TimeTrackerDatabase()
