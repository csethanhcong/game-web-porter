# ASSET AUDIT - tank-o-box gốc vs bản web

Source of truth: <binary/source>. Quy tắc: bằng chứng từ nguồn.

## Method & limits
- Chuỗi trong nguồn (kể cả suffix), pattern sprintf (`name%i.ext`), immediate bằng VA chuỗi (xref), hàm chứa (heuristic). "indirect" = file được đặt tên bởi file khác mà nguồn đặt tên (vd .cgo/.chr). 
- Cột "web" = bản web có THỰC SỰ yêu cầu file lúc chạy (không tính chỉ copy vào public/assets).

## Counts
Tổng: <N> = <các nhóm>. Tham chiếu theo tên/pattern: <a>; gián tiếp: <b>; không tham chiếu: <c>.

## Bảng
| file | nhóm | tham chiếu bởi (addr/file) | feature | web dùng? | ghi chú/trạng thái |

## Không dùng trong gốc (lý do)
- <file>: <vì sao>

## Counts theo loại (extracted/data/Data, 1617 file; CONFIRMED find|sed, 2026-11-06)
gif 344 | scene 319 | level 249 (120 gốc + 124 surv/ + 5 Tutorial/) | model 222 (RE riêng) | anim 159 | screen 123 | object 70 | jpg 66 | wav 25 | state 20 | episode 8 | ffe 5 | font 4 | xm 3 = 1617.
Theo thư mục: objects 873, levels 510, interface 104, Sounds 50, textures 30, emitters 16, fonts 10, blasts 6, ForceEffects 5, models 4, Music 3, + 6 file gốc (Hole, Loading(.scene/.anim), loading_progress.anim, microphone.scene, precache.scene).
Tham chiếu: 13386 ref path trong XML; 13385 phân giải được (hầu hết sau chuẩn hoá lower-case + `\`->`/`); hỏng: xem FORMATS.md "XML: quy ước chung". File trial (MainMenuTrial/TrialTime/TrialPassword/interfacelevel_trial/Trial*.screen/tank_player*_trial*) không được ref nào trỏ tới (grep): ứng viên "không dùng".

## .model (222 file) - 2026-11-06
- Tổng 222 = models 4 + blasts/models 4 + emitters 16 + interface/models 29 + levels/models 11 + objects/models 158 (chi tiết trong `extracted/models_json/index.json`). Giải được 222/222 (0 lỗi), format xem FORMATS.md "MODEL (.model)". Bản chuyển: `extracted/models_json/<path>.json|.bin` (chưa copy vào public/assets; renderer dùng khi cần).
- Tham chiếu: 221/222 được ít nhất một file text (.scene/...) nhắc tên; 191 có TrianglesCount khớp tổng tri, 1 lệch (wall_1x3 death0: 12 vs 4), 30 chỉ tham chiếu qua scene không có `<#Shaders#>` (emitter/particle/tree/shield). Không tham chiếu: `emitters/emitter_conus.model` (20 tri) - có thể không dùng trong gốc (chưa xác nhận bằng xref code).
- Không có model skeleton/morph/indexed trong dữ liệu (chỉ 3 khối vertex + 2 tangent).

## ASSETS: textures/audio/fonts (2026-11-06; tools/audit_assets.py -> tools/asset_audit.json)
Phương pháp: quét mọi chuỗi `data/...` trong .scene/.screen/.object/... + literal engine.exe, chuẩn hoá lower-case, phân giải theo loại (thử đuôi như loader FUN_004d5130).

### Counts
| loại | file nguồn | đầu ra web | thiếu (tham chiếu, không file) | thừa (file, không tham chiếu) |
|---|---|---|---|---|
| texture (gif+_a / jpg) | 344 gif + 66 jpg | 231 (182 PNG RGBA + 49 jpg) | 1 (`data/textures/logo`) | 0 |
| sound wav | 25 | 25 | 0 | 0 |
| music xm | 3 | 3 (baked) | 0 | 0 |
| font | 4 | 4 .font + atlas PNG | 0 | 0 |
| ffe | 5 | 0 (không áp dụng web) | 0 | 0 |
| ref khác (scene/object/anim...) | - | - | 4 thật + tiền tố/placeholder | - |

344 gif = 165 gif màu + 179 `_a` (alpha, ghép vào màu). 66 jpg = 49 copy nguyên + 17 có `_a` (xuất PNG). Không có `_a` mồ côi, không có file bị che bởi ưu tiên đuôi.

### Textures
Bảng đầy đủ 231 dòng (key, nguồn, alpha, đầu ra, WxH) trong `tools/texture_report.json`; chỉ mục lookup `public/assets/media-index.json` (`textures`). Mọi texture được tham chiếu đều tồn tại trừ `data/textures/logo` (Loading.scene).

### Sounds (Sounds/*.scene -> wav)
| scene | wav | ChannelType | Loop | MinDistance | trạng thái |
|---|---|---|---|---|---|
| Sounds/bonus.scene | bonus.wav | 3D | true | 2 | ok |
| Sounds/bonus_take.scene | bonus_take.wav | 2D | false | - | ok |
| Sounds/dot.scene | dot.wav | 3D | true | 3 | ok |
| Sounds/factory_explode.scene | factory_explode.wav | 3D | false | 10 | ok |
| Sounds/factory_work.scene | factory_work.wav | 3D | true | 6 | ok |
| Sounds/fire.scene | fire.wav | 3D | true | 3 | ok |
| Sounds/loose.scene | loose.wav | 2D | false | - | ok |
| Sounds/object_explode.scene | object_explode.wav | 3D | false | 6 | ok |
| Sounds/radar_work.scene | radar_work.wav | 3D | true | 4 | ok |
| Sounds/shtab_shield.scene | shtab_shield.wav | 2D | true | - | ok |
| Sounds/steam.scene | steam.wav | 3D | true | 3 | ok |
| Sounds/tank1_engine.scene | none (Node snd rỗng) | - | - | - | không có wav |
| Sounds/tank2_engine.scene | tank2_engine.wav | 3D | true | 2 | ok |
| Sounds/tank3_engine.scene | tank3_engine.wav | 3D | true | 2 | ok |
| Sounds/tank4_engine.scene | tank4_engine.wav | 3D | true | 2 | ok |
| Sounds/tank5_engine.scene | tank5_engine.wav | 3D | true | 2 | ok |
| Sounds/tank6_engine.scene | tank6_engine.wav | 3D | true | 6 | ok |
| Sounds/tank_explode.scene | tank_explode.wav | 3D | false | 10 | ok |
| Sounds/tank_fire_bullet.scene | tank_fire_bullet.wav | 3D | false | 3 | ok |
| Sounds/tank_fire_double.scene | tank_fire_double.wav | 3D | false | 3 | ok |
| Sounds/tank_fire_rocket.scene | tank_fire_rocket.wav | 3D | false | 3 | ok |
| Sounds/tank_landing.scene | tank_landing.wav | 3D | false | 3 | ok |
| Sounds/tank_shield.scene | tank_shield.wav | 2D | true | - | ok |
| Sounds/upgrade.scene | upgrade.wav | 2D | false | - | ok |
| Sounds/win.scene | win.wav | 2D | false | - | ok |
| (không scene) | click.wav | - | - | - | tham chiếu trực tiếp bởi nhiều scene/screen |

### Music
| file | phụ thuộc Samples/ | ghi chú |
|---|---|---|
| Music/energy.xm | có (sample zero hoá, ghi đè bằng samples/<inst>_<sample>.wav, FUN_004a2ef0) | baked, xem tools/xm_bake_report.json |
| Music/menu.xm | có | baked |
| Music/positive.xm | có | baked |
Tổng 29 sample được bake, 20/20 wav trong inno/app/Samples được dùng, 0 wav thừa.

### Fonts
| font | Width x Height | Letter | atlas cùng tên | kích thước khớp |
|---|---|---|---|---|
| bc | 512x512 | 47 | có | có |
| bc_pasw | 512x512 | 73 | không | n/a |
| hiscore_small | 512x256 | 94 | có | có |
| white_border | 256x256 | 15 | có | có |

### ForceEffects
5 .ffe, tất cả được tham chiếu qua EffectName; không chuyển (DirectInput).

### MISSING thật (cần agent scene/object xác nhận)
| tham chiếu | từ | nhận định |
|---|---|---|
| data/textures/logo | Loading.scene Image | không có file; có thể unused/trial |
| data/levels/surv/briefingarena.scene | levels/surv/BriefingArena.screen ModelName | không file |
| data/objects/tank_player_tutorial.object | objects/generator_player.object TemplateName | không file |
| data/objects/explode_anim.anim | objects/template.object AnimationName | template, có thể không tải |
| data/interaface/mainmenu.screen | levels/Tutorial/tutorial.episode GraphNodeName | lỗi chính tả trong dữ liệu gốc |
Không phải thiếu: `%file_name%`/`%file_name_wo_ext%.anim` (placeholder template.object) và tiền tố sinh tên (`interface/emissivebutton_`, `musicbutton_`, `candidate_`, `objects/bonusfast_`, `bonusarmor_`, `bonusshtab_`, `data/interface/`); `data/interface/cursor` và `data/loading` là scene (phân giải qua scene).
