# GAMEPLAY AUDIT 23 (chi tai lieu, khong sua src)

Nguon: decomp/out/all.c + disassembly engine.exe (cac ham vtable khong co trong all.c).

## 0. Dinh chinh dia chi (quan trong)
Cac dia chi 0x445270 / 0x4455a0 / 0x446070 trong audit 22 la StrategyCameraInBox (lop khong dung trong data), KHONG phai CameraFollow. CameraFollow that: ctor 0x405190, loader 0x4551e0, process 0x454ee0 (vtbl 0x4f4424). CameraAngle: ctor 0x446430, process 0x446630.

## 1. CONFIRMED
- CameraFollow (0x454ee0) khop src/game/strategies.js:265-275: T = worldPos(target)+Stick, khong co target -> Start; Speed toan 0 -> snap, nguoc lai clamp tung truc +-Speed[i]*dt; ghi node.position (local). ZoomSpeed khong duoc engine dung. Lech duy nhat: comment strategies.js:265 ghi "process 0x4551e0" (sai; 0x4551e0 la loader, process la 0x454ee0).
- CameraAngle (0x446630) khop strategies.js ~277-303 ve cong thuc; 0x446290 la vec tiep can 3D day du. level_camera.object: 7 state StrategyCameraAngle giong het.
- G-GAME-06 DONG: do dai anim (+0xc0) do ham 0x411380 (thunk 0x416db0, vtbl 0x4f4f34 slot0) tinh = Time lon nhat (key cuoi) cua cac kenh PrimitiveAnimation (+Execute qua 0x4111e0/0x411290/0x423480). AnimFinished dung strict t>len (0x411cd0/0x465fc0). src/loader/anim.js:118-137 (len = max Key/Execute Time) tuong duong vi last==max trong toan bo data; world.js:61 dung t>len. Con ton du: vi tri call site cua loi goi ao tim bang loai suy.
- Bonus nhanh passive (0x4483f0): ghi Time := 0.0 (0x4487a3/0x4487ac). Port dat 0 -> DUNG (G-GAME-23b DONG).
- Kenh anim co target node khong ton tai (vd "death3"): kenh bi bo qua luc evaluate (0x411150); bind state-view 0x465f50 bo qua ket qua bind -> khong loi. Port bo qua kenh -> DUNG (G-GAME-23a DONG). Luu y: 0x45cc10 (Bonus) FAIL load khi thieu target; 0x4694e1 (Application::load_root) throw khi bind fail (chua doi chieu voi data).
- Quet tag/attr/property: chi StrategyForceEffect khong xu ly (STUB co chu y; cung object phat EffectFinished). ProbBonus* (95 dung) duoc dung qua ProbabilityProperty dong (strategies.js:22), khong can literal. SavePointPassword/BonusScore/HiScoreHeader/TotalScore/HitScore la property man hinh (UI doc dong, khong lien quan strategy).

## 2. GUESS (con lai)
- CameraAngle init: engine hasInit theo instance, khoi tao global chi o tick khong co target; port dung 1 co init toan cuc (phu thuoc thu tu tick). Khong anh huong data hien tai.
- Ham so sanh co dau vs abs cho MaxAngleX/Z1/Z2: khong anh huong data.

## 3. Chua xong
- Doi chieu event emit trong src: ExplodeHQ, BonusAirStrike, BonusTimeStop, BonusShtabArmor, PlayerUpgrade/2, CollisionTankAfterBonus, CollisionTankExplode (chi lam muc tag, chua grep emitter day du).
- Call site cua loi goi ao do dai anim; 0x4694e1 vs data; QA thoi gian khien HQ (~6.7 s); G-GAME-22a.

## 4. LECH can sua (src)
- strategies.js:265 comment sai dia chi process (0x4551e0 -> 0x454ee0). Khong lech hanh vi CONFIRMED.
- Tiem an: CameraAngle lastP theo instance / reset global khi instance moi (engine) - port khong; chua gay lech voi data.
