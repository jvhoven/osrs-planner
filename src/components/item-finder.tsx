import { Item } from "@/lib/item";
import { db } from "@/models/db";
import { useLiveQuery } from "dexie-react-hooks";
import { AutoComplete } from "./forms";
import { PromiseExtended } from "dexie";

type ItemFinderProps = {
  onSelect: (item: Item) => void;
  query?: () => PromiseExtended<Item[]>;
}

export default function ItemFinder({ onSelect, query = () => db.items.toArray() }: ItemFinderProps) {
  const items = useLiveQuery(query, [], []);

  return (<AutoComplete
    suggestions={items}
    labelFor={(item) => item.name}
    keyFor={(item) => `${item.id}`}
    onSelect={onSelect}
  />)
}
