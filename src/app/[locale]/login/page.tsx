'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { useAppStore } from '@/context/AppStoreContext';
import { createClient } from '@/utils/supabase/client';
import { Shield, Lock, Mail, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const { setCurrentUser } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      if (data.user) {
        // Fetch profile to know actual assigned role from database
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const role = profileData?.role || (data.user.email?.includes('admin') || data.user.email?.includes('mentor') ? 'ADMIN' : 'STUDENT');
        const userObj = {
          id: data.user.id,
          email: data.user.email || email,
          name: profileData?.name || data.user.user_metadata?.name || email.split('@')[0],
          role: role as 'STUDENT' | 'ADMIN',
          preferredLanguage: (profileData?.preferred_language as 'es' | 'en') || 'es',
          createdAt: data.user.created_at,
          updatedAt: new Date().toISOString()
        };

        setCurrentUser(userObj);

        if (role === 'ADMIN') {
          router.push('/admin/dashboard');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-[#064E3B]/20 to-[#C7A86A]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md w-full rounded-2xl border border-emerald-950/80 bg-[#0B1F1A]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-md relative">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#0A0D0B] border border-[#C7A86A]/40 flex items-center justify-center mb-4 shadow-md shadow-[#C7A86A]/5">
            <Shield className="w-7 h-7 text-[#C7A86A]" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1E8] mb-2">{t('loginTitle')}</h1>
          <p className="text-xs text-[#A8B0AA] leading-relaxed">{t('loginSubtitle')}</p>
        </div>

        {errorMsg && (
          <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 p-3 mb-5 text-xs text-rose-300">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-[#A8B0AA] mb-1.5">{t('emailLabel')}</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                className="w-full rounded-lg border border-emerald-950 bg-[#0A0D0B] pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-[#F4F1E8] focus:border-[#C7A86A] focus:outline-none transition-all placeholder:text-[#A8B0AA]/40"
              />
              <Mail className="w-4 h-4 text-[#A8B0AA] absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A8B0AA] mb-1.5">{t('passwordLabel')}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-emerald-950 bg-[#0A0D0B] pl-10 pr-10 py-2.5 text-xs sm:text-sm text-[#F4F1E8] focus:border-[#C7A86A] focus:outline-none transition-all placeholder:text-[#A8B0AA]/40"
              />
              <Lock className="w-4 h-4 text-[#A8B0AA] absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-[#A8B0AA] hover:text-[#C7A86A] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#C7A86A] text-[#0A0D0B] font-bold text-xs uppercase tracking-wider hover:bg-[#d8b97c] shadow-lg shadow-[#C7A86A]/10 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer mt-2"
          >
            <span>{loading ? t('signingIn') : t('submitLogin')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security badge footer */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#A8B0AA]/80 mb-6">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t('secureShieldNote')}</span>
        </div>

        <p className="text-center text-xs text-[#A8B0AA]">
          {t('noAccount')}{' '}
          <Link href="/register" className="text-[#C7A86A] hover:underline font-semibold ml-1">
            {t('submitRegister')}
          </Link>
        </p>
      </div>
    </div>
  );
}
