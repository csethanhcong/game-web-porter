# GAMEPLAY AUDIT vòng 21 (CHỈ TÀI LIỆU; không sửa src/)

Phương pháp: đọc src/game/{strategies,world,mask,input,index}.js (không sửa) đối chiếu decomp/out/all.c (script trích hàm: scratchpad game21/fn.sh) + dữ liệu extracted/data/Data. Cột trạng thái: CONFIRMED / LỆCH / GUESS. Danh sách LỆCH để vòng sau sửa SAU KHI qa-visual xong.

Trạng thái hệ: (1) AI/Fire: audit một phần (Fire*, Move*), xem dưới. (2)-(8): xem mục "Chưa audit" cuối file nếu chưa có bảng riêng.

## (1) AI strategy / Fire

| mục | engine (địa chỉ) | port (file:dòng) | trạng thái | đề xuất sửa |
|---|---|---|---|---|
| Fire(): 5 slot mask FireMask(+0x14) + FireMask0..3 (+0x44/+0x74/+0xa4/+0xd4), TẤT CẢ slot không rỗng đều bắn mỗi lần Fire | 0x491600 (FUN_00491c60 = slot không rỗng; slot k: hướng ÉP = k qua 0x495050(k,4)+0x495760; mask vẫn được duyệt bằng state của xe bắn: 0x491f80(mask, shooterState,...) với visitor dựng từ state hướng k => ô mask xoay theo hướng xe bắn, nhưng đạn lệch +1 ô theo DX/DY[k] và có hướng k; p = p xe bắn, turn 0) | strategies.js:94-102 `fire()`: chọn DUY NHẤT `FireMask{d}` nếu có, nếu không `FireMask`; bắn theo hướng d | **LỆCH (cao)** | Duyệt 2 loại: (a) `FireMask` -> forEachMask(m, d, ...) đạn tại cx+DX[d], hướng d; (b) với k=0..3 nếu `FireMask{k}` không rỗng -> forEachMask(m, d(shooter), ...) đạn tại (cx+DX[k], cy+DY[k]) hướng k, p = go.pos.p. Bỏ logic `FireMask+d`. |
| Dữ liệu dùng FireMask2 | objects/fabrica_6x12.object (2 state, StrategyFireByTime TemplateName=tank_3.object MinTime=MaxTime=10, FireMask2 bit hàng 2 cột 8 của lưới 12x6) và objects/dot_3x3.object; đặt trong levels (fabrica 22 chỗ, dot_3x3 34 chỗ; Direction hầu hết 0) | với Direction 0 port tìm `FireMask0` (không có) -> `FireMask` rỗng -> return: nhà máy KHÔNG BAO GIỜ sinh tank_3 (chỉ bắn khi object quay hướng 2) | **LỆCH (cao, ảnh hưởng thấy được: survival TheFactory/InsectsNest/RoadToFactory...)** | như trên; tank_3 spawn bằng `w.spawn(Template, cx+DX[2], cy+DY[2], 2, p)`. |
| FORMATS.md dòng 628 'Data chỉ dùng thuộc tính FireMask' | data thật có FireMask2 (grep extracted/data/Data/objects) | - | **tài liệu SAI** | Sửa dòng 628 (đã ghi chú ở FORMATS 'ENGINE: vong 21'). |
| FireByKey điều kiện bắn | 0x4908d0: t += dt; count = global[BulletCounter] (0 nếu tên rỗng); count<Max ? (t>MinPeriod ? bắn : thử Period) : thử Period; Period: bắn nếu t>Period; sau đó cần cờ phím +0x118; bắn -> t=0 (0x4f4660) | strategies.js:103-111 | CONFIRMED (khớp) | - |
| FireByKey mặc định | ctor 0x4906d0: MinPeriod=DAT_004fb658 (+0x120, 100.0 theo FORMATS 240), Period=0.0, t=DAT_004fb658, **MaxBulletCount (+0x154) = 1** | strategies.js:107 `n('MaxBulletCount', 0)` | **LỆCH (nhỏ; không ảnh hưởng data hiện tại: mọi FireByKey đều đặt MaxBulletCount)** | đổi mặc định thành 1. |
| FireByTime enter/process | 0x490a10: timer = Min+(Max-Min)*rng01 (RNG riêng +0x120); 0x490a40: timer -= dt; timer <= 0 -> Fire + nạp lại | strategies.js:112-115 | CONFIRMED công thức; **GUESS** về nguồn RNG: engine mỗi Strategy có RNG riêng (Fire +0x120, MoveRandom +0xb0, seed GetTickCount 0x4d2760), port dùng 1 world.rng chung - không quan sát được (RNG gốc seed theo giờ) | giữ GUESS, rủi ro thấp |
| FireByTime khi gọi từ EventHandler (dt=0) | process không có cờ handler; nếu có trong handler sẽ chạy với dt=0 | strategies.js:114 bỏ qua khi h | GUESS nhỏ (data: 0 FireByTime trong EventHandler chưa kiểm) | kiểm grep EventHandler trước khi sửa |
| MoveFind hướng 0x495140 | 0x495140 (FORMATS 286) | strategies.js:124-127 | CONFIRMED | - |
| MoveFind chọn mục tiêu / MoveRandom timer | 0x492c20 / 0x490310 (vòng 18) | strategies.js:187-204 | CONFIRMED (đã đóng vòng 18) | - |

Việc chưa kiểm trong hệ (1): cờ phím bắn +0x118 (cách set/clear, input.fireHeld dùng `held` của mọi mã fire - chưa đối chiếu listener Fire ở 0x4905d0..), ChangeStateByRandomTime, MoveBullet tốc độ.

(Ghi chú sửa: dot_3x3 được đặt 34 chỗ trong levels, không phải ~54.)

## (2) Score / Lives / upgrade
| mục | engine | port | trạng thái | đề xuất |
|---|---|---|---|---|
| Điểm/mạng khi tạo màn LevelScore | ctor 0x402940 (FORMATS 'Score / Lives / Episode') | ui/episode.js:32-40 applyScoreScreen | CONFIRMED | - |
| ChangeCounter local (0x4554d0, vtbl 0x4f4484) / ChangeGlobalCounter (0x443ff0, vtbl 0x4f6450): counter global, StepProperty đọc từ bag local go+8, kiểu double | all.c | strategies.js:40-46 | CONFIRMED | - |
| CheckCounter/CheckGlobalCounter: int, TRUE nếu v<Min hoặc v>=Max | 0x444de0 | strategies.js:47-50 | CONFIRMED | - |
| ChangeStateByCounter: double, Min<=v<Max; đổi state lỗi -> engine ném exception | 0x443bb0 | strategies.js:27-30 | CONFIRMED logic; lệch nhẹ (warn thay vì throw), chấp nhận | - |
| TimeCounter | 0x447730 | strategies.js:76-83 | CONFIRMED (vòng 19) | - |
| CheckUpgrade | 0x40d040 | strategies.js:253-258 | CONFIRMED (vòng 19) | - |
| Level upgrade / HP / điểm kill | engine không có logic, toàn data (FORMATS 641) | generic | CONFIRMED (generic) | - |

## (3) Thắng / thua
| mục | engine | port | trạng thái |
|---|---|---|---|
| PlayerWin/GameOver/HQExplode do data (win_detector_*, level_camera) qua CheckGlobalCounter+GlobalEvent+EpisodeLink | FORMATS 'Score/Lives' | generic + world.onEpisodeLink | CONFIRMED (generic) |
| EpisodeLink process 0x454a60 không phân biệt handler | 0x454a60 | strategies.js:91 chỉ khi h=true | lệch cấu trúc, không ảnh hưởng data (chỉ dùng trong EventHandler); ghi nhận |

## (4) Generator / spawn
| mục | engine | port | trạng thái |
|---|---|---|---|
| Generator: Dec<1 -> false; Dec-=1; Inc+=1; spawn tại Position, p=0.01, ChangeState, TRUE | 0x491190 | strategies.js:54-62 | CONFIRMED |
| Chu kỳ / giới hạn số lượng = counter global (data generator_*) | data | generic | CONFIRMED |
| Spawn tank_3 từ nhà máy (Fire FireMask2) | xem (1) | - | LỆCH (xem (1)) |

## (5) Damage / HP
Engine không có hằng/logic sát thương; data dùng ChangeCounter*/CheckCounter/ChangeStateByCounter + Bonus (Damage/DamageDouble/DamageRocket = ValueProperty của StrategyBonus). Port generic = CONFIRMED, ngoại trừ phần hiển thị Bonus ở (7).

## (6) Collision / mask
| mục | engine | port | trạng thái |
|---|---|---|---|
| Mask place: xóa footprint cũ, collide giới hạn W*H, ghi ô trống | 0x493120 / 0x4920e0 / vtbl 0x4fb830 | world.js:128-150 | CONFIRMED |
| Mover va chạm giới hạn 1, CollisionStop, biên | 0x493380 (FORMATS 312) | strategies.js:153-176 | CONFIRMED (QA vòng 12/13) |
| 2 sự kiện mỗi ô, FIFO | 0x494550 | world.js:130-138 | CONFIRMED |
| đạn-đạn / đạn-xe / tường / nước / rừng | data (Type+state+Mask) | generic | CONFIRMED (generic) |
Chưa kiểm lại vòng 21: thứ tự xả hàng đợi trước mỗi update (world.js:159-164 vs 0x494890).

## (7) Bonus
| mục | engine | port | trạng thái | đề xuất |
|---|---|---|---|---|
| Time/Value (Time -= dt kẹp 0; Value = anim=="passive" ? NoBonus : Bonus) | 0x4483f0 | strategies.js:84-90 | CONFIRMED (giá trị) | - |
| Animation phụ AnimationPath + "passiveactive"/"activepassive"/"active"/"passive" (objects/bonusarmor_*.anim, bonusfast_*.anim, bonusshtab_*.anim; có Command Stop/Play snd_shield), update(dt) mỗi tick | 0x4483f0 (FORMATS 395), 0x45d070 | KHÔNG CÓ (strategies.js:84 ghi 'animation not played'; grep src không nạp bonus*_ anim) | **LỆCH (cao, thấy được: khiên/tăng tốc/khiên HQ không hiện, âm khiên không phát)**. FORMATS vòng 20 'Bonus anim đã đóng' chỉ đúng về GIÁ TRỊ | Thêm anim phụ cho Bonus: phát .anim theo tên ghép trên view của go (dùng cơ chế GameObject.applyAnim), "passiveactive"/"active" khi Time>0, "activepassive"/"passive" khi hết. Cần QA ảnh |
| Loại bonus, ProbBonus* chuỗi ChangeState | FORMATS 388 | generic | CONFIRMED |

## (8) HQ
HQ = object 'Shtab' do data (HP, event HQExplode); port không có code riêng: CONFIRMED (generic). Khiên HQ (bonusshtab_*) bị ảnh hưởng bởi LỆCH Bonus (7). Chưa kiểm sâu data HQ.

## DANH SÁCH LỆCH cho vòng sau (sau khi QA xong)
1. [cao] strategies.js:94-102 fire(): thực hiện đủ 5 slot FireMask + FireMask0..3 (xem (1)); nhà máy fabrica_6x12/dot_3x3 sinh tank_3.
2. [cao] strategies.js:84 Bonus: thiếu animation phụ + SFX khiên (xem (7)).
3. [thấp] strategies.js:107 mặc định MaxBulletCount 0 -> 1.
4. [thấp/GUESS] RNG per-strategy vs world.rng; FireByTime bỏ qua khi h.
5. FORMATS dòng 628 'Data chỉ dùng FireMask' sai (đã sửa bằng ghi chú 'ENGINE: vong 21').

## Chưa audit đủ
Không chạy Ghidra (0x494550/0x492580/0x4431c0/0x494890 không có trong all.c; dùng FORMATS vòng 2b/3). Chưa kiểm: cờ phím bắn +0x118 vs input.fireHeld, ChangeStateByRandomTime, MoveBullet tốc độ, ChangeState xác suất 0x4431c0, số liệu data từng object, upgrade từng state, thứ tự update 0x494890. Không mở trình duyệt, không sửa src.
