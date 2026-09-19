import { createTheme } from '@mui/material/styles';

/**
 * Creates a custom theme for the Radar application based on the specified mode.
 * @param mode The color mode ('light' or 'dark').
 * @returns The created theme.
 */
export const createRadarTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: { main: mode === 'dark' ? '#7dd3fc' : '#0369a1' },
    background: {
      default: mode === 'dark' ? '#0f172a' : '#f8fafc',
      paper: mode === 'dark' ? '#1e293b' : '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 8 } },
    },
  },
});
