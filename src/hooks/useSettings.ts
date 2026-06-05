import { useEffect, useState } from "react";

interface Settings {
	geoEnabled: boolean;
	darkMode: boolean;
}

const defaultSettings: Settings = {
	geoEnabled: false,
	darkMode: false,
};

export function useSettings() {
	const [settings, setSettings] = useState<Settings>(() => {
		try {
			const stored = localStorage.getItem("tt-settings");
			return stored
				? { ...defaultSettings, ...JSON.parse(stored) }
				: defaultSettings;
		} catch {
			return defaultSettings;
		}
	});

	useEffect(() => {
		localStorage.setItem("tt-settings", JSON.stringify(settings));
		if (settings.darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [settings]);

	const update = (partial: Partial<Settings>) => {
		setSettings((prev) => ({ ...prev, ...partial }));
	};

	return { settings, update };
}
