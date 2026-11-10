#!/usr/bin/env python3
"""Cross-check media references (scene/screen/anim/object/level/state/episode/font + engine literals) vs files.
References are quoted "data/..." values (engine: names resolved case-insensitively, extension appended by the loader:
FUN_004d5130 textures, FUN_00497860 sounds (.wav/.xm), font = NAME.font (FUN_004d4250), EffectName = NAME.ffe).
Writes tools/asset_audit.json (consumed to write ASSET_AUDIT.md by hand-checked tables). Run from project root."""
import json, os, re, collections
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, 'extracted', 'data', 'Data')
idx = json.load(open(os.path.join(ROOT, 'public/assets/media-index.json')))
TEXT = ('.scene', '.screen', '.anim', '.object', '.level', '.state', '.episode', '.font')
refs = collections.defaultdict(set)   # lowercase ref (with ext stripped for known) -> set(source file:attr)
pat = re.compile(r'(\w+)="(data/[^"]+)"', re.I)
for dp, _, fns in os.walk(D):
    for fn in fns:
        if fn.lower().endswith(TEXT):
            rel = os.path.relpath(os.path.join(dp, fn), D)
            for a, v in pat.findall(open(os.path.join(dp, fn), 'rb').read().decode('latin1')):
                refs[v.lower()].add('%s:%s' % (rel, a))
for lit in ('data/interface/cursor', 'data/loading', 'data/sounds/tank_fire_bullet'):   # engine literals in all.c
    refs[lit].add('engine.exe literal')
files = {}
for dp, _, fns in os.walk(D):
    for fn in fns:
        files['data/' + os.path.relpath(os.path.join(dp, fn), D).replace(os.sep, '/').lower()] = fn
def kind(r):
    base = os.path.splitext(r)[0] if r.rsplit('.', 1)[-1] in ('scene','screen','anim','object','level','state','episode','model','font','ffe','wav','xm') and '/' in r.rsplit('.',1)[-1]==False else r
    if r in files: return 'file'
    if r in idx['textures']: return 'texture'
    if r in idx['sounds']: return 'sound'
    if r in idx['music']: return 'music'
    if r + '.font' in files: return 'font'
    if r + '.ffe' in files: return 'ffe'
    for e in ('.scene', '.model', '.screen', '.anim', '.object', '.level'):
        if r + e in files: return 'other'
    return 'MISSING'
res = collections.defaultdict(list)
for r, s in refs.items(): res[kind(r)].append((r, sorted(s)))
out = {k: v for k, v in res.items()}
used = {r for r in refs}
# per-class unreferenced
unref = {
 'textures': sorted(k for k in idx['textures'] if k not in used),
 'sounds': sorted(k for k in idx['sounds'] if k not in used and not k.startswith('data/fonts')),
 'music': sorted(k for k in idx['music'] if k not in used),
}
# ffe via EffectName ("data/ForceEffects/X")
ffe = sorted(f for f in files if f.endswith('.ffe')); unref['ffe'] = [f for f in ffe if f[:-4] not in used]
fonts = sorted(f for f in files if f.endswith('.font'))
fontchk = []
for f in fonts:
    t = open(os.path.join(D, files[f].join(['', '']) if False else os.path.relpath(os.path.join(D, 'fonts', files[f]), D)), 'rb').read().decode('latin1')
    m = re.search(r'<Font Width="(\d+)" Height="(\d+)" Base="(\d+)" Size="(\d+)"', t)
    tex = json.load(open(os.path.join(ROOT, 'tools/texture_report.json')))['textures']
    tt = [x for x in tex if x['key'] == f[:-5]]
    fontchk.append((f, m.groups() if m else None, (tt[0]['w'], tt[0]['h']) if tt else None, len(re.findall('<Letter ', t)), (f[:-5] in used) or any(r.startswith(f) for r in used)))
out['_unref'] = unref; out['_fonts'] = fontchk
json.dump(out, open(os.path.join(ROOT, 'tools', 'asset_audit.json'), 'w'), indent=1)
print({k: len(v) for k, v in res.items()})
print('unreferenced', {k: len(v) for k, v in unref.items()})
print('MISSING', [m[0] for m in res['MISSING']][:40])
print('other', [m[0] for m in res['other']][:10])
print('fonts', fontchk)
for k, v in unref.items(): print(k, v[:60])
