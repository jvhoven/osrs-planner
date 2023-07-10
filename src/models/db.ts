import Dexie, { Table } from "dexie";

import { populate } from "./populate";
import { Character } from "@/lib/types";

class Database extends Dexie {
  public characters!: Table<Character, number>;
  
  constructor() {
    super("osrs-planner");
    this.version(2).stores({
      characters: "&rsn,gamemode,stats"
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
