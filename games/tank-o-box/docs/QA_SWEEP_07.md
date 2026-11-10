# QA sweep #7 (qa-visual, 2026-11-06) - HP bar, hit-test chuot, GameMenu, thua->MainMenu, Upgrade, phim, choi that, Randomize
Moi truong: vite dev 127.0.0.1:5173 (da tat), Chrome that, dung lai 1 tab 127.0.0.1:5173, 1728x850 dpr2. Script + anh: `/private/tmp/claude-501/-Users-congpham-Desktop-game-game-web-porter/f98a0da5-ef20-4be4-9b57-4da7d9922d48/scratchpad/qa7/`. Khong co anh goc: chi PASS/FAIL/KHONG-SO-DUOC. Console __err / __con rong va khong co resource 4xx trong ca phien.

| # | muc | ket qua | bang chung |
|---|---|---|---|
| 1 | Thanh HitPoints (N6) | PASS (hien thi; chieu fill vs goc KHONG-SO-DUOC) | hp_sheet7.jpg: HP 2/1/0 -> thanh xanh ngan dan (shown 1/0.5/0); UV Source2 khi day (U 0.028-0.524), tien ve Source (0.401-0.898 dang chay toi 0.452-0.948) khi HP 0. 2P: hp2p_sheet7.jpg: trai xanh (HitPoints) / phai do (HitPoints2), thu ve phia giua. Luu y: HitPoints=0 lam Player Explode (tank_player_collision), khong phai loi. |
| 2 | Hit-test chuot MainMenu | PASS | m7_cmp.jpg (hover TUTORIAL sang). b1.py do bbox: nua rong 0.349 x nua cao 0.099 NDC (= 0.35/0.1). hover -> cur 'high'; re ra trong (150,400) giu focus Tutorial; nhan+nha tren nut CHUA focus (khong move truoc) khong doi/kich; bien +-4px: trong thi trung, ngoai thi doi/khong (mep tren/duoi Tutorial chong len 1Player/2Player vi hop cao 0.099 > khoang cach nut, dung du lieu); nhan tren nut focus -> 'down' (m7_down.jpg), nha -> DestroyEnemyTanks.screen (m7_after.jpg). |
| 3 | GameMenu | PASS | Esc mo (level dung t=3.16 trong 1s), btnReturn+Enter -> dong, level chay tiep; Esc/Esc dong va t chay; btnMenu -> MainMenu (mode menu, game null; c7_gm.jpg). btnExit -> mode 'exit' + trang den thong bao 'Game exited. Reload the page to play again.' (c7_exit.jpg). Ghi nhan: btnOptions mo controlsingame.screen chong len GameMenu (dung du lieu; Esc dong ve GameMenu). |
| 4 | Thua -> MissionFailedScore -> Next -> HiScoreGame -> MainMenu | PASS | d7_failed.jpg (MISSION FAILED, Score 275, Bonus 4302, Total 4577), d7_step0.jpg (HiScoreGame '1 PLAYER', danh sach 1..10 trong, btnNext->MENU; txtCandidate disabled), d7_step1.jpg -> MainMenu. err []. Luu y: HiScoreGame chua co ten/diem (ControlHiscore chua lam, da biet). |
| 5 | Upgrade qua grantBonus | PASS | Farm: Upgrade1/2/3 (BonusUpgrade 1/2/3, HitPoints 2->2->3->3), mesh thay doi tung cap (tank_01_3x3_0/1/2; e7_sheet.jpg thap/nong khac han tung cap, nong doi o Upgrade2/3), khong Explode. Fast: BonusFast~14s (props), Armor: BonusArmor~17s. Ring: o state Landing hien (lnd7_sheet.jpg: tan trang/hong che xe khi ha canh, ring.visible=true, opacity 1); khong so duoc voi goc. 2P: grantBonus('Upgrade',2) x2 -> P2 Upgrade2 (BonusUpgrade2=2, HP2 1->3); P1 Upgrade1 doc lap; Fast(2)/Armor(1) OK. err []. |
| 6 | Space 1P khong ban | PASS | Hard reload (ignoreCache): Space giu 2s + 2 tap -> 0 PlayerBullet; ControlLeft giu 2s -> 3 vien. |
| 7 | Choi that bang dan | PASS (Farm thang) | h1.py: bot (qa7/bot.js, ControlLeft ban, 3x Upgrade qua grantBonus truoc) thang Farm ~t=38s: TankCountEnemy 4->2->0, MISSION COMPLETE, Score 1550, Bonus 4687, Lives 3, khong chet; h7_levelscore.jpg. N9: sau khi TankCountEnemy=0 KHONG tang lai (timeline 0.5s, h3.py) khi diet bang dan that -> N9 chi xuat hien voi changeState('Explode') (QA6), khong tai hien. |
| 8 | Randomize cay | FAIL mot phan (N10) | 33 cay: scale child khac nhau (0.90-1.10 moi truc) NHUNG: du lieu ScaleMin="0.9 0.8 0.9" ScaleMax="1.1 1.4 1.1" RotationMax="0 3.1415 0" -> y phai 0.8-1.4 (do duoc ymin 0.902, ymax 1.099) va xoay Y phai ngau nhien 0..pi (quaternion child = identity cho ca 33 cay). Nguyen nhan: strategies.js class S.n() dung parseFloat chi lay thanh phan dau cua thuoc tinh vector. |
| 9 | Loi moi khac | N10 + nhan xet | xem duoi. console error/warn: 0; resource 4xx: 0 (250 request). |

## Loi/ghi nhan moi
- N10 (trung binh, src/game/strategies.js Randomize + S.n): ScaleMin/ScaleMax/RotationMin/RotationMax la vector 3 so ("0.9 0.8 0.9"), parseFloat chi lay so dau -> scale moi truc dung chung khoang [0.9,1.1] (y mong doi 0.8-1.4) va rotation = 0 (RotationMax x=0) nen cay khong xoay. Sua: parse 3 thanh phan theo truc.
- N11 (thap, thong tin): GameMenu vua mo: ArrowDown dau tien focus btnOptions (khong phai btnReturn) trong mot lan chay; lan khac focus dung btnReturn khi dung ArrowUp. Co the focus khoi dau chua dong bo (chi so 0 co focus ngam?). Can kiem so voi 0x43de40 (focus khi -1). Khong anh huong chuc nang.
- N6: da het (thanh HP doi theo HP). N9: khong tai hien bang dan that.

## De xuat task
1. gameplay-logic: sua N10 (parse vector Scale/Rotation theo truc) + cap nhat FORMATS Randomize (G-GAME-RAND), sau do QA nhin lai cay.
2. ui-menu-input: xem N11 (focus khoi dau GameMenu/MainMenu).
3. Con lai (GUESS, can goc): chieu fill thanh HP, hinh ring Landing, ControlHiscore (ten/diem HiScoreGame).
Don dep: vite da kill, cong 5173 trong.
