import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "@/app/globals.css";
import { AppProvider } from "@/context/AppStoreContext";
import { NavigationHeader } from "@/components/shared/NavigationHeader";
import { Footer } from "@/components/shared/Footer";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/types/database";
import { NextIntlClientProvider } from 'next-intl';
import esMessages from '../../../messages/es.json';
import enMessages from '../../../messages/en.json';

const messagesMap: Record<Locale, any> = {
  es: esMessages,
  en: enMessages,
};

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://lamentedelguerreromt.com';

  return {
    metadataBase: new URL(baseUrl),
    title: isEs
      ? "La Mente del Guerrero — Diario de 21 Días & Academia de Reprogramación Mental"
      : "The Warrior's Mind — 21-Day Mental Reprogramming Journal & Coaching CRM",
    description: isEs
      ? "21 días para destruir tu viejo piloto automático y construir arquitectura mental de alto rendimiento con el Método PAUSA."
      : "21 days to dismantle your old autopilot and forge high-performance cognitive architecture through the PAUSE methodology.",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es': '/es',
        'en': '/en',
      },
    },
    openGraph: {
      title: isEs ? "La Mente del Guerrero" : "The Warrior's Mind",
      description: isEs
        ? "Diario interactivo de 21 días y mentoría directa."
        : "21-day interactive journal and direct coaching platform.",
      url: baseUrl,
      siteName: "La Mente del Guerrero",
      type: 'website',
      locale: isEs ? 'es_ES' : 'en_US',
    }
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const messages = messagesMap[currentLocale] || esMessages;

  return (
    <html
      lang={currentLocale}
      className={`${cormorant.variable} ${inter.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-[#0A0D0B] text-[#F4F1E8] font-sans selection:bg-[#C7A86A]/20 selection:text-[#C7A86A]">
        <NextIntlClientProvider messages={messages} locale={currentLocale}>
          <AppProvider>
            <NavigationHeader />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
