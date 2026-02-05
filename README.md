# sic-quod-tsavorite.github.io

Personal portfolio website built as a single-page application with glassmorphism design, scroll-triggered animations, and gradients.

## Tech Stack

- **Runtime:** Bun
- **Build:** Vite
- **Framework:** React + TypeScript
- **Styling:** Tailwind CSS (Lightning CSS) + shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

```bash
bun install
bun dev
```

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `bun dev`         | Start dev server on localhost:5173       |
| `bun run build`   | Production build (tsc + Vite)            |
| `bun run preview` | Preview production build locally         |
| `bun check`       | ESLint fix + Prettier format + tsc check |

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that builds and deploys to GitHub Pages.
