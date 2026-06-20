import { useEffect, useState } from "react";

export type Theme = "system" | "light" | "dark";

interface Settings {
	geoEnabled: boolean;
	theme: Theme;
	hourlyRate: number;
}

const defaultSettings: Settings = {
	geoEnabled: false,
	theme: "system",
	hourlyRate: 0,
};

function migrateLegacyTheme(stored: Record<string, unknown>): Partial<Settings> {
	if ("theme" in stored && stored.theme !== undefined) {
		return { theme: stored.theme as Theme };
	}

	// ponytail: one-time migration from old darkMode boolean; drop after a few releases
	if ("darkMode" in stored && typeof stored.darkMode === "boolean") {
		return { theme: stored.darkMode ? "dark" : "system" };
	}

	return {};
}

export function useSettings() {
	const [settings, setSettings] = useState<Settings>(() => {
		try {
			const stored = localStorage.getItem("tt-settings");
			if (!stored) return defaultSettings;
			const parsed = JSON.parse(stored) as Record<string, unknown>;
			return { ...defaultSettings, ...parsed, ...migrateLegacyTheme(parsed) };
		} catch {
			return defaultSettings;
		}
	});

	useEffect(() => {
		localStorage.setItem("tt-settings", JSON.stringify(settings));

		const applyTheme = () => {
			const isDark =
				settings.theme === "dark" ||
				(settings.theme === "system" &&
					window.matchMedia("(prefers-color-scheme: dark)").matches);
			document.documentElement.classList.toggle("dark", isDark);
		};

		applyTheme();

		if (settings.theme === "system") {
			const media = window.matchMedia("(prefers-color-scheme: dark)");
			const handler = () => applyTheme();
			media.addEventListener("change", handler);
			return () => media.removeEventListener("change", handler);
		}
	}, [settings]);

	const update = (partial: Partial<Settings>) => {
		setSettings((prev) => ({ ...prev, ...partial }));
	};

	return { settings, update };
}
