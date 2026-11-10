# RECON - Tank-o-Box (Phase 0)  [orchestrator, 2026-11-06]

## Nguồn
- `original/tankobox-setup-1.exe` (14.3 MB) sha256 693958d4564c512eb31f7775a140a0cb89f6729dea6fceee5a0514840e99ee57
  Inno Setup 5.3.5 installer (strings: "Inno Setup Setup Data (5.3.5)"). Bóc bằng `innoextract` (brew) -> `extracted/inno/app/`.
- Game thật: `engine.exe` (1.2 MB, PE32, D3D8; strings: `ApplicationTanks::on_input_event`, `data/Interface/MainMenu.screen`) sha256 f1be638f...ac0832.
- Launcher/quảng cáo MyPlayCity (BỎ qua): Tank-o-Box.exe, PreLoader.exe, game.exe, *.ico, *.url, lnchdata/, pgame.ini, properties.xml.
- `starter.ini`: dialog cấu hình video (Fullscreen, ResolutionX/Y, ShadowPasses, LightingPasses) -> engine có shadow/lighting passes.
- `data_00.rar` (8.9 MB, RAR 2.0 method m2): 7zz KHÔNG giải được ("Unsupported Method"); `unar` (brew) giải đủ 1617 file -> `extracted/data/Data/`.
- Mô tả (readme.txt): arcade tank, 55 màn, 8 loại xe địch, bàn viết (desk) 3D, 1-2 player (có *2P.level).

## Phân loại (decision tree): (B) BINARY + dữ liệu text/XML data-driven
Logic nội dung nằm trong XML (CONFIRMED bằng đọc file):
- `.level` (249) XML: `<InterfaceScreenLevelSquare ModelName=...terrain_NN.scene TemplateName=1_player.level>` + `Property LevelName/GenerateTankN/...`
- `.object` (70) XML `<GameObject><GameObjectView ModelName=.../><Properties HitPoints...>`; `.state` (20) XML `<EventHandlers>/<EventName>`; `.episode` (8) XML graph màn.
- `.scene` (319) XML `<Scene>` (Camera/Light/ModelFixed/Shader/Material/Text); `.screen` (123) UI; `.anim` (159) XML `<Animation>`.
- `.model` (222): header XML `<Model><Float Name="Positions">` + payload nhị phân (cần RE định dạng; có thể nén).
- Assets: gif (344, đi cặp `_a` = alpha), jpg 66, wav 25, xm 3 (tracker: energy/menu/positive), ffe 5 (RIFF FORC force-feedback), font 4, emitters (particle).
Logic CODE (AI xe địch, va chạm, bắn, điểm, RNG, timestep, thuật toán sinh tank `GenerateTank*`) nằm trong engine.exe -> cần decompile (Ghidra/REA) cho phần mà XML chỉ cấu hình.

## Đề xuất target
3D thời gian thực nhưng camera top-down/nghiêng (camera.scene: Fov 0.66, Pos -3.7,17.7,21.4) -> three.js + Vite (mặc định, giống Dino). Audio: WebAudio + libopenmpt (chiptune3) cho .xm. Ngôn ngữ JS.

## Phase plan đề xuất
0 làm | 1 làm (Ghidra headless cho engine.exe, loader XML = đọc trực tiếp) | 2 RE .model + gif/alpha pairs | 3 làm | 4 làm (checklist 3D, D3D left-handed, Scale="-1 1 -1" ở camera) | 5 SKIP nếu .anim chỉ là transform/UI, xác nhận ở Phase 2 | 6 = content loader (.level/.episode/terrain) | 7 làm (AI, RNG, fixed timestep) | 8 làm (emitters, shot_hole, shadows, lights) | 9 làm (wav + xm, autoplay policy) | 10 làm (screens/HUD/input; 2P) | 11 kiểm tra (save/settings.dat 10B, demo gating?) | 12-14 làm.

## Rủi ro / câu hỏi mở
1. Scope pháp lý: cá nhân/local/phi thương mại; repo private (assets đã commit như Dino) - cần user xác nhận.
2. 1 hay 2 người chơi? Online? (không thấy mạng, chỉ 2P local) - hỏi user có port 2P không.
3. Có giới hạn bản demo/DRM không (55 màn: kiểm tra các level có đủ không, episode1/2 + extra).
4. Có thể game có `.xm`/shader riêng; D3D8 fixed-function (không shader) -> render dễ hơn.
5. Có thể thử nhanh: chạy engine.exe? (không có wine; không chạy binary lạ ngoài VM) -> tham chiếu thị giác chỉ từ asset (map_*.jpg preview) hoặc video do user cung cấp.
