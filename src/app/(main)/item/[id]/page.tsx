"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Heart, Share2, MapPin, Eye, Clock, MessageCircle,
  Flag, ChevronLeft, ChevronRight, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useItemsStore } from "@/lib/store";
import { ITEM_CONDITIONS, LISTING_TYPES } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { items, favorites, toggleFavorite } = useItemsStore();
  const item = items.find((i) => i.id === id);
  const [currentImage, setCurrentImage] = useState(0);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh]">
        <p className="text-lg font-medium">Oggetto non trovato</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/home")}>
          Torna alla home
        </Button>
      </div>
    );
  }

  const isFav = favorites.has(item.id);
  const user = item.user;

  return (
    <div className="mx-auto max-w-lg">
      {/* Image carousel */}
      <div className="relative aspect-square bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.images[currentImage]}
          alt={item.title}
          className="h-full w-full object-cover"
        />
        <button
          onClick={() => router.back()}
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            onClick={() => {
              toggleFavorite(item.id);
              toast(isFav ? "Rimosso dai preferiti" : "Aggiunto ai preferiti");
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"
          >
            <Heart className={cn("h-5 w-5", isFav && "fill-red-500 text-red-500")} />
          </button>
          <button
            onClick={() => toast("Link copiato!")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
        {item.images.length > 1 && (
          <>
            {currentImage > 0 && (
              <button onClick={() => setCurrentImage((i) => i - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white">
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            {currentImage < item.images.length - 1 && (
              <button onClick={() => setCurrentImage((i) => i + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white">
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {item.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    i === currentImage ? "bg-white" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Type & condition */}
        <div className="flex gap-2">
          {item.listingType === "free" ? (
            <Badge className="bg-primary text-primary-foreground font-bold">GRATIS</Badge>
          ) : (
            <Badge className="bg-amber-500 text-white font-bold">OFFERTA LIBERA</Badge>
          )}
          <Badge variant="secondary">{ITEM_CONDITIONS[item.condition]}</Badge>
          <Badge variant="secondary">{item.category.name}</Badge>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold leading-tight">{item.title}</h1>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" /> {item.viewCount} visualizzazioni
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-4 w-4" /> {item.favoriteCount} preferiti
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {new Date(item.createdAt).toLocaleDateString("it-IT", { day: "numeric", month: "short" })}
          </span>
        </div>

        <Separator />

        {/* Description */}
        <div>
          <h2 className="font-semibold mb-1">Descrizione</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{item.locationName}</span>
        </div>

        <Separator />

        {/* User */}
        <Link href={`/user/${user.id}`} className="flex items-center gap-3 py-1">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatarUrl} alt={user.displayName} />
            <AvatarFallback>{user.displayName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold">{user.displayName}</span>
              {user.isVerified && (
                <Badge variant="secondary" className="text-[10px] px-1 py-0">Verificato</Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {user.rating}
              </span>
              <span>{user.itemsGiven} regalati</span>
              <span>{user.karmaPoints} karma</span>
            </div>
          </div>
        </Link>

        <Separator />

        {/* Report */}
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
          <Flag className="h-4 w-4" />
          Segnala questo annuncio
        </button>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-16 left-0 right-0 z-30 border-t bg-card/95 backdrop-blur p-3">
        <div className="mx-auto max-w-lg flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => toast("Chat aperta!")}>
            <MessageCircle className="h-4 w-4 mr-2" />
            Messaggio
          </Button>
          <Button className="flex-1 font-semibold" onClick={() => toast.success("Richiesta inviata!")}>
            Richiedi questo oggetto
          </Button>
        </div>
      </div>
    </div>
  );
}
