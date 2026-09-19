import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['repo-radar/src/**/*.test.{ts,tsx}', 'packages/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./repo-radar/src/test/setup.ts'],
    globals: true,
  },
});
