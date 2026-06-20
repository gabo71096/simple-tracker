import { useState } from "react";
import { AppFooter } from "@/components/AppFooter";
import { HistoryDrawer } from "@/components/HistoryDrawer";
import { LiveClock } from "@/components/LiveClock";
import { ManualEntryForm } from "@/components/ManualEntryForm";
import { PrimaryActionButton } from "@/components/PrimaryActionButton";
import { SecondaryActionButton } from "@/components/SecondaryActionButton";
import { SettingsDrawer } from "@/components/SettingsDrawer";
import { StatusIndicator } from "@/components/StatusIndicator";
import { Timeline } from "@/components/Timeline";
import { Card, CardContent } from "@/components/ui/card";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useSettings } from "@/hooks/useSettings";
import { useTimeTracker } from "@/hooks/useTimeTracker";
import { calculateDailySummary, formatDuration } from "@/lib/summary";

function App() {
	const { status, entries, loading, addEntry, updateEntry, refresh } =
		useTimeTracker();
	const { settings } = useSettings();
	const geo = useGeolocation(settings.geoEnabled);
	const [processing, setProcessing] = useState(false);

	const summary = calculateDailySummary(entries);
	const earnings = (settings.hourlyRate * summary.totalWorkSeconds) / 3600;

	const withProcessing = (fn: () => Promise<void>) => async () => {
		setProcessing(true);
		try {
			await fn();
		} finally {
			setProcessing(false);
		}
	};

	const handleCheckIn = withProcessing(async () => {
		const loc = await geo.capture();
		await addEntry("check-in", loc.latitude, loc.longitude);
	});

	const handleCheckOut = withProcessing(async () => {
		const loc = await geo.capture();
		await addEntry("check-out", loc.latitude, loc.longitude);
	});

	const handleBreakIn = withProcessing(async () => {
		const loc = await geo.capture();
		await addEntry("break-in", loc.latitude, loc.longitude);
	});

	const handleBreakOut = withProcessing(async () => {
		const loc = await geo.capture();
		await addEntry("break-out", loc.latitude, loc.longitude);
	});

	return (
		<div className="min-h-screen bg-background p-4 md:p-8">
			<div className="mx-auto max-w-md space-y-6">
				<header className="flex items-center justify-between">
					<h1 className="text-xl font-semibold tracking-tight">
						Simple Tracker
					</h1>
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
							<StatCard
								label="Started"
								value={
									summary.startTime
										? summary.startTime.toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})
										: "--:--"
								}
							/>
							<StatCard
								label="Break"
								value={formatDuration(summary.totalBreakSeconds)}
							/>
							<StatCard
								label="Worked"
								value={formatDuration(summary.totalWorkSeconds)}
							/>
						</div>

						<div className="rounded-lg bg-secondary p-3 text-center">
							<div className="text-lg font-semibold tabular-nums">
								{settings.hourlyRate > 0
									? formatLocaleCurrency(earnings)
									: "--"}
							</div>
							<div className="text-xs text-muted-foreground">Earnings</div>
						</div>

						<div className="space-y-3">
							<PrimaryActionButton
								status={status}
								onCheckIn={handleCheckIn}
								onCheckOut={handleCheckOut}
								disabled={loading || processing}
							/>
							<SecondaryActionButton
								status={status}
								onBreakIn={handleBreakIn}
								onBreakOut={handleBreakOut}
								disabled={loading || processing}
							/>
						</div>
					</CardContent>
				</Card>

				<Timeline entries={entries} onUpdate={updateEntry} />
				<ManualEntryForm onAdded={refresh} />

				<AppFooter />
			</div>
		</div>
	);
}

function StatCard({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-lg bg-secondary p-3 text-center">
			<div className="text-lg font-semibold tabular-nums">{value}</div>
			<div className="text-xs text-muted-foreground">{label}</div>
		</div>
	);
}

function formatLocaleCurrency(value: number): string {
	// ponytail: incomplete locale-to-currency map; upgrade to a currency picker if users need more locales
	const locale =
		typeof navigator !== "undefined" ? navigator.language : "en-US";
	const currency =
		(
			{
				"en-US": "USD",
				"en-GB": "GBP",
				"en-CA": "CAD",
				"en-AU": "AUD",
				"de-DE": "EUR",
				"fr-FR": "EUR",
				"es-ES": "EUR",
				"it-IT": "EUR",
				"pt-BR": "BRL",
				"ja-JP": "JPY",
				"zh-CN": "CNY",
				"ko-KR": "KRW",
			} as Record<string, string>
		)[locale] ?? "USD";

	return new Intl.NumberFormat(undefined, {
		style: "currency",
		currency,
	}).format(value);
}

export default App;
