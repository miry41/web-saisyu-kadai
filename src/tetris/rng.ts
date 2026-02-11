import type { RngState } from "@/tetris/types";

const UINT32_MAX = 2 ** 32;
const DEFAULT_SEED = 0x9e3779b9;

export function createRng(seed = Date.now() >>> 0): RngState {
  return { seed: seed || DEFAULT_SEED };
}

export function nextRngInt(rng: RngState, maxExclusive: number): { value: number; rng: RngState } {
  let seed = rng.seed + 0x6d2b79f5;
  seed = Math.imul(seed ^ (seed >>> 15), seed | 1);
  seed ^= seed + Math.imul(seed ^ (seed >>> 7), seed | 61);
  const nextSeed = seed ^ (seed >>> 14);
  const normalized = (nextSeed >>> 0) / UINT32_MAX;

  return {
    value: Math.floor(normalized * maxExclusive),
    rng: { seed: nextSeed >>> 0 },
  };
}
