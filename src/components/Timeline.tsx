import { format } from "date-fns";
import { Coffee, LogIn, LogOut, MapPin, Play } from "lucide-react";
import { useRef, useState } from "react";
import { ExternalLink } from "@/components/ExternalLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { TimeEntry } from "@/db/schema";

interface TimelineProps {
	entries: TimeEntry[];
	onUpdate: (id: number, timestamp: Date) => void;
}

const typeConfig: Record<
	string,
	{ label: string; icon: React.ReactNode; colorClass: string }
> = {
	"check-in": {
		label: "Check In",
		icon: <LogIn className="h-4 w-4" />,
		colorClass: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950",
	},
	"check-out": {
		label: "Check Out",
		icon: <LogOut className="h-4 w-4" />,
		colorClass: "text-slate-600 bg-slate-100 dark:bg-slate-800",
	},
	"break-in": {
		label: "Break Start",
		icon: <Coffee className="h-4 w-4" />,
		colorClass: "text-amber-600 bg-amber-50 dark:bg-amber-950",
	},
	"break-out": {
		label: "Break End",
		icon: <Play className="h-4 w-4" />,
		colorClass: "text-amber-600 bg-amber-50 dark:bg-amber-950",
	},
};

export function Timeline({ entries, onUpdate }: TimelineProps) {
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editValue, setEditValue] = useState("");
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [pendingUpdate, setPendingUpdate] = useState<{
		id: number;
		timestamp: Date;
	} | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const startEdit = (entry: TimeEntry) => {
		setEditingId(entry.id ?? null);
		setEditValue(format(new Date(entry.timestamp), "yyyy-MM-dd'T'HH:mm"));
		setTimeout(() => inputRef.current?.focus(), 0);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			submitEdit();
		} else if (e.key === "Escape") {
			setEditingId(null);
		}
	};

	const submitEdit = () => {
		if (editingId == null) return;
		const parsed = new Date(editValue);
		if (Number.isNaN(parsed.getTime())) {
			setEditingId(null);
			return;
		}
		setPendingUpdate({ id: editingId, timestamp: parsed });
		setConfirmOpen(true);
	};

	const confirmUpdate = () => {
		if (pendingUpdate) {
			onUpdate(pendingUpdate.id, pendingUpdate.timestamp);
		}
		setConfirmOpen(false);
		setEditingId(null);
		setPendingUpdate(null);
	};

	if (entries.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="text-base">Today's Activity</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground text-center py-4">
						No activity recorded today.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="text-base">Today's Activity</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					{entries.map((entry) => {
						const config = typeConfig[entry.type];
						const isEditing = editingId === entry.id;

						return (
							<div
								key={entry.id}
								className="flex items-center justify-between rounded-lg border p-3"
							>
								<div className="flex items-center gap-3 flex-1">
									<span
										className={`flex h-8 w-8 items-center justify-center rounded-full ${config.colorClass}`}
									>
										{config.icon}
									</span>
									<div className="flex-1">
										<div className="text-sm font-medium">{config.label}</div>
										{isEditing ? (
											<Input
												ref={inputRef}
												type="datetime-local"
												value={editValue}
												onChange={(e) => setEditValue(e.target.value)}
												onKeyDown={handleKeyDown}
												onBlur={() => setEditingId(null)}
												className="h-8 mt-1 text-sm"
											/>
										) : (
											<button
												type="button"
												onClick={() => startEdit(entry)}
												className="text-xs text-muted-foreground hover:text-foreground hover:underline cursor-pointer tabular-nums"
												title="Click to edit"
											>
												{format(new Date(entry.timestamp), "HH:mm:ss")}
											</button>
										)}
									</div>
								</div>
								{entry.latitude != null && entry.longitude != null && (
									<ExternalLink
										href={`https://www.google.com/maps?q=${entry.latitude},${entry.longitude}`}
										className="flex items-center gap-1 text-xs text-primary hover:underline ml-2"
										title="View location"
									>
										<MapPin className="h-3 w-3" />
										Map
									</ExternalLink>
								)}
							</div>
						);
					})}
				</CardContent>
			</Card>

			<Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Edit</DialogTitle>
						<DialogDescription>
							Are you sure you want to change this entry's timestamp to{" "}
							{pendingUpdate && format(pendingUpdate.timestamp, "PPpp")}?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="outline" onClick={() => setConfirmOpen(false)}>
							Cancel
						</Button>
						<Button onClick={confirmUpdate}>Confirm</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
