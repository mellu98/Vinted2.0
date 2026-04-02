"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemGrid } from "@/components/items/item-grid";
import { useItemsStore } from "@/lib/store";

export default function FavoritesPage() {
  const router = useRouter();
  const { items, favorites } = useItemsStore();
  const favoriteItems = items.filter((i) => favorites.has(i.id));

  return (
    <div className="mx-auto max-w-lg px-4 py-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Preferiti</h1>
      </div>
      {favoriteItems.length > 0 ? (
        <ItemGrid items={favoriteItems} />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart className="h-16 w-16 text-muted-foreground/20 mb-4" />
          <p className="font-medium">Nessun preferito</p>
          <p className="text-sm text-muted-foreground mt-1">
            Tocca il cuore sugli annunci per salvarli qui
          </p>
        </div>
      )}
    </div>
  );
}
