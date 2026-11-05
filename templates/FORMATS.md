# {{GAME}} - reverse engineered formats & behaviour

Source: <binary/source/video, version, hash>. Tools: <decompiler/version>. Dump: <path>. Local, non-commercial use only.
Legend: `CONFIRMED <addr|file|offset>` = có bằng chứng; `GUESS` = chưa xác nhận (phải có dòng trong GUESS_REGISTER.md). `CONFIRMED visually vs <file>` = chỉ đối chiếu ảnh.

## Containers / packaging
- <name>: layout, thuật toán giải (CONFIRMED <addr>), công cụ `tools/unpack.*`.

## File formats (mỗi định dạng một mục)
### .<ext>  <mô tả>  (loader <addr/file:line>)
```
offset  type   field      note
0       u32    ...
```
Size check: <công thức> = <kích thước thật>. Quirks: <v=1-v, endian, 1-based...>. Trạng thái: CONFIRMED / GUESS.

## World / level / content legend
Bảng ký tự/tile/id -> đối tượng, footprint, hướng, hàm factory <addr>. Quy đổi toạ độ: <công thức> (CONFIRMED <addr>).

## Rendering facts  (điền theo rules/10-render-port-checklist.md)
- Handedness/up-axis/forward: ...  - Winding/cull: ...  - UV origin/flip (MỘT điểm lật): ...
- Matrix order: ...  - Euler order: ...  - Projection/camera: ...  - Lighting/ambient/fog/clear: ...
- Blend states per draw type: | draw | src | dst | alpha test | zwrite | cull |

## Timing & loop
Fixed tick: <ms> (CONFIRMED <addr>). Per-tick vs dt-scaled: ...

## Gameplay (một mục/category: hero, enemies/AI, weapons, mechanisms, win/lose...)
- <trigger> -> <điều kiện> -> <hiệu ứng> (<đơn vị>) [CONFIRMED <addr>]

## RNG streams
| stream | seed | bảng | nơi gọi | thứ tự | trạng thái |

## Effects / sprites / audio / UI / input
(đọc theo từng category; ghi công thức, bảng, file)

## DEVIATION: <FLAG_NAME>
Gốc: ... Mới: ... Hàm gốc bị bỏ qua: <addr>. Quay về gốc: set `<FLAG_NAME>=false` trong config.

## Fixes (triệu chứng -> nguyên nhân thật)
- <triệu chứng> -> <nguyên nhân> [CONFIRMED visually vs ...]
