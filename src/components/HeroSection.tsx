import React from 'react';
import { ArrowRight, ShieldCheck, Check, Sparkles, Home, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
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
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-sky-500/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Authentic Mandeep Value Proposition */}
          <div className="lg:col-span-7 space-y-8">
            {/* Tracked Section Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-[11px] uppercase tracking-[0.22em] font-bold text-teal-300">
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
                  Save Today. Build Tomorrow.
                </span>
              </h1>
            </div>

            {/* Mandeep's Exact Signature Lead */}
            <div className="space-y-3">
              <p className="font-editorial text-xl sm:text-2xl font-bold text-white/90">
                Two powerful accounts. One goal — your financial future.
              </p>
              <p className="text-base text-slate-300 max-w-xl leading-relaxed">
                From capturing immediate income tax deductions with the <strong className="text-teal-300 font-semibold">FHSA ($8,000/yr)</strong> to compounding lifelong tax-free wealth inside your{' '}
                <strong className="text-sky-300 font-semibold">TFSA ($7,000/yr)</strong>—we replace financial overwhelm with enduring clarity.
              </p>
            </div>

            {/* Action Buttons with Sliding Circle Arrow */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
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

            {/* Metric Counters */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <p className="font-editorial text-3xl sm:text-4xl font-bold tabular-nums text-white">
                  $8,000
                </p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 mt-1 font-medium">
                  FHSA Annual Limit
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
                  ~$105.5k
                </p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 mt-1 font-medium">
                  10-Yr Model @ 6%
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Visual Card with Real Graphic Asset */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl group hover:border-white/20 transition-all duration-300">
              {/* Authentic Photo Image of TFSA & FHSA Jars + Vancouver Skyline */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="./hero-jars.jpg"
                  alt="TFSA and FHSA glass jars growing sprouts with coins and miniature home in British Columbia"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent opacity-80" />

                {/* Floating Image Badges */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1628]/80 backdrop-blur-md border border-white/15 text-[10px] font-bold uppercase tracking-wider text-teal-300">
                  <Sparkles className="w-3 h-3 text-teal-400" />
                  <span>The Power of TFSA &amp; FHSA</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 sm:p-7 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-teal-400 font-bold block">TFSA Pillar</span>
                    <span className="text-slate-300 text-[11px]">Stocks, ETFs, GICs · Tax-free growth</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-sky-400 font-bold block">FHSA Pillar</span>
                    <span className="text-slate-300 text-[11px]">Tax deduction in + tax-free home out</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">{MANDEEP_CONFIG.advisor.fullName}</p>
                    <p className="text-slate-400">{MANDEEP_CONFIG.advisor.roleTitle} · {MANDEEP_CONFIG.advisor.instagramHandle}</p>
                  </div>

                  <a
                    href={MANDEEP_CONFIG.advisor.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
