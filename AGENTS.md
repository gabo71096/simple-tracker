# AGENTS.md

> **Keep this file updated.** Whenever tooling, architecture, dependencies, or workflows change, update this file so agents always have the latest context.
>
> **Keep `README.md` updated too.** Any change to features, tech stack, project structure, or scripts must be reflected in the README.

## Quick Start

- Package manager: **pnpm** (managed via mise: `node = lts`, `pnpm = 11`)
- Install: `pnpm install`
- Dev server: `pnpm dev` (Next.js, port 3000)
- Production: `pnpm build && pnpm start`

## Build & Typecheck

- Build: `pnpm build` runs `next build`
- Single `tsconfig.json` with Next.js App Router defaults
- Strict TS rules that **will fail the build** if violated:
  - `verbatimModuleSyntax` — use `import type` for type-only imports
  - `noUnusedLocals` / `noUnusedParameters` — dead code breaks build
  - `erasableSyntaxOnly` — no `enum`, `namespace`, etc.

## Lint & Format

- **Biome** replaces ESLint and Prettier entirely.
- Scope: `src/**` and `app/**` (configured in `biome.json`)
- Respects `.gitignore`.
- Style: tabs, double quotes, organize imports auto-enabled.
- Check: `pnpm lint`
- Fix: `pnpm lint:fix` or `pnpm format`

## Commit Conventions

- Every commit message must use a lowercase prefix followed by a colon and a space.
- Valid prefixes: `feat: `, `fix: `, `chore: `, `refactor: `, `docs: `, `style: `, `test: `, etc.
- Example: `feat: add user authentication flow`

## Architecture

- **Next.js App Router**.
  - `/` — Landing page (Server Component, SEO-optimized)
  - `/track` — Tracker app (Client Component, Dexie/IndexedDB)
- **PWA**: service worker registered in `app/components/ServiceWorkerRegister.tsx`, runtime caching in `public/sw.js`, manifest in `public/manifest.json`
- **No backend API.** All data is local-only via Dexie (IndexedDB wrapper).
- Database schema: `src/db/index.ts` (Dexie v1, table `entries` with indexes `++id, date, type`)
- Path alias: `@/` → `./src` (Next.js + TS both configured)

## UI & Styling

- Tailwind CSS v4 with `@theme inline` in `app/globals.css`
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
- Client Components using React hooks must be marked with `"use client"`.
- Metadata exports are only allowed in Server Components; use `layout.tsx` for metadata in Client Component routes.
