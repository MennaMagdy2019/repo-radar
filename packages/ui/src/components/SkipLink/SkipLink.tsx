import React from 'react';
import Link from '@mui/material/Link';

export const SkipLink: React.FC<{ targetId: string }> = ({ targetId }) => (
  <Link
    href={`#${targetId}`}
    sx={{
      position: 'absolute',
      left: 8,
      top: 8,
      zIndex: 2000,
      transform: 'translateY(-200%)',
      '&:focus': { transform: 'translateY(0)' },
      bgcolor: 'background.paper',
      px: 2,
      py: 1,
    }}
  >
    Skip to main content
  </Link>
);
