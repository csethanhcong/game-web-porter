#!/bin/bash
# Tạo skeleton dự án port từ templates.
# Usage: new-port.sh <game_name> [parent_dir]      -> <parent_dir>/<game_name>_port  (parent mặc định: thư mục hiện tại)
set -eu
NAME=${1:?usage: new-port.sh <game_name> [parent_dir]}
PARENT=${2:-$PWD}
H="$(cd "$(dirname "$0")/.." && pwd)"
D="$PARENT/${NAME}_port"
[ -e "$D" ] && { echo "đã tồn tại: $D"; exit 1; }
mkdir -p "$D"/{original,extracted,src,public/assets,docs,tools,.work}
for f in FORMATS COVERAGE ASSET_AUDIT TASKS GUESS_REGISTER; do sed "s/{{GAME}}/$NAME/g" "$H/templates/$f.md" > "$D/$f.md"; done
cp "$H/templates/AGENT_REPORT.md" "$D/docs/AGENT_REPORT.template.md"
cp "$H/templates/config.js" "$D/src/config.js"
cp "$H/tools/syntax-check-all.sh" "$H/tools/browser-sweep.template.py" "$D/tools/"
cp -R "$H/tools/ghidra" "$D/tools/ghidra"
chmod +x "$D/tools/"*.sh "$D/tools/ghidra/"*.sh
echo "$H" > "$D/HARNESS_PATH"
{ echo "# $NAME - port sang web"; echo; echo "Harness: $H (HARNESS_PATH)"; echo; sed "s/{{GAME}}/$NAME/g; s#{{HARNESS}}#$H#g" "$H/CLAUDE.snippet.md"; } > "$D/CLAUDE.md"
cat > "$D/.gitignore" <<'G'
node_modules/
dist/
.work/
extracted/
original/
G
cat > "$D/package.json" <<P
{
  "name": "$NAME-web",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": { "dev": "vite", "build": "vite build" },
  "devDependencies": { "vite": "5.4.11" }
}
P
cat > "$D/index.html" <<'I'
<!doctype html><meta charset="utf-8"><title>port</title><body style="margin:0;background:#000"><canvas id="c"></canvas><script type="module" src="/src/main.js"></script>
I
cat > "$D/src/main.js" <<'M'
// Entry. Giữ main.js chỉ để nối dây; mỗi category một module (xem TASKS.md "File ownership").
import * as CFG from './config.js';
window.__ready = false; window.__err = [];
addEventListener('error', (e) => window.__err.push(String(e.message)));
// TODO: renderer/loader/logic modules. Chọn công nghệ theo pipeline/00-decision-tree-and-applicability.md
window.__ready = true;
M
echo "Đã tạo: $D"
echo "Bước tiếp: đặt game gốc vào $D/original/, mở Claude Code tại $D, đọc CLAUDE.md."
