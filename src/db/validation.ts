import { z } from "zod";

const timeEntryTypeSchema = z.enum([
	"check-in",
	"check-out",
	"break-in",
	"break-out",
]);

const backupEntrySchema = z
	.object({
		id: z.number().optional(),
		type: timeEntryTypeSchema,
		timestamp: z.string().datetime().transform((s) => new Date(s)),
		date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
		latitude: z.number().optional(),
		longitude: z.number().optional(),
	})
	.transform(({ type, timestamp, date, latitude, longitude }) => ({
		type,
		timestamp,
		date,
		latitude,
		longitude,
	}));

export const backupSchema = z.array(backupEntrySchema);

export type ValidatedBackupEntry = z.infer<typeof backupEntrySchema>;
