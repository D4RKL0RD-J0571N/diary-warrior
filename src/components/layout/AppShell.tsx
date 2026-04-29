"use client";

import React from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { usePathname } from "next/navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // The splash screen, celebration screen, and pricing page don't need the app shell
  const isSplash = pathname === "/";
  const isCelebration = pathname === "/celebration";
  const isPricing = pathname === "/pricing";

  if (isSplash || isCelebration || isPricing) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[280px_1fr] grid-rows-[auto_1fr]">
      <TopBar />
      <Sidebar />
      <main className="overflow-y-auto px-5 py-8 md:py-12 md:px-16 w-full max-w-[800px] justify-self-center">
        {children}
      </main>
    </div>
  );
}
