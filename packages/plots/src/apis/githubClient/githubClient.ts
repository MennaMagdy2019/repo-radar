import type { GitHubCommitResponse, GitHubRepositoryResponse } from '../../interfaces/githubApi';
import type { RepoDetails } from '../../interfaces/repository';

const GITHUB_API_URL = 'https://api.github.com';

/**
  * requestJson is a utility function that performs a fetch request to the specified URL and returns the parsed JSON response.
  * It handles HTTP errors and throws appropriate error messages for 404 and 403 status codes.
  * @template T - The expected type of the JSON response.
  * @param {string} url - The URL to fetch data from.
  * @param {AbortSignal} [signal] - An optional AbortSignal to cancel the request.
  * @returns Promise<T> - A promise that resolves to the parsed JSON response of type T.
 */
const requestJson = async <T>(url: string, signal?: AbortSignal): Promise<T> => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    if (response.status === 404) throw new Error('Repository not found.');
    if (response.status === 403) throw new Error('GitHub API rate limit reached.');
    throw new Error(`GitHub request failed (${response.status}).`);
  }

  return response.json() as Promise<T>;
};

/**
 * Fetches details for a specific GitHub repository.
 * @param repoName - The name of the repository.
 * @param signal - An optional AbortSignal to cancel the request.
 * @returns A promise that resolves to the repository details.
 */
export const fetchRepoDetails = async (repoName: string, signal?: AbortSignal): Promise<RepoDetails> => {
  const encodedRepoName = repoName.split('/').map(encodeURIComponent).join('/');
  const repository = await requestJson<GitHubRepositoryResponse>(`${GITHUB_API_URL}/repos/${encodedRepoName}`, signal);
  let lastCommitDate = repository.pushed_at;

  try {
    const commits = await requestJson<GitHubCommitResponse[]>(
      `${GITHUB_API_URL}/repos/${encodedRepoName}/commits?per_page=1`,
      signal,
    );
    lastCommitDate = commits[0]?.commit?.author?.date ?? lastCommitDate;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
  }

  return {
    id: repository.id,
    full_name: repository.full_name,
    stargazers_count: repository.stargazers_count,
    open_issues_count: repository.open_issues_count,
    last_commit_date: lastCommitDate,
  };
};