import Dexie, { Table } from "dexie";

import { populate } from "./populate";
import { Character, Item } from "@/lib/types";

class Database extends Dexie {
  public characters!: Table<Character, number>;
  public items!: Table<Item, number>;
  
  constructor() {
    super("osrs-planner");
    this.version(2).stores({
      characters: "&rsn,gamemode,stats",
      items: "++id,name,slot,bonuses,weight,attackSpeed,membersOnly,canBePoisoned"
    });
  }
}

export const db = new Database();

db.on('populate', populate);

export function resetDatabase() {
  return db.transaction('rw', db.characters, async () => {
    await Promise.all(db.tables.map(table => table.clear()));
    await populate();
  });
}
