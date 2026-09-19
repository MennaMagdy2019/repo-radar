import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loadDashboardState } from '../../storage/storage';
import type { DashboardState } from '../../../interfaces/dashboard';
import { githubApi } from '../../../apis/githubSearchApi/githubSearchApi';

/**
 * Refreshes the data for all tracked repositories.
 * @returns {Promise<void>} - A promise that resolves when all repository data has been refreshed.
 */
export const refreshAllRepos = createAsyncThunk<void, void, { state: { dashboard: DashboardState } }>(
  'dashboard/refreshAllRepos',
  async (_, { getState, dispatch }) => {
    const { trackedRepoNames } = getState().dashboard;
    await Promise.allSettled(
      trackedRepoNames.map((name) => dispatch(
        githubApi.endpoints.getRepositoryDetails.initiate(name, { forceRefetch: true, subscribe: false }),
      ).unwrap()),
    );
  },
);

/**
 * Creates a Redux slice for managing the tracked repository names.
 * Repository data and request state are managed by RTK Query.
 */
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: loadDashboardState(),
  reducers: {
    trackRepo: (state, action: PayloadAction<string>) => {
      const repoName = action.payload.trim();
      if (repoName && !state.trackedRepoNames.includes(repoName)) state.trackedRepoNames.push(repoName);
    },
    untrackRepo: (state, action: PayloadAction<string>) => {
      state.trackedRepoNames = state.trackedRepoNames.filter((name) => name !== action.payload);
    },
  },
});

export const { trackRepo, untrackRepo } = dashboardSlice.actions;
export default dashboardSlice.reducer;