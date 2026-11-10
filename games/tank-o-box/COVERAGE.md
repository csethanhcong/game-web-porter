# COVERAGE - tank-o-box: phần của nguồn chưa được tham chiếu trong bản web

Phương pháp: <funcs.tsv/danh sách module> trừ CRT/engine/thư viện (<tiêu chí>) = <N> đơn vị game-specific; <M> đã được nhắc (grep địa chỉ/tên trong src + FORMATS), <K> chưa.
**Lưu ý: 'chưa tham chiếu' chỉ là PROXY.** Nhãn module/ưu tiên theo vùng địa chỉ + kích thước là SUY ĐOÁN trừ khi đã đọc.

## Gap đã xác nhận (đã đọc nguồn)
- ENGINE đã đọc (2026-11-06): run loop 0x41e270, Application update/render 0x4555c0/0x457280, UserInterface::update 0x4426c0, RNG 0x4d2760-0x4d27f0, ChangeStateByCounter/GlobalCounter 0x443bb0/0x443950, RandomTime 0x444110/0x4442a0/0x4443a0, Fire 0x4908d0/0x4905d0/0x491600, MoveFind 0x495140, MoveBase 0x495390 (một phần), Level mover 0x493380 (một phần), world pos 0x493a40, GameObject 0x45bbb0/0x45af40/0x45b110, ControlPlayTime 0x4546b0-0x454980, Randomize 0x448de0.
- ENGINE GAP (còn lại sau vòng 3; ĐÃ XONG vòng 3: load_template merge 0x45b8c0, bus Level 0x494670/0x494890, CheckGlobalCounter 0x444de0, ScoreMenu 0x402940, Episode/EpisodeLink 0x449500/0x454a60/0x4426c0, Fire 0x491600 + Mask 0x491f80): ChangeCounter/Transmit 0x444aa0-0x4450c0 (G-X17), Bonus x87 0x4483f0 (G-X14), visitor đạn 0x4914d0 (G-X15), MoveBullet CollisionState reader (G-X16), Return/GameMenuLink (G-X18), Shadow, Camera* 0x454ee0, envelope eval anim -> GAP -> TASK-X2.
- ENGINE vòng 4 (đã đọc): MoveBase 0x495390, mover 0x493380, MoveByKey 0x48fdf0/0x48fca0, MoveRandom 0x4902e0/0x490310, MoveBullet 0x490c20, Bonus 0x4483f0, Fire visitor 0x4914d0, Generator 0x491190, Transmit 0x444b50, click-link 0x457619/0x43fc80/0x4426c0. GAP còn: người đọc GameMenuLink/"Return" (G-X18). (G-X11c nhánh đảo chiều 0x495390: ĐÃ ĐÓNG.)
- ENGINE vòng 5: StrategyCameraFollow/Angle, StrategyGlobalCounter presence (0x445010/0x4450c0) + vòng đời tank, GameMenu/Return, ProbBonus*. Vòng 6: GC_KeyboardLayout (0x459970/0x428720) XONG; G-X11c dãy gọi XONG; CÒN: G-X18 nhỏ (lớp màn dưới vtbl+0x18).
- <đơn vị>: ĐÃ PORT (<file>; CONFIRMED <addr>) | KHÔNG CẦN (<lý do: không caller/CRT/cheat chết>) | GAP -> TASK-<id>

## Trạng thái port hiện tại (doc-keeper, 2026-11-06; xác minh bằng src/game/strategies.js, src/loader, src/render)
- ĐÃ PORT (src/game/**): world/grid, bus sự kiện, RNG, template merge (G-X09), strategies Move*/MoveByKey/MoveBullet/Fire/Generator, bộ đếm (ChangeStateByCounter, ChangeCounter, CheckCounter/CheckGlobalCounter, Transmit, GlobalCounter presence, TimeCounter), Bonus, CameraFollow, CameraAngle (G-X20, một phần GUESS: normalise/clamp, thứ tự phép chiếu), phím P1/P2 (G-X21), đảo chiều giữa ô (G-X11c, cờ GAME_REVERSE_MIDCELL), SetProperty/SetGlobalProperty (GUESS G-GAME-13: chưa decompile), Score/Lives/thắng-thua, EpisodeLink (phát event).
- ĐÃ PORT (render/loader): scene/level/anim loader (mọi kênh anim), material theo ENGINE (ánh sáng, emissive, opaque/blended), Billboard (GUESS G-R10).
- STUB / GAP (STUBS trong strategies.js): StrategyForceEffect (no-op: DirectInput force feedback, khong ap dung web). StrategyCheckUpgrade (0x40d040) va StrategyRandomize (0x448e50, vector theo truc, N10 fix) va StrategyShadow (0x490e30, Phase 7a-3) da cai.
- DATA thiếu: objects/tank_player_tutorial.object (generator_player tham chiếu; không có trong extracted/data). [vòng 16: KHÔNG ảnh hưởng, Generator 0x491190 chỉ nạp template khi counter>=1 mà GenerateTankPlayerTutorial luôn 0; xem FORMATS 'ENGINE: vong 16' T1]
- Audio: DA PORT (FORMATS "PORT: Audio", Phase 9; chua QA nghe; GUESS: loop XM, 3D SFX, MusicMute). Con thieu: Emit/ParticleSystem trong Commands, gamepad, ForceEffect (no-op), Text (UI agent Phase 10 đang làm: src/render/text.js), Billboard chỉ một phần, HUD/menu/luồng màn (Phase 10; spec CONFIRMED vòng 8).
- ENGINE vòng 6-8 đã đọc: GC_KeyboardLayout 0x459970/0x428720; luồng màn 0x448fd0/0x454a60/0x43fc80/0x4426c0; Text::on_change_text 0x4760e0, Letter loader 0x4d4160/0x4d36b0; ControlLabel 0x44e960; ControlProgressBar 0x454180 (Speed smoothing = GUESS G-X08b). Đóng: G-X08, G-FLOW-01, G-GAME-12.
- Lưu ý: các dòng 'ENGINE GAP' ở trên là lịch sử theo vòng; đã đóng sau đó: G-X14/15/16/17 (vòng 4), G-X18/G-X19/G-GAME-01 (vòng 5). Còn mở (Shadow đã cài): Camera* phần GUESS, envelope eval anim, G-X18 nhỏ.

## Chưa duyệt (bảng)
| addr/module | size | callers | nhãn (SUY ĐOÁN) | ưu tiên | trạng thái |

## AUDIT Phase 12 (coverage-auditor, 2026-11-07) - bảng gap theo ưu tiên
Phương pháp (PROXY, ghi rõ): (a) đếm số FILE chứa tag trong extracted/data/Data (regex trên .object/.state/.level/.episode/.screen/.scene/.anim); (b) đối chiếu với TABLE/STUBS trong src/game/strategies.js, switch node trong src/loader/scene.js, ANIM_PARAMS trong src/loader/anim.js (dòng 59), src/ui/screens.js, src/audio/sfx.js; (c) chuỗi lớp trong engine.exe (`strings`) so với tag trong data; (d) "không nạp" = không đạt tới từ root (mọi .episode + file gốc Data/*.scene) theo tham chiếu chuỗi `data/...` trong XML (không thấy tham chiếu dựng bằng sprintf/prefix `_` ngoài các prefix đã liệt kê). Script: scratchpad a1.py/a2.py (không lưu vào repo).

### (1) Strategy / Control / Command trong data vs port
- CONFIRMED: 30 loại `<Strategy*>` trong data; 29 có entry trong TABLE (strategies.js:285-296). Duy nhất `StrategyForceEffect` = STUB no-op (2 file: objects/level_force_effects.object, level_force_effects2.object; nằm trong common.level => có mặt MỌI level; 5 effect .ffe: AirStrike, EnemyHit, ExplodeHQ, PlayerHit, PlayerUpgrade). Lý do hợp lệ: DirectInput force feedback, web không có (gamepad haptics = tuỳ chọn).
- Số file dùng (cao->thấp, tất cả đã port): ChangeState 80, Mask 63, ChangeStateByCounter 37, GlobalEvent 27, GlobalCounter 26, ChangeGlobalCounter 21, Shadow 20, MoveBullet 17, ChangeStateByGlobalCounter 13, TransmitGlobalCounter 12, ChangeStateByRandomTime 10, FireByTime 10, ChangeCounter 8, MoveFind 8, SetGlobalProperty 7, Bonus 6, MoveRandom 6, FireByKey 4, SetProperty 4, CheckCounter 4, CheckUpgrade 4, MoveByKey 4, Randomize 3, CheckGlobalCounter 2, Generator 2, CameraFollow 1, CameraAngle 1, EpisodeLink 1, TimeCounter 1.
- Port có nhưng còn GUESS (hành vi có thể lệch): SetProperty/SetGlobalProperty (G-GAME-13, 11 file), CameraAngle (G-X20 phần clamp), Randomize (G-GAME-15 ánh xạ node), CheckUpgrade default Min/Max (G-GAME-14), GlobalEvent once-per-state (G-GAME-10, 27 file).
- Control trong data: ControlButton 151, ControlLabel 114, ControlProgressBar 8, ControlInputSelector 5, ControlHiscore 4, ControlPlayTime 2 (chỉ common.level, surv/common.level), ControlMusicMute 2, ControlPassword 1. Port xử lý tất cả TRỪ `ControlPlayTime` (grep src: 0 kết quả). GUESS (nguồn: FORMATS dòng 142/151, không đọc quyết định): đây là bộ đếm thời gian bản trial/registry HKCU\Software\Nice-Games\Tank-o-box JoyKeyFFAA, Time=3600; engine đọc ở 0x4546b0-0x454980 (đã decompile) nhưng chưa ghi cách dùng PlayTime; nếu đây là giới hạn chơi thử thì KHÔNG CẦN (cần xác nhận tại 0x454980: có gọi GameOver/khoá không).
- Lớp engine KHÔNG có trong data (CONFIRMED bằng strings so với tag): StrategyCameraInBox, ChangeStateByKey, CreateGameObject, Event, EventByCounter, EventByGlobalCounter, Timer, Fire/MoveBase (lớp cha); ControlCheckBox, ControlModelList; CameraParallel. => KHÔNG CẦN (không dữ liệu nào dùng).
- InterfaceScreen*: LevelSquare 249, MenuScore 77, Menu 43, Game 3: đều có xử lý (ui/index.js:42-46, screens.js).

### (2) Hàm engine đã decompile nhưng chưa có mã trong src
- PROXY: 462 địa chỉ 0x4xxxxx được nhắc trong FORMATS.md, 160 xuất hiện trong comment src; 305 chỉ có trong FORMATS (đa số là hàm hỗ trợ/ctor/creator được mô tả, KHÔNG phải gap; không đọc từng hàm trong audit này - chưa làm).
- GAP rõ ràng (CONFIRMED bằng grep): `liba::lib3d::node::ParticleSystem::update_buffer` (all.c:90002) và `get_position_and_n...` (all.c:90688): CHƯA decompile/RE (không có mục ENGINE trong FORMATS; FORMATS:87 chỉ mô tả attr). => ParticleSystem là gap lớn nhất.
- ControlPlayTime 0x4546b0-0x454980: đã đọc, chưa port (xem (1)). [vòng 16: ĐÃ ĐỌC, chỉ ghi PlayTime (phút còn lại) + registry khi thoát, không khoá/không hiển thị -> KHÔNG CẦN port]
- Gamepad (Joystick_*), ControlInputSelector > 2 bàn phím: DEVIATION INPUT_DEVICES_WEB (đã có cờ).
- Còn mở theo COVERAGE cũ: envelope Behave enum (G-X07 phần tên), G-X18 nhỏ.

### (3) Anim: Command Execute và kênh Param bị bỏ qua
- `Execute Name=Play|Stop` (46/28 file): ĐÃ PORT (audio/sfx.js). `Execute Name=Emit`: BỎ QUA (sfx.js:74; comment "ParticleSystem not built yet"): 6 file anim, 8 lệnh: wall_death2 (fire|Dust), Wall_death1 (fire|Dust), explode_smoke_small (FirePS), explode_smoke_big (SmokePS + FirePS), bullet_explode (FirePS + SmokePS), rocket_explode (FirePS). Bullet/rocket/tường/khói nổ.
- Param không được lái trong game (ANIM_PARAMS chỉ Visibility/Intensity/Position/Rotation/Scale/Transparency; hud.js tự xử lý MorphWeight/Emissive cho UI): ParticlesPerSec 29 file (nhà/xưởng/shtab/cây/tàu hoả nổ, khói), Diffuse 9 + ShadowSource 9 (tank_0N_ashes.anim: tro xe tăng, 9 file), MorphWeight trong GAME 4 file (tree_00/01/02_2x2.anim + bonusshtab_active.anim; cây dùng ở 56 level, đang đứng yên vì ModelMorph chỉ vẽ Source), Image 2 file (bmp_explode1/2.anim: lật khung texture bmp1/bmp2/exp_00..15 = 64 file texture nổ BMP; dùng bởi tank_2/tank_6/tank_2_catch_me.object + 5 scene tank_*_3x3), Dumb 1 (listener_move.anim, không rõ tác dụng, có thể bỏ). Emissive (16) + Text (4) chỉ UI: đã xử lý trong ui/.
- Node scene: ParticleSystem 26 scene (đạn bullet*/rocket, bochka_fire, tree_fire, vagon_fire, wall_fire, explode_*, smoke, trek, tube_steam, nhà/xưởng, airstrikeanim, radar, tuyết _day_snow/_evening_snow): KHÔNG dựng (scene.js:132 trả null; stats.skipped). Billboard: một phần (GUESS G-R10).

### (4) Asset không nạp / 404 (CONFIRMED bằng script tham chiếu chuỗi; 1264/1617 file chạm tới từ root; phần còn lại phân loại dưới đây)
- Tham chiếu NHƯNG file không có (404 thật): data/textures/logo (Loading.scene), data/objects/tank_player_tutorial.object (generator_player.object -> tutorial không sinh xe người chơi), data/interaface/mainmenu.screen (typo trong tutorial.episode; gốc cũng sẽ THROW - G-UI-03), data/levels/surv/briefingarena.scene (BriefingArena.screen, chỉ Arena). Placeholder template.object (%file_name%, explode_anim.anim) = KHÔNG CẦN.
- Prefix động (đúng, không 404): interface/EmissiveButton_*, MusicButton_*, Candidate_*, objects/bonusarmor_*, bonusfast_*, bonusshtab_* (anim theo trạng thái; ghi nhận: các file này nằm ngoài danh sách tham chiếu tĩnh nhưng được nạp bằng ghép tên).
- Không đạt tới từ episode/màn nào (ứng viên "chết" hoặc chỉ 2P/trial/debug; KHÔNG kiểm engine từng cái): Trial (levels/Trial.scene, interfacelevel_trial.scene, interface/TrialTime/TrialPassword/MainMenuTrial.scene, Trial.screen, Trial2P.screen, tank_player(2)_trial.object, *_collision_trial.state x4) = KHÔNG CẦN (FORMATS:142); levels/surv/{Arena,Arena2P,ArenaRadar,ArenaRadar2P,test,all,level3,FirePower,level_empty}.level + levels/{all,test,level3,FirePower,level_empty}.level; interface/Joystick_1..3.scene, interface/Tank4.scene, objects/explode_flash_blue.scene, emitters/emitter_conus.model, bullet_player_collision.state (không ref); 2P Password*2P.screen (trong levels/ và surv/, 30 file; 2P ngoài phạm vi theo quyết định user 2026-11-06). Cần QA nếu thêm 2P.
- Ghi chú sai dương tính: Sounds/*.wav (24) hiện "không đạt tới" chỉ vì .scene tham chiếu tên tương đối, ASSET_AUDIT báo 0 thiếu => KHÔNG phải gap. 179 `_a.gif` = kênh alpha ghép (G-X01).
- Chưa kiểm: terrain_*_{90,180,270}[_snow].scene (levels/Terrains, 10 file chưa chạm tới theo XML; có thể chọn bằng tên động) - cần kiểm bằng 1 level dùng terrain đó.

### (5) GUESS còn OPEN, xếp theo ảnh hưởng hành vi (đọc GUESS_REGISTER; không đóng cái nào)
Lưu ý: nhiều dòng cũ trong register chưa cập nhật trạng thái (G-X03 -> đóng bởi G-X09; G-X05 -> G-X10; G-R09 phần Billboard/Text/Sound đã làm; G-A0x chờ audio/QA). doc-keeper nên đồng bộ.
1. G-GAME-13 SetProperty/SetGlobalProperty (11 file; ảnh hưởng thắng/thua MissionStatus, điểm) - đóng bằng decompile 0x? (chưa tìm hàm). [vòng 16: CONFIRMED, port đúng]
2. G-GAME-04 đảo chiều giữa ô (G-X11c đã đóng bằng decompile 0x495390) - chỉ cần qa-visual kiểm liên tục vị trí; MoveFind (đuổi mục tiêu), đạn nổ ở biên, AnimFinished chuỗi Explode/GameOver cần kiểm lại.
3. G-GAME-10 GlobalEvent once-per-state (27 file), G-GAME-06 (AnimFinished loop/TimeCounter/MoveFind) - ảnh hưởng chuỗi sự kiện.
4. G-GAME-02 counter local vs global (ChangeCounter/Check*), G-GAME-05 đạn spawn p, G-GAME-07 dấu turn/yaw, G-GAME-09 anim root TRS bị bỏ.
5. G-R10 Billboard, G-R11/G-R07 footprint (vị trí đối tượng), G-R05/G-R06 camera/texture-stage (nhìn thấy ngay nếu sai).
6. G-GAME-14/15 CheckUpgrade/Randomize (4+3 file), G-X20 CameraAngle (1 file).
7. G-MDL-1/3/4, G-A02/A04 (texture wrap/format), G-AUDIO-01..06, G-A03/A05 (nghe), G-UI-09/12, G-GAME-08 (DEVIATION dt clamp).

### Bảng gap theo độ ưu tiên (ảnh hưởng thấy được khi chơi) và đề xuất task
| # | gap | file dùng / quy mô | thấy được | role đề xuất | task |
|---|---|---|---|---|---|
| 1 | ParticleSystem chưa RE + chưa dựng (26 scene, 29 anim ParticlesPerSec, 6 anim Emit, 8 lệnh) | mọi vụ nổ, đạn, khói, lửa, hơi nước | rất cao: nổ/khói/đuôi đạn trống | decompile-research -> renderer | R1: RE ParticleSystem::update_buffer/emit all.c:90002 (vòng đời, LifeVar, Speed, Size/Color/Alpha lerp, Gravity, EmitterLevel, ParticlesEmit khi Emit); R2: renderer dựng src/render/particles.js + Emit trong anim |
| 2 | Anim `Image` (lật texture khung nổ bmp1/bmp2, 64 texture) | bmp_explode1/2 -> tank_2/tank_6/catch_me + 5 scene 3x3 | cao: nổ xe địch thiếu hình | renderer | R3: kênh Image trong loader/anim.js (chuỗi texture theo Key; filesystem::String) |
| 3 | Anim `Diffuse`+`ShadowSource` (tro xe, 9 file tank_0N_ashes) | mọi xe địch chết | trung bình: xác xe không mờ/đổi màu | renderer | R4: Diffuse (material) + ShadowSource (kiểm FORMATS shadow) |
| 4 | MorphWeight trong game (cây 3 anim, 56 level; bonusshtab_active) | cây đứng yên | trung bình (nền) | renderer | R5: ModelMorph Source2 lerp ngoài HUD (dùng prepMorph/setMorph từ ui/hud.js, G-UI-02 đã CONFIRMED) |
| 5 | SetProperty/SetGlobalProperty GUESS | 11 file | cao nếu sai: kết quả màn | decompile-research | D1: tìm creator + process/attr của StrategySetProperty (chuỗi "StrategySetProperty") đóng G-GAME-13 | [vòng 16: ĐÃ CHỐT]
| 6 | ForceEffect no-op | 2 file (mọi level) | thấp (rung tay cầm) | audio/ui (tuỳ) | F1: cờ GAME_GAMEPAD_HAPTICS (extension), mặc định tắt |
| 7 | ControlPlayTime chưa quyết định | common.level (mọi level) | chưa rõ (khoá trial?) | decompile-research | D2: đọc 0x454980: có kết thúc game sau Time=3600 s không; ghi KHÔNG CẦN hoặc port | [vòng 16: ĐÃ CHỐT, không cần port]
| 8 | tank_player_tutorial.object thiếu | Tutorial (generator_player) | cao với Tutorial | format-RE/gameplay | T1: kiểm engine có fallback (tank_player.object?) trước khi bịa; ghi 404 gốc | [vòng 16: ĐÃ CHỐT, tham chiếu chết]
| 9 | 2P chưa port (60 level 2P + Password*2P 30 screen) | 2P episode | theo quyết định user | orchestrator | feature mới (multiplayer) |
| 10 | Tên GUESS register cũ/stale | G-X03, G-X05, G-R09 | - | doc-keeper | G1: đồng bộ trạng thái register |
| 11 | terrain *_90/_180/_270 chưa kiểm | 10 scene | thấp | qa-visual | Q1: load 1 level mỗi terrain biến thể |

## Âm thanh
Da port: sfx.js (SFX theo Commands anim, 2D/3D), music.js (XM + fade 3 s, 0x498300), click.wav khi hover, tank_fire_bullet khi bam chuot (0x40b4e0). GUESS: G-AUDIO-01/02/05/06. Chua QA nghe; danh sach mau x diem phat day du: xem FORMATS "PORT: Audio".

## ENGINE ADDRESS MAP
Pham vi: dia chi 0x4xxxxx co trong FORMATS.md nhung khong co ky tu 0x... tuong ung trong src (321 theo regex vong anim; so 305 cu khac do regex). Nhieu cai duoc port nhung comment khong ghi dia chi. Ma tran duoi day uu tien render/anim/loader (da doi chieu code); phan gameplay/UI chia theo muc FORMATS, giao agent so huu kiem tung dia chi.

| Dia chi | Vai tro | Trang thai |
|---|---|---|
| 0x4123c0 0x412450 0x4124a9 0x4124d1 0x4124fb 0x413ff9 0x414021 0x415829 0x415851 0x417299 0x4172c1 0x424440 | Key ctor / attribute map (Time/Value/Linear/Quadratic/Cubic, stride 0x4c vec3) | da port (loader/anim.js) |
| 0x4104a0 | wrap helper envelope (Pre/Post Behave) | da port, 5 Behave day du (vong anim) |
| 0x40e140 0x40e170 0x41e270 0x4555c0 0x457280 0x410340 0x4670d0 0x497c80 | QPC dt, run loop, update/render, FPS, audio update | da port (rAF + dt that); 0x410340 FPS counter khong can |
| 0x43a4f0 | Sleep limiter | khong can |
| 0x465e80 0x4f4ba8 0x4f8178 | GameObjectStateView (Loop/RandomStart/finished) | da port |
| 0x46b260 | Light attributes | da port (renderer) |
| 0x486b90 | Material/alpha | da port |
| 0x4f8dd0 | ps vtable (update 0x475200) | da port; G-R14 sua vong anim |
| 0x474710 0x473450 | ps render + quad | da port; G-R11 size/vertex colour van GUESS |
| 0x41c240 0x41c480 | update manager | tham chieu: khong co ending emitter; khong can code rieng |
| 0x4ab450 | acos | khong can (Math.acos) |
| 0x45e580 0x45b8c0 0x4649c0 0x464d40 0x464eb0 0x465960 0x465cd0 0x465d20 0x4f7c70 0x4f7cd8 0x4f8160 | load_template / merge container | da port (loader) |
| 0x403cc0 0x403c60 0x405190 0x4057f0 0x446430 0x4451e0 0x446290 0x47ce00 0x446685..0x446e0c 0x4f5b90 0x4f6708 0x454ee0 0x4f7d5c | StrategyCameraFollow/Angle | spec CONFIRMED; port o world.js (agent gameplay) - kiem |
| 0x471890 0x495050 0x495760 0x491b70 0x491ba0 0x4920e0 0x4f5bc0 | yaw/Direction/Position | spec CONFIRMED; world.js (agent gameplay) |
| 0x404bb0 0x404c90 0x4f8ac8 0x4fb750 | Shadow strategy | chua kiem (agent gameplay) |
| 0x450b70 0x4f61a0 | ControlEdit/MusicFlag | agent UI |
| Cac dia chi con lai | Strategy/Counter/Score/va cham/bus su kien/UI/Password/Input (muc FORMATS tuong ung, ~230 dia chi) | chua phan loai tung dia chi; thuoc agent gameplay/UI, khong thuoc render/anim/loader |
| Phan loai vong 22 | thu vien (map/vector, XML liba, unrar, input, log, minidump, D3D), gameplay da CONFIRMED thieu trong bang, CameraFollow 0x445270/0x4455a0/0x446070, loader, UI, audio | xem docs/GAMEPLAY_AUDIT_22.md muc 2; CameraFollow chua doi chieu dong-theo-dong |

## Vòng audit
| lần | ngày | còn chưa duyệt | ghi chú |

- GAME-R21 (audit gameplay, chi docs): xem docs/GAMEPLAY_AUDIT_21.md. He (2)(3)(4)(5)(6)(8) generic CONFIRMED; LECH: Fire 5 slot, Bonus anim, MaxBulletCount default. Chua kiem: co phim ban +0x118, ChangeStateByRandomTime, MoveBullet, 0x494890.
- GAME-R23 (audit gameplay, chi docs): xem docs/GAMEPLAY_AUDIT_23.md. CameraFollow 0x454ee0 khop; G-GAME-06, 23a, 23b dong; chi StrategyForceEffect la stub.
