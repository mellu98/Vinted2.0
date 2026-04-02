"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemGrid } from "@/components/items/item-grid";
import { useItemsStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/mock-data";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const items = useItemsStore((s) => s.items);
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[50vh]">
        <p className="font-medium">Categoria non trovata</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/categories")}>
          Tutte le categorie
        </Button>
      </div>
    );
  }

  const categoryItems = items.filter((i) => i.categoryId === category.id && i.status === "active");

  return (
    <div className="mx-auto max-w-lg px-4 py-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">{category.name}</h1>
          <p className="text-sm text-muted-foreground">{categoryItems.length} annunci</p>
        </div>
      </div>
      {categoryItems.length > 0 ? (
        <ItemGrid items={categoryItems} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nessun annuncio in questa categoria</p>
        </div>
      )}
    </div>
  );
}
