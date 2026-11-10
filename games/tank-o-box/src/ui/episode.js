// Episode graph + link resolution + score-screen arithmetic. Pure logic (no THREE/DOM), testable under Node.
// Sources: FORMATS.md "ENGINE: luong man" A (before_link 0x448fd0, set_pending_link 0x43fc80, EpisodeLink 0x454a60), G-X12 (InterfaceScreenMenuScore ctor 0x402940).
import { attr, child, childrenOf } from '../loader/xml.js';

// xml = parsed document (parseXml result). -> {gameOverLink, props, nodes: Map<id,{id,screen,links:{name:id}}>}
export function parseEpisode(xml) {
  const el = xml.children.find((c) => c.tag === 'Episode'); if (!el) throw new Error('not an <Episode>');
  const props = {}; const pe = child(el, 'Properties'); if (pe) for (const p of childrenOf(pe, 'Property')) props[attr(p, 'Name')] = attr(p, 'Value');
  const nodes = new Map();
  for (const n of childrenOf(el, 'EpisodeNode')) {
    const links = {}; const le = child(n, 'Links'); if (le) for (const l of childrenOf(le, 'Link')) links[attr(l, 'Name')] = attr(l, 'GraphNodeName');
    nodes.set(attr(n, 'GraphNodeName'), { id: attr(n, 'GraphNodeName'), screen: attr(n, 'ScreenName'), links });
  }
  return { gameOverLink: attr(el, 'GameOverLink'), props, nodes };
}

// before_link (0x448fd0, CONFIRMED). Returns one of
//  {kind:'restart', screen}  (push current node's screen)  | {kind:'load', path}  | {kind:'node', id, screen} | {kind:'unknown', name} (engine throws "unknown episode")
export function resolveLink(ep, curId, name) {
  const cur = ep && ep.nodes.get(curId);
  if (name === 'Restart') return cur ? { kind: 'restart', screen: cur.screen } : { kind: 'unknown', name };
  if (name === 'GameOver') return ep && ep.gameOverLink ? { kind: 'load', path: ep.gameOverLink } : { kind: 'unknown', name };
  const m = cur ? cur.links[name] : undefined;
  if (m === undefined) return { kind: 'load', path: name }; // name is a .screen path (ControlButton Link=path)
  if (m === 'GameOver') return ep.gameOverLink ? { kind: 'load', path: ep.gameOverLink } : { kind: 'unknown', name };
  const node = ep.nodes.get(m);
  if (!node) return { kind: 'unknown', name: m };
  return { kind: 'node', id: node.id, screen: node.screen };
}

// InterfaceScreenMenuScore ctor 0x402940 (G-X12 CONFIRMED, disasm 402b50-402e79). g = global property bag (mutated). C = ScoreLifeCost (default 500 = 0x1f4), Lives default 0.
export function applyScoreScreen(g) {
  const I = (k, d = 0) => { const v = parseInt(g[k], 10); return Number.isFinite(v) ? v : d; };
  const S = I('Score'), B = I('ScoreBonus'), T0 = I('ScoreTotal0'), C = I('ScoreLifeCost', 500) || 500, L = I('Lives');
  const q = Math.trunc(((T0 % C) + B + S) / C);
  g.Score = 0; g.ScoreBonus = 0; g.ScoreTotal0 = T0 + B + S; g.Lives = L + q;
  g.MenuScore = S; g.MenuScoreBonus = B; g.MenuScoreTotal = T0 + B + S; g.MenuScoreLives = q;
  return g;
}
