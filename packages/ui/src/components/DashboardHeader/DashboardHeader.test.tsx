import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DashboardHeader } from './DashboardHeader';

vi.mock('@radar/plots', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: (selector: (state: unknown) => unknown) => selector({
    dashboard: { trackedRepoNames: [] },
  }),
  githubApi: {
    endpoints: {
      getRepositoryDetails: {
        select: () => () => ({ status: 'uninitialized' }),
      },
    },
  },
  useLazySearchRepositoriesQuery: () => [vi.fn()],
  refreshAllRepos: vi.fn(),
  trackRepo: vi.fn(),
}));

describe('DashboardHeader', () => {
  it('renders the product header and disables refresh without tracked repositories', () => {
    render(<DashboardHeader mode="light" onModeChange={vi.fn()} />);

    expect(screen.getByText('GitMonitor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refresh all/i })).toBeDisabled();
  });
});