import type { TrackerStatus } from "@/db/schema";
import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
	status: TrackerStatus;
}

const statusConfig: Record<
	TrackerStatus,
	{ label: string; dotClass: string; textClass: string }
> = {
	"checked-out": {
		label: "Checked Out",
		dotClass: "bg-slate-400",
		textClass: "text-slate-600 dark:text-slate-400",
	},
	"checked-in": {
		label: "Working",
		dotClass: "bg-emerald-500 animate-pulse",
		textClass: "text-emerald-600 dark:text-emerald-400",
	},
	"on-break": {
		label: "On Break",
		dotClass: "bg-amber-500 animate-pulse",
		textClass: "text-amber-600 dark:text-amber-400",
	},
};

export function StatusIndicator({ status }: StatusIndicatorProps) {
	const config = statusConfig[status];

	return (
		<div className="flex items-center justify-center gap-2">
			<span
				className={cn(
					"inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium bg-secondary",
					config.textClass,
				)}
			>
				<span className={cn("h-2.5 w-2.5 rounded-full", config.dotClass)} />
				{config.label}
			</span>
		</div>
	);
}
