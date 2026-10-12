'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useAppStore } from '@/context/AppStoreContext';
import { User, Download, FileText, CheckCircle2, Globe, Shield, RotateCcw } from 'lucide-react';

export default function StudentProfilePage() {
  const t = useTranslations('profile');
  const tCommon = useTranslations('common');
  const { currentUser, progress, journalEntries } = useAppStore();

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      user: currentUser,
      progress,
      entries: journalEntries,
      exportedAt: new Date().toISOString()
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `diario-guerrero-${currentUser?.name || 'alumno'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C7A86A]">
          {t('badge')}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1E8] mt-1 mb-2">
          {t('title')}
        </h1>
        <p className="text-xs text-[#A8B0AA]">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* User Card */}
        <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/60 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#064E3B] border border-[#C7A86A]/40 flex items-center justify-center">
              <User className="w-6 h-6 text-[#C7A86A]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#F4F1E8]">{currentUser?.name}</h3>
              <p className="text-xs text-[#A8B0AA]">{currentUser?.email}</p>
            </div>
          </div>
          <div className="border-t border-emerald-950/80 pt-4 text-xs text-[#A8B0AA] space-y-1">
            <p>{t('role')} <span className="text-[#C7A86A] font-semibold">{currentUser?.role === 'ADMIN' ? tCommon('roleMentor') : tCommon('roleStudent')}</span></p>
            <p>{t('preferredLanguage')} <span className="text-[#F4F1E8] font-semibold">{currentUser?.preferredLanguage.toUpperCase()}</span></p>
          </div>
        </div>

        {/* Progress Card */}
        <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/60 p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase text-emerald-400">{t('totalProgress')}</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-serif font-bold text-[#F4F1E8]">
                {progress.completedDays.length}
              </span>
              <span className="text-sm text-[#A8B0AA]">/ 21 {tCommon('day')}s</span>
            </div>
          </div>
          <div className="border-t border-emerald-950/80 pt-4 text-xs text-[#A8B0AA]">
            {t('accountStatus')} <span className="text-emerald-400 font-semibold">{progress.isPaid ? t('lifetimeAccess') : t('trialAccess')}</span>
          </div>
        </div>

        {/* Cloud Sync Status */}
        <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/60 p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase text-[#C7A86A]">{t('cloudSync')}</span>
            <div className="mt-2 flex items-center gap-2 text-emerald-400 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('secureConnection')}</span>
            </div>
            <p className="text-[11px] text-[#A8B0AA] mt-2">
              {t('realtimeBackup')}
            </p>
          </div>
          <div className="border-t border-emerald-950/80 pt-4 text-[11px] text-[#A8B0AA]">
            {t('lastActivity')} {new Date(progress.lastActiveAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="rounded-2xl border border-[#C7A86A]/30 bg-[#064E3B]/20 p-8 shadow-xl">
        <h2 className="font-serif text-2xl font-bold text-[#F4F1E8] mb-2">{t('exportTitle')}</h2>
        <p className="text-xs sm:text-sm text-[#A8B0AA] mb-6 leading-relaxed">
          {t('exportDesc')}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={handleExportJSON}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0B1F1A] hover:bg-[#064E3B]/80 text-[#F4F1E8] border border-emerald-800/60 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <Download className="w-4 h-4 text-[#C7A86A]" />
            <span>{t('downloadJson')}</span>
          </button>

          <button
            type="button"
            onClick={handlePrintPDF}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#C7A86A] text-[#0A0D0B] font-bold text-xs uppercase tracking-wider hover:bg-[#d8b97c] transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>{t('printPdf')}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm(t('resetConfirm'))) {
                localStorage.removeItem('warrior_journal_entries');
                localStorage.removeItem('warrior_user_progress');
                window.location.reload();
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0A0D0B] hover:bg-rose-950/40 text-rose-300 border border-rose-900/40 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('resetProgress')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
