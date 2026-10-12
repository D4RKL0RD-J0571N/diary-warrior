export type Locale = 'es' | 'en';
export const locales: Locale[] = ['es', 'en'];
export const defaultLocale: Locale = 'es';

export type UserRole = 'STUDENT' | 'ADMIN';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  preferredLanguage: Locale;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderRecord {
  id: string;
  userId: string;
  customerEmail: string;
  customerName?: string;
  provider: 'stripe' | 'lemonsqueezy' | 'manual';
  sessionId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'REFUNDED';
  createdAt: string;
}

export interface UserProgressRecord {
  userId: string;
  currentDay: number;
  completedDays: number[];
  completedDaysCount: number;
  isPaid: boolean;
  isCompleted: boolean;
  lastActiveAt: string;
  updatedAt: string;
}

export interface JournalEntryRecord {
  id?: string;
  userId: string;
  dayNumber: number;
  languageUsed: Locale;
  responses: Record<string, string>; // e.g. { q0, q1, exercise, commitment, sig_name, sig_date, sig_time }
  isCompleted: boolean;
  completedAt?: string;
  updatedAt: string;
}

export interface MentorFeedbackRecord {
  id: string;
  userId: string;
  mentorId: string;
  dayNumber?: number;
  privateNote?: string;
  mentorFeedback?: string;
  createdAt: string;
}
