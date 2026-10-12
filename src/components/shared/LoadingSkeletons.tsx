import React from 'react';

export function SkeletonPulse({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-[#064E3B]/20 rounded-lg border border-emerald-950/40 ${className}`}
    />
  );
}

export function DayCardSkeleton() {
  return (
    <div className="rounded-xl border border-emerald-950/60 bg-[#0B1F1A]/40 p-4 flex flex-col justify-between h-36 animate-pulse">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-16 h-3 bg-emerald-950/80 rounded" />
          <div className="w-4 h-4 bg-emerald-950/80 rounded-full" />
        </div>
        <div className="w-full h-4 bg-emerald-950/90 rounded mb-2" />
        <div className="w-2/3 h-3 bg-emerald-950/60 rounded" />
      </div>
      <div className="pt-3 border-t border-emerald-950/60 flex items-center justify-between">
        <div className="w-12 h-2.5 bg-emerald-950/70 rounded" />
        <div className="w-10 h-3 bg-[#C7A86A]/20 rounded" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-pulse">
      {/* Hero card skeleton */}
      <div className="rounded-2xl border border-emerald-950/80 bg-[#0B1F1A]/60 p-8 sm:p-10 mb-10 h-64 flex flex-col justify-between">
        <div>
          <div className="w-32 h-3 bg-[#C7A86A]/20 rounded mb-4" />
          <div className="w-72 h-8 bg-emerald-950/80 rounded mb-3" />
          <div className="w-48 h-4 bg-emerald-950/60 rounded mb-6" />
        </div>
        <div className="w-full h-3 bg-[#0A0D0B] rounded-full overflow-hidden" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-6">
            <div className="w-48 h-6 bg-emerald-950/80 rounded" />
            <div className="w-24 h-4 bg-emerald-950/60 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <DayCardSkeleton key={i} />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/40 p-6 h-96" />
      </div>
    </div>
  );
}

export function DayDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-pulse space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-emerald-950/60">
        <div className="w-32 h-4 bg-emerald-950/80 rounded" />
        <div className="w-24 h-8 bg-emerald-950/60 rounded-md" />
      </div>
      <div>
        <div className="w-40 h-3 bg-[#C7A86A]/20 rounded mb-3" />
        <div className="w-96 h-8 bg-emerald-950/90 rounded mb-4" />
        <div className="w-full h-24 bg-[#0B1F1A]/60 border-l-2 border-[#C7A86A]/30 rounded-xl" />
      </div>
      <div className="rounded-xl border border-emerald-950/60 bg-[#0B1F1A]/40 p-6 h-48" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-emerald-950/60 bg-[#0B1F1A]/30 p-5 h-32" />
        ))}
      </div>
    </div>
  );
}
