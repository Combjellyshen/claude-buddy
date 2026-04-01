// ── Buddy Encyclopedia Data ──────────────────────────────────────────────────

export const SPECIES: string[] = [
  "duck",
  "goose",
  "blob",
  "cat",
  "dragon",
  "octopus",
  "owl",
  "penguin",
  "turtle",
  "snail",
  "ghost",
  "axolotl",
  "capybara",
  "cactus",
  "robot",
  "rabbit",
  "mushroom",
  "chonk",
];

export const RARITY_WEIGHTS: Record<string, number> = {
  common: 60,
  uncommon: 25,
  rare: 10,
  epic: 4,
  legendary: 1,
};

export const RARITY_TIERS: string[] = [
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
];

export const EYES: string[] = ["·", "✦", "×", "◉", "@", "°"];

export const HATS: string[] = [
  "none",
  "crown",
  "tophat",
  "propeller",
  "halo",
  "wizard",
  "beanie",
  "tinyduck",
];

export const STATS: string[] = [
  "DEBUGGING",
  "PATIENCE",
  "CHAOS",
  "WISDOM",
  "SNARK",
];

export const STAT_FLOORS: Record<string, number> = {
  common: 5,
  uncommon: 15,
  rare: 25,
  epic: 35,
  legendary: 50,
};

export const RARITY_STARS: Record<string, string> = {
  common: "★",
  uncommon: "★★",
  rare: "★★★",
  epic: "★★★★",
  legendary: "★★★★★",
};

export const RARITY_COLORS: Record<string, string> = {
  common: "\x1b[90m",    // gray
  uncommon: "\x1b[32m",  // green
  rare: "\x1b[34m",      // blue
  epic: "\x1b[35m",      // magenta
  legendary: "\x1b[33m", // yellow
};

export const SALT = "friend-2026-401";

// ── Species Info ─────────────────────────────────────────────────────────────

export const SPECIES_INFO: Record<string, { emoji: string; description: string }> = {
  duck: {
    emoji: "🦆",
    description: "A classic rubber duck debugger come to life. Quacks at your bugs.",
  },
  goose: {
    emoji: "🪿",
    description: "An unruly goose that honks when your tests fail. Steals your semicolons.",
  },
  blob: {
    emoji: "🫠",
    description: "An amorphous blob of pure vibes. Absorbs stack traces by osmosis.",
  },
  cat: {
    emoji: "🐱",
    description: "Knocks things off your stack. Sleeps on your keyboard at critical moments.",
  },
  dragon: {
    emoji: "🐉",
    description: "A tiny dragon that breathes fire at poorly formatted code.",
  },
  octopus: {
    emoji: "🐙",
    description: "Eight arms for eight open PRs. Reviews them all simultaneously.",
  },
  owl: {
    emoji: "🦉",
    description: "Stays up all night watching your CI pipeline. Judges silently.",
  },
  penguin: {
    emoji: "🐧",
    description: "A formal little friend who insists on strict typing at all times.",
  },
  turtle: {
    emoji: "🐢",
    description: "Slow and steady wins the deployment. Never rushes a code review.",
  },
  snail: {
    emoji: "🐌",
    description: "Leaves a slime trail through your git history. Surprisingly thorough.",
  },
  ghost: {
    emoji: "👻",
    description: "A spectral presence that haunts your deprecated functions.",
  },
  axolotl: {
    emoji: "🦎",
    description: "Regenerates deleted code from memory. Smiles while doing it.",
  },
  capybara: {
    emoji: "🦫",
    description: "The chillest buddy. Sits with you through long rebases without complaint.",
  },
  cactus: {
    emoji: "🌵",
    description: "Prickly about code style. Thrives on neglect and desert-dry humor.",
  },
  robot: {
    emoji: "🤖",
    description: "Beeps and boops through your linting errors. Dreams of electric sheep.",
  },
  rabbit: {
    emoji: "🐇",
    description: "Hops between branches at lightning speed. Multiplies your test cases.",
  },
  mushroom: {
    emoji: "🍄",
    description: "A fungal friend that decomposes bad code into nutrient-rich abstractions.",
  },
  chonk: {
    emoji: "🐱",
    description: "An absolute unit. Sits on your code and refuses to move.",
  },
};

// ── Sprites (3 idle-animation frames per species, ~4-5 lines each) ──────────

export const SPRITES: Record<string, string[]> = {
  duck: [
    "  __\n<(· )___\n (  ._>\n  `--´",
    "  __\n<(· )___\n (  ._>\n  `--´",
    "  __\n<(- )___\n (  ._>\n  `--´",
  ],
  goose: [
    "  (·>\n  ||\n_(__)_\n ^^^^",
    "  (·>\n  ||\n_(__)_\n ^^^^",
    "  (->  \n  ||\n_(__)_\n ^^^^",
  ],
  blob: [
    " ,---, \n( · · )\n(     )\n `---´ ",
    " ,---, \n( · · )\n(     )\n `---´ ",
    " ,---, \n( - - )\n(     )\n `---´ ",
  ],
  cat: [
    " /\\_/\\ \n( · · )\n( >o< )\n  \" \" ",
    " /\\_/\\ \n( · · )\n( >o< )\n  \" \" ",
    " /\\_/\\ \n( - - )\n( >o< )\n  \" \" ",
  ],
  dragon: [
    "  /\\_  \n ( ·}>~\n /|  |\n(_|  |",
    "  /\\_  \n ( ·}>~\n /|  |\n(_|  |",
    "  /\\_  \n ( -}>~\n /|  |\n(_|  |",
  ],
  octopus: [
    "  ,---,\n ( · · )\n /||||||\\\n(_)()()|",
    "  ,---,\n ( · · )\n /||||||\\\n()(_()(|",
    "  ,---,\n ( - - )\n /||||||\\\n(_)()()|",
  ],
  owl: [
    " {o,o} \n /)  ) \n-\"--\"-  \n  ||   ",
    " {o,o} \n /)  ) \n-\"--\"-  \n  ||   ",
    " {-,-} \n /)  ) \n-\"--\"-  \n  ||   ",
  ],
  penguin: [
    "  (·)  \n /| |\\ \n | | | \n  d b  ",
    "  (·)  \n /| |\\ \n | | | \n  d b  ",
    "  (-)  \n /| |\\ \n | | | \n  d b  ",
  ],
  turtle: [
    "    _  \n  ·/ )_\n _/  _ \\\n(__/\\__)",
    "    _  \n  ·/ )_\n _/  _ \\\n(__/\\__)",
    "    _  \n  -/ )_\n _/  _ \\\n(__/\\__)",
  ],
  snail: [
    "   @_@ \n _(· )/\n(____)  \n\"\"\"\"\"\" ",
    "   @_@ \n _(· )/\n(____)  \n\"\"\"\"\"\" ",
    "   @_@ \n _(- )/\n(____)  \n\"\"\"\"\"\" ",
  ],
  ghost: [
    " .---. \n | · · |\n |     |\n /\\/\\/\\ ",
    " .---. \n | · · |\n |     |\n /\\/\\/\\ ",
    " .---. \n | - - |\n |     |\n /\\/\\/\\ ",
  ],
  axolotl: [
    "\\(· ·)/\n  |  | \n /    \\\n(_\\__/)",
    "\\(· ·)/\n  |  | \n /    \\\n(_\\__/)",
    "\\(- -)/\n  |  | \n /    \\\n(_\\__/)",
  ],
  capybara: [
    " __ _  \n(· · ) \n(    )_\n |___|",
    " __ _  \n(· · ) \n(    )_\n |___|",
    " __ _  \n(- - ) \n(    )_\n |___|",
  ],
  cactus: [
    "  |  \n |·| \n-|  |-\n |  | \n \\__/",
    "  |  \n |·| \n-|  |-\n |  | \n \\__/",
    "  |  \n |-| \n-|  |-\n |  | \n \\__/",
  ],
  robot: [
    " [==] \n |·  ·|\n |[__]|\n _|  |_",
    " [==] \n |·  ·|\n |[__]|\n _|  |_",
    " [==] \n |-  -|\n |[__]|\n _|  |_",
  ],
  rabbit: [
    " (\\(\\  \n ( ·.·)\n o(\")(\")",
    " (\\(\\  \n ( ·.·)\n o(\")(\")",
    " (\\(\\  \n ( -.·)\n o(\")(\")",
  ],
  mushroom: [
    "  .--.  \n /· · \\\n(______)\n  |  |  ",
    "  .--.  \n /· · \\\n(______)\n  |  |  ",
    "  .--.  \n /- - \\\n(______)\n  |  |  ",
  ],
  chonk: [
    " /\\_/\\  \n( · · ) \n(     ) \n(     ) \n  \" \"   ",
    " /\\_/\\  \n( · · ) \n(     ) \n(     ) \n  \" \"   ",
    " /\\_/\\  \n( - - ) \n(     ) \n(     ) \n  \" \"   ",
  ],
};
