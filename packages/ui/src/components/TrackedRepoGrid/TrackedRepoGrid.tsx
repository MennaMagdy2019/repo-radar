import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { untrackRepo, useAppDispatch, useAppSelector, useGetRepositoryDetailsQuery } from '@radar/plots';
import { RepoCard } from '../RepoCard/RepoCard';

const getQueryErrorMessage = (error: unknown) => {
  if (typeof error === 'object' && error !== null && 'error' in error && typeof error.error === 'string') {
    return error.error;
  }
  return error ? 'Unable to load repository data.' : null;
};

const TrackedRepoItem: React.FC<{ name: string; onUntrack: () => void }> = ({ name, onUntrack }) => {
  const { data, error, isFetching, refetch } = useGetRepositoryDetailsQuery(name);

  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <RepoCard
        name={name}
        data={data}
        isLoading={isFetching}
        error={getQueryErrorMessage(error)}
        onRefresh={() => { void refetch(); }}
        onUntrack={onUntrack}
      />
    </Grid>
  );
};

export const TrackedRepoGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  const { trackedRepoNames } = useAppSelector((state) => state.dashboard);

  return (
    <Grid 
      component="section" 
      aria-label="Tracked repositories" 
      size={{ xs: 12, md: 7 }} 
      sx={{ height: { md: 'calc(100vh - 120px)' }, overflowY: { md: 'auto' } }}
    >
      {trackedRepoNames.length === 0 ? (
        <Box sx={{ minHeight: 300, display: 'grid', placeItems: 'center', textAlign: 'center', border: '1px dashed', borderColor: 'divider', p: 4 }}>
          <Box>
            <Typography variant="h6" gutterBottom>No tracked repositories</Typography>
            <Typography color="text.secondary">Search for a GitHub repository above to add it to your dashboard.</Typography>
          </Box>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {trackedRepoNames.map((name) => (
            <TrackedRepoItem key={name} name={name} onUntrack={() => dispatch(untrackRepo(name))} />
          ))}
        </Grid>
      )}
    </Grid>
  );
};
