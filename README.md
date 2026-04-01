```
       ___
      (   )
        .--.
       /° ° \      ★★★★★ LEGENDARY MUSHROOM
      (______)     "Truffle"
        |  |       WISDOM 100 · Hat: tophat
```

<h1 align="center">claude-buddy</h1>

<p align="center">
  <b>The Complete Encyclopedia & Customizer for Claude Code's <code>/buddy</code> System</b><br>
  <sub>18 species · 5 rarity tiers · 7,128 unique combinations · binary-level customization</sub>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> ·
  <a href="#-encyclopedia">Encyclopedia</a> ·
  <a href="#%EF%B8%8F-forge--custom-buddy">Forge</a> ·
  <a href="#-how-it-works">How It Works</a> ·
  <a href="./README_CN.md">中文文档</a>
</p>

---

## What is /buddy?

`/buddy` is a virtual pet companion built into [Claude Code](https://code.claude.com) — Anthropic's official coding CLI. Introduced on **April 1, 2026**, it hatches a unique ASCII art creature in your terminal that sits beside your input box, watches you code, and reacts with speech bubbles.

Every buddy is **deterministically generated** from your Anthropic account UUID. Same account, same buddy — on every device, every time.

> **This tool** lets you browse the full buddy encyclopedia and **forge any buddy you want** by patching the generation seed in the Claude Code binary.

## 🚀 Quick Start

**Requires [Bun](https://bun.sh)** (ships with Claude Code).

```bash
git clone https://github.com/Combjellyshen/claude-buddy.git
cd claude-buddy

# See your destined buddy
bun run index.ts wiki me

# Forge a legendary dragon
bun run index.ts forge --species dragon --rarity legendary
```

## 📖 Encyclopedia

### All 18 Species

```bash
bun run index.ts wiki species
```

<table>
<tr><td>

| # | Species | | Description |
|---|---------|---|-------------|
| 1 | **duck** | 🦆 | Classic rubber duck debugger come to life. Quacks at your bugs. |
| 2 | **goose** | 🪿 | Unruly goose that honks when tests fail. Steals semicolons. |
| 3 | **blob** | 🫠 | Amorphous blob of pure vibes. Absorbs stack traces by osmosis. |
| 4 | **cat** | 🐱 | Knocks things off your stack. Sleeps on keyboard at critical moments. |
| 5 | **dragon** | 🐉 | Tiny dragon that breathes fire at poorly formatted code. |
| 6 | **octopus** | 🐙 | Eight arms for eight open PRs. Reviews them all simultaneously. |
| 7 | **owl** | 🦉 | Stays up all night watching your CI pipeline. Judges silently. |
| 8 | **penguin** | 🐧 | Formal little friend who insists on strict typing at all times. |
| 9 | **turtle** | 🐢 | Slow and steady wins the deployment. Never rushes a review. |

</td><td>

| # | Species | | Description |
|---|---------|---|-------------|
| 10 | **snail** | 🐌 | Leaves a slime trail through your git history. Thorough. |
| 11 | **ghost** | 👻 | Spectral presence that haunts your deprecated functions. |
| 12 | **axolotl** | 🦎 | Regenerates deleted code from memory. Smiles while doing it. |
| 13 | **capybara** | 🦫 | Chillest buddy. Sits with you through long rebases. |
| 14 | **cactus** | 🌵 | Prickly about code style. Thrives on neglect and dry humor. |
| 15 | **robot** | 🤖 | Beeps through your linting errors. Dreams of electric sheep. |
| 16 | **rabbit** | 🐇 | Hops between branches at lightning speed. Multiplies tests. |
| 17 | **mushroom** | 🍄 | Decomposes bad code into nutrient-rich abstractions. |
| 18 | **chonk** | 🐱 | An absolute unit. Sits on your code and refuses to move. |

</td></tr>
</table>

### ASCII Art Sprites

Every species has 3-frame idle animations (5 lines tall, ~12 chars wide). Eyes blink every few seconds. Example:

```
  Duck          Cat           Dragon        Ghost         Mushroom      Chonk

   __          /\_/\          /\_           .---.          .--.         /\_/\
 <(· )___     ( · · )       ( ·}>~        | · · |        /· · \       ( · · )
  (  ._>      ( >o< )       /|  |         |     |       (______)      (     )
   `--´         " "         (_|  |          /\/\/\         |  |        (     )
                                                                        " "
```

### Rarity System

```bash
bun run index.ts wiki rarity
```

| Tier | Probability | Stars | Base Stat Floor | Color |
|------|:-----------:|-------|:---------------:|-------|
| **Common** | 60% | ★ | 5 | Gray |
| **Uncommon** | 25% | ★★ | 15 | Green |
| **Rare** | 10% | ★★★ | 25 | Blue |
| **Epic** | 4% | ★★★★ | 35 | Magenta |
| **Legendary** | 1% | ★★★★★ | 50 | Gold |

```
Common     ████████████████████████████████████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  60%
Uncommon   █████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  25%
Rare       ██████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  10%
Epic       ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   4%
Legendary  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   1%
```

**Shiny variant**: Independent 1% chance on any rarity. A Shiny Legendary has a **0.01%** probability — one in ten thousand.

### Stats

```bash
bun run index.ts wiki stats
```

Every buddy has **5 attributes**. Each has one **peak stat** (80–100) and one **dump stat** (1–15). Higher rarity = higher base floor.

| Stat | Meaning |
|------|---------|
| **DEBUGGING** | Ability to spot bugs in your code |
| **PATIENCE** | Tolerance for long build times and flaky tests |
| **CHAOS** | Tendency to suggest wild refactors at 2am |
| **WISDOM** | Quality of code review commentary |
| **SNARK** | Sass level in speech bubble reactions |

Stat formula:
```
peak  = min(100, floor + 50 + random × 30)
dump  = max(1,   floor - 10 + random × 15)
other = floor + random × 40
```

### Cosmetics

#### Eyes (6 styles)

| Eye | Name | Vibe |
|:---:|------|------|
| `·` | Dot | Calm and collected |
| `✦` | Sparkle | Wide-eyed wonder |
| `×` | Crossed | Perpetually dizzy |
| `◉` | Bullseye | Laser focused |
| `@` | At-sign | Always online |
| `°` | Degree | Chill vibes |

#### Hats (8 options)

| Hat | | Note |
|-----|----|------|
| none | | Common buddies always have no hat |
| crown | 👑 | Royalty vibes |
| tophat | 🎩 | Distinguished gentleman |
| propeller | 🧢 | Spins when excited |
| halo | 😇 | Angelic aura |
| wizard | 🧙 | Arcane knowledge |
| beanie | 🧶 | Cozy and warm |
| tinyduck | 🦆 | A tiny duck on top. Meta. |

> Common buddies always get `none`. Uncommon+ randomly roll from all 8 options (including `none`).

### Behavior

- **Idle animation**: 3-frame loop at 500ms with probability-weighted fidgets and blinks
- **Reactions**: Watches your conversation and generates speech bubbles (~10 seconds)
- **Commands**: `/buddy pet` (floating hearts), `/buddy mute` (hide), `/buddy off` (dismiss)
- **Addressing by name**: Say the buddy's name and it responds in its speech bubble
- **Soul**: Name + personality are AI-generated on first hatch, stored in `~/.claude.json`
- **Bones**: Species, rarity, stats, cosmetics are deterministic — re-derived from your UUID every session

### Unique Combinations

```
18 species × 6 eyes × 5 rarities × 8 hats × 2 shiny states = 8,640 visual combos
Each with unique 5-stat distribution → effectively infinite personality variations
```

## ⚒️ Forge — Custom Buddy

```bash
# Preview without changing anything
bun run index.ts forge --species dragon --rarity legendary --dry-run

# Apply the patch
bun run index.ts forge --species dragon --rarity legendary

# Show current buddy (with patch detection)
bun run index.ts show

# Restore original buddy
bun run index.ts restore
```

### What Forge Does

1. **Reads** your account UUID from `~/.claude.json`
2. **Brute-forces** a salt suffix that produces your desired species + rarity (~seconds)
3. **Patches** the 15-byte salt constant in the Claude Code binary (3 occurrences, in-place)
4. **Backs up** the original binary to `*.buddy-backup` before patching

### Options

| Flag | Description |
|------|-------------|
| `--species`, `-s` | Target species — one of: `duck`, `goose`, `blob`, `cat`, `dragon`, `octopus`, `owl`, `penguin`, `turtle`, `snail`, `ghost`, `axolotl`, `capybara`, `cactus`, `robot`, `rabbit`, `mushroom`, `chonk` |
| `--rarity`, `-r` | Target rarity — one of: `common` (60%), `uncommon` (25%), `rare` (10%), `epic` (4%), `legendary` (1%) |
| `--dry-run` | Preview result without patching |
| `--uuid <id>` | Override auto-detected UUID |

### Safety

- Backup created automatically before every patch
- `restore` command reverts to the original binary
- Only the 15-byte salt string is modified — zero code changes
- The companion "soul" (name/personality) in `~/.claude.json` is a separate layer

### Cross-Device Sync

Your accountUuid is the same everywhere. Run `forge` with the same `--species` and `--rarity` on each machine — it will find the same salt because the UUID is identical.

## 🔬 How It Works

### The Generation Pipeline

```
┌─────────────┐     ┌──────────┐     ┌────────────┐     ┌────────────┐
│ accountUuid  │────▶│ + salt   │────▶│ Bun.hash   │────▶│ Mulberry32 │
│ (per user)   │     │ (15 chr) │     │ (wyhash)   │     │   PRNG     │
└─────────────┘     └──────────┘     └────────────┘     └─────┬──────┘
                                                              │
                    ┌─────────────────────────────────────────┘
                    │
                    ▼
         ┌──── rng() ──── rarity    (weighted: 60/25/10/4/1)
         ├──── rng() ──── species   (1 of 18)
         ├──── rng() ──── eye       (1 of 6)
         ├──── rng() ──── hat       ("none" if common, else 1 of 8)
         ├──── rng() ──── shiny     (< 0.01 = true)
         └──── rng() ──── stats     (peak/dump/other per 5 attributes)
```

### Key Functions (from Claude Code source)

```javascript
// Hash: Bun's wyhash truncated to 32 bits
uE4(s) → Number(BigInt(Bun.hash(s)) & 0xffffffffn)

// PRNG: Mulberry32 variant
xE4(seed) → function() {
  a = (a + 0x6d2b79f5) | 0;
  t = Math.imul(a ^ a >>> 15, 1 | a);
  t = (t + Math.imul(t ^ t >>> 7, 61 | t)) ^ t;
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

// Salt constant (what forge patches)
gE4 = "friend-2026-401"   // 15 bytes, appears 3 times in binary
```

### Why Bun.hash Matters

Claude Code runs on the **Bun** runtime. The hash function `uE4()` has two code paths:

```javascript
if (typeof Bun < "u")
  return Number(BigInt(Bun.hash(s)) & 0xffffffffn);  // wyhash — USED AT RUNTIME
else
  return fnvHash(s);  // FNV-1a — fallback, never reached
```

Tools using FNV-1a (like the [Claude Buddy Checker](https://claudebuddychecker.netlify.app/)) produce **different results** than the actual runtime. This tool uses `Bun.hash` and has been verified against real Claude Code output.

### Architecture: Bones vs Soul

| Layer | Contains | Storage | Mutability |
|-------|----------|---------|------------|
| **Bones** | species, rarity, eye, hat, shiny, stats | Re-derived from hash every session | Fixed per UUID+salt |
| **Soul** | name, personality | `~/.claude.json` → `companion` | AI-generated on first hatch, per device |

The "soul" is generated by Claude on first `/buddy` invocation and stored permanently. The "bones" are never persisted — they're recomputed from `hash(uuid + salt)` on every startup. This is why editing `~/.claude.json` can change the name but not the species.

## 📁 Project Structure

```
claude-buddy/
├── index.ts            CLI entry point (wiki / forge / show / restore)
├── src/
│   ├── data.ts         Encyclopedia data (species, sprites, descriptions)
│   ├── engine.ts       Core engine (Bun.hash + Mulberry32 PRNG + brute-force)
│   ├── display.ts      Terminal renderer (colored cards, stat bars)
│   └── patcher.ts      Binary patcher (detect, backup, patch, restore)
├── test/
│   └── engine.test.ts  Verified against real Claude Code output
├── README.md
├── README_CN.md        中文文档
└── package.json
```

## 🌐 Community & Resources

### Origin Story

The buddy system was discovered on **March 31, 2026** when Anthropic accidentally shipped a `.map` sourcemap file in the npm package `@anthropic-ai/claude-code` v2.1.88, exposing the entire 512,000-line TypeScript codebase. The species names were obfuscated via `String.fromCharCode()` arrays to prevent string-searching, but were trivially decoded by the community within hours.

### Community Tools

| Project | Description |
|---------|-------------|
| [Claude Buddy Checker](https://claudebuddychecker.netlify.app/) | Web-based buddy preview (uses FNV-1a, may differ from actual) |
| [Claude Code Buddy Gallery](https://claude-buddy.vercel.app/) | Interactive gallery of all 18 species |
| [Buddy animation sprites](https://gist.github.com/zmxv/7f83671f860c15be02f45b07fee207fc) | Python script generating animated sprite GIF |
| [any-buddy](https://github.com/cpaczek/any-buddy) | Alternative buddy picker |
| [buddy-evolution](https://github.com/RaphaelRUzan/buddy-evolution) | RPG evolution proof-of-concept |

### Media Coverage

- [SmartScope — What Is Claude Code's /buddy?](https://smartscope.blog/en/generative-ai/claude/claude-code-buddy-ai-companion/)
- [Kuber Studio — Claude Code Source Leak Breakdown](https://kuber.studio/blog/AI/Claude-Code's-Entire-Source-Code-Got-Leaked-via-a-Sourcemap-in-npm,-Let's-Talk-About-it)
- [Hacker News — Check Your Claude Code Buddy](https://news.ycombinator.com/item?id=47590913)
- [aired.sh — Hidden & Unreleased Features Report](https://aired.sh/p/Zlm4dmW4ED)

### Discussion

- [Twitter/X — @claudebuddies](https://x.com/claudebuddies/status/2038939821318541751)
- [Twitter/X — @byteHumi breakdown](https://x.com/byteHumi/status/2038992893025861984)
- [Reddit r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/comments/1s8lkkm/)
- [GitHub Issue #41684 — RPG evolution proposal](https://github.com/anthropics/claude-code/issues/41684)

## License

MIT
