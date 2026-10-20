import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
  Home,
  TrendingUp,
  Quote,
  CheckCircle2,
  Users,
  Compass,
  Lightbulb,
} from 'lucide-react';

interface HeroSectionProps {
  onPrimaryCtaClick: () => void;
  onExploreCalculatorClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPrimaryCtaClick,
  onExploreCalculatorClick,
}) => {
  // Mobile filter category
  const [mobileTab, setMobileTab] = useState<'all' | 'notes' | 'quotes' | 'steps'>('all');

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-[#070D1B] via-[#0A1628] to-[#0F1D32] text-white pt-14 pb-20 lg:pt-20 lg:pb-32"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-teal-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[420px] h-[420px] bg-sky-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-teal-500/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 space-y-12 lg:space-y-18">
        {/* Centered Editorial Value Proposition */}
        <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6">
          {/* Tracked Section Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-bold text-teal-300">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span>Registered Wealth &amp; Tax Strategy · British Columbia</span>
          </div>

          {/* Heading with Editorial Serif & Instrument Serif */}
          <h1
            className="font-editorial text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] sm:leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            The Power of TFSA &amp; FHSA.{' '}
            <span className="font-instrument block sm:inline font-normal text-teal-300 text-[1.08em]">
              Save Today. Build Tomorrow.
            </span>
          </h1>

          {/* Lead Proposition */}
          <p className="font-editorial text-lg sm:text-2xl font-bold text-white/90">
            Two powerful accounts. One goal — your financial future.
          </p>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From capturing immediate income tax deductions with the{' '}
            <strong className="text-teal-300 font-semibold">FHSA ($8,000/yr)</strong> to compounding
            lifelong tax-free wealth inside your{' '}
            <strong className="text-sky-300 font-semibold">TFSA ($7,000/yr)</strong>—we replace
            financial overwhelm with enduring clarity.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={onPrimaryCtaClick}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-3.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 pl-7 pr-3 py-3.5 text-sm font-bold text-[#0A1628] shadow-lg shadow-teal-500/25 active:scale-95 transition-all cursor-pointer hover-lift min-h-[48px]"
            >
              <span>Book a Strategy Call</span>
              <div className="w-8 h-8 rounded-full bg-[#0A1628] text-teal-300 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 shrink-0">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </button>

            <button
              type="button"
              onClick={onExploreCalculatorClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all cursor-pointer min-h-[48px]"
            >
              <span>Simulate Growth</span>
              <span className="text-teal-400">→</span>
            </button>
          </div>

          {/* Key 3 Metric Counters */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-5 border-t border-white/10 max-w-lg mx-auto">
            <div className="p-2 sm:p-0">
              <p className="font-editorial text-xl sm:text-4xl font-bold tabular-nums text-white">
                $8,000
              </p>
              <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.14em] text-slate-400 mt-1 font-medium">
                FHSA Annual
              </p>
            </div>
            <div className="p-2 sm:p-0">
              <p className="font-editorial text-xl sm:text-4xl font-bold tabular-nums text-white">
                $7,000
              </p>
              <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.14em] text-slate-400 mt-1 font-medium">
                TFSA 2026
              </p>
            </div>
            <div className="p-2 sm:p-0">
              <p className="font-editorial text-xl sm:text-4xl font-bold tabular-nums text-teal-400">
                ~$105.5k
              </p>
              <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.14em] text-slate-400 mt-1 font-medium">
                10-Yr Model @ 6%
              </p>
            </div>
          </div>
        </div>

        {/* 3D Flowing Windows Ecosystem Centered Throughout the Section */}
        <div className="relative pt-4 sm:pt-6">
          {/* Section Indicator */}
          <div className="text-center mb-6 lg:mb-8">
            <span className="text-[11px] uppercase tracking-[0.25em] text-teal-400/90 font-bold inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>3D Wealth Architecture &amp; Compounding Orbit</span>
            </span>
          </div>

          {/* DESKTOP 3D ORBITAL VIEW (Centered & Evenly Distributed 360°) */}
          <div className="relative min-h-[660px] w-full max-w-[1160px] mx-auto hidden lg:flex items-center justify-center">
            {/* Concentric Orbital Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-teal-500/20 animate-pulse-ring pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[740px] h-[740px] rounded-full border border-teal-500/15 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1020px] h-[1020px] rounded-full border border-white/5 pointer-events-none" />

            {/* Orbit Satellites (Tiny Glowing Planet Dots Traveling on Paths) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none">
              <div className="orbit-satellite-1 w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_12px_#2DD4BF]" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none">
              <div className="orbit-satellite-2 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#FCD34D]" />
            </div>

            {/* Subtle Cross-Axis Align Guide Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/10 to-transparent pointer-events-none" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-teal-500/10 to-transparent pointer-events-none" />

            {/* 1. CENTER ANCHOR CARD: "Wealth Architecture" */}
            <div className="relative z-20 w-[280px] p-8 rounded-3xl anchor-card-3d border-2 border-teal-400/60 ring-8 ring-teal-500/10 text-center space-y-4 backdrop-blur-2xl transition-all duration-300 hover:scale-105">
              <div className="w-13 h-13 mx-auto rounded-2xl bg-gradient-to-br from-teal-400/25 to-amber-300/20 border border-teal-400/50 flex items-center justify-center shadow-inner">
                <Sparkles className="w-7 h-7 text-amber-300 animate-pulse" />
              </div>

              <div>
                <h2 className="font-editorial text-2xl font-bold text-white tracking-tight">
                  Wealth Architecture
                </h2>
                <div className="w-12 h-0.5 bg-gradient-to-r from-teal-400 via-amber-300 to-teal-400 mx-auto mt-2 rounded-full" />
              </div>

              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                TFSA &amp; FHSA Master Blueprint
              </p>

              <div className="pt-2 border-t border-white/10">
                <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-teal-300 bg-teal-500/15 px-3 py-1 rounded-full border border-teal-500/30">
                  British Columbia Practice
                </span>
              </div>
            </div>

            {/* 2. TOP (12 o'clock): Floating Wisdom Quote Card */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-[400px] window-glass p-5 rounded-2xl animate-float-1">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400/90" />
                  <span className="w-2 h-2 rounded-full bg-amber-400/70" />
                  <span className="w-2 h-2 rounded-full bg-sky-400/70" />
                </div>
                <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Quote className="w-3.5 h-3.5 text-teal-400" />
                  Strategy Rule · Mandeep Gurm
                </span>
              </div>
              <p className="font-instrument italic text-base text-white/95 leading-snug">
                &ldquo;Deduct FHSA first to slash your BC taxes. Reinvest the refund into TFSA for double-engine compounding.&rdquo;
              </p>
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>The Dual-Engine Blueprint</span>
                <span className="text-teal-300 font-semibold">100% Tax-Advantaged</span>
              </div>
            </div>

            {/* 3. TOP-RIGHT (1:30 o'clock): FHSA Pillar Note Card */}
            <div className="absolute top-12 right-2 z-10 w-[295px] window-glass p-5 rounded-2xl animate-float-2">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400/90" />
                  <span className="w-2 h-2 rounded-full bg-teal-300/60" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1">
                  <Home className="w-3.5 h-3.5 text-teal-300" />
                  FHSA Note
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-editorial text-2xl font-bold text-white">$8,000/yr</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 font-bold">
                  $40k Max
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                100% Tax deduction in BC + 100% tax-free qualifying home purchase.
              </p>
              <div className="mt-3 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-teal-400 to-teal-200 h-full w-[65%]" />
              </div>
            </div>

            {/* 4. RIGHT (3 o'clock): 10-Yr Compounding Model Card */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10 w-[285px] window-glass p-5 rounded-2xl animate-float-3">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400/90" />
                  <span className="w-2 h-2 rounded-full bg-amber-400/70" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-teal-300" />
                  10-Yr Model @ 6%
                </span>
              </div>
              <p className="font-editorial text-2xl font-bold text-teal-300">~$105,500</p>
              <p className="text-xs text-slate-300 mt-1">
                $80k Contributed + <strong className="text-white">$25.5k Tax-Free Growth</strong>
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10">
                <span>Growth Engine</span>
                <span className="text-teal-400 font-semibold">Active Compounding</span>
              </div>
            </div>

            {/* 5. BOTTOM-RIGHT (4:30 o'clock): Instruction Card (Step Sequence) */}
            <div className="absolute bottom-6 right-6 z-10 w-[305px] window-glass p-5 rounded-2xl animate-float-1">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400/90" />
                  <span className="w-2 h-2 rounded-full bg-sky-400/70" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-teal-300" />
                  Execution Sequence
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-200">
                <div className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">1.</span>
                  <span>Max FHSA ($8k) before Dec 31 tax deadline</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">2.</span>
                  <span>Claim income deduction on Line 20800</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">3.</span>
                  <span>Direct full tax refund into TFSA ETFs</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-teal-400" />
                <span>Optimal BC Sequencing</span>
              </div>
            </div>

            {/* 6. BOTTOM-LEFT (7:30 o'clock): Practice & Client Base Card */}
            <div className="absolute bottom-6 left-6 z-10 w-[295px] window-glass p-5 rounded-2xl animate-float-2">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400/90" />
                  <span className="w-2 h-2 rounded-full bg-amber-400/70" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-teal-300" />
                  BC Practice
                </span>
              </div>
              <p className="font-editorial text-2xl font-bold text-white">500+ Families</p>
              <p className="text-xs text-slate-300 mt-1">
                Fiduciary blueprints tailored to Vancouver, Surrey &amp; Fraser Valley.
              </p>
              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Practice Scope</span>
                <span className="text-teal-300 font-semibold">100% Independent</span>
              </div>
            </div>

            {/* 7. LEFT (9 o'clock): TFSA Pillar Note Card */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 w-[285px] window-glass p-5 rounded-2xl animate-float-3">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400/90" />
                  <span className="w-2 h-2 rounded-full bg-teal-400/70" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
                  TFSA Note
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-editorial text-2xl font-bold text-white">$7,000/yr</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 font-bold">
                  Tax-Free
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                0% tax on capital gains, dividends &amp; withdrawals. Room carries forward for life.
              </p>
              <div className="mt-3 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-sky-400 to-sky-200 h-full w-[80%]" />
              </div>
            </div>

            {/* 8. TOP-LEFT (10:30 o'clock): Compounding Law Quote */}
            <div className="absolute top-12 left-2 z-10 w-[295px] window-glass p-5 rounded-2xl animate-float-1">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400/90" />
                  <span className="w-2 h-2 rounded-full bg-teal-400/70" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                  Compounding Law
                </span>
              </div>
              <p className="font-instrument italic text-sm text-slate-200 leading-snug">
                &ldquo;Never let wealth sit in a 0.5% checking account. Registered accounts turn CRA refunds into home equity.&rdquo;
              </p>
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Wealth Velocity</span>
                <span className="text-teal-300 font-semibold">Active Strategy</span>
              </div>
            </div>

            {/* Micro Orbit Trust Badges (Evenly Distributed) */}
            <div className="absolute top-[27%] left-1/2 -translate-x-1/2 z-15 px-3.5 py-1 rounded-full bg-[#0A1628]/95 border border-teal-400/40 text-[10px] font-bold tracking-wider uppercase text-teal-300 backdrop-blur-md flex items-center gap-1.5 shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>CRA-Audited &amp; Registered Accounts</span>
            </div>

            <div className="absolute bottom-[27%] left-1/2 -translate-x-1/2 z-15 px-3.5 py-1 rounded-full bg-[#0A1628]/95 border border-teal-400/40 text-[10px] font-bold tracking-wider uppercase text-teal-300 backdrop-blur-md flex items-center gap-1.5 shadow-md">
              <Check className="w-3.5 h-3.5 text-teal-400" />
              <span>Fiduciary · Zero Pressure 30-Min Call</span>
            </div>
          </div>

          {/* MOBILE & TABLET VIEW: Interactive, Snapping 3D Carousel & Segmented Filter */}
          <div className="block lg:hidden space-y-4">
            {/* Mobile Anchor Center Card */}
            <div className="w-full p-6 rounded-3xl anchor-card-3d border-2 border-teal-400/60 shadow-2xl text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <h2 className="font-editorial text-2xl font-bold text-white">Wealth Architecture</h2>
              <div className="w-12 h-0.5 bg-gradient-to-r from-teal-400 to-amber-300 mx-auto rounded-full" />
              <p className="text-xs text-slate-300">
                TFSA &amp; FHSA Master Blueprint · British Columbia
              </p>
            </div>

            {/* Mobile Category Segmented Control */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl text-xs font-semibold">
              {[
                { id: 'all', label: 'All Cards' },
                { id: 'notes', label: 'Pillars' },
                { id: 'quotes', label: 'Quotes' },
                { id: 'steps', label: 'Steps' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMobileTab(tab.id as typeof mobileTab)}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-medium transition-all text-center cursor-pointer ${
                    mobileTab === tab.id
                      ? 'bg-teal-400 text-[#0A1628] font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mobile Horizontal Snapping 3D Cards Track */}
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 pt-1 px-1 no-scrollbar">
              {/* Card: FHSA Note */}
              {(mobileTab === 'all' || mobileTab === 'notes') && (
                <div className="snap-center shrink-0 w-[285px] sm:w-[320px] window-glass p-5 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1">
                      <Home className="w-3.5 h-3.5 text-teal-300" />
                      FHSA Note
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 font-bold">
                      $8,000/yr
                    </span>
                  </div>
                  <p className="font-editorial text-2xl font-bold text-white">$40,000 Lifetime</p>
                  <p className="text-xs text-slate-300">
                    100% Tax deduction in BC + 100% tax-free qualifying home purchase.
                  </p>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-gradient-to-r from-teal-400 to-teal-200 h-full w-[65%]" />
                  </div>
                </div>
              )}

              {/* Card: TFSA Note */}
              {(mobileTab === 'all' || mobileTab === 'notes') && (
                <div className="snap-center shrink-0 w-[285px] sm:w-[320px] window-glass p-5 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
                      TFSA Note
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 font-bold">
                      $7,000/yr
                    </span>
                  </div>
                  <p className="font-editorial text-2xl font-bold text-white">Tax-Free Forever</p>
                  <p className="text-xs text-slate-300">
                    0% tax on capital gains, dividends &amp; withdrawals. Room carries forward for life.
                  </p>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-gradient-to-r from-sky-400 to-sky-200 h-full w-[80%]" />
                  </div>
                </div>
              )}

              {/* Card: 10-Yr Model */}
              {(mobileTab === 'all' || mobileTab === 'notes') && (
                <div className="snap-center shrink-0 w-[285px] sm:w-[320px] window-glass p-5 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-teal-300" />
                      10-Yr Model
                    </span>
                    <span className="text-[10px] text-teal-300 font-mono font-bold">@ 6.0%</span>
                  </div>
                  <p className="font-editorial text-2xl font-bold text-teal-300">~$105,500</p>
                  <p className="text-xs text-slate-300">
                    $80k Contributed + <strong className="text-white">$25.5k Tax-Free Growth</strong>
                  </p>
                  <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 flex justify-between">
                    <span>Mandeep Signature</span>
                    <span className="text-teal-300 font-bold">Compounding Engine</span>
                  </div>
                </div>
              )}

              {/* Card: Quote Rule */}
              {(mobileTab === 'all' || mobileTab === 'quotes') && (
                <div className="snap-center shrink-0 w-[285px] sm:w-[320px] window-glass p-5 rounded-2xl space-y-2.5">
                  <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 text-teal-400 text-xs font-bold uppercase tracking-wider">
                    <Quote className="w-4 h-4 text-teal-400" />
                    <span>Strategy Rule</span>
                  </div>
                  <p className="font-instrument italic text-sm text-white/95 leading-relaxed">
                    &ldquo;Deduct FHSA first to slash your BC taxes. Reinvest the refund into TFSA for double-engine compounding.&rdquo;
                  </p>
                  <p className="text-[11px] text-slate-400 pt-1 border-t border-white/10">
                    — Mandeep Gurm, BC Wealth Strategist
                  </p>
                </div>
              )}

              {/* Card: Compounding Law */}
              {(mobileTab === 'all' || mobileTab === 'quotes') && (
                <div className="snap-center shrink-0 w-[285px] sm:w-[320px] window-glass p-5 rounded-2xl space-y-2.5">
                  <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4 text-amber-300" />
                    <span>Compounding Law</span>
                  </div>
                  <p className="font-instrument italic text-sm text-slate-200 leading-relaxed">
                    &ldquo;Never let wealth sit in a 0.5% checking account. Registered accounts turn CRA refunds into home equity.&rdquo;
                  </p>
                  <p className="text-[11px] text-teal-300 pt-1 border-t border-white/10 font-semibold">
                    100% Tax-Sheltered Strategy
                  </p>
                </div>
              )}

              {/* Card: Step Sequence */}
              {(mobileTab === 'all' || mobileTab === 'steps') && (
                <div className="snap-center shrink-0 w-[285px] sm:w-[320px] window-glass p-5 rounded-2xl space-y-2.5">
                  <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 text-teal-300 text-xs font-bold uppercase tracking-wider">
                    <Compass className="w-4 h-4 text-teal-300" />
                    <span>Execution Sequence</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-200">
                    <p><strong className="text-teal-400">1.</strong> Max FHSA ($8k) before Dec 31</p>
                    <p><strong className="text-teal-400">2.</strong> Claim Line 20800 BC deduction</p>
                    <p><strong className="text-teal-400">3.</strong> Direct refund into TFSA ETFs</p>
                  </div>
                  <div className="pt-2 border-t border-white/10 text-[10px] text-teal-300 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Optimal BC Flow</span>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile swipe helper hint */}
            <div className="text-center text-[10px] text-slate-400 font-medium">
              ← Swipe horizontally to explore all 3D cards →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
