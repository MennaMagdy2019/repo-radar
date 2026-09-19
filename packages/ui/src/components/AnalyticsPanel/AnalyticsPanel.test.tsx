import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AnalyticsPanel } from './AnalyticsPanel';

vi.mock('@radar/plots', () => ({
  useAppSelector: (selector: (state: unknown) => unknown) => selector({
    dashboard: {
      trackedRepoNames: ['owner/repo'],
    },
  }),
  githubApi: {
    endpoints: {
      getRepositoryDetails: {
        select: () => () => ({ data: { stargazers_count: 10, open_issues_count: 2 } }),
      },
    },
  },
}));

describe('AnalyticsPanel', () => {
  it('builds both metric views from dashboard data', () => {
    render(<AnalyticsPanel />);

    expect(screen.getByText('Stars Metrics Monitor')).toBeInTheDocument();
    expect(screen.getByText('Open Issues Monitor')).toBeInTheDocument();
  });
});