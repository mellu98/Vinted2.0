"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotificationStore } from "@/lib/store";

const NAV_ITEMS = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/search", label: "Cerca", icon: Search },
  { href: "/item/new", label: "Regala", icon: PlusCircle },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/profile", label: "Profilo", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 pb-safe">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          const isCreate = href === "/item/new";
          const isChat = href === "/chat";

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 text-xs transition-colors relative",
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isCreate ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg -mt-5">
                  <Icon className="h-5 w-5" />
                </div>
              ) : (
                <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
              )}
              {isChat && unreadCount > 0 && (
                <span className="absolute -top-0.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
              <span className={cn(isCreate && "mt-1")}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
