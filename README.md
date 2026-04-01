# claude-buddy

Encyclopedia & customizer for Claude Code's `/buddy` companion system.

```
  ★★★★★ LEGENDARY         DRAGON
  
    /\_  
   ( °}>~
   /|  |
  (_|  |
  
  Eye: °  Hat: crown
  
  DEBUGGING    ██████░░░░  62
  PATIENCE     ████████░░  80
  CHAOS        ███████░░░  71
  WISDOM       ██████████ 100
  SNARK        █████░░░░░  47
```

## What is /buddy?

`/buddy` is a virtual pet companion built into [Claude Code](https://code.claude.com). When you run `/buddy`, a unique ASCII art creature hatches in your terminal — it sits next to your input box, watches you code, and occasionally comments in a speech bubble.

Your buddy is **deterministically generated** from your account UUID. Same account = same buddy, every device. There are 18 species, 5 rarity tiers, 6 eye styles, 8 hats, and a 1% shiny chance — 7,128 unique combinations total.

## Features

### Wiki — Full buddy encyclopedia

```bash
claude-buddy wiki              # System overview
claude-buddy wiki species      # All 18 species
claude-buddy wiki species dragon  # Specific species details
claude-buddy wiki rarity       # Rarity tiers & probabilities
claude-buddy wiki stats        # Stat system explained
claude-buddy wiki hats         # Hat collection
claude-buddy wiki eyes         # Eye styles
claude-buddy wiki me           # Your destined buddy
```

### Forge — Custom buddy generator

Choose your own species and rarity. The tool brute-forces a matching seed and patches your Claude Code binary.

```bash
# Preview without changing anything
claude-buddy forge --species dragon --rarity legendary --dry-run

# Apply the patch
claude-buddy forge --species dragon --rarity legendary

# Restore your original buddy
claude-buddy restore
```

### Show — Current buddy display

```bash
claude-buddy show              # Shows your current buddy (detects patches)
```

## Install

**Requires [Bun](https://bun.sh)** (ships with Claude Code).

```bash
git clone https://github.com/anthropics/claude-buddy.git
cd claude-buddy
bun run index.ts wiki me
```

Or run directly:

```bash
bunx claude-buddy wiki me
```

## How It Works

Claude Code generates buddy properties through a deterministic pipeline:

```
accountUuid + salt → Bun.hash (wyhash) → Mulberry32 PRNG → properties
```

1. **Hash**: Your UUID is concatenated with a salt (`friend-2026-401`) and hashed with Bun's wyhash
2. **PRNG**: The 32-bit hash seeds a Mulberry32 pseudo-random number generator
3. **Roll**: The PRNG sequentially determines rarity, species, eye, hat, shiny, and stats

The `forge` command finds an alternative salt that produces your desired combination, then patches the salt constant in the Claude Code binary (same length, safe in-place replacement).

## Species

| Species | Emoji | Description |
|---------|-------|-------------|
| duck | 🦆 | A classic rubber duck debugger come to life |
| goose | 🪿 | An unruly goose that honks when your tests fail |
| blob | 🫠 | An amorphous blob of pure vibes |
| cat | 🐱 | Knocks things off your stack |
| dragon | 🐉 | A tiny dragon that breathes fire at bad code |
| octopus | 🐙 | Eight arms for eight open PRs |
| owl | 🦉 | Stays up all night watching your CI pipeline |
| penguin | 🐧 | A formal friend who insists on strict typing |
| turtle | 🐢 | Slow and steady wins the deployment |
| snail | 🐌 | Leaves a slime trail through your git history |
| ghost | 👻 | Haunts your deprecated functions |
| axolotl | 🦎 | Regenerates deleted code from memory |
| capybara | 🦫 | The chillest buddy |
| cactus | 🌵 | Prickly about code style |
| robot | 🤖 | Beeps and boops through your linting errors |
| rabbit | 🐇 | Hops between branches at lightning speed |
| mushroom | 🍄 | Decomposes bad code into nutrient-rich abstractions |
| chonk | 🐱 | An absolute unit. Refuses to move. |

## Rarity

| Tier | Chance | Stars | Base Stats |
|------|--------|-------|------------|
| Common | 60% | ★ | 5 |
| Uncommon | 25% | ★★ | 15 |
| Rare | 10% | ★★★ | 25 |
| Epic | 4% | ★★★★ | 35 |
| Legendary | 1% | ★★★★★ | 50 |

Plus a 1% independent chance of **Shiny** variant (Shiny Legendary = 0.01%).

## Stats

Every buddy has 5 stats with one peak (80-100) and one dump (1-15):

- **DEBUGGING** — Ability to spot bugs
- **PATIENCE** — Tolerance for long builds and flaky tests
- **CHAOS** — Tendency to suggest wild refactors at 2am
- **WISDOM** — Quality of code review commentary
- **SNARK** — Sass level in speech bubble reactions

## Safety

- `forge` creates a backup before patching (`*.buddy-backup`)
- `restore` reverts to the original binary
- Only the 15-byte salt constant is modified — no code changes
- The companion soul (name/personality) in `~/.claude.json` is updated separately

## Technical Details

- Runtime: Bun (required for `Bun.hash()` which uses wyhash, matching Claude Code's runtime)
- Hash: FNV-1a fallback available but not used (Claude Code runs on Bun)
- PRNG: Mulberry32 — fast 32-bit generator, deterministic from seed
- Binary patch: In-place replacement of 15-byte salt constant (3 occurrences)
- Zero dependencies

## Credits

Based on reverse engineering of Claude Code v2.1.88-89. The buddy system was first discovered through the [npm sourcemap leak](https://piunikaweb.com/2026/03/31/anthropic-claude-code-source-leaked-npm-registry/) on March 31, 2026.

Community resources:
- [Claude Buddy Checker](https://claudebuddychecker.netlify.app/) — Web-based buddy preview
- [Claude Code Buddy Gallery](https://claude-buddy.vercel.app/) — All 18 species
- [Buddy animation sprites](https://gist.github.com/zmxv/7f83671f860c15be02f45b07fee207fc)

## License

MIT
