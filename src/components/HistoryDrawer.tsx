import { format } from "date-fns";
import { Download, History, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { ExternalLink } from "@/components/ExternalLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import type { TimeEntry } from "@/db/schema";
import { getAllDates, getEntriesBetween } from "@/db/service";
import { downloadFile, generateCsv } from "@/lib/csv";
import { type DatePreset, getDateRange, presetOptions } from "@/lib/date-range";

const typeLabel: Record<string, string> = {
	"check-in": "Check In",
	"check-out": "Check Out",
	"break-in": "Break Start",
	"break-out": "Break End",
};

const typeColor: Record<string, string> = {
	"check-in":
		"bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
	"check-out":
		"bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
	"break-in":
		"bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
	"break-out":
		"bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
};

export function HistoryDrawer() {
	const [open, setOpen] = useState(false);
	const [preset, setPreset] = useState<DatePreset>("today");
	const [entries, setEntries] = useState<TimeEntry[]>([]);
	const [hasHistory, setHasHistory] = useState(false);
	const [historyLoading, setHistoryLoading] = useState(false);
	const [historyError, setHistoryError] = useState<string | null>(null);

	useEffect(() => {
		if (!open) return;
		setHistoryLoading(true);
		setHistoryError(null);
		const { start, end } = getDateRange(preset);
		Promise.all([
			getAllDates().then((dates) => setHasHistory(dates.length > 0)),
			getEntriesBetween(start, end).then(setEntries),
		])
			.catch((e) => {
				console.error("Failed to load history:", e);
				setHistoryError("Could not load history. Please try again.");
			})
			.finally(() => setHistoryLoading(false));
	}, [open, preset]);

	const handleDownload = () => {
		const { start, end } = getDateRange(preset);
		const csv = generateCsv(entries);
		downloadFile(csv, `time-report-${start}_to_${end}.csv`, "text/csv");
	};

	const grouped = groupByDate(entries);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger
				render={
					<Button variant="ghost" size="icon" aria-label="History">
						<History className="h-5 w-5" />
					</Button>
				}
			/>
			<SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
				<SheetHeader>
					<SheetTitle>History</SheetTitle>
				</SheetHeader>

				<div className="mt-4 space-y-4">
					<div className="flex items-center gap-2">
						<Select
							value={preset}
							onValueChange={(v) => setPreset(v as DatePreset)}
						>
							<SelectTrigger className="flex-1">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{presetOptions.map((opt) => (
									<SelectItem key={opt.value} value={opt.value}>
										{opt.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{entries.length > 0 && (
							<Button
								variant="outline"
								size="icon"
								onClick={handleDownload}
								aria-label="Download CSV"
							>
								<Download className="h-4 w-4" />
							</Button>
						)}
					</div>

					{historyError && (
						<p className="text-sm text-destructive text-center py-8">
							{historyError}
						</p>
					)}

					{!historyError && historyLoading && (
						<p className="text-sm text-muted-foreground text-center py-8">
							Loading history...
						</p>
					)}

					{!historyError && !historyLoading && !hasHistory && (
						<p className="text-sm text-muted-foreground text-center py-8">
							No history yet. Start tracking your time!
						</p>
					)}

					{!historyError &&
						!historyLoading &&
						hasHistory &&
						Object.keys(grouped).length === 0 && (
							<p className="text-sm text-muted-foreground text-center py-8">
								No entries for the selected period.
							</p>
						)}

					{Object.entries(grouped).map(([date, dayEntries]) => (
						<div key={date}>
							<h3 className="text-sm font-semibold text-muted-foreground mb-2">
								{format(new Date(`${date}T00:00:00`), "EEEE, MMMM d, yyyy")}
							</h3>
							<div className="space-y-2">
								{dayEntries.map((entry) => (
									<div
										key={entry.id}
										className="flex items-center justify-between rounded-lg border p-3"
									>
										<div className="flex items-center gap-3">
											<Badge
												variant="secondary"
												className={typeColor[entry.type]}
											>
												{typeLabel[entry.type]}
											</Badge>
											<span className="text-sm tabular-nums">
												{format(new Date(entry.timestamp), "HH:mm:ss")}
											</span>
										</div>
										{entry.latitude != null && entry.longitude != null && (
											<ExternalLink
												href={`https://www.google.com/maps?q=${entry.latitude},${entry.longitude}`}
												className="flex items-center gap-1 text-xs text-primary hover:underline"
											>
												<MapPin className="h-3 w-3" />
												Map
											</ExternalLink>
										)}
									</div>
								))}
							</div>
							<Separator className="my-3" />
						</div>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
}

function groupByDate(entries: TimeEntry[]): Record<string, TimeEntry[]> {
	return entries.reduce(
		(acc, entry) => {
			const date = entry.date;
			if (!acc[date]) acc[date] = [];
			acc[date].push(entry);
			return acc;
		},
		{} as Record<string, TimeEntry[]>,
	);
}
