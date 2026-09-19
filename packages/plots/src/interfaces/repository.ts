export interface RepoDetails {
  id: number;
  full_name: string;
  stargazers_count: number;
  open_issues_count: number;
  last_commit_date: string;
}

export interface RepoSearchResult {
  id: number;
  full_name: string;
}