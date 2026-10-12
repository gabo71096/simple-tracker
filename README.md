# Simple Tracker

A free, privacy-first time tracking app that keeps your data local.

> The tracker app (`/track`) has been removed. A new app is on the way.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Q4U620VGO8)

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) 6
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Base Nova style)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Linting/Formatting:** [Biome](https://biomejs.dev/) (replaces ESLint + Prettier)
- **Video:** [next-video](https://next-video.dev/) (Mux-backed)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [pnpm](https://pnpm.io/) 11 (managed via [mise](https://mise.jdx.dev/))

### Installation

```bash
# Clone the repository
git clone https://github.com/gabo71096/simple-tracker.git
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
│   ├── privacy/             # Privacy policy page
│   ├── layout.tsx           # Root layout with metadata
│   ├── globals.css          # Tailwind v4 entry + theme variables
│   └── components/
│       └── KoFiWidget.tsx
├── src/
│   ├── components/          # App components + shadcn/ui primitives
│   ├── lib/                 # Utilities (cn())
│   └── global.d.ts
├── public/                  # Static assets
├── videos/                  # Video assets for landing page
├── next.config.ts
├── tsconfig.json
├── biome.json
└── components.json          # shadcn/ui configuration
```

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

## License

[MIT](./LICENSE) — In a nutshell: you can use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software, provided you include the original copyright notice and license. There is no warranty.
