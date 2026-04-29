"use client";

import React from "react";
import { useJournal } from "@/context/JournalContext";
import { Menu } from "lucide-react";

import { UI_CONTENT } from "@/data/ui-content";

export function TopBar() {
  const { state, setSidebarOpen } = useJournal();
  const count = state.completedDays.length;
  const progressPct = (count / 21) * 100;

  return (
    <header className="col-span-full bg-background-secondary border-b border-border py-3.5 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="font-display text-base font-semibold text-surface-white flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" className="fill-brand shrink-0">
          <path d="M12 2L13.09 8.26L19 7L15.5 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L8.5 12L5 7L10.91 8.26L12 2Z"/>
        </svg>
        <span>La Mente del <span className="text-brand">Guerrero</span></span>
      </div>

      <div className="hidden md:flex items-center gap-4 flex-1 max-w-[360px] mx-auto">
        <span className="text-xs text-surface-gray whitespace-nowrap font-medium">
          {count} {UI_CONTENT.topBar.progressSuffix}
        </span>
        <div className="flex-1 h-[3px] bg-background-quaternary rounded-[2px] overflow-hidden">
          <div 
            className="h-full bg-brand rounded-[2px] transition-all duration-500 ease-out" 
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <button 
        className="md:hidden text-surface-white p-1"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={22} />
      </button>
    </header>
  );
}
