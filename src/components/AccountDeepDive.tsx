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
    <section id="accounts" className="scroll-mt-20 py-20 lg:py-24 px-6 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>2026 Registered Account Comparison</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.15]">
            TFSA vs. FHSA Decoded.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Both accounts protect your investment returns from Canadian tax. Here is exactly how they differ and how to use them together.
          </p>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: TFSA */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-9 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-[#0A1628]">TFSA</h3>
                    <p className="text-xs text-slate-500">Tax-Free Savings Account</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  Universal Wealth
                </span>
              </div>

              <div className="space-y-4 pt-2 text-sm text-slate-600">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-baseline">
                  <span className="text-xs font-medium text-slate-500">2026 Annual Limit:</span>
                  <span className="font-editorial text-xl font-bold tabular-nums text-[#0A1628]">$7,000 / year</span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Lifetime Room:</strong> Up to $102,000 in cumulative tax-free room if eligible since 2009.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Tax Advantage:</strong> 100% tax-free investment growth, interest, and dividends for life.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Withdrawals:</strong> Withdraw anytime with zero tax penalty. The full withdrawn amount is restored to your contribution room on January 1st of the next year.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Best For:</strong> Emergency funds, lifelong investments, flexible liquidity, and retirement income that doesn't trigger OAS clawbacks.</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectConsultationFocus('TFSA Wealth Growth')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-[#0A1628] bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
            >
              <span>Focus on TFSA Wealth Strategy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: FHSA */}
          <div className="rounded-3xl bg-white border-2 border-teal-500/40 p-8 sm:p-9 flex flex-col justify-between shadow-lg shadow-teal-500/5 hover:border-teal-500/60 transition-all space-y-6 relative overflow-hidden">
            {/* Top Indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-sky-400" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-600 flex items-center justify-center">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-[#0A1628]">FHSA</h3>
                    <p className="text-xs text-slate-500">First Home Savings Account</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  Home Buyer Accelerator
                </span>
              </div>

              <div className="space-y-4 pt-2 text-sm text-slate-600">
                <div className="p-3.5 rounded-2xl bg-teal-50/50 border border-teal-100 flex justify-between items-baseline">
                  <span className="text-xs font-medium text-teal-800">Annual Contribution Limit:</span>
                  <span className="font-editorial text-xl font-bold tabular-nums text-teal-800">$8,000 / year</span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Lifetime Cap:</strong> $40,000 maximum contribution room per person (or $80,000 for a couple).</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Tax Deduction:</strong> Contributions are 100% tax-deductible against your income (reduces your income taxes like an RRSP).</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Withdrawals:</strong> 100% tax-free when used to buy a qualifying first home in Canada (including all growth!).</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p><strong className="text-[#0A1628]">Safety Net:</strong> If you don't buy a home within 15 years, transfer funds directly into your RRSP with zero penalty and without using RRSP room.</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectConsultationFocus('First Home FHSA Plan')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full shadow-xs transition-all cursor-pointer"
            >
              <span>Focus on FHSA Home Buying Strategy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mandeep's Golden Combo Callout */}
        <div className="rounded-3xl bg-[#0A1628] text-white p-7 sm:p-9 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10 shadow-xl">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              The Optimal Dual Strategy
            </span>
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white">
              Maximize FHSA first for the tax refund. Reinvest that refund into your TFSA.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              This simple sequence creates dual compounding: immediate income tax savings from the CRA plus lifetime tax-free investment growth.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectConsultationFocus('Combined FHSA + TFSA Strategy')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-[#0A1628] bg-teal-400 hover:bg-teal-300 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 hover-lift"
          >
            <span>Review Dual Strategy with Mandeep</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
