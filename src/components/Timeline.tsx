import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { TimeEntry } from '@/db/schema'
import { format } from 'date-fns'
import { LogIn, LogOut, Coffee, Play, MapPin } from 'lucide-react'

interface TimelineProps {
  entries: TimeEntry[]
}

const typeConfig: Record<
  string,
  { label: string; icon: React.ReactNode; colorClass: string }
> = {
  'check-in': {
    label: 'Check In',
    icon: <LogIn className="h-4 w-4" />,
    colorClass: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950',
  },
  'check-out': {
    label: 'Check Out',
    icon: <LogOut className="h-4 w-4" />,
    colorClass: 'text-slate-600 bg-slate-100 dark:bg-slate-800',
  },
  'break-in': {
    label: 'Break Start',
    icon: <Coffee className="h-4 w-4" />,
    colorClass: 'text-amber-600 bg-amber-50 dark:bg-amber-950',
  },
  'break-out': {
    label: 'Break End',
    icon: <Play className="h-4 w-4" />,
    colorClass: 'text-amber-600 bg-amber-50 dark:bg-amber-950',
  },
}

export function Timeline({ entries }: TimelineProps) {
  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Today's Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No activity recorded today.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Today's Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.map((entry) => {
          const config = typeConfig[entry.type]
          return (
            <div
              key={entry.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${config.colorClass}`}
                >
                  {config.icon}
                </span>
                <div>
                  <div className="text-sm font-medium">{config.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(entry.timestamp), 'HH:mm:ss')}
                  </div>
                </div>
              </div>
              {entry.latitude != null && entry.longitude != null && (
                <a
                  href={`https://www.google.com/maps?q=${entry.latitude},${entry.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                  title="View location"
                >
                  <MapPin className="h-3 w-3" />
                  Map
                </a>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
