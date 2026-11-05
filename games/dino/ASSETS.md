# Assets not included
`public/assets/` (textures, models, levels, sounds, music, demos, previews ≈ 15 MB) are extracted from the original shareware demo of "Dino and Aliens" (NevoSoft, 2004) and are third-party copyrighted, so they are NOT in this repo.
To run the port locally, extract them from your own copy of the demo into `games/dino/public/assets/` (layout as referenced by `src/formats.js`, `src/main.js`; see `FORMATS.md` for the container/asset formats), then `npm install && npm run dev`.
