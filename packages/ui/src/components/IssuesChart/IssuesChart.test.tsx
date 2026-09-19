import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IssuesChart } from './IssuesChart';

describe('IssuesChart', () => {
  it('renders the open issues chart configuration', () => {
    render(<IssuesChart dataset={[{ name: 'owner/repo', issues: 2 }]} />);

    expect(screen.getByText('Open Issues Monitor')).toBeInTheDocument();
    expect(screen.getByLabelText('Open issues per tracked repository')).toBeInTheDocument();
  });
});