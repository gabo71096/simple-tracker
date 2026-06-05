export type TimeEntryType = "check-in" | "check-out" | "break-in" | "break-out";

export interface TimeEntry {
	id?: number;
	type: TimeEntryType;
	timestamp: Date;
	date: string; // YYYY-MM-DD for easy querying
	latitude?: number;
	longitude?: number;
}

export interface DailySummary {
	date: string;
	startTime: Date | null;
	endTime: Date | null;
	totalWorkSeconds: number;
	totalBreakSeconds: number;
}

export type TrackerStatus = "checked-out" | "checked-in" | "on-break";
