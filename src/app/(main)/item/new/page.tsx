"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, X, MapPin, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/mock-data";
import { ITEM_CONDITIONS, type ItemCondition } from "@/types";
import { useItemsStore, useAuthStore } from "@/lib/store";
import { toast } from "sonner";

export default function NewItemPage() {
  const router = useRouter();
  const addItem = useItemsStore((s) => s.addItem);
  const user = useAuthStore((s) => s.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState<ItemCondition | "">("");
  const [categoryId, setCategoryId] = useState("");
  const [isOffertaLibera, setIsOffertaLibera] = useState(false);
  const [location, setLocation] = useState(user?.locationName || "");
  const [images, setImages] = useState<string[]>([]);

  const addMockImage = () => {
    const seed = Math.random().toString(36).substring(7);
    setImages((prev) => [...prev, `https://picsum.photos/seed/${seed}/400/400`]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title || !description || !condition || !categoryId || images.length === 0) {
      toast.error("Compila tutti i campi e aggiungi almeno una foto");
      return;
    }
    if (!user) return;

    const category = CATEGORIES.find((c) => c.id === categoryId)!;
    addItem({
      id: `item-${Date.now()}`,
      userId: user.id,
      user,
      title,
      description,
      condition: condition as ItemCondition,
      status: "active",
      listingType: isOffertaLibera ? "offerta_libera" : "free",
      categoryId,
      category,
      images,
      locationName: location,
      viewCount: 0,
      favoriteCount: 0,
      requestCount: 0,
      createdAt: new Date().toISOString(),
    });

    toast.success("Annuncio pubblicato!");
    router.push("/home");
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-4 pb-24">
      <h1 className="text-xl font-bold mb-4">Regala qualcosa</h1>

      {/* Images */}
      <div className="mb-6">
        <label className="text-sm font-medium mb-2 block">Foto</label>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={addMockImage}
            className="flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/5 transition-colors"
          >
            <Camera className="h-6 w-6" />
            <span className="text-[10px] font-medium">Aggiungi</span>
          </button>
          {images.map((img, i) => (
            <div key={i} className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="h-full w-full object-cover" />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <X className="h-3 w-3" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-primary/80 text-[9px] text-white text-center py-0.5 font-medium">
                  Copertina
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-1.5 block">Titolo</label>
        <Input
          placeholder="Es: Giacca invernale Zara taglia M"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
        />
        <span className="text-xs text-muted-foreground mt-1 block">{title.length}/100</span>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-1.5 block">Descrizione</label>
        <Textarea
          placeholder="Descrivi l'oggetto, le sue condizioni, perche lo regali..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          maxLength={1000}
        />
        <span className="text-xs text-muted-foreground mt-1 block">{description.length}/1000</span>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-2 block">Categoria</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryId(cat.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                categoryId === cat.id
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border hover:border-primary/40"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-2 block">Condizione</label>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(ITEM_CONDITIONS) as [ItemCondition, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCondition(key)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                condition === key
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border hover:border-primary/40"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <Separator className="my-5" />

      {/* Location */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-1.5 block">Posizione</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Es: Milano, Navigli"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Offerta libera toggle */}
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">Offerta libera</span>
              <Info className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Permetti a chi riceve di fare una donazione volontaria
            </p>
          </div>
          <Switch checked={isOffertaLibera} onCheckedChange={setIsOffertaLibera} />
        </div>
      </Card>

      {/* Submit */}
      <Button onClick={handleSubmit} className="w-full font-semibold" size="lg">
        Pubblica annuncio
      </Button>
    </div>
  );
}
