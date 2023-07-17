import Image from "next/image";
import { Item } from "@/lib/item";
import { FC } from "react";

import { Grid } from "../grid";
import { InventoryContainer } from "./styles";

const INVENTORY_SIZE = 28;

export type InventoryProps = {
  items: Item[]
}

export const Inventory: FC<InventoryProps> = ({ items }) => {
  return (
    <InventoryContainer>
      <Grid $columns={4} $sizes="55px 55px 55px 55px">
        {Array.from({ length: INVENTORY_SIZE }, () => undefined).map((_, i) => <div key={i}>
          {items[i] !== undefined && <Image src={`data:image/jpeg;base64,${items[i].icon}`} unoptimized width="50" height="50" alt={items[i].name} />}
        </div>)}
      </Grid>
    </InventoryContainer>
  )
}
