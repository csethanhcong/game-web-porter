# GAMEPLAY AUDIT 22 (chi tai lieu, khong sua src)

## 1. HQ (Shtab) du lieu vs port
Nguon: extracted/data/Data/objects/shtab_6x6.object (+ _tutorial giong het), shtab_collision.state, object_collision.state, level_camera.object, bonusshtab_*.anim.

CONFIRMED (khop):
- HP=20; Damage -1/-2/-3 (Default/Double/Rocket) qua object_collision.state; Exploding1 khi HP<16, Exploding2 khi HP<11, Exploding3 khi HP<1 (ChangeStateByCounter [Min,Max)); Exploding->Death theo AnimFinished (Loop=false). Port xu ly chung qua template.js (attrList nhieu TemplateName) + strategies.js.
- Mask 6x6 =1 moi state, Death3 =0 + StrategyGlobalEvent HQExplode -> level_camera ChangeState HQExplode -> AnimFinished -> EpisodeLink GameOver. Port khop (GlobalEvent.send moi process, ChangeState idempotent).
- Dan khong co handler CollisionShtabExploding1/2/3 -> dan xuyen HQ dang no: theo data, giong engine. CollisionShtabLive khong bao gio phat (khong co state Live) = du lieu chet.
- Bonus HQ: 3 StrategyBonus cung tru dt tren BonusArmor => khien HQ ~20/3 s (~6.7 s), phan anh engine 0x4483f0 (khong guard theo property). Chi cai dau co AnimationPath "bonusshtab_"; 2 cai sau thieu file -> load fail giong nhau o port va engine; gia tri ve NoBonus ngay, Damage ve sau anim fade (~1.5 s).
- bonusshtab_passive.anim khong ton tai (cung ly do). MorphWeight shield da ho tro (src/loader/anim.js:93,104).

GUESS:
- Scene khong co node "death3" nhung Death1/Death2.anim target no: engine xu ly target thieu chua kiem; port bo qua kenh. (Dang ky vao GUESS_REGISTER G-GAME-23.)
- Gia tri Time khi nhanh passive cua Bonus (0x4483f0, st0 qua 0x440970) port dat 0 (theo audit 21); chua doc asm.

LECH cap src: khong tim thay LECH CONFIRMED cho HQ. Can QA do thoi gian khien HQ (~6.7 s).

## 2. Phan loai dia chi engine con lai (322 dia chi, 279 chua nhac trong FORMATS)
- Thu vien/khong phai game: std::map/vector template (0x402060, 0x406a10, 0x492270, 0x494370), XML parser liba (0x41f010-0x421c40), input phan cung (0x427280, 0x429cf0, 0x42a280, 0x463570, 0x463b80), unrar/archive (0x42d000-0x43b000, 0x435cd0, 0x43d240, 0x41b550), log 0x41bf70, minidump 0x42cd80, path macro 0x419ec0, Application lib3d (0x468820, 0x4690d0), D3D texture 0x48f0c0 => KHONG CAN PORT.
- Gameplay, da CONFIRMED trong FORMATS nhung thieu trong bang dia chi (getter/vtable/loader): 0x45bbb0 GameObject attr, 0x45af40 ChangeState, 0x464380 AnimFinished, 0x466280/0x466370/0x466c60 handler match, 0x4930f0 mask callback, 0x494100 queue node, 0x4910e0 Generator loader, 0x4906d0/0x4905d0/0x490570 FireByKey, 0x490cd0 MoveBullet ctor, 0x4903f0 MoveRandom loader, 0x48ff00 MoveByKey, 0x495210 MoveBase loader, 0x443540/0x443950/0x443df0 ChangeStateByGlobalCounter/EventByCounter, 0x444aa0/0x444960 Transmit, 0x444e80 GlobalCounter, 0x447510/0x4475d0 TimeCounter => DA PORT.
- CameraFollow: ctor 0x445270, process 0x4455a0 (2709 B, dung 0x4451e0 + ma tran camera 0x47a9e0), loader 0x446070 (TargetType, MinDistance, Advance, Start, Speed, ZoomSpeed). Spec CONFIRMED trong FORMATS, port co class CameraFollow; CHUA doi chieu tung dong => chua xong.
- Bonus ctor 0x4481c0 (new 0x164), anim load 0x45cc10 => DA PORT (audit 21).
- Loader: 0x454030 (AnimationName/NodeName/PropertyName/Min/Max...), 0x4576b0 Level loader, 0x45ad30 GameObject loader, 0x496180 Position ("Direction"), 0x496030 wchar parse => DA PORT (loader chung).
- UI control ctor 0x44a230-0x44fba0, 0x460000-0x462000 loader/ctor man hinh; 0x4546b0-0x4548a0 ControlPlayTime (NO_TRIAL_TIMER, khong port co chu y).
- Audio 0x498620/0x498cd0/0x4992b0/0x499690/0x4a99e4 => da port (WebAudio).

## 3. GUESS gameplay mo
- G-GAME-06 (do dai anim +0xc0): CHUA DONG. Thu hep them: Animation vtbl 0x4f4f48 slot0 0x4106a0 (loader "Commands" ham 0x410640), dtor 0x418730->0x416d10; ctor 0x4184f0 khoi tao 5 block con +8/+0x2c/+0x50/+0x74/+0x98. Khong thay ghi +0xc0 truc tiep ngoai ctor 0x4186f6 + copy 0x44fd80 => do dai nhieu kha nang tinh gian tiep (max key time cua cac track) qua con tro block con. Can doc 0x416f20 ("Keys") + ham vtbl 0x412180/0x423400 de dong.
- Randomize (G-GAME-15): da DONG vong 20 (0x47a420; Rotation bi sync ghi de, chi Scale co hieu luc).
- G-GAME-22a (pose Bonus giu khi anim bi thay): CHUA DONG; can QA hoac doc dtor 0x44fd30 + Visibility mac dinh luc bind 0x411ed0.

## 4. Chua xong
- Doi chieu dong-theo-dong CameraFollow 0x4455a0.
- Dong G-GAME-06 / 22a / asm Time passive.
- QA thoi gian khien HQ.
