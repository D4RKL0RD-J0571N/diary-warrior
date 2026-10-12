'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Shield, Sparkles, Award } from 'lucide-react';

export function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="border-t border-emerald-950/60 bg-[#0A0D0B] text-[#A8B0AA] text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#064E3B] border border-[#C7A86A]/40 flex items-center justify-center">
            <Shield className="w-4 h-4 text-[#C7A86A]" />
          </div>
          <div>
            <p className="font-serif font-bold text-[#F4F1E8] text-sm">{t('brand')}</p>
            <p className="text-[11px] text-[#A8B0AA]/70">{t('brandSubtitle')}</p>
          </div>
        </div>

        {/* Disclaimer highlight */}
        <p className="max-w-xl text-center md:text-left text-[11px] text-[#A8B0AA]/60 leading-relaxed">
          {t('disclaimer')}
        </p>

        <div className="flex items-center gap-4 text-[11px]">
          <span>© {new Date().getFullYear()} La Mente del Guerrero</span>
          <span>·</span>
          <span>Arquitectura Cognitiva</span>
        </div>
      </div>
    </footer>
  );
}
