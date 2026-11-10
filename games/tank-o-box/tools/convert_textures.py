#!/usr/bin/env python3
"""Tank-o-Box texture converter: Data/**/X.gif (+X_a.gif) -> public/assets/data/**/X.png (RGBA); jpg copied.

Algorithm taken from engine.exe (decomp/out/all.c), every step cited:
  FUN_004d5130 (0x4d5130)  Loader ctor: tries NAME + {.bmp,_a.bmp,.ppm,_a.ppm,.jpg,.gif,_a.gif}
  FUN_004d4bc0 (0x4d4bc0)  Loader::is_ready: colour source priority bmp > ppm > jpg > gif;
                           alpha source priority _a.bmp > _a.ppm > _a.gif (NO _a.jpg);
                           colour and alpha must have equal size, else error
                           "decompressor_a and decompressor properties do not match"
  FUN_004d5690 (0x4d5690)  GIF decoder (own LZW, GIF87a/GIF89a, global palette only, no interlace)
  FUN_004d54a0 (0x4d54a0)  palette read: any R/G/B component > 0xFA (250) is forced to 0xFF
  FUN_004d49d0 (0x4d49d0)  alpha merge: dest.A = (alpha image pixel).first byte of its 3-byte BGR
                           copy (FUN_004d4600 copies dword bytes 0..2 = B,G,R) => alpha = BLUE channel
  FUN_004d5ac0 (0x4d5ac0) / FUN_004d5f60 (0x4d5f60)  row fetch reads source row (h-1-n) for output
                           row n  => engine texture row 0 = BOTTOM row of the file (for gif and jpg).
                           PNG output here keeps FILE orientation (top row first); see FORMATS.md.
Usage: python3 tools/convert_textures.py            (run from project root)
Only reads extracted/ ; writes public/assets/data/** and public/assets/media-index.json (textures part).
"""
import io, json, os, shutil, struct, sys
from PIL import Image  # PIL used for PNG/JPEG container only; GIF is decoded by the engine algorithm below

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'extracted', 'data', 'Data')
OUT = os.path.join(ROOT, 'public', 'assets', 'data')


def snap(v):  # FUN_004d54a0: if (0xfa < c) c = 0xff
    return 255 if v > 0xFA else v


def decode_gif(buf):
    """Port of FUN_004d5690. Returns (w, h, rgb bytes top-down in file order, info dict)."""
    if buf[:6] not in (b'GIF87a', b'GIF89a'):
        raise ValueError('not GIF87a/89a')
    w, h = struct.unpack_from('<HH', buf, 6)
    flags = buf[10]
    p = 13
    pal = []
    if flags & 0x80:
        n = 1 << ((flags & 7) + 1)
        for i in range(n):
            pal.append(tuple(snap(c) for c in buf[p:p + 3])); p += 3
    info = {'palette': len(pal), 'interlace': False, 'local_palette': False, 'ext_blocks': 0}
    # FUN_004d5450: skip '!' extension blocks until ','
    while buf[p] != 0x2C:
        if buf[p] != 0x21:
            raise ValueError('unexpected block %#x' % buf[p])
        p += 2
        while buf[p] != 0:
            p += buf[p] + 1
        p += 1
        info['ext_blocks'] += 1
    p += 1                      # past ','
    iflags = buf[p + 8]
    info['interlace'] = bool(iflags & 0x40)
    info['local_palette'] = bool(iflags & 0x80)
    if info['interlace'] or info['local_palette']:
        # engine does not implement these (FUN_004d5690 frees the palette / never de-interlaces)
        raise ValueError('interlaced/local palette (engine unsupported): %r' % info)
    p += 9
    mincode = buf[p]; p += 1
    # gather sub-blocks
    data = bytearray()
    while buf[p] != 0:
        data += buf[p + 1:p + 1 + buf[p]]; p += buf[p] + 1
    # LZW (variable code size, clear=1<<min, end=clear+1) as in FUN_004d5690/FUN_004d5540
    clear = 1 << mincode; end = clear + 1
    size = mincode + 1
    table = [bytes([i]) for i in range(clear)] + [b'', b'']
    out = bytearray(); prev = None; bits = 0; nb = 0; di = 0
    npix = w * h
    while len(out) < npix:
        while nb < size:
            if di >= len(data):
                raise ValueError('LZW data ended early')
            bits |= data[di] << nb; di += 1; nb += 8
        code = bits & ((1 << size) - 1); bits >>= size; nb -= size
        if code == clear:
            table = table[:clear + 2]; size = mincode + 1; prev = None; continue
        if code == end:
            break
        if prev is None:
            entry = table[code]
        else:
            entry = table[code] if code < len(table) else prev + prev[:1]
            table.append(prev + entry[:1])
            if len(table) == (1 << size) and size < 12:
                size += 1
        out += entry; prev = entry
    if len(out) < npix:
        raise ValueError('LZW produced %d of %d pixels' % (len(out), npix))
    rgb = bytearray(npix * 3)
    for i in range(npix):
        c = pal[out[i]] if out[i] < len(pal) else (0, 0, 0)
        rgb[i * 3:i * 3 + 3] = bytes(c)
    return w, h, bytes(rgb), info


def main():
    files = {}   # lowercase relpath -> real relpath
    for dp, _, fns in os.walk(SRC):
        for fn in fns:
            rel = os.path.relpath(os.path.join(dp, fn), SRC).replace(os.sep, '/')
            files[rel.lower()] = rel
    stems = {}   # lowercase stem(no ext) -> {ext: real rel}
    for low, rel in files.items():
        base, ext = os.path.splitext(low)
        if ext in ('.gif', '.jpg', '.bmp', '.ppm'):
            stems.setdefault(base, {})[ext] = rel
    report = {'textures': [], 'errors': [], 'jpg_with_alpha': [], 'orphan_alpha': [], 'shadowed': []}
    index = {}
    for base, exts in sorted(stems.items()):
        if base.endswith('_a') and base[:-2] in stems:
            continue  # consumed as alpha of base[:-2] (loader would append "_a" to NAME)
        colour_ext = next((e for e in ('.bmp', '.ppm', '.jpg', '.gif') if e in exts), None)
        if colour_ext in ('.bmp', '.ppm'):
            report['errors'].append((base, 'bmp/ppm colour source not present in data; skipped')); continue
        if len(exts) > 1:
            report['shadowed'].append((base, sorted(exts)))
        crel = exts[colour_ext]
        alpha = stems.get(base + '_a', {})
        arel = alpha.get('.gif')   # .bmp/.ppm alpha never present in this data set (checked below)
        orel = os.path.join(OUT, os.path.splitext(crel)[0] + ('.png' if (colour_ext == '.gif' or arel) else '.jpg'))
        os.makedirs(os.path.dirname(orel), exist_ok=True)
        try:
            if colour_ext == '.gif':
                cw, ch, rgb, cinfo = decode_gif(open(os.path.join(SRC, crel), 'rb').read())
                img = Image.frombytes('RGB', (cw, ch), rgb)
            else:  # jpg colour
                img = Image.open(os.path.join(SRC, crel)).convert('RGB'); cw, ch = img.size
            amode = None
            if arel:
                aw, ah, argb, ainfo = decode_gif(open(os.path.join(SRC, arel), 'rb').read())
                if (aw, ah) != (cw, ch):
                    raise ValueError('size mismatch colour %dx%d alpha %dx%d (engine: Loader error)' % (cw, ch, aw, ah))
                A = argb[2::3]  # BLUE channel (FUN_004d49d0 + FUN_004d4600)
                gray = (argb[0::3] == argb[1::3] == argb[2::3]) or all(a == b == c for a, b, c in zip(argb[0::3], argb[1::3], argb[2::3]))
                img = img.convert('RGBA'); img.putalpha(Image.frombytes('L', (cw, ch), bytes(A)))
                amode = 'gray' if gray else 'NOT-GRAY'
                if colour_ext == '.jpg': report['jpg_with_alpha'].append(crel)
            if orel.endswith('.png'):
                img.save(orel, 'PNG', optimize=True)
            else:
                shutil.copyfile(os.path.join(SRC, crel), orel)
            key = 'data/' + os.path.splitext(crel)[0].lower()
            rp = os.path.relpath(orel, os.path.join(ROOT, 'public', 'assets')).replace(os.sep, '/')
            index[key] = rp
            report['textures'].append({'key': key, 'src': crel, 'alpha': arel, 'out': rp, 'w': cw, 'h': ch, 'alpha_gray': amode})
        except Exception as e:
            report['errors'].append((crel, str(e)))
    for base, exts in stems.items():
        if base.endswith('_a') and base[:-2] not in stems:
            report['orphan_alpha'].append(base)
    # fonts are loaded as gif by name: handled above (data/fonts/NAME.gif+_a.gif)
    idx_path = os.path.join(ROOT, 'public', 'assets', 'media-index.json')
    cur = json.load(open(idx_path)) if os.path.exists(idx_path) else {}
    cur['textures'] = index
    json.dump(cur, open(idx_path, 'w'), indent=0, sort_keys=True)
    json.dump(report, open(os.path.join(ROOT, 'tools', 'texture_report.json'), 'w'), indent=1)
    n_png = sum(1 for t in report['textures'] if t['out'].endswith('.png'))
    print('textures %d (png %d, jpg copied %d) errors %d orphan_alpha %d shadowed %d jpg_with_alpha %d' % (
        len(report['textures']), n_png, len(report['textures']) - n_png, len(report['errors']),
        len(report['orphan_alpha']), len(report['shadowed']), len(report['jpg_with_alpha'])))
    for e in report['errors']: print('ERR', e)
    return 1 if report['errors'] else 0


if __name__ == '__main__':
    sys.exit(main())
