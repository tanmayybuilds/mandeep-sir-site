import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Home, TrendingUp, RefreshCw, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

interface StrategyRoadmapProps {
  onBookStrategyClick: () => void;
}

export const StrategyRoadmap: React.FC<StrategyRoadmapProps> = ({ onBookStrategyClick }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '1',
      title: 'Use the FHSA First',
      badge: 'FIRST HOME PRIORITY',
      headline: "Use the FHSA first if you're eligible and plan to buy a qualifying first home.",
      explanation:
        'Contributions are generally tax-deductible against your income (reducing what you owe the CRA), while eligible investments grow 100% tax-free and qualifying withdrawals for your first home are completely tax-free.',
      fiduciaryTip: 'Deposit up to $8,000 annually ($40,000 lifetime cap). Even if you buy later, carry-forward room begins the year you open the account.',
      icon: Home,
    },
    {
      num: '2',
      title: 'Use the TFSA for Flexibility',
      badge: 'UNRESTRICTED GROWTH',
      headline: 'Use the TFSA for flexibility — emergencies, long-term investing, retirement or other goals.',
      explanation:
        'Every dollar of investment growth, interest, and dividends is permanently tax-free. Withdraw whenever you need it, and your full withdrawn room is restored the following calendar year.',
      fiduciaryTip: 'The 2026 annual limit is $7,000, with up to $102,000 in cumulative room for eligible Canadian residents.',
      icon: TrendingUp,
    },
    {
      num: '3',
      title: 'Reinvest Your Tax Refund',
      badge: 'DUAL ACCELERATION',
      headline: 'Reinvest your tax refund from an FHSA deduction to accelerate your savings.',
      explanation:
        'When your FHSA contribution generates an income tax refund, funnel that refund directly into your TFSA. This turns annual tax savings into an ongoing, self-funding dual compounding engine.',
      fiduciaryTip: 'A $2,480 refund deposited into a TFSA compounding at 6% adds thousands in extra tax-free wealth over a decade.',
      icon: RefreshCw,
    },
    {
      num: '4',
      title: 'Check Your CRA Room',
      badge: 'PENALTY PREVENTION',
      headline: 'Check your CRA contribution room before depositing money to avoid over-contribution penalties.',
      explanation:
        'Over-contributing to either account triggers an automatic CRA penalty of 1% per month on the excess amount. We verify your exact CRA My Account notice to protect your capital.',
      fiduciaryTip: 'Never estimate your room based on bank statements alone—always reference your official CRA My Account records.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="strategy" className="scroll-mt-20 py-20 lg:py-28 px-6 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-[1280px] mx-auto space-y-14">
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
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Follow Mandeep's exact 4-step sequence to capture immediate deductions, build liquidity, and protect your CRA room.
          </p>
        </div>

        {/* 4-Step Interactive Switcher */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-slate-200/60 border border-slate-200">
            {steps.map((item, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`py-3 px-3 sm:px-4 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-white text-[#0A1628] shadow-sm font-bold'
                      : 'text-slate-600 hover:text-[#0A1628]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                    isActive ? 'bg-[#0A1628] text-teal-300' : 'bg-slate-300 text-slate-700'
                  }`}>
                    {item.num}
                  </span>
                  <span className="truncate">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Showcase Card + Motto Side-by-Side */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Active Step Details */}
          <div className="lg:col-span-8">
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
          <div className="lg:col-span-4 rounded-3xl bg-[#070D1B] text-white p-7 sm:p-8 flex flex-col justify-between space-y-6 border border-white/10 shadow-xl relative overflow-hidden">
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
    </section>
  );
};
