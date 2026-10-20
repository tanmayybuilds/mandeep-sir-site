import React, { useState, useRef } from 'react';
import {
  Check,
  ShieldCheck,
  Home,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Sprout,
  DollarSign,
  FileText,
  Lock,
  Target,
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutList,
  Flame,
} from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';
import { ConsultationFocus } from '../types/financial.ts';

interface AccountDeepDiveProps {
  onSelectConsultationFocus: (focus: ConsultationFocus) => void;
}

export const AccountDeepDive: React.FC<AccountDeepDiveProps> = ({
  onSelectConsultationFocus,
}) => {
  // Mobile feature showdown state
  const [activeFeatureIdx, setActiveFeatureIdx] = useState<number>(0);
  const [mobileViewMode, setMobileViewMode] = useState<'interactive' | 'all'>('interactive');
  const [featureAnim, setFeatureAnim] = useState<'slide-left' | 'slide-right' | null>(null);

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const comparisonFeatures = [
    {
      id: 'limit-2026',
      number: '01',
      title: '2026 Annual Limit',
      shortTitle: 'Annual Limit',
      icon: DollarSign,
      winner: 'FHSA',
      winnerBadge: 'FHSA +$1,000 Advantage',
      winnerNote: 'FHSA offers $8,000/yr vs. $7,000/yr for TFSA',
      tfsaValue: '$7,000 / year',
      tfsaDetail: 'Cumulative carry-forward room for life',
      fhsaValue: '$8,000 / year',
      fhsaDetail: '$40,000 lifetime participation room',
      fiduciaryTakeaway:
        'Combine both accounts to shelter up to $15,000 in fresh 2026 savings from Canadian taxes (plus any unused room).',
    },
    {
      id: 'tax-deduction',
      number: '02',
      title: 'Tax Deduction on Deposits',
      shortTitle: 'Tax Deduction',
      icon: FileText,
      winner: 'FHSA',
      winnerBadge: 'FHSA Big Win · Upfront Refund',
      winnerNote: 'Generates direct income tax refund',
      tfsaValue: 'No Upfront Deduction',
      tfsaDetail: 'Funded with after-tax Canadian dollars',
      fhsaValue: 'Generally Yes · 100% Deductible',
      fhsaDetail: 'Reduces net taxable income on Line 20800',
      fiduciaryTakeaway:
        'An $8,000 FHSA contribution at a 31% BC tax bracket yields an estimated $2,480 refund from the CRA.',
    },
    {
      id: 'tax-free-growth',
      number: '03',
      title: 'Tax-Free Investment Growth',
      shortTitle: 'Tax-Free Growth',
      icon: TrendingUp,
      winner: 'TIE',
      winnerBadge: 'Equal Superpower · 100% Tax-Free',
      winnerNote: 'Zero Canadian capital gains or dividend tax',
      tfsaValue: '100% Tax-Free',
      tfsaDetail: 'Stocks, ETFs, GICs compound tax-sheltered',
      fhsaValue: '100% Tax-Free',
      fhsaDetail: 'Eligible investments compound tax-sheltered',
      fiduciaryTakeaway:
        'Both accounts let your money compound with 0% tax drag. Over 10 years, this adds tens of thousands in extra wealth.',
    },
    {
      id: 'tax-free-withdrawals',
      number: '04',
      title: 'Tax-Free Withdrawals',
      shortTitle: 'Withdrawals',
      icon: Lock,
      winner: 'TFSA',
      winnerBadge: 'TFSA Total Flexibility Edge',
      winnerNote: 'Withdraw anytime; room restored next year',
      tfsaValue: 'Generally Yes · Unrestricted',
      tfsaDetail: 'Withdraw whenever needed; room returns Jan 1',
      fhsaValue: 'For Qualifying Home',
      fhsaDetail: '100% Tax-free when buying your first home',
      fiduciaryTakeaway:
        'TFSA gives emergency & retirement flexibility. FHSA is purpose-built for homebuying (or rolls into an RRSP tax-free).',
    },
    {
      id: 'main-purpose',
      number: '05',
      title: 'Primary Strategic Purpose',
      shortTitle: 'Main Purpose',
      icon: Target,
      winner: 'TIE',
      winnerBadge: 'Dual-Engine Synergy',
      winnerNote: 'Built to work in harmony together',
      tfsaValue: 'Flexible Wealth & Retirement',
      tfsaDetail: 'Enduring multi-decade wealth building',
      fhsaValue: 'First-Time Homeownership',
      fhsaDetail: 'Turbocharge your first Canadian down payment',
      fiduciaryTakeaway:
        'The smartest British Columbia sequence: Max FHSA for the upfront tax refund, then channel that refund directly into your TFSA.',
    },
  ];

  // Mobile touch swiping handlers for feature showdown
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaX) < 30) {
      return;
    }

    if (deltaX < -40) {
      // Swiped Left -> Next feature
      handleNextFeature();
    } else if (deltaX > 40) {
      // Swiped Right -> Prev feature
      handlePrevFeature();
    }
  };

  const handleNextFeature = () => {
    setFeatureAnim('slide-left');
    setTimeout(() => {
      setActiveFeatureIdx((prev) => (prev + 1) % comparisonFeatures.length);
      setFeatureAnim(null);
    }, 150);
  };

  const handlePrevFeature = () => {
    setFeatureAnim('slide-right');
    setTimeout(() => {
      setActiveFeatureIdx((prev) => (prev - 1 + comparisonFeatures.length) % comparisonFeatures.length);
      setFeatureAnim(null);
    }, 150);
  };

  const currentFeature = comparisonFeatures[activeFeatureIdx];
  const CurrentIcon = currentFeature.icon;

  return (
    <section id="accounts" className="scroll-mt-16 py-14 lg:py-24 px-4 sm:px-6 bg-white border-b border-slate-200/80">
      <div className="max-w-[1280px] mx-auto space-y-10 sm:space-y-14">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[11px] uppercase tracking-[0.24em] font-bold text-teal-700">
            <span>2026 Core Pillars Decoded</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.12]">
            TFSA vs. FHSA.{' '}
            <span className="font-instrument font-normal text-teal-700 block sm:inline">
              Clarity before commitment.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Two powerful registered accounts under the CRA. Here is exactly what you can invest in, how the tax benefits work, and when to use each.
          </p>
        </div>

        {/* Side-by-Side Account Feature Cards (Directly from Mandeep's Graphic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: TFSA */}
          <div className="rounded-3xl bg-slate-50/70 border border-slate-200/90 p-5 sm:p-8 md:p-10 flex flex-col justify-between shadow-xs hover:border-slate-300 hover:bg-white hover:shadow-md transition-all duration-300 space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Sprout className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-[#0A1628]">TFSA</h3>
                    <p className="text-xs text-slate-500 font-medium">Tax-Free Savings Account</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Tax-Free Growth
                </span>
              </div>

              <div className="space-y-3.5 pt-2 text-sm text-slate-700 leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <p>Invest in eligible <strong className="text-[#0A1628]">stocks, ETFs, GICs</strong> and other permitted investments.</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <p>Investment growth and withdrawals are <strong className="text-[#0A1628]">generally 100% tax-free</strong>.</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <p>Withdraw money whenever you need it, subject to the account’s terms.</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <p>Withdrawals generally <strong className="text-[#0A1628]">restore contribution room</strong> the following calendar year.</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectConsultationFocus('TFSA Wealth Growth')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-[#0A1628] bg-white hover:bg-slate-100 border border-slate-200 rounded-full transition-colors cursor-pointer"
            >
              <span>Explore TFSA Wealth Growth</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: FHSA */}
          <div className="rounded-3xl bg-white border-2 border-teal-500/40 p-5 sm:p-8 md:p-10 flex flex-col justify-between shadow-xl shadow-teal-500/5 hover:border-teal-500/60 transition-all duration-300 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 to-sky-400" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-700 flex items-center justify-center">
                    <Home className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-[#0A1628]">FHSA</h3>
                    <p className="text-xs text-slate-500 font-medium">First Home Savings Account</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  Tax Deduction + Growth
                </span>
              </div>

              <div className="space-y-3.5 pt-2 text-sm text-slate-700 leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5 border border-teal-200">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <p>Contributions are <strong className="text-[#0A1628]">generally tax-deductible</strong>, reducing your taxable income.</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5 border border-teal-200">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <p>Eligible investments <strong className="text-[#0A1628]">grow tax-free</strong>.</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5 border border-teal-200">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <p>Qualifying withdrawals to buy your first home are <strong className="text-[#0A1628]">100% tax-free</strong>.</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5 border border-teal-200">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <p><strong className="text-[#0A1628]">Annual contribution limit: $8,000</strong>; lifetime limit: $40,000.</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectConsultationFocus('First Home FHSA Plan')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full shadow-xs transition-all cursor-pointer"
            >
              <span>Explore FHSA Home Strategy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ================================================================ */}
        {/* MOBILE ANIMATED COMPARISON SHOWCASE (Replaces plain cramped table) */}
        {/* ================================================================ */}
        <div className="block lg:hidden space-y-4">
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/90 border border-slate-200/90 space-y-4 shadow-sm">
            {/* Header + View Switcher */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
                  Official CRA Guidelines
                </span>
                <h3 className="font-editorial text-lg font-bold text-[#0A1628]">
                  TFSA vs. FHSA at a Glance
                </h3>
              </div>

              {/* View Toggle (Interactive Swiper vs Stacked Cards) */}
              <button
                type="button"
                onClick={() => setMobileViewMode(mobileViewMode === 'interactive' ? 'all' : 'interactive')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs"
              >
                {mobileViewMode === 'interactive' ? (
                  <>
                    <Layers className="w-3.5 h-3.5 text-teal-600" />
                    <span>View All (5)</span>
                  </>
                ) : (
                  <>
                    <LayoutList className="w-3.5 h-3.5 text-teal-600" />
                    <span>Swipe Deck</span>
                  </>
                )}
              </button>
            </div>

            {/* INTERACTIVE SWIPING SHOWDOWN MODE */}
            {mobileViewMode === 'interactive' && (
              <div className="space-y-4">
                {/* 5-Feature Segmented Selector Pills */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {comparisonFeatures.map((feat, idx) => {
                    const isSelected = activeFeatureIdx === idx;
                    return (
                      <button
                        key={feat.id}
                        type="button"
                        onClick={() => setActiveFeatureIdx(idx)}
                        className={`py-1.5 px-3 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#0A1628] text-white border-[#0A1628] shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {feat.shortTitle}
                      </button>
                    );
                  })}
                </div>

                {/* The Animated Showdown Card */}
                <div
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className={`rounded-2xl bg-white border-2 border-teal-500/40 p-4 sm:p-5 shadow-md space-y-4 transition-all duration-200 ${
                    featureAnim === 'slide-left'
                      ? 'translate-x-[-15px] opacity-70'
                      : featureAnim === 'slide-right'
                      ? 'translate-x-[15px] opacity-70'
                      : 'translate-x-0 opacity-100'
                  }`}
                >
                  {/* Card Title & Winner Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-teal-500/15 text-teal-700 flex items-center justify-center">
                        <CurrentIcon className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          Feature {currentFeature.number} of 05
                        </span>
                        <h4 className="font-editorial text-base sm:text-lg font-bold text-[#0A1628]">
                          {currentFeature.title}
                        </h4>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        currentFeature.winner === 'FHSA'
                          ? 'bg-teal-50 text-teal-800 border-teal-200'
                          : currentFeature.winner === 'TFSA'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-sky-50 text-sky-800 border-sky-200'
                      }`}
                    >
                      {currentFeature.winnerBadge}
                    </span>
                  </div>

                  {/* Side-by-Side Head-to-Head Visual Boxes */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {/* TFSA Box */}
                    <div className="rounded-xl bg-emerald-50/60 border border-emerald-200/90 p-3 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>TFSA</span>
                      </div>
                      <p className="font-editorial text-base sm:text-lg font-bold text-[#0A1628] leading-tight">
                        {currentFeature.tfsaValue}
                      </p>
                      <p className="text-[10px] text-slate-500 leading-tight">
                        {currentFeature.tfsaDetail}
                      </p>
                    </div>

                    {/* FHSA Box */}
                    <div className="rounded-xl bg-teal-50/80 border-2 border-teal-400/70 p-3 space-y-1 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-teal-900 text-[10px] font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        <span>FHSA</span>
                      </div>
                      <p className="font-editorial text-base sm:text-lg font-bold text-teal-900 leading-tight">
                        {currentFeature.fhsaValue}
                      </p>
                      <p className="text-[10px] text-teal-700 font-medium leading-tight">
                        {currentFeature.fhsaDetail}
                      </p>
                    </div>
                  </div>

                  {/* Mandeep's Fiduciary Takeaway Box */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2 text-xs text-slate-700">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed">
                      <strong className="text-[#0A1628] font-semibold">Strategic Insight:</strong>{' '}
                      {currentFeature.fiduciaryTakeaway}
                    </p>
                  </div>

                  {/* Swipe & Nav Controls */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handlePrevFeature}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Prev</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {comparisonFeatures.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            activeFeatureIdx === idx ? 'w-5 bg-teal-600' : 'w-1.5 bg-slate-300'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleNextFeature}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0A1628] text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
                    </button>
                  </div>
                </div>

                <div className="text-center text-[10px] text-slate-400 font-medium">
                  👈 Swipe horizontally or tap Next to compare features 👉
                </div>
              </div>
            )}

            {/* STACKED ALL-CARDS VIEW (Clean, Readable Vertical Cards) */}
            {mobileViewMode === 'all' && (
              <div className="space-y-3">
                {comparisonFeatures.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={feat.id}
                      className="rounded-2xl bg-white border border-slate-200/90 p-4 space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-700 flex items-center justify-center">
                            <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                          </div>
                          <h4 className="font-editorial text-sm font-bold text-[#0A1628]">
                            {feat.title}
                          </h4>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {feat.winnerBadge}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200">
                          <span className="text-[10px] font-bold text-emerald-800 block">TFSA</span>
                          <span className="font-bold text-[#0A1628] block">{feat.tfsaValue}</span>
                          <span className="text-[9px] text-slate-500 block leading-tight">{feat.tfsaDetail}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-teal-50/70 border border-teal-300">
                          <span className="text-[10px] font-bold text-teal-900 block">FHSA</span>
                          <span className="font-bold text-teal-900 block">{feat.fhsaValue}</span>
                          <span className="text-[9px] text-teal-700 block leading-tight">{feat.fhsaDetail}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 leading-tight">
                        <strong className="text-[#0A1628]">Takeaway:</strong> {feat.fiduciaryTakeaway}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ================================================================ */}
        {/* DESKTOP VIEW: Full Comprehensive Table (Visible on Large Screens)*/}
        {/* ================================================================ */}
        <div className="hidden lg:block rounded-3xl bg-slate-50/80 border border-slate-200/90 overflow-hidden shadow-xs">
          <div className="px-6 sm:px-8 py-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-editorial text-xl font-bold text-[#0A1628]">
              TFSA vs. FHSA at a Glance
            </h3>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
              Official CRA Guidelines
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700">
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px]">Feature</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-emerald-800 bg-emerald-50/60">TFSA</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-teal-900 bg-teal-50/60">FHSA</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-slate-600">Strategic Takeaway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-slate-700">
                {comparisonFeatures.map((feat) => (
                  <tr key={feat.id} className="hover:bg-white/60 transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#0A1628]">
                      <div className="flex items-center gap-2">
                        {React.createElement(feat.icon, { className: 'w-4 h-4 text-teal-600 shrink-0' })}
                        <span>{feat.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold tabular-nums text-emerald-800 bg-emerald-50/30">
                      <div>{feat.tfsaValue}</div>
                      <div className="text-[11px] font-normal text-slate-500">{feat.tfsaDetail}</div>
                    </td>
                    <td className="py-4 px-6 font-bold tabular-nums text-teal-900 bg-teal-50/30">
                      <div>{feat.fhsaValue}</div>
                      <div className="text-[11px] font-normal text-teal-700">{feat.fhsaDetail}</div>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 max-w-sm">
                      {feat.fiduciaryTakeaway}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Executive Winning Combo Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#070D1B] via-[#0A1628] to-[#14233C] text-white p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-teal-400 block">
              The Finance-First Sequence
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
              Maximize FHSA for the tax refund. Reinvest that refund into your TFSA.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              This disciplined strategy turns your annual CRA tax deduction into lasting, tax-sheltered wealth.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectConsultationFocus('Combined FHSA + TFSA Strategy')}
            className="group inline-flex items-center gap-3.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 pl-6 pr-2.5 py-2.5 text-xs font-bold text-[#0A1628] shadow-md shadow-teal-500/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0 hover-lift"
          >
            <span>Structure Your Accounts</span>
            <div className="w-7 h-7 rounded-full bg-[#0A1628] text-teal-300 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 shrink-0">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
