"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/mock-data";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Shirt: Icons.Shirt,
  Smartphone: Icons.Smartphone,
  Home: Icons.Home,
  BookOpen: Icons.BookOpen,
  Dumbbell: Icons.Dumbbell,
  Gamepad2: Icons.Gamepad2,
  Music: Icons.Music,
  Bike: Icons.Bike,
  PawPrint: Icons.PawPrint,
  Package: Icons.Package,
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-4">
      <h1 className="text-xl font-bold mb-4">Categorie</h1>
      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => {
          const CatIcon = iconMap[cat.icon] || Icons.Package;
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CatIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">{cat.itemCount} annunci</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
