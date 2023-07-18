import Image from "next/image";
import { Item } from "@/lib/item";
import { FC } from "react";

import { InventoryContainer } from "./styles";

const INVENTORY_SIZE = 28;

export type InventoryProps = {
  items: Item[]
  size?: number;
  expandable?: boolean;
}

export const Inventory: FC<InventoryProps> = ({ items, size = INVENTORY_SIZE, expandable = false }) => {
  return (
    <InventoryContainer>
      {Array.from({ length: expandable && items.length > size ? items.length : size }, () => undefined).map((_, i) =>
        <div key={i}>
          {items[i] !== undefined && <Image src={`data:image/jpeg;base64,${items[i].icon}`} unoptimized width="50" height="50" alt={items[i].name} />}
        </div>
      )}
    </InventoryContainer>
  )
}
