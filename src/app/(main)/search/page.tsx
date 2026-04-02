"use client";

import { useState, useMemo } from "react";
import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ItemGrid } from "@/components/items/item-grid";
import { useItemsStore, useSearchStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/mock-data";
import { ITEM_CONDITIONS, type ItemCondition } from "@/types";
import { cn } from "@/lib/utils";

export default function SearchPage() {
  const items = useItemsStore((s) => s.items);
  const { filters, setFilters, resetFilters } = useSearchStore();
  const [localQuery, setLocalQuery] = useState(filters.query);

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => item.status === "active")
      .filter((item) => {
        if (filters.query && !item.title.toLowerCase().includes(filters.query.toLowerCase()) &&
            !item.description.toLowerCase().includes(filters.query.toLowerCase())) {
          return false;
        }
        if (filters.categoryId && item.categoryId !== filters.categoryId) return false;
        if (filters.condition && item.condition !== filters.condition) return false;
        if (filters.listingType && item.listingType !== filters.listingType) return false;
        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "popular": return b.viewCount - a.viewCount;
          case "nearest": return 0;
          default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }, [items, filters]);

  const hasActiveFilters = filters.categoryId || filters.condition || filters.listingType;

  return (
    <div className="mx-auto max-w-lg px-4 py-4">
      {/* Search bar */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca oggetti..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setFilters({ query: localQuery })}
            className="pl-9 pr-9"
          />
          {localQuery && (
            <button
              onClick={() => { setLocalQuery(""); setFilters({ query: "" }); }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <Sheet>
          <SheetTrigger
            className="relative shrink-0 inline-flex items-center justify-center rounded-md border border-input bg-background h-9 w-9 hover:bg-accent hover:text-accent-foreground"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {hasActiveFilters && (
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary" />
            )}
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto rounded-t-2xl">
            <SheetHeader>
              <SheetTitle>Filtri</SheetTitle>
            </SheetHeader>
            <div className="py-4 space-y-5">
              {/* Category filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Categoria</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilters({ categoryId: filters.categoryId === cat.id ? undefined : cat.id })}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm transition-colors",
                        filters.categoryId === cat.id
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Condition filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Condizione</h3>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(ITEM_CONDITIONS) as [ItemCondition, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setFilters({ condition: filters.condition === key ? undefined : key })}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm transition-colors",
                        filters.condition === key
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Type filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Tipo</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilters({ listingType: filters.listingType === "free" ? undefined : "free" })}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm transition-colors",
                      filters.listingType === "free" ? "border-primary bg-primary/10 text-primary font-medium" : "border-border"
                    )}
                  >
                    Solo gratis
                  </button>
                  <button
                    onClick={() => setFilters({ listingType: filters.listingType === "offerta_libera" ? undefined : "offerta_libera" })}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm transition-colors",
                      filters.listingType === "offerta_libera" ? "border-primary bg-primary/10 text-primary font-medium" : "border-border"
                    )}
                  >
                    Offerta libera
                  </button>
                </div>
              </div>

              <Separator />

              {/* Sort */}
              <div>
                <h3 className="text-sm font-medium mb-2">Ordina per</h3>
                <div className="flex gap-2">
                  {[
                    { key: "newest" as const, label: "Piu recenti" },
                    { key: "popular" as const, label: "Piu visti" },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setFilters({ sortBy: key })}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm transition-colors",
                        filters.sortBy === key ? "border-primary bg-primary/10 text-primary font-medium" : "border-border"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={resetFilters}>
                  Rimuovi filtri
                </Button>
                <Button className="flex-1">Applica</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active filters badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.categoryId && (
            <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setFilters({ categoryId: undefined })}>
              {CATEGORIES.find((c) => c.id === filters.categoryId)?.name}
              <X className="h-3 w-3" />
            </Badge>
          )}
          {filters.condition && (
            <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setFilters({ condition: undefined })}>
              {ITEM_CONDITIONS[filters.condition]}
              <X className="h-3 w-3" />
            </Badge>
          )}
          {filters.listingType && (
            <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setFilters({ listingType: undefined })}>
              {filters.listingType === "free" ? "Gratis" : "Offerta libera"}
              <X className="h-3 w-3" />
            </Badge>
          )}
        </div>
      )}

      {/* Results */}
      <p className="text-sm text-muted-foreground mb-3">{filteredItems.length} risultati</p>
      {filteredItems.length > 0 ? (
        <ItemGrid items={filteredItems} />
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="font-medium">Nessun risultato</p>
          <p className="text-sm text-muted-foreground mt-1">Prova a modificare i filtri di ricerca</p>
        </div>
      )}
    </div>
  );
}
