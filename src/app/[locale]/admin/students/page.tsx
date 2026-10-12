'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useAppStore } from '@/context/AppStoreContext';
import { Search, Eye, CheckCircle2, Shield, ArrowLeft } from 'lucide-react';

export default function StudentDirectoryPage() {
  const t = useTranslations('admin');
  const { allStudents, grantStudentAccess } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = allStudents.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-950/60">
        <div>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-[#A8B0AA] hover:text-[#C7A86A] transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Métricas de Mentoría</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1E8]">
            {t('tabsStudents')}
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full rounded-lg border border-emerald-950 bg-[#0B1F1A] pl-9 pr-3 py-2 text-xs text-[#F4F1E8] focus:border-[#C7A86A] focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-[#A8B0AA] absolute left-3 top-3" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/40 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0A0D0B] text-[#A8B0AA] uppercase tracking-wider border-b border-emerald-950/80 font-semibold">
              <tr>
                <th className="py-3.5 px-4">{t('colStudent')}</th>
                <th className="py-3.5 px-4">{t('colLang')}</th>
                <th className="py-3.5 px-4">{t('colProgress')}</th>
                <th className="py-3.5 px-4">{t('colCurrentDay')}</th>
                <th className="py-3.5 px-4">{t('colLastActive')}</th>
                <th className="py-3.5 px-4">{t('colStatus')}</th>
                <th className="py-3.5 px-4 text-right">{t('colActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/60 text-[#F4F1E8]">
              {filtered.map(student => {
                const completedPercent = Math.round((student.progress.completedDays.length / 21) * 100);
                return (
                  <tr key={student.id} className="hover:bg-[#064E3B]/20 transition-colors">
                    <td className="py-4 px-4 font-medium">
                      <div className="font-serif text-sm font-semibold">{student.name}</div>
                      <div className="text-[11px] text-[#A8B0AA]">{student.email}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-900 bg-[#0B1F1A] text-[#C7A86A]">
                        {student.preferredLanguage.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-28">
                        <div className="flex justify-between text-[10px] text-[#A8B0AA] mb-1">
                          <span>{student.progress.completedDays.length}/21</span>
                          <span>{completedPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#0A0D0B] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#C7A86A] rounded-full"
                            style={{ width: `${completedPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#C7A86A]">
                      Día {student.progress.currentDay}
                    </td>
                    <td className="py-4 px-4 text-[#A8B0AA]">
                      {new Date(student.progress.lastActiveAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      {student.progress.isPaid ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          Pagado
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => grantStudentAccess(student.id)}
                          className="text-[10px] text-[#C7A86A] hover:underline"
                        >
                          {t('grantAccess')}
                        </button>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/admin/students/${student.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0B1F1A] hover:bg-[#064E3B] border border-emerald-900 text-[#F4F1E8] text-xs transition-colors"
                      >
                        <Eye className="w-3 h-3 text-[#C7A86A]" />
                        <span>{t('inspect')}</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
