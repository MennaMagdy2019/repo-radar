import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MetricBarChart } from './MetricBarChart';

const baseProps = {
  title: 'Repository stars',
  seriesLabel: 'Stars',
  seriesColor: '#0284c7',
  emptyMessage: 'No repositories',
  ariaLabel: 'Repository stars chart',
};

describe('MetricBarChart', () => {
  it('renders the empty state', () => {
    render(<MetricBarChart {...baseProps} dataset={[]} />);

    expect(screen.getByText('Repository stars')).toBeInTheDocument();
    expect(screen.getByText('No repositories')).toBeInTheDocument();
  });

  it('renders a chart for metric data', () => {
    render(<MetricBarChart {...baseProps} dataset={[{ name: 'owner/repo', value: 10 }]} />);

    expect(screen.getByLabelText('Repository stars chart')).toBeInTheDocument();
    expect(screen.queryByText('No repositories')).not.toBeInTheDocument();
  });
});