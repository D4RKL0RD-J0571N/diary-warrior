"use client";

import React from "react";
import Link from "next/link";
import { UI_CONTENT } from "@/data/ui-content";

/**
 * High-conversion pricing page for the 21-day journal.
 * Designed to feel premium, urgent, and trustworthy.
 * 
 * The checkout URL is configured via NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL.
 * When a user is authenticated, we append their user_id as custom data
 * so the webhook can link the payment to their account.
 */
export default function PricingPage() {
  const checkoutUrl = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL || "#";
  const content = UI_CONTENT.pricing;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-brand/[0.03] blur-[120px] top-1/4 left-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-brand/[0.05] blur-[80px] bottom-1/4 right-0 pointer-events-none" />

      {/* Top navigation */}
      <div className="w-full max-w-[900px] flex items-center justify-between mb-12 md:mb-16 relative z-10">
        <Link
          href="/"
          className="font-display text-sm tracking-[0.15em] uppercase text-brand hover:text-surface-white transition-colors"
        >
          ← La Mente del Guerrero
        </Link>
      </div>

      {/* Main card */}
      <div className="w-full max-w-[900px] relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-block bg-brand/10 border border-brand/30 text-brand text-[0.75rem] font-semibold tracking-[0.15em] uppercase py-1.5 px-5 rounded-full">
            {content.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-[2.2rem] md:text-[3.5rem] font-bold text-surface-white text-center leading-[1.1] mb-6">
          {content.headline}
        </h1>
        <p className="text-base md:text-lg text-surface-gray text-center leading-[1.7] max-w-[650px] mx-auto mb-14">
          {content.subheadline}
        </p>

        {/* Pricing Card */}
        <div className="bg-background-secondary border border-border rounded-lg p-8 md:p-12 max-w-[550px] mx-auto relative overflow-hidden">
          {/* Glow accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent" />

          {/* Price */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-surface-gray-dim line-through text-xl font-sans">
                {content.originalPrice}
              </span>
              <span className="font-display text-[3.5rem] md:text-[4.5rem] font-bold text-surface-white leading-none">
                {content.currentPrice}
              </span>
            </div>
            <p className="text-[0.8rem] text-surface-gray tracking-[0.1em] uppercase">
              {content.priceNote}
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-10">
            {content.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 min-w-[20px] rounded-full bg-brand/15 flex items-center justify-center mt-0.5">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-brand">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
                <span className="text-[0.95rem] text-surface-white leading-[1.5]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href={checkoutUrl}
            className="block w-full bg-brand text-black text-center py-4 px-8 font-sans text-[0.95rem] font-bold tracking-[0.12em] uppercase transition-all duration-300 rounded-[3px] hover:bg-[#22b885] hover:shadow-[0_0_30px_rgba(34,184,133,0.35)] hover:-translate-y-0.5 active:translate-y-0"
          >
            {content.ctaButton}
          </a>

          {/* Guarantee */}
          <p className="text-[0.8rem] text-surface-gray text-center mt-6 leading-[1.6]">
            🛡️ {content.guarantee}
          </p>
        </div>

        {/* Testimonial */}
        <div className="max-w-[550px] mx-auto mt-12 text-center">
          <p className="font-display italic text-surface-white text-base leading-[1.7] mb-3">
            &ldquo;{content.testimonialQuote}&rdquo;
          </p>
          <p className="text-[0.8rem] text-brand tracking-[0.1em] uppercase font-medium">
            — {content.testimonialAuthor}
          </p>
        </div>

        {/* Footer note */}
        <p className="text-[0.85rem] text-surface-gray-dim text-center mt-14">
          {content.footer}
        </p>
      </div>
    </div>
  );
}
