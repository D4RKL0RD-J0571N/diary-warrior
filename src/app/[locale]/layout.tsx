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
    title: {
      default: isEs
        ? "La Mente del Guerrero — Diario de 21 Días & Academia de Reprogramación Mental"
        : "The Warrior's Mind — 21-Day Mental Reprogramming Journal & Coaching CRM",
      template: isEs ? "%s | La Mente del Guerrero" : "%s | The Warrior's Mind",
    },
    description: isEs
      ? "21 días para destruir tu viejo piloto automático y construir arquitectura mental de alto rendimiento con el Método PAUSA. Día 1 de prueba gratis."
      : "21 days to dismantle your old autopilot and forge high-performance cognitive architecture through the PAUSE methodology. Day 1 free trial.",
    keywords: isEs
      ? [
          "reprogramación mental",
          "la mente del guerrero",
          "método pausa",
          "diario de 21 días",
          "arquitectura cognitiva",
          "desarrollo personal",
          "disciplina mental",
          "hábitos de alto rendimiento",
          "mentoría cognitiva",
          "jafeth lopez",
        ]
      : [
          "mental reprogramming",
          "the warrior's mind",
          "pause method",
          "21 day journal",
          "cognitive architecture",
          "personal development",
          "mental discipline",
          "high performance habits",
          "coaching CRM",
          "jafeth lopez",
        ],
    authors: [{ name: "Jafeth López", url: baseUrl }],
    creator: "Jafeth López",
    publisher: "La Mente del Guerrero",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es': '/es',
        'en': '/en',
      },
    },
    openGraph: {
      title: isEs ? "La Mente del Guerrero — Diario de 21 Días" : "The Warrior's Mind — 21-Day Journal",
      description: isEs
        ? "Destruye quien fuiste. Construye quien serás. Diario interactivo de 21 días y mentoría activa."
        : "Dismantle your old autopilot. Build who you will be. 21-day interactive journal and coaching platform.",
      url: `${baseUrl}/${locale}`,
      siteName: "La Mente del Guerrero",
      locale: isEs ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: isEs ? "La Mente del Guerrero — Diario de 21 Días" : "The Warrior's Mind — 21-Day Journal",
      description: isEs
        ? "21 días para construir arquitectura mental de alto rendimiento con el Método PAUSA."
        : "21 days to forge high-performance cognitive architecture with the PAUSE method.",
      creator: '@lamentedelguerrero',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
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
