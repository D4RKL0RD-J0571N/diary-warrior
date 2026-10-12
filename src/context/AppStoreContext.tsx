'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserProgressRecord, JournalEntryRecord, MentorFeedbackRecord, OrderRecord } from '@/types/database';
import { INITIAL_STUDENTS, INITIAL_JOURNAL_ENTRIES, INITIAL_MENTOR_FEEDBACK } from '@/data/mockStore';
import { createClient } from '@/utils/supabase/client';

interface AppContextType {
  currentUser: UserProfile | null;
  progress: UserProgressRecord;
  journalEntries: Record<number, JournalEntryRecord>;
  mentorFeedback: MentorFeedbackRecord[];
  allStudents: (UserProfile & { progress: UserProgressRecord; order: OrderRecord })[];
  isSaving: boolean;
  lastSavedAt: string | null;
  setCurrentUser: (user: UserProfile | null) => void;
  saveJournalEntry: (dayNumber: number, responses: Record<string, string>, isCompleted?: boolean) => Promise<void>;
  markDayAsCompleted: (dayNumber: number) => Promise<void>;
  addMentorFeedback: (userId: string, dayNumber: number, feedback: string) => Promise<void>;
  addPrivateNote: (userId: string, note: string) => Promise<void>;
  grantStudentAccess: (userId: string) => void;
  logout: () => Promise<void>;
}

const defaultProgress: UserProgressRecord = {
  userId: 'user-guest',
  currentDay: 1,
  completedDays: [],
  completedDaysCount: 0,
  isPaid: false, // Day 1 is free; subsequent days require registration & purchase or admin
  isCompleted: false,
  lastActiveAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Current user starts as null (or loaded from session/local storage)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const [studentsList, setStudentsList] = useState(INITIAL_STUDENTS);
  const [progress, setProgress] = useState<UserProgressRecord>(defaultProgress);

  const [entriesMap, setEntriesMap] = useState<Record<number, JournalEntryRecord>>(() => {
    const initialMap: Record<number, JournalEntryRecord> = {};
    INITIAL_JOURNAL_ENTRIES.forEach(entry => {
      initialMap[entry.dayNumber] = entry;
    });
    return initialMap;
  });

  const [feedbackList, setFeedbackList] = useState<MentorFeedbackRecord[]>(INITIAL_MENTOR_FEEDBACK);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  // Check Supabase session on startup and sync state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          const role = profile?.role || (session.user.email?.includes('admin') || session.user.email?.includes('mentor') ? 'ADMIN' : 'STUDENT');

          const userObj: UserProfile = {
            id: session.user.id,
            email: session.user.email || '',
            name: profile?.name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Guerrero',
            role: role as 'STUDENT' | 'ADMIN',
            preferredLanguage: (profile?.preferred_language as 'es' | 'en') || 'es',
            createdAt: session.user.created_at,
            updatedAt: new Date().toISOString(),
          };

          setCurrentUser(userObj);

          // Fetch progress if available
          const { data: dbProgress } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (dbProgress) {
            setProgress({
              userId: dbProgress.user_id,
              currentDay: dbProgress.current_day,
              completedDays: dbProgress.completed_days || [],
              completedDaysCount: dbProgress.completed_days_count || 0,
              isPaid: dbProgress.is_paid || role === 'ADMIN',
              isCompleted: dbProgress.is_completed || false,
              lastActiveAt: dbProgress.last_active_at || new Date().toISOString(),
              updatedAt: dbProgress.updated_at || new Date().toISOString(),
            });
          }
        }
      } catch (err) {
        console.warn('Silent auth check error:', err);
      }
    };

    initAuth();
  }, []);

  // Sync entries and progress with localStorage if available
  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem('warrior_journal_entries');
      if (storedEntries) {
        setEntriesMap(JSON.parse(storedEntries));
      }
      const storedProgress = localStorage.getItem('warrior_user_progress');
      if (storedProgress) {
        setProgress(JSON.parse(storedProgress));
      }
      const storedFeedback = localStorage.getItem('warrior_mentor_feedback');
      if (storedFeedback) {
        setFeedbackList(JSON.parse(storedFeedback));
      }
    } catch (e) {
      // LocalStorage fallback
    }
  }, []);

  const saveJournalEntry = async (dayNumber: number, responses: Record<string, string>, isCompleted = false) => {
    setIsSaving(true);
    const now = new Date().toISOString();

    const updatedEntry: JournalEntryRecord = {
      userId: currentUser?.id || 'guest',
      dayNumber,
      languageUsed: currentUser?.preferredLanguage || 'es',
      responses,
      isCompleted,
      completedAt: isCompleted ? now : entriesMap[dayNumber]?.completedAt,
      updatedAt: now,
    };

    setEntriesMap(prev => {
      const next = { ...prev, [dayNumber]: updatedEntry };
      try {
        localStorage.setItem('warrior_journal_entries', JSON.stringify(next));
      } catch (err) {}
      return next;
    });

    // If logged in to Supabase, sync with database
    if (currentUser?.id) {
      try {
        const supabase = createClient();
        await supabase.from('journal_entries').upsert({
          user_id: currentUser.id,
          day_number: dayNumber,
          language_used: currentUser.preferredLanguage || 'es',
          responses,
          is_completed: isCompleted,
          completed_at: isCompleted ? now : null,
          updated_at: now,
        });
      } catch (e) {
        console.warn('Cloud sync offline fallback');
      }
    }

    setIsSaving(false);
    setLastSavedAt(now);
  };

  const markDayAsCompleted = async (dayNumber: number) => {
    const now = new Date().toISOString();
    setProgress(prev => {
      const completedSet = new Set(prev.completedDays);
      completedSet.add(dayNumber);
      const newCompletedDays = Array.from(completedSet).sort((a, b) => a - b);
      const nextDay = Math.min(21, Math.max(prev.currentDay, dayNumber + 1));

      const nextProgress: UserProgressRecord = {
        ...prev,
        completedDays: newCompletedDays,
        completedDaysCount: newCompletedDays.length,
        currentDay: nextDay,
        isCompleted: newCompletedDays.length >= 21,
        lastActiveAt: now,
        updatedAt: now,
      };

      try {
        localStorage.setItem('warrior_user_progress', JSON.stringify(nextProgress));
      } catch (e) {}

      if (currentUser?.id) {
        try {
          const supabase = createClient();
          supabase.from('user_progress').upsert({
            user_id: currentUser.id,
            current_day: nextDay,
            completed_days: newCompletedDays,
            completed_days_count: newCompletedDays.length,
            is_completed: newCompletedDays.length >= 21,
            last_active_at: now,
            updated_at: now,
          });
        } catch (e) {}
      }

      setStudentsList(currList =>
        currList.map(s => (s.id === currentUser?.id ? { ...s, progress: nextProgress } : s))
      );

      return nextProgress;
    });
  };

  const addMentorFeedback = async (userId: string, dayNumber: number, feedback: string) => {
    const newRecord: MentorFeedbackRecord = {
      id: `fb-${Date.now()}`,
      userId,
      mentorId: currentUser?.id || 'admin-mentor',
      dayNumber,
      mentorFeedback: feedback,
      createdAt: new Date().toISOString(),
    };

    setFeedbackList(prev => {
      const next = [newRecord, ...prev];
      try {
        localStorage.setItem('warrior_mentor_feedback', JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    if (currentUser?.id) {
      try {
        const supabase = createClient();
        await supabase.from('mentor_feedback').insert({
          user_id: userId,
          mentor_id: currentUser.id,
          day_number: dayNumber,
          mentor_feedback: feedback,
        });
      } catch (e) {}
    }
  };

  const addPrivateNote = async (userId: string, note: string) => {
    const newRecord: MentorFeedbackRecord = {
      id: `note-${Date.now()}`,
      userId,
      mentorId: currentUser?.id || 'admin-mentor',
      privateNote: note,
      createdAt: new Date().toISOString(),
    };

    setFeedbackList(prev => {
      const next = [newRecord, ...prev];
      try {
        localStorage.setItem('warrior_mentor_feedback', JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    if (currentUser?.id) {
      try {
        const supabase = createClient();
        await supabase.from('mentor_feedback').insert({
          user_id: userId,
          mentor_id: currentUser.id,
          private_note: note,
        });
      } catch (e) {}
    }
  };

  const grantStudentAccess = (userId: string) => {
    setStudentsList(prev =>
      prev.map(s => {
        if (s.id === userId) {
          return {
            ...s,
            progress: { ...s.progress, isPaid: true },
          };
        }
        return s;
      })
    );
  };

  const logout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {}
    setCurrentUser(null);
    setProgress(defaultProgress);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        progress,
        journalEntries: entriesMap,
        mentorFeedback: feedbackList,
        allStudents: studentsList,
        isSaving,
        lastSavedAt,
        setCurrentUser,
        saveJournalEntry,
        markDayAsCompleted,
        addMentorFeedback,
        addPrivateNote,
        grantStudentAccess,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}
