import { describe, test, expect } from "bun:test";
import { rollBones, bunHash, mulberry32, fnvHash } from "../src/engine";

// Test UUID — a fabricated value, not a real account
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

  test("rollBones produces correct result for test UUID", () => {
    const bones = rollBones(TEST_UUID, TEST_SALT);
    expect(bones.rarity).toBe("rare");
    expect(bones.species).toBe("mushroom");
    expect(bones.eye).toBe("·");
    expect(bones.hat).toBe("crown");
    expect(bones.stats.DEBUGGING).toBe(18);
    expect(bones.stats.PATIENCE).toBe(41);
    expect(bones.stats.CHAOS).toBe(95);
    expect(bones.stats.WISDOM).toBe(32);
    expect(bones.stats.SNARK).toBe(51);
  });

  test("rollBones is deterministic", () => {
    const a = rollBones(TEST_UUID, TEST_SALT);
    const b = rollBones(TEST_UUID, TEST_SALT);
    expect(a).toEqual(b);
  });

  test("different salt produces different buddy", () => {
    const a = rollBones(TEST_UUID, TEST_SALT);
    const b = rollBones(TEST_UUID, "friend-00001678");
    expect(a).not.toEqual(b);
  });

  test("brute-forced salt produces legendary mushroom", () => {
    const bones = rollBones(TEST_UUID, "friend-00001678");
    expect(bones.rarity).toBe("legendary");
    expect(bones.species).toBe("mushroom");
  });

  test("common buddies always have no hat", () => {
    let found = false;
    for (let i = 0; i < 10000; i++) {
      const bones = rollBones(`hat-test-${i}`, TEST_SALT);
      if (bones.rarity === "common") {
        expect(bones.hat).toBe("none");
        found = true;
      }
    }
    expect(found).toBe(true);
  });
});
