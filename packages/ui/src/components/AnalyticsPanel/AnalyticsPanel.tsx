import React, { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { createSelector } from 'reselect';
import { githubApi, useAppSelector } from '@radar/plots';
import type { RootState } from '@radar/plots';
import { AnalyticsChart } from '../AnalyticsChart/AnalyticsChart';
import { IssuesChart } from '../IssuesChart/IssuesChart';

const selectRepositoryQueries = createSelector(
  [
    (state: RootState) => state.dashboard.trackedRepoNames,
    (state: RootState) => state,
  ],
  (trackedRepoNames, state) => trackedRepoNames.map((name) => ({
    name,
    data: githubApi.endpoints.getRepositoryDetails.select(name)(state).data,
  })),
);

export const AnalyticsPanel: React.FC = () => {
  const repositoryQueries = useAppSelector(selectRepositoryQueries);

  const chartDataset = useMemo(
    () => repositoryQueries
      .map(({ name, data }) => ({
        name,
        stars: data?.stargazers_count ?? 0,
      }))
      .filter((item) => item.stars > 0),
    [repositoryQueries],
  );

  const issuesDataset = useMemo(
    () => repositoryQueries.map(({ name, data }) => ({
      name,
      issues: data?.open_issues_count ?? 0,
    })),
    [repositoryQueries],
  );

  return (
    <Grid size={{ xs: 12, md: 5 }} sx={{ height: { md: '50%', xs: '100%' } }}>
      <AnalyticsChart dataset={chartDataset} />
      <IssuesChart dataset={issuesDataset} />
    </Grid>
  );
};
