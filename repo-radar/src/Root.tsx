import { useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createRadarTheme } from '@radar/ui';
import App from './App';
import { store } from '@radar/plots';

const readThemeMode = (): 'light' | 'dark' => {
  try {
    return localStorage.getItem('radar_theme_mode') === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

export default function Root() {
  const [mode, setMode] = useState<'light' | 'dark'>(readThemeMode);
  const theme = useMemo(() => createRadarTheme(mode), [mode]);

  const handleModeChange = (nextMode: 'light' | 'dark') => {
    setMode(nextMode);
    try {
      localStorage.setItem('radar_theme_mode', nextMode);
    } catch {
      return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App mode={mode} onModeChange={handleModeChange} />
      </Provider>
    </ThemeProvider>
  );
}
