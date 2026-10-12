import { UserProfile, UserProgressRecord, JournalEntryRecord, OrderRecord, MentorFeedbackRecord } from '@/types/database';

export const INITIAL_STUDENTS: (UserProfile & { progress: UserProgressRecord; order: OrderRecord })[] = [
  {
    id: "user-student-new",
    email: "nuevo.guerrero@example.com",
    name: "Nuevo Guerrero",
    role: "STUDENT",
    preferredLanguage: "es",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    progress: {
      userId: "user-student-new",
      currentDay: 1,
      completedDays: [],
      completedDaysCount: 0,
      isPaid: true,
      isCompleted: false,
      lastActiveAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    order: {
      id: "ord-new-001",
      userId: "user-student-new",
      customerEmail: "nuevo.guerrero@example.com",
      customerName: "Nuevo Guerrero",
      provider: "stripe",
      sessionId: "cs_live_sample_new_order",
      amount: 4700,
      currency: "usd",
      status: "COMPLETED",
      createdAt: new Date().toISOString()
    }
  }
];

export const INITIAL_JOURNAL_ENTRIES: JournalEntryRecord[] = [];

export const INITIAL_MENTOR_FEEDBACK: MentorFeedbackRecord[] = [];
