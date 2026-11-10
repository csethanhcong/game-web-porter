# QA sweep #9 (qa-visual, 2026-11-06) - Password, Hiscore, Layout dieu khien, Nhac, Hole, Hoi quy
Moi truong: vite dev 127.0.0.1:5173 (da tat), Chrome that, 1 tab. Script + anh: /private/tmp/claude-501/-Users-congpham-Desktop-game-game-web-porter/f98a0da5-ef20-4be4-9b57-4da7d9922d48/scratchpad/qa9/ (QA9/). Khong co anh goc: chi PASS/FAIL/KHONG-SO-DUOC.

| # | muc | ket qua | bang chung |
|---|---|---|---|
| 1 | Password | PASS | p1.py/p2.py: attack/ATTACK/aTtAcK -> 1 PLAYER LEVEL 6 node 16 (episode1); healer/Healer/hEaLeR -> 2 PLAYER node 16 (episode2); attac / attackk(cat 6) / zzzzzz: dung/label rong, btnNext disabled, Enter khong di tiep (van o Password.screen); Backspace OK; toi da 6 ky tu hieu luc voi maxLen. Loc ky tu theo glyph bc_pasw.font: font co 0-9, A-Z, a-z, . , : \\ ! ? _ space + - ; go ! ? - space _ duoc nhan (DUNG vi font co glyph); e-acute, #, @ bi chan. Con tro '_': t=0 shown rong, '_' o giay le (1,3,...) - sample theo rAF. Luu y: CHECKLIST noi "dau bi chan" - thuc te chi dau khong co Letter rieng bi chan; ! ? - _ khoang trang co Letter nen nhan. |
| 2 | Hiscore | PASS | h1.py: thua -> MissionFailed -> HiScoreGame; '_' o giay le; ky tu ngoai font (e-acute) bi chan, ky tu co glyph (! # @ ~ _ space) nhan (hiscore_small.font co chung); toi da 20; Enter commit -> localStorage tankobox.hiscore...ScoreTableScore {Zed:4612}; reload giu bang (h_reload.jpg, h_commit.jpg). |
| 3 | Layout dieu khien | PASS | l1/l4/l5/l6.py (2P Farm, P1 = x=33, P2 = x=38). Mac dinh: P1 mui ten + Ctrl, P2 WASD + Tab (do vi tri, vien dan). Controls click btnInput1: P1=Layout_2 (P2 van Layout_2) -> ca 2 xe chay bang WASD+Tab, mui ten khong xe nao (hanh vi goc). Ca hai Layout_1 -> ca hai chay mui ten/Ctrl. P1=L2,P2=L1 -> P1 WASD+Tab, P2 mui ten+Ctrl. ControlsInGame mo tu GameMenu btnOptions: doi hoan P1/P2 ngay trong game -> sau dong menu input da doi (ArrowDown/Up di chuyen P2, S/W di chuyen P1). Click btnInput lan luot: L1->L2->L2(P2 click)->L1... chu ky 2 trang thai. |
| 4 | Nhac | PASS | m1.py/m2.py: mo GameMenu -> req 'menu', sau fade ~1s cur='data/music/menu' (sw 2->3); dong -> req 'positive', sau fade ve positive (sw 4). Mo-dong nhanh (giu menu 0.3/0.6/0.9 s): cur luon positive, switches=2, byName positive=1 khong doi (khong restart). LevelScore (khong Music): cur/req van positive, playing true, switches khong doi. |
| 5 | Hole | PASS | r1.py: click 2 lan trong level: content.children 2 -> 3 -> 4 (hole them vao), console sach. Lech (-0.05,-0.15) la dung goc, khong bao loi. Anh r_hole.jpg. |
| 6 | Hoi quy | PASS | r1.py + r2.py: Farm thang (bot + kill) -> LevelScore -> Briefing2 -> level 2; thua -> MissionFailedScore -> HiScoreGame -> MainMenu. __err/__con rong. Resource 4xx: chi /favicon.ico 404 (thap, khong thuoc game). Nhac khi vao Briefing2: positive->menu (sw 3) la theo Music cua Briefing, khong loi. |

## Loi moi
- Khong co loi muc cao/trung. Thap: /favicon.ico 404 (index.html khong khai bao icon) - tuy chon them <link rel="icon" href="data:,">.
- Ghi chu cho checklist: ky tu dau ! ? - _ . , : + space co Letter rieng nen go duoc (khong phai loi). Khong test phim dau khac vi chi dung duoc ky tu ban phim My; e-acute/#/@ bi chan dung.
- Khong lap lai: MISSION COMPLETE label chi xac nhan gian tiep (hud labels co Score/GenerateTank*), chuoi man hinh LevelScore OK.
Don dep: vite da kill, cong 5173 trong; 1 tab 127.0.0.1:5173.
