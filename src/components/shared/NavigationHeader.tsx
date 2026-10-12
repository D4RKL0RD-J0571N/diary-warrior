'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useAppStore } from '@/context/AppStoreContext';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Shield, BookOpen, User, ArrowRight } from 'lucide-react';

export function NavigationHeader() {
  const t = useTranslations('common');
  const { currentUser, switchUserRole } = useAppStore();
  const isAdmin = currentUser?.role === 'ADMIN';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-950/60 bg-[#0A0D0B]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#064E3B] to-[#0B1F1A] border border-[#C7A86A]/40 flex items-center justify-center shadow-sm group-hover:border-[#C7A86A] transition-colors">
            <Shield className="w-5 h-5 text-[#C7A86A]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-wide text-[#F4F1E8] font-bold">
              {t('brand')}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#A8B0AA]/70 -mt-1 font-sans">
              {t('academySubtitle')}
            </span>
          </div>
        </Link>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/dashboard"
            className="text-[#A8B0AA] hover:text-[#C7A86A] transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>{t('dashboard')}</span>
          </Link>

          {/* CRM / Backoffice link: Strictly visible ONLY if user is ADMIN */}
          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className="text-[#C7A86A] hover:text-[#e4cf9d] transition-colors flex items-center gap-1.5 font-medium px-2 py-0.5 rounded bg-[#064E3B]/40 border border-[#C7A86A]/30"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{t('admin')}</span>
            </Link>
          )}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {/* Role testing switcher: only for toggling admin / student testing */}
          <div className="hidden lg:flex items-center border border-emerald-950/60 rounded-full px-2 py-0.5 text-xs bg-[#0B1F1A]">
            <span className="text-[#A8B0AA] mr-1.5 text-[11px]">{t('roleLabel')}</span>
            <button
              onClick={() => switchUserRole(currentUser?.role === 'ADMIN' ? 'STUDENT' : 'ADMIN')}
              className="text-[#C7A86A] hover:underline font-medium text-xs"
              title={t('roleToggleTitle')}
            >
              {isAdmin ? t('roleMentor') : t('roleStudent')}
            </button>
          </div>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#064E3B]/80 hover:bg-[#064E3B] text-[#F4F1E8] border border-emerald-700/40 text-xs font-medium transition-all shadow-sm"
              >
                <User className="w-3.5 h-3.5 text-[#C7A86A]" />
                <span>{currentUser.name.split(' ')[0]}</span>
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#C7A86A] text-[#0A0D0B] font-semibold text-xs hover:bg-[#d8b97c] transition-colors"
            >
              <span>{t('login')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
