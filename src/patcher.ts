/**
 * Binary patcher for Claude Code buddy system.
 * Replaces the salt constant in the compiled binary to change
 * the deterministic buddy generation for a specific user.
 */

import { readFile, writeFile, copyFile, rename, stat } from "fs/promises";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { homedir } from "os";

const ORIGINAL_SALT = "friend-2026-401";
const SALT_LENGTH = ORIGINAL_SALT.length; // 15 bytes

export interface PatchResult {
  success: boolean;
  message: string;
  backupPath?: string;
  occurrences?: number;
}

/** Find the Claude Code binary path */
export function findBinaryPath(): string | null {
  const base = join(homedir(), ".local", "share", "claude", "versions");
  if (!existsSync(base)) return null;

  // Find the latest version directory or binary
  const candidates = [
    // Direct version binary (Linux)
    ...(() => {
      try {
        const entries = require("fs").readdirSync(base);
        return entries
          .filter((e: string) => /^\d+\.\d+\.\d+$/.test(e) && !e.endsWith(".bak"))
          .sort()
          .reverse()
          .map((e: string) => join(base, e));
      } catch { return []; }
    })(),
  ];

  for (const p of candidates) {
    try {
      const s = require("fs").statSync(p);
      if (s.isFile() && s.size > 1_000_000) return p;
    } catch { continue; }
  }
  return null;
}

/** Read the companion data from ~/.claude.json */
export function readClaudeConfig(): Record<string, any> | null {
  const configPath = join(homedir(), ".claude.json");
  if (!existsSync(configPath)) return null;
  try {
    return JSON.parse(require("fs").readFileSync(configPath, "utf-8"));
  } catch { return null; }
}

/** Get the user's account UUID from config */
export function getUserId(): string | null {
  const config = readClaudeConfig();
  if (!config) return null;
  return config.oauthAccount?.accountUuid ?? config.userID ?? null;
}

/** Get the current salt from the binary (detect if already patched) */
export async function detectCurrentSalt(binaryPath: string): Promise<string | null> {
  const data = await readFile(binaryPath);

  // Check for original salt
  if (data.includes(Buffer.from(ORIGINAL_SALT))) {
    return ORIGINAL_SALT;
  }

  // Check for any "friend-" prefixed salt of correct length
  const friendPrefix = Buffer.from("friend-");
  let pos = 0;
  while (true) {
    pos = data.indexOf(friendPrefix, pos);
    if (pos === -1) break;
    const candidate = data.subarray(pos, pos + SALT_LENGTH).toString();
    if (candidate.length === SALT_LENGTH) return candidate;
    pos++;
  }

  return null;
}

/** Patch the binary to use a new salt */
export async function patchBinary(
  binaryPath: string,
  currentSalt: string,
  newSalt: string
): Promise<PatchResult> {
  if (newSalt.length !== SALT_LENGTH) {
    return { success: false, message: `Salt must be exactly ${SALT_LENGTH} characters, got ${newSalt.length}` };
  }

  const backupPath = binaryPath + ".buddy-backup";

  try {
    // Read binary
    const data = await readFile(binaryPath);
    const oldBuf = Buffer.from(currentSalt);
    const newBuf = Buffer.from(newSalt);

    // Count occurrences
    let count = 0;
    let pos = 0;
    while (true) {
      pos = data.indexOf(oldBuf, pos);
      if (pos === -1) break;
      count++;
      pos++;
    }

    if (count === 0) {
      return { success: false, message: `Salt "${currentSalt}" not found in binary` };
    }

    // Create backup
    if (!existsSync(backupPath)) {
      await copyFile(binaryPath, backupPath);
    }

    // Patch: write to temp file then atomic rename
    const patched = Buffer.from(data);
    pos = 0;
    while (true) {
      pos = patched.indexOf(oldBuf, pos);
      if (pos === -1) break;
      newBuf.copy(patched, pos);
      pos += newBuf.length;
    }

    const tmpPath = binaryPath + ".buddy-tmp";
    await writeFile(tmpPath, patched);

    // Preserve permissions
    const origStat = await stat(binaryPath);
    require("fs").chmodSync(tmpPath, origStat.mode);

    // Atomic rename
    try {
      await rename(tmpPath, binaryPath);
    } catch {
      // If rename fails (text file busy), write alongside and instruct user
      const altPath = binaryPath + ".buddy-patched";
      await rename(tmpPath, altPath);
      return {
        success: true,
        message: `Binary is in use. Patched copy saved to:\n  ${altPath}\nRestart Claude Code, then:\n  mv "${altPath}" "${binaryPath}"`,
        backupPath,
        occurrences: count,
      };
    }

    return {
      success: true,
      message: `Patched ${count} occurrence(s) in binary`,
      backupPath,
      occurrences: count,
    };
  } catch (e: any) {
    return { success: false, message: `Patch failed: ${e.message}` };
  }
}

/** Update companion soul (name/personality) in ~/.claude.json */
export async function updateCompanionSoul(
  name: string,
  personality: string
): Promise<boolean> {
  const configPath = join(homedir(), ".claude.json");
  try {
    const config = JSON.parse(await Bun.file(configPath).text());
    config.companion = {
      name,
      personality,
      hatchedAt: Date.now(),
    };
    await writeFile(configPath, JSON.stringify(config, null, 2));
    return true;
  } catch {
    return false;
  }
}

/** Restore from backup */
export async function restoreBackup(binaryPath: string): Promise<PatchResult> {
  const backupPath = binaryPath + ".buddy-backup";
  if (!existsSync(backupPath)) {
    return { success: false, message: "No backup found" };
  }
  try {
    await copyFile(backupPath, binaryPath + ".restore-tmp");
    const origStat = await stat(binaryPath);
    require("fs").chmodSync(binaryPath + ".restore-tmp", origStat.mode);
    await rename(binaryPath + ".restore-tmp", binaryPath);
    return { success: true, message: "Restored from backup" };
  } catch (e: any) {
    return { success: false, message: `Restore failed: ${e.message}` };
  }
}
