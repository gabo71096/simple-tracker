import { format } from "date-fns";
import type { TimeEntry } from "@/db/schema";

export function generateCsv(entries: TimeEntry[]): string {
	const headers = ["Date", "Time", "Type", "Latitude", "Longitude", "Maps Link"];
	const rows = entries.map((entry) => {
		const mapsLink =
			entry.latitude != null && entry.longitude != null
				? `https://www.google.com/maps?q=${entry.latitude},${entry.longitude}`
				: "";
		return [
			entry.date,
			format(new Date(entry.timestamp), "HH:mm:ss"),
			entry.type,
			entry.latitude?.toString() ?? "",
			entry.longitude?.toString() ?? "",
			mapsLink,
		];
	});

	const escapeCsv = (val: string) => {
		if (val.includes(",") || val.includes('"') || val.includes("\n")) {
			return `"${val.replace(/"/g, '""')}"`;
		}
		return val;
	};

	return [headers, ...rows]
		.map((row) => row.map(escapeCsv).join(","))
		.join("\n");
}

export function downloadFile(
	content: string,
	filename: string,
	mimeType: string,
) {
	const blob = new Blob([content], { type: mimeType });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}
