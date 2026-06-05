import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus } from 'lucide-react'
import type { TimeEntryType } from '@/db/schema'
import { addEntry as addEntryService } from '@/db/service'

interface ManualEntryFormProps {
  onAdded: () => void
}

export function ManualEntryForm({ onAdded }: ManualEntryFormProps) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<TimeEntryType>('check-in')
  const [dateValue, setDateValue] = useState('')
  const [timeValue, setTimeValue] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dateValue || !timeValue) return

    const timestamp = new Date(`${dateValue}T${timeValue}`)
    if (isNaN(timestamp.getTime())) return

    await addEntryService(type, { latitude: undefined, longitude: undefined })
    // Manually override timestamp by updating after creation... actually let's modify service
    // For simplicity, let's just create a direct db operation here
    const { db } = await import('@/db')
    const id = await db.entries.add({
      type,
      timestamp,
      date: timestamp.toISOString().split('T')[0],
    })
    if (id) {
      setOpen(false)
      onAdded()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Manual Entry
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Manual Entry</DialogTitle>
            <DialogDescription>
              Manually add a time entry for any date.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="entry-type">Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as TimeEntryType)}>
                <SelectTrigger id="entry-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="check-in">Check In</SelectItem>
                  <SelectItem value="break-in">Break Start</SelectItem>
                  <SelectItem value="break-out">Break End</SelectItem>
                  <SelectItem value="check-out">Check Out</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="entry-date">Date</Label>
                <Input
                  id="entry-date"
                  type="date"
                  value={dateValue}
                  onChange={(e) => setDateValue(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entry-time">Time</Label>
                <Input
                  id="entry-time"
                  type="time"
                  value={timeValue}
                  onChange={(e) => setTimeValue(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Add Entry</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
