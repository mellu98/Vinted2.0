"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Settings, ChevronRight, Heart, Package, Star, LogOut,
  Award, Trophy, Edit, Users,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthStore, useItemsStore } from "@/lib/store";
import { MOCK_REVIEWS } from "@/lib/mock-data";

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const items = useItemsStore((s) => s.items);

  if (!user) {
    router.push("/login");
    return null;
  }

  const myItems = items.filter((i) => i.userId === user.id);
  const myReviews = MOCK_REVIEWS.filter((r) => r.reviewedId === user.id);

  return (
    <div className="mx-auto max-w-lg px-4 py-4">
      {/* User info */}
      <div className="flex items-start gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatarUrl} alt={user.displayName} />
          <AvatarFallback className="text-2xl">{user.displayName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">{user.displayName}</h1>
            {user.isVerified && (
              <Badge variant="secondary" className="text-xs">Verificato</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
          <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold">{user.rating}</span>
            <span className="text-sm text-muted-foreground">({user.reviewCount} recensioni)</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        <Card className="p-3 text-center shadow-none">
          <p className="text-lg font-bold text-primary">{user.itemsGiven}</p>
          <p className="text-[11px] text-muted-foreground">Regalati</p>
        </Card>
        <Card className="p-3 text-center shadow-none">
          <p className="text-lg font-bold">{user.itemsReceived}</p>
          <p className="text-[11px] text-muted-foreground">Ricevuti</p>
        </Card>
        <Card className="p-3 text-center shadow-none">
          <p className="text-lg font-bold text-amber-500">{user.karmaPoints}</p>
          <p className="text-[11px] text-muted-foreground">Karma</p>
        </Card>
        <Card className="p-3 text-center shadow-none">
          <p className="text-lg font-bold">{user.followersCount}</p>
          <p className="text-[11px] text-muted-foreground">Follower</p>
        </Card>
      </div>

      {/* Badges */}
      {user.badges.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5">
            {user.badges.map((badge) => (
              <Badge key={badge} variant="secondary" className="text-xs gap-1">
                <Award className="h-3 w-3 text-amber-500" />
                {badge.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator className="my-5" />

      {/* Menu items */}
      <div className="space-y-1">
        <MenuItem href="/profile/edit" icon={Edit} label="Modifica profilo" />
        <MenuItem href="/profile/favorites" icon={Heart} label="Preferiti" />
        <MenuItem href="/leaderboard" icon={Trophy} label="Classifica karma" />
        <Separator className="my-3" />
        <button
          onClick={() => { logout(); router.push("/"); }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Esci</span>
        </button>
      </div>

      {/* Reviews */}
      {myReviews.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-3">Recensioni recenti</h2>
          <div className="space-y-3">
            {myReviews.slice(0, 3).map((review) => (
              <Card key={review.id} className="p-3 shadow-none">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={review.reviewer.avatarUrl} />
                    <AvatarFallback>{review.reviewer.displayName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{review.reviewer.displayName}</span>
                  <div className="flex ml-auto">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm hover:bg-muted transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <span>{label}</span>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}
