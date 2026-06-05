# Simple Tracker

A free, privacy-first, offline-capable time tracking Progressive Web App (PWA). No account required. All data stays on your device.

[Open App](https://simple-tracker.app/app) · [View Demo](https://simple-tracker.app) · [Report Bug](../../issues)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Q4U620VGO8)

---

## Features

- **One-Tap Tracking** — Check in, check out, and manage breaks with a single tap.
- **Real-Time Dashboard** — Live clock, status indicator, and running totals for work and break time.
- **Editable Timeline** — Review and edit today's entries. Tap any timestamp to adjust it.
- **Optional Geolocation** — Tag entries with GPS coordinates (disabled by default). View locations on Google Maps.
- **History & Export** — Browse past entries by date range and export to CSV.
- **Manual Entries** — Add missed check-ins or breaks for any past date.
- **Backup & Restore** — Export your full database to JSON and restore it later.
- **Dark Mode** — Toggle between light and dark themes.
- **Works Offline** — Installable PWA with service worker caching. Use it without an internet connection.
- **Privacy First** — No server, no tracking, no cookies. Everything is stored locally in your browser via IndexedDB.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) 6
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Base Nova style)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database:** [Dexie.js](https://dexie.org/) (IndexedDB wrapper)
- **Dates:** [date-fns](https://date-fns.org/)
- **Linting/Formatting:** [Biome](https://biomejs.dev/) (replaces ESLint + Prettier)
- **PWA:** Custom service worker + web manifest
- **Video:** [next-video](https://next-video.dev/) (Mux-backed)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [pnpm](https://pnpm.io/) 11 (managed via [mise](https://mise.jdx.dev/))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/simple-tracker.git
cd simple-tracker

# Install dependencies
pnpm install
```

### Development

```bash
# Start the dev server (port 3000)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
├── app/                     # Next.js App Router
│   ├── page.tsx             # Landing page (Server Component, SEO-optimized)
│   ├── app/page.tsx         # Tracker app (Client Component)
│   ├── layout.tsx           # Root layout with metadata & service worker registration
│   ├── globals.css          # Tailwind v4 entry + theme variables
│   └── components/
│       └── ServiceWorkerRegister.tsx
├── src/
│   ├── App.tsx              # Main tracker dashboard
│   ├── components/          # App components + shadcn/ui primitives
│   ├── hooks/               # useTimeTracker, useSettings, useGeolocation
│   ├── db/                  # Dexie schema, database instance, and service layer
│   ├── lib/                 # Utilities (CSV export, date ranges, summaries, cn())
│   └── global.d.ts
├── public/                  # Static assets
│   ├── manifest.json        # PWA manifest
│   ├── sw.js                # Custom service worker
│   └── icon-*.png           # App icons
├── videos/                  # Video assets for landing page
├── scripts/
│   └── record-mockup.ts     # Playwright script for demo video recording
├── next.config.ts
├── tsconfig.json
├── biome.json
└── components.json            # shadcn/ui configuration
```

---

## Architecture Overview

- **Landing Page (`/`)** — Server-rendered for SEO. Includes a hero section with a video mockup, feature grid, and "How it works" steps.
- **Tracker App (`/app`)** — Client-side route rendering the main dashboard. All interactivity and state management happen here.
- **No Backend API** — The app is fully static after build. All data is local-only via Dexie/IndexedDB.
- **PWA** — The service worker pre-caches static assets and uses runtime caching for Next.js chunks, enabling offline usage after the first visit.
- **Geolocation** — Gated behind a user setting. When disabled, no location data is requested or stored.

---

## Database Schema

Dexie v1 database with a single `entries` table:

| Field | Type | Description |
|---|---|---|
| `id` | `number` | Auto-incrementing primary key |
| `type` | `"check-in" \| "check-out" \| "break-in" \| "break-out"` | Entry type |
| `timestamp` | `Date` | Exact time of the entry |
| `date` | `string (YYYY-MM-DD)` | Indexed for fast range queries |
| `latitude` | `number?` | Optional GPS latitude |
| `longitude` | `number?` | Optional GPS longitude |

---

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run Biome checks |
| `pnpm lint:fix` | Auto-fix Biome issues |
| `pnpm format` | Format code with Biome |

---

## PWA & Offline Support

Simple Tracker is designed to work offline:

1. **Install** — Add it to your home screen from the browser menu.
2. **Use Offline** — Once visited, the app caches its assets and continues to function without a network connection.
3. **Data Persistence** — All your entries are stored in the browser's IndexedDB and survive browser restarts.

---

## Privacy

- **Zero server communication** for app functionality.
- **No accounts, no cookies, no analytics.**
- **Geolocation is opt-in** and disabled by default.
- **Your data is yours.** Export it anytime as JSON or CSV.

---

## License

[MIT](./LICENSE) — In a nutshell: you can use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software, provided you include the original copyright notice and license. There is no warranty.
