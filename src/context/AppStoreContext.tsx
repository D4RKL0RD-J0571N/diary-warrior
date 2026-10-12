'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserProgressRecord, JournalEntryRecord, MentorFeedbackRecord, OrderRecord, Locale } from '@/types/database';
import { INITIAL_STUDENTS, INITIAL_JOURNAL_ENTRIES, INITIAL_MENTOR_FEEDBACK } from '@/data/mockStore';

interface AppContextType {
  currentUser: UserProfile | null;
  progress: UserProgressRecord;
  journalEntries: Record<number, JournalEntryRecord>;
  mentorFeedback: MentorFeedbackRecord[];
  allStudents: (UserProfile & { progress: UserProgressRecord; order: OrderRecord })[];
  isSaving: boolean;
  lastSavedAt: string | null;
  isEditMode: boolean;
  toggleEditMode: () => void;
  updateTranslation: (locale: Locale, keyPath: string, newValue: string) => Promise<boolean>;
  setCurrentUser: (user: UserProfile | null) => void;
  saveJournalEntry: (dayNumber: number, responses: Record<string, string>, isCompleted?: boolean) => Promise<void>;
  markDayAsCompleted: (dayNumber: number) => Promise<void>;
  addMentorFeedback: (userId: string, dayNumber: number, feedback: string) => Promise<void>;
  addPrivateNote: (userId: string, note: string) => Promise<void>;
  grantStudentAccess: (userId: string) => void;
  switchUserRole: (role: 'STUDENT' | 'ADMIN') => void;
}

const defaultProgress: UserProgressRecord = {
  userId: 'user-student-1',
  currentDay: 1,
  completedDays: [],
  completedDaysCount: 0,
  isPaid: true,
  isCompleted: false,
  lastActiveAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Current user (defaults to Demo Student)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    id: 'user-student-1',
    email: 'carlos.mendoza@example.com',
    name: 'Carlos Mendoza',
    role: 'STUDENT',
    preferredLanguage: 'es',
    createdAt: '2026-03-20T10:00:00Z',
    updatedAt: new Date().toISOString(),
  });

  const [studentsList, setStudentsList] = useState(INITIAL_STUDENTS);
  const [progress, setProgress] = useState<UserProgressRecord>(() => {
    const student = INITIAL_STUDENTS[0];
    return student ? student.progress : defaultProgress;
  });

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
  const [isEditMode, setIsEditMode] = useState(false);

  // Sync entries and progress with localStorage if available for persistence across browser reloads
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
      const storedEditMode = localStorage.getItem('warrior_edit_mode');
      if (storedEditMode === 'true') {
        setIsEditMode(true);
      }
    } catch (e) {
      // LocalStorage quiet fallback
    }
  }, []);

  const toggleEditMode = () => {
    setIsEditMode(prev => {
      const next = !prev;
      try {
        localStorage.setItem('warrior_edit_mode', String(next));
      } catch (e) {}
      return next;
    });
  };

  const updateTranslation = async (locale: Locale, keyPath: string, newValue: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale, keyPath, value: newValue })
      });
      return res.ok;
    } catch (e) {
      console.error('Failed to update translation:', e);
      return false;
    }
  };

  const saveJournalEntry = async (dayNumber: number, responses: Record<string, string>, isCompleted = false) => {
    setIsSaving(true);
    const now = new Date().toISOString();
    
    // Cloud sync simulation with high resilience
    await new Promise(r => setTimeout(r, 450));

    const updatedEntry: JournalEntryRecord = {
      userId: currentUser?.id || 'guest',
      dayNumber,
      languageUsed: currentUser?.preferredLanguage || 'es',
      responses,
      isCompleted,
      completedAt: isCompleted ? now : entriesMap[dayNumber]?.completedAt,
      updatedAt: now
    };

    setEntriesMap(prev => {
      const next = { ...prev, [dayNumber]: updatedEntry };
      try {
        localStorage.setItem('warrior_journal_entries', JSON.stringify(next));
      } catch (err) {}
      return next;
    });

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
        updatedAt: now
      };

      try {
        localStorage.setItem('warrior_user_progress', JSON.stringify(nextProgress));
      } catch (e) {}

      // Update in student directory list
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
      createdAt: new Date().toISOString()
    };

    setFeedbackList(prev => {
      const next = [newRecord, ...prev];
      try {
        localStorage.setItem('warrior_mentor_feedback', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const addPrivateNote = async (userId: string, note: string) => {
    const newRecord: MentorFeedbackRecord = {
      id: `note-${Date.now()}`,
      userId,
      mentorId: currentUser?.id || 'admin-mentor',
      privateNote: note,
      createdAt: new Date().toISOString()
    };

    setFeedbackList(prev => {
      const next = [newRecord, ...prev];
      try {
        localStorage.setItem('warrior_mentor_feedback', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const grantStudentAccess = (userId: string) => {
    setStudentsList(prev =>
      prev.map(s => {
        if (s.id === userId) {
          return {
            ...s,
            progress: { ...s.progress, isPaid: true }
          };
        }
        return s;
      })
    );
  };

  const switchUserRole = (role: 'STUDENT' | 'ADMIN') => {
    if (role === 'ADMIN') {
      setCurrentUser({
        id: 'admin-mentor-jafeth',
        email: 'jafeth.mentor@warriorsmind.com',
        name: 'Jafeth López (Mentor)',
        role: 'ADMIN',
        preferredLanguage: 'es',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      });
    } else {
      setCurrentUser({
        id: 'user-student-1',
        email: 'carlos.mendoza@example.com',
        name: 'Carlos Mendoza',
        role: 'STUDENT',
        preferredLanguage: 'es',
        createdAt: '2026-03-20T10:00:00Z',
        updatedAt: new Date().toISOString()
      });
    }
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
        isEditMode,
        toggleEditMode,
        updateTranslation,
        setCurrentUser,
        saveJournalEntry,
        markDayAsCompleted,
        addMentorFeedback,
        addPrivateNote,
        grantStudentAccess,
        switchUserRole
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
