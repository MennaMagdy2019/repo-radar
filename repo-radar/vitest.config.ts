import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  root: '..',
  plugins: [react()],
  build: {
    // This forces Vite to put the 'dist' folder back inside your radar project directory
    outDir: resolve(__dirname, 'dist'), 
    emptyOutDir: true,
  },
  test: {
    include: ['repo-radar/src/**/*.test.{ts,tsx}', 'packages/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./repo-radar/src/test/setup.ts'],
    globals: true,
  },
});