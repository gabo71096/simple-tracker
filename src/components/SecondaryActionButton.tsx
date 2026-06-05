import { Button } from '@/components/ui/button'
import type { TrackerStatus } from '@/db/schema'
import { Coffee, Play, Loader2 } from 'lucide-react'

interface SecondaryActionButtonProps {
  status: TrackerStatus
  onBreakIn: () => void
  onBreakOut: () => void
  disabled?: boolean
}

export function SecondaryActionButton({
  status,
  onBreakIn,
  onBreakOut,
  disabled,
}: SecondaryActionButtonProps) {
  if (status === 'checked-out') {
    return null
  }

  if (status === 'on-break') {
    return (
      <Button
        size="lg"
        variant="outline"
        className="w-full h-12 text-base font-semibold"
        onClick={onBreakOut}
        disabled={disabled}
      >
        {disabled ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Play className="mr-2 h-5 w-5" />
        )}
        Resume Work
      </Button>
    )
  }

  return (
    <Button
      size="lg"
      variant="outline"
      className="w-full h-12 text-base font-semibold"
      onClick={onBreakIn}
      disabled={disabled}
    >
      {disabled ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <Coffee className="mr-2 h-5 w-5" />
      )}
      Take Break
    </Button>
  )
}
