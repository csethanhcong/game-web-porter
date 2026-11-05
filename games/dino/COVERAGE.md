# COVERAGE - hàm game-specific trong exe chưa được tham chiếu trong web

Nguồn: Ghidra headless (2308 hàm tìm bằng quét E8/prologue; 838 hàm game 0x401000-0x440838, còn lại CRT/D3D/BASS). 364 hàm game có địa chỉ được nhắc trong src/*.js + FORMATS.md; **495 chưa nhắc** (bảng dưới).
Lưu ý: 'chưa tham chiếu' chỉ là proxy - web nhiều chỗ tái hiện hành vi mà không ghi địa chỉ. Nhãn module và ưu tiên là SUY ĐOÁN theo vùng địa chỉ + kích thước, chưa xác nhận từng hàm.

## Gap đã xác nhận (đọc decompile)
- FUN_0041f2f0 (G): ĐÃ PORT (src/envsprites.js; mục tiêu theo cờ ô, bảng nổ = heat grid, seed = ob.rnd: CONFIRMED).
- FUN_0041f0a0 (T): ĐÃ PORT (src/envsprites.js; mỗi bound "leaves" của tree1/tree2.cgo = 1 sprite frame 0x38; góc sprite type 0x32 CONFIRMED FUN_0042dcb0: xoay ngược dấu; chỉ còn fwd camera = GUESS).
- Joystick thật: ĐÃ PORT qua Gamepad API (xem FORMATS.md mục Joystick; thứ tự nút/trục pad vs DirectInput là GUESS).
- Cheat chết: mask 0x1000/0x2000/0x4000 qua FUN_0043ffe0, không có caller (không cần port).
- Menu replaywin/replayloss; sniper billboard (không tồn tại riêng: viên đạn = drawBullets/FUN_0040b2d0 đã port); độ nghiêng up-axis của frame 0x32 (không phải quad thứ 2 - xem FORMATS.md). Hoa súng: ĐÃ PORT (FUN_004393f0, main.js buildWater). mắt hero: ĐÃ PORT (main.js eyeWander: lia mắt stream RNG 1 + nhánh rung khi trúng đạn +0x380/+0x37c, FUN_004232c0/FUN_00401830/FUN_00423630; thứ tự compose ovr*local CONFIRMED). Chữ 'R' replay: ĐÃ PORT (hud.js, FUN_00416dd0).
- ĐÃ XONG (rà soát): cửa xoay/cắm chìa/tia lửa khóa (main.js stepLocks, FUN_0041e420/0041e6e0/0041de40); tablet 'zoom' = hộp chữ trượt HUD 750 ms (hud.js; exe không có zoom camera); gương = object generic + phản xạ laser (không có code vẽ riêng); INFO showcase (src/menu3d.js, FUN_0041b740; ánh sáng/vật liệu menu = đèn level menulevel + material mặc định, CONFIRMED, xem FORMATS.md "Menu 3D lighting"); dynamic light #1 (main.js XL; còn GUESS ánh xạ cường độ); mũ hero + hiệu ứng nevidimka phía hero (src/herofx.js: alpha 1-0.7a, mũ nevidimka.msh/hat.jpg trên HeadNub, Ponytail1 Rz(-40), fade xác/thoát) - xem FORMATS.md 'gap sweep'.

## Âm thanh
- Cả 44 tên sample của exe đều được phát trong web, không thấy lệnh phát thiếu. 'chihanie' không có file. ORDERS, fade 1200ms, 3D mix, heroHurt cooldown 400ms khớp.

## Input
- Bảng phím mặc định/remap (13 slot), P pause, GRID/FREECAM khớp menu.keys(); joystick thật đã port (DirectInput8 -> Gamepad API).

## Chuỗi
- Đã kiểm tra (FORMATS.md mục Chuỗi): lookout, mainatgame, controls không tồn tại trong exe (dead keys); tutorial= nạp nhưng không dùng; joybutton dùng ở UI joystick (đã port); startdownload dùng ở màn new game/DOWNLOAD (đã port, giãn dòng GUESS).

## Bảng hàm chưa tham chiếu

| Ưu tiên | Địa chỉ | Size | Module (đoán) | Số caller | Callers |
|---|---|---|---|---|---|
| Cao | 0x0041f2f0 | 1771 | render/vật thể (vtable) | 1 | 41ee50* |
| Cao | 0x0041a8a0 | 1650 | render/vật thể (vtable) | 1 | 41af20* |
| Cao | 0x0041a3f0 | 1171 | render/vật thể (vtable) | 1 | 41af20* |
| Cao | 0x0040f8d0 | 938 | enemy/vật thể (vtable) | 1 |  |
| Cao | 0x00412e70 | 918 | enemy/vật thể (vtable) | 0 |  |
| Cao | 0x00432f40 | 892 | enemy/boss/hiệu ứng | 1 |  |
| Cao | 0x00412b60 | 782 | enemy/vật thể (vtable) | 0 |  |
| Cao | 0x004232c0 | 782 | render/vật thể (vtable) | 2 | 416450* |
| Cao | 0x0041eba0 | 648 | render/vật thể (vtable) | 1 | 41dc20* |
| Cao | 0x00412840 | 623 | enemy/vật thể (vtable) | 6 | 40a890*,416450*,4187a0*,41af20* |
| Cao | 0x0042b5d0 | 581 | enemy/boss/hiệu ứng | 5 | 428cc0*,42ab00* |
| Cao | 0x004191f0 | 560 | enemy/vật thể (vtable) | 1 |  |
| Cao | 0x0040fce0 | 499 | enemy/vật thể (vtable) | 1 |  |
| Cao | 0x00410f30 | 401 | enemy/vật thể (vtable) | 18 | 40f710*,40fce0,40fef0*,410660* |
| TB | 0x004355b0 | 1237 | particle/hud/render 2D | 1 |  |
| TB | 0x0043b010 | 870 | input/loader/tiện ích | 1 | 43b4e0 |
| TB | 0x0043bec0 | 612 | input/loader/tiện ích | 2 | 4111a0,42bca0 |
| TB | 0x00402710 | 600 | logic/đối tượng (vtable, khối đầu) | 1 | 401a80* |
| TB | 0x0043aab0 | 599 | input/loader/tiện ích | 1 | 442bcd |
| TB | 0x0041f0a0 | 578 | render/vật thể (vtable) | 1 | 41ee50* |
| TB | 0x00437ee0 | 576 | particle/hud/render 2D | 1 | 4266c0* |
| TB | 0x0040adf0 | 536 | logic/đối tượng (vtable, khối đầu) | 1 | 416450* |
| TB | 0x0040c170 | 485 | logic/đối tượng (vtable, khối đầu) | 1 | 416450* |
| TB | 0x0042c520 | 468 | enemy/boss/hiệu ứng | 1 | 42bdc0* |
| TB | 0x0042c740 | 463 | enemy/boss/hiệu ứng | 1 | 42bdc0* |
| TB | 0x004293d0 | 462 | enemy/boss/hiệu ứng | 15 | 4293d0,4295a0* |
| TB | 0x004010d0 | 426 | logic/đối tượng (vtable, khối đầu) | 2 | 401000,4013c0* |
| TB | 0x00431100 | 413 | enemy/boss/hiệu ứng | 1 |  |
| TB | 0x0043a6f0 | 386 | input/loader/tiện ích | 1 | 43a9b0 |
| TB | 0x0042baa0 | 371 | enemy/boss/hiệu ứng | 1 | 42b9d0 |
| TB | 0x00406880 | 369 | logic/đối tượng (vtable, khối đầu) | 1 | 405240* |
| TB | 0x0043d9c0 | 365 | input/loader/tiện ích | 1 | 434d80* |
| TB | 0x0043c830 | 364 | input/loader/tiện ích | 0 |  |
| TB | 0x0043c9a0 | 364 | input/loader/tiện ích | 1 | 4122b0* |
| TB | 0x0043f780 | 363 | input/loader/tiện ích | 1 | 43aab0 |
| TB | 0x004247a0 | 362 | render/vật thể (vtable) | 1 | 4295a0* |
| TB | 0x0043aeb0 | 340 | input/loader/tiện ích | 1 | 43b010 |
| TB | 0x0043b380 | 340 | input/loader/tiện ích | 2 | 43b4e0,43b630 |
| TB | 0x0043b4e0 | 334 | input/loader/tiện ích | 1 | 43aab0 |
| TB | 0x0042db10 | 325 | enemy/boss/hiệu ứng | 5 |  |
| TB | 0x00406d30 | 319 | logic/đối tượng (vtable, khối đầu) | 4 | 407890*,414d10,414de0,41b740* |
| TB | 0x0043db30 | 319 | input/loader/tiện ích | 6 | 414330*,43e550* |
| TB | 0x0043d0c0 | 314 | input/loader/tiện ích | 1 | 40f410* |
| TB | 0x00429040 | 297 | enemy/boss/hiệu ứng | 1 | 428cc0* |
| TB | 0x004025e0 | 287 | logic/đối tượng (vtable, khối đầu) | 10 | 41a8a0,41af20*,423e40*,42db10 |
| TB | 0x0042b040 | 274 | enemy/boss/hiệu ứng | 1 | 42ab00* |
| TB | 0x00413640 | 273 | enemy/vật thể (vtable) | 1 | 4135e0 |
| TB | 0x00428ba0 | 273 | enemy/boss/hiệu ứng | 3 | 416ce0,416dd0*,41af20* |
| TB | 0x0042bca0 | 273 | enemy/boss/hiệu ứng | 5 | 40f080*,4111a0,41fb70*,4390e0* |
| TB | 0x0040d840 | 268 | logic/đối tượng (vtable, khối đầu) | 1 |  |
| TB | 0x0041f9e0 | 260 | render/vật thể (vtable) | 1 | 41eba0 |
| TB | 0x0041bf10 | 248 | render/vật thể (vtable) | 1 | 41b740* |
| TB | 0x0042c9c0 | 248 | enemy/boss/hiệu ứng | 4 | 40d6c0*,40f710*,430fa0*,432d80* |
| TB | 0x004326a0 | 244 | enemy/boss/hiệu ứng | 1 | 432620 |
| TB | 0x0040f5e0 | 235 | enemy/vật thể (vtable) | 1 | 40f410* |
| TB | 0x00416ce0 | 233 | enemy/vật thể (vtable) | 1 | 416450* |
| TB | 0x00413290 | 232 | enemy/vật thể (vtable) | 2 | 412840 |
| TB | 0x00412690 | 210 | enemy/vật thể (vtable) | 1 | 416450* |
| TB | 0x0040efb0 | 206 | logic/đối tượng (vtable, khối đầu) | 5 | 4045a0,41d0d0,48a390,48a490 |
| TB | 0x004044d0 | 198 | logic/đối tượng (vtable, khối đầu) | 1 | 48a920 |
| TB | 0x004246d0 | 198 | render/vật thể (vtable) | 11 | 4295a0* |
| TB | 0x00401280 | 184 | logic/đối tượng (vtable, khối đầu) | 5 | 4010b0,406d30,406ea0,414d10 |
| TB | 0x0042b9f0 | 176 | enemy/boss/hiệu ứng | 0 |  |
| TB | 0x004030c0 | 170 | logic/đối tượng (vtable, khối đầu) | 4 | 401830*,401a80*,41de40*,41f0a0 |
| TB | 0x00406a00 | 168 | logic/đối tượng (vtable, khối đầu) | 11 | 406880,406f40*,41b740* |
| TB | 0x0041d0d0 | 164 | render/vật thể (vtable) | 5 | 40c890,40d140,41c030,435540 |
| TB | 0x00401000 | 162 | logic/đối tượng (vtable, khối đầu) | 5 | 42c940,48ad30,48ad50 |
| TB | 0x004309e0 | 162 | enemy/boss/hiệu ứng | 4 | 413790,41d050*,48a9d0,48aaf0 |
| TB | 0x00418610 | 161 | enemy/vật thể (vtable) | 5 | 4158e0*,415f20*,4191f0,41a8a0 |
| TB | 0x00406ea0 | 160 | logic/đối tượng (vtable, khối đầu) | 0 |  |
| TB | 0x0042c390 | 157 | enemy/boss/hiệu ứng | 2 | 42b9f0,42bca0 |
| TB | 0x00418470 | 156 | enemy/vật thể (vtable) | 1 | 4183f0* |
| TB | 0x00402430 | 153 | logic/đối tượng (vtable, khối đầu) | 2 | 40d840,40f8d0 |
| TB | 0x00418510 | 149 | enemy/vật thể (vtable) | 1 | 418470 |
| TB | 0x0042d570 | 131 | enemy/boss/hiệu ứng | 3 | 40db60*,431510*,433580* |
| TB | 0x004134d0 | 126 | enemy/vật thể (vtable) | 1 | 4134b0 |
| TB | 0x00412ab0 | 125 | enemy/vật thể (vtable) | 1 | 412b30 |
| TB | 0x00402c50 | 122 | logic/đối tượng (vtable, khối đầu) | 5 | 401600* |
| TB | 0x00404420 | 119 | logic/đối tượng (vtable, khối đầu) | 1 | 404170* |
| TB | 0x00403cc0 | 117 | logic/đối tượng (vtable, khối đầu) | 1 | 403c40 |
| TB | 0x00405610 | 115 | logic/đối tượng (vtable, khối đầu) | 2 | 405690*,407890* |
| TB | 0x004292f0 | 115 | enemy/boss/hiệu ứng | 8 | 4292d0,42a220*,42ab00*,42b5d0 |
| TB | 0x00401340 | 114 | logic/đối tượng (vtable, khối đầu) | 10 | 4013c0*,402970,4029a0,4029d0 |
| TB | 0x004035d0 | 114 | logic/đối tượng (vtable, khối đầu) | 4 | 401a80*,403de0*,4158e0* |
| TB | 0x0040b250 | 113 | logic/đối tượng (vtable, khối đầu) | 0 |  |
| TB | 0x00424a00 | 109 | render/vật thể (vtable) | 6 | 425a70*,4271b0*,427d80* |
| TB | 0x0040c100 | 102 | logic/đối tượng (vtable, khối đầu) | 1 | 40f8d0 |
| TB | 0x004111a0 | 101 | enemy/vật thể (vtable) | 0 |  |
| TB | 0x0040c360 | 100 | logic/đối tượng (vtable, khối đầu) | 1 | 406f40* |
| TB | 0x004051d0 | 97 | logic/đối tượng (vtable, khối đầu) | 0 |  |
| TB | 0x0042e230 | 95 | enemy/boss/hiệu ứng | 6 | 407890*,413d80,413de0*,413f30* |
| TB | 0x00403c60 | 94 | logic/đối tượng (vtable, khối đầu) | 1 | 403de0* |
| TB | 0x00432640 | 94 | enemy/boss/hiệu ứng | 1 | 432840* |
| TB | 0x0042bc20 | 93 | enemy/boss/hiệu ứng | 4 | 414330*,42bca0 |
| TB | 0x0042c430 | 92 | enemy/boss/hiệu ứng | 1 | 42c390 |
| TB | 0x0042c940 | 90 | enemy/boss/hiệu ứng | 5 | 40d680,40f6d0,41fb30,430f60 |
| TB | 0x00413580 | 89 | enemy/vật thể (vtable) | 12 | 406f40*,4135e0,41b740*,41c050* |
| TB | 0x00429370 | 88 | enemy/boss/hiệu ứng | 13 | 4292d0,4293d0,4295a0*,42ab00* |
| TB | 0x00403d40 | 87 | logic/đối tượng (vtable, khối đầu) | 1 | 403de0* |
| TB | 0x00411140 | 87 | enemy/vật thể (vtable) | 1 |  |
| TB | 0x004327a0 | 87 | enemy/boss/hiệu ứng | 1 | 432840* |
| TB | 0x004249a0 | 86 | render/vật thể (vtable) | 8 | 425c60*,426070*,4266c0*,4271b0* |
| TB | 0x0040c750 | 85 | logic/đối tượng (vtable, khối đầu) | 3 | 48a980,48aba0,48add0 |
| TB | 0x00404250 | 84 | logic/đối tượng (vtable, khối đầu) | 4 | 404170*,4042b0* |
| TB | 0x00413d80 | 84 | enemy/vật thể (vtable) | 2 | 414e30*,42b5d0 |
| TB | 0x0040d0c0 | 83 | logic/đối tượng (vtable, khối đầu) | 1 | 40ce90* |
| TB | 0x00403a50 | 82 | logic/đối tượng (vtable, khối đầu) | 2 | 4039c0*,439c90 |
| TB | 0x004040b0 | 81 | logic/đối tượng (vtable, khối đầu) | 0 |  |
| TB | 0x004185b0 | 81 | enemy/vật thể (vtable) | 1 | 4183f0* |
| TB | 0x00419530 | 81 | enemy/vật thể (vtable) | 1 | 48b1f0 |
| TB | 0x0042b970 | 81 | enemy/boss/hiệu ứng | 1 | 48ae20 |
| TB | 0x00402b30 | 80 | logic/đối tượng (vtable, khối đầu) | 11 | 401600*,401830*,401a80*,402df0* |
| TB | 0x00406ab0 | 80 | logic/đối tượng (vtable, khối đầu) | 1 | 406a00 |
| TB | 0x0040ada0 | 79 | logic/đối tượng (vtable, khối đầu) | 1 | 42db10 |
| TB | 0x00414de0 | 78 | enemy/vật thể (vtable) | 1 | 48b1c0 |
| TB | 0x004135e0 | 73 | enemy/vật thể (vtable) | 69 | 405690*,414330*,41b740* |
| TB | 0x0040ef60 | 72 | logic/đối tượng (vtable, khối đầu) | 3 | 4044d0,413640,41d050* |
| TB | 0x0040c570 | 71 | logic/đối tượng (vtable, khối đầu) | 11 | 40a890*,40adf0,415f20*,416450* |
| TB | 0x00419160 | 70 | enemy/vật thể (vtable) | 1 |  |
| TB | 0x0040bb70 | 69 | logic/đối tượng (vtable, khối đầu) | 1 | 414e30* |
| TB | 0x00403530 | 67 | logic/đối tượng (vtable, khối đầu) | 37 | 401a80*,402710,405820*,40adf0 |
| TB | 0x0042b580 | 67 | enemy/boss/hiệu ứng | 1 | 42b5d0 |
| TB | 0x0042dc60 | 65 | enemy/boss/hiệu ứng | 6 | 40d840,40f8d0,4232c0,431100 |
| TB | 0x0040ad60 | 64 | logic/đối tượng (vtable, khối đầu) | 1 | 416450* |
| TB | 0x0041bd60 | 63 | render/vật thể (vtable) | 1 | 419530 |
| TB | 0x00403b60 | 61 | logic/đối tượng (vtable, khối đầu) | 33 | 403af0*,40b470*,40bc40*,40bdf0* |
| TB | 0x0042c490 | 61 | enemy/boss/hiệu ứng | 1 | 42c390 |
| TB | 0x0040c830 | 60 | logic/đối tượng (vtable, khối đầu) | 1 | 48ab60 |
| Thấp | 0x0043c540 | 297 | input/loader/tiện ích | 0 |  |
| Thấp | 0x00439d50 | 295 | particle/hud/render 2D | 0 |  |
| Thấp | 0x0043d890 | 291 | input/loader/tiện ích | 15 | 4013c0*,403de0*,407890*,40f080* |
| Thấp | 0x0043e0a0 | 291 | input/loader/tiện ích | 1 | 407890* |
| Thấp | 0x0043cb10 | 290 | input/loader/tiện ích | 2 | 435cc0,435e30* |
| Thấp | 0x0043cc40 | 290 | input/loader/tiện ích | 8 | 4187a0*,424f90*,4376d0*,43cfd0 |
| Thấp | 0x004399d0 | 289 | particle/hud/render 2D | 0 |  |
| Thấp | 0x00435cc0 | 276 | particle/hud/render 2D | 1 | 424a70* |
| Thấp | 0x0043cd70 | 275 | input/loader/tiện ích | 2 | 42dcb0* |
| Thấp | 0x004385b0 | 268 | particle/hud/render 2D | 5 | 40a890*,414330*,41d180* |
| Thấp | 0x0043f080 | 263 | input/loader/tiện ích | 3 | 417df0*,42b5d0,43aab0 |
| Thấp | 0x0043b6c0 | 262 | input/loader/tiện ích | 2 | 43ba90,43be20 |
| Thấp | 0x0043a9b0 | 255 | input/loader/tiện ích | 1 | 43aab0 |
| Thấp | 0x0043dfb0 | 237 | input/loader/tiện ích | 6 | 40f080*,414330* |
| Thấp | 0x0043dec0 | 231 | input/loader/tiện ích | 6 | 403de0*,4295a0*,42bca0,432840* |
| Thấp | 0x0043cfd0 | 229 | input/loader/tiện ích | 4 | 40adf0,40c170 |
| Thấp | 0x0043c280 | 225 | input/loader/tiện ích | 14 | 4045c0*,405e70*,40ce90*,40f410* |
| Thấp | 0x00438740 | 221 | particle/hud/render 2D | 3 | 406d30,40a890*,438820 |
| Thấp | 0x00439b00 | 219 | particle/hud/render 2D | 0 |  |
| Thấp | 0x0043e330 | 216 | input/loader/tiện ích | 1 | 407890* |
| Thấp | 0x0043c750 | 215 | input/loader/tiện ích | 0 |  |
| Thấp | 0x0043c670 | 213 | input/loader/tiện ích | 4 | 4122b0*,413850*,43c830,43c9a0 |
| Thấp | 0x0043f970 | 188 | input/loader/tiện ích | 2 | 417df0*,428cc0* |
| Thấp | 0x0043d7d0 | 187 | input/loader/tiện ích | 2 | 43f460,440140* |
| Thấp | 0x004382c0 | 184 | particle/hud/render 2D | 1 | 43ba50 |
| Thấp | 0x00439c90 | 179 | particle/hud/render 2D | 0 |  |
| Thấp | 0x0043c1d0 | 172 | input/loader/tiện ích | 6 | 40a890*,415f20*,41a8a0 |
| Thấp | 0x00439be0 | 171 | particle/hud/render 2D | 3 | 439d50 |
| Thấp | 0x004381a0 | 163 | particle/hud/render 2D | 1 | 438180 |
| Thấp | 0x0043e1d0 | 137 | input/loader/tiện ích | 4 | 407890*,4295a0* |
| Thấp | 0x00440610 | 136 | input/loader/tiện ích | 1 | 4406f0 |
| Thấp | 0x0043dc70 | 135 | input/loader/tiện ích | 4 | 43d890,43d9c0,43db30 |
| Thấp | 0x00440040 | 135 | input/loader/tiện ích | 1 | 43a490 |
| Thấp | 0x00434c40 | 134 | particle/hud/render 2D | 3 | 407890*,4187a0*,434cd0* |
| Thấp | 0x0043dd00 | 134 | input/loader/tiện ích | 4 | 43d7d0,43d890,43d9c0,43e710* |
| Thấp | 0x0043f370 | 132 | input/loader/tiện ích | 1 | 43f190* |
| Thấp | 0x0043c450 | 130 | input/loader/tiện ích | 2 | 417c30* |
| Thấp | 0x004386c0 | 128 | particle/hud/render 2D | 2 | 438420*,4385b0 |
| Thấp | 0x0043de40 | 125 | input/loader/tiện ích | 1 | 43d7b0 |
| Thấp | 0x0043e460 | 121 | input/loader/tiện ích | 6 | 416dd0*,43b010,43dc70,43dd00 |
| Thấp | 0x00439f50 | 120 | particle/hud/render 2D | 1 | 4399d0 |
| Thấp | 0x00440540 | 117 | input/loader/tiện ích | 0 |  |
| Thấp | 0x00439e80 | 116 | particle/hud/render 2D | 0 |  |
| Thấp | 0x0043be20 | 116 | input/loader/tiện ích | 2 | 43a670*,43aab0 |
| Thấp | 0x0043f460 | 108 | input/loader/tiện ích | 1 | 43aab0 |
| Thấp | 0x00438250 | 106 | particle/hud/render 2D | 1 | 43ba50 |
| Thấp | 0x004354b0 | 102 | particle/hud/render 2D | 4 | 4355b0 |
| Thấp | 0x0043ae00 | 101 | input/loader/tiện ích | 7 | 43aeb0 |
| Thấp | 0x0043e4e0 | 99 | input/loader/tiện ích | 0 |  |
| Thấp | 0x0043f400 | 94 | input/loader/tiện ích | 2 | 42b850*,43aab0 |
| Thấp | 0x0043f720 | 92 | input/loader/tiện ích | 1 | 43f780 |
| Thấp | 0x00439080 | 88 | particle/hud/render 2D | 1 |  |
| Thấp | 0x0043b630 | 87 | input/loader/tiện ích | 2 | 42b040,42b160* |
| Thấp | 0x0043bae0 | 85 | input/loader/tiện ích | 30 | 4025e0,4045c0*,405e70*,40adf0 |
| Thấp | 0x0043dd90 | 84 | input/loader/tiện ích | 1 | 407890* |
| Thấp | 0x0043c4e0 | 82 | input/loader/tiện ích | 0 |  |
| Thấp | 0x0043bb40 | 79 | input/loader/tiện ích | 0 |  |
| Thấp | 0x0043f320 | 78 | input/loader/tiện ích | 1 | 43f080 |
| Thấp | 0x004401c0 | 78 | input/loader/tiện ích | 1 | 43a4e0* |
| Thấp | 0x0043ddf0 | 77 | input/loader/tiện ích | 2 | 43f400,4400d0* |
| Thấp | 0x0043e2e0 | 77 | input/loader/tiện ích | 6 | 40f080* |
| Thấp | 0x0043ba90 | 75 | input/loader/tiện ích | 1 | 43a490 |
| Thấp | 0x0043e410 | 75 | input/loader/tiện ích | 9 | 407890*,40f080*,43e710* |
| Thấp | 0x0043c130 | 71 | input/loader/tiện ích | 49 | 4025e0,4045c0*,405e70*,40adf0 |
| Thấp | 0x0043fff0 | 70 | input/loader/tiện ích | 1 | 427740* |
| Thấp | 0x0043bc90 | 69 | input/loader/tiện ích | 0 |  |
| Thấp | 0x0043c180 | 68 | input/loader/tiện ích | 1 | 423e40* |
| Thấp | 0x00439950 | 67 | particle/hud/render 2D | 1 | 438d80* |
| Thấp | 0x00440210 | 67 | input/loader/tiện ích | 1 | 43a4e0* |
| Thấp | 0x004406a0 | 66 | input/loader/tiện ích | 12 | 403ab0,403b60,411240*,411710* |
| Thấp | 0x00439030 | 65 | particle/hud/render 2D | 1 | 4393f0* |
| Thấp | 0x0043a490 | 65 | input/loader/tiện ích | 1 | 43aab0 |
| Thấp | 0x0043d6b0 | 64 | input/loader/tiện ích | 2 | 43bec0 |
| Thấp | 0x0040c6d0 | 59 | logic/đối tượng (vtable, khối đầu) | 9 | 40bc40*,40bdf0*,40d950*,40fce0 |
| Thấp | 0x0043f6e0 | 59 | input/loader/tiện ích | 1 | 43f780 |
| Thấp | 0x00424910 | 57 | render/vật thể (vtable) | 1 | 4266c0* |
| Thấp | 0x00437d30 | 56 | particle/hud/render 2D | 6 | 425a70*,4271b0*,427d80* |
| Thấp | 0x004407f1 | 56 | input/loader/tiện ích | 1 | 440839 |
| Thấp | 0x00406ca0 | 54 | logic/đối tượng (vtable, khối đầu) | 14 | 405e70*,42dcb0*,430b60*,439c90 |
| Thấp | 0x00439fd0 | 54 | particle/hud/render 2D | 2 | 439c90 |
| Thấp | 0x0040c5c0 | 53 | logic/đối tượng (vtable, khối đầu) | 7 | 40c570,40c750 |
| Thấp | 0x00419590 | 53 | enemy/vật thể (vtable) | 1 | 42a220* |
| Thấp | 0x0042c700 | 52 | enemy/boss/hiệu ứng | 1 | 42c520 |
| Thấp | 0x0043ae70 | 52 | input/loader/tiện ích | 3 | 43aeb0 |
| Thấp | 0x0043ba50 | 52 | input/loader/tiện ích | 1 | 43be20 |
| Thấp | 0x00406460 | 51 | logic/đối tượng (vtable, khối đầu) | 13 | 4045c0*,405e70*,40bc40*,40c100 |
| Thấp | 0x004110e0 | 51 | enemy/vật thể (vtable) | 1 | 413640 |
| Thấp | 0x0041faf0 | 51 | render/vật thể (vtable) | 12 | 41f2f0,4399d0,439b00,439be0 |
| Thấp | 0x00438820 | 50 | particle/hud/render 2D | 1 | 40a890* |
| Thấp | 0x0043a010 | 49 | input/loader/tiện ích | 1 | 439c90 |
| Thấp | 0x004029a0 | 48 | logic/đối tượng (vtable, khối đầu) | 0 |  |
| Thấp | 0x004029d0 | 48 | logic/đối tượng (vtable, khối đầu) | 0 |  |
| Thấp | 0x00403ab0 | 47 | logic/đối tượng (vtable, khối đầu) | 3 | 403a50,403de0*,439c90 |
| Thấp | 0x00402970 | 46 | logic/đối tượng (vtable, khối đầu) | 0 |  |
| Thấp | 0x0040bab0 | 46 | logic/đối tượng (vtable, khối đầu) | 1 | 41dbe0* |
| Thấp | 0x0043f690 | 46 | input/loader/tiện ích | 1 | 43f6c0 |
| Thấp | 0x00402b00 | 45 | logic/đối tượng (vtable, khối đầu) | 201 | 4010d0,401830*,401a80*,402710 |
| Thấp | 0x00413480 | 45 | enemy/vật thể (vtable) | 1 | 48ac00 |
| Thấp | 0x00430ab0 | 45 | enemy/boss/hiệu ứng | 1 | 439080 |
| Thấp | 0x00404110 | 44 | logic/đối tượng (vtable, khối đầu) | 1 |  |
| Thấp | 0x0040c800 | 44 | logic/đối tượng (vtable, khối đầu) | 1 | 48ab40 |
| Thấp | 0x00411210 | 44 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00413380 | 44 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00413760 | 44 | enemy/vật thể (vtable) | 1 | 4134d0 |
| Thấp | 0x004186c0 | 44 | enemy/vật thể (vtable) | 1 | 4158e0* |
| Thấp | 0x0042c360 | 44 | enemy/boss/hiệu ứng | 1 |  |
| Thấp | 0x0042c4d0 | 44 | enemy/boss/hiệu ứng | 1 |  |
| Thấp | 0x00430f00 | 44 | enemy/boss/hiệu ứng | 1 |  |
| Thấp | 0x00430f30 | 44 | enemy/boss/hiệu ứng | 1 | 4309e0 |
| Thấp | 0x00432d10 | 44 | enemy/boss/hiệu ứng | 1 |  |
| Thấp | 0x00438120 | 44 | particle/hud/render 2D | 1 | 48af00 |
| Thấp | 0x00438860 | 44 | particle/hud/render 2D | 1 |  |
| Thấp | 0x004399a0 | 44 | particle/hud/render 2D | 1 | 48afa0 |
| Thấp | 0x0043d720 | 44 | input/loader/tiện ích | 1 | 48b010 |
| Thấp | 0x0043d750 | 44 | input/loader/tiện ích | 1 | 48b030 |
| Thấp | 0x0043f4d0 | 44 | input/loader/tiện ích | 1 |  |
| Thấp | 0x00402a20 | 43 | logic/đối tượng (vtable, khối đầu) | 222 | 401000,401a80*,4025e0,402710 |
| Thấp | 0x004181a0 | 43 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x004181d0 | 43 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00418200 | 43 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00403090 | 42 | logic/đối tượng (vtable, khối đầu) | 139 | 403040*,4030c0,403580*,4035d0 |
| Thấp | 0x00402fd0 | 40 | logic/đối tượng (vtable, khối đầu) | 18 | 401830*,4029d0,4049f0*,405e70* |
| Thấp | 0x00435bf0 | 39 | particle/hud/render 2D | 15 | 416dd0*,424c10*,424f90*,425470* |
| Thấp | 0x0043bd80 | 39 | input/loader/tiện ích | 3 | 416450*,41af20*,43a670* |
| Thấp | 0x0043bdb0 | 39 | input/loader/tiện ích | 0 |  |
| Thấp | 0x004044a0 | 38 | logic/đối tượng (vtable, khối đầu) | 1 | 403de0* |
| Thấp | 0x0041be80 | 38 | render/vật thể (vtable) | 1 |  |
| Thấp | 0x0043b690 | 38 | input/loader/tiện ích | 4 | 427d80*,42ab00*,42b160*,43ba90 |
| Thấp | 0x0043a050 | 37 | input/loader/tiện ích | 1 | 439c90 |
| Thấp | 0x0040c7d0 | 36 | logic/đối tượng (vtable, khối đầu) | 1 | 48ab20 |
| Thấp | 0x00413550 | 36 | enemy/vật thể (vtable) | 0 |  |
| Thấp | 0x00419490 | 36 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x0041bda0 | 36 | render/vật thể (vtable) | 1 |  |
| Thấp | 0x00430950 | 36 | enemy/boss/hiệu ứng | 1 | 48ae60 |
| Thấp | 0x00430980 | 36 | enemy/boss/hiệu ứng | 1 | 48ae80 |
| Thấp | 0x00438150 | 36 | particle/hud/render 2D | 1 | 48af80 |
| Thấp | 0x0043d780 | 36 | input/loader/tiện ích | 1 | 48b070 |
| Thấp | 0x00406d00 | 35 | logic/đối tượng (vtable, khối đầu) | 47 | 40c360,40c830,4309e0,43c450 |
| Thấp | 0x00406e70 | 35 | logic/đối tượng (vtable, khối đầu) | 1 | 41d180* |
| Thấp | 0x00402fa0 | 34 | logic/đối tượng (vtable, khối đầu) | 31 | 401830*,401a80*,402970,4029a0 |
| Thấp | 0x00406b00 | 34 | logic/đối tượng (vtable, khối đầu) | 229 | 4056f0*,405e70*,40a890*,40adf0 |
| Thấp | 0x0040c3e0 | 34 | logic/đối tượng (vtable, khối đầu) | 5 | 407890*,4122b0*,414330*,416450* |
| Thấp | 0x004133d0 | 34 | enemy/vật thể (vtable) | 2 | 40ef60,4110e0 |
| Thấp | 0x0042c910 | 34 | enemy/boss/hiệu ứng | 1 | 42c740 |
| Thấp | 0x0043bc00 | 34 | input/loader/tiện ích | 0 |  |
| Thấp | 0x0043f5d0 | 34 | input/loader/tiện ích | 2 | 42b160*,43f190* |
| Thấp | 0x00403990 | 33 | logic/đối tượng (vtable, khối đầu) | 8 | 4024d0*,406ca0,40d840,40f8d0 |
| Thấp | 0x00403c10 | 33 | logic/đối tượng (vtable, khối đầu) | 1 | 48a900 |
| Thấp | 0x00404140 | 33 | logic/đối tượng (vtable, khối đầu) | 2 | 403de0*,42bdc0* |
| Thấp | 0x00406c70 | 33 | logic/đối tượng (vtable, khối đầu) | 26 | 405e70*,42bdc0*,42dcb0*,4309e0 |
| Thấp | 0x004127b0 | 33 | enemy/vật thể (vtable) | 1 | 48ab80 |
| Thấp | 0x00412b30 | 33 | enemy/vật thể (vtable) | 2 | 40bc40* |
| Thấp | 0x004309b0 | 33 | enemy/boss/hiệu ứng | 1 | 48aea0 |
| Thấp | 0x004325f0 | 33 | enemy/boss/hiệu ứng | 1 | 48aec0 |
| Thấp | 0x0043d6f0 | 33 | input/loader/tiện ích | 1 | 48aff0 |
| Thấp | 0x0040c600 | 31 | logic/đối tượng (vtable, khối đầu) | 9 | 40a890*,411c30*,414330*,415f20* |
| Thấp | 0x0040c620 | 31 | logic/đối tượng (vtable, khối đầu) | 10 | 40a890*,411680*,411710*,415f20* |
| Thấp | 0x0040d680 | 31 | logic/đối tượng (vtable, khối đầu) | 1 | 48aaa0 |
| Thấp | 0x0040f6d0 | 31 | enemy/vật thể (vtable) | 1 | 48aa70 |
| Thấp | 0x00414dc0 | 31 | enemy/vật thể (vtable) | 1 | 48ac60 |
| Thấp | 0x00418750 | 31 | enemy/vật thể (vtable) | 1 | 48acd0 |
| Thấp | 0x004191b0 | 31 | enemy/vật thể (vtable) | 1 | 48acf0 |
| Thấp | 0x00419510 | 31 | enemy/vật thể (vtable) | 1 | 48ad10 |
| Thấp | 0x0041fb30 | 31 | render/vật thể (vtable) | 1 | 48a9f0 |
| Thấp | 0x004246b0 | 31 | render/vật thể (vtable) | 1 | 423e40* |
| Thấp | 0x00430f60 | 31 | enemy/boss/hiệu ứng | 1 | 48aa10 |
| Thấp | 0x00432d40 | 31 | enemy/boss/hiệu ứng | 1 | 48aa40 |
| Thấp | 0x00435520 | 31 | particle/hud/render 2D | 1 | 406f40* |
| Thấp | 0x00435bd0 | 31 | particle/hud/render 2D | 0 |  |
| Thấp | 0x0043bbe0 | 31 | input/loader/tiện ích | 11 | 40a890*,414030*,414200*,415f20* |
| Thấp | 0x0043bc30 | 31 | input/loader/tiện ích | 1 | 412840 |
| Thấp | 0x0043bc50 | 31 | input/loader/tiện ích | 0 |  |
| Thấp | 0x0043bc70 | 31 | input/loader/tiện ích | 1 | 412840 |
| Thấp | 0x0043f6c0 | 31 | input/loader/tiện ích | 1 | 43f780 |
| Thấp | 0x00406ce0 | 30 | logic/đối tượng (vtable, khối đầu) | 68 | 405e70*,415f20*,41a8a0,41d180* |
| Thấp | 0x004010b0 | 28 | logic/đối tượng (vtable, khối đầu) | 5 | 42c9a0,48a520,48ad50,48b200 |
| Thấp | 0x00402f80 | 28 | logic/đối tượng (vtable, khối đầu) | 5 | 402f60,4039c0*,439b00 |
| Thấp | 0x00403930 | 28 | logic/đối tượng (vtable, khối đầu) | 12 | 402390*,402430,402540*,4064d0 |
| Thấp | 0x00403c40 | 28 | logic/đối tượng (vtable, khối đầu) | 2 | 404110,48b090 |
| Thấp | 0x004045a0 | 28 | logic/đối tượng (vtable, khối đầu) | 2 | 48a920,48b0a0 |
| Thấp | 0x0040c890 | 28 | logic/đối tượng (vtable, khối đầu) | 2 | 48ada0,48b230 |
| Thấp | 0x0040d140 | 28 | logic/đối tượng (vtable, khối đầu) | 0 |  |
| Thấp | 0x0040d6a0 | 28 | logic/đối tượng (vtable, khối đầu) | 2 | 48aaa0,48b140 |
| Thấp | 0x0040f6f0 | 28 | enemy/vật thể (vtable) | 2 | 48aa70,48b120 |
| Thấp | 0x00411120 | 28 | enemy/vật thể (vtable) | 1 | 411210 |
| Thấp | 0x00412770 | 28 | enemy/vật thể (vtable) | 5 | 4122b0*,415f20*,41a8a0 |
| Thấp | 0x00412790 | 28 | enemy/vật thể (vtable) | 6 | 4124b0*,413290,415f20*,41a8a0 |
| Thấp | 0x00413a50 | 28 | enemy/vật thể (vtable) | 8 | 417df0*,419160,42ab00*,42b5d0 |
| Thấp | 0x00418770 | 28 | enemy/vật thể (vtable) | 1 | 48b1d0 |
| Thấp | 0x004191d0 | 28 | enemy/vật thể (vtable) | 1 | 48b1e0 |
| Thấp | 0x0041c030 | 28 | render/vật thể (vtable) | 0 |  |
| Thấp | 0x0041fb50 | 28 | render/vật thể (vtable) | 1 | 48b0d0 |
| Thấp | 0x0042b9d0 | 28 | enemy/boss/hiệu ứng | 2 | 42c360,48b250 |
| Thấp | 0x0042c9a0 | 28 | enemy/boss/hiệu ứng | 5 | 40d6a0,40f6f0,41fb50,430f80 |
| Thấp | 0x00430f80 | 28 | enemy/boss/hiệu ứng | 2 | 48aa10,48b0e0 |
| Thấp | 0x00432620 | 28 | enemy/boss/hiệu ứng | 2 | 432d10,48b260 |
| Thấp | 0x00432d60 | 28 | enemy/boss/hiệu ứng | 2 | 48aa40,48b100 |
| Thấp | 0x00435540 | 28 | particle/hud/render 2D | 0 |  |
| Thấp | 0x00438180 | 28 | particle/hud/render 2D | 2 | 438860,48b270 |
| Thấp | 0x0043d7b0 | 28 | input/loader/tiện ích | 2 | 43f4d0,48b280 |
| Thấp | 0x00438400 | 27 | particle/hud/render 2D | 41 | 4013c0*,405690*,40ce40*,40f080* |
| Thấp | 0x00414d10 | 26 | enemy/vật thể (vtable) | 1 | 43a490 |
| Thấp | 0x004292d0 | 26 | enemy/boss/hiệu ứng | 21 | 413a70*,413d80,413de0*,414e30* |
| Thấp | 0x0040b1b0 | 25 | logic/đối tượng (vtable, khối đầu) | 1 | 407890* |
| Thấp | 0x004127e0 | 25 | enemy/vật thể (vtable) | 1 | 48abc0 |
| Thấp | 0x00413790 | 25 | enemy/vật thể (vtable) | 1 | 48ac20 |
| Thấp | 0x00418270 | 25 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00435490 | 25 | particle/hud/render 2D | 1 | 48aee0 |
| Thấp | 0x0043bde0 | 25 | input/loader/tiện ích | 2 | 43a670*,43aab0 |
| Thấp | 0x0043be00 | 25 | input/loader/tiện ích | 2 | 43a670*,43aab0 |
| Thấp | 0x0043bea0 | 24 | input/loader/tiện ích | 3 | 407890*,41be50*,41be80 |
| Thấp | 0x00403da0 | 23 | logic/đối tượng (vtable, khối đầu) | 0 |  |
| Thấp | 0x00405190 | 23 | logic/đối tượng (vtable, khối đầu) | 4 | 405e70*,406580*,4066a0* |
| Thấp | 0x004051b0 | 23 | logic/đối tượng (vtable, khối đầu) | 4 | 405e70*,406580*,4066a0* |
| Thấp | 0x0040c0e0 | 23 | logic/đối tượng (vtable, khối đầu) | 2 | 40bdf0* |
| Thấp | 0x0040cdf0 | 23 | logic/đối tượng (vtable, khối đầu) | 1 | 40d0c0 |
| Thấp | 0x0040ce20 | 23 | logic/đối tượng (vtable, khối đầu) | 1 | 40d0c0 |
| Thấp | 0x0040fc80 | 23 | enemy/vật thể (vtable) | 1 | 40f8d0 |
| Thấp | 0x0040fcb0 | 23 | enemy/vật thể (vtable) | 1 | 40f8d0 |
| Thấp | 0x00412800 | 23 | enemy/vật thể (vtable) | 1 | 48abe0 |
| Thấp | 0x00413a10 | 23 | enemy/vật thể (vtable) | 5 | 414dc0,418750,4191b0,419510 |
| Thấp | 0x00414cb0 | 23 | enemy/vật thể (vtable) | 0 |  |
| Thấp | 0x00414ce0 | 23 | enemy/vật thể (vtable) | 0 |  |
| Thấp | 0x00415890 | 23 | enemy/vật thể (vtable) | 2 | 4183f0*,4186f0* |
| Thấp | 0x004158c0 | 23 | enemy/vật thể (vtable) | 2 | 4183f0*,4186f0* |
| Thấp | 0x00419420 | 23 | enemy/vật thể (vtable) | 0 |  |
| Thấp | 0x00419450 | 23 | enemy/vật thể (vtable) | 0 |  |
| Thấp | 0x0041a3b0 | 23 | render/vật thể (vtable) | 1 | 41beb0* |
| Thấp | 0x0041a3d0 | 23 | render/vật thể (vtable) | 1 | 41beb0* |
| Thấp | 0x0041c2f0 | 23 | render/vật thể (vtable) | 0 |  |
| Thấp | 0x0041c320 | 23 | render/vật thể (vtable) | 0 |  |
| Thấp | 0x0041da20 | 23 | render/vật thể (vtable) | 1 | 41f9e0 |
| Thấp | 0x0041da50 | 23 | render/vật thể (vtable) | 1 | 41f9e0 |
| Thấp | 0x004235e0 | 23 | render/vật thể (vtable) | 0 |  |
| Thấp | 0x00423610 | 23 | render/vật thể (vtable) | 0 |  |
| Thấp | 0x0042e1d0 | 23 | enemy/boss/hiệu ứng | 2 | 42dcb0* |
| Thấp | 0x0042e200 | 23 | enemy/boss/hiệu ứng | 2 | 42dcb0* |
| Thấp | 0x004312a0 | 23 | enemy/boss/hiệu ứng | 0 |  |
| Thấp | 0x004312d0 | 23 | enemy/boss/hiệu ứng | 0 |  |
| Thấp | 0x00432800 | 23 | enemy/boss/hiệu ứng | 0 |  |
| Thấp | 0x004332c0 | 23 | enemy/boss/hiệu ứng | 0 |  |
| Thấp | 0x004332f0 | 23 | enemy/boss/hiệu ứng | 0 |  |
| Thấp | 0x004396f0 | 23 | particle/hud/render 2D | 0 |  |
| Thấp | 0x00439720 | 23 | particle/hud/render 2D | 0 |  |
| Thấp | 0x00402a00 | 22 | logic/đối tượng (vtable, khối đầu) | 47 | 401000,401830*,403170*,4044d0 |
| Thấp | 0x00402b80 | 22 | logic/đối tượng (vtable, khối đầu) | 27 | 402b30,402ba0*,402c50,404250 |
| Thấp | 0x00402c30 | 22 | logic/đối tượng (vtable, khối đầu) | 29 | 402ba0*,402c50,404420,40f5e0 |
| Thấp | 0x0040c7b0 | 22 | logic/đối tượng (vtable, khối đầu) | 1 | 48aad0 |
| Thấp | 0x004133b0 | 22 | enemy/vật thể (vtable) | 16 | 412840 |
| Thấp | 0x004137b0 | 22 | enemy/vật thể (vtable) | 1 | 48b1a0 |
| Thấp | 0x00417dd0 | 22 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00419120 | 22 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x0041bdd0 | 22 | render/vật thể (vtable) | 1 |  |
| Thấp | 0x00419140 | 21 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00412820 | 20 | enemy/vật thể (vtable) | 2 | 413380,48b180 |
| Thấp | 0x00413400 | 20 | enemy/vật thể (vtable) | 3 | 40efb0,411120,413760 |
| Thấp | 0x00413a30 | 20 | enemy/vật thể (vtable) | 7 | 414de0,418770,4191d0,419530 |
| Thấp | 0x0042bc80 | 20 | enemy/boss/hiệu ứng | 0 |  |
| Thấp | 0x0042c500 | 20 | enemy/boss/hiệu ứng | 1 | 42c4d0 |
| Thấp | 0x00430a90 | 20 | enemy/boss/hiệu ứng | 8 | 4137b0,41d0d0,430f00,48a498 |
| Thấp | 0x004383e0 | 20 | particle/hud/render 2D | 0 |  |
| Thấp | 0x0040d820 | 19 | logic/đối tượng (vtable, khối đầu) | 1 | 40d950* |
| Thấp | 0x0040f8b0 | 19 | enemy/vật thể (vtable) | 1 | 40fce0 |
| Thấp | 0x004134b0 | 19 | enemy/vật thể (vtable) | 1 | 48b190 |
| Thấp | 0x004310e0 | 19 | enemy/boss/hiệu ứng | 1 | 431300* |
| Thấp | 0x00432f20 | 19 | enemy/boss/hiệu ứng | 1 | 433320* |
| Thấp | 0x00440290 | 19 | input/loader/tiện ích | 1 | 43a4e0* |
| Thấp | 0x00413fa0 | 18 | enemy/vật thể (vtable) | 1 | 42ab00* |
| Thấp | 0x00413fe0 | 18 | enemy/vật thể (vtable) | 1 | 414e30* |
| Thấp | 0x00402f60 | 17 | logic/đối tượng (vtable, khối đầu) | 1 | 402df0* |
| Thấp | 0x00403dc0 | 17 | logic/đối tượng (vtable, khối đầu) | 0 |  |
| Thấp | 0x004064d0 | 17 | logic/đối tượng (vtable, khối đầu) | 9 | 4049f0*,41d180*,41f2f0 |
| Thấp | 0x0040c690 | 17 | logic/đối tượng (vtable, khối đầu) | 2 | 40b470* |
| Thấp | 0x0040c6b0 | 17 | logic/đối tượng (vtable, khối đầu) | 2 | 40b470* |
| Thấp | 0x00432820 | 17 | enemy/boss/hiệu ứng | 0 |  |
| Thấp | 0x00440700 | 17 | input/loader/tiện ích | 2 | 440610 |
| Thấp | 0x00413630 | 16 | enemy/vật thể (vtable) | 0 |  |
| Thấp | 0x0041bdf0 | 16 | render/vật thể (vtable) | 1 |  |
| Thấp | 0x0041be00 | 16 | render/vật thể (vtable) | 1 |  |
| Thấp | 0x0041be10 | 16 | render/vật thể (vtable) | 1 |  |
| Thấp | 0x0040bc30 | 15 | logic/đối tượng (vtable, khối đầu) | 2 | 407890*,40bb70 |
| Thấp | 0x00413450 | 15 | enemy/vật thể (vtable) | 2 |  |
| Thấp | 0x0043ffe0 | 15 | input/loader/tiện ích | 0 |  |
| Thấp | 0x004035c0 | 14 | logic/đối tượng (vtable, khối đầu) | 26 | 401a80*,4049f0*,4155b0*,4158e0* |
| Thấp | 0x0040c3d0 | 14 | logic/đối tượng (vtable, khối đầu) | 27 | 40adf0,40b2d0*,40c170,40c360 |
| Thấp | 0x00414d50 | 13 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x0042a210 | 13 | enemy/boss/hiệu ứng | 3 | 417df0*,41bda0 |
| Thấp | 0x00436a20 | 13 | particle/hud/render 2D | 18 | 424c10*,424f90*,425470*,425c60* |
| Thấp | 0x0042a1f0 | 12 | enemy/boss/hiệu ứng | 3 | 4181d0,41be00 |
| Thấp | 0x0042a200 | 12 | enemy/boss/hiệu ứng | 3 | 418200,41be10 |
| Thấp | 0x0043f5a0 | 12 | input/loader/tiện ích | 1 | 414e30* |
| Thấp | 0x00402530 | 11 | logic/đối tượng (vtable, khối đầu) | 3 | 420030* |
| Thấp | 0x00402700 | 11 | logic/đối tượng (vtable, khối đầu) | 0 |  |
| Thấp | 0x00413420 | 11 | enemy/vật thể (vtable) | 3 |  |
| Thấp | 0x00413430 | 11 | enemy/vật thể (vtable) | 4 |  |
| Thấp | 0x00413440 | 11 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00413460 | 11 | enemy/vật thể (vtable) | 4 |  |
| Thấp | 0x00413470 | 11 | enemy/vật thể (vtable) | 10 |  |
| Thấp | 0x00414000 | 11 | enemy/vật thể (vtable) | 3 |  |
| Thấp | 0x00414010 | 11 | enemy/vật thể (vtable) | 3 |  |
| Thấp | 0x00414020 | 11 | enemy/vật thể (vtable) | 2 |  |
| Thấp | 0x00414d30 | 11 | enemy/vật thể (vtable) | 2 |  |
| Thấp | 0x00414d40 | 11 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00414d60 | 11 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00414d70 | 11 | enemy/vật thể (vtable) | 2 |  |
| Thấp | 0x00414d80 | 11 | enemy/vật thể (vtable) | 2 |  |
| Thấp | 0x00414d90 | 11 | enemy/vật thể (vtable) | 2 |  |
| Thấp | 0x00414da0 | 11 | enemy/vật thể (vtable) | 2 |  |
| Thấp | 0x00414db0 | 11 | enemy/vật thể (vtable) | 3 |  |
| Thấp | 0x00418230 | 11 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00418240 | 11 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00418250 | 11 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00418260 | 11 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00418790 | 11 | enemy/vật thể (vtable) | 0 |  |
| Thấp | 0x00419480 | 11 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x004194c0 | 11 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x004194d0 | 11 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x004194e0 | 11 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x004194f0 | 11 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00419500 | 11 | enemy/vật thể (vtable) | 1 |  |
| Thấp | 0x00419930 | 11 | enemy/vật thể (vtable) | 0 |  |
| Thấp | 0x0041a890 | 11 | render/vật thể (vtable) | 1 |  |
| Thấp | 0x0041be20 | 11 | render/vật thể (vtable) | 1 |  |
| Thấp | 0x0041be30 | 11 | render/vật thể (vtable) | 1 |  |
| Thấp | 0x0041be40 | 11 | render/vật thể (vtable) | 1 |  |
| Thấp | 0x00438890 | 11 | particle/hud/render 2D | 1 |  |
| Thấp | 0x004406f0 | 10 | input/loader/tiện ích | 1 | 43aab0 |
| Thấp | 0x00401820 | 9 | logic/đối tượng (vtable, khối đầu) | 4 | 4022f0*,402df0* |
| Thấp | 0x004022e0 | 9 | logic/đối tượng (vtable, khối đầu) | 1 | 4022c0* |
| Thấp | 0x00404090 | 9 | logic/đối tượng (vtable, khối đầu) | 3 | 404170* |
| Thấp | 0x004040a0 | 9 | logic/đối tượng (vtable, khối đầu) | 3 | 404170* |
| Thấp | 0x0040abf0 | 9 | logic/đối tượng (vtable, khối đầu) | 3 | 40a890*,40b2d0*,40c0e0 |
| Thấp | 0x0040ac00 | 9 | logic/đối tượng (vtable, khối đầu) | 2 | 40a890*,40c0c0* |
| Thấp | 0x0040cde0 | 9 | logic/đối tượng (vtable, khối đầu) | 6 | 40caf0*,40ce20,40ce90* |
| Thấp | 0x0040ce10 | 9 | logic/đối tượng (vtable, khối đầu) | 1 | 40cdf0 |
| Thấp | 0x0040fca0 | 9 | enemy/vật thể (vtable) | 1 | 40fc80 |
| Thấp | 0x0040fcd0 | 9 | enemy/vật thể (vtable) | 1 | 40fcb0 |
| Thấp | 0x00414cd0 | 9 | enemy/vật thể (vtable) | 1 | 414cb0 |
| Thấp | 0x00414d00 | 9 | enemy/vật thể (vtable) | 1 | 414ce0 |
| Thấp | 0x00415880 | 9 | enemy/vật thể (vtable) | 15 | 4155b0*,4158c0,4158e0*,415f20* |
| Thấp | 0x004158b0 | 9 | enemy/vật thể (vtable) | 7 | 415890,415f20*,416450*,416dd0* |
| Thấp | 0x00419440 | 9 | enemy/vật thể (vtable) | 1 | 419420 |
| Thấp | 0x00419470 | 9 | enemy/vật thể (vtable) | 1 | 419450 |
| Thấp | 0x0041a390 | 9 | render/vật thể (vtable) | 7 | 419940*,41a3d0,41a8a0,41af20* |
| Thấp | 0x0041a3a0 | 9 | render/vật thể (vtable) | 7 | 419940*,41a3b0,41a8a0,41af20* |
| Thấp | 0x0041c310 | 9 | render/vật thể (vtable) | 1 | 41c2f0 |
| Thấp | 0x0041c340 | 9 | render/vật thể (vtable) | 1 | 41c320 |
| Thấp | 0x0041da40 | 9 | render/vật thể (vtable) | 1 | 41da20 |
| Thấp | 0x0041da70 | 9 | render/vật thể (vtable) | 6 | 41da50,41dc20*,41e420*,41e6e0* |
| Thấp | 0x004235d0 | 9 | render/vật thể (vtable) | 2 | 4232c0,423610 |
| Thấp | 0x00423600 | 9 | render/vật thể (vtable) | 1 | 4235e0 |
| Thấp | 0x00424b50 | 9 | render/vật thể (vtable) | 2 | 424a70*,428cc0* |
| Thấp | 0x00429030 | 9 | enemy/boss/hiệu ứng | 1 | 428cc0* |
| Thấp | 0x0042e1f0 | 9 | enemy/boss/hiệu ứng | 4 | 42e1d0,42ff10*,430490* |
| Thấp | 0x0042e220 | 9 | enemy/boss/hiệu ứng | 4 | 42e200,42ff10*,430490* |
| Thấp | 0x004312c0 | 9 | enemy/boss/hiệu ứng | 1 | 4312a0 |
| Thấp | 0x004312f0 | 9 | enemy/boss/hiệu ứng | 1 | 4312d0 |
| Thấp | 0x004332e0 | 9 | enemy/boss/hiệu ứng | 1 | 4332c0 |
| Thấp | 0x00433310 | 9 | enemy/boss/hiệu ứng | 1 | 4332f0 |
| Thấp | 0x00435a90 | 9 | particle/hud/render 2D | 3 | 4355b0 |
| Thấp | 0x00435aa0 | 9 | particle/hud/render 2D | 1 | 4355b0 |
| Thấp | 0x00437ed0 | 9 | particle/hud/render 2D | 1 | 437de0* |
| Thấp | 0x004396e0 | 9 | particle/hud/render 2D | 3 | 4393f0*,439720,439740* |
| Thấp | 0x00439710 | 9 | particle/hud/render 2D | 2 | 4396f0,439740* |
| Thấp | 0x0043a470 | 9 | input/loader/tiện ích | 1 | 43ad10* |
| Thấp | 0x0043a480 | 9 | input/loader/tiện ích | 1 | 43ad10* |
| Thấp | 0x0043d5d0 | 8 | input/loader/tiện ích | 5 | 43b7d0* |

## Round 4 status
- DONE: hero z=0 (bomb proximity), end-camera free flight (FUN_004155b0 exact), level char scan (nothing unhandled), .rec format documented.
- DONE round 5: sound call-site audit (all 44 oggs; laser.ogg has no exe call site, chihanie.ogg missing), laser spark 3 sites, radio bomb trigger confirmed, dlinnyi range 210 confirmed, demo/attract .rec playback ported, skin cull default CCW (state 0x16 never set in menu pass).
- STILL GUESS / NOT DONE: demo parity check vs recording (needs headless sim), web skin side (DoubleSide kept), pause billboard keep, menu quad FUN_00430eb0, startdownload line spacing, gamenag text mapping/positions, p02_l07 dark edge, enemy initial facing sign, bomb grenade block mask (0x12 guess).

Round 5b: grenade block mask CONFIRMED (0x292 OR / 0x400 AND, FUN_00405820); death-update CONFIRMED (FUN_00414e30). Still GUESS: victory-menu camera vs FUN_004158e0, lasers after death.
