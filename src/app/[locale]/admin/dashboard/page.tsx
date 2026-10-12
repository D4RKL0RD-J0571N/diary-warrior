'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useAppStore } from '@/context/AppStoreContext';
import { Users, DollarSign, Award, AlertTriangle, ArrowRight, Shield, Clock } from 'lucide-react';

export default function AdminDashboardPage() {
  const t = useTranslations('admin');
  const { allStudents } = useAppStore();

  const totalStudents = allStudents.length;
  const completedStudents = allStudents.filter(s => s.progress.isCompleted).length;
  const completionRate = Math.round((completedStudents / totalStudents) * 100);

  // Inactive students (stuck or inactive > 3 days)
  const stuckStudents = allStudents.filter(s => {
    const daysSinceActive = (Date.now() - new Date(s.progress.lastActiveAt).getTime()) / (1000 * 3600 * 24);
    return daysSinceActive >= 3 && !s.progress.isCompleted;
  });

  const totalRevenue = allStudents.reduce((acc, s) => acc + (s.order?.amount || 4700), 0) / 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Top Banner */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#C7A86A]/40 bg-[#0B1F1A]/80 px-3 py-1 text-xs text-[#C7A86A] mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">{t('badge')}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1E8] mb-2">
          {t('title')}
        </h1>
        <p className="text-sm text-[#A8B0AA]">{t('subtitle')}</p>
      </div>

      {/* 1. Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/70 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold text-[#A8B0AA]">{t('statTotalStudents')}</span>
            <Users className="w-4 h-4 text-[#C7A86A]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#F4F1E8]">{totalStudents}</div>
          <span className="text-[11px] text-emerald-400 mt-2 block">{t('statActiveEnrolled')}</span>
        </div>

        <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/70 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold text-[#A8B0AA]">{t('statTotalRevenue')}</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#F4F1E8]">${totalRevenue} <span className="text-xs text-[#A8B0AA]">USD</span></div>
          <span className="text-[11px] text-[#A8B0AA] mt-2 block">{t('statVerifiedPayments')}</span>
        </div>

        <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/70 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold text-[#A8B0AA]">{t('statCompletionRate')}</span>
            <Award className="w-4 h-4 text-[#C7A86A]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#C7A86A]">{completionRate}%</div>
          <span className="text-[11px] text-[#A8B0AA] mt-2 block">{completedStudents} graduados del Día 21</span>
        </div>

        <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/70 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold text-amber-400">{t('statStuck')}</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-serif font-bold text-amber-300">{stuckStudents.length}</div>
          <span className="text-[11px] text-[#A8B0AA] mt-2 block">Inactivos por más de 3 días</span>
        </div>
      </div>

      {/* 2. Quick Access Navigation Tabs */}
      <div className="flex items-center gap-4 mb-8 border-b border-emerald-950/80 pb-3">
        <Link
          href="/admin/students"
          className="px-4 py-2 rounded-lg bg-[#064E3B] text-[#F4F1E8] text-xs font-bold uppercase tracking-wider border border-emerald-700/40 inline-flex items-center gap-2"
        >
          <Users className="w-3.5 h-3.5 text-[#C7A86A]" />
          <span>{t('tabsStudents')}</span>
        </Link>

        <Link
          href="/admin/orders"
          className="px-4 py-2 rounded-lg bg-[#0B1F1A] hover:bg-[#064E3B]/60 text-[#A8B0AA] text-xs font-bold uppercase tracking-wider border border-emerald-950 inline-flex items-center gap-2 transition-colors"
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>{t('tabsOrders')}</span>
        </Link>
      </div>

      {/* 3. Inactive / Friction Attention List */}
      <div className="rounded-2xl border border-amber-950/60 bg-[#0B1F1A]/40 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif text-lg font-bold text-[#F4F1E8]">
              Alumnos que Requieren Intervención de Mentoría
            </h3>
          </div>
          <span className="text-xs text-[#A8B0AA]">{stuckStudents.length} alumnos detectados</span>
        </div>

        {stuckStudents.length > 0 ? (
          <div className="divide-y divide-emerald-950/60">
            {stuckStudents.map(student => (
              <div key={student.id} className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#F4F1E8]">{student.name}</h4>
                  <p className="text-xs text-[#A8B0AA]">{student.email} · Idioma: {student.preferredLanguage.toUpperCase()}</p>
                  <p className="text-[11px] text-amber-400/90 mt-1">
                    Estancado en el Día {student.progress.currentDay} · Última actividad hace más de 3 días
                  </p>
                </div>
                <Link
                  href={`/admin/students/${student.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#C7A86A] text-[#0A0D0B] font-bold text-xs hover:bg-[#d8b97c] transition-colors"
                >
                  <span>Revisar & Orientar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#A8B0AA] py-4">
            Todos los alumnos están avanzando con ritmo constante. ¡Gran trabajo de seguimiento!
          </p>
        )}
      </div>
    </div>
  );
}
