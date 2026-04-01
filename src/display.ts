/**
 * Terminal display utilities for buddy information.
 * Handles colored output, stat bars, buddy cards, etc.
 */

const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  // Colors
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
  // Bright
  brightRed: "\x1b[91m",
  brightGreen: "\x1b[92m",
  brightYellow: "\x1b[93m",
  brightBlue: "\x1b[94m",
  brightMagenta: "\x1b[95m",
  brightCyan: "\x1b[96m",
};

const RARITY_COLOR: Record<string, string> = {
  common: C.gray,
  uncommon: C.green,
  rare: C.blue,
  epic: C.magenta,
  legendary: C.yellow,
};

const RARITY_STARS: Record<string, string> = {
  common: "★",
  uncommon: "★★",
  rare: "★★★",
  epic: "★★★★",
  legendary: "★★★★★",
};

export function colorize(text: string, color: string): string {
  return `${color}${text}${C.reset}`;
}

export function bold(text: string): string {
  return `${C.bold}${text}${C.reset}`;
}

export function dim(text: string): string {
  return `${C.dim}${text}${C.reset}`;
}

export function rarityColor(rarity: string): string {
  return RARITY_COLOR[rarity] ?? C.white;
}

/** Render a stat bar: ████████░░░░░░░░ 67 */
export function statBar(value: number, width: number = 10): string {
  const filled = Math.round((value / 100) * width);
  const empty = width - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);
  return `${bar} ${value.toString().padStart(3)}`;
}

/** Render a colored rarity label */
export function rarityLabel(rarity: string): string {
  const color = rarityColor(rarity);
  const stars = RARITY_STARS[rarity] ?? "";
  return colorize(`${stars} ${rarity.toUpperCase()}`, color);
}

/** Render a full buddy card */
export function renderBuddyCard(
  bones: {
    rarity: string;
    species: string;
    eye: string;
    hat: string;
    shiny: boolean;
    stats: Record<string, number>;
  },
  name?: string,
  personality?: string,
  sprite?: string
): string {
  const lines: string[] = [];
  const color = rarityColor(bones.rarity);
  const width = 44;

  const hLine = colorize("─".repeat(width), color);
  const top = colorize("╭", color) + hLine + colorize("╮", color);
  const bot = colorize("╰", color) + hLine + colorize("╯", color);
  const side = (content: string) => {
    // Strip ANSI for length calculation
    const stripped = content.replace(/\x1b\[[0-9;]*m/g, "");
    const pad = Math.max(0, width - stripped.length);
    return colorize("│", color) + " " + content + " ".repeat(pad) + " " + colorize("│", color);
  };

  lines.push(top);
  lines.push(side(
    rarityLabel(bones.rarity) +
    "  " + bold(bones.species.toUpperCase()) +
    (bones.shiny ? colorize(" ✨SHINY", C.brightYellow) : "")
  ));
  lines.push(side(""));

  // Sprite
  if (sprite) {
    const spriteLines = sprite.replace(/·|✦|×|◉|@|°/g, bones.eye).split("\n");
    for (const sl of spriteLines) {
      lines.push(side("    " + sl));
    }
  }

  lines.push(side(""));

  // Name
  if (name) {
    lines.push(side(bold(name)));
  }

  // Hat & eye
  lines.push(side(
    dim("Eye: ") + bones.eye + "  " +
    dim("Hat: ") + (bones.hat === "none" ? dim("none") : bones.hat)
  ));
  lines.push(side(""));

  // Personality
  if (personality) {
    // Word-wrap personality to fit card width
    const maxW = width - 2;
    const words = personality.split(" ");
    let line = "";
    for (const w of words) {
      if (line.length + w.length + 1 > maxW) {
        lines.push(side(dim(line)));
        line = w;
      } else {
        line = line ? line + " " + w : w;
      }
    }
    if (line) lines.push(side(dim(line)));
    lines.push(side(""));
  }

  // Stats
  for (const [stat, value] of Object.entries(bones.stats)) {
    const isPeak = value >= 80;
    const isDump = value <= 10;
    const valColor = isPeak ? C.brightGreen : isDump ? C.brightRed : "";
    lines.push(side(
      `  ${stat.padEnd(12)} ${valColor}${statBar(value)}${valColor ? C.reset : ""}`
    ));
  }

  lines.push(bot);

  return lines.join("\n");
}

/** Render a compact species list */
export function renderSpeciesList(
  species: string[],
  info: Record<string, { emoji: string; description: string }>
): string {
  const lines: string[] = [];
  lines.push(bold("  All 18 Buddy Species\n"));
  for (const s of species) {
    const i = info[s];
    if (i) {
      lines.push(`  ${i.emoji}  ${bold(s.padEnd(12))} ${dim(i.description)}`);
    }
  }
  return lines.join("\n");
}

/** Render rarity distribution table */
export function renderRarityTable(): string {
  const data = [
    { rarity: "common",    weight: 60, floor: 5,  desc: "The everyday companion" },
    { rarity: "uncommon",  weight: 25, floor: 15, desc: "A cut above the rest" },
    { rarity: "rare",      weight: 10, floor: 25, desc: "Hard to find, worth the wait" },
    { rarity: "epic",      weight: 4,  floor: 35, desc: "A truly remarkable creature" },
    { rarity: "legendary", weight: 1,  floor: 50, desc: "Once in a lifetime" },
  ];
  const lines: string[] = [];
  lines.push(bold("  Rarity Distribution\n"));
  for (const d of data) {
    const bar = "█".repeat(Math.ceil(d.weight / 3)) + "░".repeat(20 - Math.ceil(d.weight / 3));
    lines.push(
      `  ${rarityLabel(d.rarity).padEnd(40)} ${bar} ${d.weight.toString().padStart(2)}%  ` +
      dim(`base stats: ${d.floor}  ${d.desc}`)
    );
  }
  lines.push("");
  lines.push(dim("  + 1% chance of Shiny variant (independent of rarity)"));
  lines.push(dim("  Shiny Legendary probability: 0.01%"));
  return lines.join("\n");
}

/** Render stats explanation */
export function renderStatsInfo(): string {
  const stats = [
    { name: "DEBUGGING",  desc: "Ability to spot bugs in your code" },
    { name: "PATIENCE",   desc: "Tolerance for long build times and flaky tests" },
    { name: "CHAOS",      desc: "Tendency to suggest wild refactors at 2am" },
    { name: "WISDOM",     desc: "Quality of code review commentary" },
    { name: "SNARK",      desc: "Sass level in speech bubble reactions" },
  ];
  const lines: string[] = [];
  lines.push(bold("  Buddy Stats\n"));
  for (const s of stats) {
    lines.push(`  ${bold(s.name.padEnd(14))} ${dim(s.desc)}`);
  }
  lines.push("");
  lines.push(dim("  Each buddy has one peak stat (80-100) and one dump stat (1-15)."));
  lines.push(dim("  Higher rarity = higher base stat floor."));
  return lines.join("\n");
}

/** Render hats info */
export function renderHatsInfo(): string {
  const hats = [
    { name: "none",      emoji: "  ", desc: "No hat (common buddies only)" },
    { name: "crown",     emoji: "👑", desc: "Royalty vibes" },
    { name: "tophat",    emoji: "🎩", desc: "Distinguished gentleman" },
    { name: "propeller", emoji: "🧢", desc: "Spins when excited" },
    { name: "halo",      emoji: "😇", desc: "Angelic aura" },
    { name: "wizard",    emoji: "🧙", desc: "Arcane knowledge" },
    { name: "beanie",    emoji: "🧶", desc: "Cozy and warm" },
    { name: "tinyduck",  emoji: "🦆", desc: "A tiny duck on top. Meta." },
  ];
  const lines: string[] = [];
  lines.push(bold("  Hat Collection\n"));
  for (const h of hats) {
    lines.push(`  ${h.emoji}  ${bold(h.name.padEnd(12))} ${dim(h.desc)}`);
  }
  lines.push("");
  lines.push(dim("  Common buddies always have no hat."));
  lines.push(dim("  Uncommon+ randomly get one of the 8 options (including 'none')."));
  return lines.join("\n");
}

/** Progress spinner for brute-force search */
export function progressLine(checked: number, rate: number): string {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const frame = frames[Math.floor(Date.now() / 80) % frames.length];
  return `\r  ${colorize(frame, C.cyan)} Searching... ${dim(`${(checked / 1_000_000).toFixed(1)}M checked @ ${(rate / 1_000_000).toFixed(1)}M/s`)}`;
}
