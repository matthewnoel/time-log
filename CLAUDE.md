# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Rollup in watch mode; also spawns `sirv docs` so the app reloads on change.
- `npm run build` — Production Rollup build. Output is written to `docs/build/` (committed to git).
- `npm test` — Vitest single run. `npm run test:watch` and `npm run test:coverage` are also available.
- Run a single test file: `npx vitest run tests/time.test.ts`. Filter by name: `npx vitest run -t "formatDurationCell"`.
- `npm run licenses` — regenerates `third-party-licenses.txt` from `package.json`. CI runs this; regenerate locally if dependencies change.
- `npm run clean` — `git restore docs/build/*` to discard local build artifacts.

## Architecture

Single-page Svelte 5 app, no backend. All data lives in `window.localStorage`.

**Data model.** Each log entry is one localStorage key/value pair: the key is the integer-minute timestamp (`Math.floor(Date.now() / 60000)` as a string, see `src/lib/time.ts:minuteKeyFromTimestamp`), the value is the activity string. This intentionally caps writes at one per minute — `App.svelte` rejects a submit if the current minute key already exists. Durations are computed as the diff between consecutive sorted keys; the first entry shows `N/A`.

**Reserved key.** `THEME_STORAGE_KEY = 'theme'` (`src/lib/storage.ts`) is special-cased everywhere: `getActivityData` skips it when reading entries, and "New Day" calls `clearActivityDataPreservingTheme` which clears localStorage and restores only the theme. Any new non-entry localStorage key needs the same treatment.

**Activity coalescing.** On submit, if the new activity normalizes (`normalizeActivity` = lowercase + trim) to the same value as the previous entry, the previous entry's key is deleted before the new one is written. This collapses runs of the same activity into a single span.

**Svelte 5 runes.** Components use `$state` / `$derived` (see `App.svelte`). Form submission uses `preventDefault` from `svelte/legacy`. Don't switch back to Svelte 4 reactive syntax (`$:`).

## Build & deploy

The site is hosted on GitHub Pages from the `docs/` directory — that's why `docs/build/bundle.{js,css}` is built into the repo and committed. The `.github/workflows/build.yaml` workflow runs on every push: `npm ci && npm test && npm run build && npm run licenses`, then auto-commits the regenerated `docs/build/*` and `third-party-licenses.txt` via the "Build Bot" account. Don't worry about hand-committing build output for a PR; CI will replace it. Do not commit a broken build that CI can't recover from (e.g. failing tests block the auto-commit step).

The service worker registration in `docs/index.html` is hard-coded to scope `/time-log/` — keep that path in sync if the repo/site name changes.

## Testing notes

`tests/setup.ts` patches `window.matchMedia` and `Element.prototype.animate` because jsdom lacks them and `@zerodevx/svelte-toast` touches both at import time. If you add a dependency that needs more browser APIs in jsdom, extend setup there rather than per-test. `localStorage` and the `data-theme` attribute are cleared in `beforeEach`/`afterEach`.

Tests live in `tests/` (not co-located) and import from `src/`. The Vitest config is separate from Rollup (`vitest.config.ts` uses `@sveltejs/vite-plugin-svelte`); changes to Rollup plugins do not affect tests.
