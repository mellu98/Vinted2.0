"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MOCK_CONVERSATIONS, CURRENT_USER } from "@/lib/mock-data";

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}g`;
}

export default function ChatListPage() {
  return (
    <div className="mx-auto max-w-lg">
      <div className="px-4 py-4">
        <h1 className="text-xl font-bold">Messaggi</h1>
      </div>

      {MOCK_CONVERSATIONS.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center px-4">
          <MessageCircle className="h-16 w-16 text-muted-foreground/20 mb-4" />
          <p className="font-medium">Nessun messaggio</p>
          <p className="text-sm text-muted-foreground mt-1">
            Quando contatterai qualcuno, la conversazione apparira qui
          </p>
        </div>
      ) : (
        <div className="divide-y">
          {MOCK_CONVERSATIONS.map((conv) => {
            const otherUser = conv.participants.find((u) => u.id !== CURRENT_USER.id) || conv.participants[0];
            const lastMsg = conv.lastMessage;
            const isUnread = conv.unreadCount > 0;

            return (
              <Link
                key={conv.id}
                href={`/chat/${conv.id}`}
                className={cn(
                  "flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors",
                  isUnread && "bg-primary/5"
                )}
              >
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarImage src={otherUser.avatarUrl} alt={otherUser.displayName} />
                  <AvatarFallback>{otherUser.displayName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-sm", isUnread ? "font-bold" : "font-medium")}>
                      {otherUser.displayName}
                    </span>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {lastMsg && timeAgo(lastMsg.createdAt)}
                    </span>
                  </div>
                  {conv.item && (
                    <p className="text-xs text-primary truncate">{conv.item.title}</p>
                  )}
                  {lastMsg && (
                    <p className={cn(
                      "text-sm truncate mt-0.5",
                      isUnread ? "text-foreground font-medium" : "text-muted-foreground"
                    )}>
                      {lastMsg.senderId === CURRENT_USER.id && "Tu: "}
                      {lastMsg.content}
                    </p>
                  )}
                </div>
                {isUnread && (
                  <Badge className="mt-2 h-5 min-w-5 rounded-full px-1.5 text-[10px] font-bold bg-primary text-primary-foreground shrink-0">
                    {conv.unreadCount}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
