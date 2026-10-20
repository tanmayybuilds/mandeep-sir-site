import React from 'react';
import { Check, ShieldCheck, Home, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { ConsultationFocus } from '../types/financial.ts';

interface AccountDeepDiveProps {
  onSelectConsultationFocus: (focus: ConsultationFocus) => void;
}

export const AccountDeepDive: React.FC<AccountDeepDiveProps> = ({
  onSelectConsultationFocus,
}) => {
  return (
    <section id="accounts" className="scroll-mt-20 py-20 lg:py-28 px-6 bg-white border-b border-slate-200/80">
      <div className="max-w-[1280px] mx-auto space-y-14">
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
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Both accounts protect your investment gains from Canadian tax. Here is exactly how their contribution limits, tax treatment, and withdrawal rules compare.
          </p>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: TFSA */}
          <div className="rounded-3xl bg-slate-50/70 border border-slate-200/90 p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:border-slate-300 hover:bg-white hover:shadow-md transition-all duration-300 space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-[#0A1628]">TFSA</h3>
                    <p className="text-xs text-slate-500 font-medium">Tax-Free Savings Account</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                  Universal Wealth
                </span>
              </div>

              <div className="space-y-4 pt-2 text-sm text-slate-600">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 flex justify-between items-baseline shadow-2xs">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">2026 Annual Limit:</span>
                  <span className="font-editorial text-2xl font-bold tabular-nums text-[#0A1628]">$7,000 / yr</span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Cumulative Room:</strong> Up to $102,000 in total lifetime room if eligible since inception (2009).</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Tax Advantage:</strong> All investment gains, dividends, and interest are 100% tax-free for life.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Withdrawals:</strong> Withdraw anytime without penalty; your contribution room is automatically restored next January 1st.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Best For:</strong> Emergency reserves, flexible wealth building, and tax-free retirement income that never triggers OAS clawbacks.</p>
                  </div>
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
          <div className="rounded-3xl bg-white border-2 border-teal-500/40 p-8 sm:p-10 flex flex-col justify-between shadow-xl shadow-teal-500/5 hover:border-teal-500/60 transition-all duration-300 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 to-sky-400" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-teal-500/15 text-teal-700 flex items-center justify-center">
                    <Home className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-[#0A1628]">FHSA</h3>
                    <p className="text-xs text-slate-500 font-medium">First Home Savings Account</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  Home Buyer Accelerator
                </span>
              </div>

              <div className="space-y-4 pt-2 text-sm text-slate-600">
                <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 flex justify-between items-baseline shadow-2xs">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-900">Annual Limit:</span>
                  <span className="font-editorial text-2xl font-bold tabular-nums text-teal-800">$8,000 / yr</span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Lifetime Cap:</strong> $40,000 maximum per individual ($80,000 combined for couples buying together).</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Income Tax Deduction:</strong> Every dollar contributed reduces your net taxable income like an RRSP.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">100% Tax-Free Withdrawals:</strong> Withdrawn principal and compounding gains are completely tax-free for qualifying Canadian home purchases.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Rollover Protection:</strong> If you don't buy within 15 years, roll the full balance into your RRSP with zero penalty and without requiring RRSP room.</p>
                  </div>
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

        {/* Executive Winning Combo Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#070D1B] via-[#0A1628] to-[#14233C] text-white p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10 shadow-xl">
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
