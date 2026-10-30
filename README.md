# Root Companion App

A companion web app for the board game **Root: A Game of Woodland Might and Right**. It handles game setup, per-faction turn guides, trackers for Hirelings, Landmarks and the Vagabond, a battle helper and a searchable copy of the Law of Root. Rules data follows the **Law of Root, October 2025 edition**.

## Features

- **Setup wizard**: picks factions for 2 to 6 players and checks them against the recommended Reach, or runs the Advanced Setup (AdSet) draft. The AdSet draft uses one shared pool and supports 2 to 4 players in the UI. The wizard also shows the map visualizer.
- **Maps**: Autumn, Winter, Lake and Mountain, modelled from the official boards.
- **Play view**: one page per faction with a turn guide. The Vagabond has an inventory manager (character starting items, tracks, Damaged box, item limit) and the Lord of the Hundreds has a Hoard tracker.
- **Tools**: Battle wizard, card database, Hirelings, Landmarks, Law of Root viewer with search, glossary, and an About page.
- **Law search**: all 701 rules of the Oct 2025 Law are indexed. Searching a rule number matches that rule and its sub-rules only.
- **Factions**: the 11 entries in `src/data/factions.ts` (Marquise de Cat, Eyrie Dynasties, Woodland Alliance, two Vagabonds, Lizard Cult, Riverfolk Company, Underground Duchy, Corvid Conspiracy, Lord of the Hundreds, Keepers in Iron).

Game state (setup and trackers) is kept in the browser with `localStorage`; there is no backend or database.

## Requirements

- Node.js 24 (see `.nvmrc`; CI and the Docker image both use 24)
- pnpm 10 (enable it with `corepack enable pnpm`; the version is pinned in `package.json`, the lockfile is `pnpm-lock.yaml`)

## Run locally

```bash
git clone https://github.com/Sinimus/root-companion.git
cd root-companion
pnpm install --frozen-lockfile
pnpm dev           # http://localhost:3000
```

Production build:

```bash
pnpm build
pnpm start
```

`next.config.mjs` sets `output: 'standalone'`, which the Docker image relies on.

`public/sw.js` is a self-removing service worker. The app used to be a PWA; browsers that still have the old worker installed fetch this file, which clears their caches and unregisters the worker. It can be deleted once no such browser is left.

pnpm settings live in `pnpm-workspace.yaml`: `minimumReleaseAge` (7 days), exact versions on `pnpm add` and the install scripts that are skipped. Versions in `package.json` are exact, without `^` or `~`.

## Tests and lint

CI runs these in this order on every push and pull request to `main` or `master`:

```bash
pnpm install --frozen-lockfile
pnpm lint          # ESLint 9, flat config in eslint.config.mjs
pnpm format:check  # Prettier, config in .prettierrc.json
pnpm test          # jest, jsdom environment
```

Tests live in `__tests__/` (components, data, utils). The data integrity tests check that every rule reference in the guides, glossary and rules database resolves in the Law text, and that map, deck, hireling and landmark data satisfy their invariants. `next build` (with `--webpack`, which the PWA plugin needs) type-checks the code but does not run ESLint, so run `pnpm lint` separately. The build writes the service worker `public/sw.js` and `public/workbox-*.js`; they are not tracked in git.

## Docker

```bash
docker compose up --build
```

The app is served on `http://localhost:3000`. The compose file builds the local `Dockerfile` (multi-stage, `node:24-alpine`, pnpm through corepack) and tags the result `root-companion-app:latest`. The container runs as the non-root user `nextjs`, starts `node server.js` and listens on IPv4 and IPv6 (`HOSTNAME "::"`), because a platform healthcheck calling `http://localhost:3000` resolves `localhost` to `::1` first.

## CI/CD and deployment

The workflow `.github/workflows/ci-cd.yml` has three jobs.

1. **test**: checkout, pnpm, Node 24, `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm format:check`, `pnpm test`. Runs on pushes and pull requests to `main` or `master`, and on manual dispatch.
2. **docker-build**: runs only after `test` passes, and only on pull requests. It builds the production image from the Dockerfile without pushing it and checks that the container answers on port 3000 and serves `/sw.js`, so a broken Dockerfile fails before the merge deploys it.
3. **build-and-push**: runs only after `test` passes, and only for a push or manual dispatch on `main` or `master`. It logs in to GHCR with `GITHUB_TOKEN`, builds the Dockerfile and pushes `ghcr.io/<owner>/<repo>` with the tags `latest` and `sha-<short sha>`. It then sends a POST to the Coolify deploy API and fails the job unless the HTTP status is 2xx. The request authenticates with the repository secret `COOLIFY_TOKEN`.

Pull requests run the test and docker-build jobs; only a push or manual dispatch on `main` or `master` deploys. To redeploy without a commit, start the workflow manually from the Actions tab.

## Data sources and maintenance

- `src/data/law_full.ts` is generated from the official Law PDF: `uv run --with pymupdf python scripts/extract_law.py <Root_Base_Law_Oct_2025.pdf>`.
- `scripts/export_strategy.py <output.md>` writes the faction guides to a Markdown file.
- `docs/audit-2026-09-27-law.md` is the rules audit of the app data against the Law. `docs/fix-2026-10-02-law.md` and `docs/fix-2026-10-17-law.md` list what was fixed in two rounds; the open items are in the later one.

## Tech stack

- Next.js 16 (App Router, webpack build), React 19, TypeScript
- Tailwind CSS 4, Lucide React
- Jest 30 with Testing Library, ESLint 9 with `eslint-config-next`, Prettier
- Docker image on GHCR, deployed through Coolify

## License

AGPL v3, see `LICENSE`.

Created by **Sinimus**.
