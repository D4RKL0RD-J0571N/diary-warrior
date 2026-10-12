'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useAppStore } from '@/context/AppStoreContext';
import { getCurriculumDay } from '@/data/curriculumData';
import { Locale } from '@/types/database';
import { CheckCircle2, Lock, ArrowRight, MessageSquare, Award, Clock } from 'lucide-react';

export default function StudentDashboardPage() {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  const locale = useLocale() as Locale;
  const { currentUser, progress, mentorFeedback } = useAppStore();

  const totalDays = 21;
  const completedCount = progress.completedDays.length;
  const percentage = Math.round((completedCount / totalDays) * 100);
  const currentDayInfo = getCurriculumDay(progress.currentDay, locale);

  // Student specific mentor feedback
  const studentFeedback = mentorFeedback.filter(f => f.userId === currentUser?.id || f.userId === 'user-student-1');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* 1. Welcome Greeting & Hero Card */}
      <div className="rounded-2xl border border-emerald-950/80 bg-gradient-to-br from-[#0B1F1A] via-[#064E3B]/30 to-[#0A0D0B] p-6 sm:p-10 mb-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C7A86A]">
            {t('studentPortalBadge')}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F1E8] mt-2 mb-3">
            {t('greeting')}, {currentUser?.name || tCommon('brand')}
          </h1>
          <p className="text-sm text-[#A8B0AA] leading-relaxed mb-6">
            {tCommon('day')} {progress.currentDay} {tCommon('of21Days')}: <span className="text-[#F4F1E8] font-medium">{currentDayInfo.title}</span>
          </p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs text-[#A8B0AA] mb-2 font-medium">
              <span>{t('progressLabel')} ({percentage}%)</span>
              <span className="text-[#C7A86A]">{completedCount} {t('completedOf')}</span>
            </div>
            <div className="w-full h-2.5 bg-[#0A0D0B] rounded-full overflow-hidden border border-emerald-950">
              <div
                className="h-full bg-gradient-to-r from-[#064E3B] to-[#C7A86A] transition-all duration-500 rounded-full"
                style={{ width: `${Math.max(5, percentage)}%` }}
              />
            </div>
          </div>

          {/* Quick Action */}
          <Link
            href={`/dashboard/day/${progress.currentDay}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#C7A86A] text-[#0A0D0B] font-bold text-xs uppercase tracking-wider hover:bg-[#d8b97c] shadow-md transition-all group"
          >
            <span>{t('resumeToday')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Interactive 21-Day Timeline/Calendar (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-[#F4F1E8]">{t('timelineTitle')}</h2>
            <span className="text-xs text-[#A8B0AA]">{t('timelineSub')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 21 }, (_, i) => i + 1).map((dayNum) => {
              const dayData = getCurriculumDay(dayNum, locale);
              const isCompleted = progress.completedDays.includes(dayNum);
              const isCurrent = progress.currentDay === dayNum;
              const isAdmin = currentUser?.role === 'ADMIN';
              const isPaid = Boolean(progress.isPaid) || isAdmin;

              // Day 1 is free for everyone. Days 2-21 require paid status or admin role.
              const isUnlocked = dayNum === 1 || isPaid;
              const isAvailable = isUnlocked && (isCompleted || isCurrent || dayNum <= progress.currentDay);

              return (
                <div
                  key={dayNum}
                  className={`rounded-xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                    !isUnlocked
                      ? 'border-emerald-950/30 bg-[#0A0D0B]/70 opacity-60'
                      : isCompleted
                      ? 'border-emerald-800/80 bg-[#064E3B]/20'
                      : isCurrent
                      ? 'border-[#C7A86A] bg-[#0B1F1A]/90 shadow-lg shadow-[#C7A86A]/5'
                      : isAvailable
                      ? 'border-emerald-950 bg-[#0B1F1A]/40'
                      : 'border-emerald-950/40 bg-[#0A0D0B]/40 opacity-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${
                          isCurrent ? 'text-[#C7A86A]' : 'text-[#A8B0AA]'
                        }`}>
                          {tCommon('day')} {dayNum}
                        </span>
                        {dayNum === 1 && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                            {tCommon('freeBadge')}
                          </span>
                        )}
                      </div>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : !isUnlocked ? (
                        <Lock className="w-3.5 h-3.5 text-amber-500/80" />
                      ) : isAvailable ? (
                        <Clock className="w-3.5 h-3.5 text-[#C7A86A]" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-[#A8B0AA]/40" />
                      )}
                    </div>
                    <h3 className="font-serif text-sm font-semibold text-[#F4F1E8] line-clamp-2 mb-2">
                      {dayData.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-950/60 flex items-center justify-between">
                    <span className="text-[10px] text-[#A8B0AA]">
                      {!isUnlocked
                        ? t('statusLockedPlan')
                        : isCompleted
                        ? t('statusCompleted')
                        : isAvailable
                        ? t('statusAvailable')
                        : t('statusLocked')}
                    </span>
                    {isUnlocked && isAvailable ? (
                      <Link
                        href={`/dashboard/day/${dayNum}`}
                        className="text-xs text-[#C7A86A] hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <span>{t('openDay')}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ) : !isUnlocked ? (
                      <Link
                        href="/checkout"
                        className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1"
                      >
                        <span>{t('unlockDay')}</span>
                        <Lock className="w-2.5 h-2.5" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Mentor Feedback Feed (Right Column) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-[#F4F1E8]">{t('mentorFeedbackTitle')}</h2>
            <Award className="w-4 h-4 text-[#C7A86A]" />
          </div>

          <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/60 p-5 space-y-4">
            {studentFeedback.length > 0 ? (
              studentFeedback.map((fb) => (
                <div key={fb.id} className="rounded-lg border border-emerald-900/60 bg-[#064E3B]/20 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#C7A86A] uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3" />
                      Día {fb.dayNumber || 'General'}
                    </span>
                    <span className="text-[10px] text-[#A8B0AA]">
                      {new Date(fb.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-[#F4F1E8] leading-relaxed italic">
                    "{fb.mentorFeedback}"
                  </p>
                  <p className="text-[10px] text-[#A8B0AA] mt-2 font-medium">
                    — Jafeth López (Mentor)
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#A8B0AA] text-center py-6 leading-relaxed">
                {t('noFeedbackYet')}
              </p>
            )}
          </div>

          {/* Quick link to Profile & Exports */}
          <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/40 p-5 text-center">
            <h3 className="font-serif text-base font-bold text-[#F4F1E8] mb-1">Exportar Mi Diario</h3>
            <p className="text-xs text-[#A8B0AA] mb-4">
              Descarga tus 21 días de respuestas en formato PDF o JSON.
            </p>
            <Link
              href="/dashboard/profile"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#064E3B] hover:bg-[#064E3B]/80 text-[#F4F1E8] text-xs font-medium border border-emerald-700/40 transition-colors w-full"
            >
              <span>Ir a Mi Perfil & Descargas</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
