import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AnalyticsChart } from './AnalyticsChart';

describe('AnalyticsChart', () => {
  it('renders the stars chart configuration', () => {
    render(<AnalyticsChart dataset={[{ name: 'owner/repo', stars: 10 }]} />);

    expect(screen.getByText('Stars Metrics Monitor')).toBeInTheDocument();
    expect(screen.getByLabelText('Stars per tracked repository')).toBeInTheDocument();
  });
});