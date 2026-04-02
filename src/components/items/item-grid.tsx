import type { Item } from "@/types";
import { ItemCard } from "./item-card";

export function ItemGrid({ items, columns = 2 }: { items: Item[]; columns?: 2 | 3 }) {
  return (
    <div
      className={
        columns === 3
          ? "grid grid-cols-2 gap-3 sm:grid-cols-3"
          : "grid grid-cols-2 gap-3"
      }
    >
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
