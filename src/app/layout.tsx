import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Gifter - Regala e Ricevi",
    template: "%s | Gifter",
  },
  description: "Il marketplace dove si regala. Sgombera, dona, ricicla. Trova oggetti gratis vicino a te.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Gifter",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Gifter",
    title: "Gifter - Regala e Ricevi",
    description: "Il marketplace dove si regala. Sgombera, dona, ricicla.",
  },
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
