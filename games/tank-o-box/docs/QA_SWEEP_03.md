# QA sweep #3 (qa-visual, 2026-11-06) - kiểm CHECK-R3 (hướng) + CHECK-R4 (ánh sáng) sau khi sửa src
Môi trường: vite dev 127.0.0.1:5173 (PID 31493, đã tắt), Chrome thật của user, 1 tab mới (đã đóng), viewport 1728x850. Ảnh/script: `/private/tmp/claude-501/-Users-congpham-Desktop-game-game-web-porter/f98a0da5-ef20-4be4-9b57-4da7d9922d48/scratchpad/qa3/` (orient.py, light.py, reg.py, scn.py, cut.py, tank.py). Không có ảnh gốc => chỉ PASS/FAIL/KHÔNG-SO-ĐƯỢC. Lưu ý: tab nền không chạy rAF nên __ready không lên đến khi Page.bringToFront (đã làm). Chạy lại sau mất mạng: qa3 trước đó không có ảnh dở, làm lại từ đầu.

| # | mục | kết quả | bằng chứng |
|---|---|---|---|
| 1a | Hướng gruzovik dir0..3 (Farm, xoay group = d*pi/2+pi tại chỗ, camera top-down up=-z) | PASS (khớp kỳ vọng FORMATS) | `orient_sheet3.png` hàng trên: dir0 cabin ở TRÊN, dir1 cabin bên PHẢI, dir2 DƯỚI, dir3 TRÁI. So sweep #2 (dir0 cabin dưới, dir1 trái): đã xoay đúng 180 độ. Ảnh lẻ `or_gruzovik_2x4_dir{0..3}.png` |
| 1b | Jeep dir0..3 | PASS | hàng dưới: mũi (logo tròn) dir0 TRÊN, dir1 PHẢI, dir2 DƯỚI, dir3 TRÁI (dir3 mũi bên trái đúng kỳ vọng; sweep #2 là phải). `or_jeep_1x2_dir*.png` |
| 1c | Camera không lật, lưới 45x45 | PASS | chiếu ô tâm bằng R.camera: (0,0)->(518,82) trên-trái, (44,0)->(1210,82) trên-phải, (0,44)->(390,787) dưới-trái, (44,44)->(1338,787) dưới-phải, (22,22)->(864,380); trong canvas 850px cao; hình thang phối cảnh bình thường; x ô tăng = sang phải. Công thức tâm ô: (22.5-cx-0.5, -22.5+cy+0.5) (khớp world gruzovik [-5.5,0,6.5]) |
| 1d | Nòng/tháp (node Rotation y khác 0) không đảo | KHÔNG-SO-ĐƯỢC | level tĩnh không có tank; ?scene=objects/tank_0x_3x3.scene render đen (scene có node light => debug mặc định không thêm đèn/camera; phải do renderer/main.js owner, không phải lỗi mới). Dữ liệu: tank_01_3x3.scene chỉ node upgrade_polySurface3/4/5 có Rotation y=pi (ẩn mặc định); không có node nòng riêng với Ry khác 0 trong gruzovik/jeep. Cần level có tank hoặc state spawn. |
| 2 | Ánh sáng lit vs &light=0 (xem bảng dưới) | PASS (khác rõ rệt, không cháy toàn bộ) | `{Farm,Ambush,HQProtection}_{lit,unlit}.png`, `lightsheet.png` |
| 2b | Point Range | KHÔNG-CÓ-VÍ-DỤ | Farm/Ambush: 1 POINT intensity 50 LINEAR => Range 6*50=300 > cỡ map (không cắt); các POINT khác intensity 0 QUADRATIC (Range 0, không đóng góp). HQProtection: 1 DIRECTIONAL 0.7 + 2 POINT intensity 0. Chưa thấy đèn có Range cắt được; cần level khác (vd đèn nổ) |
| 3a | Cutout lá/hàng rào | PASS (quan sát) | `scene_tree.png`: tán lá cắt sạch, không viền đen/khối vuông; hàng rào wall_1x3 trong level (zoom_wall_1x3.png) thanh dọc, mép sạch. wall_st_1x3 (zoom_wall_st_1x3.png) rất trắng/tương phản cao: khả năng quá sáng, KHÔNG-SO-ĐƯỢC không có gốc |
| 3b | Bóng (Transparency!=0, 266 draw blended lit trong Farm vd gruzovik shadow_0/90/180/270) | PASS (quan sát) | hiện mờ dưới vật, không khối đen; Farm có 266 lit blended, 1 emissive blended |
| 3c | Emissive không ảnh | KHÔNG-SO-ĐƯỢC | Farm: 93 draw emissive tex=0 (mặt phẳng 1 tam giác dưới terrain/_day), không thấy vệt/artefact trong ảnh level. Emissive score popup (objects/200.scene) 0 draw (Billboard bị bỏ qua - chưa port, không thuộc đợt sửa này) |
| 4a | FIX-R1 Farm lạnh x3 | PASS | `cold_Farm_{0,1,2}.png`: 0/8 điểm đen, 3 lần pixel giống hệt, pending 0, __err [], ready 0.57/1.27/0.90s |
| 4b | &wire=1 | PASS | `farm_wire.png`: R.wireframe=true, __err [] (4/8 điểm đen là nền giữa các đường) |
| 4c | resize 800x600, 1200x500, 500x900 + clear | PASS | 0/8 đen mọi cỡ, pending 0, __err []; sau clear 8 điểm == cold_Farm |
| 4d | ?scene=wall_1x3 / tree_01_2x2 / terrain_03_90 | PASS | objects/wall_1x3.scene 6 draw có texture; tree 3 draw; data/Levels/terrains/terrain_03_90.scene 21 draw, có hình. __err [] cả 3 |
| 5 | DIRECTIONAL ngược phía? | KHÔNG-SO-ĐƯỢC | chỉ HQProtection có DIRECTIONAL (0.7) trong 3 level; không có gốc để biết phía sáng. Nếu user thấy bóng/mặt sáng ngược trên HQProtection, thử DIRLIGHT_THREE_FORM='literal' (chỉ báo, không đổi) |

## Đo ánh sáng (toàn canvas; lum = trung bình RGB; p250 = % pixel có kênh max >=250; allw = % pixel cả 3 kênh >=250)
| level | lit lum / p250 / allw | unlit (light=0) | sweep #2 (cùng phép đo trên ảnh cũ, lit) |
|---|---|---|---|
| Farm | 118.4 / 9.9 / 7.4 | 88.9 / 3.9 / 1.5 | 125.4 / 8.9 / 2.4 |
| Ambush | 129.9 / 9.6 / 7.3 | 98.1 / 3.9 / 1.5 | 142.7 / 12.9 / 2.1 |
| HQProtection | 171.3 / 20.3 / 13.2 | 144.6 / 4.0 / 1.5 | 181.4 / 43.1 / 37.9 |

Nhận xét: lit sáng hơn unlit 27-32 đơn vị; HQProtection (tuyết) giảm % pixel >=250 từ 43% xuống 20% (trắng toàn kênh 38%->13%) nhưng tuyết vẫn trắng đáng kể. Farm/Ambush lit allw tăng (2.4->7.4) do đèn POINT 50, phần tăng nằm ở thân gruzovik (thùng trắng, xem orient_sheet3) và wall_st: có thể là texture trắng thật, KHÔNG-SO-ĐƯỢC. unlit vẫn p250 3.9% (cùng mọi level) => nguồn sáng không phụ thuộc đèn (nền/UI trắng trong ảnh). Console: __err [] mọi lần chạy.

## Kết luận
CHECK-R3: PASS về hướng (4 hướng gruzovik + jeep khớp kỳ vọng FORMATS, camera/lưới không lật); phần nòng/tháp chưa kiểm được. CHECK-R4: PASS (lit khác unlit rõ, bão hoà giảm mạnh ở HQProtection); Range/DIRECTIONAL không kiểm hết được. Hồi quy: PASS. Không FAIL.
Việc mở: (1) ?scene= cho tank/object có node Light render đen (không có đèn/camera mặc định) -> chủ renderer/main.js nếu cần soi tank; (2) Billboard chưa vẽ; (3) cần level có tank để kiểm tháp/nòng. Tab 127.0.0.1:5173 đã đóng, vite PID 31493 đã tắt.
