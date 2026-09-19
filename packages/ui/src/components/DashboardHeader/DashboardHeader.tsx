import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import { githubApi, refreshAllRepos, trackRepo, useAppDispatch, useAppSelector, useLazySearchRepositoriesQuery } from '@radar/plots';
import { DebouncedSearch } from '../DebouncedSearch/DebouncedSearch';
import { ThemeModeToggle } from '../ThemeModeToggle/ThemeModeToggle';
import { useCallback } from 'react';

interface DashboardHeaderProps {
  mode: 'light' | 'dark';
  onModeChange: (mode: 'light' | 'dark') => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ mode, onModeChange }) => {
  const dispatch = useAppDispatch();
  const [triggerSearch] = useLazySearchRepositoriesQuery();
  const { trackedRepoNames } = useAppSelector((state) => state.dashboard);
  
  const isRefreshing = useAppSelector((state) => trackedRepoNames.some((name) =>
    githubApi.endpoints.getRepositoryDetails.select(name)(state).status === 'pending'));
  const handleSearch = useCallback((query: string) => triggerSearch(query).unwrap(), [triggerSearch]);

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#0f172a' }}>
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>GitMonitor</Typography>
        
        <DebouncedSearch
          trackedRepos={trackedRepoNames}
          onSearch={handleSearch}
          onSelectTrack={(name) => { 
            dispatch(trackRepo(name)); 
          }}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ThemeModeToggle mode={mode} onChange={onModeChange} />
          <Button 
            variant="contained" 
            startIcon={<RefreshIcon />} 
            onClick={() => dispatch(refreshAllRepos())} 
            disabled={isRefreshing || trackedRepoNames.length === 0}
          >
            Refresh All
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
