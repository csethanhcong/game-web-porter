# QA sweep #4 (qa-visual, 2026-11-06) - LẦN CHẠY GAMEPLAY ĐẦU TIÊN trên browser (P7a / P7a-R)
Môi trường: vite dev 127.0.0.1:5173 (PID 58034, đã tắt), Chrome thật của user, 1 tab mới (đã đóng), cửa sổ ~967x850 dpr2 (có lúc 1172x1700). Phím qua CDP Input.dispatchKeyEvent; console bắt bằng hook console.error/warn (addScriptToEvaluateOnNewDocument) + window.__err. Page.bringToFront trước khi chờ __ready. Ảnh/script: `/private/tmp/claude-501/-Users-congpham-Desktop-game-game-web-porter/f98a0da5-ef20-4be4-9b57-4da7d9922d48/scratchpad/qa4/`. Không có ảnh gốc => chỉ PASS/FAIL/KHÔNG-SO-ĐƯỢC.

## Bảng kết quả
| # | mục | kết quả | bằng chứng |
|---|---|---|---|
| 1a | Cold load ?level=Farm (play bật) | PASS | __ready 0.4-0.9s, __err [] và console error [] mọi lần (>10 lần nạp), 89 object active ban đầu, màn tĩnh không hỏng (cold_Farm_t3.jpg; so với sweep #3 cùng bố cục, tường/cây/nhà đủ) |
| 1b | ?play=0 | PASS | Farm_play0.jpg: màn tĩnh, __game không có, __err [], 120 fps |
| 1c | Anim Position/Rotation/Scale/Transparency làm hỏng màn tĩnh? | PASS (quan sát) | cold_Farm_t0/t3: không lệch; sau khi tường bị bắn, wall_1x3 Death1 để lại ván gỗ rơi (enemies_end.jpg, after_win.jpg) - hợp lý nhưng KHÔNG-SO-ĐƯỢC không có gốc |
| 2a | Player spawn ~2.5s (Landing -> NoUpgrade) | PASS về logic / **FAIL hiển thị lần spawn đầu** | trạng thái Landing ở ~2.5s, NoUpgrade sau ~1s; xem lỗi B1: thân xe KHÔNG hiện ở lần sinh đầu |
| 2b | Mapping phím | ghi nhận | P1: ArrowUp/Right/Down/Left (dir 0/1/2/3), bắn: Space/Control (GAME_KEYS_P1). P2: WASD, bắn F/Shift. Đúng src/config.js (G-GAME-03 GUESS). Hướng: Up = lên (y ô giảm), Right = sang phải (x tăng) khớp lưới sweep #3 |
| 2c | Di chuyển mượt, nội suy | PASS | p.pos.p giảm tuyến tính ~0.108/khung ở 60Hz (~6.5 ô/s = Speed NoBonus 6.5), ô logic nhảy trước, group.position liên tục, không giật (218 khung 8ms đều) |
| 2d | Quay đúng chiều | PASS (hướng thị giác) / GHI NHẬN | yaw group = dir*pi/2+pi: Up 3.14, Right 4.71, Down 6.28, Left 7.85. Quay TỨC THỜI (TurnSpeed=0 theo FORMATS MoveByKey) và pos.turn luôn 0; đổi hướng chỉ tại tâm ô (đúng FORMATS bước 2) - khi đổi sang hướng vuông góc xe chạy nốt ô hiện tại rồi mới quay |
| 2e | Bị chặn | PASS | ArrowLeft đi từ x=33 tới x=20 rồi dừng, mặt quay trái (dir3), p=0; không xuyên nhà; nhấn hướng khác mở lại bình thường |
| 2f | Thả phím giữa ô | GHI NHẬN | p đứng nguyên (vd 0.6) rồi xe dừng giữa ô, không trượt nốt tới tâm - khớp FORMATS (idx -1 => mover không làm gì, 'điều kiện thực tế GUESS') |
| 3a | Bắn: đạn đúng ô trước mũi | PASS (số liệu) | xe tại (20,40) dir3 -> đạn spawn (19,41) (ô giữa cạnh trái, FireMask 010 000 000); dir0 tại (33,39) -> đạn x=34 (cột giữa), bay lên theo y giảm; ~14+ ô/s |
| 3b | Đạn nổ khi va chạm | PASS | chạm nhà: Explode ngay tại (19,41); chạm biên y=0: Explode (34,0); trúng xe địch: Score +200, popup '200' hiện (enemies_end.jpg) |
| 3c | Tường/đối tượng bị phá | PASS (quan sát) | wall_1x3/wall_st/vyshka/gruzovik/jeep vào Death1/2, Exploding1/2 (bảng state quan sát được); hình ảnh: ván rào rơi, gruzovik chuyển thân tối (pl_ArrowRight.jpg) |
| 3d | Giữ phím bắn | PASS | Period 0.7 theo XML nhưng số đạn quan sát ra 3 viên/~0.9s; BulletPlayerCount 3 ổn định; chuỗi fireB_0..fireB_end.jpg |
| 4a | Địch spawn từ generator | PASS | 3 tank_2 từ 3 generator_enemy ở biên (ô 0,2 / 36,0 / 41,25...), Default->NoBonus; 25s: hơn 8 xe địch được tạo |
| 4b | Địch di chuyển ngẫu nhiên | PASS | 16-26 ô khác nhau/42 mẫu; MoveRandom tạm đứng khi bị chặn (đúng FORMATS) |
| 4c | Địch bị bắn: Explode, Score, Bonus | PASS (có bất thường, xem B3/B4) | Explode ~4s rồi Dead; bonus Upgrade (sao xanh) và AirStrike (đỏ) hiện đúng (after_win.jpg); Score 200/xe |
| 4d | TankCount cập nhật | **FAIL** | TankCountEnemy đi 3->4->3->2->1->**-1->-3**: xuống âm (xem B3) |
| 5 | Nòng/tháp (node Rotation y khác 0) | KHÔNG-SO-ĐƯỢC / nghi | trong game node có Ry != 0 chỉ là group1 (0.79, ẩn) của tank_2 và upgrade_polySurface3/4/5 (Ry=-pi, ẩn ở NoUpgrade). ?scene=objects/tank_01_3x3.scene&show=upgrade_ (sc_tank01_up.jpg): chỉ thấy 1 mảnh upgrade lệch (vài tam giác) + ring, không ra hình tháp/nòng trọn vẹn => nghi Rotation x/z/-pi chưa đúng, cần anim 'preupgrade/hidden_upgrade' để kết luận |
| 6 | Billboard objects/200.scene | PASS có điều kiện | mặc định 0 draw (node model ẩn); &show=model: sc_200m.jpg hiện chữ '200' đứng thẳng không lật, nhưng NỀN ĐEN HÌNH VUÔNG (alpha/cutout chưa cắt) trong ?scene=; trong game popup '200' hiện đúng chiều, không thấy hộp đen rõ (enemies_end.jpg). BILLBOARD_YAW_FLIP: không cần thử vì không lật |
| 7a | Camera | GHI NHẬN | CameraFollow stub: camera cố định, thấy TOÀN bản đồ + xe người chơi mọi lúc (cửa sổ hẹp 1172x1700: có dải đen trên/dưới). Không có zoom/follow |
| 7b | Thua/Thắng | PASS (đạt Win) / KHÔNG-SO-ĐƯỢC Lose | sau ~20s: level_camera ->PlayerWin, win_detector_player ->Waiting (qua bộ đếm âm), game tiếp tục chạy vì không có UI/Episode. GameOver chưa thử (HitPoints=0 làm xe nổ và hồi sinh Lives=3) |
| 8 | Hiệu năng | PASS có lưu ý | rAF 120 fps (màn 120Hz) ở ?play=0; gameplay đứng yên ~120; khi giữ bắn trong Farm 86 fps TB, 7 khung >40ms/5s, max 83ms (<0.1 clamp). Không nghẽn thường xuyên. Nghi spawn scene khi bắn/nổ (loadScene mỗi viên?) |
| 9a | Ambush, HQProtection lạnh | PASS | __err [], 80 / 79 object; HQProtection console có warn lặp nhiều: '[port] no footprint mask for data/objects/rail_2x4.object' (xem B6) |
| 9b | Resize 800x600, 500x900, clear | PASS | canvas 800x600 / 500x375, __err [], player còn 1, quay lại 967x850 ổn |

## Lỗi (ghi nguyên văn hiện tượng, KHÔNG sửa)
- **B1 (cao) Thân xe người chơi KHÔNG hiện ở lần sinh đầu tiên.** Chỉ thấy vòng vàng (ring) + dù; cold load Farm, state NoUpgrade, mọi mesh thân tank_01_3x3_N_locator / locator1 có visible=false (p6/p9: bodyvis=false,...). Hồi sinh lần 2 (sau Explode) thân hiện đúng (bodyvis cuối = true, pl_ArrowRight.jpg có xe xanh). Nguyên nhân nghi ngờ: Default -> HiddenUpgrade0 (hidden_upgrade0.anim chỉ có key Time 0: Target locator1 Visibility=1, len ~0) phát AnimFinished/chuyển Landing ngay frame đầu, khi world.spawn loadScene async CHƯA xong (sceneRoot null, trace: 'Landing/noview' rồi 'Landing/view') => applyAnim bỏ qua (return khi !sceneRoot) mà animT/animSettled vẫn tiến => Visibility=1 không bao giờ áp. Gợi ý (cho gameplay-logic, sở hữu src/game): khi sceneRoot gán xong, áp lại giá trị anim của các state đã qua / hoặc chặn animT/AnimFinished tới khi view sẵn sàng (object spawn từ generator có cùng rủi ro; xe địch tank_2 không thấy bị vì không qua HiddenUpgrade).
- **B2 (cao) Vòng vàng 'ring' hiện vĩnh viễn trên mọi xe (và ở ô trống Ambush).** ring.scene: Material Transparency="1" + EmissiveAlphaMultiply="true", chỉ explode_ring.anim đổi Transparency. Ở ?scene=objects/tank_01_3x3.scene ring cũng hiện (sc_tank01.jpg) => lỗi render độc lập gameplay: material mode 'emissive' không áp Transparency (material.js:65 chỉ trừ T cho diffuse). Cần chủ renderer xác minh EmissiveAlphaMultiply (alpha=1-T nhân emissive?) - GUESS cần xác nhận từ engine.
- **B3 (cao) TankCountEnemy xuống âm (-1, -3) và số địch vượt GenerateTank2Total=3.** Chuỗi (p11): 3,4(generator đẻ thêm xe thứ 4 khi GenerateTank2=0),...,1,-1,-3; hơn 8 xe địch trong 25s; PlayerWin kích hoạt qua bộ đếm âm. Nghi: GlobalCounter presence (exit trừ) chạy lặp (xe trong BonusAirStrike/Explode), hoặc generator Recreation tạo xe mới khi xe cũ Dead mà không đúng Total (G-GAME-01 GUESS GAME_GLOBALCOUNTER_PRESENCE). Cần decompile-research xác nhận G-X18/Check*Counter.
- **B4 (trung bình) Xe địch Explode kéo dài ~4s, tank_2 ở Explode vẫn tính trong TankCountEnemy tới Dead** (số hiệu: 12s Explode, đếm giảm lúc 12.5-14s). Hợp lý nếu gốc giống nhau; ghi để so.
- **B5 (thấp) world.log trả toàn null ở lần chạy sau** (stats().events = [null x20]) trong khi lần đầu là 'TankExplodePlayer' lặp 20 lần: nghi log tràn/ghi đè hoặc 'TankExplodePlayer' phát mỗi khung khi player đang Explode (chưa xác minh).
- **B6 (thấp) HQProtection: warn lặp '[port] no footprint mask for data/objects/rail_2x4.object'** (nhiều lần); object đó có thể không chặn va chạm.
- **B7 (thấp, KHÔNG-SO-ĐƯỢC) Xe địch sinh ra vẫn nằm trong vòng vàng ngay cả khi di chuyển (liên quan B2).**
- **B8 (thấp) ?scene=objects/200.scene&show=model hiển thị nền đen vuông.**

## Task đề xuất cho agent chủ
1. gameplay-logic: B1 (áp anim khi view sẵn sàng / không để HiddenUpgrade0 qua mất), B3 (đếm, Generator), B5.
2. renderer: B2 (EmissiveAlphaMultiply + Transparency cho emissive), B8, B6 (nếu loader/mask), kiểm tháp tank_01 (mục 5) sau khi B1 sửa.
3. decompile-research: xác nhận cơ chế đếm TankCount/Generator (G-X18, G-GAME-01).
4. QA lặp sweep #5 sau khi sửa B1-B3; kiểm GameOver (Lives=0) và tháp/nòng.

Dọn dẹp: tab 127.0.0.1:5173 đã đóng, vite PID 58034 (+ npm exec 58000) đã tắt.
