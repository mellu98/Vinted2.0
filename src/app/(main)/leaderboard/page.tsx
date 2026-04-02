"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trophy, Award, Star, Crown, Medal } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MOCK_USERS, CURRENT_USER } from "@/lib/mock-data";

export default function LeaderboardPage() {
  const router = useRouter();
  const ranked = [...MOCK_USERS].sort((a, b) => b.karmaPoints - a.karmaPoints);
  const currentRank = ranked.findIndex((u) => u.id === CURRENT_USER.id) + 1;

  return (
    <div className="mx-auto max-w-lg px-4 py-4">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Classifica Karma</h1>
      </div>

      {/* Top 3 podium */}
      <div className="flex items-end justify-center gap-3 mb-6 pt-4">
        {/* 2nd place */}
        {ranked[1] && (
          <PodiumUser user={ranked[1]} rank={2} height="h-20" />
        )}
        {/* 1st place */}
        {ranked[0] && (
          <PodiumUser user={ranked[0]} rank={1} height="h-28" />
        )}
        {/* 3rd place */}
        {ranked[2] && (
          <PodiumUser user={ranked[2]} rank={3} height="h-16" />
        )}
      </div>

      {/* My position */}
      <Card className="p-3 mb-4 border-primary/30 bg-primary/5 shadow-none">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-primary w-6 text-center">#{currentRank}</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src={CURRENT_USER.avatarUrl} />
            <AvatarFallback>{CURRENT_USER.displayName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-semibold">Tu</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-amber-500">{CURRENT_USER.karmaPoints}</p>
            <p className="text-[10px] text-muted-foreground">punti</p>
          </div>
        </div>
      </Card>

      {/* Full ranking */}
      <div className="space-y-1">
        {ranked.map((user, i) => (
          <Link
            key={user.id}
            href={`/user/${user.id}`}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50",
              user.id === CURRENT_USER.id && "bg-primary/5"
            )}
          >
            <span className="text-sm font-bold text-muted-foreground w-6 text-center">
              {i + 1}
            </span>
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatarUrl} alt={user.displayName} />
              <AvatarFallback>{user.displayName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium truncate">{user.displayName}</span>
                {user.isVerified && <Badge variant="secondary" className="text-[9px] px-1 py-0">V</Badge>}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{user.itemsGiven} regalati</span>
                <span className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {user.rating}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-amber-500">{user.karmaPoints}</p>
              <p className="text-[10px] text-muted-foreground">karma</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PodiumUser({ user, rank, height }: { user: typeof MOCK_USERS[0]; rank: number; height: string }) {
  const rankIcons: Record<number, React.ReactNode> = {
    1: <Crown className="h-5 w-5 text-amber-400" />,
    2: <Medal className="h-4 w-4 text-gray-400" />,
    3: <Medal className="h-4 w-4 text-amber-600" />,
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {rankIcons[rank]}
        <Avatar className={cn("mt-1", rank === 1 ? "h-16 w-16 ring-2 ring-amber-400" : "h-12 w-12")}>
          <AvatarImage src={user.avatarUrl} alt={user.displayName} />
          <AvatarFallback>{user.displayName[0]}</AvatarFallback>
        </Avatar>
      </div>
      <p className="text-xs font-semibold mt-1 truncate max-w-[80px] text-center">
        {user.displayName.split(" ")[0]}
      </p>
      <p className="text-xs font-bold text-amber-500">{user.karmaPoints}</p>
      <div className={cn("w-20 rounded-t-lg bg-primary/10 mt-1", height)} />
    </div>
  );
}
