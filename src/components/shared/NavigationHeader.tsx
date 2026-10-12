'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useAppStore } from '@/context/AppStoreContext';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { EditableText } from '@/components/shared/EditableText';
import { Shield, BookOpen, User, Edit3, Check, ArrowRight } from 'lucide-react';

export function NavigationHeader() {
  const t = useTranslations('common');
  const { currentUser, switchUserRole, isEditMode, toggleEditMode } = useAppStore();

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
              <EditableText translationKey="common.brand" defaultText={t('brand')} as="span" />
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#A8B0AA]/70 -mt-1 font-sans">
              21-Day Academy
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
            <EditableText translationKey="common.dashboard" defaultText={t('dashboard')} as="span" />
          </Link>
          <Link
            href="/admin/dashboard"
            className="text-[#A8B0AA] hover:text-[#C7A86A] transition-colors flex items-center gap-1.5"
          >
            <Shield className="w-4 h-4 text-[#C7A86A]" />
            <EditableText translationKey="common.admin" defaultText={t('admin')} as="span" />
          </Link>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Edit Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleEditMode}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
              isEditMode
                ? 'bg-[#C7A86A] text-[#0A0D0B] border-[#C7A86A] shadow-md shadow-[#C7A86A]/20'
                : 'bg-[#0B1F1A] text-[#A8B0AA] border-emerald-950 hover:text-[#F4F1E8] hover:border-emerald-800'
            }`}
            title="Activar o desactivar modo de edición de textos i18n"
          >
            <Edit3 className="w-3 h-3" />
            <span>{isEditMode ? 'Modo Edición: ON' : 'Editar Texto'}</span>
          </button>

          <LanguageSwitcher />

          {/* Quick role preview switcher for testing */}
          <div className="hidden lg:flex items-center border border-emerald-950/60 rounded-full px-2 py-0.5 text-xs bg-[#0B1F1A]">
            <span className="text-[#A8B0AA] mr-1.5 text-[11px]">Rol:</span>
            <button
              onClick={() => switchUserRole(currentUser?.role === 'ADMIN' ? 'STUDENT' : 'ADMIN')}
              className="text-[#C7A86A] hover:underline font-medium text-xs"
              title="Alternar entre Alumno y Mentor para verificar permisos y vistas"
            >
              {currentUser?.role === 'ADMIN' ? 'Mentor (Admin)' : 'Alumno'}
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
