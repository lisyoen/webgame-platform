import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8001,
    strictPort: true,
    allowedHosts: ['lisyoen2.iptime.org']
  }
});
