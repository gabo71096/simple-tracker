import type { Metadata } from "next";
import { AppFooter } from "@/components/AppFooter";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description:
		"How Simple Time Tracker handles your data: local-first, no accounts, nothing transmitted to our servers.",
};

const CONTACT_EMAIL = "hello@gl-labs.dev";

export default function PrivacyPage() {
	return (
		<div className="min-h-svh flex flex-col">
			<main className="flex-1 px-4 py-12 md:py-16">
				<article className="mx-auto w-full max-w-2xl text-base leading-relaxed text-foreground">
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
						Privacy Policy — Simple Time Tracker
					</h1>

					<div className="mt-4 space-y-1 text-sm text-muted-foreground">
						<p>
							<strong>Effective date:</strong> October 6, 2026
						</p>
						<p>
							<strong>Developer:</strong> GL Labs
						</p>
						<p>
							<strong>Contact:</strong>{" "}
							<a
								href={`mailto:${CONTACT_EMAIL}`}
								className="underline underline-offset-2 hover:text-foreground transition-colors"
							>
								{CONTACT_EMAIL}
							</a>
						</p>
					</div>

					<p className="my-4">
						Thank you for using Simple Time Tracker. This policy explains what
						information the app handles, how it is used, and the choices you
						have. We designed the app to be <strong>local-first</strong>: your
						data stays on your device and is not sent to us.
					</p>

					<h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">
						1. Information we collect
					</h2>
					<p className="my-4">
						Simple Time Tracker does <strong>not</strong> require an account and
						does <strong>not</strong> collect any personal information from you
						over a network.
					</p>
					<p className="my-4">
						The app stores data <strong>locally on your device</strong> so you
						can track your work time. This includes:
					</p>
					<ul className="my-4 list-disc space-y-2 pl-6">
						<li>
							<strong>Work sessions</strong> — check-in and check-out times,
							break durations, and the times you start and end breaks.
						</li>
						<li>
							<strong>Session details you enter</strong> — project name, hourly
							rate, notes, and tags.
						</li>
						<li>
							<strong>Location (optional)</strong> — if you enable location
							capture, the app records the latitude, longitude, and estimated
							accuracy for each check-in, check-out, or break. This is used only
							to tag your own work sessions and to let you open a saved location
							in your map app. You can turn this off at any time and delete
							stored locations from Settings.
						</li>
						<li>
							<strong>Settings</strong> — your hourly rate, currency, language,
							theme, notification preferences, and time-rounding preference.
						</li>
					</ul>
					<p className="my-4">
						All of this data is stored on your device in the app&apos;s private
						storage. We have no way to access it.
					</p>

					<h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">
						2. What we do NOT collect
					</h2>
					<ul className="my-4 list-disc space-y-2 pl-6">
						<li>
							We do <strong>not</strong> collect your name, email address, phone
							number, or contact details.
						</li>
						<li>
							We do <strong>not</strong> use analytics, advertising, or
							crash-reporting services.
						</li>
						<li>
							We do <strong>not</strong> track your location in the background
							or share it with anyone.
						</li>
						<li>
							We do <strong>not</strong> transmit your data to our servers or
							any third party.
						</li>
						<li>
							The app has <strong>no</strong> third-party SDKs that receive your
							data.
						</li>
					</ul>

					<h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">
						3. How your information is used
					</h2>
					<p className="my-4">
						Your data is used <strong>only</strong> to provide the app&apos;s
						features on your device, including:
					</p>
					<ul className="my-4 list-disc space-y-2 pl-6">
						<li>Starting, ending, and editing work sessions and breaks.</li>
						<li>Calculating earnings from your hourly rate and currency.</li>
						<li>
							Displaying dashboards and generating CSV, JSON, and PDF reports.
						</li>
						<li>
							Sending local reminders for long sessions, end-of-day checkout,
							and backups.
						</li>
						<li>Backing up and restoring your data when you choose to.</li>
					</ul>

					<h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">
						4. Permissions
					</h2>
					<ul className="my-4 list-disc space-y-2 pl-6">
						<li>
							<strong>Location</strong> — requested only when you perform a
							tracking action, and only if location capture is enabled. Location
							capture is best-effort: denying permission, disabling location
							services, or a timeout never prevents you from tracking your time.
						</li>
						<li>
							<strong>Notifications</strong> — used only to show the local
							reminders described above.
						</li>
					</ul>
					<p className="my-4">
						You can revoke either permission at any time in your device
						settings.
					</p>

					<h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">
						5. Data storage and retention
					</h2>
					<p className="my-4">
						Your data is stored only in the app&apos;s private on-device
						storage. It remains there until you delete it. You can remove
						individual entries, clear stored locations, or perform a full data
						reset from Settings at any time. Uninstalling the app deletes all
						locally stored data.
					</p>

					<h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">
						6. Backups and data sharing
					</h2>
					<p className="my-4">
						Backups and exports are initiated <strong>only by you</strong>. When
						you export a backup (JSON) or a report (CSV, JSON, or PDF), the file
						is handled by your device&apos;s share or file picker, and you
						choose where it is saved or shared. We do not receive, access, or
						transmit these files.
					</p>

					<h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">
						7. Data sharing with third parties
					</h2>
					<p className="my-4">
						We do <strong>not</strong> sell, rent, or share your information
						with third parties. The only time data leaves your device is when
						you explicitly export or share it yourself.
					</p>

					<h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">
						8. Children&apos;s privacy
					</h2>
					<p className="my-4">
						Simple Time Tracker is a general productivity tool and is not
						directed to children under 13. We do not knowingly collect personal
						information from children. Because the app collects no personal
						information over a network, no personal data of any user is
						transmitted to us.
					</p>

					<h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">
						9. Your rights
					</h2>
					<p className="my-4">
						Because your data is stored only on your device, you have full
						control over it at all times. You can view, edit, export, or delete
						any of your data from within the app. If you have questions or
						requests about your data, contact us at{" "}
						<a
							href={`mailto:${CONTACT_EMAIL}`}
							className="underline underline-offset-2 hover:text-foreground transition-colors"
						>
							{CONTACT_EMAIL}
						</a>
						.
					</p>

					<h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">
						10. Changes to this policy
					</h2>
					<p className="my-4">
						We may update this policy from time to time. The &quot;Effective
						date&quot; at the top indicates when it was last revised. Material
						changes will be reflected here.
					</p>

					<h2 className="text-xl font-semibold tracking-tight mt-10 mb-4">
						11. Contact us
					</h2>
					<p className="my-4">
						If you have any questions about this policy or the app, contact us
						at{" "}
						<strong>
							<a
								href={`mailto:${CONTACT_EMAIL}`}
								className="underline underline-offset-2 hover:text-foreground transition-colors"
							>
								{CONTACT_EMAIL}
							</a>
						</strong>
						.
					</p>
				</article>
			</main>
			<AppFooter />
		</div>
	);
}
