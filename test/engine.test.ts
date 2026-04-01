import { describe, test, expect } from "bun:test";
import { rollBones, bunHash, mulberry32, fnvHash } from "../src/engine";

// Known-good test case: the user's actual buddy on an unpatched Windows machine
// accountUuid: a1b2c3d4-e5f6-7890-abcd-ef1234567890
// salt: friend-2026-401
// Result: COMMON GOOSE ◉ DBG:67 PAT:17 CHA:32 WIS:40 SNK:3
const TEST_UUID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
const TEST_SALT = "friend-2026-401";

describe("engine", () => {
  test("bunHash produces a 32-bit unsigned integer", () => {
    const h = bunHash("test");
    expect(h).toBeGreaterThanOrEqual(0);
    expect(h).toBeLessThan(2 ** 32);
  });

  test("mulberry32 produces values in [0, 1)", () => {
    const rng = mulberry32(12345);
    for (let i = 0; i < 100; i++) {
      const v = rng();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  test("mulberry32 is deterministic", () => {
    const rng1 = mulberry32(42);
    const rng2 = mulberry32(42);
    for (let i = 0; i < 10; i++) {
      expect(rng1()).toBe(rng2());
    }
  });

  test("rollBones matches known Windows buddy (COMMON GOOSE)", () => {
    const bones = rollBones(TEST_UUID, TEST_SALT);
    expect(bones.rarity).toBe("common");
    expect(bones.species).toBe("goose");
    expect(bones.eye).toBe("◉");
    expect(bones.hat).toBe("none"); // common always gets no hat
    expect(bones.stats.DEBUGGING).toBe(67);
    expect(bones.stats.PATIENCE).toBe(17);
    expect(bones.stats.CHAOS).toBe(32);
    expect(bones.stats.WISDOM).toBe(40);
    expect(bones.stats.SNARK).toBe(3);
  });

  test("rollBones is deterministic", () => {
    const a = rollBones(TEST_UUID, TEST_SALT);
    const b = rollBones(TEST_UUID, TEST_SALT);
    expect(a).toEqual(b);
  });

  test("different salt produces different buddy", () => {
    const a = rollBones(TEST_UUID, TEST_SALT);
    const b = rollBones(TEST_UUID, "friend-00001154");
    expect(a).not.toEqual(b);
  });

  test("legendary mushroom salt is correct (friend-00001154)", () => {
    const bones = rollBones(TEST_UUID, "friend-00001154");
    expect(bones.rarity).toBe("legendary");
    expect(bones.species).toBe("mushroom");
  });
});
