"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, Gift, MessageCircle, Star, Award, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNotificationStore } from "@/lib/store";
import type { NotificationType } from "@/types";

const ICON_MAP: Record<NotificationType, { icon: React.ElementType; color: string }> = {
  item_requested: { icon: Gift, color: "text-primary bg-primary/10" },
  request_approved: { icon: Check, color: "text-green-600 bg-green-100" },
  request_declined: { icon: Gift, color: "text-red-500 bg-red-100" },
  new_message: { icon: MessageCircle, color: "text-blue-500 bg-blue-100" },
  pickup_reminder: { icon: MapPin, color: "text-orange-500 bg-orange-100" },
  review_received: { icon: Star, color: "text-amber-500 bg-amber-100" },
  karma_milestone: { icon: Award, color: "text-purple-500 bg-purple-100" },
  badge_earned: { icon: Award, color: "text-amber-500 bg-amber-100" },
  nearby_item: { icon: MapPin, color: "text-primary bg-primary/10" },
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m fa`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h fa`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}g fa`;
}

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotificationStore();

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Notifiche</h1>
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-primary text-xs">
            Segna tutto come letto
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center px-4">
          <Bell className="h-16 w-16 text-muted-foreground/20 mb-4" />
          <p className="font-medium">Nessuna notifica</p>
          <p className="text-sm text-muted-foreground mt-1">Le tue notifiche appariranno qui</p>
        </div>
      ) : (
        <div className="divide-y">
          {notifications.map((notif) => {
            const config = ICON_MAP[notif.type];
            const Icon = config?.icon || Bell;
            const colorClass = config?.color || "text-muted-foreground bg-muted";

            return (
              <button
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={cn(
                  "flex items-start gap-3 w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors",
                  !notif.isRead && "bg-primary/5"
                )}
              >
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", colorClass)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm", !notif.isRead && "font-semibold")}>{notif.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{notif.body}</p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">{timeAgo(notif.createdAt)}</p>
                </div>
                {!notif.isRead && (
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
