import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://lamentedelguerreromt.com'),
  title: "La Mente del Guerrero",
  description: "21-Day Mental Reprogramming Journal & Coaching CRM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
