import React from 'react';
import '@testing-library/jest-dom/vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DebouncedSearch } from './DebouncedSearch';

afterEach(() => {
  vi.useRealTimers();
});

describe('DebouncedSearch', () => {
  it('debounces a search and renders results', async () => {
    vi.useFakeTimers();
    const onSearch = vi.fn().mockResolvedValue([{ id: 1, full_name: 'owner/repo' }]);

    render(<DebouncedSearch trackedRepos={[]} onSearch={onSearch} onSelectTrack={vi.fn()} />);
    fireEvent.change(screen.getByRole('textbox', { name: /search repositories/i }), { target: { value: 'owner/repo' } });

    expect(onSearch).not.toHaveBeenCalled();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(450);
    });

    expect(onSearch).toHaveBeenCalledWith('owner/repo');
    expect(screen.getByText('owner/repo')).toBeInTheDocument();
  });

  it('marks tracked results as unavailable to select', async () => {
    const onSearch = vi.fn().mockResolvedValue([{ id: 1, full_name: 'owner/repo' }]);
    render(<DebouncedSearch trackedRepos={['owner/repo']} onSearch={onSearch} onSelectTrack={vi.fn()} />);

    fireEvent.change(screen.getByRole('textbox', { name: /search repositories/i }), { target: { value: 'repo' } });
    expect(await screen.findByRole('button', { name: 'Tracked' })).toBeDisabled();
  });

  it('renders search errors', async () => {
    const onSearch = vi.fn().mockRejectedValue(new Error('Search unavailable'));
    render(<DebouncedSearch trackedRepos={[]} onSearch={onSearch} onSelectTrack={vi.fn()} />);

    fireEvent.change(screen.getByRole('textbox', { name: /search repositories/i }), { target: { value: 'repo' } });
    expect(await screen.findByRole('alert')).toHaveTextContent('Search unavailable');
  });
});