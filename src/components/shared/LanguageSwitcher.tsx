'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (nextLocale: 'es' | 'en') => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className={`inline-flex items-center gap-1 rounded-full border border-emerald-900/60 bg-[#0B1F1A]/90 px-2 py-1 text-xs backdrop-blur-sm ${className}`}>
      <Globe className="w-3.5 h-3.5 text-[#C7A86A]" />
      <button
        type="button"
        onClick={() => handleLanguageChange('es')}
        className={`px-2 py-0.5 rounded-full transition-all duration-200 font-medium ${
          locale === 'es'
            ? 'bg-[#C7A86A] text-[#0A0D0B] shadow-sm font-semibold'
            : 'text-[#A8B0AA] hover:text-[#F4F1E8]'
        }`}
      >
        ES
      </button>
      <span className="text-emerald-900/80">|</span>
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-0.5 rounded-full transition-all duration-200 font-medium ${
          locale === 'en'
            ? 'bg-[#C7A86A] text-[#0A0D0B] shadow-sm font-semibold'
            : 'text-[#A8B0AA] hover:text-[#F4F1E8]'
        }`}
      >
        EN
      </button>
    </div>
  );
}
