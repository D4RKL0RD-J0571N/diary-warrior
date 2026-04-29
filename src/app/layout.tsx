import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import { JournalProvider } from "@/context/JournalContext";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Diario de Reprogramación Mental — La Mente del Guerrero",
  description: "21 días para destruir quien fuiste y construir quien serás.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <JournalProvider>
          <AppShell>{children}</AppShell>
        </JournalProvider>
      </body>
    </html>
  );
}
