import Image from "next/image";
import { Item } from "@/lib/item";
import { FC } from "react";

import { Grid } from "../grid";
import { InventoryContainer } from "./styles";

const INVENTORY_SIZE = 28;

export type InventoryProps = {
  items: Item[]
  size?: number;
  columns?: {
    count: number;
    size: string;
  }
}

export const Inventory: FC<InventoryProps> = ({ items, size = INVENTORY_SIZE, columns = { count: 4, size: "55px 55px 55px 55px" } }) => {
  return (
    <InventoryContainer>
      <Grid $columns={columns.count} $sizes={columns.size}>
        {Array.from({ length: size }, () => undefined).map((_, i) => <div key={i}>
          {items[i] !== undefined && <Image src={`data:image/jpeg;base64,${items[i].icon}`} unoptimized width="50" height="50" alt={items[i].name} />}
        </div>)}
      </Grid>
    </InventoryContainer>
  )
}
