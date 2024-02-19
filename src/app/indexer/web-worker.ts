import { Item } from "@/lib/item";
import { db } from "@/models/db"
import { Message } from "./types";

declare function postMessage(message: Message): void;

self.addEventListener('message', () => {
  db.items.count(async count => {
    if (count > 0) {
      postMessage({
        category: 'Item data',
        message: "up-to-date",
        status: 'success'
      })
      return;
    }

    try {
      postMessage({
        category: 'Item data',
        message: "downloading item data",
        status: 'busy'
      });

      const items: Record<string, Item>[] = await fetch("https://raw.githubusercontent.com/0xNeffarion/osrsreboxed-db/master/docs/items-complete.json").then((response) => response.json());

      postMessage({
        category: 'Item data',
        message: "writing item data to database",
        status: 'busy'
      });

      db.items.bulkAdd(
        // @ts-expect-error
        Object.entries(items).flatMap(([, { name, id, ...rest }]) => {
          if (rest.duplicate) return [];

          return {
            id,
            name,
            ...rest
          }
        })
      )

      postMessage({
        category: 'Item data',
        message: "up-to-date",
        status: "success"
      })
    } catch (e: any) {
      postMessage({
        category: 'Item data',
        message: `Error: ${e.message}`,
        status: "failed"
      });
    }
  })
})

