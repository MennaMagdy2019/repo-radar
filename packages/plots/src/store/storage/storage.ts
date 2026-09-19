import type { DashboardState } from '../../interfaces/dashboard';

const TRACKED_REPOSITORIES_KEY = 'tracked_repo_names';

const getStorage = (): Storage | null => {
  if (typeof globalThis.localStorage === 'undefined') return null;

  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
};

/**
 * Reads a JSON value from localStorage and validates it.
 * @param key - The key to read from localStorage.
 * @param fallback - The fallback value if the key is not found or invalid.
 * @param isValid - A function to validate the parsed value.
 * @returns The parsed and validated value or the fallback.
 */
const readJson = <T>(key: string, fallback: T, isValid: (value: unknown) => value is T): T => {
  try {
    const storage = getStorage();
    if (!storage) return fallback;
    const value = storage.getItem(key);
    const parsed: unknown = value ? JSON.parse(value) : undefined;
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

/**
 * Validates that a value is an array of strings.
 * @param value - The value to validate.
 * @returns True if the value is an array of strings, false otherwise.
 */
const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

/**
 * Loads the dashboard state from localStorage.
 * @returns The loaded dashboard state.
 */
export const loadDashboardState = (): DashboardState => ({
  trackedRepoNames: [...new Set(readJson(TRACKED_REPOSITORIES_KEY, [], isStringArray)
    .map((name) => name.trim())
    .filter(Boolean))],
});

/**
 * Persists the dashboard state to localStorage.
 * @param state - The dashboard state to persist.
 * @returns 
 */
export const persistDashboardState = ({ trackedRepoNames }: DashboardState) => {
  try {
    const storage = getStorage();
    if (!storage) return;
    storage.setItem(TRACKED_REPOSITORIES_KEY, JSON.stringify(trackedRepoNames));
  } catch {
    return;
  }
};