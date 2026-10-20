import React from 'react';
import { Check, ShieldCheck, Home, TrendingUp, Sparkles, ArrowRight, Sprout } from 'lucide-react';
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
            Two powerful registered accounts under the CRA. Here is exactly what you can invest in, how the tax benefits work, and when to use each.
          </p>
        </div>

        {/* Side-by-Side Account Feature Cards (Directly from Mandeep's Graphic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: TFSA */}
          <div className="rounded-3xl bg-slate-50/70 border border-slate-200/90 p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:border-slate-300 hover:bg-white hover:shadow-md transition-all duration-300 space-y-6">
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
          <div className="rounded-3xl bg-white border-2 border-teal-500/40 p-8 sm:p-10 flex flex-col justify-between shadow-xl shadow-teal-500/5 hover:border-teal-500/60 transition-all duration-300 space-y-6 relative overflow-hidden">
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

        {/* TFSA vs. FHSA at a Glance Table (Directly from Mandeep's Graphic) */}
        <div className="rounded-3xl bg-slate-50/80 border border-slate-200/90 overflow-hidden shadow-xs">
          <div className="px-6 sm:px-8 py-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-editorial text-xl font-bold text-[#0A1628]">
              TFSA vs. FHSA at a Glance
            </h3>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
              Official CRA Guidelines
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700">
                  <th className="py-3.5 px-6 font-bold uppercase tracking-wider text-[11px]">Feature</th>
                  <th className="py-3.5 px-6 font-bold uppercase tracking-wider text-[11px] text-emerald-800 bg-emerald-50/60">TFSA</th>
                  <th className="py-3.5 px-6 font-bold uppercase tracking-wider text-[11px] text-teal-900 bg-teal-50/60">FHSA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-slate-700">
                <tr className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-[#0A1628]">2026 annual limit</td>
                  <td className="py-3.5 px-6 font-bold tabular-nums text-emerald-700 bg-emerald-50/30">$7,000</td>
                  <td className="py-3.5 px-6 font-bold tabular-nums text-teal-800 bg-teal-50/30">$8,000</td>
                </tr>
                <tr className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-[#0A1628]">Tax deduction on contributions</td>
                  <td className="py-3.5 px-6 bg-emerald-50/30">No</td>
                  <td className="py-3.5 px-6 font-semibold text-teal-800 bg-teal-50/30">Generally yes</td>
                </tr>
                <tr className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-[#0A1628]">Tax-free investment growth</td>
                  <td className="py-3.5 px-6 font-semibold text-emerald-700 bg-emerald-50/30">Yes</td>
                  <td className="py-3.5 px-6 font-semibold text-teal-800 bg-teal-50/30">Yes</td>
                </tr>
                <tr className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-[#0A1628]">Tax-free withdrawals</td>
                  <td className="py-3.5 px-6 bg-emerald-50/30">Generally yes</td>
                  <td className="py-3.5 px-6 font-semibold text-teal-800 bg-teal-50/30">For qualifying home purchases</td>
                </tr>
                <tr className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-[#0A1628]">Main purpose</td>
                  <td className="py-3.5 px-6 text-slate-600 bg-emerald-50/30">Flexible saving and investing</td>
                  <td className="py-3.5 px-6 text-slate-600 bg-teal-50/30">Buying a qualifying first home</td>
                </tr>
              </tbody>
            </table>
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
