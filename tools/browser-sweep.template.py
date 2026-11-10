# Mẫu quét hàng loạt - CHỈ agent qa-visual dùng. 1 instance browser, 1 tab.
# Chạy:  browser-use < browser-sweep.template.py     (skill browser-use cung cấp goto_url, js, cdp, capture_screenshot trong stdin)
# Sửa các hằng bên dưới. Hooks giả định: window.__ready (true khi load xong), window.__err (mảng lỗi console). Nếu game của bạn khác, đổi.
import time, os, json
BASE  = "http://127.0.0.1:5173/"
LEVELS = ["level1", "level2"]          # hoặc: js("JSON.stringify(window.__LEVELS)")
URLFMT = BASE + "?level={}"
OUT   = os.environ.get("SWEEP_OUT", "./sweep")   # đặt vào scratch dir
WAIT_MAX = 40                           # giây chờ __ready
SETTLE   = 1.0
os.makedirs(OUT, exist_ok=True)
results = []
# HARD RULE R4b: KHÔNG gọi Page.bringToFront / Target.activateTarget / switch_tab / new_tab (không đưa tab lên trước, user đang dùng Chrome)
cdp("Emulation.setFocusEmulationEnabled", enabled=True)   # giả focus, không đưa cửa sổ lên
for lv in LEVELS:
    goto_url(URLFMT.format(lv))          # dùng lại tab hiện tại, không mở tab mới
    t0 = time.time(); ready = False
    while time.time() - t0 < WAIT_MAX:
        try:
            if js("!!window.__ready"): ready = True; break
        except Exception: pass
        time.sleep(0.5)
    time.sleep(SETTLE)
    try: errs = js("JSON.stringify(window.__err||[])")
    except Exception as e: errs = "ERR:" + str(e)
    png = capture_screenshot(os.path.join(OUT, lv + ".png"))   # trả đường dẫn; đổi sang JPEG ở bước sau nếu cần nhẹ
    # JPEG: dùng cdp("Page.captureScreenshot", format="jpeg", quality=70) và ghi base64 nếu cần; hoặc `sips -s format jpeg x.png --out x.jpg` (macOS)
    results.append({"level": lv, "ready": ready, "console_errors": errs, "shot": png})
    print(json.dumps(results[-1]))
open(os.path.join(OUT, "sweep.json"), "w").write(json.dumps(results, indent=1))
