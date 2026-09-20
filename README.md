# Repo Radar

Repo Radar is a GitHub repository monitoring dashboard for discovering projects, saving repositories to a personal watchlist, and reviewing repository activity in one focused workspace.

The dashboard combines GitHub search, tracked repository cards, analytics panels, and accessible light and dark themes. It is built as a TypeScript monorepo so the data layer, reusable UI, and application shell can evolve independently.

## Live Projects

- **Dashboard:** [repo-radar-phi.vercel.app](https://repo-radar-phi.vercel.app)
- **Storybook:** [mennamagdy2019.github.io/repo-radar](https://mennamagdy2019.github.io/repo-radar/?path=/story/ui-repocard--loaded)

## What You Can Do

- Search GitHub repositories from the dashboard.
- Track repositories that you want to revisit.
- View repository metrics and issue activity through dashboard charts.
- Refresh individual repositories or the complete tracked list.
- Keep tracked repositories and theme preferences in local storage.
- Switch between light and dark themes.
- Explore and test reusable components in Storybook.
- Navigate the dashboard with keyboard-friendly skip navigation and accessible UI states.

## Technology

- React 19 and TypeScript
- Vite for the application build
- Redux Toolkit and RTK Query for state, API requests, caching, and request lifecycle handling
- Material UI for the component system and theming
- Vitest and Testing Library for automated tests
- Storybook for component development and visual review
- GitHub Actions for Storybook deployment
- Vercel for the dashboard deployment

## Getting Started

### Requirements

- Node.js `24.10.0` or a compatible version supported by the project
- npm

The required Node version is recorded in [.node-version](.node-version). Storybook currently requires Node.js `20.19+` or `22.12+`.

### Install and run

From the repository root:

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Available Commands

Run these commands from the repository root:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dashboard in development mode. |
| `npm run build` | Type-check and build the production dashboard. |
| `npm run test` | Run the test suite once. |
| `npm run lint` | Check the application with Oxlint. |
| `npm run storybook` | Start the Storybook development server. |
| `npm run build-storybook` | Build Storybook for static hosting. |
| `npm run build:storybook` | Run the workspace-aware Storybook build. |

## Project Structure

This repository uses npm workspaces:

```text
.
├── packages/
│   ├── plots/       Data access, GitHub APIs, state, persistence, and shared interfaces
│   └── ui/          Reusable MUI components, charts, themes, tests, and stories
├── repo-radar/      Vite application shell and runtime providers
├── .github/         GitHub Actions workflows
├── package.json     Workspace scripts and shared development dependencies
└── vercel.json      Vercel configuration for the dashboard
```

### Responsibility boundaries

- `packages/plots` owns GitHub API clients, RTK Query endpoints, tracked repository state, typed interfaces, and local storage persistence.
- `packages/ui` owns reusable dashboard components, charts, theme configuration, component tests, and Storybook stories.
- `repo-radar` composes the application. `src/App.tsx` defines the dashboard layout, while `src/Root.tsx` provides Redux, theming, and theme persistence.

RTK Query manages remote repository data, caching, cancellation, loading and error states, and refresh orchestration. Redux stores the tracked repository names rather than duplicating the API response data.

## Testing and Quality Checks

Before opening a pull request, run:

```bash
npm run lint
npm run test
npm run build
npm run build-storybook
```

Storybook stories and component tests live close to the reusable components in `packages/ui`. Application and data-layer tests live beside their implementation files.

## Deployment

### Dashboard on Vercel

The root [vercel.json](vercel.json) installs dependencies from the repository root, runs `npm run build`, and serves `repo-radar/dist`.

Configure the Vercel project root as the repository root.

### Storybook on GitHub Pages

The workflow at [.github/workflows/deploy.yaml](.github/workflows/deploy.yaml) builds Storybook with Node.js 22 and publishes `repo-radar/storybook-static` whenever changes are pushed to `main`.
