# QA SWEEP 12 (qa-visual, R4b tuan thu)

Kiem MoveBase.process moi (GAME_REVERSE_MIDCELL) + r01/32767. Khong sua code. Script/anh/trace: /private/tmp/claude-501/-Users-congpham-Desktop-game-game-web-porter/f98a0da5-ef20-4be4-9b57-4da7d9922d48/scratchpad/qa12/ (lib.py, t5-t8.py, an.py, rec5-8.json, *.jpg).

| # | Muc | Ket qua |
|---|---|---|
| 1 | Xe nguoi choi dao chieu giua o (Farm) | PASS. 6 lan doi chieu co chu dich + 24 lan dao trai/phai ngau nhien (phase p 0.05-0.95): max buoc hien thi giua frame ke = 0.06-0.10 o, 0 nhay >0.3. dir doi 3->1, 0->2 dung, xe di nguoc dung. Tuong quan trace rec5/rec7.json. |
| 2 | Xe vua spawn bam huong khac | PASS. Vao NoUpgrade, bam right ngay: dir 1 sau ~50 ms, di toi bien x=42; bam left tu do dir 3 dung. |
| 2b | **FAIL (moi)** xe nguoi choi TU CHAY khi khong giu phim | Sau spawn (khong phim nao): (33,41)->(33,31) trong 1.5 s, toi khi trung dan (Explode). Tha phim up: xe van chay tiep (y 27->21). Truoc khi bam phim cung chay. Nguyen nhan nghi (GUESS cao, doc code): MoveByKey.choose tra -1 khi khong phim; strategies.js dong ~136 `let dv = pos.dir` roi `mover(go, dv, b)` (dong ~141) di theo dir hien tai thay vi nd=-1 (mover cu: dir<0 -> khong di). Dong ~135 chi bat nhanh dao chieu. Can doi chieu asm 0x495608: dir var co bi gan nd khi nd<0 khong; ca `standing` state khong duoc vao khi nd=-1. Xe dung im duoc (khi chan tuong) chi do bi chan. |
| 3 | Dich MoveRandom (4 xe tank_2, 16 s) | PASS mot phan. Khong ket (dung yen dai nhat 1.6-2.0 s), khong teleport lon. Luu y: 3/6 lan >=0.3 o la dao chieu giua o trong 1 frame voi buoc 0.60/0.75/0.85 o (dir 2->0, 1->3), so voi buoc thuong 0.10-0.18. Nguyen nhan: nhanh D (TS=1.57) tieu p con lai nhu quang duong. Xe nguoi choi (TS=0) khong bi. GUESS: ban goc co the cung nhay nhu vay; can doi chieu asm 0x4955b7 mover khi p!=0 + tsOv. |
| 4 | Dan | PASS. bullet_enemy_red: 29 vien, Default->Explode->Dead (24), buoc 0.17-0.19 o/frame; bullet_player (ControlLeft): Default->Explode (cham bien y=42,x=20)->Dead. |
| 5 | Hoi quy | PASS. Farm/Bastion/HQProtection/UrbanAttack: __ready true, __err rong, active 91-125 object. Particle: systems 175/219/131/247, particle song 21/854/1064/356 (r01 dung); anh HQProtection.jpg thay tuyet, cay, vet lua dan (CONFIRMED visually). Ghi chu: r01 nay co the =1.0 -> animT toi da = len (khong kiem). |

Anh: /private/tmp/claude-501/-Users-congpham-Desktop-game-game-web-porter/f98a0da5-ef20-4be4-9b57-4da7d9922d48/scratchpad/qa12/HQProtection.jpg, Farm.jpg, Bastion.jpg, UrbanAttack.jpg, farm_play.jpg, idle.jpg.

## R4b
Tab co san la Mattermost (khong phai tab game); dung goto_url dieu huong chinh tab do (R4b cho phep), khong tao/chuyen tab. Lenh CDP: Emulation.setFocusEmulationEnabled, Input.dispatchKeyEvent, Page.captureScreenshot (jpeg), goto_url, Runtime.evaluate (js). Khong bringToFront/activateTarget/switch_tab/new_tab/AppleScript; grep truoc moi script trong.
