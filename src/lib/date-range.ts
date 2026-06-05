import { format, startOfWeek, startOfMonth } from 'date-fns'

export type DatePreset = 'today' | 'week' | 'month' | 'all'

export const presetOptions: { value: DatePreset; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'all', label: 'All Time' },
]

export function getDateRange(preset: DatePreset): { start: string; end: string } {
  const now = new Date()
  const end = format(now, 'yyyy-MM-dd')
  let start = end

  switch (preset) {
    case 'today':
      start = end
      break
    case 'week': {
      const d = startOfWeek(now, { weekStartsOn: 0 })
      start = format(d, 'yyyy-MM-dd')
      break
    }
    case 'month': {
      const d = startOfMonth(now)
      start = format(d, 'yyyy-MM-dd')
      break
    }
    case 'all':
      start = '1970-01-01'
      break
  }

  return { start, end }
}
