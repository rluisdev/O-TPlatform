import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      process: 'process/browser',
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
});
