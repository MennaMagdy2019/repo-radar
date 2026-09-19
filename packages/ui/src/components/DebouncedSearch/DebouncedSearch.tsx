import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';
import type { RepoSearchResult } from '@radar/plots';

export type RepositorySearchResult = RepoSearchResult;

interface DebouncedSearchProps {
  trackedRepos: string[];
  onSearch: (query: string) => Promise<RepositorySearchResult[]>;
  onSelectTrack: (name: string) => void;
}

export const DebouncedSearch: React.FC<DebouncedSearchProps> = ({ trackedRepos, onSearch, onSelectTrack }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<RepositorySearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    let isCurrentRequest = true;
    setLoading(true);
    setError(null);
    const delay = setTimeout(async () => {
      try {
        const nextResults = await onSearch(normalizedQuery);
        if (isCurrentRequest) setResults(nextResults);
      } catch (error) {
        if (isCurrentRequest) {
          setResults([]);
          setError(error instanceof Error ? error.message : 'Search failed.');
        }
      } finally {
        if (isCurrentRequest) setLoading(false);
      }
    }, 450);

    return () => {
      isCurrentRequest = false;
      clearTimeout(delay);
    };
  }, [onSearch, query]);

  return (
    <Box sx={{ position: 'relative', width: { xs: '100%', sm: '380px' } }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search repositories..."
        label="Search repositories"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1, '& input': { color: 'white' } }}
        slotProps={{
          htmlInput: { 'aria-label': 'Search repositories' },
          input: {
            startAdornment: <SearchIcon sx={{ color: 'rgba(255,255,255,0.6)', mr: 1 }} />,
            endAdornment: loading && <CircularProgress size={18} color="inherit" />,
          },
        }}
      />
      {results.length > 0 && (
        <Paper sx={{ position: 'absolute', width: '100%', top: '42px', zIndex: 1400, boxShadow: 3 }}>
          <List disablePadding>
            {results.map((repo) => {
              const isTracked = trackedRepos.includes(repo.full_name);
              return (
                <ListItem key={repo.id} sx={{ borderBottom: '1px solid #f1f5f9' }}>
                  <ListItemText primary={repo.full_name} />
                  <Button size="small" variant="contained" disabled={isTracked} onClick={() => { onSelectTrack(repo.full_name); setQuery(''); setResults([]); }}>
                    {isTracked ? 'Tracked' : 'Track'}
                  </Button>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      )}
      {!loading && !error && query.trim() && results.length === 0 && (
        <Alert role="status" severity="info" sx={{ position: 'absolute', width: '100%', top: '42px', zIndex: 1400 }}>
          No repositories found.
        </Alert>
      )}
      {error && (
        <Alert role="alert" severity="error" sx={{ position: 'absolute', width: '100%', top: '42px', zIndex: 1400 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};
