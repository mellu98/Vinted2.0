"use client";

import Link from "next/link";
import { Heart, MapPin, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useItemsStore } from "@/lib/store";
import type { Item } from "@/types";
import { ITEM_CONDITIONS } from "@/types";

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m fa`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h fa`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}g fa`;
  return date.toLocaleDateString("it-IT", { day: "numeric", month: "short" });
}

export function ItemCard({ item }: { item: Item }) {
  const { favorites, toggleFavorite } = useItemsStore();
  const isFav = favorites.has(item.id);

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/item/${item.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.images[0]}
            alt={item.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-2 left-2 flex gap-1">
            {item.listingType === "free" ? (
              <Badge className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5">
                GRATIS
              </Badge>
            ) : (
              <Badge className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5">
                OFFERTA LIBERA
              </Badge>
            )}
          </div>
        </div>
      </Link>
      <div className="p-2.5">
        <div className="flex items-start justify-between gap-1">
          <Link href={`/item/${item.id}`} className="flex-1 min-w-0">
            <h3 className="text-sm font-medium leading-tight line-clamp-2">
              {item.title}
            </h3>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(item.id);
            }}
            className="shrink-0 p-1 -mr-1 -mt-0.5"
          >
            <Heart
              className={cn(
                "h-4.5 w-4.5 transition-colors",
                isFav ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-400"
              )}
            />
          </button>
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{item.locationName}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
          <span>{ITEM_CONDITIONS[item.condition]}</span>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{item.viewCount}</span>
          </div>
        </div>
        <div className="mt-1 text-[11px] text-muted-foreground/70">
          {timeAgo(item.createdAt)}
        </div>
      </div>
    </Card>
  );
}
