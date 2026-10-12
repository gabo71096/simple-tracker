import { SiApple, SiGoogleplay } from "@icons-pack/react-simple-icons";
import { ExternalLink } from "@/components/ExternalLink";

// TODO: replace with live store URLs
const APP_STORE_URL = "https://apps.apple.com/app/id000000000";
const PLAY_STORE_URL =
	"https://play.google.com/store/apps/details?id=com.simpletracker.app";

const badgeClassName =
	"inline-flex items-center gap-2.5 rounded-lg bg-black px-4 py-2 text-white border border-white/15 transition-opacity hover:opacity-90";

export function StoreBadges() {
	return (
		<div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
			<ExternalLink
				href={APP_STORE_URL}
				aria-label="Download on the App Store"
				className={badgeClassName}
			>
				<SiApple className="h-7 w-7 shrink-0" />
				<span className="flex flex-col leading-tight text-left">
					<span className="text-[10px] font-medium tracking-wide">
						Download on the
					</span>
					<span className="text-lg font-semibold">App Store</span>
				</span>
			</ExternalLink>

			<ExternalLink
				href={PLAY_STORE_URL}
				aria-label="Get it on Google Play"
				className={badgeClassName}
			>
				<SiGoogleplay className="h-6 w-6 shrink-0" />
				<span className="flex flex-col leading-tight text-left">
					<span className="text-[10px] font-medium uppercase tracking-wide">
						Get it on
					</span>
					<span className="text-lg font-semibold">Google Play</span>
				</span>
			</ExternalLink>
		</div>
	);
}
