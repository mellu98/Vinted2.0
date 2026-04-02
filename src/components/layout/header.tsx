"use client";

import Link from "next/link";
import { Bell, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotificationStore } from "@/lib/store";

export function Header() {
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  return (
    <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <Link href="/home" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Gift className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">Gifter</span>
        </Link>

        <Link href="/notifications" className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
}
