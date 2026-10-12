'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useAppStore } from '@/context/AppStoreContext';
import { Shield, CreditCard, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const { currentUser } = useAppStore();
  const [email, setEmail] = useState(currentUser?.email || '');
  const [name, setName] = useState(currentUser?.name || '');

  const handlePayPal = () => {
    // If you have a PayPal Payment Link, PayPal.me or PayPal Smart button URL
    const paypalUrl = process.env.NEXT_PUBLIC_PAYPAL_CHECKOUT_URL || 'https://www.paypal.com/ncp/payment/SAMPLE_PAYPAL_LINK';
    window.open(paypalUrl, '_blank');
  };

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full rounded-2xl border border-emerald-950/80 bg-[#0B1F1A]/80 p-8 sm:p-10 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#064E3B] border border-[#C7A86A]/40 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-[#C7A86A]" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1E8] mb-2">{t('title')}</h1>
          <p className="text-sm text-[#A8B0AA]">{t('subtitle')}</p>
        </div>

        {/* Product Box */}
        <div className="rounded-xl border border-[#C7A86A]/30 bg-[#064E3B]/20 p-5 mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#F4F1E8]">{t('productName')}</h3>
            <p className="text-xs text-[#A8B0AA]">{t('productSub')}</p>
          </div>
          <div className="text-right">
            <span className="font-serif text-2xl font-bold text-[#C7A86A]">$47</span>
            <span className="text-xs text-[#A8B0AA] block">USD</span>
          </div>
        </div>

        {/* Input Details */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-[#A8B0AA] mb-1">{t('nameLabel')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              className="w-full rounded-lg border border-emerald-950 bg-[#0A0D0B] px-3.5 py-2 text-sm text-[#F4F1E8] focus:border-[#C7A86A] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#A8B0AA] mb-1">{t('emailLabel')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              className="w-full rounded-lg border border-emerald-950 bg-[#0A0D0B] px-3.5 py-2 text-sm text-[#F4F1E8] focus:border-[#C7A86A] focus:outline-none"
            />
          </div>
        </div>

        {/* Payment CTA: Direct PayPal Checkout */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handlePayPal}
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#0070BA] text-white font-bold text-base tracking-wide hover:bg-[#005ea6] shadow-xl shadow-[#0070BA]/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <span className="font-extrabold italic text-lg">PayPal</span>
            <span>{t('payWithPayPal')}</span>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#A8B0AA]/80">
          <Lock className="w-3.5 h-3.5 text-[#C7A86A]" />
          <span>{t('securePayment')}</span>
        </div>
      </div>
    </div>
  );
}
