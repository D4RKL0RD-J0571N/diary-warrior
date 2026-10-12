'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { useAppStore } from '@/context/AppStoreContext';
import { getCurriculumDay } from '@/data/curriculumData';
import { Locale } from '@/types/database';
import confetti from 'canvas-confetti';
import {
  Shield,
  CheckCircle2,
  Save,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  BookOpen,
  HelpCircle,
  PenTool,
  Clock,
  MessageSquare,
  Lock
} from 'lucide-react';

export default function DayReflectionPage() {
  const params = useParams();
  const router = useRouter();
  const dayId = Number(params.id) || 1;
  const t = useTranslations('day');
  const tCommon = useTranslations('common');
  const locale = useLocale() as Locale;

  const {
    progress,
    journalEntries,
    saveJournalEntry,
    markDayAsCompleted,
    mentorFeedback,
    isSaving,
    lastSavedAt,
    currentUser
  } = useAppStore();

  const dayData = getCurriculumDay(dayId, locale);
  const existingEntry = journalEntries[dayId];

  // Local state for answers
  const [answers, setAnswers] = useState<Record<string, string>>({
    q0: '',
    q1: '',
    q2: '',
    q3: '',
    exercise: '',
    commitment: '',
    sig_name: currentUser?.name || '',
    sig_date: new Date().toISOString().split('T')[0],
    sig_time: new Date().toTimeString().split(' ')[0].slice(0, 5)
  });

  // Populate from existing entry
  useEffect(() => {
    if (existingEntry?.responses) {
      setAnswers(prev => ({ ...prev, ...existingEntry.responses }));
    }
  }, [dayId, existingEntry]);

  // Specific mentor notes for this day
  const dayFeedback = mentorFeedback.find(
    f => (f.userId === currentUser?.id || f.userId === 'user-student-1') && f.dayNumber === dayId
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFieldChange = (key: string, val: string) => {
    setAnswers(prev => {
      const next = { ...prev, [key]: val };
      return next;
    });
    if (validationError) {
      setValidationError(null);
    }
  };

  const handleManualSave = async () => {
    await saveJournalEntry(dayId, answers, false);
  };

  // Check which required fields are missing
  const getMissingFields = () => {
    const missing: string[] = [];
    dayData.questions.forEach((_, idx) => {
      const key = `q${idx}`;
      if (!answers[key] || answers[key].trim().length < 5) {
        missing.push(`Pregunta ${idx + 1}`);
      }
    });

    if (!answers.exercise || answers.exercise.trim().length < 5) {
      missing.push('Ejercicio Práctico');
    }

    if (!answers.commitment || answers.commitment.trim().length < 5) {
      missing.push('Acción de Compromiso');
    }

    return missing;
  };

  const missingFields = getMissingFields();
  const isFormValid = missingFields.length === 0;

  const handleCompleteDay = async () => {
    if (!isFormValid) {
      setValidationError(t('validationMissingDesc'));
      // Scroll to error banner smoothly
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      return;
    }

    setValidationError(null);
    await saveJournalEntry(dayId, answers, true);
    await markDayAsCompleted(dayId);

    // Fire celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C7A86A', '#064E3B', '#10B981', '#F4F1E8']
    });

    if (dayId < 21) {
      setTimeout(() => {
        router.push(`/dashboard/day/${dayId + 1}`);
      }, 1200);
    } else {
      setTimeout(() => {
        router.push('/dashboard/profile');
      }, 1200);
    }
  };

  const isCompleted = progress.completedDays.includes(dayId) || existingEntry?.isCompleted;
  const isAdmin = currentUser?.role === 'ADMIN';
  const isPaid = Boolean(progress.isPaid) || isAdmin;

  // Registration gating: Day 1 is 100% free for everyone. To advance beyond Day 1, user must have an account.
  if (dayId > 1 && !currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="rounded-2xl border border-emerald-950/80 bg-[#0B1F1A]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#064E3B]/40 border border-[#C7A86A]/40 flex items-center justify-center mb-6 text-[#C7A86A]">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C7A86A]">
            {t('registerRequiredBadge')}
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#F4F1E8] mt-2 mb-3">
            {t('registerRequiredTitle')}
          </h2>
          <p className="text-sm text-[#A8B0AA] leading-relaxed mb-6">
            {t('registerRequiredDesc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#C7A86A] hover:bg-[#d8b97c] text-[#0A0D0B] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C7A86A]/10 transition-all"
            >
              <span>{t('registerRequiredBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 rounded-xl border border-emerald-950 bg-[#0A0D0B] hover:bg-[#064E3B]/30 text-xs text-[#A8B0AA] transition-all"
            >
              {t('registerRequiredLoginBtn')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Paywall gating: Days 2-21 require paid status or admin role.
  if (dayId > 1 && !isPaid) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="rounded-2xl border border-emerald-950/80 bg-[#0B1F1A]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6 text-amber-400">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C7A86A]">
            {t('paywallBadge')}
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#F4F1E8] mt-2 mb-3">
            {t('paywallTitle')}
          </h2>
          <p className="text-sm text-[#A8B0AA] leading-relaxed mb-6">
            {t('paywallDesc')}
          </p>

          <div className="rounded-xl border border-emerald-950 bg-[#064E3B]/20 p-4 mb-6 text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-[#F4F1E8]">{t('paywallProductName')}</span>
              <span className="font-serif text-lg font-bold text-[#C7A86A]">{t('paywallPrice')}</span>
            </div>
            <ul className="text-xs text-[#A8B0AA] space-y-1.5 list-disc list-inside">
              <li>{t('paywallFeature1')}</li>
              <li>{t('paywallFeature2')}</li>
              <li>{t('paywallFeature3')}</li>
              <li>{t('paywallFeature4')}</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/checkout"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#0070BA]/20 transition-all"
            >
              <span>{t('paywallBtnPayPal')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard/day/1"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 rounded-xl border border-emerald-950 bg-[#0A0D0B] hover:bg-[#064E3B]/30 text-xs text-[#A8B0AA] transition-all"
            >
              {t('paywallBtnBackFree')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-950/60">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-[#A8B0AA] hover:text-[#C7A86A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToTimeline')}</span>
        </Link>

        <div className="flex items-center gap-3">
          {isSaving ? (
            <span className="text-xs text-[#C7A86A] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>{tCommon('saving')}</span>
            </span>
          ) : lastSavedAt ? (
            <span className="text-[11px] text-emerald-400/80 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{tCommon('saved')}</span>
            </span>
          ) : null}

          <button
            type="button"
            onClick={handleManualSave}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0B1F1A] hover:bg-[#064E3B]/70 text-[#F4F1E8] border border-emerald-900/60 text-xs font-medium transition-all"
          >
            <Save className="w-3.5 h-3.5 text-[#C7A86A]" />
            <span>{t('saveDraft')}</span>
          </button>
        </div>
      </div>

      {/* Header Title & Quote */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C7A86A]">
            Día {dayId} · {dayData.stageName}
          </span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
              <CheckCircle2 className="w-3 h-3" />
              {t('completedBadge')}
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1E8] mb-4">
          {dayData.title}
        </h1>

        {/* Quote Card */}
        <div className="rounded-xl border-l-2 border-[#C7A86A] bg-[#0B1F1A]/50 p-5 mb-6">
          <p className="font-serif italic text-base text-[#F4F1E8] leading-relaxed mb-2">
            "{dayData.quote}"
          </p>
          <p className="text-xs text-[#A8B0AA] font-sans font-medium">— {dayData.quoteAuthor}</p>
        </div>
      </div>

      {/* Mentor Feedback Banner (If Available) */}
      {dayFeedback?.mentorFeedback && (
        <div className="rounded-xl border border-[#C7A86A]/40 bg-[#064E3B]/20 p-5 mb-10 flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-[#C7A86A] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#C7A86A] mb-1">
              {t('mentorNoteBanner')}
            </h4>
            <p className="text-xs sm:text-sm text-[#F4F1E8] italic leading-relaxed">
              "{dayFeedback.mentorFeedback}"
            </p>
          </div>
        </div>
      )}

      {/* 1. Guided Reading Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-[#C7A86A]" />
          <h2 className="font-serif text-xl font-bold text-[#F4F1E8]">{t('deepReflection')}</h2>
        </div>
        <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/40 p-6 text-sm text-[#A8B0AA] leading-relaxed space-y-4">
          <p className="text-[#F4F1E8]/90 font-sans text-sm sm:text-base leading-relaxed">
            {dayData.context}
          </p>
        </div>
      </section>

      {/* 2. Self-Inquiry Prompts */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-4 h-4 text-[#C7A86A]" />
          <h2 className="font-serif text-xl font-bold text-[#F4F1E8]">{t('inquiryPrompts')}</h2>
        </div>

        <div className="space-y-6">
          {dayData.questions.map((qObj, index) => {
            const key = `q${index}`;
            return (
              <div key={index} className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/30 p-5">
                <label className="block text-sm font-semibold text-[#F4F1E8] mb-1">
                  {index + 1}. {qObj.q}
                </label>
                <p className="text-xs text-[#A8B0AA]/80 mb-3 italic">{qObj.hint}</p>
                <textarea
                  rows={3}
                  value={answers[key] || ''}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                  placeholder={t('placeholderAnswer')}
                  className="w-full rounded-lg border border-emerald-950 bg-[#0A0D0B] p-3 text-sm text-[#F4F1E8] focus:border-[#C7A86A] focus:outline-none transition-colors"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Reprogramming Practical Drill */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-[#C7A86A]" />
          <h2 className="font-serif text-xl font-bold text-[#F4F1E8]">{t('exerciseTitle')}</h2>
        </div>

        <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/50 p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#C7A86A]">{dayData.exerciseTitle}</h3>
          <p className="text-xs text-[#A8B0AA]">{t('exerciseInstruction')}</p>

          <ol className="space-y-2 text-xs sm:text-sm text-[#F4F1E8]/90 pl-4 list-decimal marker:text-[#C7A86A]">
            {dayData.exerciseSteps.map((step, idx) => (
              <li key={idx} className="leading-relaxed">{step}</li>
            ))}
          </ol>

          <div className="pt-2">
            <label className="block text-xs font-semibold text-[#C7A86A] mb-1">
              {dayData.exerciseLabel}
            </label>
            <textarea
              rows={4}
              value={answers.exercise || ''}
              onChange={(e) => handleFieldChange('exercise', e.target.value)}
              placeholder={t('exerciseDocPlaceholder')}
              className="w-full rounded-lg border border-emerald-950 bg-[#0A0D0B] p-3 text-sm text-[#F4F1E8] focus:border-[#C7A86A] focus:outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      {/* 4. Commitment & Signature */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <PenTool className="w-4 h-4 text-[#C7A86A]" />
          <h2 className="font-serif text-xl font-bold text-[#F4F1E8]">{t('commitmentTitle')}</h2>
        </div>

        <div className="rounded-xl border border-[#C7A86A]/30 bg-[#064E3B]/20 p-6 space-y-5">
          <p className="font-serif italic text-sm text-[#F4F1E8] leading-relaxed">
            "{dayData.commitment}"
          </p>

          <div>
            <label className="block text-xs font-semibold text-[#A8B0AA] mb-1">
              {t('commitmentAction')}
            </label>
            <input
              type="text"
              value={answers.commitment || ''}
              onChange={(e) => handleFieldChange('commitment', e.target.value)}
              placeholder={t('placeholderAction')}
              className="w-full rounded-lg border border-emerald-950 bg-[#0A0D0B] p-3 text-sm text-[#F4F1E8] focus:border-[#C7A86A] focus:outline-none"
            />
          </div>

          {/* Signature row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-emerald-950/80">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#A8B0AA] block mb-1">{t('sigName')}</span>
              <input
                type="text"
                value={answers.sig_name || ''}
                onChange={(e) => handleFieldChange('sig_name', e.target.value)}
                className="w-full rounded border border-emerald-950 bg-[#0A0D0B] px-2.5 py-1.5 text-xs text-[#F4F1E8]"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#A8B0AA] block mb-1">{t('sigDate')}</span>
              <input
                type="date"
                value={answers.sig_date || ''}
                onChange={(e) => handleFieldChange('sig_date', e.target.value)}
                className="w-full rounded border border-emerald-950 bg-[#0A0D0B] px-2.5 py-1.5 text-xs text-[#F4F1E8]"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#A8B0AA] block mb-1">{t('sigTime')}</span>
              <input
                type="time"
                value={answers.sig_time || ''}
                onChange={(e) => handleFieldChange('sig_time', e.target.value)}
                className="w-full rounded border border-emerald-950 bg-[#0A0D0B] px-2.5 py-1.5 text-xs text-[#F4F1E8]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Validation Warning Notice (If fields are missing) */}
      {validationError && (
        <div className="rounded-xl border border-amber-500/50 bg-amber-950/30 p-4 mb-6 flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-semibold text-amber-300 mb-1">{t('validationMissingTitle')}</h4>
            <p className="text-[#A8B0AA] mb-2">{validationError}</p>
            <div className="flex flex-wrap gap-1.5">
              {missingFields.map((field, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-medium">
                  • {field}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Completion & Navigation Action Bottom Bar */}
      <div className="pt-6 border-t border-emerald-950/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[#A8B0AA] text-center sm:text-left">
          <span className="text-[#C7A86A] font-semibold">{t('nextDayPreview')} </span>
          <span>{dayData.nextDay}</span>
          {!isFormValid && (
            <p className="text-[11px] text-amber-400/90 mt-1">
              {t('validationMissingCount', { count: missingFields.length })}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleCompleteDay}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg transition-all ${
            isFormValid
              ? 'bg-[#C7A86A] text-[#0A0D0B] hover:bg-[#d8b97c] cursor-pointer'
              : 'bg-[#0B1F1A] text-[#A8B0AA] border border-amber-500/40 hover:border-amber-400 cursor-pointer'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${isFormValid ? 'text-[#0A0D0B]' : 'text-amber-400'}`} />
          <span>{t('completeDay')}</span>
        </button>
      </div>
    </div>
  );
}
