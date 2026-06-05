import { format } from 'date-fns'
import { useEffect, useState } from 'react'

export function LiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center space-y-1">
      <div className="text-5xl font-mono font-bold tracking-tight tabular-nums">
        {format(time, 'HH:mm:ss')}
      </div>
      <p className="text-muted-foreground text-sm">{format(time, 'EEEE, MMMM d, yyyy')}</p>
    </div>
  )
}
