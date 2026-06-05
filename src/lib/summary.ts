import type { TimeEntry, DailySummary } from '@/db/schema'

export function calculateDailySummary(entries: TimeEntry[]): DailySummary {
  const date = entries.length > 0 ? entries[0].date : new Date().toISOString().split('T')[0]
  
  let totalWorkSeconds = 0
  let totalBreakSeconds = 0
  let lastCheckIn: Date | null = null
  let lastBreakIn: Date | null = null

  for (const entry of entries) {
    switch (entry.type) {
      case 'check-in':
        lastCheckIn = entry.timestamp
        lastBreakIn = null
        break
      case 'break-in':
        if (lastCheckIn) {
          totalWorkSeconds += (entry.timestamp.getTime() - lastCheckIn.getTime()) / 1000
          lastCheckIn = null
        }
        lastBreakIn = entry.timestamp
        break
      case 'break-out':
        if (lastBreakIn) {
          totalBreakSeconds += (entry.timestamp.getTime() - lastBreakIn.getTime()) / 1000
          lastBreakIn = null
        }
        lastCheckIn = entry.timestamp
        break
      case 'check-out':
        if (lastCheckIn) {
          totalWorkSeconds += (entry.timestamp.getTime() - lastCheckIn.getTime()) / 1000
          lastCheckIn = null
        }
        if (lastBreakIn) {
          totalBreakSeconds += (entry.timestamp.getTime() - lastBreakIn.getTime()) / 1000
          lastBreakIn = null
        }
        break
    }
  }

  // If currently checked in, add time up to now
  if (lastCheckIn) {
    totalWorkSeconds += (Date.now() - lastCheckIn.getTime()) / 1000
  }
  // If currently on break, add break time up to now
  if (lastBreakIn) {
    totalBreakSeconds += (Date.now() - lastBreakIn.getTime()) / 1000
  }

  const startTime = entries.find((e) => e.type === 'check-in')?.timestamp ?? null
  const endTime =
    entries.findLast((e) => e.type === 'check-out')?.timestamp ?? null

  return {
    date,
    startTime,
    endTime,
    totalWorkSeconds,
    totalBreakSeconds,
  }
}

export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)
  const parts = []
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0 || hours > 0) parts.push(`${minutes}m`)
  parts.push(`${seconds}s`)
  return parts.join(' ')
}
