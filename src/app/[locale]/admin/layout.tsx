'use client';

import React, { useEffect } from 'react';
import { useAppStore } from '@/context/AppStoreContext';
import { useRouter } from '@/i18n/routing';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAppStore();
  const router = useRouter();

  const isAdmin = currentUser?.role === 'ADMIN';

  if (!isAdmin) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-2xl border border-rose-950/60 bg-[#0B1F1A]/90 p-8 text-center shadow-2xl backdrop-blur-md">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-5 text-rose-400">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#F4F1E8] mb-2">Acceso Restringido</h2>
          <p className="text-xs text-[#A8B0AA] leading-relaxed mb-6">
            Esta sección es exclusiva para el mentor principal (Jafeth). Tu cuenta actual no cuenta con privilegios de administrador.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#064E3B] hover:bg-[#064E3B]/80 text-[#F4F1E8] text-xs font-bold uppercase tracking-wider border border-emerald-700/40 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Mi Diario</span>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
