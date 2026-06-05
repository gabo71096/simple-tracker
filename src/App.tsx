import { Card, CardContent } from '@/components/ui/card'

function App() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-md space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Time Tracker</h1>
        </header>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="text-5xl font-mono font-bold tracking-tight">
                00:00:00
              </div>
              <p className="text-muted-foreground text-sm">Current Time</p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                Checked Out
              </span>
            </div>

            <div className="space-y-3">
              <button className="w-full h-14 text-lg font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Check In
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
