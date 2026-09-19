import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import StarIcon from '@mui/icons-material/StarBorder';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

export interface RepoCardData {
  stargazers_count: number;
  open_issues_count: number;
  last_commit_date: string;
}

export interface RepoCardProps {
  name: string;
  data?: RepoCardData;
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  onUntrack: () => void;
}

const formatCommitDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Unknown' : date.toLocaleDateString();
};

export const RepoCard: React.FC<RepoCardProps> = ({ name, data, isLoading, error, onRefresh, onUntrack }) => (
  <Card aria-busy={isLoading} variant="outlined" sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
    {isLoading && (
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(255,255,255,0.6)', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={28} />
      </Box>
    )}
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', wordBreak: 'break-all' }}>{name}</Typography>
      {error ? (
        <Alert severity="error" action={<Button size="small" color="inherit" onClick={onRefresh}>Retry</Button>}>{error}</Alert>
      ) : data ? (
        <Box>
          <Box sx={{ display: 'flex', gap: 3, mb: 1 }}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}><StarIcon fontSize="small" color="warning" /> {data.stargazers_count.toLocaleString()}</Typography>
            <Typography variant="body2">🐛 Issues: {data.open_issues_count}</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">Last commit: {formatCommitDate(data.last_commit_date)}</Typography>
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">Awaiting repository data...</Typography>
      )}
    </CardContent>
    <CardActions sx={{ bgcolor: '#f8fafc', borderTop: '1px solid #f1f5f9', justifyContent: 'space-between' }}>
      <Button size="small" startIcon={<RefreshIcon />} onClick={onRefresh} disabled={isLoading}>Refresh</Button>
      <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={onUntrack} disabled={isLoading}>Untrack</Button>
    </CardActions>
  </Card>
);
