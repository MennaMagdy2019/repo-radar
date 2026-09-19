import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RepoCard } from './RepoCard';

const baseProps = {
  name: 'owner/repo',
  data: {
    stargazers_count: 10,
    open_issues_count: 2,
    last_commit_date: '2026-09-18T00:00:00Z',
  },
  isLoading: false,
  error: null,
  onRefresh: vi.fn(),
  onUntrack: vi.fn(),
};

describe('RepoCard', () => {
  it('renders repository metrics and accessible actions', () => {
    render(<RepoCard {...baseProps} />);

    expect(screen.getByText('owner/repo')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText(/Issues: 2/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /untrack/i })).toBeInTheDocument();
  });

  it('shows errors and keeps retry accessible', () => {
    render(<RepoCard {...baseProps} error="Request failed" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Request failed');
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('uses a safe label for invalid cached dates', () => {
    render(<RepoCard {...baseProps} data={{ ...baseProps.data, last_commit_date: 'invalid' }} />);

    expect(screen.getByText('Last commit: Unknown')).toBeInTheDocument();
  });
});
