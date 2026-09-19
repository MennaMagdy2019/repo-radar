import React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export interface ThemeModeToggleProps {
  mode: 'light' | 'dark';
  onChange: (mode: 'light' | 'dark') => void;
}

export const ThemeModeToggle: React.FC<ThemeModeToggleProps> = ({ mode, onChange }) => {
  const nextMode = mode === 'light' ? 'dark' : 'light';
  const label = `Switch to ${nextMode} mode`;

  return (
    <Tooltip title={label}>
      <IconButton color="inherit" aria-label={label} onClick={() => onChange(nextMode)}>
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
};
