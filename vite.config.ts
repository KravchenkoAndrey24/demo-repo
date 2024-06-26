import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build'
    },
    server: { port: 3000, open: true },
    plugins: [react()],
    define: {
      define: {
        'process.env': process.env
      }
    }
  };
});
