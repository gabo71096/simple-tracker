import {
	Clock,
	Download,
	Globe,
	MapPin,
	Shield,
	Smartphone,
} from "lucide-react";
import type { Metadata } from "next";
import BackgroundVideo from "next-video/background-video";
import { AppFooter } from "@/components/AppFooter";
import { ExternalLink } from "@/components/ExternalLink";
import { Link } from "@/components/Link";
import Iphone15Pro from "@/components/ui/iphone-15-pro";
import mockup from "../videos/mobile-mockup.mp4";
import { KoFiWidget } from "./components/KoFiWidget";

export const metadata: Metadata = {
	title: "Track your time, offline",
	description:
		"A free, privacy-first time tracking app that works offline. No account required.",
	openGraph: {
		title: "Track your time, offline | Simple Tracker",
		description:
			"A free, privacy-first time tracking app that works offline. No account required.",
	},
};

export default function HomePage() {
	return (
		<div className="min-h-screen flex flex-col">
			{/* Hero */}
			<section className="flex-1 flex flex-col items-center justify-center px-4 py-20">
				<div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div className="space-y-6 text-center lg:text-left">
						<div className="inline-flex items-center gap-2 rounded-full border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
							<Clock className="h-4 w-4" />
							<span>Free &amp; open source</span>
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
							Track your time,
							<br />
							<span className="text-primary">privately.</span>
						</h1>
						<p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
							Simple Tracker is a free, offline, privacy-first time tracking
							app. No account. No cloud. Just your data, on your device.
							Optionally tag your entries with your current location.
						</p>
						<div className="flex items-center justify-center lg:justify-start gap-4">
							<Link
								href="/track"
								className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/80 transition-colors"
							>
								Open App
							</Link>
							<ExternalLink
								href="https://github.com/gabo71096/simple-tracker"
								className="inline-flex items-center justify-center rounded-lg border bg-background px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
							>
								View on GitHub
							</ExternalLink>
						</div>
					</div>

					<div className="hidden lg:flex justify-center">
						<Iphone15Pro height={500} width={245}>
							<BackgroundVideo src={mockup} autoPlay loop muted playsInline />
						</Iphone15Pro>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="border-t bg-secondary/50 px-4 py-20">
				<div className="mx-auto max-w-5xl">
					<h2 className="text-center text-3xl font-bold tracking-tight mb-12">
						Why Simple Tracker?
					</h2>
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
						<FeatureCard
							icon={<Shield className="h-6 w-6" />}
							title="Privacy First"
							description="All data stays on your device. No servers, no tracking, no analytics."
						/>
						<FeatureCard
							icon={<Globe className="h-6 w-6" />}
							title="Works Offline"
							description="Track your hours anywhere, even without an internet connection."
						/>
						<FeatureCard
							icon={<MapPin className="h-6 w-6" />}
							title="Location Aware"
							description="Optionally tag your entries with your current location."
						/>
						<FeatureCard
							icon={<Download className="h-6 w-6" />}
							title="CSV Export"
							description="Export your time reports to CSV for payroll or invoicing."
						/>
						<FeatureCard
							icon={<Smartphone className="h-6 w-6" />}
							title="Installable"
							description="Add it to your home screen as a PWA for quick access."
						/>
					</div>
				</div>
			</section>

			{/* How it works */}
			<section className="px-4 py-20">
				<div className="mx-auto max-w-3xl">
					<h2 className="text-center text-3xl font-bold tracking-tight mb-12">
						How it works
					</h2>
					<div className="grid gap-8 sm:grid-cols-3">
						<StepCard
							step="1"
							title="Open"
							description="Launch the app in your browser — no signup needed."
						/>
						<StepCard
							step="2"
							title="Track"
							description="Check in, take breaks, and check out with one tap."
						/>
						<StepCard
							step="3"
							title="Export"
							description="Download your history as a CSV anytime you need it."
						/>
					</div>
				</div>
			</section>

			{/* Footer */}
			<AppFooter />
			<KoFiWidget />
		</div>
	);
}

function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className="rounded-xl border bg-card p-6 text-card-foreground space-y-3">
			<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
				{icon}
			</div>
			<h3 className="font-semibold">{title}</h3>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	);
}

function StepCard({
	step,
	title,
	description,
}: {
	step: string;
	title: string;
	description: string;
}) {
	return (
		<div className="flex flex-col items-center text-center space-y-3">
			<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
				{step}
			</div>
			<h3 className="font-semibold">{title}</h3>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	);
}
