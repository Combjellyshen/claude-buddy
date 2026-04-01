import {
  SPECIES,
  EYES,
  HATS,
  STATS,
  RARITY_TIERS,
  RARITY_WEIGHTS,
  STAT_FLOORS,
} from "./data";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BuddyBones {
  rarity: string;
  species: string;
  eye: string;
  hat: string;
  shiny: boolean;
  stats: Record<string, number>;
}

// ---------------------------------------------------------------------------
// Hash functions
// ---------------------------------------------------------------------------

/**
 * FNV-1a hash (32-bit).
 * Fallback for non-Bun environments -- NOT used at runtime in Claude Code.
 */
export function fnvHash(s: string): number {
  let h = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193); // FNV prime
  }
  return h >>> 0;
}

/**
 * Bun wyhash wrapper -- the ACTUAL hash used by Claude Code at runtime.
 * Truncates the 64-bit BigInt result to a 32-bit unsigned integer.
 */
export function bunHash(s: string): number {
  return Number(BigInt(Bun.hash(s)) & 0xffffffffn);
}

// ---------------------------------------------------------------------------
// PRNG
// ---------------------------------------------------------------------------

/**
 * Mulberry32 seeded PRNG.
 * Returns a closure that produces the next float in [0, 1) on each call.
 * MUST match Claude Code's implementation exactly.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Pick a random element from `arr` using the provided RNG. */
export function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

/**
 * Roll a rarity tier from weighted distribution.
 * Weights: common 60, uncommon 25, rare 10, epic 4, legendary 1.
 * Algorithm: draw random * 100, iterate tiers subtracting weight;
 * return the first tier that brings the accumulator below 0.
 */
export function rollRarity(rng: () => number): string {
  const total = Object.values(RARITY_WEIGHTS).reduce((a, b) => a + b, 0);
  let roll = rng() * total;
  for (const tier of RARITY_TIERS) {
    roll -= RARITY_WEIGHTS[tier];
    if (roll < 0) return tier;
  }
  return "common";
}

/**
 * Generate stat block for a buddy.
 *
 * Each buddy has one "peak" stat and one "dump" stat (re-rolled if same as
 * peak). Remaining stats fall in between.
 *
 *   peak  = min(100, floor + 50 + random * 30)
 *   dump  = max(1,   floor - 10 + random * 15)
 *   other = floor + random * 40
 */
export function rollStats(
  rng: () => number,
  rarity: string,
): Record<string, number> {
  const floor = STAT_FLOORS[rarity] ?? STAT_FLOORS.common;
  const stats: Record<string, number> = {};

  // Determine peak & dump indices
  const peakIdx = Math.floor(rng() * STATS.length);
  let dumpIdx = Math.floor(rng() * STATS.length);
  while (dumpIdx === peakIdx) {
    dumpIdx = Math.floor(rng() * STATS.length);
  }

  for (let i = 0; i < STATS.length; i++) {
    const name = STATS[i];
    if (i === peakIdx) {
      stats[name] = Math.min(100, Math.floor(floor + 50 + rng() * 30));
    } else if (i === dumpIdx) {
      stats[name] = Math.max(1, Math.floor(floor - 10 + rng() * 15));
    } else {
      stats[name] = Math.floor(floor + rng() * 40);
    }
  }

  return stats;
}

// ---------------------------------------------------------------------------
// Main generation
// ---------------------------------------------------------------------------

/**
 * Generate the complete "bones" (all visual and gameplay properties) for a
 * buddy from a seed composed of userId + salt.
 *
 * Pipeline: hash -> PRNG -> rarity -> species -> eye -> hat -> shiny -> stats
 */
export function rollBones(userId: string, salt: string): BuddyBones {
  const hash = bunHash(userId + salt);
  const rng = mulberry32(hash);

  const rarity = rollRarity(rng);
  const species = pick(rng, SPECIES);
  const eye = pick(rng, EYES);
  const hat = rarity === "common" ? "none" : pick(rng, HATS);
  const shiny = rng() < 0.01;
  const stats = rollStats(rng, rarity);

  return { rarity, species, eye, hat, shiny, stats };
}

// ---------------------------------------------------------------------------
// Brute-force search
// ---------------------------------------------------------------------------

/**
 * Search for a salt suffix that produces the desired species + rarity for a
 * given userId.
 *
 * Tries suffixes in the pattern "friend-XXXXXXXX" (the suffix portion is
 * zero-padded to keep the full string at 15 characters) sequentially.
 *
 * @returns The matching suffix string, or null if the budget is exhausted.
 */
export function bruteForce(
  userId: string,
  targetSpecies: string,
  targetRarity: string,
  budget: number = 200_000_000,
  onProgress?: (checked: number) => void,
): string | null {
  for (let i = 0; i < budget; i++) {
    const suffix = "friend-" + String(i).padStart(8, "0");
    const bones = rollBones(userId, suffix);
    if (bones.species === targetSpecies && bones.rarity === targetRarity) {
      return suffix;
    }
    if (onProgress && i % 100_000 === 0) onProgress(i);
  }
  return null;
}
