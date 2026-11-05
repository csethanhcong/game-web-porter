# ASSET AUDIT - Dino and Aliens demo vs dino_web

Source of truth: `DinoAndAliens.exe` (dino_extracted/DinoAndAliens.exe, 1.3 MB). Rule: evidence from the binary only.

## Method and limits

- decomp.c was not present on disk and no REA/Ghidra session was used. Evidence = (1) every NUL-terminated string of the exe (incl. tail-merged suffixes), (2) every 4-byte little-endian immediate in .text/.rdata/.data/.data1 equal to a string VA (xref), (3) containing function = nearest preceding CALL-target/`push ebp;mov ebp,esp` start in .text (heuristic; matches Ghidra `FUN_` names used in FORMATS.md where the same address is cited). `FUN_004091fa` and similar odd addresses are interior addresses of the level object factory (switch after FUN_00406f40/FUN_00407890), not a separate function.
- sprintf patterns found in the exe: `bottom%i.cgo`, `bottom%ia.cgo`, `paporotnik%i.cgo`, `oduvan%i.cgo`, `penek%i.cgo`, `zabor0%i[_bok].cgo`, `paling0%i[_bok].cgo`, `tree%i[dry].cgo`, `water0%i.jpg`/`water%i.jpg`, `%s.rec`, `[level%i]`/`[pack%i]`/`tip%i=`/`tip%c=`, `monster%i`, `bonus%i`, `pack%i=`, `%s_shadow%i` (no matching asset). Directory globs: `*.ogg` (FUN_00434d80), `*.dat *.jpg *.lev *.rec` (FUN_0043e550).
- "indirect" = file is named by a .cgo (`meshN=`/`textureN=`, parser FUN_0040f080) or .chr (skl+texture, FUN_004013c0) that the exe itself names. "Feature" text comes from the function context and FORMATS.md; rows with empty feature have an xref but no analysed feature yet.
- "dino_web" column = whether `src/*.js` actually requests the file at runtime (literal names, generated names such as `bottom%i`, cgo-derived meshes/textures, character tables, sound names). Being copied into `public/assets` does not count.

## Counts

- Files audited: 465 (dino_assets 400 + Data_Demo sounds 44 + Data_Demo .dat/loading.bmp/font.dat 7 + levels .dat 3 + root exe/dll/etc 7 + $PLUGINSDIR 4; note 400+44+7+3+7+4 = 465).
- Referenced by name/pattern in exe: 226; referenced only through exe-named .cgo/.chr: 127; loaded by directory glob (levels 38, previews 40 minus 2 named, demos 8, plus laser.ogg): 85; NOT referenced anywhere: 27.
- dino_web requests: 349 files; does not request: 116 (of which unreferenced by exe: 27).
- Exe resources (.rsrc): `MUSIC/106` (MO3 module, 671883 B; web uses it as music.mo3), `RT_ICON` 1,2 + `RT_GROUP_ICON` 105 (window icon; not needed).
- Referenced by the exe but MISSING from demo data: `level1.txt` (FUN_00407890, next to `menulevel.txt`), `chihanie.ogg` (FUN_00421651, hero sneeze sound), plus unreferenced-by-exe cgo files with dangling parts (`dom1.cgo`->dom1.msh+dom01_tex1.jpg, `grib1.cgo`->grib1.msh+grib1.jpg, `stone.cgo`->Object03.msh+TEXASROS.JPG; none of these cgo is named by the exe). Full-game packs 5-8 and extra levels are mentioned in texts but are not part of the demo (menutext `pack5..pack8`).

## (a) Used by the original, NOT used by dino_web (by feature)

| Feature (exe function) | Assets | Notes |
|---|---|---|
| Main-menu 3D background level (role inferred, unverified) (FUN_00407890 parses `menulevel.txt`; FUN_0041b740 menu/INFO scene) | texts/menulevel.txt, textures/menulogo.tga, anim glavnyi_sintezator/history, geomobjs/sintezator.*, textures/sintezator_screen.jpg | web menu = HTML overlay; menulevel.txt is a normal map (grid) used as the menu backdrop |
| Bitmap font + UI (FUN_00435ab0, FUN_00436b80) | Data_Demo/font.dat, textures/font.tga, textures/podsvet.jpg, textures/menutex.tga, textures/white.jpg | all text/HUD/menus are HTML in web |
| HUD icons (FUN_00414330 preload, HUD FUN_00424c10/FUN_00424f90) | iconhero, iconbatareyka, iconkey, icontablo, iconshorty, iconsniper, icondlinny, iconbugay, iconbomb1 (.tga) | web HUD is a text line |
| Intro/logo screens (FUN_004190e0, FUN_004187a0, FUN_00414200) | textures/nevologo.jpg, nevosoft.jpg, sounds/logo.ogg, Data_Demo/loading.bmp | no loading/intro screens |
| Menu click sounds (FUN_00428cc0, FUN_00429ec0, FUN_0042a220) | sounds/menu2.ogg | sample loaded, never played |
| Level-select previews / title (FUN_0043e710) | preview/*.jpg (40: 38 level previews + dino.jpg + download.jpg) | web level select = numbered buttons |
| Demo replays (FUN_0043e550/0043e710, FUN_004400d0/00440140) | demos/*.rec (8) | not needed for gameplay |
| Water lilies (FUN_004390e0) | geomobjs/kuvshinka_list.msh, kuvshinka_cvetok.msh, textures/kuvshinka.tga | water has no lily decoration |
| Hero hat / invisibility look (FUN_0041fb70) | textures/hat.jpg, geomobjs/nevidimka.msh (as hero attachment) | web only shows them as pickup |
| Explosion flare variant (FUN_00414330) | textures/flare.jpg | web uses exploflare.jpg only |
| Info screens bonuses/monsters/credits (FUN_004295a0, menutext) | [monster%i]/[bonus%i] text blocks | texts parsed by exe; web has no INFO screens |
| Pack/menu structure | texts/menu.txt | exe parses it (FUN_004295a0); web hardcodes |
| Hidden grass blades (stone*.cgo) | geomobjs/travka_01/02/3a/3b.msh (+lazer_screen.jpg) | exe draws them like any mesh (FUN_0040f410); web hides them (GUESS in FORMATS) |
| Hero animation never used by hero | animations/walk.anm, poklon.anm | exe loads but does not play them either - parity, not a gap |
| Installer / launcher menu actions | root/download_pack.url (FUN_0042b820), root/registration.exe (FUN_0042b850) | demo "buy" nags; out of scope |

Code-level gaps with evidence in FORMATS.md (assets are used, behaviour is not): bomb-pickup/explosion particles (FUN_00411240/0042fbc0/0042feb0), laser beam flicker, gate/lock timeline sounds vorota1-3 (offsets 0/1600/2000 ms confirmed but web opens instantly), `laser.ogg` has no named trigger in the exe.

## (b) Used by dino_web but never referenced by the original (invented)

- Asset FILES: none found. Every file dino_web requests is named by the exe (literal, sprintf pattern, glob) or reached through an exe-named .cgo/.chr. Exceptions to watch: (1) `sounds/chihanie.ogg` is requested by web and by the exe, but is missing in the demo; (2) `travka_*.msh` is requested via stone*.cgo (exe-referenced) but then hidden by web; (3) `texts/menu.txt` is claimed in a menu.js comment but not fetched.
- Non-file inventions (no exe evidence; see GUESS entries in FORMATS.md): HTML menus/HUD/tablet popup/end+defeat screens (menu.js, main.js), sniper bullet drawn as a sphere, explosion visuals (spark/crater planes built from exploanim.tga with invented timings), `music.mo3` playback path via libopenmpt (the data itself is the exe MUSIC/106 resource, so the asset is genuine), `window.__tick` debug hook.

## Unreferenced in the exe (no string, no xref, no cgo/chr/glob link)

Files: `animations/jump.anm`, `geomobjs/bat.msh`, `geomobjs/bugai_mesh.msh`, `geomobjs/bugay.cgo`, `geomobjs/dom1.cgo`, `geomobjs/grib1.cgo`, `geomobjs/logo.cgo`, `geomobjs/logo.msh`, `geomobjs/ograda_stolb_opt.msh`, `geomobjs/paling1.msh`, `geomobjs/stone.cgo`, `textures/green1.jpg`, `textures/list_papor_screen.tga`, `textures/redblue.jpg`, `textures/smoke.tga`, `Data_Demo/levels/demos.dat`, `Data_Demo/levels/levels.dat`, `Data_Demo/levels/preview.dat`.

Installer/aux files not used by the game exe: `root/BASS.DLL`, `root/DinoAndAliens.exe`, `root/license.txt`, `root/nevosoft.ico`, `root/uninstall.exe`, `$PLUGINSDIR/InstallOptions.dll`, `$PLUGINSDIR/ioSpecial.ini`, `$PLUGINSDIR/modern-header.bmp`, `$PLUGINSDIR/modern-wizard.bmp` (BASS.DLL is an import of the exe, not a string reference).

## Full table

Columns: asset (relative to dino_assets, `sounds/`+`Data_Demo/`+`root/` from dino_extracted) | how the exe references it | exe xref function(s) | feature | dino_web uses it?

| Asset | Exe reference | Exe xref | Feature | dino_web |
|---|---|---|---|---|
| animations/beg.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES |
| animations/bugai_attack.anm | named in exe | FUN_0040d6c0, FUN_0041b740 | bugai ctor (loads bugai anims); main-menu / INFO showcase screen (hero + enemies + pickups) | YES |
| animations/bugai_pause.anm | named in exe | FUN_0040d6c0, FUN_0041b740 | bugai ctor (loads bugai anims); main-menu / INFO showcase screen (hero + enemies + pickups) | YES |
| animations/bugai_perekrest.anm | named in exe | FUN_0040d6c0, FUN_0041b740 | bugai ctor (loads bugai anims); main-menu / INFO showcase screen (hero + enemies + pickups) | YES |
| animations/bugai_run.anm | named in exe | FUN_0040d6c0 | bugai ctor (loads bugai anims) | YES |
| animations/bugai_shock.anm | named in exe | FUN_0040d6c0 | bugai ctor (loads bugai anims) | YES |
| animations/chihanie.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES |
| animations/dance1.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES |
| animations/dance2.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES |
| animations/death.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES |
| animations/death2.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES |
| animations/dlinnyi_ataka.anm | named in exe | FUN_0040f710 | dlinnyi ctor (anims) | YES |
| animations/dlinnyi_beg.anm | named in exe | FUN_0040f710 | dlinnyi ctor (anims) | YES |
| animations/dlinnyi_pause.anm | named in exe | FUN_0040f710, FUN_0041b740 | dlinnyi ctor (anims); main-menu / INFO showcase screen (hero + enemies + pickups) | YES |
| animations/dlinnyi_perekrest.anm | named in exe | FUN_0040f710, FUN_0041b740 | dlinnyi ctor (anims); main-menu / INFO showcase screen (hero + enemies + pickups) | YES |
| animations/dlinnyi_shock.anm | named in exe | FUN_0040f710 | dlinnyi ctor (anims) | YES |
| animations/glavnyi_pause_time.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES |
| animations/glavnyi_sintezator.anm | named in exe | FUN_0041b740 | main-menu / INFO showcase screen (hero + enemies + pickups) | no - INFO screen hero-at-synthesizer (not ported) |
| animations/history.anm | named in exe | FUN_0041b740 | main-menu / INFO showcase screen (hero + enemies + pickups) | no - INFO/history screen only (not ported) |
| animations/jump.anm | NOT referenced |  |  | no |
| animations/mahanie.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES |
| animations/pinok.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES |
| animations/poklon.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | no - loaded by exe, never played (FORMATS); web omits |
| animations/shock.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES |
| animations/sniper_ataka.anm | named in exe | FUN_00432d80 | sniper ctor (anims) | YES |
| animations/sniper_beg.anm | named in exe | FUN_00432d80 | sniper ctor (anims) | YES |
| animations/sniper_pause.anm | named in exe | FUN_0041b740, FUN_00432d80 | main-menu / INFO showcase screen (hero + enemies + pickups); sniper ctor (anims) | YES |
| animations/sniper_perekrest.anm | named in exe | FUN_0041b740, FUN_00432d80 | main-menu / INFO showcase screen (hero + enemies + pickups); sniper ctor (anims) | YES |
| animations/sniper_shock.anm | named in exe | FUN_00432d80 | sniper ctor (anims) | YES |
| animations/stand.anm | named in exe | FUN_00414330, FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| animations/tolkanie.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES |
| animations/vilka_ataka.anm | named in exe | FUN_0041b740, FUN_00430fa0 | main-menu / INFO showcase screen (hero + enemies + pickups); vilka ctor (anims) | YES |
| animations/vilka_pause.anm | named in exe | FUN_0041b740, FUN_00430fa0 | main-menu / INFO showcase screen (hero + enemies + pickups); vilka ctor (anims) | YES |
| animations/vilka_perekrest.anm | named in exe | FUN_0041b740, FUN_00430fa0 | main-menu / INFO showcase screen (hero + enemies + pickups); vilka ctor (anims) | YES |
| animations/vilka_run.anm | named in exe | FUN_00430fa0 | vilka ctor (anims) | YES |
| animations/vilka_shock.anm | named in exe | FUN_00430fa0 | vilka ctor (anims) | YES |
| animations/walk.anm | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no - loaded by exe preload but hero uses beg.anm (FORMATS); web correctly omits |
| animations/zaryadka.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES |
| animations/zaryadka2.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES |
| animations/zevota.anm | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES |
| characters/bugai.chr | named in exe | FUN_00407430, FUN_0041b740 | enemy spawn (M tile) -> .chr; main-menu / INFO showcase screen (hero + enemies + pickups) | YES |
| characters/bugai.skl | indirect via data | listed in bugai.chr | used wherever its parent is used | YES |
| characters/dlinnyi.chr | named in exe | FUN_00407430, FUN_0041b740 | enemy spawn (M tile) -> .chr; main-menu / INFO showcase screen (hero + enemies + pickups) | YES |
| characters/dlinnyi.skl | indirect via data | listed in dlinnyi.chr | used wherever its parent is used | YES |
| characters/main.chr | named in exe | FUN_00414330, FUN_0041b740 | main-menu / INFO showcase screen (hero + enemies + pickups); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| characters/pups.skl | indirect via data | listed in main.chr | used wherever its parent is used | YES |
| characters/sniper.chr | named in exe | FUN_00407430, FUN_0041b740 | enemy spawn (M tile) -> .chr; main-menu / INFO showcase screen (hero + enemies + pickups) | YES |
| characters/sniper.skl | indirect via data | listed in sniper.chr | used wherever its parent is used | YES |
| characters/vilka.chr | named in exe | FUN_00407430, FUN_0041b740 | enemy spawn (M tile) -> .chr; main-menu / INFO showcase screen (hero + enemies + pickups) | YES |
| characters/vilka.skl | indirect via data | listed in vilka.chr | used wherever its parent is used | YES |
| demos/P02_L04.rec | glob *.rec / "%s.rec" | FUN_0043e550/FUN_0043e710, FUN_004400d0/FUN_00440140 | demo replay | no |
| demos/P02_L05.rec | glob *.rec / "%s.rec" | FUN_0043e550/FUN_0043e710, FUN_004400d0/FUN_00440140 | demo replay | no |
| demos/P02_L10.rec | glob *.rec / "%s.rec" | FUN_0043e550/FUN_0043e710, FUN_004400d0/FUN_00440140 | demo replay | no |
| demos/P03_L01.rec | glob *.rec / "%s.rec" | FUN_0043e550/FUN_0043e710, FUN_004400d0/FUN_00440140 | demo replay | no |
| demos/P03_L02.rec | glob *.rec / "%s.rec" | FUN_0043e550/FUN_0043e710, FUN_004400d0/FUN_00440140 | demo replay | no |
| demos/P03_L08.rec | glob *.rec / "%s.rec" | FUN_0043e550/FUN_0043e710, FUN_004400d0/FUN_00440140 | demo replay | no |
| demos/P03_L11.rec | glob *.rec / "%s.rec" | FUN_0043e550/FUN_0043e710, FUN_004400d0/FUN_00440140 | demo replay | no |
| demos/P04_L03.rec | glob *.rec / "%s.rec" | FUN_0043e550/FUN_0043e710, FUN_004400d0/FUN_00440140 | demo replay | no |
| geomobjs/GeoSphere01.msh | indirect via data | listed in bomb.cgo | used wherever its parent is used | YES |
| geomobjs/ananas.msh | indirect via data | listed in bonus_ananas.cgo | used wherever its parent is used | YES |
| geomobjs/bat.msh | NOT referenced |  |  | no |
| geomobjs/batareyka.cgo | named in exe | FUN_004091fa, FUN_00414330, FUN_0041b740, FUN_0041c050 | level object factory (tile char -> cgo); main-menu / INFO showcase screen (hero + enemies + pickups); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/batareyka.msh | indirect via data | listed in batareyka.cgo | used wherever its parent is used | YES |
| geomobjs/bochka.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bochka.msh | indirect via data | listed in bochka.cgo | used wherever its parent is used | YES |
| geomobjs/bomb.cgo | named in exe | FUN_00405690 | bomb create/render setup | YES |
| geomobjs/bomb2.cgo | named in exe | FUN_004091fa, FUN_00414330, FUN_0041b740 | level object factory (tile char -> cgo); main-menu / INFO showcase screen (hero + enemies + pickups); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bonus_ananas.cgo | named in exe | FUN_004091fa, FUN_00414330, FUN_0041b740 | level object factory (tile char -> cgo); main-menu / INFO showcase screen (hero + enemies + pickups); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bonus_clock.cgo | named in exe | FUN_004091fa, FUN_00414330, FUN_0041b740 | level object factory (tile char -> cgo); main-menu / INFO showcase screen (hero + enemies + pickups); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bonus_life.cgo | named in exe | FUN_004091fa, FUN_00414330, FUN_0041b740 | level object factory (tile char -> cgo); main-menu / INFO showcase screen (hero + enemies + pickups); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bonus_life025.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bonus_life05.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bonus_nevidimka.cgo | named in exe | FUN_004091fa, FUN_00414330, FUN_0041b740 | level object factory (tile char -> cgo); main-menu / INFO showcase screen (hero + enemies + pickups); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bottom0.cgo | named in exe (sprintf pattern) `bottom%i.cgo` | FUN_00414330, FUN_00407890 | level loader (.lev parse, ground, water, objects); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bottom0.msh | indirect via data | listed in bottom0.cgo | used wherever its parent is used | YES |
| geomobjs/bottom1.cgo | named in exe (sprintf pattern) `bottom%i.cgo` | FUN_00414330, FUN_00407890 | level loader (.lev parse, ground, water, objects); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bottom1.msh | indirect via data | listed in bottom1.cgo | used wherever its parent is used | YES |
| geomobjs/bottom1a.cgo | named in exe (sprintf pattern) `bottom%ia.cgo` | FUN_00414330, FUN_00407890 | level loader (.lev parse, ground, water, objects); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bottom1a.msh | indirect via data | listed in bottom1a.cgo | used wherever its parent is used | YES |
| geomobjs/bottom2.cgo | named in exe (sprintf pattern) `bottom%i.cgo` | FUN_00414330, FUN_00407890 | level loader (.lev parse, ground, water, objects); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bottom2.msh | indirect via data | listed in bottom2.cgo | used wherever its parent is used | YES |
| geomobjs/bottom2a.cgo | named in exe (sprintf pattern) `bottom%ia.cgo` | FUN_00414330, FUN_00407890 | level loader (.lev parse, ground, water, objects); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bottom2a.msh | indirect via data | listed in bottom2a.cgo | used wherever its parent is used | YES |
| geomobjs/bottom3.cgo | named in exe (sprintf pattern) `bottom%i.cgo` | FUN_00414330, FUN_00407890 | level loader (.lev parse, ground, water, objects); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bottom3.msh | indirect via data | listed in bottom3.cgo | used wherever its parent is used | YES |
| geomobjs/bottom3a.cgo | named in exe (sprintf pattern) `bottom%ia.cgo` | FUN_00414330, FUN_00407890 | level loader (.lev parse, ground, water, objects); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bottom3a.msh | indirect via data | listed in bottom3a.cgo | used wherever its parent is used | YES |
| geomobjs/box.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/box.msh | indirect via data | listed in box.cgo, metalbox.cgo | used wherever its parent is used | YES |
| geomobjs/budilnik.msh | indirect via data | listed in bonus_clock.cgo | used wherever its parent is used | YES |
| geomobjs/budilnik_zvonok.msh | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/bugai_mesh.msh | NOT referenced |  |  | no |
| geomobjs/bugay.cgo | NOT referenced |  |  | no |
| geomobjs/buket.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/buket.msh | indirect via data | listed in buket.cgo | used wherever its parent is used | YES |
| geomobjs/cvetok.msh | indirect via data | listed in flower.cgo | used wherever its parent is used | YES |
| geomobjs/derevo.msh | indirect via data | listed in tree1.cgo | used wherever its parent is used | YES |
| geomobjs/derevo2.msh | indirect via data | listed in tree1dry.cgo, tree2.cgo | used wherever its parent is used | YES |
| geomobjs/derevo_suhoe_2_stvol.msh | indirect via data | listed in tree2dry.cgo | used wherever its parent is used | YES |
| geomobjs/derevo_suhoe_vetki_2.msh | indirect via data | listed in tree2dry.cgo | used wherever its parent is used | YES |
| geomobjs/derevo_vetki.msh | indirect via data | listed in tree1dry.cgo | used wherever its parent is used | YES |
| geomobjs/dom1.cgo | NOT referenced |  |  | no |
| geomobjs/exit.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/flower.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/grass1.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/grib1.cgo | NOT referenced |  |  | no |
| geomobjs/key.cgo | named in exe | FUN_004091fa, FUN_00414330, FUN_0041b740 | level object factory (tile char -> cgo); main-menu / INFO showcase screen (hero + enemies + pickups); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/key.msh | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/kirpich_base.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/kirpich_base_opt.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/kirpich_bashnya.cgo | named in exe | FUN_00407890, FUN_00414330 | level loader (.lev parse, ground, water, objects); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/kust01.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/kust_01.msh | indirect via data | listed in kust01.cgo | used wherever its parent is used | YES |
| geomobjs/kuvshinka_cvetok.msh | named in exe | FUN_004390e0 | water renderer | no - water lily flower; not ported |
| geomobjs/kuvshinka_list.msh | named in exe | FUN_004390e0 | water renderer | no - water lily on water tiles; web has no lily rendering |
| geomobjs/lazer.cgo | named in exe | FUN_00407890, FUN_00414330 | level loader (.lev parse, ground, water, objects); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/lazer.msh | indirect via data | listed in lazer.cgo | used wherever its parent is used | YES |
| geomobjs/lazer_zerkalo.msh | indirect via data | listed in mirror.cgo | used wherever its parent is used | YES |
| geomobjs/logo.cgo | NOT referenced |  |  | no |
| geomobjs/logo.msh | NOT referenced |  |  | no |
| geomobjs/metalbox.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/mirror.cgo | named in exe | FUN_00407890, FUN_00414330 | level loader (.lev parse, ground, water, objects); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/nevidimka.msh | named in exe | FUN_00414330, FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES - web only as pickup mesh; hero-side use in FUN_0041fb70 not ported |
| geomobjs/oduvan.msh | indirect via data | listed in oduvan1.cgo | used wherever its parent is used | YES |
| geomobjs/oduvan1.cgo | named in exe (sprintf pattern) `oduvan%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/oduvan2.cgo | named in exe (sprintf pattern) `oduvan%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/oduvan2.msh | indirect via data | listed in oduvan2.cgo | used wherever its parent is used | YES |
| geomobjs/ograda_centr.msh | indirect via data | listed in kirpich_base.cgo | used wherever its parent is used | YES |
| geomobjs/ograda_centr_opt.msh | indirect via data | listed in kirpich_base_opt.cgo | used wherever its parent is used | YES |
| geomobjs/ograda_stolb.msh | indirect via data | listed in kirpich_bashnya.cgo | used wherever its parent is used | YES |
| geomobjs/ograda_stolb_opt.msh | NOT referenced |  |  | no |
| geomobjs/ograda_vorota1.msh | indirect via data | listed in vorota.cgo | used wherever its parent is used | YES |
| geomobjs/paling01.cgo | named in exe (sprintf pattern) `paling0%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/paling01_bok.cgo | named in exe (sprintf pattern) `paling0%i_bok.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/paling02.cgo | named in exe (sprintf pattern) `paling0%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/paling02_bok.cgo | named in exe (sprintf pattern) `paling0%i_bok.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/paling1.msh | NOT referenced |  |  | no |
| geomobjs/paling2.msh | indirect via data | listed in paling02.cgo | used wherever its parent is used | YES |
| geomobjs/paling2_bok.msh | indirect via data | listed in paling01_bok.cgo | used wherever its parent is used | YES |
| geomobjs/paling3.msh | indirect via data | listed in paling01.cgo | used wherever its parent is used | YES |
| geomobjs/paling3_bok.msh | indirect via data | listed in paling02_bok.cgo | used wherever its parent is used | YES |
| geomobjs/paling_stolb.cgo | named in exe | FUN_00407890, FUN_00414330 | level loader (.lev parse, ground, water, objects); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/paling_stolb.msh | indirect via data | listed in paling_stolb.cgo | used wherever its parent is used | YES |
| geomobjs/palm1.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/palm2.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/palma_01.msh | indirect via data | listed in palm1.cgo | used wherever its parent is used | YES |
| geomobjs/palma_01_stvol.msh | indirect via data | listed in palm1.cgo | used wherever its parent is used | YES |
| geomobjs/palma_02_listva.msh | indirect via data | listed in palm2.cgo | used wherever its parent is used | YES |
| geomobjs/palma_02_stvol.msh | indirect via data | listed in palm2.cgo | used wherever its parent is used | YES |
| geomobjs/papor_01.msh | indirect via data | listed in grass1.cgo, paporotnik1.cgo | used wherever its parent is used | YES |
| geomobjs/papor_02.msh | indirect via data | listed in paporotnik2.cgo | used wherever its parent is used | YES |
| geomobjs/paporotnik1.cgo | named in exe (sprintf pattern) `paporotnik%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/paporotnik2.cgo | named in exe (sprintf pattern) `paporotnik%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/penek1.cgo | named in exe (sprintf pattern) `penek%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/penek1.msh | indirect via data | listed in penek1.cgo | used wherever its parent is used | YES |
| geomobjs/penek1_top.msh | indirect via data | listed in penek1.cgo | used wherever its parent is used | YES |
| geomobjs/penek2.cgo | named in exe (sprintf pattern) `penek%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/penek2.msh | indirect via data | listed in penek2.cgo | used wherever its parent is used | YES |
| geomobjs/penek2_top.msh | indirect via data | listed in penek2.cgo | used wherever its parent is used | YES |
| geomobjs/penek3.cgo | named in exe (sprintf pattern) `penek%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/penek3.msh | indirect via data | listed in penek3.cgo | used wherever its parent is used | YES |
| geomobjs/penek3_top.msh | indirect via data | listed in penek3.cgo | used wherever its parent is used | YES |
| geomobjs/reshetka.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/reshetka.msh | indirect via data | listed in reshetka.cgo | used wherever its parent is used | YES |
| geomobjs/reshetka_bok.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/reshetka_opt_bok.msh | indirect via data | listed in reshetka_bok.cgo | used wherever its parent is used | YES |
| geomobjs/sintezator.cgo | named in exe | FUN_0041b740 | main-menu / INFO showcase screen (hero + enemies + pickups) | no - INFO screen (not ported) |
| geomobjs/sintezator.msh | indirect via data | listed in sintezator.cgo | used wherever its parent is used | no - INFO screen (not ported) |
| geomobjs/spherebmb.msh | indirect via data | listed in bomb2.cgo | used wherever its parent is used | YES - loaded (via bomb2.cgo); 4-sphere pickup layout ported per main.js comment |
| geomobjs/stone.cgo | NOT referenced |  |  | no |
| geomobjs/stone01.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/stone01a.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/stone02.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/stone02a.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/stone03.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/stone03a.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/stone_01.msh | indirect via data | listed in stone01.cgo | used wherever its parent is used | YES |
| geomobjs/stone_01_a.msh | indirect via data | listed in stone01a.cgo | used wherever its parent is used | YES |
| geomobjs/stone_02.msh | indirect via data | listed in stone02.cgo | used wherever its parent is used | YES |
| geomobjs/stone_02_a.msh | indirect via data | listed in stone02a.cgo | used wherever its parent is used | YES |
| geomobjs/stone_03.msh | indirect via data | listed in stone03.cgo | used wherever its parent is used | YES |
| geomobjs/stone_03_a.msh | indirect via data | listed in stone03a.cgo | used wherever its parent is used | YES |
| geomobjs/strelka.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/tablichka_strelka.msh | indirect via data | listed in strelka.cgo | used wherever its parent is used | YES |
| geomobjs/tablo.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/tablo.msh | indirect via data | listed in tablo.cgo | used wherever its parent is used | YES |
| geomobjs/teleport_base.msh | indirect via data | listed in exit.cgo | used wherever its parent is used | YES |
| geomobjs/teleport_kamni.msh | indirect via data | listed in exit.cgo | used wherever its parent is used | YES |
| geomobjs/travka_01.msh | indirect via data | listed in stone01.cgo | used wherever its parent is used | YES - loaded via stone*.cgo, but web HIDES it (GUESS, not confirmed by exe) |
| geomobjs/travka_02.msh | indirect via data | listed in stone02.cgo | used wherever its parent is used | YES - loaded via stone*.cgo, but web HIDES it (GUESS) |
| geomobjs/travka_3a.msh | indirect via data | listed in stone03.cgo | used wherever its parent is used | YES - loaded via stone*.cgo, but web HIDES it (GUESS) |
| geomobjs/travka_3b.msh | indirect via data | listed in stone03.cgo | used wherever its parent is used | YES - loaded via stone*.cgo, but web HIDES it (GUESS) |
| geomobjs/tree1.cgo | named in exe (sprintf pattern) `tree%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/tree1dry.cgo | named in exe (sprintf pattern) `tree%idry.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/tree2.cgo | named in exe (sprintf pattern) `tree%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/tree2dry.cgo | named in exe (sprintf pattern) `tree%idry.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/vorota.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/yabloko_0,25.msh | indirect via data | listed in bonus_life025.cgo | used wherever its parent is used | YES |
| geomobjs/yabloko_0,5.msh | indirect via data | listed in bonus_life05.cgo | used wherever its parent is used | YES |
| geomobjs/yabloko_1.msh | indirect via data | listed in bonus_life.cgo | used wherever its parent is used | YES |
| geomobjs/zabor01.cgo | named in exe (sprintf pattern) `zabor0%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/zabor01_bok.cgo | named in exe (sprintf pattern) `zabor0%i_bok.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/zabor02.cgo | named in exe (sprintf pattern) `zabor0%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/zabor02_bok.cgo | named in exe (sprintf pattern) `zabor0%i_bok.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/zabor03.cgo | named in exe (sprintf pattern) `zabor0%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/zabor03_bok.cgo | named in exe (sprintf pattern) `zabor0%i_bok.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/zabor04.cgo | named in exe (sprintf pattern) `zabor0%i.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/zabor04_bok.cgo | named in exe (sprintf pattern) `zabor0%i_bok.cgo` | FUN_00414330, FUN_004091fa | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/zabor_01.msh | indirect via data | listed in zabor01.cgo | used wherever its parent is used | YES |
| geomobjs/zabor_01_bok.msh | indirect via data | listed in zabor01_bok.cgo | used wherever its parent is used | YES |
| geomobjs/zabor_02.msh | indirect via data | listed in zabor02.cgo | used wherever its parent is used | YES |
| geomobjs/zabor_02_bok.msh | indirect via data | listed in zabor02_bok.cgo | used wherever its parent is used | YES |
| geomobjs/zabor_03.msh | indirect via data | listed in zabor03.cgo | used wherever its parent is used | YES |
| geomobjs/zabor_03_bok.msh | indirect via data | listed in zabor03_bok.cgo | used wherever its parent is used | YES |
| geomobjs/zabor_04.msh | indirect via data | listed in zabor04.cgo | used wherever its parent is used | YES |
| geomobjs/zabor_04_bok.msh | indirect via data | listed in zabor04_bok.cgo | used wherever its parent is used | YES |
| geomobjs/zamok.cgo | named in exe | FUN_004091fa, FUN_00414330 | level object factory (tile char -> cgo); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| geomobjs/zamok_doorl.msh | indirect via data | listed in zamok.cgo | used wherever its parent is used | YES |
| geomobjs/zamok_doorr.msh | indirect via data | listed in zamok.cgo | used wherever its parent is used | YES |
| geomobjs/zamok_stolb.msh | indirect via data | listed in zamok.cgo | used wherever its parent is used | YES |
| geomobjs/zamok_zadvig.msh | indirect via data | listed in zamok.cgo | used wherever its parent is used | YES |
| geomobjs/zamok_zamok.msh | indirect via data | listed in zamok.cgo | used wherever its parent is used | YES |
| levels/p01_l01.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p01_l02.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p01_l03.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p01_l04.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p01_l05.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p02_l01.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p02_l02.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p02_l03.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p02_l04.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p02_l05.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p02_l06.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p02_l07.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p02_l08.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p02_l09.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p02_l10.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l01.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l02.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l03.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l04.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l05.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l06.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l07.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l08.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l09.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l10.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l11.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l12.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l13.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l14.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p03_l15.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p04_l01.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p04_l02.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p04_l03.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p04_l04.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/p04_l05.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/tutorial01.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/tutorial02.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| levels/tutorial03.lev | glob *.lev | FUN_0043e550/FUN_0043e710 | level list | YES |
| preview/dino.jpg | named in exe | FUN_0043e710 | level list / preview / demo (.rec) loader | no |
| preview/download.jpg | named in exe | FUN_0043e710 | level list / preview / demo (.rec) loader | no |
| preview/p01_l01.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p01_l02.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p01_l03.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p01_l04.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p01_l05.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p02_l01.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p02_l02.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p02_l03.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p02_l04.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p02_l05.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p02_l06.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p02_l07.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p02_l08.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p02_l09.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p02_l10.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l01.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l02.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l03.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l04.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l05.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l06.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l07.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l08.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l09.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l10.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l11.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l12.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l13.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l14.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p03_l15.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p04_l01.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p04_l02.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p04_l03.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p04_l04.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/p04_l05.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/tutorial01.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/tutorial02.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| preview/tutorial03.jpg | glob *.jpg + level name | FUN_0043e550/FUN_0043e710 | level-select preview | no |
| texts/menu.txt | named in exe | FUN_004295a0 | menu.txt/menutext.txt parser | no - NOT fetched (menu.js comment says "from menu.txt" but structure is hardcoded) |
| texts/menulevel.txt | named in exe | FUN_00407890 | level loader (.lev parse, ground, water, objects) | no - main-menu background level (it is a .lev-format file); web menu is plain HTML overlay |
| texts/menutext.txt | named in exe | FUN_004295a0 | menu.txt/menutext.txt parser | YES - used for labels only |
| texts/tips.txt | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES - used |
| textures/403094.jpg | indirect via data | listed in palm2.cgo | used wherever its parent is used | YES |
| textures/BARK02.JPG | indirect via data | listed in penek1.cgo, tree1.cgo, tree1dry.cgo | used wherever its parent is used | YES |
| textures/BARKBW.JPG | indirect via data | listed in penek3.cgo | used wherever its parent is used | YES |
| textures/Barkdrk.jpg | indirect via data | listed in tree2.cgo, tree2dry.cgo | used wherever its parent is used | YES |
| textures/Barkdrk2.jpg | indirect via data | listed in penek2.cgo | used wherever its parent is used | YES |
| textures/RINGS.JPG | indirect via data | listed in penek1.cgo, penek2.cgo, penek3.cgo | used wherever its parent is used | YES |
| textures/bochka_screen.jpg | indirect via data | listed in bochka.cgo | used wherever its parent is used | YES |
| textures/bomb_sphere.jpg | indirect via data | listed in bomb.cgo | used wherever its parent is used | YES |
| textures/bomb_sphere0.jpg | named in exe | FUN_00405690, FUN_0040ce40 | bomb create/render setup; bomb pickup render (spheres) | YES |
| textures/bomb_sphere1.jpg | named in exe | FUN_00405690, FUN_0040ce40 | bomb create/render setup; bomb pickup render (spheres) | YES |
| textures/bomb_sphere2.jpg | named in exe | FUN_00405690, FUN_0040ce40 | bomb create/render setup; bomb pickup render (spheres) | YES |
| textures/bonus_screen.jpg | indirect via data | listed in bonus_ananas.cgo, bonus_life.cgo, bonus_life025.cgo, bonus_life05.cgo | used wherever its parent is used | YES |
| textures/bottom.jpg | indirect via data | listed in bottom0.cgo, bottom1.cgo, bottom1a.cgo, bottom2.cgo, bottom2a.cgo, bottom3.cgo ... | used wherever its parent is used | YES |
| textures/box1.jpg | indirect via data | listed in box.cgo | used wherever its parent is used | YES |
| textures/budilnik_screen.jpg | indirect via data | listed in bonus_clock.cgo | used wherever its parent is used | YES |
| textures/budilnik_zvonok.jpg | indirect via data | listed in bonus_clock.cgo | used wherever its parent is used | YES |
| textures/bugai_screen.jpg | indirect via data | listed in bugai.chr | used wherever its parent is used | YES |
| textures/chastokol.jpg | indirect via data | listed in paling01.cgo, paling01_bok.cgo, paling02.cgo, paling02_bok.cgo, paling_stolb.cgo | used wherever its parent is used | YES |
| textures/dirt01.jpg | named in exe | FUN_004137d0 | ground tiles | YES |
| textures/dirt02.jpg | named in exe | FUN_004137d0 | ground tiles | YES - used (per-tile variant) |
| textures/dirt03.jpg | named in exe | FUN_004137d0 | ground tiles | YES - used (per-tile variant) |
| textures/dlinnyi_screen.jpg | indirect via data | listed in dlinnyi.chr | used wherever its parent is used | YES |
| textures/exploanim.tga | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | YES |
| textures/exploflare.jpg | named in exe | FUN_004115e0 | explosion flare | YES |
| textures/flare.jpg | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no - web uses exploflare.jpg instead; flare.jpg (FUN_00414330) not used |
| textures/flower.tga | indirect via data | listed in buket.cgo, flower.cgo, palm1.cgo | used wherever its parent is used | YES |
| textures/font.tga | named in exe | FUN_00435ab0 | font/text init | no |
| textures/glavnyi_screen.jpg | indirect via data | listed in main.chr | used wherever its parent is used | YES |
| textures/green1.jpg | NOT referenced |  |  | no |
| textures/hat.jpg | named in exe | FUN_0041fb70 | hero ctor (loads all hero anims, hat, nevidimka.msh) | YES - web only via bonus_nevidimka.cgo pickup; hero-hat feature of FUN_0041fb70 not ported |
| textures/iconbatareyka.tga | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| textures/iconbomb1.tga | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| textures/iconbugay.tga | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| textures/icondlinny.tga | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| textures/iconhero.tga | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| textures/iconkey.tga | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| textures/iconshorty.tga | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| textures/iconsniper.tga | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| textures/icontablo.tga | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| textures/kust1.tga | indirect via data | listed in kust01.cgo | used wherever its parent is used | YES |
| textures/kuvshinka.tga | named in exe | FUN_004390e0 | water renderer | no - water lily texture; not ported |
| textures/lazer_screen.jpg | indirect via data | listed in lazer.cgo, stone01.cgo, stone02.cgo, stone03.cgo | used wherever its parent is used | YES |
| textures/lazer_zerkalo_screen.jpg | indirect via data | listed in batareyka.cgo, mirror.cgo | used wherever its parent is used | YES |
| textures/list_palma_screen.tga | indirect via data | listed in palm2.cgo | used wherever its parent is used | YES |
| textures/list_papor_screen.tga | NOT referenced |  |  | no |
| textures/menulogo.tga | named in exe | FUN_0041b740 | main-menu / INFO showcase screen (hero + enemies + pickups) | no |
| textures/menutex.tga | named in exe | FUN_00436b80 | UI draw init (menutex/white) | no |
| textures/metal_box.jpg | indirect via data | listed in metalbox.cgo | used wherever its parent is used | YES |
| textures/nevologo.jpg | named in exe | FUN_004190e0 | intro logos | no |
| textures/nevosoft.jpg | named in exe | FUN_004190e0 | intro logos | no |
| textures/ograda_screen.jpg | indirect via data | listed in kirpich_base.cgo, kirpich_base_opt.cgo, kirpich_bashnya.cgo | used wherever its parent is used | YES |
| textures/ograda_vorota1_screen.jpg | indirect via data | listed in vorota.cgo | used wherever its parent is used | YES |
| textures/ograda_vorota2_screen.jpg | indirect via data | listed in zamok.cgo | used wherever its parent is used | YES |
| textures/palma_01_stvol.jpg | indirect via data | listed in palm1.cgo | used wherever its parent is used | YES |
| textures/podsvet.jpg | named in exe | FUN_00435ab0 | font/text init | no |
| textures/redblue.jpg | NOT referenced |  |  | no |
| textures/reshetka.jpg | indirect via data | listed in reshetka.cgo, reshetka_bok.cgo | used wherever its parent is used | YES |
| textures/sintezator_screen.jpg | indirect via data | listed in sintezator.cgo | used wherever its parent is used | no - INFO screen (not ported) |
| textures/smoke.tga | NOT referenced |  |  | no |
| textures/snayper_screen.jpg | indirect via data | listed in sniper.chr | used wherever its parent is used | YES |
| textures/stone01.jpg | indirect via data | listed in stone01.cgo, stone01a.cgo | used wherever its parent is used | YES |
| textures/stone02.JPG | indirect via data | listed in stone02.cgo, stone02a.cgo | used wherever its parent is used | YES |
| textures/stone03.jpg | indirect via data | listed in stone03.cgo, stone03a.cgo | used wherever its parent is used | YES |
| textures/strelka_screen.jpg | indirect via data | listed in strelka.cgo | used wherever its parent is used | YES |
| textures/tablo_screen.jpg | indirect via data | listed in tablo.cgo | used wherever its parent is used | YES |
| textures/teleport_kamni.jpg | indirect via data | listed in exit.cgo | used wherever its parent is used | YES |
| textures/teleport_screen.jpg | indirect via data | listed in exit.cgo | used wherever its parent is used | YES |
| textures/trava1.tga | indirect via data | listed in grass1.cgo, oduvan1.cgo, oduvan2.cgo, paporotnik1.cgo, paporotnik2.cgo | used wherever its parent is used | YES |
| textures/vetki1.tga | indirect via data | listed in tree1dry.cgo, tree2dry.cgo | used wherever its parent is used | YES |
| textures/vilka_screen.jpg | indirect via data | listed in vilka.chr | used wherever its parent is used | YES |
| textures/water.jpg | named in exe | FUN_004390e0 | water renderer | YES |
| textures/water01.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water02.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water03.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water04.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water05.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water06.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water07.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water08.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water09.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water10.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water11.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water12.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water13.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water14.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water15.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water16.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water17.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water18.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water19.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water20.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water21.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/water22.jpg | named in exe (sprintf pattern) `water%i.jpg` | FUN_004390e0 | water renderer | YES |
| textures/white.jpg | named in exe | FUN_00414330, FUN_00436b80 | UI draw init (menutex/white); startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| textures/yellow.jpg | indirect via data | listed in key.cgo | used wherever its parent is used | YES |
| textures/zabor_screen.jpg | indirect via data | listed in zabor01.cgo, zabor01_bok.cgo, zabor02.cgo, zabor02_bok.cgo, zabor03.cgo, zabor03_bok.cgo ... | used wherever its parent is used | YES |
| sounds/ananas.ogg | named in exe | FUN_00422990, FUN_00424b60 | HUD pickup sound/icons; hero pickups | YES |
| sounds/apple1.ogg | named in exe | FUN_00422990, FUN_00424b60 | HUD pickup sound/icons; hero pickups | YES |
| sounds/batareyka.ogg | named in exe | FUN_00422990, FUN_00424b60 | HUD pickup sound/icons; hero pickups | YES |
| sounds/bomb.ogg | named in exe | FUN_00422990, FUN_00424b60 | HUD pickup sound/icons; hero pickups | YES |
| sounds/bugaykick.ogg | named in exe | FUN_0040e570 | bugai attack | YES |
| sounds/bugaymah.ogg | named in exe | FUN_0040e570 | bugai attack | YES |
| sounds/bugaypunish.ogg | named in exe | FUN_0042ccd0 | enemy take-damage | YES |
| sounds/bugaystand.ogg | named in exe | FUN_0040e2e0 | bugai pause | YES |
| sounds/bulletend.ogg | named in exe | FUN_0040b4e0, FUN_0040b7f9 | sniper bullet update | YES |
| sounds/chpok1.ogg | named in exe | FUN_00420030, FUN_004279e0, FUN_0042a220, FUN_0042b2e0, FUN_0042d830 | enemy death removal; hero per-tick; menu sound | YES |
| sounds/clock.ogg | named in exe | FUN_00422990, FUN_00424b60 | HUD pickup sound/icons; hero pickups | YES |
| sounds/dlinnyataka.ogg | named in exe | FUN_004108b0 | dlinnyi attack | YES |
| sounds/dlinnypunish.ogg | named in exe | FUN_0042ccd0 | enemy take-damage | YES |
| sounds/explode1.ogg | named in exe | FUN_00405820 | bomb update/explode | YES |
| sounds/explode2.ogg | named in exe | FUN_0041ef40 | barrel explosion | YES |
| sounds/herodamage1.ogg | named in exe | FUN_004236e3 | hero damage | YES |
| sounds/herodamage2.ogg | named in exe | FUN_004236e3 | hero damage | YES |
| sounds/herodamage3.ogg | named in exe | FUN_004236e3 | hero damage | YES |
| sounds/herodamage4.ogg | named in exe | FUN_004236e3 | hero damage | YES |
| sounds/herohaha.ogg | named in exe | FUN_0040ac45 | all-enemies-dead (herohaha) | YES |
| sounds/invisible.ogg | named in exe | FUN_00422990, FUN_00424b60 | HUD pickup sound/icons; hero pickups | YES |
| sounds/key1.ogg | named in exe | FUN_00422990, FUN_00424b60 | HUD pickup sound/icons; hero pickups | YES |
| sounds/laser.ogg | glob *.ogg only (no name string) | FUN_00434d80 loads dir; played by name only if a call site passes it | NO string reference -> no known trigger | no - web does not load it |
| sounds/laservkl.ogg | named in exe | FUN_0041c3c0 | laser update | YES |
| sounds/logo.ogg | named in exe | FUN_004187a0 | logo screen | no - web loads sample but never plays it (no logo screen) |
| sounds/menu.ogg | named in exe | FUN_0042a220 | menu sound | YES |
| sounds/menu2.ogg | named in exe | FUN_00428cc0, FUN_00429ec0, FUN_0042a220 | menu sound | no - web loads sample but never plays it |
| sounds/objectspark.ogg | named in exe | FUN_0041c4e6, FUN_0041cbac | laser spark | YES |
| sounds/podskazka.ogg | named in exe | FUN_00420740 | hero use (tablet/laser) | YES |
| sounds/push.ogg | named in exe | FUN_00420c20 | hero push | YES |
| sounds/sniperpunish.ogg | named in exe | FUN_0042ccd0 | enemy take-damage | YES |
| sounds/snipershot.ogg | named in exe | FUN_00434b60 | sniper shot | YES |
| sounds/stephero1.ogg | named in exe | FUN_00420c20, FUN_00421ba0 | hero push; hero run state | YES |
| sounds/stephero2.ogg | named in exe | FUN_00420c20, FUN_00421ba0 | hero push; hero run state | YES |
| sounds/stephero3.ogg | named in exe | FUN_00420c20, FUN_00421ba0 | hero push; hero run state | YES |
| sounds/teleport.ogg | named in exe | FUN_00422fc0 | hero state machine / exit teleport | YES |
| sounds/tickblue.ogg | named in exe | FUN_004049f0 | bomb render + tick sounds | YES |
| sounds/tickred.ogg | named in exe | FUN_004049f0 | bomb render + tick sounds | YES |
| sounds/tickyellow.ogg | named in exe | FUN_004049f0 | bomb render + tick sounds | YES |
| sounds/vilkaataka.ogg | named in exe | FUN_00431e60 | vilka attack | YES |
| sounds/vilkapunish.ogg | named in exe | FUN_0042ccd0 | enemy take-damage | YES |
| sounds/vorota1.ogg | named in exe | FUN_0041de40 | lock (zamok) open timeline | YES |
| sounds/vorota2.ogg | named in exe | FUN_0041de40 | lock (zamok) open timeline | YES |
| sounds/vorota3.ogg | named in exe | FUN_0041de40 | lock (zamok) open timeline | YES |
| Data_Demo/animations.dat | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| Data_Demo/characters.dat | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| Data_Demo/font.dat | named in exe | FUN_00435ab0 | font/text init | no |
| Data_Demo/geomobjs.dat | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| Data_Demo/loading.bmp | named in exe | FUN_00414200 | loading screen | no - copied to public/assets but no code references it |
| Data_Demo/texts.dat | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| Data_Demo/textures.dat | named in exe | FUN_00414330 | startup resource preload (loads .dat packs, caches all cgo/icons/exploanim) | no |
| Data_Demo/levels/demos.dat | NOT referenced |  |  | no |
| Data_Demo/levels/levels.dat | NOT referenced |  |  | no |
| Data_Demo/levels/preview.dat | NOT referenced |  |  | no |
| root/BASS.DLL | import (PE import table) | BASS_* calls (FUN_00434d10.. audio) | audio library; web uses WebAudio | no |
| root/DinoAndAliens.exe | the binary | - | source of truth; MUSIC/106 resource used as music.mo3 | no |
| root/download_pack.url | named in exe | FUN_0042b820 |  | no |
| root/license.txt | NOT referenced |  |  | no |
| root/nevosoft.ico | NOT referenced |  |  | no |
| root/registration.exe | named in exe | FUN_0042b850 |  | no |
| root/uninstall.exe | NOT referenced |  |  | no |
| $PLUGINSDIR/InstallOptions.dll | NOT referenced |  |  | no |
| $PLUGINSDIR/ioSpecial.ini | NOT referenced |  |  | no |
| $PLUGINSDIR/modern-header.bmp | NOT referenced |  |  | no |
| $PLUGINSDIR/modern-wizard.bmp | NOT referenced |  |  | no |
