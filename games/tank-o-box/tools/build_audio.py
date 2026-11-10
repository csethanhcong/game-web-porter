#!/usr/bin/env python3
"""Tank-o-Box audio/fonts: copy wav + .font, bake self-contained .xm.

Algorithm from engine.exe (decomp/out/all.c):
  FUN_00497860 (0x497860)  sound loader by NAME: tries NAME.wav (FUN_00497640), then FUN_004992b0, then NAME.xm (FUN_00498cd0)
  FUN_00498cd0 (0x498cd0)  .xm -> module player FUN_0049bcc0, output format 22050 Hz, 2 ch, 16 bit (0x5622,2,0x10)
  FUN_004a2ef0 (0x4a2ef0)  XM sample loader: for each sample builds name "samples/" + <instrument name> + "_" + <sample name>
                           (DAT_004fb760 == '_'); if FUN_00497860 finds that sound (NAME.wav) the XM in-file sample data
                           is IGNORED and PCM16 is read from the wav (length/2 samples taken from the XM header, 16-bit flag
                           forced); else in-file delta-coded data is used. All in-file XM sample data of this game is zero.
This tool replays that override offline: writes public/assets/music/NAME.xm with delta-coded wav PCM injected.
Run from project root.  Sources only read from extracted/.
"""
import json, os, shutil, struct, sys, wave
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, 'extracted', 'data', 'Data')
SAMPLES = os.path.join(ROOT, 'extracted', 'inno', 'app', 'Samples')
PUB = os.path.join(ROOT, 'public', 'assets')

def bake(path, out, samples, log):
    d = bytearray(open(path, 'rb').read())
    hs = struct.unpack_from('<I', d, 60)[0]
    npat, ninst = struct.unpack_from('<HH', d, 70)
    off = 60 + hs
    for _ in range(npat):
        hl, pt, rows, ps = struct.unpack_from('<IBHH', d, off); off += hl + ps
    for _ in range(ninst):
        sz, name = struct.unpack_from('<I22s', d, off)
        ns = struct.unpack_from('<H', d, off + 27)[0]
        iname = name.split(b'\0')[0].decode('latin1')
        if not ns:
            off += sz; continue
        so = off + sz; hdrs = []
        for s in range(ns):
            b = so + s * 40
            hdrs.append((b, struct.unpack_from('<I', d, b)[0], d[b + 14], d[b + 18:b + 40].split(b'\0')[0].decode('latin1').strip()))
        po = so + ns * 40
        for b, ln, typ, sname in hdrs:
            if ln:
                key = (iname + '_' + sname + '.wav').lower()          # FUN_004a2ef0 name pattern
                fn = samples.get(key + '.wav') or samples.get(key) # loader appends ".wav" to NAME
                if not fn: raise SystemExit('no override wav for %r in %s' % (key, path))
                w = wave.open(os.path.join(SAMPLES, fn))
                assert w.getsampwidth() == 2 and w.getnchannels() == 1, fn
                n = ln // 2                                        # *(this)/2 samples
                pcm = struct.unpack('<%dh' % (w.getnframes()), w.readframes(w.getnframes()))
                assert len(pcm) >= n, (fn, len(pcm), n)
                assert typ & 0x10, 'engine forces 16-bit flag; 8-bit XM sample not present in this data'
                prev = 0; blob = bytearray()
                for v in pcm[:n]:
                    blob += struct.pack('<h', ((v - prev + 32768) & 0xFFFF) - 32768); prev = v
                assert all(c == 0 for c in d[po:po + ln]), 'in-file data not zero'
                d[po:po + ln] = blob
                log.append((os.path.basename(path), iname, sname, fn, ln))
            po += ln
        off = po
    open(out, 'wb').write(d)

def main():
    idx = {'sounds': {}, 'music': {}, 'fonts': {}}
    samples = {f.lower(): f for f in os.listdir(SAMPLES)}
    # wav: copy bytes unchanged (PCM16 mono/stereo 22050, WebAudio decodes natively)
    for sub, kind in (('Sounds', 'sounds'), ('fonts', 'fonts')):
        for fn in sorted(os.listdir(os.path.join(D, sub))):
            if fn.lower().endswith(('.wav', '.font')):
                o = os.path.join(PUB, 'data', sub); os.makedirs(o, exist_ok=True)
                shutil.copyfile(os.path.join(D, sub, fn), os.path.join(o, fn))
                idx[kind]['data/' + sub.lower() + '/' + os.path.splitext(fn)[0].lower()] = 'data/%s/%s' % (sub, fn)
    log = []
    o = os.path.join(PUB, 'data', 'Music'); os.makedirs(o, exist_ok=True)
    for fn in sorted(os.listdir(os.path.join(D, 'Music'))):
        if fn.endswith('.xm'):
            bake(os.path.join(D, 'Music', fn), os.path.join(o, fn), samples, log)
            idx['music']['data/music/' + fn[:-3].lower()] = 'data/Music/' + fn
    used = {l[3] for l in log}
    print('xm baked samples:', len(log), 'distinct wav used', len(used), 'of', len(samples), 'unused', sorted(set(samples.values()) - used))
    p = os.path.join(PUB, 'media-index.json')
    cur = json.load(open(p)) if os.path.exists(p) else {}
    cur.update(idx); json.dump(cur, open(p, 'w'), indent=0, sort_keys=True)
    json.dump(log, open(os.path.join(ROOT, 'tools', 'xm_bake_report.json'), 'w'), indent=1)

if __name__ == '__main__': main()
