import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, DollarSign, RefreshCw, Sparkles } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

interface StrategyRoadmapProps {
  onBookStrategyClick: () => void;
}

export const StrategyRoadmap: React.FC<StrategyRoadmapProps> = ({ onBookStrategyClick }) => {
  const steps = [
    {
      step: '01',
      title: 'Audit Your CRA Room',
      desc: 'Verify your exact lifetime TFSA and FHSA limits on CRA My Account to maximize every available dollar while strictly avoiding the 1%/month over-contribution penalty.',
      icon: ShieldCheck,
    },
    {
      step: '02',
      title: 'Maximize Your FHSA Deposit',
      desc: 'Contribute up to $8,000 annually before December 31st to claim an immediate dollar-for-dollar deduction on your Canadian income tax return.',
      icon: DollarSign,
    },
    {
      step: '03',
      title: 'Reinvest the Tax Refund into TFSA',
      desc: 'Channel your income tax refund straight into a diversified TFSA portfolio—unlocking a powerful dual compounding engine of tax savings and tax-free growth.',
      icon: RefreshCw,
    },
  ];

  return (
    <section id="strategy" className="scroll-mt-20 py-20 lg:py-24 px-6 bg-white border-b border-slate-200/80">
      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Execution Blueprint</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.15]">
            The 3-Step Strategy.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Follow this disciplined sequence to capture maximum tax deductions and build lifetime tax-free wealth.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="rounded-3xl bg-slate-50/80 border border-slate-200/80 p-8 flex flex-col justify-between space-y-6 hover:border-slate-300 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-editorial text-3xl font-bold text-teal-600">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-[#0A1628]">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick CTA strip */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onBookStrategyClick}
            className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full shadow-md shadow-teal-500/20 transition-all cursor-pointer hover-lift"
          >
            <Calendar className="w-4 h-4 text-[#0A1628]" />
            <span>Implement This Strategy with Mandeep</span>
            <ArrowRight className="w-4 h-4 text-[#0A1628]" />
          </button>
        </div>
      </div>
    </section>
  );
};
