import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createRadarTheme } from '@radar/ui';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={createRadarTheme('light')}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    a11y: { test: 'todo' },
  },
};

export default preview;
