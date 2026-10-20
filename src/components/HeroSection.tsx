import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Check, Sparkles, TrendingUp, Home, Lock } from 'lucide-react';
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
      className="relative overflow-hidden bg-gradient-to-b from-[#0A1628] via-[#0F1D32] to-[#14233C] text-white pt-14 pb-20 lg:pt-20 lg:pb-28"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Focused Executive Value Proposition */}
          <div className="lg:col-span-7 space-y-8">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-xs font-semibold text-teal-300">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Independent Registered Wealth Advisory · British Columbia</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1
                className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
                style={{ textWrap: 'balance' }}
              >
                The Power of TFSA &amp; FHSA.{' '}
                <span className="italic font-normal gradient-text-teal block sm:inline">
                  Save Tax. Build Wealth.
                </span>
              </h1>
            </div>

            {/* Focused 2-Line Narrative */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Two powerful Canadian accounts. One clear strategy. Capture immediate income tax deductions
              with the <strong className="text-teal-300 font-semibold">FHSA ($8,000/yr)</strong> and compound lifelong tax-free wealth inside your{' '}
              <strong className="text-sky-300 font-semibold">TFSA ($7,000/yr)</strong>.
            </p>

            {/* 3 Core Benefits Only (No Clutter) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>Immediate Tax Deductions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>100% Tax-Free Withdrawals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>Zero Pressure Consultations</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onPrimaryCtaClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full shadow-lg shadow-teal-500/20 transition-all cursor-pointer hover-lift"
              >
                <Calendar className="w-4 h-4 text-[#0A1628]" />
                <span>Book 1-on-1 Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#0A1628]" />
              </button>

              <button
                type="button"
                onClick={onExploreCalculatorClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-full transition-all cursor-pointer"
              >
                <span>Try Growth Simulator</span>
              </button>
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <p className="font-editorial text-2xl sm:text-3xl font-bold tabular-nums text-white">
                  $8,000
                </p>
                <p className="text-xs text-slate-400 mt-0.5">FHSA Annual Deduction</p>
              </div>
              <div>
                <p className="font-editorial text-2xl sm:text-3xl font-bold tabular-nums text-white">
                  $7,000
                </p>
                <p className="text-xs text-slate-400 mt-0.5">TFSA 2026 Limit</p>
              </div>
              <div>
                <p className="font-editorial text-2xl sm:text-3xl font-bold tabular-nums text-teal-400">
                  100%
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Tax-Free Home Purchase</p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Visual Comparison Snapshot (No Bloated Duplicate Form) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-7 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                    At A Glance
                  </span>
                  <h3 className="text-lg font-bold text-white font-editorial">
                    The Two Pillars of Canadian Wealth
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* FHSA Summary Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-teal-400" />
                    <span className="font-bold text-sm text-white">FHSA (First Home)</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300">
                    $8,000 / Year
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tax deduction going in (like an RRSP) + tax-free withdrawal coming out (like a TFSA).
                </p>
              </div>

              {/* TFSA Summary Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-sky-400" />
                    <span className="font-bold text-sm text-white">TFSA (Lifelong Wealth)</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300">
                    $7,000 / Year
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  100% tax-free investment growth, interest, and dividends with unlimited flexible withdrawals anytime.
                </p>
              </div>

              {/* Advisory Lockup Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">{MANDEEP_CONFIG.advisor.fullName}</p>
                  <p className="text-slate-400">{MANDEEP_CONFIG.advisor.roleTitle} · {MANDEEP_CONFIG.advisor.instagramHandle}</p>
                </div>
                <button
                  type="button"
                  onClick={onPrimaryCtaClick}
                  className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Book Session →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
