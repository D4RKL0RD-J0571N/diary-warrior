"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useJournal } from "@/context/JournalContext";

import { UI_CONTENT } from "@/data/ui-content";

export default function SplashPage() {
  const router = useRouter();
  const { state, setStarted } = useJournal();

  const handleStart = () => {
    setStarted(true);
    router.push(`/day/${state.currentDay}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden bg-background">
      {/* Decorative Circles */}
      <div className="absolute w-[600px] h-[600px] border border-brand/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-[800px] h-[800px] border border-brand/[0.03] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Symbol */}
      <div className="w-[72px] h-[72px] border-2 border-brand rounded-full flex items-center justify-center mx-auto mb-8 relative">
        <div className="absolute w-[48px] h-[48px] border border-border-brand rounded-full" />
        <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] fill-brand z-10">
          <path d="M12 2L13.09 8.26L19 7L15.5 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L8.5 12L5 7L10.91 8.26L12 2Z"/>
        </svg>
      </div>

      <p className="font-display text-base md:text-[1.2rem] tracking-[0.25em] uppercase text-brand mb-6">
        {UI_CONTENT.splash.brand}
      </p>
      
      <h1 className="font-display text-[2.5rem] md:text-[5rem] font-bold text-surface-white leading-[1.1] mb-3">
        {UI_CONTENT.splash.title[0]}<br/>{UI_CONTENT.splash.title[1]}<br/>{UI_CONTENT.splash.title[2]}
      </h1>
      
      <p className="font-display text-[1rem] md:text-[1.3rem] text-surface-gray italic mb-2">
        {UI_CONTENT.splash.subtitle}
      </p>
      
      <p className="font-sans text-[0.85rem] tracking-[0.2em] uppercase text-brand font-medium mb-12">
        — {UI_CONTENT.splash.author} —
      </p>
      
      <button 
        onClick={handleStart}
        className="bg-brand text-black border-none py-4 px-10 font-sans text-[0.9rem] font-semibold tracking-[0.1em] uppercase cursor-pointer transition-all duration-200 hover:bg-[#22b885] hover:-translate-y-[1px] active:translate-y-0 z-10"
      >
        {UI_CONTENT.splash.button}
      </button>
    </div>
  );
}
