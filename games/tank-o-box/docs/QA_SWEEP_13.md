# QA SWEEP 13 (qa-visual, R4b + tab rieng)

Kiem fix MoveByKey.budget() (FORMATS 'Vong 7b'). Khong sua code. Script: /private/tmp/claude-501/-Users-congpham-Desktop-game-game-web-porter/f98a0da5-ef20-4be4-9b57-4da7d9922d48/scratchpad/qa13/run.py, run2.py (anh *.jpg cung thu muc).
Tab rieng tao nen (Target.createTarget background=True, attach flatten, cdp(..., session_id=)); rAF 35/s o nen; dong cuoi phien.

| # | Muc | Ket qua |
|---|---|---|
| 1 | Spawn khong bam gi 5 s | PASS. 238 frame, x=33, y=41.01, dir 0, p=0.01 khong doi, state NoUpgrade. (QA-12 FAIL da het) |
| 2 | Giu phim roi tha giua o (8 lan, 4 huong, hold 0.18-0.71 s) | PASS. Tha khi p=0.17-0.84, xe truot toi p=0.01 roi dung (cell nguyen), +0.6 s sau khong doi. |
| 3 | Bam phim khac huong spawn | PASS: 0 frame di theo huong cu. Spawn dir 0 (p=0.01), bam right: frame dau (t=1 ms) dir 0 p 0.01, t=9 ms dir 1 p 0.956 (xe quay ngay, di tu o hien tai, khong truot theo huong cu). Dang dung (3b): left tu dir2 p=0.956 doi dir 3 sau 2 ms; up tu dir3 p=0 doi dir 0 sau 5 ms. |
| 4a | Dao chieu giua o, xe nguoi choi (12 lan left/right, 0.12-0.45 s) | PASS gan het: dir doi 1<->3 dung, p lien tuc (0.003-0.94). Max buoc 1 lan = 1.527 o, con lai < 0.3 (run1: max 0.061, 0 buoc >0.3 trong ~40 s). 1.527 o ~ khoang hang rAF ~235 ms (GUESS: nghen frame tab nen/GC, khong phai hanh vi dao chieu; chua dong - can rec chi tiet frame t). |
| 4b | Dich MoveRandom (hanh vi goc, chi ghi nhan) | 4 xe tank_2, 4599 frame (~76 s): buoc >0.3 o: 10/3/2/5 lan; max 0.91/1.05/0.46/1.0 o (dao chieu giua o 2<->0, 1<->3, vd 0.85, 0.88, 1.0). Khong ket. |
| 5 | Hoi quy 4 level | PASS. Farm/Bastion/HQProtection/UrbanAttack: __ready true, __err rong, active 93/134/79/104. animT moi object co len>0 (cay 33/10/24/67) trong [0,len], nbad=0 ca 2 lan do cach 0.3 s. |

Anh: /private/tmp/claude-501/-Users-congpham-Desktop-game-game-web-porter/f98a0da5-ef20-4be4-9b57-4da7d9922d48/scratchpad/qa13/Farm.jpg, Bastion.jpg, HQProtection.jpg, UrbanAttack.jpg (chua doi chieu truc quan voi tham chieu).

## R4b
Lenh CDP: Target.getTargets, Target.createTarget(background), Target.attachToTarget(flatten), Emulation.setFocusEmulationEnabled, Page.navigate, Runtime.evaluate, Input.dispatchKeyEvent, Page.captureScreenshot, Target.closeTarget. Khong bringToFront/activateTarget/switch_tab/new_tab/AppleScript; khong websocket moi. Tab nguoi dung (figma, sheets, trello, gmail, facebook, chat) URL khong doi. Tab 1DAEFA (game, con sot tu lan qa13 truoc dung websocket tho) da dong.
