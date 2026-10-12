'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Shield, Brain, Sparkles, CheckCircle2, ArrowRight, Activity, BookOpen, Compass, Award } from 'lucide-react';

export default function LandingPage() {
  const t = useTranslations('landing');
  const tCommon = useTranslations('common');

  return (
    <div className="flex-1 flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36 border-b border-emerald-950/40">
        {/* Subtle ambient luxury background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#064E3B]/20 via-[#0B1F1A]/30 to-[#C7A86A]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C7A86A]/30 bg-[#0B1F1A]/80 px-4 py-1.5 text-xs text-[#C7A86A] mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-medium tracking-wide uppercase">{t('heroBadge')}</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F1E8] leading-[1.08] mb-6">
            <span className="block text-[#A8B0AA]">{t('heroTitle1')}</span>
            <span className="block bg-gradient-to-r from-[#F4F1E8] via-[#C7A86A] to-[#F4F1E8] bg-clip-text text-transparent">
              {t('heroTitle2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#A8B0AA] leading-relaxed mb-10 font-sans">
            {t('heroSubtitle')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/checkout"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg bg-[#C7A86A] text-[#0A0D0B] font-bold text-sm tracking-wide hover:bg-[#d8b97c] shadow-lg shadow-[#C7A86A]/10 transition-all group"
            >
              <span>{t('ctaStart')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#0B1F1A] hover:bg-[#064E3B]/70 text-[#F4F1E8] border border-emerald-900/60 text-sm font-medium transition-all"
            >
              <BookOpen className="w-4 h-4 text-[#C7A86A]" />
              <span>Ver Diario Interactivo</span>
            </Link>
          </div>

          {/* Micro Stats Bar */}
          <div className="mt-16 grid grid-cols-3 divide-x divide-emerald-950/80 max-w-xl mx-auto border-y border-emerald-950/60 py-4 text-xs text-[#A8B0AA]">
            <div>
              <p className="text-base font-bold text-[#F4F1E8] font-serif">{t('statsStudents')}</p>
              <p className="text-[11px] text-[#A8B0AA]/70">Comunidad Activa</p>
            </div>
            <div>
              <p className="text-base font-bold text-[#C7A86A] font-serif">{t('statsRating')}</p>
              <p className="text-[11px] text-[#A8B0AA]/70">Índice de Claridad</p>
            </div>
            <div>
              <p className="text-base font-bold text-[#F4F1E8] font-serif">{t('statsDays')}</p>
              <p className="text-[11px] text-[#A8B0AA]/70">Protocolo de 3 Etapas</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Scientific Foundation: The PAUSE Method */}
      <section className="py-20 md:py-28 bg-[#0B1F1A]/30 border-b border-emerald-950/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#C7A86A] font-semibold">
              Arquitectura Cognitiva
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1E8] mt-2 mb-4">
              {t('pauseMethodTitle')}
            </h2>
            <p className="text-sm sm:text-base text-[#A8B0AA]">
              {t('pauseMethodSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { letter: 'P', title: 'Percibir', desc: t('pauseP'), icon: Activity },
              { letter: 'A', title: 'Analizar', desc: t('pauseA'), icon: Brain },
              { letter: 'U', title: 'Uncover', desc: t('pauseU'), icon: Compass },
              { letter: 'S', title: 'Simular', desc: t('pauseS'), icon: Sparkles },
              { letter: 'L', title: 'Aprender', desc: t('pauseL'), icon: Award },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-emerald-950/80 bg-[#064E3B]/20 p-5 hover:border-[#C7A86A]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-3xl font-bold text-[#C7A86A]">{step.letter}</span>
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#F4F1E8] mb-2">{step.title}</h3>
                    <p className="text-xs text-[#A8B0AA] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. The 3 Stages Breakdown */}
      <section className="py-20 md:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C7A86A] font-semibold">
            Plan de Estudio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1E8] mt-2">
            {t('stagesTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-xl border border-emerald-950/60 bg-[#0B1F1A]/40 p-7 flex flex-col justify-between hover:border-emerald-800/60 transition-all">
            <div>
              <span className="text-xs font-semibold uppercase text-emerald-400">Días 1 al 7</span>
              <h3 className="font-serif text-2xl font-bold text-[#F4F1E8] mt-2 mb-4">{t('stage1Title')}</h3>
              <p className="text-sm text-[#A8B0AA] leading-relaxed mb-6">{t('stage1Desc')}</p>
            </div>
            <div className="border-t border-emerald-950/60 pt-4 text-xs text-[#C7A86A]">
              Foco: Deconstruir el piloto automático
            </div>
          </div>

          <div className="rounded-xl border border-[#C7A86A]/30 bg-[#0B1F1A]/60 p-7 flex flex-col justify-between relative shadow-lg shadow-emerald-950/30">
            <div className="absolute -top-3 right-6 bg-[#C7A86A] text-[#0A0D0B] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              Punto de Inflexión
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-[#C7A86A]">Días 8 al 14</span>
              <h3 className="font-serif text-2xl font-bold text-[#F4F1E8] mt-2 mb-4">{t('stage2Title')}</h3>
              <p className="text-sm text-[#A8B0AA] leading-relaxed mb-6">{t('stage2Desc')}</p>
            </div>
            <div className="border-t border-emerald-950/60 pt-4 text-xs text-[#C7A86A]">
              Foco: Habitar la brecha de Frankl
            </div>
          </div>

          <div className="rounded-xl border border-emerald-950/60 bg-[#0B1F1A]/40 p-7 flex flex-col justify-between hover:border-emerald-800/60 transition-all">
            <div>
              <span className="text-xs font-semibold uppercase text-emerald-400">Días 15 al 21</span>
              <h3 className="font-serif text-2xl font-bold text-[#F4F1E8] mt-2 mb-4">{t('stage3Title')}</h3>
              <p className="text-sm text-[#A8B0AA] leading-relaxed mb-6">{t('stage3Desc')}</p>
            </div>
            <div className="border-t border-emerald-950/60 pt-4 text-xs text-[#C7A86A]">
              Foco: Algoritmos de respuesta inmediata
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pricing / Conversion Box */}
      <section className="py-20 bg-gradient-to-b from-[#0A0D0B] via-[#064E3B]/20 to-[#0A0D0B] border-t border-emerald-950/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-[#C7A86A]/40 bg-[#0B1F1A]/90 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
            <span className="text-xs uppercase tracking-widest text-[#C7A86A] font-semibold">
              Acceso Inmediato
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1E8] mt-2 mb-4">
              {t('pricingTitle')}
            </h2>
            <p className="text-sm text-[#A8B0AA] mb-8">{t('pricingSubtitle')}</p>

            <div className="flex items-baseline justify-center gap-3 mb-2">
              <span className="text-5xl font-serif font-bold text-[#F4F1E8]">{t('price')}</span>
              <span className="text-base text-[#A8B0AA]/60 line-through">{t('priceOriginal')}</span>
            </div>
            <p className="text-xs text-[#C7A86A] mb-8">{t('priceNote')}</p>

            {/* Checklist features */}
            <div className="space-y-3 text-left max-w-md mx-auto mb-10 text-xs sm:text-sm text-[#F4F1E8]">
              {[t('pricingFeature1'), t('pricingFeature2'), t('pricingFeature3'), t('pricingFeature4'), t('pricingFeature5')].map(
                (feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C7A86A] shrink-0 mt-0.5" />
                    <span className="text-[#A8B0AA]">{feature}</span>
                  </div>
                )
              )}
            </div>

            <Link
              href="/checkout"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#C7A86A] text-[#0A0D0B] font-bold text-sm tracking-wide hover:bg-[#d8b97c] shadow-lg transition-all"
            >
              <span>{t('buyNow')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
