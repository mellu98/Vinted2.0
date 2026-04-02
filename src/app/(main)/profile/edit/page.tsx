"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/store";
import { toast } from "sonner";

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [location, setLocation] = useState(user?.locationName || "");

  if (!user) return null;

  const handleSave = () => {
    login({ ...user, displayName, bio, locationName: location });
    toast.success("Profilo aggiornato!");
    router.back();
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-4">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Modifica profilo</h1>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatarUrl} alt={user.displayName} />
            <AvatarFallback className="text-3xl">{user.displayName[0]}</AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
            <Camera className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Nome</label>
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Bio</label>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} maxLength={200} />
          <span className="text-xs text-muted-foreground mt-1 block">{bio.length}/200</span>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Posizione</label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Es: Milano, Navigli" />
        </div>
        <Button onClick={handleSave} className="w-full font-semibold" size="lg">
          Salva modifiche
        </Button>
      </div>
    </div>
  );
}
