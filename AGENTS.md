# AGENTS.md

## Quick Start

- Package manager: **pnpm** (managed via mise: `node = lts`, `pnpm = 11`)
- Install: `pnpm install`
- Dev server: `pnpm dev` (Vite, port 5173)
- Production preview: `pnpm build && pnpm preview`

## Build & Typecheck

- Build: `pnpm build` runs `tsc -b && vite build`
- Two tsconfig references: `tsconfig.app.json` (src) + `tsconfig.node.json` (vite.config.ts)
- Strict TS rules that **will fail the build** if violated:
  - `verbatimModuleSyntax` — use `import type` for type-only imports
  - `noUnusedLocals` / `noUnusedParameters` — dead code breaks build
  - `erasableSyntaxOnly` — no `enum`, `namespace`, etc.

## Lint & Format

- **Biome** replaces ESLint and Prettier entirely.
- Scope: only `src/**` (configured in `biome.json`)
- Respects `.gitignore`.
- Style: tabs, double quotes, organize imports auto-enabled.
- Check: `pnpm lint`
- Fix: `pnpm lint:fix` or `pnpm format`

## Architecture

- Single Vite app. Entry: `src/main.tsx` → `src/App.tsx`
- **PWA**: service worker registered in `main.tsx`, cache-first strategy in `public/sw.js`, manifest in `public/manifest.json`
- **No backend API.** All data is local-only via Dexie (IndexedDB wrapper).
- Database schema: `src/db/index.ts` (Dexie v1, table `entries` with indexes `++id, date, type`)
- Path alias: `@/` → `./src` (Vite + TS both configured)

## UI & Styling

- Tailwind CSS v4 with `@theme inline` in `src/index.css`
- shadcn/ui configured with `style: "base-nova"`, `rsc: false`, `tsx: true`
- Animation: `tw-animate-css` imported in CSS
- Icons: `lucide-react`
- Font: Geist variable (`@fontsource-variable/geist`)
- Components live in `src/components/ui/` (shadcn) and `src/components/` (app)

## Testing

- **No test suite exists.** Do not guess at test commands.

## Gotchas

- Geolocation is gated behind a user setting (`useSettings` hook). When disabled, location is not captured.
- Database errors trigger `alert()` UI messages (quota exceeded, version mismatch).
