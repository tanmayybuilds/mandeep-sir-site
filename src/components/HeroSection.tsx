import React from 'react';
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
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-[#070D1B] via-[#0A1628] to-[#0F1D32] text-white pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-teal-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-sky-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-teal-500/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10 space-y-16 lg:space-y-20">
        {/* Centered Editorial Value Proposition */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Tracked Section Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-[11px] uppercase tracking-[0.22em] font-bold text-teal-300">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span>Registered Wealth &amp; Tax Strategy · British Columbia</span>
          </div>

          {/* Heading with Editorial Serif & Instrument Serif */}
          <h1
            className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            The Power of TFSA &amp; FHSA.{' '}
            <span className="font-instrument block sm:inline font-normal text-teal-300 text-[1.1em]">
              Save Today. Build Tomorrow.
            </span>
          </h1>

          {/* Lead Proposition */}
          <p className="font-editorial text-xl sm:text-2xl font-bold text-white/90">
            Two powerful accounts. One goal — your financial future.
          </p>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From capturing immediate income tax deductions with the{' '}
            <strong className="text-teal-300 font-semibold">FHSA ($8,000/yr)</strong> to compounding
            lifelong tax-free wealth inside your{' '}
            <strong className="text-sky-300 font-semibold">TFSA ($7,000/yr)</strong>—we replace
            financial overwhelm with enduring clarity.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onPrimaryCtaClick}
              className="group inline-flex items-center gap-3.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 pl-7 pr-3 py-3.5 text-sm font-bold text-[#0A1628] shadow-lg shadow-teal-500/25 active:scale-95 transition-all cursor-pointer hover-lift"
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

          {/* Key 3 Metric Counters */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg mx-auto">
            <div>
              <p className="font-editorial text-2xl sm:text-4xl font-bold tabular-nums text-white">
                $8,000
              </p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-slate-400 mt-1 font-medium">
                FHSA Annual Limit
              </p>
            </div>
            <div>
              <p className="font-editorial text-2xl sm:text-4xl font-bold tabular-nums text-white">
                $7,000
              </p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-slate-400 mt-1 font-medium">
                TFSA 2026 Limit
              </p>
            </div>
            <div>
              <p className="font-editorial text-2xl sm:text-4xl font-bold tabular-nums text-teal-400">
                ~$105.5k
              </p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-slate-400 mt-1 font-medium">
                10-Yr Model @ 6%
              </p>
            </div>
          </div>
        </div>

        {/* 3D Flowing Windows Ecosystem Centered Throughout the Section */}
        <div className="relative pt-6">
          {/* Orbit Guide Subtitle */}
          <div className="text-center mb-8">
            <span className="text-[11px] uppercase tracking-[0.25em] text-teal-400/80 font-bold inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Evenly Distributed 3D Wealth Architecture</span>
            </span>
          </div>

          {/* DESKTOP 3D ORBITAL VIEW (Centered & Evenly Distributed 360°) */}
          <div className="relative min-h-[640px] w-full max-w-[1140px] mx-auto hidden lg:flex items-center justify-center">
            {/* Concentric Orbital Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-teal-500/20 animate-pulse-ring pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-teal-500/15 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-white/5 pointer-events-none" />

            {/* Subtle Cross-Axis Align Guide Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/10 to-transparent pointer-events-none" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-teal-500/10 to-transparent pointer-events-none" />

            {/* 1. CENTER ANCHOR CARD: "Wealth Architecture" */}
            <div className="relative z-20 w-[270px] p-7 rounded-3xl bg-[#0A1628]/95 border-2 border-teal-400/50 shadow-2xl shadow-teal-500/20 text-center space-y-3.5 backdrop-blur-2xl transition-transform duration-300 hover:scale-105">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-teal-400/20 to-amber-300/20 border border-teal-400/40 flex items-center justify-center shadow-inner">
                <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
              </div>

              <div>
                <h2 className="font-editorial text-2xl font-bold text-white tracking-tight">
                  Wealth Architecture
                </h2>
                <div className="w-10 h-0.5 bg-gradient-to-r from-teal-400 to-amber-300 mx-auto mt-2 rounded-full" />
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
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-[390px] card-3d-glow p-5 rounded-2xl animate-float-1">
              <div className="flex items-center gap-2 mb-2 text-teal-400 text-[11px] font-bold uppercase tracking-wider">
                <Quote className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Strategy Rule · Mandeep Gurm</span>
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
            <div className="absolute top-14 right-4 z-10 w-[290px] card-3d-glow p-5 rounded-2xl animate-float-2">
              <div className="flex items-center justify-between text-teal-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-teal-300" />
                  FHSA Pillar Note
                </span>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/15 text-[10px] text-teal-300">
                  $8,000/yr
                </span>
              </div>
              <p className="font-editorial text-2xl font-bold text-white">$40,000 Lifetime</p>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                100% Tax deduction in BC + 100% tax-free qualifying home purchase.
              </p>
              <div className="mt-3 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-teal-400 to-teal-200 h-full w-[65%]" />
              </div>
            </div>

            {/* 4. RIGHT (3 o'clock): 10-Yr Compounding Model Card */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10 w-[280px] card-3d-glow p-5 rounded-2xl animate-float-3">
              <div className="flex items-center justify-between text-teal-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-teal-300" />
                  10-Yr Model
                </span>
                <span className="text-[10px] text-teal-300 font-mono">@ 6.0%</span>
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
            <div className="absolute bottom-6 right-8 z-10 w-[300px] card-3d-glow p-5 rounded-2xl animate-float-1">
              <div className="flex items-center gap-1.5 text-teal-400 text-[11px] font-bold uppercase tracking-wider mb-2.5">
                <Compass className="w-3.5 h-3.5 text-teal-300" />
                <span>Execution Instructions</span>
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
            <div className="absolute bottom-6 left-8 z-10 w-[290px] card-3d-glow p-5 rounded-2xl animate-float-2">
              <div className="flex items-center justify-between text-teal-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-300" />
                  Client Base
                </span>
                <span className="text-[10px] text-slate-300">British Columbia</span>
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
            <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 w-[280px] card-3d-glow p-5 rounded-2xl animate-float-3">
              <div className="flex items-center justify-between text-sky-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
                  TFSA Pillar Note
                </span>
                <span className="px-2 py-0.5 rounded-full bg-sky-500/15 text-[10px] text-sky-300">
                  $7,000/yr
                </span>
              </div>
              <p className="font-editorial text-2xl font-bold text-white">Tax-Free Forever</p>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                0% tax on capital gains, dividends &amp; withdrawals. Room carries forward for life.
              </p>
              <div className="mt-3 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-sky-400 to-sky-200 h-full w-[80%]" />
              </div>
            </div>

            {/* 8. TOP-LEFT (10:30 o'clock): Compounding Law Quote */}
            <div className="absolute top-14 left-4 z-10 w-[290px] card-3d-glow p-5 rounded-2xl animate-float-1">
              <div className="flex items-center gap-2 mb-2 text-teal-400 text-[11px] font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Compounding Law</span>
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
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 z-15 px-3.5 py-1 rounded-full bg-[#0A1628]/90 border border-teal-400/30 text-[10px] font-bold tracking-wider uppercase text-teal-300 backdrop-blur-md flex items-center gap-1.5 shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>CRA-Audited &amp; Compliant Accounts</span>
            </div>

            <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 z-15 px-3.5 py-1 rounded-full bg-[#0A1628]/90 border border-teal-400/30 text-[10px] font-bold tracking-wider uppercase text-teal-300 backdrop-blur-md flex items-center gap-1.5 shadow-md">
              <Check className="w-3.5 h-3.5 text-teal-400" />
              <span>Fiduciary · Zero Pressure 30-Min Call</span>
            </div>
          </div>

          {/* MOBILE & TABLET RESPONSIVE VIEW (Clean, Evenly Distributed Stack) */}
          <div className="block lg:hidden space-y-4">
            {/* Mobile Center Anchor Card */}
            <div className="w-full p-6 rounded-3xl bg-[#0A1628]/95 border-2 border-teal-400/50 shadow-2xl text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <h2 className="font-editorial text-2xl font-bold text-white">Wealth Architecture</h2>
              <div className="w-12 h-0.5 bg-gradient-to-r from-teal-400 to-amber-300 mx-auto rounded-full" />
              <p className="text-xs text-slate-300">
                TFSA &amp; FHSA Master Blueprint · British Columbia
              </p>
            </div>

            {/* Mobile Evenly Distributed Flowing Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Quote Card */}
              <div className="card-3d-glow p-5 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                  <Quote className="w-4 h-4 text-teal-400" />
                  <span>Strategy Rule</span>
                </div>
                <p className="font-instrument italic text-sm text-white/95">
                  &ldquo;Deduct FHSA first to slash your BC taxes. Reinvest the refund into TFSA for double-engine compounding.&rdquo;
                </p>
                <p className="text-[11px] text-slate-400">— Mandeep Gurm</p>
              </div>

              {/* FHSA Note Card */}
              <div className="card-3d-glow p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-teal-400 text-xs font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-teal-300" />
                    FHSA Note
                  </span>
                  <span className="text-[11px] text-teal-300">$8,000/yr</span>
                </div>
                <p className="font-editorial text-2xl font-bold text-white">$40,000 Lifetime</p>
                <p className="text-xs text-slate-300">
                  100% Tax deduction in BC + 100% tax-free qualifying home purchase.
                </p>
              </div>

              {/* TFSA Note Card */}
              <div className="card-3d-glow p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-sky-400 text-xs font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
                    TFSA Note
                  </span>
                  <span className="text-[11px] text-sky-300">$7,000/yr</span>
                </div>
                <p className="font-editorial text-2xl font-bold text-white">Tax-Free Forever</p>
                <p className="text-xs text-slate-300">
                  0% tax on capital gains, dividends &amp; withdrawals. Room carries forward for life.
                </p>
              </div>

              {/* 10-Yr Model Card */}
              <div className="card-3d-glow p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-teal-400 text-xs font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-teal-300" />
                    10-Yr Model
                  </span>
                  <span className="text-[11px] text-teal-300 font-mono">@ 6.0%</span>
                </div>
                <p className="font-editorial text-2xl font-bold text-teal-300">~$105,500</p>
                <p className="text-xs text-slate-300">
                  $80k Contributed + <strong className="text-white">$25.5k Tax-Free Growth</strong>
                </p>
              </div>

              {/* Step Sequence Card */}
              <div className="card-3d-glow p-5 rounded-2xl space-y-2 sm:col-span-2">
                <div className="flex items-center gap-1.5 text-teal-400 text-xs font-bold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5 text-teal-300" />
                  <span>Execution Instructions</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-200 pt-1">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-teal-400 font-bold block mb-1">Step 1</span>
                    <span>Max FHSA ($8k) before Dec 31 tax deadline</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-teal-400 font-bold block mb-1">Step 2</span>
                    <span>Claim income deduction on Line 20800</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-teal-400 font-bold block mb-1">Step 3</span>
                    <span>Direct full tax refund into TFSA ETFs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
