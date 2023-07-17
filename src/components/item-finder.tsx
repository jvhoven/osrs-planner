import { Item } from "@/lib/item";
import { db } from "@/models/db";
import { useLiveQuery } from "dexie-react-hooks";
import { AutoComplete } from "./forms";

export default function ItemFinder({ onSelect }: {
  onSelect: (item: Item) => void
}) {
  const items = useLiveQuery(
    () => db.items.toArray(), [], []
  );

  return (<AutoComplete
    suggestions={items}
    labelFor={(item) => item.name}
    keyFor={(item) => `${item.id}`}
    onSelect={onSelect}
  />)
}
