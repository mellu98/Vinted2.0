"use client";

import Link from "next/link";
import { ChevronRight, TrendingUp, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ItemGrid } from "@/components/items/item-grid";
import { useItemsStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/mock-data";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Shirt: Icons.Shirt,
  Smartphone: Icons.Smartphone,
  Home: Icons.Home,
  BookOpen: Icons.BookOpen,
  Dumbbell: Icons.Dumbbell,
  Gamepad2: Icons.Gamepad2,
  Music: Icons.Music,
  Bike: Icons.Bike,
  PawPrint: Icons.PawPrint,
  Package: Icons.Package,
};

export default function HomePage() {
  const items = useItemsStore((s) => s.items);
  const activeItems = items.filter((i) => i.status === "active");
  const trendingItems = [...activeItems].sort((a, b) => b.viewCount - a.viewCount).slice(0, 6);
  const recentItems = [...activeItems].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="mx-auto max-w-lg">
      {/* Categories scroll */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Categorie</h2>
          <Link href="/categories" className="text-xs text-primary font-medium flex items-center gap-0.5">
            Tutte <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.slice(0, 8).map((cat) => {
            const CatIcon = iconMap[cat.icon] || Icons.Package;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex flex-col items-center gap-1.5 shrink-0"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors hover:bg-primary/20">
                  <CatIcon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-[11px] text-muted-foreground text-center w-14 truncate">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Trending */}
      <section className="px-4 pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Di tendenza</h2>
          </div>
          <Link href="/search?sort=popular" className="text-xs text-primary font-medium flex items-center gap-0.5">
            Vedi tutti <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <ItemGrid items={trendingItems} />
      </section>

      {/* Recent */}
      <section className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Appena pubblicati</h2>
          </div>
        </div>
        <ItemGrid items={recentItems} />
      </section>
    </div>
  );
}
