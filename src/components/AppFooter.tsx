"use client";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { ExternalLink } from "@/components/ExternalLink";

export function AppFooter() {
	return (
		<footer className="border-t px-4 py-8 text-center text-sm text-muted-foreground space-y-2">
			<p>Simple Tracker — free, offline, and private.</p>
			<ExternalLink
				href="https://github.com/gabo71096/simple-tracker"
				className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
			>
				<SiGithub className="h-4 w-4" />
				<span>View on GitHub</span>
			</ExternalLink>
			<p>
				Built by{" "}
				<ExternalLink
					href="https://gl-labs.dev"
					className="hover:text-foreground hover:underline transition-colors"
				>
					GL Labs
				</ExternalLink>
				.
			</p>
		</footer>
	);
}
