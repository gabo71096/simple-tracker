import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useSettings } from '@/hooks/useSettings'
import { Settings } from 'lucide-react'

export function SettingsDrawer() {
  const { settings, update } = useSettings()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="geo-toggle" className="text-base">
                Geolocation
              </Label>
              <p className="text-sm text-muted-foreground">
                Capture location on check-in/out and breaks.
              </p>
            </div>
            <Switch
              id="geo-toggle"
              checked={settings.geoEnabled}
              onCheckedChange={(v) => update({ geoEnabled: v })}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="dark-toggle" className="text-base">
                Dark Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Use dark color scheme.
              </p>
            </div>
            <Switch
              id="dark-toggle"
              checked={settings.darkMode}
              onCheckedChange={(v) => update({ darkMode: v })}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
