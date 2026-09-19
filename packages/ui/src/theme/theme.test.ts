import { describe, expect, it } from 'vitest';
import { createRadarTheme } from './theme';

describe('createRadarTheme', () => {
  it('creates themes for both supported modes', () => {
    expect(createRadarTheme('light').palette.mode).toBe('light');
    expect(createRadarTheme('dark').palette.mode).toBe('dark');
  });
});