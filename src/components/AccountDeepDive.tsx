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
      className="scroll-mt-20 py-20 lg:py-28 px-6 bg-white border-b border-[#D5DCE6]"
    >
      <div className="max-w-[1280px] mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold tracking-widest text-[#2DD4BF]">
            CRA Registered Vehicles · 2026 Rules
          </p>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            Canadian Accounts{' '}
            <span className="italic font-normal gradient-text-teal">
              Decoded &amp; Demystified.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#4A6A8A] leading-relaxed">
            The Canadian government offers two of the most powerful tax shelters available. Here is
            how we strategically structure your <strong className="text-[#0A1628]">TFSA</strong> and{' '}
            <strong className="text-[#0A1628]">FHSA</strong> to protect your savings from
            unnecessary taxation.
          </p>
        </div>

        {/* Account Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* TFSA */}
          <article className="rounded-3xl bg-[#F0F4F8] border border-[#D5DCE6] p-8 sm:p-10 flex flex-col justify-between space-y-8 hover-lift">
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-[#D5DCE6] pb-6">
                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0A1628]">
                    {TFSA.shortName}
                  </h3>
                  <p className="text-sm font-medium text-[#4A6A8A] mt-1">
                    {TFSA.shortName} — {TFSA.fullName}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-editorial text-xl sm:text-2xl font-bold tabular-nums text-[#0A1628]">
                    {TFSA.annualLimit2026} / yr
                  </p>
                  <p className="text-xs text-[#4A6A8A] mt-0.5">2026 Annual Limit</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-bold tracking-wider text-[#34D399]">
                  Core Benefit: {TFSA.coreBenefit}
                </p>
                <p className="text-sm text-[#4A6A8A] leading-relaxed">
                  Best Suited For: {TFSA.idealFor}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wider text-[#4A6A8A]">
                  Key Account Rules &amp; Features
                </p>
                <ul className="space-y-3 text-sm sm:text-base text-[#0A1628]">
                  {TFSA.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#2DD4BF]/20 to-[#38BDF8]/20 border border-[#D5DCE6] text-[#34D399] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="py-4 border-y border-[#D5DCE6] flex items-start gap-3 text-xs sm:text-sm text-[#4A6A8A]">
                <Lightbulb className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-[#0A1628]">Mandeep's Pro-Tip:</strong> Because TFSA
                  withdrawals generally restore your contribution room the following calendar year,
                  it serves as both a high-growth investment engine and a flexible lifetime reserve.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="text-xs text-[#4A6A8A]">Ready to open or optimize?</span>
              <button
                type="button"
                onClick={() => onSelectConsultationFocus('TFSA Wealth Growth')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0A1628] hover:text-[#2DD4BF] transition-colors cursor-pointer"
              >
                <span>Discuss TFSA Strategy</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </article>

          {/* FHSA */}
          <article className="rounded-3xl bg-[#F0F4F8] border border-[#D5DCE6] p-8 sm:p-10 flex flex-col justify-between space-y-8 hover-lift">
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-[#D5DCE6] pb-6">
                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0A1628]">
                    {FHSA.shortName}
                  </h3>
                  <p className="text-sm font-medium text-[#4A6A8A] mt-1">
                    {FHSA.shortName} — {FHSA.fullName}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-editorial text-xl sm:text-2xl font-bold tabular-nums gradient-text-teal">
                    {FHSA.annualLimit2026} / yr
                  </p>
                  <p className="text-xs text-[#4A6A8A] mt-0.5">$40,000 Lifetime Limit</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-bold tracking-wider text-[#2DD4BF]">
                  Core Benefit: {FHSA.coreBenefit}
                </p>
                <p className="text-sm text-[#4A6A8A] leading-relaxed">
                  Best Suited For: {FHSA.idealFor}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wider text-[#4A6A8A]">
                  Key Account Rules &amp; Features
                </p>
                <ul className="space-y-3 text-sm sm:text-base text-[#0A1628]">
                  {FHSA.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#2DD4BF]/20 to-[#38BDF8]/20 border border-[#D5DCE6] text-[#2DD4BF] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="py-4 border-y border-[#D5DCE6] flex items-start gap-3 text-xs sm:text-sm text-[#4A6A8A]">
                <Lightbulb className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-[#0A1628]">Mandeep's Pro-Tip:</strong> Combines the
                  upfront tax deduction of an RRSP with the tax-free qualifying withdrawal of a
                  TFSA—making it the single most tax-efficient first-home account in Canada.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="text-xs text-[#4A6A8A]">Ready to open or optimize?</span>
              <button
                type="button"
                onClick={() => onSelectConsultationFocus('First Home FHSA Plan')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0A1628] hover:text-[#2DD4BF] transition-colors cursor-pointer"
              >
                <span>Discuss FHSA Strategy</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        </div>

        {/* Priority Selector */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-widest text-[#2DD4BF]">
                Tailored Account Sequencing
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A1628]">
                Which Account Should You{' '}
                <span className="italic font-normal gradient-text-teal">Prioritize First?</span>
              </h3>
            </div>

            <div
              role="group"
              aria-label="Select your current financial situation"
              className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F0F4F8] rounded-2xl border border-[#D5DCE6]"
            >
              {MANDEEP_CONFIG.priorityRecommendations.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedProfile(item.id)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedProfile === item.id
                      ? 'bg-gradient-to-r from-[#0A1628] to-[#1B2B44] text-white shadow-lg'
                      : 'text-[#4A6A8A] hover:text-[#0A1628]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation Card */}
          <div className="rounded-3xl bg-[#F0F4F8] border border-[#D5DCE6] p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold tracking-wider text-[#2DD4BF]">
                  Recommended Allocation · {activeRecommendation.allocationSplit}
                </p>
                <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A1628]">
                  {activeRecommendation.primaryAccount}
                </h4>
              </div>

              <p className="text-sm sm:text-base text-[#4A6A8A] leading-relaxed">
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
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#0A1628] to-[#1B2B44] hover:shadow-lg hover:shadow-[#2DD4BF]/10 rounded-full transition-all cursor-pointer"
                >
                  <span>Review This Strategy With Mandeep</span>
                  <ArrowRight className="w-4 h-4 text-[#2DD4BF]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-[#D5DCE6] lg:pl-8 space-y-4">
              <div className="flex items-center gap-2 text-sm font-editorial font-bold text-[#0A1628]">
                <Info className="w-4 h-4 text-[#2DD4BF]" />
                <span>Canadian Advantage &amp; Next Action</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#D5DCE6] space-y-2">
                <p className="text-xs font-bold tracking-wider text-[#0A1628]">
                  Immediate Next Step
                </p>
                <p className="text-xs sm:text-sm text-[#4A6A8A] leading-relaxed">
                  {activeRecommendation.nextAction}
                </p>
              </div>

              <p className="text-xs text-[#4A6A8A] italic">
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
