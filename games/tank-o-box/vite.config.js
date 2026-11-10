import { defineConfig } from 'vite';
// base './' so the build works from any sub-path; assets fetched relative to index.html (public/assets).
export default defineConfig({ base: './', server: { port: 5173, host: '127.0.0.1' }, build: { chunkSizeWarningLimit: 2000 } });
