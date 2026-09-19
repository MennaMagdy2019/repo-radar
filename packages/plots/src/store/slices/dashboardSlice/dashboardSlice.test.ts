import { describe, expect, it } from 'vitest';
import reducer, { trackRepo, untrackRepo } from './dashboardSlice';
import type { DashboardState } from '../../interfaces/dashboard';

const initialState: DashboardState = {
  trackedRepoNames: [],
};

describe('dashboardSlice', () => {
  it('trims repository names and avoids duplicates', () => {
    const tracked = reducer(initialState, trackRepo(' owner/repo '));
    const duplicate = reducer(tracked, trackRepo('owner/repo'));

    expect(duplicate.trackedRepoNames).toEqual(['owner/repo']);
  });

  it('removes a tracked repository name', () => {
    const state: DashboardState = {
      ...initialState,
      trackedRepoNames: ['owner/repo'],
    };

    const nextState = reducer(state, untrackRepo('owner/repo'));

    expect(nextState).toEqual(initialState);
  });
});