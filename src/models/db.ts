import Dexie, { Table } from "dexie";

import { populate } from "./populate";
import { Character } from "@/lib/types";
import { Item } from "@/lib/item";

class Database extends Dexie {
  public characters!: Table<Character, number>;
  public items!: Table<Item, number>;

  constructor() {
    super("osrs-planner");
    this.version(3).stores({
      characters: "&rsn,gamemode,stats",
      items: "&id,name"
    });
  }
}

export const db = new Database();

export function resetDatabase() {
  return db.transaction('rw', db.characters, async () => {
    await Promise.all(db.tables.map(table => table.clear()));
    await populate();
  });
}
