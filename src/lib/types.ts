import { ACTIVITIES, BH_MODES, BOSSES, CLUES, SKILLS, GAMEMODES } from "./constants";
import { Item } from "./generated/item";

export type EquippableSlots = Exclude<Required<Item["equipment"]>["slot"], "2h">;
export type Gamemode = typeof GAMEMODES[number];
export type SkillName = typeof SKILLS[number];
export type Skills = { [Name in SkillName]: Skill };
export type ClueType = typeof CLUES[number];
export type Clues = { [Type in ClueType]: Activity };
export type BHType = typeof BH_MODES[number];
export type BH = { [Type in BHType]: Activity };
export type Boss = typeof BOSSES[number];
export type Bosses = { [Type in Boss]: Activity };
export type ActivityName = typeof ACTIVITIES[number];

export type Inventory = {
  id?: number;
  character_id: number;
  items: Item[];
}

export type Character = {
  id?: number;
  gamemode: Gamemode;
  rsn: string;
  stats: Stats;
}

export type Bonuses = {
    attack: {
      stab: number,
      slash: number,
      crush: number,
      magic: number,
      ranged: number
    },
    defence: {
      stab: number,
      slash: number,
      crush: number,
      magic: number,
      ranged: number
    },
    other: {
      strength: number,
      rangedStrength: number,
      magicDamagePercentage: number,
      prayer: number
      weight: number
    }
}

export interface Skill {
  rank: number;
  level: number;
  xp: number;
}

export interface Activity {
  rank: number;
  score: number;
}

export interface Stats {
  skills: Skills;
  clues: Clues;
  leaguePoints: Activity;
  bountyHunter: BH;
  lastManStanding: Activity;
  pvpArena: Activity;
  soulWarsZeal: Activity;
  riftsClosed: Activity;
  bosses: Bosses;
}
export type Modes = { [M in Gamemode]?: Stats };

export interface Player extends Modes {
  name: string;
  mode: Gamemode;
  dead: boolean;
  deulted: boolean;
  deironed: boolean;
}

export interface PlayerSkillRow extends Skill {
  name: string;
  dead: boolean;
}

export interface PlayerActivityRow extends Activity {
  name: string;
  dead: boolean;
}
