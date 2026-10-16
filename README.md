# Root Companion App

A companion web app for the board game **Root: A Game of Woodland Might and Right**. It handles game setup, per-faction turn guides, trackers for Hirelings, Landmarks and the Vagabond, a battle helper and a searchable copy of the Law of Root. Rules data follows the **Law of Root, October 2025 edition**.

## Features

- **Setup wizard**: picks factions for 2 to 6 players and checks them against the recommended Reach, or runs the Advanced Setup (AdSet) draft. The AdSet draft uses one shared pool and supports 2 to 4 players in the UI. The wizard also shows the map visualizer.
- **Maps**: Autumn, Winter, Lake and Mountain, modelled from the official boards.
- **Play view**: one page per faction with a turn guide. The Vagabond has an inventory manager (character starting items, tracks, Damaged box, item limit) and the Lord of the Hundreds has a Hoard tracker.
- **Tools**: Battle wizard, card database, Hirelings, Landmarks, Law of Root viewer with search, glossary, and an About page.
- **Law search**: all 701 rules of the Oct 2025 Law are indexed. Searching a rule number matches that rule and its sub-rules only.
- **Factions**: the 11 entries in `src/data/factions.ts` (Marquise de Cat, Eyrie Dynasties, Woodland Alliance, two Vagabonds, Lizard Cult, Riverfolk Company, Underground Duchy, Corvid Conspiracy, Lord of the Hundreds, Keepers in Iron).
- **PWA**: configured with `@ducanh2912/next-pwa` and a web manifest, so it can be installed on a phone. The service worker is disabled in development.

Game state (setup and trackers) is kept in the browser with `localStorage`; there is no backend or database.

## Requirements

- Node.js 20 (CI and the Docker image both use 20)
- npm (the lockfile is `package-lock.json`)

## Run locally

```bash
git clone https://github.com/Sinimus/root-companion.git
cd root-companion
npm ci
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

`next.config.mjs` sets `output: 'standalone'`, which the Docker image relies on.

## Tests and lint

CI runs these in this order on every push and pull request to `main` or `master`:

```bash
npm ci
npm run lint       # next lint, config in .eslintrc.json
npm test           # jest, jsdom environment
```

Tests live in `__tests__/` (components, data, utils). The data integrity tests check that every rule reference in the guides, glossary and rules database resolves in the Law text, and that map, deck, hireling and landmark data satisfy their invariants. `next build` does not run ESLint (`eslint.ignoreDuringBuilds` is true), so run `npm run lint` separately.

## Docker

```bash
docker compose up --build
```

The app is served on `http://localhost:3000`. The compose file builds the local `Dockerfile` (multi-stage, `node:20-alpine`) and tags the result `root-companion-app:latest`. The container runs as the non-root user `nextjs`, starts `node server.js` and listens on IPv4 and IPv6 (`HOSTNAME "::"`), because a platform healthcheck calling `http://localhost:3000` resolves `localhost` to `::1` first.

## CI/CD and deployment

The workflow `.github/workflows/ci-cd.yml` has two jobs.

1. **test**: checkout, Node 20, `npm ci`, `npm run lint`, `npm test`. Runs on pushes and pull requests to `main` or `master`, and on manual dispatch.
2. **build-and-push**: runs only after `test` passes, and only for a push or manual dispatch on `main` or `master`. It logs in to GHCR with `GITHUB_TOKEN`, builds the Dockerfile and pushes `ghcr.io/<owner>/<repo>` with the tags `latest` and `sha-<short sha>`. It then sends a POST to the Coolify deploy API and fails the job unless the HTTP status is 2xx. The request authenticates with the repository secret `COOLIFY_TOKEN`.

Pull requests run the test job only. To redeploy without a commit, start the workflow manually from the Actions tab.

## Data sources and maintenance

- `src/data/law_full.ts` is generated from the official Law PDF: `uv run --with pymupdf python scripts/extract_law.py <Root_Base_Law_Oct_2025.pdf>`.
- `scripts/export_strategy.py <output.md>` writes the faction guides to a Markdown file.
- `docs/audit-2026-09-27-law.md` is the rules audit of the app data against the Law. `docs/fix-2026-10-02-law.md` lists what was fixed and the open items (for example, the AdSet draft is limited to 2 to 4 players in the UI, and the Hireling tool does not track the H.1.3 exemption for a hireling gained this turn).

## Tech stack

- Next.js 14.2 (App Router), React 18, TypeScript
- Tailwind CSS 3, Lucide React
- Jest 30 with Testing Library, ESLint with `next/core-web-vitals`
- Docker image on GHCR, deployed through Coolify

## License

AGPL v3, see `LICENSE`.

Created by **Sinimus**.
