#!/bin/bash
# Ghidra headless wrapper (ví dụ decompiler; thay bằng công cụ của loại nguồn khác - xem pipeline/00-decision-tree).
# Tổng quát hoá từ wrapper đã dùng ở một port thực tế; xem examples/dino/environment.md.
# Usage:
#   run-headless.sh import  <workdir> <binary>                      # import + (tuỳ chọn) analyze một lần
#   run-headless.sh all     <workdir> <binary-name>                 # decompile TẤT CẢ -> <workdir>/out/{funcs.tsv,all.c}
#   run-headless.sh dec     <workdir> <binary-name> <out> <addr...> # decompile vài hàm (addr hex; "asm:ADDR" lấy assembly)
#   run-headless.sh scan    <workdir> <binary-name>                 # tìm hàm bị bỏ sót (E8 call target + prologue 55 8B EC, x86-32) -> out/funcs_scan.tsv
#   run-headless.sh xr      <workdir> <binary-name> <out> <args>    # xref (xem Xr.java)
# Env: GHIDRA_HEADLESS (mặc định Homebrew), PROJECT (mặc định "proj"), PROJNAME (mặc định "game").
set -u
H=${GHIDRA_HEADLESS:-/opt/homebrew/opt/ghidra/libexec/support/analyzeHeadless}
SCRDIR="$(cd "$(dirname "$0")" && pwd)"
mode=${1:?mode}; W=${2:?workdir}; shift 2
PROJ=${PROJECT:-proj}; PN=${PROJNAME:-game}
mkdir -p "$W/$PROJ" "$W/out"

# Tổng quát hoá từ wrapper đã dùng ở một port thực tế; xem examples/dino/environment.md.
retry() { local log; for i in $(seq 1 ${RETRIES:-30}); do log=$("$@" 2>&1); echo "$log" | grep -q LockException || break; sleep 10; done; echo "$log" | grep -E "ERROR|Exception" | head; }

case $mode in
  import) B=${1:?binary}; "$H" "$W/$PROJ" "$PN" -import "$B" ;;
  all)    N=${1:?binary-name}; retry "$H" "$W/$PROJ" "$PN" -process "$N" -noanalysis -scriptPath "$SCRDIR" -postScript All.java "$W/out/funcs.tsv" "$W/out/all.c"; echo done > "$W/out/done.txt" ;;
  dec)    N=${1:?}; O=${2:?}; shift 2; retry "$H" "$W/$PROJ" "$PN" -process "$N" -noanalysis -scriptPath "$SCRDIR" -postScript Dec.java "$O" "$@" ;;
  scan)   N=${1:?}; retry "$H" "$W/$PROJ" "$PN" -process "$N" -noanalysis -scriptPath "$SCRDIR" -postScript Scan.java "$W/out/funcs_scan.tsv" ;;
  xr)     N=${1:?}; O=${2:?}; shift 2; retry "$H" "$W/$PROJ" "$PN" -process "$N" -noanalysis -scriptPath "$SCRDIR" -postScript Xr.java "$O" "$@" ;;
  *) echo "mode?"; exit 2 ;;
esac
