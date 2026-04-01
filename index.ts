#!/usr/bin/env bun
/**
 * claude-buddy — Encyclopedia & customizer for Claude Code's /buddy companion system
 *
 * Usage:
 *   claude-buddy wiki [species|rarity|stats|hats|eyes|me]
 *   claude-buddy wiki species <name>
 *   claude-buddy forge --species <name> --rarity <tier>
 *   claude-buddy show
 *   claude-buddy restore
 */

import { SPECIES, RARITY_TIERS, EYES, HATS, STATS, SALT, SPECIES_INFO, SPRITES } from "./src/data";
import { rollBones, bruteForce, type BuddyBones } from "./src/engine";
import {
  renderBuddyCard, renderSpeciesList, renderRarityTable,
  renderStatsInfo, renderHatsInfo, bold, dim, colorize,
  rarityLabel, progressLine,
} from "./src/display";
import { getUserId, findBinaryPath, detectCurrentSalt, patchBinary, updateCompanionSoul, restoreBackup } from "./src/patcher";

const C = { cyan: "\x1b[36m", yellow: "\x1b[33m", red: "\x1b[31m", green: "\x1b[32m", gray: "\x1b[90m", reset: "\x1b[0m" };

function printUsage() {
  console.log(`
${bold("claude-buddy")} — Encyclopedia & customizer for Claude Code's /buddy system

${bold("USAGE")}

  ${colorize("claude-buddy wiki", C.cyan)}                    Overview of the buddy system
  ${colorize("claude-buddy wiki species", C.cyan)}             List all 18 species
  ${colorize("claude-buddy wiki species dragon", C.cyan)}      Details for a specific species
  ${colorize("claude-buddy wiki rarity", C.cyan)}              Rarity tier breakdown
  ${colorize("claude-buddy wiki stats", C.cyan)}               Stats explanation
  ${colorize("claude-buddy wiki hats", C.cyan)}                Hat collection
  ${colorize("claude-buddy wiki eyes", C.cyan)}                Eye styles
  ${colorize("claude-buddy wiki me", C.cyan)}                  Show your destined buddy

  ${colorize("claude-buddy show", C.cyan)}                     Show your current buddy (with active patch)
  ${colorize("claude-buddy forge", C.cyan)} ${dim("--species <s> --rarity <r>")}  Forge a custom buddy
  ${colorize("claude-buddy restore", C.cyan)}                  Restore original buddy

${bold("OPTIONS")}

  --species, -s    Target species (e.g., dragon, mushroom, chonk)
  --rarity, -r     Target rarity (common, uncommon, rare, epic, legendary)
  --dry-run        Preview without patching
  --uuid <id>      Override user UUID (auto-detected from ~/.claude.json)
  --help, -h       Show this help

${bold("EXAMPLES")}

  ${dim("# See what buddy fate assigned you")}
  claude-buddy wiki me

  ${dim("# Forge a legendary dragon")}
  claude-buddy forge --species dragon --rarity legendary

  ${dim("# Preview what you'd get without patching")}
  claude-buddy forge --species mushroom --rarity epic --dry-run

${bold("REQUIRES")}  Bun runtime (ships with Claude Code)
`);
}

function printWikiOverview() {
  console.log(`
${bold("The Claude Code Buddy System")}

  /buddy is a virtual pet companion that lives in your Claude Code terminal.
  Introduced as an April 1st, 2026 feature, it hatches a unique ASCII art
  creature next to your input box that watches you code and occasionally
  comments in a speech bubble.

${bold("How It Works")}

  Your buddy is ${bold("deterministically generated")} from your account UUID.
  The system hashes your ID with a salt through a Mulberry32 PRNG to produce
  a unique combination of species, rarity, stats, and cosmetics.

  Same account = same buddy, every time, on every machine.
  (Unless you use ${bold("claude-buddy forge")} to change your fate.)

${bold("Quick Facts")}

  Species:    ${bold("18")} unique creatures
  Rarities:   ${bold("5")} tiers (Common 60% → Legendary 1%)
  Stats:      ${bold("5")} attributes (DEBUGGING, PATIENCE, CHAOS, WISDOM, SNARK)
  Eyes:       ${bold("6")} styles
  Hats:       ${bold("8")} options (Uncommon+ only)
  Shiny:      ${bold("1%")} independent chance (Shiny Legendary = 0.01%)
  Total:      ${bold("7,128")} unique combinations

${bold("Subcommands")}

  wiki species    All 18 species
  wiki rarity     Rarity breakdown
  wiki stats      Stat details
  wiki hats       Hat collection
  wiki eyes       Eye styles
  wiki me         Your destined buddy
`);
}

function printEyesInfo() {
  console.log(`\n${bold("  Eye Styles")}\n`);
  const descriptions: Record<string, string> = {
    "·": "Dot — calm and collected",
    "✦": "Sparkle — wide-eyed wonder",
    "×": "Crossed — perpetually dizzy",
    "◉": "Bullseye — laser focused",
    "@": "At-sign — always online",
    "°": "Degree — chill vibes",
  };
  for (const e of EYES) {
    console.log(`  ${bold(e)}   ${e.padEnd(2)} ${dim(descriptions[e] ?? "")}`);
  }
  console.log(`\n${dim("  Eyes are randomly assigned from the PRNG seed.")}`);
  console.log(dim("  During animation, eyes blink to a '-' every few seconds."));
}

async function handleWiki(args: string[]) {
  const sub = args[0]?.toLowerCase();

  if (!sub) return printWikiOverview();

  switch (sub) {
    case "species": {
      const specific = args[1]?.toLowerCase();
      if (specific) {
        if (!SPECIES.includes(specific)) {
          console.error(`${C.red}Unknown species: ${specific}${C.reset}`);
          console.log(`Available: ${SPECIES.join(", ")}`);
          return;
        }
        const info = SPECIES_INFO[specific];
        const sprite = SPRITES[specific]?.[0];
        console.log(`\n  ${info?.emoji ?? ""} ${bold(specific.toUpperCase())}\n`);
        if (sprite) {
          for (const line of sprite.split("\n")) {
            console.log(`    ${line}`);
          }
          console.log();
        }
        console.log(`  ${dim(info?.description ?? "")}`);
        console.log();
        // Show sample rolls for this species across rarities
        console.log(`  ${bold("Sample Rolls (random UUIDs):")}\n`);
        for (const rarity of RARITY_TIERS) {
          const found = findSampleForSpecies(specific, rarity);
          if (found) {
            console.log(`  ${rarityLabel(rarity)}  ${dim(`eye:${found.eye} hat:${found.hat}${found.shiny ? " shiny!" : ""}`)}`);
            for (const [s, v] of Object.entries(found.stats)) {
              const bar = "█".repeat(Math.round(v / 10)) + "░".repeat(10 - Math.round(v / 10));
              console.log(`    ${s.padEnd(12)} ${bar} ${v.toString().padStart(3)}`);
            }
            console.log();
          } else {
            console.log(`  ${rarityLabel(rarity)}  ${dim("(sample not found in search budget)")}`);
            console.log();
          }
        }
      } else {
        console.log();
        console.log(renderSpeciesList(SPECIES, SPECIES_INFO));
        console.log();
      }
      break;
    }
    case "rarity":
      console.log();
      console.log(renderRarityTable());
      console.log();
      break;
    case "stats":
      console.log();
      console.log(renderStatsInfo());
      console.log();
      break;
    case "hats":
      console.log();
      console.log(renderHatsInfo());
      console.log();
      break;
    case "eyes":
      printEyesInfo();
      break;
    case "me": {
      const userId = getUserId();
      if (!userId) {
        console.error(`${C.red}Could not find your account UUID.${C.reset}`);
        console.log("Make sure you're logged into Claude Code (~/.claude.json).");
        return;
      }
      console.log(`\n  ${dim("Account UUID:")} ${userId}\n`);

      // Show with original salt (your "destined" buddy)
      const destined = rollBones(userId, SALT);
      const sprite = SPRITES[destined.species]?.[0];
      console.log(bold("  Your Destined Buddy:\n"));
      console.log(renderBuddyCard(destined, undefined, undefined, sprite));
      break;
    }
    default:
      console.error(`Unknown wiki topic: ${sub}`);
      console.log("Available: species, rarity, stats, hats, eyes, me");
  }
}

function findSampleForSpecies(species: string, rarity: string): { stats: Record<string, number>; eye: string; hat: string; shiny: boolean } | null {
  const budget = rarity === "legendary" ? 10_000_000 : rarity === "epic" ? 5_000_000 : 1_000_000;
  for (let i = 0; i < budget; i++) {
    const fakeId = `sample-${i.toString(36)}`;
    const bones = rollBones(fakeId, SALT);
    if (bones.species === species && bones.rarity === rarity) {
      return { stats: bones.stats, eye: bones.eye, hat: bones.hat, shiny: bones.shiny };
    }
  }
  return null;
}

async function handleShow() {
  const userId = getUserId();
  if (!userId) {
    console.error(`${C.red}Could not find your account UUID.${C.reset}`);
    return;
  }

  const binaryPath = findBinaryPath();
  let currentSalt = SALT;

  if (binaryPath) {
    const detected = await detectCurrentSalt(binaryPath);
    if (detected) currentSalt = detected;
  }

  const bones = rollBones(userId, currentSalt);
  const sprite = SPRITES[bones.species]?.[0];
  const config = (await import("./src/patcher")).readClaudeConfig();
  const companion = config?.companion;

  console.log(`\n  ${dim("UUID:")} ${userId}`);
  console.log(`  ${dim("Salt:")} ${currentSalt}${currentSalt !== SALT ? ` ${C.yellow}(patched)${C.reset}` : ""}\n`);
  console.log(renderBuddyCard(
    bones,
    companion?.name,
    companion?.personality,
    sprite,
  ));
}

async function handleForge(args: string[]) {
  // Parse arguments
  let targetSpecies: string | null = null;
  let targetRarity: string | null = null;
  let dryRun = false;
  let customUuid: string | null = null;

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--species" || a === "-s") targetSpecies = args[++i]?.toLowerCase();
    else if (a === "--rarity" || a === "-r") targetRarity = args[++i]?.toLowerCase();
    else if (a === "--dry-run") dryRun = true;
    else if (a === "--uuid") customUuid = args[++i];
  }

  if (!targetSpecies || !targetRarity) {
    console.error(`${C.red}Both --species and --rarity are required.${C.reset}`);
    console.log(`Example: claude-buddy forge --species dragon --rarity legendary`);
    return;
  }

  if (!SPECIES.includes(targetSpecies)) {
    console.error(`${C.red}Unknown species: ${targetSpecies}${C.reset}`);
    console.log(`Available: ${SPECIES.join(", ")}`);
    return;
  }

  if (!RARITY_TIERS.includes(targetRarity)) {
    console.error(`${C.red}Unknown rarity: ${targetRarity}${C.reset}`);
    console.log(`Available: ${RARITY_TIERS.join(", ")}`);
    return;
  }

  const userId = customUuid ?? getUserId();
  if (!userId) {
    console.error(`${C.red}Could not find your account UUID.${C.reset}`);
    console.log("Use --uuid <id> to specify manually.");
    return;
  }

  console.log(`\n  ${bold("Forging your buddy...")}`);
  console.log(`  ${dim("Target:")} ${rarityLabel(targetRarity)} ${bold(targetSpecies.toUpperCase())}`);
  console.log(`  ${dim("UUID:")}   ${userId}\n`);

  // Brute-force search
  const start = Date.now();
  let lastReport = start;
  let checked = 0;

  const newSalt = bruteForce(userId, targetSpecies, targetRarity, 200_000_000, (n) => {
    checked = n;
    const now = Date.now();
    if (now - lastReport > 100) {
      const rate = checked / ((now - start) / 1000);
      process.stdout.write(progressLine(checked, rate));
      lastReport = now;
    }
  });

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  process.stdout.write("\r" + " ".repeat(80) + "\r"); // Clear progress line

  if (!newSalt) {
    console.error(`${C.red}  Could not find a matching salt in ${checked.toLocaleString()} attempts (${elapsed}s).${C.reset}`);
    console.log(dim("  This is extremely unlucky. Try running again."));
    return;
  }

  console.log(`  ${C.green}Found!${C.reset} Salt: ${bold(newSalt)} (${elapsed}s, ${checked.toLocaleString()} attempts)\n`);

  // Show the result
  const bones = rollBones(userId, newSalt);
  const sprite = SPRITES[bones.species]?.[0];
  console.log(renderBuddyCard(bones, undefined, undefined, sprite));

  if (dryRun) {
    console.log(dim("\n  --dry-run: No changes made."));
    console.log(dim(`  To apply: claude-buddy forge --species ${targetSpecies} --rarity ${targetRarity}`));
    return;
  }

  // Apply patch
  const binaryPath = findBinaryPath();
  if (!binaryPath) {
    console.error(`\n${C.red}  Could not find Claude Code binary.${C.reset}`);
    console.log(dim("  Expected at: ~/.local/share/claude/versions/"));
    console.log(dim(`  Manual patch: replace "${SALT}" with "${newSalt}" in the binary.`));
    return;
  }

  const currentSalt = await detectCurrentSalt(binaryPath);
  if (!currentSalt) {
    console.error(`\n${C.red}  Could not detect current salt in binary.${C.reset}`);
    return;
  }

  console.log(`  ${dim("Patching binary...")}`);
  console.log(`  ${dim(`  ${currentSalt} → ${newSalt}`)}`);

  const result = await patchBinary(binaryPath, currentSalt, newSalt);
  if (result.success) {
    console.log(`  ${C.green}${result.message}${C.reset}`);
    if (result.backupPath) {
      console.log(`  ${dim(`Backup: ${result.backupPath}`)}`);
    }
    // Clear old soul so /buddy generates a fresh name/personality for the new species
    const cleared = await updateCompanionSoul("", "", true);
    if (cleared) {
      console.log(`  ${dim("Cleared old companion soul — /buddy will generate a new one.")}`);
    }
  } else {
    console.error(`  ${C.red}${result.message}${C.reset}`);
  }

  console.log(`\n  ${bold("Restart Claude Code and run /buddy to see your new companion!")}`);
}

async function handleRestore() {
  const binaryPath = findBinaryPath();
  if (!binaryPath) {
    console.error(`${C.red}Could not find Claude Code binary.${C.reset}`);
    return;
  }

  const result = await restoreBackup(binaryPath);
  if (result.success) {
    console.log(`${C.green}${result.message}${C.reset}`);
    console.log(dim("Restart Claude Code to restore your original buddy."));
  } else {
    console.error(`${C.red}${result.message}${C.reset}`);
  }
}

// --- Main ---
const args = process.argv.slice(2);
const command = args[0]?.toLowerCase();

if (!command || command === "--help" || command === "-h") {
  printUsage();
} else if (command === "wiki") {
  await handleWiki(args.slice(1));
} else if (command === "show") {
  await handleShow();
} else if (command === "forge") {
  await handleForge(args.slice(1));
} else if (command === "restore") {
  await handleRestore();
} else {
  console.error(`Unknown command: ${command}`);
  printUsage();
}
