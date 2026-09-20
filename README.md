# Repo Radar : https://repo-radar-phi.vercel.app?_vercel_share=NLvFBdCNhoUiatpq6P3b7vMK5qHClZxm

GitHub repository monitoring dashboard built with React 19, TypeScript, Redux Toolkit, RTK Query, and MUI.

## Links

website: https://repo-radar-phi.vercel.app?_vercel_share=NLvFBdCNhoUiatpq6P3b7vMK5qHClZxm
storybook: https://mennamagdy2019.github.io/repo-radar/?path=/story/ui-repocard--loaded
## Setup

Use Node.js `20.19+`. The required version is documented in `.node-version`.

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run build
npm run test
npm run lint
npm run storybook
```

The app runs through the `repo-radar` workspace directory and keeps the npm package name `radar`. Root scripts delegate to that workspace.

## Architecture

This is an npm-workspaces monorepo:

- `packages/plots`: repository interfaces, GitHub API clients, RTK Query API/cache, tracked-repository Redux state, typed hooks, and localStorage persistence.
- `packages/ui`: reusable MUI components, dashboard sections, charts, theme configuration, tests, and Storybook stories.
- `repo-radar`: Vite application shell and runtime providers.

`repo-radar/src/App.tsx` composes the dashboard. `repo-radar/src/Root.tsx` owns the Redux provider, theme provider, and theme persistence. `repo-radar/src/main.tsx` only bootstraps React.

RTK Query owns repository data, caching, request cancellation, loading/error state, individual refreshes, and refresh-all orchestration. The Redux slice stores only tracked repository names, avoiding duplicate server data in ordinary Redux state.


