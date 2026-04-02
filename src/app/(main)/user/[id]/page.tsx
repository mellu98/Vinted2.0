"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, Award, MapPin, Calendar } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ItemGrid } from "@/components/items/item-grid";
import { useItemsStore } from "@/lib/store";
import { MOCK_USERS } from "@/lib/mock-data";

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const items = useItemsStore((s) => s.items);
  const user = MOCK_USERS.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[50vh]">
        <p className="font-medium">Utente non trovato</p>
        <Button variant="outline" className="mt-4" onClick={() => router.back()}>
          Torna indietro
        </Button>
      </div>
    );
  }

  const userItems = items.filter((i) => i.userId === user.id && i.status === "active");

  return (
    <div className="mx-auto max-w-lg px-4 py-4">
      <Button variant="ghost" size="icon" onClick={() => router.back()} className="mb-2">
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <div className="flex items-start gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatarUrl} alt={user.displayName} />
          <AvatarFallback className="text-2xl">{user.displayName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">{user.displayName}</h1>
            {user.isVerified && <Badge variant="secondary" className="text-xs">Verificato</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{user.locationName}</span>
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold">{user.rating}</span>
            <span className="text-sm text-muted-foreground">({user.reviewCount})</span>
          </div>
        </div>
      </div>

      {user.bio && <p className="text-sm text-muted-foreground mt-3">{user.bio}</p>}

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        <Card className="p-2.5 text-center shadow-none">
          <p className="text-lg font-bold text-primary">{user.itemsGiven}</p>
          <p className="text-[10px] text-muted-foreground">Regalati</p>
        </Card>
        <Card className="p-2.5 text-center shadow-none">
          <p className="text-lg font-bold text-amber-500">{user.karmaPoints}</p>
          <p className="text-[10px] text-muted-foreground">Karma</p>
        </Card>
        <Card className="p-2.5 text-center shadow-none">
          <p className="text-lg font-bold">{user.followersCount}</p>
          <p className="text-[10px] text-muted-foreground">Follower</p>
        </Card>
        <Card className="p-2.5 text-center shadow-none">
          <p className="text-lg font-bold">{user.followingCount}</p>
          <p className="text-[10px] text-muted-foreground">Seguiti</p>
        </Card>
      </div>

      <div className="flex gap-2 mt-4">
        <Button className="flex-1 font-semibold">Segui</Button>
        <Button variant="outline" className="flex-1">Messaggio</Button>
      </div>

      {/* Badges */}
      {user.badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {user.badges.map((badge) => (
            <Badge key={badge} variant="secondary" className="text-xs gap-1">
              <Award className="h-3 w-3 text-amber-500" />
              {badge.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
            </Badge>
          ))}
        </div>
      )}

      <Separator className="my-5" />

      <h2 className="font-semibold mb-3">Annunci di {user.displayName.split(" ")[0]} ({userItems.length})</h2>
      {userItems.length > 0 ? (
        <ItemGrid items={userItems} />
      ) : (
        <p className="text-sm text-muted-foreground text-center py-8">Nessun annuncio attivo</p>
      )}
    </div>
  );
}
