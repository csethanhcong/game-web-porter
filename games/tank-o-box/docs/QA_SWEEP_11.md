# QA SWEEP 11 (qa-visual, R4b tuan thu)

Script/anh: /private/tmp/claude-501/-Users-congpham-Desktop-game-game-web-porter/f98a0da5-ef20-4be4-9b57-4da7d9922d48/scratchpad/qa11b/ (lib.py, trees.py, rest.py, aud.py, aud2.py, fin.py; tree_a.jpg, tree_b.jpg). Khong sua code.

| # | Muc | Ket qua |
|---|---|---|
| 1 | Cay (HQProtection) animT | PASS. 24 object state randomStart=true (tree_02_2x2.object, len 2, loop true). 7 mau trong ~15 s (cach 2.5 s): animT luon trong [0,2), 23-24 gia tri khac nhau/mau, 24/24 cay doi gia tri giua mau 5 va 6 (dao dong lien tuc, khong dung yen sau 2 s). Luu y: 1 cap cay co animT trung nhau (vd 0.576/0.576) - co the do Rng cung seed (thap). Anh tree_a.jpg / tree_b.jpg: cum cay trai va giua nghieng khac nhau giua 2 anh (doi chieu truc tiep). |
| 2 | Audio gain | PASS. Can 1 cu chi (click) de ctx running (truoc do ctx none, music playing=false: do chinh sach autoplay, binh thuong). Sau do level1 flag1 gain1 nodeGain1. toggleMusicFlag -> flag0 gain0 nodeGain0 (= sqrt(1*0)); toggle lai -> 1/1/1. setMusicFlag(0.25/0.5) khong doi flag (van 1) nen khong kiem duoc gia tri trung gian; level luon 1 (khong bat duoc luc fade). |
| 3a | AnimFinished | PASS. 12 su kien trong 12 s, toi da 1 lan/(object,stoken), 0 su kien tu state loop=true. |
| 3b | Farm / Bastion | PASS. ready, __err rong, 92 / 128 object active. Han che: __err chi bat error/unhandledrejection, khong bat console.error. |

## R4b
Lenh CDP: Emulation.setFocusEmulationEnabled, Page.captureScreenshot (jpeg), Input.dispatchKeyEvent, Input.dispatchMouseEvent (click_at_xy), goto_url, Runtime.evaluate (js). Khong bringToFront/activateTarget/switch_tab/new_tab/AppleScript; grep truoc moi script trong. Dung tab co san (tab UrbanAttack), khong tao tab.
