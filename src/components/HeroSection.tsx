import React from 'react';
import { ArrowRight, ShieldCheck, Check, Sparkles, Home, TrendingUp, Calendar } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

interface HeroSectionProps {
  onPrimaryCtaClick: () => void;
  onExploreCalculatorClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPrimaryCtaClick,
  onExploreCalculatorClick,
}) => {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-[#070D1B] via-[#0A1628] to-[#0F1D32] text-white pt-16 pb-20 lg:pt-24 lg:pb-32"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-sky-500/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Value */}
          <div className="lg:col-span-7 space-y-8">
            {/* Tracked Section Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-[11px] uppercase tracking-[0.22em] font-semibold text-teal-300">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span>Registered Wealth &amp; Tax Strategy · British Columbia</span>
            </div>

            {/* Editorial Heading with Instrument Serif */}
            <div className="space-y-3">
              <h1
                className="font-editorial text-4xl sm:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-white leading-[1.08]"
                style={{ textWrap: 'balance' }}
              >
                The Power of TFSA &amp; FHSA.{' '}
                <span className="font-instrument block sm:inline font-normal text-teal-300 text-[1.12em]">
                  Save Tax. Build Wealth.
                </span>
              </h1>
            </div>

            {/* Crisp Proposition */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              The math is done before you deposit a single dollar: CRA limits, marginal tax deductions,
              and lifelong tax-free compounding. Clear, independent guidance for British Columbia professionals and home buyers.
            </p>

            {/* Action Buttons with Sliding Circle Arrow */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onPrimaryCtaClick}
                className="group inline-flex items-center gap-3.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 pl-7 pr-3 py-3 text-sm font-bold text-[#0A1628] shadow-lg shadow-teal-500/25 active:scale-95 transition-all cursor-pointer hover-lift"
              >
                <span>Book a Strategy Call</span>
                <div className="w-8 h-8 rounded-full bg-[#0A1628] text-teal-300 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 shrink-0">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>

              <button
                type="button"
                onClick={onExploreCalculatorClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all cursor-pointer"
              >
                <span>Simulate Growth</span>
                <span className="text-teal-400">→</span>
              </button>
            </div>

            {/* Metric Pills */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <p className="font-editorial text-3xl sm:text-4xl font-bold tabular-nums text-white">
                  $8,000
                </p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 mt-1 font-medium">
                  FHSA Tax Deduction
                </p>
              </div>
              <div>
                <p className="font-editorial text-3xl sm:text-4xl font-bold tabular-nums text-white">
                  $7,000
                </p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 mt-1 font-medium">
                  TFSA 2026 Limit
                </p>
              </div>
              <div>
                <p className="font-editorial text-3xl sm:text-4xl font-bold tabular-nums text-teal-400">
                  100%
                </p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 mt-1 font-medium">
                  Tax-Free In &amp; Out
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Dual-Pillar Snapshot */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl p-7 sm:p-9 space-y-6 shadow-2xl hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-teal-400 font-bold block">
                    Strategic Contrast
                  </span>
                  <h3 className="text-xl font-bold text-white font-editorial">
                    Two Pillars. One Outcome.
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-300 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* FHSA Card */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/[0.08] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center">
                      <Home className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-white">FHSA (Home Accelerator)</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    $8,000 / yr
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  Tax-deductible contributions going in (reduces net income) + 100% tax-free withdrawals coming out for your first Canadian home.
                </p>
              </div>

              {/* TFSA Card */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/[0.08] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-white">TFSA (Lifelong Liquidity)</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    $7,000 / yr
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  All investment gains, interest, and dividends compound 100% tax-free forever, with unrestricted withdrawal flexibility at any age.
                </p>
              </div>

              {/* Bottom Quote & Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="font-instrument italic text-sm text-teal-300">
                  "Education first. Plan second."
                </span>
                <button
                  type="button"
                  onClick={onPrimaryCtaClick}
                  className="font-bold text-white hover:text-teal-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Book Free Call</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
