# QA sweep #6 (qa-visual, 2026-11-06) - UI flow, HUD, GameMenu, GameOver/Win, gameplay con no
Moi truong: vite dev 127.0.0.1:5173 (da tat), Chrome that, 1 tab, 1728x850 dpr2. Phim qua CDP Input; debug hook __ui/__game. Script + anh: `/private/tmp/claude-501/-Users-congpham-Desktop-game-game-web-porter/f98a0da5-ef20-4be4-9b57-4da7d9922d48/scratchpad/qa6/`. Khong co anh goc: chi PASS/FAIL/KHONG-SO-DUOC. Thang/thua dung hook debug (changeState('Explode') tren xe dich) khong phai ban dan that.

| # | muc | ket qua | bang chung |
|---|---|---|---|
| 1 | ?menu=1 MainMenu, chu khong lat, hover/mui ten/Enter/Esc | PASS (hien thi + logic) | menu0.jpg: chu doc xuoi; hover TUTORIAL doi anim high (m_cmp.jpg); mui ten doi focus; Esc o game_select1 (GCMenuBack) -> mainmenu; Esc o MainMenu khong lam gi. Enter khong focus -> kich nut dau (khong co) ; 2 mui ten + Enter -> 2 PLAYER. |
| 1b | G-X08b LEFT x=+22 o ben trai | KHONG-SO-DUOC | Briefing: nhan 'speed:' 'gun:' o trai (brief.jpg), LevelScore: so can phai; khong co anh goc. Cot phai LevelScore khong thang hang (2800/4846/7646/0 ket thuc x khac nhau 1460/1478/1495/1515 tren anh 2000px) - co the do du lieu node, GUESS. |
| 2 | Menu -> game_select1 -> btnNormal(ARCADE) -> Briefing1 -> Farm; Tutorial | PASS | gs.jpg, brief.jpg, farm_hud_1.jpg; tutorial: click TUTORIAL -> DestroyEnemyTanks.screen -> Enter -> terrain_10 (tut_sheet.jpg). err [] |
| 3 | HUD | PASS mot phan | LevelName 'THE FARM' tat o t=5.0s (timeout 4.8 luc 0.16 -> -0.6 luc 5.6). GenerateTank2Total=3 hien duoi icon xe dich thu 4 (farm_hud_1.jpg), cac loai khac 0. Lives=3 so o giua duoi. Score hien goc tren trai (bu5.jpg, 200/275 khi giet). BonusUpgrade bar: Upgrade0..3 visibility dung theo g (0->U0; 3->U0..U3) nhung mat khong phan biet duoc. MissionStatus: 'MISSION COMPLETE' / 'MISSION FAILED' (N2 cu da het). |
| 3b | Thanh HitPoints | FAIL (N6) | hp3.jpg: g.HitPoints=2/1/0 -> bar.shown 1/0.797/0.296 nhung 3 anh crop giong het. ModelMorph: morph.parts=1, maxdiff(base,target)=0 -> morph khong doi vi tri dinh. Huong trai xanh / phai do khong kiem duoc vi khong doi. |
| 4 | Esc mo GameMenu, Return/Esc, btnMenu, btnExit | PASS | Esc: stack GameMenu, world.time dung (4.22 qua 1.5s); Esc lan 2 dong, time chay lai; CONTINUE/OPTIONS/EXIT TO MENU/EXIT TO WINDOWS (gm.jpg); btnMenu -> MainMenu; btnExit -> mode 'exit' (thong bao DOM, khong chup anh). Phim P2 (W/S/D/Tab) khong doi hover/focus. |
| 5a | Thua: -> MissionFailedScore | PASS | bot thua het 3 mang (~86s sim): MissionStatus 'MISSION FAILED' -> MissionFailedScore.screen (after_win.jpg, khong den/treo). HiScoreGame -> MainMenu KHONG chay tiep (chua bam Next). |
| 5b | Thang: LevelScore -> Next -> level ke, Lives mang qua | PASS | Farm: MISSION COMPLETE -> LevelScore (Score 2800, Bonus 4846, Total 7646, Bonus Lives 0; levelscore.jpg) -> Next -> Briefing2 -> Next -> SNOWY ATTACK; Lives=2 giu nguyen (dat tay=2 truoc khi thang). |
| 6 | P2 khong dieu khien menu; ?ui=0; ?level=Farm | PASS | W/S/D/Tab/A/F tren MainMenu khong doi gi. ?ui=0: __ui null, choi duoc, khong HUD (ui0.jpg), Esc van toggle isMenuOpen (hanh vi cu). ?level=Farm: __ui co, HUD co, t chay. |
| G1 | CameraAngle tren browser | PASS (hien thi: khung truot theo xe, farm_hud_late.jpg, hud_play_14.jpg). GAME_CAMERA_ANGLE nay = true. |
| G2 | Phim P1 Ctrl / P2 Tab | PASS | Farm: ControlLeft -> PlayerBullet; Farm2P: Tab ban (pb 1), Ctrl ban (pb 2); W va ArrowUp dieu khien rieng tung xe (y 41->35). Ghi nhan: Space cung sinh PlayerBullet trong 1P (config chi liet ke Ctrl) - khong chac bang chung. |
| G3 | Dao chieu giua o | PASS (so lieu) | rev.json: dz -0.054/khung -> +0.051/khung ngay khung dao, khong dung/giat, nhieu khung <=0.012. Khong xem bang mat. |
| G4 | Ambush / HQProtection toi thang | PASS | Ambush: TankCountEnemy 8 -> 0 (t=13), MISSION COMPLETE; HQProtection 7 -> 0 (t=29.8), MISSION COMPLETE, GenerateTank* ve 0, err []. Anh win_Ambush.jpg, win_HQProtection.jpg. (xe dich bi giet bang changeState('Explode').) |
| G5 | Upgrade3 + ring Landing + thap/nong upgrade_ | KHONG-SO-DUOC | Landing: du trang-do che xe, khong thay vong vang rieng (landsheet.jpg). changeState('Upgrade1') khong doi mesh visible (3 mesh: phong1:emissive,phong1,phong1) - anh NoUpgrade vs Upgrade1 giong het (upsheet.jpg); Upgrade2/3 ep tay dan toi Explode va khung hien shield (khong doi tin). Can pick-up that su de bat Upgrade. |

## Loi/ghi nhan moi (khong sua)
- N6 (trung binh) HitPoints ControlProgressBar: ModelMorph Source vs Source2 co maxdiff vi tri = 0 -> thanh HP khong doi hinh (hp3.jpg). Nghi slice m2.positions.slice(start*9..) trong prepMorph lay sai doan hoac morph khac thuoc tinh khac (UV/mau). Chu: ui/hud.js.
- N7 (thap) Lives o HUD luc thua cuoi: g.Lives=0 va MissionFailedScore Bonus Score 4134 van duoc cong khi thua (GUESS, khong co goc).
- N8 (thap) LevelScore cot so phai khong thang hang (xem 1b).
- N9 (thong tin) Sau MISSION COMPLETE TankCountEnemy lai len 2 trong ~4s truoc khi chuyen man (Farm t=16-19) - xe sinh/hoi? khong anh huong luong.
- Nhac lai tu truoc: Briefing2 chi co btnNext (khong co btnMenu), dung du lieu.

## De xuat task
1. ui-owner: dieu tra N6 (morph HP) - so sanh duoi chi so base/tgt, thu chi so mesh/part.
2. gameplay-logic: kiem upgrade_ turret/barrel qua nhat bonus that (ProbBonusUpgrade) hoac harness bonus; xac nhan Upgrade3 + shield.
3. renderer/decompile: xac nhan Alignment RIGHT cot so LevelScore va G-X08b; ring Landing.
4. QA tiep: HiScoreGame -> MainMenu sau MissionFailed Next; Exit message anh.

Don dep: vite da kill, cong 5173 trong.
