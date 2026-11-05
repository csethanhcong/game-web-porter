#!/bin/bash
# Syntax check mọi .js/.mjs/.cjs trong thư mục (mặc định ./src). ES module .js được copy sang .mjs tạm để node --check hiểu import/export.
# Usage: syntax-check-all.sh [dir ...]     Exit != 0 nếu có lỗi.
DIRS=("$@"); [ ${#DIRS[@]} -eq 0 ] && DIRS=(src)
NODE=$(command -v node || echo /opt/homebrew/bin/node)
[ -x "$NODE" ] || { echo "node không có"; exit 2; }
TMP=$(mktemp -d); fail=0; n=0
while IFS= read -r f; do
  n=$((n+1)); cp "$f" "$TMP/x.mjs"
  if ! out=$("$NODE" --check "$TMP/x.mjs" 2>&1); then echo "FAIL $f"; echo "$out" | head -8; fail=$((fail+1)); fi
done < <(find "${DIRS[@]}" -type f \( -name '*.js' -o -name '*.mjs' \) -not -path '*/node_modules/*' -not -path '*/vendor/*' 2>/dev/null)
rm -rf "$TMP"
echo "checked $n file(s), $fail failed"
[ $fail -eq 0 ]
