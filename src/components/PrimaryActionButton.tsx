import { Loader2, LogIn, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { TrackerStatus } from '@/db/schema'

interface PrimaryActionButtonProps {
  status: TrackerStatus
  onCheckIn: () => void
  onCheckOut: () => void
  disabled?: boolean
}

export function PrimaryActionButton({
  status,
  onCheckIn,
  onCheckOut,
  disabled,
}: PrimaryActionButtonProps) {
  if (status === 'checked-out') {
    return (
      <Button
        size="lg"
        className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
        onClick={onCheckIn}
        disabled={disabled}
      >
        {disabled ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <LogIn className="mr-2 h-5 w-5" />
        )}
        Check In
      </Button>
    )
  }

  return (
    <Button
      size="lg"
      variant="destructive"
      className="w-full h-14 text-lg font-semibold"
      onClick={onCheckOut}
      disabled={disabled}
    >
      {disabled ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <LogOut className="mr-2 h-5 w-5" />
      )}
      Check Out
    </Button>
  )
}
