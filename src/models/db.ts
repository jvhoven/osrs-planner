import Dexie, { Table } from "dexie";

import { populate } from "./populate";
import { Character, Inventory } from "@/lib/types";
import { Item } from "@/lib/item";

class Database extends Dexie {
  public characters!: Table<Character, number>;
  public items!: Table<Item, number>;
  public inventories!: Table<Inventory, number>;

  constructor() {
    super("osrs-planner");
    this.version(4).stores({
      characters: "++id,rsn,gamemode,stats",
      items: "&id,name",
      inventories: "++id,character_id,items"
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
