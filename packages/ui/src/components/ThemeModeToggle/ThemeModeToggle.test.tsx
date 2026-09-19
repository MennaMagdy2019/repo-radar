import React from 'react';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeModeToggle } from './ThemeModeToggle';

describe('ThemeModeToggle', () => {
  it('requests dark mode from light mode', () => {
    const onChange = vi.fn();
    render(<ThemeModeToggle mode="light" onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /switch to dark mode/i }));
    expect(onChange).toHaveBeenCalledWith('dark');
  });
});