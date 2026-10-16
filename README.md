# Root Companion App 🌲

A comprehensive, rule-compliant tactical assistant for **Root: A Game of Woodland Might and Right**. Designed to reduce cognitive load and enhance your tabletop experience.

## ✨ Key Features

- **Setup Wizard 2.0**: Step-by-step game configuration supporting AdSet (Advanced Setup) and traditional Reach calculations.
- **Live Game Dashboard**: Track active factions, turn order, Hirelings, and Landmarks in real-time.
- **Interactive Map Visualizer**: Support for Autumn, Winter, Lake, and Mountain maps with specialized rules and features.
- **Smart Law of Root**: Fully indexed and searchable rules with interactive links directly from faction guides.
- **Battle Simulator**: Quick combat resolution integrating faction-specific abilities (Marauders expansion included).
- **PWA Ready**: Install as a mobile app and use offline during your sessions.

## 🚀 Quick Start

### Prerequisites
- Node.js 24 (see `.nvmrc`)
- pnpm 10 (enable it with `corepack enable pnpm`; the version is pinned in `package.json`)

### Installation
```bash
# Clone the repository
git clone https://github.com/Sinimus/root-companion.git

# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Build for production
pnpm build
pnpm start
```

## 🐳 Docker Support

```bash
# Build and run using Docker Compose
docker-compose up --build
```

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: GHCR image & PWA supported

## 📜 License
This project is licensed under the AGPL v3 License.

---
*Created by **Sinimus** – Dedicated to the Woodland community.*
