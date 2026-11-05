> Ví dụ cụ thể (một port thực tế), KHÔNG phải quy tắc chung. Bản trung lập nằm ngoài examples/.

# Render-port checklist & anti-patterns (generalized)

Mục đích: các lỗi render/toạ độ gặp ở port Dino (D3D8 -> three.js) và dạng tổng quát để áp dụng cho bất kỳ cặp engine nguồn/đích nào.
Mỗi lỗi: **triệu chứng -> nguyên nhân thật -> cách phòng**. Nguyên tắc: khi thấy triệu chứng, đừng vá bằng hằng số thử-sai (+PI, 1-v, scale); tìm quy ước bị lệch.

## A. Checklist (chạy TRƯỚC khi viết renderer, ghi kết quả vào FORMATS.md "Rendering facts")
1. **Handedness**: nguồn left-handed hay right-handed? Trục lên là Y hay Z? Trục tiến của model?
   - Dino: D3D left-handed, Z-up, model nhìn về +X. three.js right-handed Y-up. Hoán đổi `(x,y,z)->(x,z,y)` là một **phản xạ (reflection)**: ảnh không bị lật nhưng **winding tam giác đảo** và **dấu góc xoay đảo** (RotZ row-vector D3D -> `rotation.y = -deg`).
2. **Winding / cull mode**: nguồn dùng CULL_CCW hay CW? Sau khi hoán trục, đảo (swap 2 đỉnh) hay đổi `side`. Tìm cull state trong decompile (Dino: FUN_0043d200 state 3 CONFIRMED). Chỉ vật liệu có cờ riêng (texture `.tga`) mới `CULL_NONE`.
3. **UV origin**: D3D v=0 ở TRÊN; GL/three `flipY=true` đã lật. Nếu loader nguồn làm `v = 1 - v` thì ở đích **không làm lại** (double flip). Quyết định MỘT chỗ lật duy nhất, ghi chú. Dino: lỗi double V flip -> texture hero/enemy xám/trắng từng mảng, lid thùng sai.
4. **Thứ tự nhân ma trận**: D3D row-vector `v * M` (A*B nghĩa là áp A trước), three/GL column-vector `M * v`. `local' = ovr * local` (D3D) = `local.multiply(ovr)` (three) khi lưu transpose. Kiểm từng chỗ có ma trận (skinning, override bone, billboard, mũ gắn đầu). Dùng `premultiply` vs `multiply` sai = vật thể lệch/xoay sai.
5. **Euler order & đơn vị**: góc độ hay radian; thứ tự trục (Dino: q = qz*qy*qx = three 'ZYX'); hằng đổi đơn vị (57.2958).
6. **Chuyển ma trận qua hoán trục**: dùng `S * M * S` (S = ma trận hoán trục) thay vì sửa từng phần tử; kiểm tra bằng điểm đã biết.
7. **Blend state từng loại draw**: ghi SRC/DST factor, premultiplied hay không (xem C dưới), zwrite, ztest, alpha test ref + hàm so sánh, cull, lighting on/off, ambient. Lấy từ hàm set render state, không từ "trông giống".
8. **Alpha test vs blend**: draw nào BẬT alpha test, draw nào KHÔNG (xem C).
9. **Lighting**: normal phẳng hay trơn (engine tự tính?), directional light hướng/màu từ dữ liệu level, ambient material/global, có fog không (Dino: không), clear color.
10. **Texture sampler**: wrap/clamp, filter, mipmap; tên file **không phân biệt hoa/thường** trên Windows -> resolver case-insensitive ở web.
11. **Viewport/projection**: FOV (dọc/ngang), aspect, near/far, pitch, khoảng cách theo zoom, làm mượt camera (lerp theo dt). Đọc từ code, không fit bằng mắt.
12. **Đơn vị & scale**: 1 ô lưới = ? đơn vị world; tốc độ per-tick vs per-giây.
13. **Thứ tự vẽ**: layer nào vẽ trước (nền/ground), render queue sprite, sort theo depth hay thứ tự thêm.
14. **Fixed timestep**: logic chạy tick cố định (Dino 33 ms) hay dt-scaled; animation dùng dt thật. Giữ đúng loại.
15. **Toạ độ UI**: ortho 800x600 gốc trên-trái? scale lên canvas, giữ tỉ lệ.

## B. Anti-pattern catalogue (đã gặp)

| # | Triệu chứng | Nguyên nhân thật | Phòng |
|---|---|---|---|
| 1 | Texture nhân vật xám/trắng mảng, thùng sai mặt | **Double V flip**: loader gốc `v=1-v` + three `flipY` | Chọn 1 điểm lật; so với preview (CONFIRMED visually) |
| 2 | Mesh "lộ ruột", chỉ thấy mặt trong; hoặc tường thiếu | **Winding swap** sau phản xạ trục: mặt ngoài bị cull | Đảo winding đúng khi hoán trục; kiểm cull state gốc |
| 3 | Nhân vật đi tới nhưng mặt quay ngược (như đi lùi) | Hack `+PI` che lỗi thật: thứ tự xoay / dấu góc sau hoán trục / hướng tiến model | Tìm hướng tiến model (+X) + dấu góc; không hằng thử-sai |
| 4 | Billboard (flare, hạt, ánh sáng bom) biến mất ở khung hình cuối | **Render nhiều lần/khung** (shadow pass vẽ `scene` 2-3 lần) + hook `onBeforeRender` xếp hàng sprite chỉ chạy lần đầu | Sprite queue độc lập với số lượt render; flush đúng 1 lần cho pass chính |
| 5 | Sprite có viền đen/biến mất theo alpha | Bật **alpha test** cho sprite flush trong khi gốc không bật (FUN_0042e620 chỉ blend, không ALPHATESTENABLE) | Copy đúng state từng draw |
| 6 | Mặt đất đen hoàn toàn sau khi thêm shadow | **Blend ZERO/ONE_MINUS_SRC_COLOR** custom của three cho ra đen; cần xuất `1-s` và `blendDst=SrcColorFactor` | Test blend custom trong isolation; so ảnh |
| 7 | Ánh sáng/hiệu ứng quá sáng/tối | **Premultiply vs multiply**: SRCCOLOR/ONE (additive) vs SRCALPHA/INVSRCALPHA; premultipliedAlpha sai | Ghi factor chính xác; thử từng loại blend (0:SRCCOLOR,ONE; 1:ZERO,INVSRCALPHA; 2:SRCALPHA,INVSRCALPHA) |
| 8 | Vật thể lệch vị trí so với nền | Footprint ô (w x h) và gốc toạ độ: `world = cell*5 - N*5/2`; tâm vs góc | Đọc hàm đặt object; kiểm bằng 2-3 điểm đã biết |
| 9 | Chân nhân vật lún xuống nền | Giả định offset gốc sai (Dino: skeleton Z-up, chân ở z=0, không cần nâng) | Đo từ dữ liệu, không "nâng cho khỏi lún" |
| 10 | Mặt sau (DoubleSide) sáng sai | three lật normal cho back face, D3D thì không | `onBeforeCompile` bỏ `faceDirection` flip khi cần |
| 11 | Ma trận bone override sai (mắt/đuôi tóc) | Thứ tự `ovr*local` row-order vs three multiply | Xem checklist A4; ghi chú địa chỉ |
| 12 | Texture file không load | Tên file hoa/thường khác (Windows case-insensitive) | Resolver lower-case |
| 13 | Crash đen màn hình do `null` trong mảng object | Hàm update không guard object đã bị huỷ | Guard `!o`; test load từng level, bắt console error |
| 14 | "Mirror"/"INFO showcase" tự vẽ riêng | Thực ra là object generic; không có code riêng | Đọc decompile trước khi thêm feature (đa số "feature" = object thường) |

## C. Blend/alpha quick reference
- Ghi từng loại draw: `{blend src, dst, alphaTest ref/func, zwrite, ztest, cull, lighting}`.
- Dino ví dụ: global alpha test ref 0x80 GEQUAL; texture `.tga` -> alpha test + SRCALPHA/INVSRCALPHA + CULL_NONE; jpg opaque CULL_CCW; sprite flush KHÔNG alpha test, ZWRITE off; shadow quad ZERO/INVSRCCOLOR. (Chỉ là ví dụ; mỗi game đọc lại.)

## D. Quy trình khi thấy "trông sai"
1. Đóng băng 1 frame / 1 asset ở scene test riêng (Dino: `char.html`/`chartest.js`, front/side view).
2. Liệt kê checklist A theo thứ tự; loại trừ từng mục bằng bằng chứng.
3. Chỉ khi biết nguyên nhân mới sửa; ghi vào FORMATS.md mục "fix" kèm triệu chứng.

## E. Checklist cho game 2D / không-3D (thay mục A khi không có 3D)
1. Gốc toạ độ & chiều trục (trên-trái vs dưới-trái), đơn vị pixel/ô, độ phân giải logic và cách scale (integer, letterbox, pixel-perfect `image-rendering: pixelated`).
2. Thứ tự vẽ: layer, sprite priority, sort theo y hay z; ordering ổn định khi bằng nhau.
3. Sprite: atlas, pivot/anchor, flip ngang/dọc, xoay, palette/CLUT/colour-key (màu trong suốt), blend (additive, multiply), bóng.
4. Tilemap: kích thước tile, chỉ số 0/1-based, flip flags, collision layer riêng, scroll/parallax, camera clamp.
5. Timing: tick cố định (60/30 Hz, hoặc theo gốc), animation theo frame vs ms, tốc độ per-tick (không dt-scale nếu gốc không).
6. Sub-pixel & làm tròn (floor vs round vs fixed-point); số nguyên tràn; thứ tự cập nhật entity (ảnh hưởng va chạm).
7. Âm thanh/độ phân giải màu giới hạn (EGA/VGA palette): mô phỏng chính xác nếu thuộc yêu cầu.
8. Game không đồ hoạ (text/card/puzzle): "render" = trạng thái; parity = so chuỗi trạng thái/transcript.
Anti-pattern phần B được viết bằng ví dụ 3D/D3D nhưng nguyên tắc (một điểm lật duy nhất, state từng draw, queue độc lập số lượt render, thứ tự biến đổi) áp dụng chung.
