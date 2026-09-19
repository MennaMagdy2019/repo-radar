import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SkipLink } from './SkipLink';

describe('SkipLink', () => {
  it('links to the requested main content target', () => {
    render(<SkipLink targetId="main-content" />);

    expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveAttribute('href', '#main-content');
  });
});