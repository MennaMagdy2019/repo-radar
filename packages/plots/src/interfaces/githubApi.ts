import type { RepoSearchResult } from './repository';

export interface SearchResponse {
  items?: RepoSearchResult[];
}

export interface GitHubRepositoryResponse {
  id: number;
  full_name: string;
  stargazers_count: number;
  open_issues_count: number;
  pushed_at: string;
}

export interface GitHubCommitResponse {
  commit?: {
    author?: {
      date?: string;
    };
  };
}