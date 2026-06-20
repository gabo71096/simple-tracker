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

export function useSettings() {
	const [settings, setSettings] = useState<Settings>(() => {
		try {
			const stored = localStorage.getItem("tt-settings");
			const parsed = stored ? (JSON.parse(stored) as Partial<Settings>) : {};
			return { ...defaultSettings, ...parsed, theme: parsed.theme ?? "system" };
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
