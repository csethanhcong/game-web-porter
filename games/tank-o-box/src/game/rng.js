// RNG: CONFIRMED MSVC-style LCG (FORMATS 'ENGINE: RNG', 0x4d2780/0x4d27c0/0x4d27f0): seed = seed*0x343fd + 0x269ec3; out = (seed>>16)&0x7fff.
// Seed is non-deterministic in the original (GetTickCount), so any seed is correct.
export class Rng {
  constructor(seed = (Math.random() * 0x7fffffff) | 0) { this.s = seed | 0; }
  next() { this.s = (Math.imul(this.s, 0x343fd) + 0x269ec3) | 0; return (this.s >> 16) & 0x7fff; }
  range(a, b) { if (a > b) [a, b] = [b, a]; return (this.next() % (b - a + 1)) + a; } // 0x4d2780
  mod(n) { return this.next() % n; } // 0x4d27c0
  r01() { return this.next() * (1 / 32767); } // 0x4d27f0: (iVar>>16 & 0x7fff) * double[0x505018]; bytes 80 00 40 00 20 00 00 3f = 1/32767 (NOT 1/32768) => range [0,1] inclusive (CONFIRMED)
}
