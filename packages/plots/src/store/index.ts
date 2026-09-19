import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import dashboardReducer from './slices/dashboardSlice/dashboardSlice';
import { githubApi } from '../apis/githubSearchApi/githubSearchApi';
import { persistDashboardState } from './storage/storage';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
});

let lastTrackedRepoNames = store.getState().dashboard.trackedRepoNames;

/**
 * Subscribes to the Redux store and persists the dashboard state to local storage
 * whenever the tracked repository names change.
 * This ensures that the application state is saved across sessions.
 * The subscription checks if the relevant parts of the state have changed
 * before persisting to avoid unnecessary writes to local storage.
 */
store.subscribe(() => {
  const { trackedRepoNames } = store.getState().dashboard;
  if (trackedRepoNames === lastTrackedRepoNames) return;
  lastTrackedRepoNames = trackedRepoNames;
  persistDashboardState(store.getState().dashboard);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;