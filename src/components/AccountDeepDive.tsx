import React, { useState } from 'react';
import { Check, ArrowUpRight, ArrowRight, Lightbulb, Info } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';
import { ClientPriorityProfile, ConsultationFocus } from '../types/financial.ts';

interface AccountDeepDiveProps {
  onSelectConsultationFocus: (focus: ConsultationFocus) => void;
}

export const AccountDeepDive: React.FC<AccountDeepDiveProps> = ({
  onSelectConsultationFocus,
}) => {
  const [selectedProfile, setSelectedProfile] = useState<ClientPriorityProfile>('first-home');

  const { TFSA, FHSA } = MANDEEP_CONFIG.accounts;
  const activeRecommendation =
    MANDEEP_CONFIG.priorityRecommendations.find((item) => item.id === selectedProfile) ||
    MANDEEP_CONFIG.priorityRecommendations[0];

  return (
    <section
      id="accounts"
      className="scroll-mt-20 py-20 lg:py-28 px-6 bg-[#FAF8F5] border-b border-[#E6E1DA]"
    >
      <div className="max-w-[1280px] mx-auto space-y-16">
        {/* Centered Editorial Header ("Canadian Accounts Decoded & Demystified.") */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9A6B26]">
            CRA Registered Vehicles · 2026 Rules
          </p>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#141413] leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            Canadian Accounts{' '}
            <span className="italic font-normal text-[#9A6B26]">
              Decoded &amp; Demystified.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            The Canadian government offers two of the most powerful tax shelters available. Here is
            how we strategically structure your <strong className="text-[#141413]">TFSA</strong> and{' '}
            <strong className="text-[#141413]">FHSA</strong> to protect your savings from
            unnecessary taxation.
          </p>
        </div>

        {/* Side-by-Side Institutional Account Dossiers (Matching ref-sec7.png & ref-sec8.png) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* TFSA Institutional Card */}
          <article className="rounded-3xl bg-white border border-[#E6E1DA] p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-xs">
            <div className="space-y-6">
              {/* Top Row: Serif Title + Unboxed Limit */}
              <div className="flex items-start justify-between gap-4 border-b border-[#E6E1DA] pb-6">
                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#141413]">
                    {TFSA.shortName}
                  </h3>
                  <p className="text-sm font-medium text-[#57534E] mt-1">
                    {TFSA.shortName} — {TFSA.fullName}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-editorial text-xl sm:text-2xl font-bold tabular-nums text-[#141413]">
                    {TFSA.annualLimit2026} / yr
                  </p>
                  <p className="text-xs text-[#57534E] mt-0.5">2026 Annual Limit</p>
                </div>
              </div>

              {/* Tax Advantage & Core Benefit */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#15803D]">
                  Core Benefit: {TFSA.coreBenefit}
                </p>
                <p className="text-sm text-[#57534E] leading-relaxed">
                  Best Suited For: {TFSA.idealFor}
                </p>
              </div>

              {/* 4 Exact Extracted Features */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                  Key Account Rules &amp; Features
                </p>
                <ul className="space-y-3 text-sm sm:text-base text-[#141413]">
                  {TFSA.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 rounded-full bg-[#F3EFEA] border border-[#E6E1DA] text-[#15803D] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mandeep's Pro-Tip Box */}
              <div className="py-4 border-y border-[#E6E1DA] flex items-start gap-3 text-xs sm:text-sm text-[#57534E]">
                <Lightbulb className="w-4 h-4 text-[#9A6B26] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-[#141413]">Mandeep’s Pro-Tip:</strong> Because TFSA
                  withdrawals generally restore your contribution room the following calendar year,
                  it serves as both a high-growth investment engine and a flexible lifetime reserve.
                </p>
              </div>
            </div>

            {/* Footer Action Row */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="text-xs text-[#57534E]">Ready to open or optimize?</span>
              <button
                type="button"
                onClick={() => onSelectConsultationFocus('TFSA Wealth Growth')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#141413] hover:text-[#9A6B26] transition-colors cursor-pointer"
              >
                <span>Discuss TFSA Strategy</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </article>

          {/* FHSA Institutional Card */}
          <article className="rounded-3xl bg-white border border-[#E6E1DA] p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-xs">
            <div className="space-y-6">
              {/* Top Row: Serif Title + Unboxed Limit */}
              <div className="flex items-start justify-between gap-4 border-b border-[#E6E1DA] pb-6">
                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#141413]">
                    {FHSA.shortName}
                  </h3>
                  <p className="text-sm font-medium text-[#57534E] mt-1">
                    {FHSA.shortName} — {FHSA.fullName}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-editorial text-xl sm:text-2xl font-bold tabular-nums text-[#9A6B26]">
                    {FHSA.annualLimit2026} / yr
                  </p>
                  <p className="text-xs text-[#57534E] mt-0.5">$40,000 Lifetime Limit</p>
                </div>
              </div>

              {/* Tax Advantage & Core Benefit */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#9A6B26]">
                  Core Benefit: {FHSA.coreBenefit}
                </p>
                <p className="text-sm text-[#57534E] leading-relaxed">
                  Best Suited For: {FHSA.idealFor}
                </p>
              </div>

              {/* 4 Exact Extracted Features */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                  Key Account Rules &amp; Features
                </p>
                <ul className="space-y-3 text-sm sm:text-base text-[#141413]">
                  {FHSA.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 rounded-full bg-[#F3EFEA] border border-[#E6E1DA] text-[#9A6B26] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mandeep's Pro-Tip Box */}
              <div className="py-4 border-y border-[#E6E1DA] flex items-start gap-3 text-xs sm:text-sm text-[#57534E]">
                <Lightbulb className="w-4 h-4 text-[#9A6B26] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-[#141413]">Mandeep’s Pro-Tip:</strong> Combines the
                  upfront tax deduction of an RRSP with the tax-free qualifying withdrawal of a
                  TFSA—making it the single most tax-efficient first-home account in Canada.
                </p>
              </div>
            </div>

            {/* Footer Action Row */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="text-xs text-[#57534E]">Ready to open or optimize?</span>
              <button
                type="button"
                onClick={() => onSelectConsultationFocus('First Home FHSA Plan')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#141413] hover:text-[#9A6B26] transition-colors cursor-pointer"
              >
                <span>Discuss FHSA Strategy</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        </div>

        {/* Interactive Priority Selector Card (Matching ref-sec5.png & ref-sec6.png) */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9A6B26]">
                Tailored Account Sequencing
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#141413]">
                Which Account Should You{' '}
                <span className="italic font-normal text-[#9A6B26]">Prioritize First?</span>
              </h3>
            </div>

            {/* Interactive Segmented Tab Bar */}
            <div
              role="group"
              aria-label="Select your current financial situation"
              className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border border-[#E6E1DA]"
            >
              {MANDEEP_CONFIG.priorityRecommendations.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedProfile(item.id)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedProfile === item.id
                      ? 'bg-[#141413] text-[#FAF8F5]'
                      : 'text-[#57534E] hover:text-[#141413]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Recommendation Split Container (Matching Sarmila-reddy Services Dossier) */}
          <div className="rounded-3xl bg-white border border-[#E6E1DA] p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs">
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9A6B26]">
                  Recommended Allocation · {activeRecommendation.allocationSplit}
                </p>
                <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-[#141413]">
                  {activeRecommendation.primaryAccount}
                </h4>
              </div>

              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                {activeRecommendation.rationale}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onSelectConsultationFocus(
                      selectedProfile === 'first-home'
                        ? 'First Home FHSA Plan'
                        : selectedProfile === 'flexible-wealth'
                        ? 'TFSA Wealth Growth'
                        : 'Combined FHSA + TFSA Strategy'
                    )
                  }
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#FAF8F5] bg-[#141413] hover:bg-[#292524] rounded-full transition-colors cursor-pointer"
                >
                  <span>Review This Strategy With Mandeep</span>
                  <ArrowRight className="w-4 h-4 text-[#D4A359]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-[#E6E1DA] lg:pl-8 space-y-4">
              <div className="flex items-center gap-2 text-sm font-editorial font-bold text-[#141413]">
                <Info className="w-4 h-4 text-[#9A6B26]" />
                <span>Canadian Advantage &amp; Next Action</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E6E1DA] space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#141413]">
                  Immediate Next Step
                </p>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  {activeRecommendation.nextAction}
                </p>
              </div>

              <p className="text-xs text-[#57534E] italic">
                * All recommendations are structured around 2026 CRA contribution rules and your
                personal Notice of Assessment limits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
