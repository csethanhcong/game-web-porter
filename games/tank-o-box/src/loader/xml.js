// Tolerant parser for the engine's pseudo-XML (FORMATS.md "XML: quy ước chung").
// Handles: <?...?> headers, <!-- --> and <!...!> comments, pseudo-tags <#Shaders#>, tag names with :: and [ , ],
// repeated attributes (-> array), spaces around '=', CRLF. Text content is ignored (data lives in attributes).
// Node shape: { tag, attrs: {name: string | string[]}, children: Node[] }

export function parseXml(src) {
  src = src.replace(/<!--[\s\S]*?-->/g, '').replace(/<!(?!-)[\s\S]*?!>/g, '').replace(/<\?[\s\S]*?\?>/g, '');
  const root = { tag: '#root', attrs: {}, children: [] };
  const stack = [root];
  const tagRe = /<(\/?)([^\s>\/][^\s>\/]*)((?:[^>"]|"[^"]*")*?)(\/?)>/g;
  let m;
  while ((m = tagRe.exec(src))) {
    const [, closing, name, rest, selfClose] = m;
    if (closing) {
      // pop to matching open tag (tolerant to mismatches)
      for (let i = stack.length - 1; i > 0; i--) if (stack[i].tag === name) { stack.length = i; break; }
      continue;
    }
    const node = { tag: name, attrs: parseAttrs(rest), children: [] };
    stack[stack.length - 1].children.push(node);
    if (!selfClose) stack.push(node);
  }
  return root;
}

function parseAttrs(s) {
  const attrs = {};
  const re = /([^\s=]+)\s*=\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(s))) {
    const k = m[1], v = m[2];
    if (k in attrs) { if (Array.isArray(attrs[k])) attrs[k].push(v); else attrs[k] = [attrs[k], v]; } else attrs[k] = v;
  }
  return attrs;
}

export const attrList = (n, k) => (n.attrs[k] === undefined ? [] : Array.isArray(n.attrs[k]) ? n.attrs[k] : [n.attrs[k]]);
export const attr = (n, k, d) => (n.attrs[k] === undefined ? d : Array.isArray(n.attrs[k]) ? n.attrs[k][n.attrs[k].length - 1] : n.attrs[k]);
export const num = (n, k, d) => { const v = attr(n, k); if (v === undefined) return d; const f = parseFloat(v); return Number.isFinite(f) ? f : d; };
export const vec = (n, k, d) => { const v = attr(n, k); if (v === undefined) return d; const a = v.trim().split(/\s+/).map(Number); return a.length >= 3 && a.every(Number.isFinite) ? a : d; };
export const child = (n, tag) => n.children.find((c) => c.tag === tag);
export const childrenOf = (n, tag) => n.children.filter((c) => c.tag === tag);
export function find(n, tag, out = []) { if (n.tag === tag) out.push(n); for (const c of n.children) find(c, tag, out); return out; }
