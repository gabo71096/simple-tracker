import { Download, Settings, Upload } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { clearAllEntries, exportAllEntries, importEntries } from "@/db/service";
import { useSettings } from "@/hooks/useSettings";

export function SettingsDrawer() {
	const { settings, update } = useSettings();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleBackup = async () => {
		const entries = await exportAllEntries();
		const data = JSON.stringify(entries, null, 2);
		const blob = new Blob([data], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `time-tracker-backup-${new Date().toISOString().split("T")[0]}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleRestoreClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			const text = await file.text();
			const entries = JSON.parse(text);
			if (!Array.isArray(entries)) {
				alert("Invalid backup file format.");
				return;
			}
			if (
				!confirm(
					"This will replace all current data with the backup. Are you sure?",
				)
			) {
				return;
			}
			await clearAllEntries();
			await importEntries(entries);
			alert("Restore completed successfully.");
			window.location.reload();
		} catch {
			alert("Failed to restore backup. Please check the file format.");
		} finally {
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};

	return (
		<Sheet>
			<SheetTrigger
				render={
					<Button variant="ghost" size="icon" aria-label="Settings">
						<Settings className="h-5 w-5" />
					</Button>
				}
			/>
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

					<Separator />

					<div className="space-y-3">
						<h3 className="text-sm font-semibold">Data</h3>
						<div className="flex gap-3">
							<Button
								variant="outline"
								className="flex-1"
								onClick={handleBackup}
							>
								<Download className="mr-2 h-4 w-4" />
								Backup
							</Button>
							<Button
								variant="outline"
								className="flex-1"
								onClick={handleRestoreClick}
							>
								<Upload className="mr-2 h-4 w-4" />
								Restore
							</Button>
							<input
								ref={fileInputRef}
								type="file"
								accept="application/json"
								onChange={handleFileChange}
								className="hidden"
							/>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
