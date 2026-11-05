# Render-port checklist & anti-patterns (generic)

Mục đích: lỗi render/toạ độ thường gặp khi chuyển giữa hai engine/API đồ hoạ khác quy ước, ở dạng tổng quát. Bản có hằng số, hàm và triệu chứng cụ thể của một port đã làm: [`../examples/dino/render-checklist-and-bugs.md`](../examples/dino/render-checklist-and-bugs.md).
Nguyên tắc: thấy triệu chứng thì đừng vá bằng hằng số thử-sai (+PI, 1-v, scale); tìm quy ước bị lệch.

## A. Checklist 3D (điền kết quả vào FORMATS.md "Rendering facts", mỗi dòng có nguồn)
1. **Handedness & trục**: nguồn left/right-handed? Trục lên Y hay Z? Trục tiến của model? Hoán trục là một PHẢN XẠ: ảnh không lật nhưng winding đảo và dấu góc xoay đảo.
2. **Winding / cull**: nguồn cull CW hay CCW; sau khi đổi trục phải đảo winding hoặc đổi `side`. Đọc từ code set-state; vật liệu nào cull-none.
3. **UV origin**: v=0 ở trên hay dưới; loader nguồn có tự lật không; engine đích có flipY không. Chọn MỘT điểm lật duy nhất (double flip là lỗi phổ biến).
4. **Thứ tự nhân ma trận**: row-vector (v*M) vs column-vector (M*v); `A*B` nghĩa là áp cái nào trước; multiply vs premultiply. Kiểm từng chỗ (skinning, override bone, billboard, vật gắn).
5. **Euler order & đơn vị góc** (độ/radian, thứ tự trục, hằng đổi đơn vị).
6. **Chuyển ma trận qua hoán trục**: `S*M*S` thay vì sửa từng phần tử; kiểm bằng điểm đã biết.
7. **Blend state từng loại draw**: src/dst, premultiplied?, zwrite, ztest, alpha test (ref + hàm), cull, lighting, ambient. Lấy từ code set-state.
8. **Alpha test vs blend**: draw nào bật alpha test, draw nào không.
9. **Lighting**: normal phẳng hay trơn (nguồn tự tính?), hướng/màu ánh sáng từ dữ liệu, ambient, fog, clear color.
10. **Texture sampler**: wrap/clamp, filter, mipmap; tên file có phân biệt hoa/thường (hệ nguồn không phân biệt -> resolver lower-case).
11. **Viewport/projection**: FOV (dọc/ngang), aspect, near/far, pitch/khoảng cách camera, làm mượt. Đọc từ code, không fit bằng mắt.
12. **Đơn vị & scale**: kích thước ô lưới/đơn vị world; tốc độ per-tick vs per-giây.
13. **Thứ tự vẽ**: layer nền trước, queue sprite, sort theo depth hay thứ tự thêm.
14. **Timestep**: logic tick cố định hay dt; animation dùng dt thật. Giữ đúng loại của nguồn.
15. **Toạ độ UI**: độ phân giải logic, gốc toạ độ, scale giữ tỉ lệ.

## B. Anti-pattern catalogue (triệu chứng -> nguyên nhân thật -> phòng)
| # | Triệu chứng | Nguyên nhân thật | Phòng |
|---|---|---|---|
| 1 | Texture xám/trắng từng mảng, mặt sai | Double V flip | Một điểm lật; so với tham chiếu |
| 2 | Mesh 'lộ ruột', thiếu mặt | Winding không đảo sau phản xạ trục / sai cull | Đảo winding đúng; đọc cull state nguồn |
| 3 | Nhân vật đi tới nhưng mặt quay ngược | Hằng số hack che lỗi thật (thứ tự xoay / dấu góc / hướng tiến model) | Tìm hướng tiến + dấu góc từ dữ liệu |
| 4 | Sprite/billboard biến mất ở khung cuối | Cảnh vẽ nhiều lần/khung (bóng, gương) + hook xếp hàng chỉ chạy lần đầu | Queue sprite độc lập số lượt render; flush đúng 1 lần ở pass chính |
| 5 | Sprite viền đen/biến mất | Bật alpha test cho draw mà nguồn không bật | Copy đúng state từng draw |
| 6 | Mặt đất/vùng đen hoàn toàn sau khi thêm bóng | Blend tuỳ biến (zero/one-minus-src-color) của engine đích ra đen | Test blend tuỳ biến cô lập |
| 7 | Hiệu ứng quá sáng/tối | Premultiply vs multiply; premultipliedAlpha sai | Ghi factor chính xác từng loại |
| 8 | Vật thể lệch nền | Footprint/gốc toạ độ (tâm vs góc) | Kiểm bằng vài điểm đã biết |
| 9 | Chân lún nền | Giả định offset gốc sai | Đo từ dữ liệu, không 'nâng cho khỏi lún' |
| 10 | Mặt sau (double-sided) sáng sai | Engine đích lật normal back face, nguồn thì không | Tắt lật normal khi cần |
| 11 | Ma trận override bone sai | Thứ tự row/column | Mục A4; ghi nguồn |
| 12 | Texture không load | Hoa/thường tên file | Resolver lower-case |
| 13 | Đen màn hình do null trong mảng đối tượng | Update không guard đối tượng đã huỷ | Guard; load-all bắt console |
| 14 | Làm feature 'riêng' không tồn tại | Tên đánh lừa; thực chất là đối tượng/UI generic | Đọc nguồn trước khi thêm feature |

## C. Blend/alpha quick reference
Với mỗi loại draw ghi: `{blend src, dst, alpha test ref/func, zwrite, ztest, cull, lighting}` từ code nguồn. Không suy từ 'trông giống'. Bảng ví dụ thực: ../examples/dino/render-checklist-and-bugs.md.

## D. Khi thấy 'trông sai'
1. Đóng băng 1 frame/asset ở scene test cô lập.
2. Duyệt checklist A theo thứ tự, loại trừ từng mục bằng bằng chứng.
3. Chỉ sửa khi biết nguyên nhân; ghi FORMATS.md mục Fixes (triệu chứng + nguyên nhân).

## E. Checklist 2D / không-3D
1. Gốc toạ độ & chiều trục, độ phân giải logic, scale (integer/letterbox/pixel-perfect).
2. Thứ tự vẽ: layer, priority, sort theo y/z, ổn định khi bằng nhau.
3. Sprite: atlas, pivot/anchor, flip, xoay, palette/colour-key, blend, bóng.
4. Tilemap: kích thước tile, chỉ số 0/1-based, flip flags, collision layer, scroll/parallax, clamp camera.
5. Timing: tick cố định (Hz theo nguồn), animation theo frame vs ms, tốc độ per-tick.
6. Sub-pixel/làm tròn (floor/round/fixed-point), tràn số, thứ tự cập nhật entity.
7. Giới hạn màu/palette của nguồn nếu thuộc yêu cầu.
8. Game không đồ hoạ: 'render' = trạng thái; parity = so chuỗi trạng thái/transcript.
