import { defineConfig } from 'vite';
// base './' + __B so the build works from any sub-path or static host (assets are fetched relative to index.html).
export default defineConfig({ base: './', define: { __B: JSON.stringify('./') }, build: { chunkSizeWarningLimit: 2000 } });
