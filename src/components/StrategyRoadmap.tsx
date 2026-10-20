import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, DollarSign, RefreshCw, CheckCircle2, ChevronRight, Calendar } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

interface StrategyRoadmapProps {
  onBookStrategyClick: () => void;
}

export const StrategyRoadmap: React.FC<StrategyRoadmapProps> = ({ onBookStrategyClick }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Audit Your CRA Room',
      kicker: 'PREVENTION & LIMITS',
      objective: 'Verify exact lifetime TFSA and FHSA contribution limits on CRA My Account before depositing.',
      detail:
        'Over-contributing to registered accounts triggers an immediate CRA penalty tax of 1% per month on the excess amount. We audit your CRA My Account notice of assessment to ensure every dollar deposited is completely compliant.',
      fiduciaryRule: 'Never guess your contribution room—CRA penalties accumulate monthly until rectified.',
      icon: ShieldCheck,
    },
    {
      num: '02',
      title: 'Maximize Your FHSA Deduction',
      kicker: 'TAX REFUND ACCELERATION',
      objective: 'Contribute up to $8,000 annually to reduce net taxable income and claim an immediate refund.',
      detail:
        'FHSA contributions reduce your taxable income dollar-for-dollar like an RRSP. For a BC professional at a 31% marginal rate, an $8,000 deposit yields an estimated $2,480 refund on your annual tax return.',
      fiduciaryRule: 'Deposit before December 31st each year to capture deductions in the current tax year.',
      icon: DollarSign,
    },
    {
      num: '03',
      title: 'Funnel Refund into TFSA',
      kicker: 'DUAL TAX COMPOUNDING',
      objective: 'Reinvest the tax savings straight into your TFSA for lifelong, tax-sheltered investment growth.',
      detail:
        'By directing your FHSA tax refund directly into your TFSA, you create a self-funding dual compounding engine: you claim upfront deductions while permanently protecting the refund from future capital gains tax.',
      fiduciaryRule: 'Keep TFSA investments aligned with your time horizon—maximize compounding over time.',
      icon: RefreshCw,
    },
  ];

  return (
    <section id="strategy" className="scroll-mt-20 py-20 lg:py-28 px-6 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-[1280px] mx-auto space-y-14">
        {/* Editorial Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[11px] uppercase tracking-[0.24em] font-bold text-teal-700">
            <span>Discipline First · 3-Step Sequence</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.12]">
            Three steps.{' '}
            <span className="font-instrument font-normal text-teal-700 block sm:inline">
              One clear plan.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every client walks the same disciplined process: verify limits first, capture tax deductions second, and compound tax-free last.
          </p>
        </div>

        {/* Interactive Step Switcher Bar */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-200/60 border border-slate-200">
            {steps.map((item, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`py-3 px-3 sm:px-5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-white text-[#0A1628] shadow-sm font-bold'
                      : 'text-slate-600 hover:text-[#0A1628]'
                  }`}
                >
                  <span className={`text-xs font-bold ${isActive ? 'text-teal-600' : 'text-slate-400'}`}>
                    {item.num}
                  </span>
                  <span className="truncate hidden sm:inline">{item.title}</span>
                  <span className="sm:hidden">Step {item.num}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Step Card Deck */}
        <div className="max-w-3xl mx-auto">
          {steps.map((item, idx) => {
            if (activeStep !== idx) return null;
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="rounded-3xl bg-white border-2 border-teal-500/30 p-8 sm:p-10 shadow-xl shadow-teal-500/5 space-y-6 transition-all duration-300"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-600 flex items-center justify-center">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-teal-700 block">
                        Phase {item.num} · {item.kicker}
                      </span>
                      <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A1628]">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <span className="font-editorial text-4xl font-bold text-slate-200 hidden sm:block">
                    {item.num}
                  </span>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p className="font-medium text-[#0A1628]">
                    {item.objective}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100/80 flex items-start gap-3 text-xs sm:text-sm text-teal-900">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <p>
                    <strong className="font-semibold text-teal-950">Execution Rule:</strong>{' '}
                    {item.fiduciaryRule}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA with Sliding Circle Arrow */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onBookStrategyClick}
            className="group inline-flex items-center gap-3.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 pl-7 pr-3 py-3 text-sm font-bold text-[#0A1628] shadow-lg shadow-teal-500/25 active:scale-95 transition-all cursor-pointer hover-lift"
          >
            <span>Implement This Plan with Mandeep</span>
            <div className="w-8 h-8 rounded-full bg-[#0A1628] text-teal-300 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 shrink-0">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
