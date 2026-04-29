"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface JournalState {
  started: boolean;
  currentDay: number;
  completedDays: number[];
  sidebarOpen: boolean;
  isPaid: boolean;
}

interface JournalContextType {
  state: JournalState;
  setStarted: (started: boolean) => void;
  setCurrentDay: (day: number) => void;
  setCompletedDays: (days: number[]) => void;
  markDayCompleted: (day: number) => void;
  setSidebarOpen: (open: boolean) => void;
  setIsPaid: (isPaid: boolean) => void;
  resetProgress: () => Promise<void>;
}

const defaultState: JournalState = {
  started: false,
  currentDay: 1,
  completedDays: [],
  sidebarOpen: false,
  isPaid: false,
};

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<JournalState>(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);
  const supabase = createClient();

  // Load from local storage initially (for speed and offline support)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lmdg_state");
      if (saved) {
        setState((prev) => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
    setIsHydrated(true);
  }, []);

  // Sync to local storage on change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("lmdg_state", JSON.stringify(state));
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  }, [state, isHydrated]);

  // Optionally load from Supabase if authenticated
  useEffect(() => {
    if (!isHydrated) return;
    
    const fetchProgress = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) return;

      const { data, error } = await supabase
        .from("user_progress")
        .select("current_day, completed_days, is_paid")
        .eq("user_id", session.session.user.id)
        .maybeSingle();

      if (!error && data) {
        setState((prev) => ({
          ...prev,
          currentDay: data.current_day,
          completedDays: data.completed_days,
          isPaid: data.is_paid ?? false,
        }));
      }
    };

    fetchProgress();
  }, [isHydrated, supabase]);

  const setStarted = (started: boolean) => setState((p) => ({ ...p, started }));
  
  const setCurrentDay = async (day: number) => {
    setState((p) => ({ ...p, currentDay: day }));
    const { data: session } = await supabase.auth.getSession();
    if (session?.session?.user) {
      await supabase.rpc('set_current_day', { p_day_number: day });
    }
  };

  const setCompletedDays = (completedDays: number[]) => setState((p) => ({ ...p, completedDays }));
  
  const markDayCompleted = async (day: number) => {
    setState((p) => {
      const newCompleted = p.completedDays.includes(day)
        ? p.completedDays
        : [...p.completedDays, day];
      
      const newCurrent = day >= p.currentDay && day < 21 ? day + 1 : p.currentDay;
      
      return {
        ...p,
        completedDays: newCompleted,
        currentDay: newCurrent,
      };
    });

    const { data: session } = await supabase.auth.getSession();
    if (session?.session?.user) {
      await supabase.rpc('mark_day_completed', { p_day_number: day });
    }
  };

  const setSidebarOpen = (sidebarOpen: boolean) => setState((p) => ({ ...p, sidebarOpen }));
  const setIsPaid = (isPaid: boolean) => setState((p) => ({ ...p, isPaid }));

  const resetProgress = async () => {
    localStorage.removeItem("lmdg_state");
    setState(defaultState);
    
    const { data: session } = await supabase.auth.getSession();
    if (session?.session?.user) {
      await supabase
        .from("user_progress")
        .delete()
        .eq("user_id", session.session.user.id);
      
      await supabase
        .from("journal_entries")
        .delete()
        .eq("user_id", session.session.user.id);
    }
  };

  return (
    <JournalContext.Provider
      value={{
        state,
        setStarted,
        setCurrentDay,
        setCompletedDays,
        markDayCompleted,
        setSidebarOpen,
        setIsPaid,
        resetProgress,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
}
