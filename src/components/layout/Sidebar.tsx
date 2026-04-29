"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useJournal } from "@/context/JournalContext";
import { DAYS } from "@/data/days";
import { UI_CONTENT } from "@/data/ui-content";

export function Sidebar() {
  const { state, setSidebarOpen, resetProgress } = useJournal();
  const pathname = usePathname();

  let currentWeek = 0;

  return (
    <>
      {/* Mobile Overlay */}
      {state.sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-[200] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <nav 
        className={`
          fixed md:sticky top-0 md:top-[60px] left-0 h-screen md:h-[calc(100vh-60px)]
          w-[280px] bg-background-secondary border-r border-border py-6 overflow-y-auto z-[300]
          transition-transform duration-300 ease-in-out
          ${state.sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {DAYS.map((d) => {
          const isNewWeek = d.week !== currentWeek;
          if (isNewWeek) currentWeek = d.week;

          const isCompleted = state.completedDays.includes(d.day);
          const isActive = pathname === `/day/${d.day}`;
          
          // Lock logic: Day is locked if it's beyond progress OR if it's Day 2+ and user hasn't paid
          const isPaywalled = d.day > 1 && !state.isPaid;
          const isLocked = isPaywalled || (d.day > 1 && !state.completedDays.includes(d.day - 1) && !isActive && state.currentDay < d.day);

          return (
            <React.Fragment key={d.day}>
              {isNewWeek && (
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand font-semibold px-6 pt-4 pb-2 first:mt-0 mt-2">
                  {UI_CONTENT.sidebar.week} {d.week}
                </p>
              )}

              {isLocked ? (
                <button 
                  disabled
                  className="w-full bg-transparent border-none py-2.5 px-6 flex items-center gap-3 cursor-not-allowed opacity-35 text-left"
                >
                  <span className="text-[0.7rem] font-semibold text-surface-gray-dim min-w-[28px] tabular-nums">
                    {String(d.day).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-surface-gray leading-snug font-normal">
                    {d.title}
                  </span>
                  {isPaywalled ? (
                    <span className="ml-auto text-[10px] opacity-60">🔒</span>
                  ) : (
                    <span className="ml-auto w-4 h-4 rounded-full border border-border shrink-0" />
                  )}
                </button>
              ) : (
                <Link
                  href={`/day/${d.day}`}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    w-full py-2.5 px-6 flex items-center gap-3 transition-colors duration-150 text-left
                    ${isActive ? "bg-background-quaternary border-r-2 border-brand" : "hover:bg-background-tertiary"}
                  `}
                >
                  <span className={`text-[0.7rem] font-semibold min-w-[28px] tabular-nums ${(isActive || isCompleted) ? "text-brand" : "text-surface-gray-dim"}`}>
                    {String(d.day).padStart(2, "0")}
                  </span>
                  <span className={`text-sm leading-snug ${isActive ? "text-surface-white font-medium" : "text-surface-gray font-normal"}`}>
                    {d.title}
                  </span>
                  <span className={`ml-auto w-4 h-4 rounded-full border shrink-0 flex items-center justify-center
                    ${isCompleted ? "bg-brand border-brand" : "border-border"}
                  `}>
                    {isCompleted && <span className="text-black text-[9px] font-bold">✓</span>}
                  </span>
                </Link>
              )}
            </React.Fragment>
          );
        })}

        {/* Reset Progress Button (Helpful for testing and user restarts) */}
        <div className="mt-auto px-6 pt-12 pb-4">
          <button 
            onClick={async () => {
              if (confirm("¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.")) {
                await resetProgress();
                window.location.href = "/";
              }
            }}
            className="text-[0.65rem] tracking-[0.1em] uppercase text-surface-gray-dim hover:text-brand transition-colors cursor-pointer bg-transparent border-none p-0 text-left font-medium"
          >
            Reiniciar mi progreso
          </button>
        </div>
      </nav>
    </>
  );
}
