# Phase 0 - Recon & legal/scope

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-00-recon-scope.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: biết chính xác đang port cái gì, bằng gì, giới hạn pháp lý/phạm vi.

**Entry**: user chỉ ra thư mục game gốc + mục tiêu ("chơi được local trên web").

**Việc làm** (agent: recon)
1. Liệt kê file: loại, kích thước, hash (`file`, `shasum`, `ls -la`). Xác định: exe/dll, container dữ liệu, âm thanh, nhạc (module? ogg? mp3?), ảnh preview, metadata (Dino có `*_meta.xml`, `3.jpg` ảnh chụp màn hình = tham chiếu thị giác sẵn!).
2. Nhận diện nền tảng/engine: PE/ELF/Mach-O/APK/Unity(il2cpp/Mono)/Flash/Java/Love2D/Godot pck/…; API đồ hoạ (D3D8/9, GL, Metal), thư viện âm thanh (BASS, FMOD, OpenAL), packer/installer (NSIS `$PLUGINSDIR` ở Dino).
3. Phát hiện packer/bảo vệ (UPX, ASProtect) -> quyết định cần unpack trước phase 1.
4. Chọn hướng: (a) có source -> port source; (b) chỉ binary -> RE (pipeline đầy đủ); (c) engine mã nguồn mở có runtime web (vd Unity WebGL, Godot, ScummVM, OpenMW...) -> cân nhắc dùng lại runtime thay vì port (SPECULATIVE: chưa làm ở Dino).
5. Chốt scope với user: phi thương mại, local, cá nhân (Dino: "không dùng thương mại"). Ghi vào TASKS.md và README dự án. Không phân phối asset gốc.
6. Chọn target kỹ thuật (mặc định three.js + Vite; thay đổi nếu game 2D -> Canvas2D/Phaser/PixiJS; engine C/C++ có source -> Emscripten/WASM).
7. Ghi các hạn chế đã biết: demo/shareware gating (timer, nag), DRM, mạng.

**Exit**: `docs/RECON.md` (hoặc mục trong TASKS.md) gồm: danh sách file, engine/API, hướng chọn, target, scope pháp lý, rủi ro, câu hỏi mở cho user. User đã xác nhận scope.

**Artefact**: RECON.md, TASKS.md khởi tạo, quyết định target.
