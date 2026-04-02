"use client";

import Link from "next/link";
import { Gift, Heart, Leaf, Users, ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-green-700 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="relative mx-auto max-w-lg px-6 pb-16 pt-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <Gift className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">Gifter</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Regala. Ricevi.
            <br />
            <span className="text-green-200">Ricicla.</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-green-100">
            Il marketplace dove non si vende, si regala. Dai nuova vita alle cose
            che non usi e trova tesori nascosti vicino a te.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/home"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-white text-primary font-semibold hover:bg-green-50 shadow-lg"
              )}
            >
              Inizia a esplorare
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur"
              )}
            >
              Crea un account
            </Link>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="mx-auto max-w-lg px-6 py-12">
        <h2 className="text-center text-2xl font-bold">Come funziona</h2>
        <div className="mt-8 grid gap-6">
          <FeatureCard
            icon={<Gift className="h-6 w-6 text-primary" />}
            title="Regala quello che non usi"
            description="Scatta una foto, aggiungi una descrizione e pubblica. Qualcuno ne avra bisogno!"
          />
          <FeatureCard
            icon={<Heart className="h-6 w-6 text-red-500" />}
            title="Trova tesori gratis"
            description="Sfoglia gli annunci vicino a te e richiedi gratuitamente gli oggetti che ti servono."
          />
          <FeatureCard
            icon={<Sparkles className="h-6 w-6 text-amber-500" />}
            title="Offerta libera"
            description="Vuoi ringraziare chi regala? Puoi fare un'offerta libera, ma non e obbligatorio."
          />
          <FeatureCard
            icon={<Users className="h-6 w-6 text-blue-500" />}
            title="Comunita generosa"
            description="Guadagna punti karma, badge e scala la classifica dei piu generosi!"
          />
          <FeatureCard
            icon={<Leaf className="h-6 w-6 text-green-600" />}
            title="Salva il pianeta"
            description="Ogni oggetto regalato e un oggetto in meno in discarica. Insieme facciamo la differenza."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 py-12">
        <div className="mx-auto max-w-lg px-6 text-center">
          <h2 className="text-2xl font-bold">Pronto a regalare?</h2>
          <p className="mt-2 text-muted-foreground">
            Unisciti a migliaia di persone che rendono il mondo un posto migliore.
          </p>
          <Link
            href="/home"
            className={cn(buttonVariants({ size: "lg" }), "mt-6 shadow-lg")}
          >
            Esplora Gifter
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="mx-auto max-w-lg px-6 text-center text-sm text-muted-foreground">
          <p>Gifter - Il marketplace del regalo</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
