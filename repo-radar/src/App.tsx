import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { AnalyticsPanel, DashboardHeader, SkipLink, TrackedRepoGrid } from '@radar/ui';

interface DashboardShellProps {
  mode: 'light' | 'dark';
  onModeChange: (mode: 'light' | 'dark') => void;
}

function DashboardShell({ mode, onModeChange }: DashboardShellProps) {
  return (
    <>
      <SkipLink targetId="main-content" />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Isolated Action Toolbar Header */}
        <DashboardHeader mode={mode} onModeChange={onModeChange} />

        {/* Master Content Layout Structure */}
        <Container component="main" id="main-content" tabIndex={-1} maxWidth="xl" sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {/* Isolated Real-Time Chart Monitors Column */}
            <AnalyticsPanel />

            {/* Isolated Custom Workspace Scroll Feed Column */}
            <TrackedRepoGrid />
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default DashboardShell;
