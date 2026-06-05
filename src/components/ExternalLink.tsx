import type { ComponentProps } from "react";

export function ExternalLink(
	props: Omit<ComponentProps<"a">, "target" | "rel">,
) {
	return <a {...props} target="_blank" rel="noopener noreferrer" />;
}
