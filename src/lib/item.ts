/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Item {
  /**
   * Unique OSRS item ID number.
   */
  id: number;
  /**
   * The name of the item.
   */
  name: string;
  /**
   * The last time (UTC) the item was updated (in ISO8601 date format).
   */
  last_updated: string;
  /**
   * If the item has incomplete wiki data.
   */
  incomplete: boolean;
  /**
   * If the item is a members-only.
   */
  members: boolean;
  /**
   * If the item is tradeable (between players and on the GE).
   */
  tradeable: boolean;
  /**
   * If the item is tradeable (only on GE).
   */
  tradeable_on_ge: boolean;
  /**
   * If the item is stackable (in inventory).
   */
  stackable: boolean;
  /**
   * If the item is stacked, indicated by the stack count.
   */
  stacked?: number;
  /**
   * If the item is noted.
   */
  noted: boolean;
  /**
   * If the item is noteable.
   */
  noteable: boolean;
  /**
   * The linked ID of the actual item (if noted/placeholder).
   */
  linked_id_item: number;
  /**
   * The linked ID of an item in noted form.
   */
  linked_id_noted: number;
  /**
   * The linked ID of an item in placeholder form.
   */
  linked_id_placeholder: number;
  /**
   * If the item is a placeholder.
   */
  placeholder: boolean;
  /**
   * If the item is equipable (based on right-click menu entry).
   */
  equipable: boolean;
  /**
   * If the item is equipable in-game by a player.
   */
  equipable_by_player: boolean;
  /**
   * If the item is an equipable weapon.
   */
  equipable_weapon: boolean;
  /**
   * The store price of an item.
   */
  cost: number;
  /**
   * The low alchemy value of the item (cost * 0.4).
   */
  lowalch: number;
  /**
   * The high alchemy value of the item (cost * 0.6).
   */
  highalch: number;
  /**
   * The weight (in kilograms) of the item.
   */
  weight: number;
  /**
   * The Grand Exchange buy limit of the item.
   */
  buy_limit: number;
  /**
   * If the item is associated with a quest.
   */
  quest_item: boolean;
  /**
   * Date the item was released (in ISO8601 format).
   */
  release_date: string;
  /**
   * If the item is a duplicate.
   */
  duplicate: boolean;
  /**
   * The examine text for the item.
   */
  examine: string;
  /**
   * The item icon (in base64 encoding).
   */
  icon: string;
  /**
   * The OSRS Wiki name for the item.
   */
  wiki_name: string;
  /**
   * The OSRS Wiki URL (possibly including anchor link).
   */
  wiki_url: string;
  /**
   * The equipment bonuses of equipable armour/weapons.
   */
  equipment: {
    /**
     * The attack stab bonus of the item.
     */
    attack_stab?: number;
    /**
     * The attack slash bonus of the item.
     */
    attack_slash?: number;
    /**
     * The attack crush bonus of the item.
     */
    attack_crush?: number;
    /**
     * The attack magic bonus of the item.
     */
    attack_magic?: number;
    /**
     * The attack ranged bonus of the item.
     */
    attack_ranged?: number;
    /**
     * The defence stab bonus of the item.
     */
    defence_stab?: number;
    /**
     * The defence slash bonus of the item.
     */
    defence_slash?: number;
    /**
     * The defence crush bonus of the item.
     */
    defence_crush?: number;
    /**
     * The defence magic bonus of the item.
     */
    defence_magic?: number;
    /**
     * The defence ranged bonus of the item.
     */
    defence_ranged?: number;
    /**
     * The melee strength bonus of the item.
     */
    melee_strength?: number;
    /**
     * The ranged strength bonus of the item.
     */
    ranged_strength?: number;
    /**
     * The magic damage bonus of the item.
     */
    magic_damage?: number;
    /**
     * The prayer bonus of the item.
     */
    prayer?: number;
    /**
     * The equipment slot associated with the item (e.g., head).
     */
    slot?: "2h" | "ammo" | "body" | "cape" | "feet" | "hands" | "head" | "legs" | "neck" | "ring" | "shield" | "weapon";
    /**
     * An object of requirements {skill: level}.
     */
    requirements?: {
      [k: string]: number;
    };
    [k: string]: unknown;
  };
  /**
   * The weapon bonuses including attack speed, type and stance.
   */
  weapon: {
    /**
     * The attack speed of a weapon (in game ticks).
     */
    attack_speed?: number;
    /**
     * The weapon classification (e.g., axes)
     */
    weapon_type?:
      | "axe"
      | "blunt"
      | "bludgeon"
      | "bulwark"
      | "claw"
      | "polearm"
      | "pickaxe"
      | "scythe"
      | "slash_sword"
      | "spear"
      | "spiked"
      | "stab_sword"
      | "2h_sword"
      | "whip"
      | "bow"
      | "chinchompas"
      | "crossbow"
      | "thrown"
      | "staff"
      | "bladed_staff"
      | "powered_staff"
      | "banner"
      | "blaster"
      | "gun"
      | "polestaff"
      | "salamander"
      | "unarmed";
    /**
     * An array of weapon stance information.
     */
    stances?: {
      combat_style:
        | "impale"
        | "aim and fire"
        | "reap"
        | "bash"
        | "long fuse"
        | "pummel"
        | "smash"
        | "blaze"
        | "flare"
        | "rapid"
        | "lunge"
        | "stab"
        | "swipe"
        | "short fuse"
        | "punch"
        | "kick"
        | "spike"
        | "scorch"
        | "focus"
        | "deflect"
        | "fend"
        | "block"
        | "medium fuse"
        | "flick"
        | "slash"
        | "longrange"
        | "hack"
        | "accurate"
        | "pound"
        | "chop"
        | "jab"
        | "lash"
        | "spell"
        | "spell (defensive)";
      attack_type: "spellcasting" | "stab" | "ranged" | "slash" | "crush" | "magic" | "defensive casting";
      attack_style: "aggressive" | "defensive" | "magic" | "controlled" | "accurate";
      experience:
        | "defence"
        | "ranged and defence"
        | "ranged"
        | "shared"
        | "magic and defence"
        | "magic"
        | "strength"
        | "attack";
      boosts: "attack speed by 1 tick" | "attack range by 2 squares" | "accuracy and damage";
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
