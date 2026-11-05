# Phase 8 - Effects, sprites, shadows, lighting

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-08-effects-sprites-shadows-lighting.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: nổ, khói, lửa, hạt, billboard, bóng đổ, nước, ánh sáng đúng như gốc.

**Entry**: Phase 4 có renderer; Phase 7 sinh sự kiện (nổ, trúng đạn).

**Việc làm** (agent: effects-render)
1. **Sprite queue**: tìm enqueue/flush/quad (Dino FUN_0042e290 / 0042e620 / 0042dcb0): atlas (exploanim.tga 512x512, 8x8), blend theo type, zwrite, có alpha test không, sort, cull frustum (RNG vẫn tiêu thụ dù bị cull). Triển khai độc lập với số lượt render (anti-pattern #4).
2. **Bóng đổ**: render target nhỏ (Dino 128x128 "single_shadow"/"managed_shadow"), chiếu xuống nền, blend ZERO/INVSRCCOLOR. Lightmap động `shadow.js`. Test blend riêng (anti-pattern #6).
3. **Nước**: frame theo thời gian (floor(t/65)%22 qua water01..22.jpg), quad alpha, mesh sóng, UV scroll, edge fade, đáy, lily pads.
4. **Ánh sáng**: directional từ dữ liệu level; ambient; đèn động (GUESS ánh xạ cường độ ở Dino).
5. **Hiệu ứng hero**: tàng hình (alpha 1-0.7a), mũ, fade xác.
6. **Hiệu ứng môi trường**: lá cây (sprite theo bound), tia lửa khoá.
7. Với mỗi hiệu ứng, ghi blend state (rules/10 mục C).

**Exit**: các hiệu ứng khớp ảnh gốc ở QA; không biến mất khi shadow pass; mỗi blend có nguồn.

**Bẫy**: multi-render sprite queue; ground đen sau shadow; premultiply vs multiply; alpha test bật nhầm cho sprite.
