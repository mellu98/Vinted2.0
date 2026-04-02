"use client";

import { use, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, CURRENT_USER } from "@/lib/mock-data";
import type { Message } from "@/types";

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES[id] || []);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = MOCK_CONVERSATIONS.find((c) => c.id === id);
  const otherUser = conversation?.participants.find((u) => u.id !== CURRENT_USER.id) || conversation?.participants[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: id,
      senderId: CURRENT_USER.id,
      content: input.trim(),
      isSystem: false,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  if (!conversation || !otherUser) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Conversazione non trovata</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem-5rem)] mx-auto max-w-lg">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-2 border-b bg-card shrink-0">
        <Button variant="ghost" size="icon" className="shrink-0 -ml-2" onClick={() => router.push("/chat")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-9 w-9">
          <AvatarImage src={otherUser.avatarUrl} alt={otherUser.displayName} />
          <AvatarFallback>{otherUser.displayName[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold truncate">{otherUser.displayName}</p>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </div>

      {/* Item context */}
      {conversation.item && (
        <div className="px-4 py-2 border-b bg-muted/30 shrink-0">
          <Card className="flex items-center gap-3 p-2 shadow-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={conversation.item.images[0]} alt="" className="h-10 w-10 rounded-md object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium truncate">{conversation.item.title}</p>
              <p className="text-[10px] text-primary font-semibold">
                {conversation.item.listingType === "free" ? "GRATIS" : "OFFERTA LIBERA"}
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {messages.map((msg) => {
          const isMe = msg.senderId === CURRENT_USER.id;
          return (
            <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm",
                  isMe
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted rounded-bl-md"
                )}
              >
                <p>{msg.content}</p>
                <p className={cn(
                  "text-[10px] mt-0.5",
                  isMe ? "text-primary-foreground/60" : "text-muted-foreground"
                )}>
                  {new Date(msg.createdAt).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t bg-card px-4 py-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Input
            placeholder="Scrivi un messaggio..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button size="icon" disabled={!input.trim()} onClick={handleSend} className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
