import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fetchRepoDetails } from '../githubClient/githubClient';
import type { SearchResponse } from '../../interfaces/githubApi';
import type { RepoDetails, RepoSearchResult } from '../../interfaces/repository';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  tagTypes: ['RepositoryDetails', 'RepositorySearch'],
  endpoints: (builder) => ({
    getRepositoryDetails: builder.query<RepoDetails, string>({
      queryFn: async (repoName, { signal }) => {
        try {
          return { data: await fetchRepoDetails(repoName, signal) };
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') throw error;
          return {
            error: {
              status: 'CUSTOM_ERROR' as const,
              error: error instanceof Error ? error.message : 'Unable to load repository data.',
            },
          };
        }
      },
      providesTags: (_result, _error, repoName) => [{ type: 'RepositoryDetails', id: repoName }],
    }),
    searchRepositories: builder.query<RepoSearchResult[], string>({
      query: (query) => ({
        url: '/search/repositories',
        params: { q: query.trim(), per_page: 5 },
      }),
      transformResponse: (response: SearchResponse) => response.items ?? [],
      providesTags: (_result, _error, query) => [{ type: 'RepositorySearch', id: query.trim().toLowerCase() }],
    }),
  }),
});

export const { useGetRepositoryDetailsQuery, useLazySearchRepositoriesQuery } = githubApi;