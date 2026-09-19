import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TrackedRepoGrid } from './TrackedRepoGrid';

vi.mock('@radar/plots', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: (selector: (state: unknown) => unknown) => selector({
    dashboard: {
      trackedRepoNames: [],
    },
  }),
  useGetRepositoryDetailsQuery: () => ({ data: undefined, error: undefined, isFetching: false, refetch: vi.fn() }),
  untrackRepo: vi.fn(),
}));

describe('TrackedRepoGrid', () => {
  it('renders the empty tracked repository state', () => {
    render(<TrackedRepoGrid />);

    expect(screen.getByText('No tracked repositories')).toBeInTheDocument();
    expect(screen.getByText(/Search for a GitHub repository/)).toBeInTheDocument();
  });
});