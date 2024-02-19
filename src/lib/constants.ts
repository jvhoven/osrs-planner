import { Item } from './item';
import {
  BHType,
  Boss,
  ClueType,
  SkillName,
  Gamemode
} from './types';

export const ITEM_SLOT: Item["equipment"]["slot"][] = [
  'ammo',
  'body',
  'cape',
  'feet',
  'hands',
  'head',
  'neck',
  'legs',
  'ring',
  'shield',
  '2h',
  'weapon'
];

export const ATTACK_STYLES = [
  'stab',
  'slash',
  'crush',
  'magic',
  'ranged'
] as const;

export const SKILLS = [
  'overall',
  'attack',
  'defence',
  'strength',
  'hitpoints',
  'ranged',
  'prayer',
  'magic',
  'cooking',
  'woodcutting',
  'fletching',
  'fishing',
  'firemaking',
  'crafting',
  'smithing',
  'mining',
  'herblore',
  'agility',
  'thieving',
  'slayer',
  'farming',
  'runecraft',
  'hunter',
  'construction'
] as const;

export const CLUES = [
  'all',
  'beginner',
  'easy',
  'medium',
  'hard',
  'elite',
  'master'
] as const;

export const BH_MODES = ['hunterV2', 'rogueV2', 'hunter', 'rogue'] as const;

export const GAMEMODES = [
  'pure',
  'main',
  'ironman',
  'hardcore',
  'ultimate',
  'group_ironman',
  'hardcore_group_ironman'
] as const;

export type FormattedGamemodeNames = {
  [key in Gamemode]: string;
};

export const FORMATTED_GAMEMODE_NAMES: FormattedGamemodeNames = {
  pure: 'Pure',
  main: 'Main',
  ironman: 'Ironman',
  hardcore: 'Hardcore ironman',
  ultimate: 'Ultimate ironman',
  group_ironman: 'Group ironman',
  hardcore_group_ironman: 'Hardcore group ironman'
};

export const BOSSES = [
  'abyssalSire',
  'alchemicalHydra',
  'artio',
  'barrows',
  'bryophyta',
  'callisto',
  'calvarion',
  'cerberus',
  'chambersOfXeric',
  'chambersOfXericChallengeMode',
  'chaosElemental',
  'chaosFanatic',
  'commanderZilyana',
  'corporealBeast',
  'crazyArchaeologist',
  'dagannothPrime',
  'dagannothRex',
  'dagannothSupreme',
  'derangedArchaeologist',
  'generalGraardor',
  'giantMole',
  'grotesqueGuardians',
  'hespori',
  'kalphiteQueen',
  'kingBlackDragon',
  'kraken',
  'kreeArra',
  'krilTsutsaroth',
  'mimic',
  'nex',
  'nightmare',
  'phosanisNightmare',
  'obor',
  'phantomMuspah',
  'sarachnis',
  'scorpia',
  'skotizo',
  'spindel',
  'tempoross',
  'gauntlet',
  'corruptedGauntlet',
  'theatreOfBlood',
  'theatreOfBloodHardMode',
  'thermonuclearSmokeDevil',
  'tombsOfAmascut',
  'tombsOfAmascutExpertMode',
  'tzKalZuk',
  'tzTokJad',
  'venenatis',
  'vetion',
  'vorkath',
  'wintertodt',
  'zalcano',
  'zulrah',
  'theWhisperer',
  'dukeSucellus',
  'vardorvis',
  'theLeviathan',
  'scurrius'
] as const;

export const ACTIVITIES = [
  'leaguePoints',
  'hunterBHV2',
  'rogueBHV2',
  'hunterBH',
  'rogueBH',
  'allClues',
  'beginnerClues',
  'easyClues',
  'mediumClues',
  'hardClues',
  'eliteClues',
  'masterClues',
  'lastManStanding',
  'pvpArena',
  'soulWarsZeal',
  'riftsClosed',
  ...BOSSES
] as const;

export type FormattedBossNames = {
  [key in Boss]: string;
};

export const FORMATTED_BOSS_NAMES: FormattedBossNames = {
  abyssalSire: 'Abyssal Sire',
  alchemicalHydra: 'Alchemical Hydra',
  artio: 'Artio',
  barrows: 'Barrows',
  bryophyta: 'Bryophyta',
  callisto: 'Callisto',
  calvarion: "Calvar'ion",
  cerberus: 'Cerberus',
  chambersOfXeric: 'Chambers of Xeric',
  chambersOfXericChallengeMode: 'Chambers of Xeric: Challenge Mode',
  chaosElemental: 'Chaos Elemental',
  chaosFanatic: 'Chaos Fanatic',
  commanderZilyana: 'Commander Zilyana',
  corporealBeast: 'Corporeal Beast',
  crazyArchaeologist: 'Crazy Archaeologist',
  dagannothPrime: 'Dagannoth Prime',
  dagannothRex: 'Dagannoth Rex',
  dagannothSupreme: 'Dagannoth Supreme',
  derangedArchaeologist: 'Deranged Archaeologist',
  generalGraardor: 'General Graardor',
  giantMole: 'Giant Mole',
  grotesqueGuardians: 'Grotesque Guardians',
  hespori: 'Hespori',
  kalphiteQueen: 'Kalphite Queen',
  kingBlackDragon: 'King Black Dragon',
  kraken: 'Kraken',
  kreeArra: "Kree'Arra",
  krilTsutsaroth: "K'ril Tsutsaroth",
  mimic: 'Mimic',
  nex: 'Nex',
  nightmare: 'The Nightmare of Ashihama',
  phosanisNightmare: "Phosani's Nightmare",
  obor: 'Obor',
  phantomMuspah: 'Phantom Muspah',
  sarachnis: 'Sarachnis',
  scorpia: 'Scorpia',
  skotizo: 'Skotizo',
  spindel: 'Spindel',
  tempoross: 'Tempoross',
  gauntlet: 'The Gauntlet',
  corruptedGauntlet: 'The Corrupted Gauntlet',
  theatreOfBlood: 'Theatre of Blood',
  theatreOfBloodHardMode: 'Theatre of Blood: Hard Mode',
  thermonuclearSmokeDevil: 'Thermonuclear Smoke Devil',
  tombsOfAmascut: 'Tombs of Amascut',
  tombsOfAmascutExpertMode: 'Tombs of Amascut: Expert Mode',
  tzKalZuk: 'TzKal-Zuk',
  tzTokJad: 'TzTok-Jad',
  venenatis: 'Venenatis',
  vetion: "Vet'ion",
  vorkath: 'Vorkath',
  wintertodt: 'Wintertodt',
  zalcano: 'Zalcano',
  zulrah: 'Zulrah',
  scurrius: 'Scurrius',
  theWhisperer: 'The Whisperer',
  dukeSucellus: 'Duke Sucellus',
  vardorvis: 'Vardorvis',
  theLeviathan: 'The Leviathan'
};


export type FormattedSkillNames = {
  [key in SkillName]: string;
};

export const FORMATTED_SKILL_NAMES: FormattedSkillNames = {
  overall: 'Overall',
  attack: 'Attack',
  defence: 'Defence',
  strength: 'Strength',
  hitpoints: 'Hitpoints',
  ranged: 'Ranged',
  prayer: 'Prayer',
  magic: 'Magic',
  cooking: 'Cooking',
  woodcutting: 'Woodcutting',
  fletching: 'Fletching',
  fishing: 'Fishing',
  firemaking: 'Firemaking',
  crafting: 'Crafting',
  smithing: 'Smithing',
  mining: 'Mining',
  herblore: 'Herblore',
  agility: 'Agility',
  thieving: 'Thieving',
  slayer: 'Slayer',
  farming: 'Farming',
  runecraft: 'Runecraft',
  hunter: 'Hunter',
  construction: 'Construction'
};

export type FormattedClueNames = {
  [key in ClueType]: string;
};

export const FORMATTED_CLUE_NAMES: FormattedClueNames = {
  all: 'Clue Scrolls (all)',
  beginner: 'Clue Scrolls (beginner)',
  easy: 'Clue Scrolls (easy)',
  medium: 'Clue Scrolls (medium)',
  hard: 'Clue Scrolls (hard)',
  elite: 'Clue Scrolls (elite)',
  master: 'Clue Scrolls (master)'
};

export type FormattedBHNames = {
  [key in BHType]: string;
};

export const FORMATTED_BH_NAMES: FormattedBHNames = {
  rogue: 'Bounty Hunter (Legacy) - Rogue',
  hunter: 'Bounty Hunter (Legacy) - Hunter',
  rogueV2: 'Bounty Hunter - Rogue',
  hunterV2: 'Bounty Hunter - Hunter'
};

export const FORMATTED_LMS = 'Last Man Standing';
export const FORMATTED_PVP_ARENA = 'PvP Arena';
export const FORMATTED_SOUL_WARS = 'Soul Wars Zeal';
export const FORMATTED_LEAGUE_POINTS = 'League Points';
export const FORMATTED_RIFTS_CLOSED = 'Rifts Closed';

export const INVALID_FORMAT_ERROR = 'Invalid hiscores format';
