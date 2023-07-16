import { Item } from "@/lib/item"
import { NextResponse } from 'next/server'

import search from "@/data/items/search-no-duplicates.json";

export async function GET() {
  return NextResponse.json<Pick<Item, "name" | "id">[]>(
    search
  )
}

