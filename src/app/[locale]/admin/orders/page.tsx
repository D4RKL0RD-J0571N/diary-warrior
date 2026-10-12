'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useAppStore } from '@/context/AppStoreContext';
import { ArrowLeft, DollarSign, CheckCircle2, Shield, RefreshCw } from 'lucide-react';

export default function AdminOrdersPage() {
  const t = useTranslations('admin');
  const { allStudents } = useAppStore();

  const orders = allStudents.map(s => s.order).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-950/60">
        <div>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-[#A8B0AA] hover:text-[#C7A86A] transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Métricas</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1E8]">
            {t('tabsOrders')}
          </h1>
        </div>
      </div>

      <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/40 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0A0D0B] text-[#A8B0AA] uppercase tracking-wider border-b border-emerald-950/80 font-semibold">
              <tr>
                <th className="py-3.5 px-4">Orden / ID</th>
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-4">Pasarela</th>
                <th className="py-3.5 px-4">Monto</th>
                <th className="py-3.5 px-4">Fecha</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-950/60 text-[#F4F1E8]">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-[#064E3B]/20 transition-colors">
                  <td className="py-4 px-4 font-mono text-[11px] text-[#A8B0AA]">
                    {order.id}
                    <div className="text-[10px] text-[#A8B0AA]/60 truncate max-w-[140px]">{order.sessionId}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-serif font-semibold">{order.customerName || 'Alumno'}</div>
                    <div className="text-[11px] text-[#A8B0AA]">{order.customerEmail}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-900 bg-[#0B1F1A] text-[#C7A86A] uppercase">
                      {order.provider}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#F4F1E8]">
                    ${(order.amount / 100).toFixed(2)} {order.currency.toUpperCase()}
                  </td>
                  <td className="py-4 px-4 text-[#A8B0AA]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Enlace de acceso reenviado a ${order.customerEmail}`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0B1F1A] hover:bg-[#064E3B] border border-emerald-900 text-[#F4F1E8] text-[11px] transition-colors"
                    >
                      <RefreshCw className="w-3 h-3 text-[#C7A86A]" />
                      <span>Reenviar Acceso</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
