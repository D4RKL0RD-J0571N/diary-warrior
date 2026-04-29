"use client";

import React from "react";
import { useJournal } from "@/context/JournalContext";
import { UI_CONTENT } from "@/data/ui-content";

export default function CelebrationPage() {
  const { state } = useJournal();
  const daysCompleted = state.completedDays.length;

  return (
    <div className="min-h-screen py-20 px-8 max-w-[700px] mx-auto text-center animate-in fade-in duration-700">
      <div className="w-[80px] h-[80px] border-2 border-brand rounded-full flex items-center justify-center mx-auto mb-8">
        <svg viewBox="0 0 24 24" className="w-[36px] h-[36px] fill-brand">
          <path d="M12 2L13.09 8.26L19 7L15.5 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L8.5 12L5 7L10.91 8.26L12 2Z"/>
        </svg>
      </div>
      
      <p className="text-[0.75rem] tracking-[0.2em] uppercase text-brand font-semibold mb-4">
        {UI_CONTENT.celebration.brand}
      </p>
      
      <h2 className="font-display text-[2rem] md:text-[3.8rem] font-bold text-surface-white leading-[1.1] mb-6">
        {UI_CONTENT.celebration.title[0]}<br/>{UI_CONTENT.celebration.title[1]}
      </h2>
      
      <p className="font-display text-[1.05rem] italic text-surface-gray leading-[1.85] mb-12">
        {UI_CONTENT.celebration.quote}
      </p>

      <div className="grid grid-cols-7 gap-2 my-10 max-w-[400px] mx-auto">
        {Array.from({ length: 21 }, (_, i) => {
          const isCompleted = state.completedDays.includes(i + 1);
          return (
            <div 
              key={i} 
              className={`aspect-square rounded-full flex items-center justify-center text-[0.75rem] font-semibold transition-all duration-500
                ${isCompleted ? 'bg-brand-glow border border-border-brand text-brand' : 'border border-border text-surface-gray-dim'}`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>

      <p className="text-surface-gray text-[0.85rem] mt-6 mb-12">
        {UI_CONTENT.celebration.progressLabel(daysCompleted)}
      </p>

      <div className="mt-12 p-10 border border-border-brand bg-background-tertiary">
        <h3 className="font-display text-[1.4rem] text-surface-white mb-4">
          {UI_CONTENT.celebration.nextLevelTitle}
        </h3>
        <p className="text-surface-gray mb-6 text-[0.95rem] leading-[1.6]">
          {UI_CONTENT.celebration.nextLevelDesc}
        </p>
        <button 
          onClick={() => window.open('https://instagram.com', '_blank')}
          className="bg-brand text-black border-none py-3.5 px-8 font-sans text-[0.9rem] font-semibold tracking-[0.1em] uppercase cursor-pointer transition-all duration-200 hover:bg-[#22b885]"
        >
          {UI_CONTENT.celebration.button}
        </button>
      </div>

      <p className="mt-12 text-surface-gray-dim text-[0.8rem] leading-relaxed">
        {UI_CONTENT.celebration.footer[0]}<br/>
        {UI_CONTENT.celebration.footer[1]}
      </p>
    </div>
  );
}
