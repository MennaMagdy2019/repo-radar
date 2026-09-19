import { beforeEach, describe, expect, it } from 'vitest';
import { loadDashboardState, persistDashboardState } from './storage';

describe('dashboard storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads normalized repository names and cached data', () => {
    localStorage.setItem('tracked_repo_names', JSON.stringify([' owner/repo ', 'owner/repo', '']));
    expect(loadDashboardState()).toMatchObject({
      trackedRepoNames: ['owner/repo'],
    });
  });

  it('persists tracked names and repository data', () => {
    persistDashboardState({
      trackedRepoNames: ['owner/repo'],
    });

    expect(localStorage.getItem('tracked_repo_names')).toBe('["owner/repo"]');
  });
});