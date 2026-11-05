# Deploy
Build: `/opt/homebrew/bin/node node_modules/vite/bin/vite.js build` (or `npm run build`) -> `dist/` (~18 MB, static files only).
Paths are relative (vite `base: './'`, `__B` in vite.config.js), so `dist/` works from the site root or any sub-folder on any static host (nginx, GitHub Pages, Netlify, Cloudflare Pages, `python3 -m http.server`).
Requirements: serve over http(s) (not file://) — ES modules, fetch and the audio worklet need it. Audio starts after the first click/key (browser autoplay policy).
`?level=<name>` jumps straight into a level; without it the intro/menu runs. `UNLOCK_ALL` (src/config.js) controls the demo-limit bypass.
Note: assets come from the original shareware demo (non-commercial, local use).
