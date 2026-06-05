import { Card, CardContent } from '@/components/ui/card'
import { LiveClock } from '@/components/LiveClock'
import { StatusIndicator } from '@/components/StatusIndicator'
import { PrimaryActionButton } from '@/components/PrimaryActionButton'
import { SecondaryActionButton } from '@/components/SecondaryActionButton'
import { useTimeTracker } from '@/hooks/useTimeTracker'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useSettings } from '@/hooks/useSettings'
import { calculateDailySummary, formatDuration } from '@/lib/summary'
import { Timeline } from '@/components/Timeline'
import { HistoryDrawer } from '@/components/HistoryDrawer'
import { SettingsDrawer } from '@/components/SettingsDrawer'
import { ManualEntryForm } from '@/components/ManualEntryForm'

function App() {
  const { status, entries, loading, addEntry, updateEntry, refresh } = useTimeTracker()
  const { settings } = useSettings()
  const geo = useGeolocation(settings.geoEnabled)

  const summary = calculateDailySummary(entries)

  const handleCheckIn = async () => {
    const loc = await geo.capture()
    await addEntry('check-in', loc.latitude, loc.longitude)
  }

  const handleCheckOut = async () => {
    const loc = await geo.capture()
    await addEntry('check-out', loc.latitude, loc.longitude)
  }

  const handleBreakIn = async () => {
    const loc = await geo.capture()
    await addEntry('break-in', loc.latitude, loc.longitude)
  }

  const handleBreakOut = async () => {
    const loc = await geo.capture()
    await addEntry('break-out', loc.latitude, loc.longitude)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-md space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Time Tracker</h1>
          <div className="flex items-center gap-1">
            <HistoryDrawer />
            <SettingsDrawer />
          </div>
        </header>

        <Card>
          <CardContent className="p-6 space-y-6">
            <LiveClock />
            <StatusIndicator status={status} />

            <div className="grid grid-cols-3 gap-3">
              <StatCard label="Started" value={summary.startTime ? summary.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'} />
              <StatCard label="Break" value={formatDuration(summary.totalBreakSeconds)} />
              <StatCard label="Worked" value={formatDuration(summary.totalWorkSeconds)} />
            </div>

            <div className="space-y-3">
              <PrimaryActionButton
                status={status}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
                disabled={loading}
              />
              <SecondaryActionButton
                status={status}
                onBreakIn={handleBreakIn}
                onBreakOut={handleBreakOut}
                disabled={loading}
              />
            </div>
          </CardContent>
        </Card>

        <Timeline entries={entries} onUpdate={updateEntry} />
        <ManualEntryForm onAdded={refresh} />
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary p-3 text-center">
      <div className="text-lg font-semibold tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

export default App
