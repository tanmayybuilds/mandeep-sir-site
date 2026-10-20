import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Home,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

interface StrategyRoadmapProps {
  onBookStrategyClick: () => void;
}

export const StrategyRoadmap: React.FC<StrategyRoadmapProps> = ({ onBookStrategyClick }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Mobile Swiping Animation States
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [swipeAnim, setSwipeAnim] = useState<'exit-left' | 'exit-right' | 'pop-in' | null>(null);

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const steps = [
    {
      num: '1',
      title: 'Use the FHSA First',
      shortTitle: '01 FHSA',
      badge: 'FIRST HOME PRIORITY',
      headline: "Use the FHSA first if you're eligible and plan to buy a qualifying first home.",
      explanation:
        'Contributions are generally tax-deductible against your income (reducing what you owe the CRA), while eligible investments grow 100% tax-free and qualifying withdrawals for your first home are completely tax-free.',
      fiduciaryTip:
        'Deposit up to $8,000 annually ($40,000 lifetime cap). Even if you buy later, carry-forward room begins the year you open the account.',
      icon: Home,
      accentColor: 'teal',
    },
    {
      num: '2',
      title: 'Use the TFSA for Flexibility',
      shortTitle: '02 TFSA',
      badge: 'UNRESTRICTED GROWTH',
      headline: 'Use the TFSA for flexibility — emergencies, long-term investing, retirement or other goals.',
      explanation:
        'Every dollar of investment growth, interest, and dividends is permanently tax-free. Withdraw whenever you need it, and your full withdrawn room is restored the following calendar year.',
      fiduciaryTip:
        'The 2026 annual limit is $7,000, with up to $102,000 in cumulative room for eligible Canadian residents.',
      icon: TrendingUp,
      accentColor: 'sky',
    },
    {
      num: '3',
      title: 'Reinvest Your Tax Refund',
      shortTitle: '03 Refund',
      badge: 'DUAL ACCELERATION',
      headline: 'Reinvest your tax refund from an FHSA deduction to accelerate your savings.',
      explanation:
        'When your FHSA contribution generates an income tax refund, funnel that refund directly into your TFSA. This turns annual tax savings into an ongoing, self-funding dual compounding engine.',
      fiduciaryTip:
        'A $2,480 refund deposited into a TFSA compounding at 6% adds thousands in extra tax-free wealth over a decade.',
      icon: RefreshCw,
      accentColor: 'teal',
    },
    {
      num: '4',
      title: 'Check Your CRA Room',
      shortTitle: '04 CRA Audit',
      badge: 'PENALTY PREVENTION',
      headline: 'Check your CRA contribution room before depositing money to avoid over-contribution penalties.',
      explanation:
        'Over-contributing to either account triggers an automatic CRA penalty of 1% per month on the excess amount. We verify your exact CRA My Account notice to protect your capital.',
      fiduciaryTip:
        'Never estimate your room based on bank statements alone—always reference your official CRA My Account records.',
      icon: ShieldCheck,
      accentColor: 'amber',
    },
  ];

  // Touch handlers for mobile card swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - touchStartY.current;

    // If scrolling vertically, allow normal page scroll
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffX) < 15) {
      return;
    }

    setDragOffset(diffX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = 55; // pixels to trigger swipe

    if (dragOffset < -threshold) {
      triggerSwipeNext();
    } else if (dragOffset > threshold) {
      triggerSwipePrev();
    } else {
      setDragOffset(0);
    }
  };

  const triggerSwipeNext = () => {
    setSwipeAnim('exit-left');
    setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
      setDragOffset(0);
      setSwipeAnim('pop-in');
      setTimeout(() => setSwipeAnim(null), 250);
    }, 220);
  };

  const triggerSwipePrev = () => {
    setSwipeAnim('exit-right');
    setTimeout(() => {
      setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
      setDragOffset(0);
      setSwipeAnim('pop-in');
      setTimeout(() => setSwipeAnim(null), 250);
    }, 220);
  };

  // Next steps for 3D deck layers
  const nextStepIdx1 = (activeStep + 1) % steps.length;
  const nextStepIdx2 = (activeStep + 2) % steps.length;

  return (
    <section id="strategy" className="scroll-mt-16 py-14 lg:py-24 px-4 sm:px-6 bg-slate-50/70 border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1280px] mx-auto space-y-8 sm:space-y-12">
        {/* Editorial Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[11px] uppercase tracking-[0.24em] font-bold text-teal-700">
            <span>The Smartest Strategy · 4 Disciplined Steps</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.12]">
            The Smartest{' '}
            <span className="font-instrument font-normal text-teal-700 block sm:inline">
              Strategy.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Follow Mandeep's exact 4-step sequence to capture immediate deductions, build liquidity, and protect your CRA room.
          </p>
        </div>

        {/* ============================================================== */}
        {/* MOBILE CRAZY 3D CARD SWIPING DECK (Visible on mobile / tablets) */}
        {/* ============================================================== */}
        <div className="block lg:hidden max-w-md mx-auto space-y-5">
          {/* Quick Step Indicator Pills */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-xs">
            {steps.map((item, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => {
                    setActiveStep(idx);
                    setDragOffset(0);
                  }}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all text-center cursor-pointer ${
                    isActive
                      ? 'bg-[#0A1628] text-teal-300 shadow-xs scale-102'
                      : 'text-slate-600 hover:text-[#0A1628] bg-transparent'
                  }`}
                >
                  {item.shortTitle}
                </button>
              );
            })}
          </div>

          {/* Step Progress & Counter Header */}
          <div className="flex items-center justify-between px-1 text-xs font-semibold">
            <span className="text-teal-700 uppercase tracking-widest font-mono text-[11px]">
              Step 0{steps[activeStep].num} of 04
            </span>
            <div className="flex items-center gap-1.5">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeStep === idx
                      ? 'w-7 bg-teal-500'
                      : 'w-2 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* THE 3D INTERACTIVE CARD DECK CONTAINER */}
          <div className="relative min-h-[440px] select-none pt-2 pb-6 px-1">
            {/* LAYER 3: DEEPEST BACKGROUND CARD */}
            <div
              className="absolute inset-x-4 top-6 bottom-0 rounded-3xl bg-slate-200/80 border border-slate-300/80 pointer-events-none transition-all duration-300"
              style={{
                transform: 'translateY(22px) scale(0.90)',
                opacity: 0.35,
              }}
            >
              <div className="p-6 text-slate-400 font-bold text-xs uppercase tracking-wider">
                Step 0{steps[nextStepIdx2].num} · {steps[nextStepIdx2].title}
              </div>
            </div>

            {/* LAYER 2: MIDDLE PEEKING CARD */}
            <div
              className="absolute inset-x-2 top-4 bottom-1 rounded-3xl bg-white/90 border border-teal-500/25 shadow-md pointer-events-none transition-all duration-300"
              style={{
                transform: 'translateY(12px) scale(0.95)',
                opacity: 0.65,
              }}
            >
              <div className="p-6 flex items-center justify-between border-b border-slate-100/80">
                <span className="text-[10px] uppercase tracking-wider font-bold text-teal-700">
                  Up Next: Step 0{steps[nextStepIdx1].num} · {steps[nextStepIdx1].badge}
                </span>
                <span className="font-editorial text-lg font-bold text-slate-400">
                  0{steps[nextStepIdx1].num}
                </span>
              </div>
            </div>

            {/* LAYER 1: ACTIVE SWIPEABLE CARD */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`relative z-20 h-full rounded-3xl bg-white border-2 border-teal-500/40 p-6 sm:p-8 shadow-2xl shadow-teal-500/10 space-y-4 flex flex-col justify-between cursor-grab active:cursor-grabbing transition-transform ${
                swipeAnim === 'exit-left'
                  ? 'animate-card-fly-left'
                  : swipeAnim === 'exit-right'
                  ? 'animate-card-fly-right'
                  : swipeAnim === 'pop-in'
                  ? 'animate-card-pop-in'
                  : ''
              }`}
              style={{
                transform:
                  swipeAnim === null
                    ? `translateX(${dragOffset}px) rotate(${dragOffset * 0.07}deg)`
                    : undefined,
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Card Top Pill & Icon */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-700 flex items-center justify-center shrink-0">
                      {React.createElement(steps[activeStep].icon, {
                        className: 'w-5 h-5 stroke-[2.2]',
                      })}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-teal-700 block">
                        Step 0{steps[activeStep].num} · {steps[activeStep].badge}
                      </span>
                      <h3 className="font-editorial text-xl font-bold text-[#0A1628]">
                        {steps[activeStep].title}
                      </h3>
                    </div>
                  </div>

                  <span className="font-editorial text-3xl font-bold text-slate-300">
                    0{steps[activeStep].num}
                  </span>
                </div>

                {/* Headline Quote */}
                <p className="font-editorial text-base sm:text-lg font-bold text-[#0A1628] leading-snug">
                  "{steps[activeStep].headline}"
                </p>

                {/* Explanation */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {steps[activeStep].explanation}
                </p>
              </div>

              {/* Mandeep Execution Tip Box */}
              <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex items-start gap-2.5 text-xs text-teal-950">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="font-semibold text-teal-950">Mandeep's Tip:</strong>{' '}
                  {steps[activeStep].fiduciaryTip}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Swiping Controls & Gesture Cue */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={triggerSwipePrev}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-teal-600" />
              <span>Previous</span>
            </button>

            <span className="text-[10px] font-medium text-slate-400 text-center animate-pulse">
              👈 Swipe card left / right 👉
            </span>

            <button
              type="button"
              onClick={triggerSwipeNext}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A1628] text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer shadow-xs active:scale-95 transition-all"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4 text-teal-300" />
            </button>
          </div>

          {/* Mobile Motto Banner */}
          <div className="rounded-3xl bg-[#070D1B] text-white p-6 space-y-4 border border-white/10 shadow-xl mt-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-teal-400 block">
                Mandeep's Motto
              </span>
              <p className="font-editorial text-xl font-bold text-white">
                Plan Smart. <span className="text-teal-300">Save Tax.</span>{' '}
                <span className="text-sky-300">Grow Your Future.</span>
              </p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every strategy call starts with your personal numbers. Zero pressure, clear math, and an actionable roadmap within 24 hours.
            </p>
            <button
              type="button"
              onClick={onBookStrategyClick}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#0A1628]" />
              <span>Book Your Strategy Call</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP VIEW (Large 2-column layout with 4-tab switcher)       */}
        {/* ============================================================== */}
        <div className="hidden lg:block space-y-10">
          {/* 4-Step Interactive Switcher */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-4 gap-2 p-1.5 rounded-2xl bg-slate-200/60 border border-slate-200">
              {steps.map((item, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={item.num}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`py-3 px-4 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isActive
                        ? 'bg-white text-[#0A1628] shadow-sm font-bold'
                        : 'text-slate-600 hover:text-[#0A1628]'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                        isActive ? 'bg-[#0A1628] text-teal-300' : 'bg-slate-300 text-slate-700'
                      }`}
                    >
                      {item.num}
                    </span>
                    <span className="truncate">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Showcase Card + Motto Side-by-Side */}
          <div className="max-w-4xl mx-auto grid grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Active Step Details */}
            <div className="col-span-8">
              {steps.map((item, idx) => {
                if (activeStep !== idx) return null;
                const Icon = item.icon;
                return (
                  <div
                    key={item.num}
                    className="h-full rounded-3xl bg-white border-2 border-teal-500/30 p-8 sm:p-10 shadow-xl shadow-teal-500/5 space-y-6 flex flex-col justify-between transition-all duration-300"
                  >
                    <div className="space-y-5">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-700 flex items-center justify-center">
                            <Icon className="w-5 h-5 stroke-[2.2]" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-teal-700 block">
                              Step 0{item.num} · {item.badge}
                            </span>
                            <h3 className="font-editorial text-2xl font-bold text-[#0A1628]">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        <span className="font-editorial text-3xl font-bold text-slate-300">
                          0{item.num}
                        </span>
                      </div>

                      <p className="font-editorial text-lg sm:text-xl font-bold text-[#0A1628] leading-snug">
                        "{item.headline}"
                      </p>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.explanation}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100/80 flex items-start gap-2.5 text-xs text-teal-900">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <p>
                        <strong className="font-semibold text-teal-950">Mandeep's Execution Tip:</strong>{' '}
                        {item.fiduciaryTip}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Signature Blackboard Motto Badge */}
            <div className="col-span-4 rounded-3xl bg-[#070D1B] text-white p-7 sm:p-8 flex flex-col justify-between space-y-6 border border-white/10 shadow-xl relative overflow-hidden">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-teal-400 block">
                  Mandeep's Motto
                </span>

                <div className="space-y-1.5 font-editorial">
                  <p className="text-2xl font-bold text-white">Plan Smart.</p>
                  <p className="text-2xl font-bold text-teal-300">Save Tax.</p>
                  <p className="text-2xl font-bold text-sky-300">Grow Your Future.</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-2">
                  Every strategy call starts with your personal numbers. Zero pressure, clear math, and an actionable roadmap within 24 hours.
                </p>
              </div>

              <button
                type="button"
                onClick={onBookStrategyClick}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full shadow-md transition-all cursor-pointer hover-lift"
              >
                <Calendar className="w-4 h-4 text-[#0A1628]" />
                <span>Book Your Strategy Call</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
