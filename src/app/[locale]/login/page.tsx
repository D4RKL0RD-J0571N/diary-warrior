'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { useAppStore } from '@/context/AppStoreContext';
import { Shield, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const { setCurrentUser, switchUserRole } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Log in user
    setCurrentUser({
      id: 'user-logged-in',
      email: email || 'carlos.mendoza@example.com',
      name: email ? email.split('@')[0] : 'Carlos Mendoza',
      role: 'STUDENT',
      preferredLanguage: 'es',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    router.push('/dashboard');
  };

  const handleDemoStudent = () => {
    switchUserRole('STUDENT');
    router.push('/dashboard');
  };

  const handleDemoAdmin = () => {
    switchUserRole('ADMIN');
    router.push('/admin/dashboard');
  };

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full rounded-2xl border border-emerald-950/80 bg-[#0B1F1A]/80 p-8 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#064E3B] border border-[#C7A86A]/40 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-[#C7A86A]" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1E8] mb-2">{t('loginTitle')}</h1>
          <p className="text-xs text-[#A8B0AA]">{t('loginSubtitle')}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-[#A8B0AA] mb-1">{t('emailLabel')}</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@ejemplo.com"
                className="w-full rounded-lg border border-emerald-950 bg-[#0A0D0B] pl-10 pr-3.5 py-2 text-sm text-[#F4F1E8] focus:border-[#C7A86A] focus:outline-none"
              />
              <Mail className="w-4 h-4 text-[#A8B0AA] absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A8B0AA] mb-1">{t('passwordLabel')}</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-emerald-950 bg-[#0A0D0B] pl-10 pr-3.5 py-2 text-sm text-[#F4F1E8] focus:border-[#C7A86A] focus:outline-none"
              />
              <Lock className="w-4 h-4 text-[#A8B0AA] absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#C7A86A] text-[#0A0D0B] font-bold text-sm tracking-wide hover:bg-[#d8b97c] shadow-lg transition-all"
          >
            <span>{t('submitLogin')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Switches */}
        <div className="border-t border-emerald-950/80 pt-6 space-y-2">
          <p className="text-[11px] text-center text-[#A8B0AA]/70 uppercase tracking-wider mb-3">
            Acceso Rápido / Pruebas de Roles
          </p>
          <button
            type="button"
            onClick={handleDemoStudent}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#064E3B]/40 hover:bg-[#064E3B] text-[#F4F1E8] text-xs font-medium border border-emerald-800/40 transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#C7A86A]" />
            <span>{t('demoStudent')}</span>
          </button>

          <button
            type="button"
            onClick={handleDemoAdmin}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#0B1F1A] hover:bg-[#064E3B]/60 text-[#C7A86A] text-xs font-medium border border-[#C7A86A]/40 transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-[#C7A86A]" />
            <span>{t('demoAdmin')}</span>
          </button>
        </div>

        <p className="text-center text-xs text-[#A8B0AA] mt-6">
          {t('noAccount')}{' '}
          <Link href="/register" className="text-[#C7A86A] hover:underline font-medium">
            {t('registerTitle')}
          </Link>
        </p>
      </div>
    </div>
  );
}
