import React from 'react';
import { Calendar, ArrowRight, Check, Shield, Clock, Phone, Mail } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

interface HeroSectionProps {
  onPrimaryCtaClick: () => void;
  onExploreCalculatorClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPrimaryCtaClick,
  onExploreCalculatorClick,
}) => {
  return (
    <section
      id="top"
      className="relative bg-[#FAF8F5] text-[#141413] border-b border-[#E6E1DA]"
    >
      <div className="max-w-[1280px] mx-auto px-6 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          {/* Left Column: Authoritative Editorial Proposition (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Unboxed Credential Kicker */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-[#57534E]">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#141413]">
                  <svg
                    className="w-3.5 h-3.5 text-[#9A6B26] shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2L13.8 7.2L17.5 5.5L16.2 9.8L21 10.5L17.5 13.8L19.2 16.5L14.5 16.2L13 22H11L9.5 16.2L4.8 16.5L6.5 13.8L3 10.5L7.8 9.8L6.5 5.5L10.2 7.2L12 2Z" />
                  </svg>
                  Canadian Registered Wealth &amp; Tax Strategy
                </span>
                <span aria-hidden="true" className="hidden sm:inline">
                  ·
                </span>
                <span>
                  {MANDEEP_CONFIG.advisor.region} · {MANDEEP_CONFIG.advisor.instagramHandle}
                </span>
              </div>

              {/* Editorial Serif Headline */}
              <div className="space-y-2">
                <h1
                  className="font-editorial font-bold tracking-tight text-[#141413] leading-[1.06]"
                  style={{
                    fontSize: 'clamp(2.5rem, 4.6vw, 4.25rem)',
                    textWrap: 'balance',
                  }}
                >
                  {MANDEEP_CONFIG.advisor.heroHeadline}.{' '}
                  <span className="italic font-normal text-[#9A6B26] block sm:inline">
                    {MANDEEP_CONFIG.advisor.heroScriptSubheadline}
                  </span>
                </h1>
              </div>

              {/* Lead Editorial Paragraph */}
              <p className="text-base sm:text-lg text-[#57534E] max-w-2xl leading-relaxed">
                <strong className="font-semibold text-[#141413]">
                  {MANDEEP_CONFIG.advisor.heroSupportingLine}
                </strong>{' '}
                Trusted, client-first financial planning for British Columbia professionals,
                families, and first-time home buyers. From capturing immediate income tax deductions
                with the <strong className="font-semibold text-[#141413]">FHSA ($8,000/yr)</strong>{' '}
                to compounding lifelong tax-free wealth inside your{' '}
                <strong className="font-semibold text-[#141413]">TFSA ($7,000/yr)</strong>—we
                replace financial overwhelm with enduring clarity.
              </p>

              {/* 2x2 Value Checkmark Grid (Matching Sarmila-reddy Hero) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs sm:text-sm font-medium text-[#141413]">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#141413] text-[#FAF8F5] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>Complimentary, Zero-Pressure Consultations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#141413] text-[#FAF8F5] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>FHSA ($8,000/yr) Tax Deduction &amp; Home Plan</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#141413] text-[#FAF8F5] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>TFSA ($7,000/yr) Tax-Free Compounding</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#141413] text-[#FAF8F5] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>Tax-Refund Reinvestment &amp; CRA Room Audit</span>
                </div>
              </div>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={onPrimaryCtaClick}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold text-[#FAF8F5] bg-[#141413] hover:bg-[#292524] rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Calendar className="w-4 h-4 text-[#D4A359] shrink-0" />
                  <span>{MANDEEP_CONFIG.advisor.primaryCta}</span>
                </button>

                <button
                  type="button"
                  onClick={onExploreCalculatorClick}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-[#141413] bg-white hover:bg-[#F3EFEA] border border-[#E6E1DA] rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Interactive Wealth Calculator</span>
                  <ArrowRight className="w-4 h-4 text-[#57534E] shrink-0" />
                </button>
              </div>

              {/* Client Best-Interest Trust Line */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                <Shield className="w-3.5 h-3.5 text-[#9A6B26] shrink-0" />
                <span className="font-semibold text-[#141413]">
                  {MANDEEP_CONFIG.advisor.brandPromise}
                </span>
                <span aria-hidden="true">·</span>
                <span>{MANDEEP_CONFIG.advisor.secondaryTagline}</span>
                <span aria-hidden="true" className="hidden sm:inline">
                  ·
                </span>
                <span className="hidden sm:inline">Strictly Confidential</span>
              </div>
            </div>

            {/* Bottom 3-Column Institutional Serif Stat Strip */}
            <div className="pt-8 border-t border-[#E6E1DA] grid grid-cols-3 gap-6">
              <div>
                <p className="font-editorial text-2xl sm:text-3xl font-bold tabular-nums text-[#141413]">
                  $8,000
                </p>
                <p className="mt-1 text-xs text-[#57534E]">
                  2026 FHSA Annual Limit ($40k Lifetime)
                </p>
              </div>
              <div>
                <p className="font-editorial text-2xl sm:text-3xl font-bold tabular-nums text-[#141413]">
                  $7,000
                </p>
                <p className="mt-1 text-xs text-[#57534E]">
                  2026 TFSA Annual Limit (Tax-Free Growth)
                </p>
              </div>
              <div>
                <p className="font-editorial text-2xl sm:text-3xl font-bold tabular-nums text-[#9A6B26]">
                  ~$105,500
                </p>
                <p className="mt-1 text-xs text-[#57534E]">
                  $8k/yr × 10 Yrs @ 6% Return
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Executive Advisor Dossier & Discovery Session Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl overflow-hidden bg-white border border-[#E6E1DA] shadow-xs">
            {/* Top Dark Obsidian Executive Practice Header */}
            <div className="relative bg-[#141413] text-[#FAF8F5] p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-8">
              {/* Top Meta Row */}
              <div className="flex items-center justify-between gap-2 text-xs text-[#FAF8F5]/75">
                <span>British Columbia · Canada</span>
                <span className="text-[#D4A359] font-medium">Client-First Practice</span>
              </div>

              {/* Center Architectural Crest & Core Wealth Mandate */}
              <div className="my-auto py-4 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#1F1E1B] border border-[#D4A359]/40 flex items-center justify-center shrink-0">
                    <span className="font-editorial text-2xl font-bold tracking-wider text-[#D4A359]">
                      MG
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-widest text-[#D4A359] font-semibold">
                      Private Wealth Advisory
                    </p>
                    <p className="font-editorial italic text-xl text-white">
                      “{MANDEEP_CONFIG.advisor.brandPromise}”
                    </p>
                  </div>
                </div>

                {/* Clean 2026 Registered Account Brief inside Executive Card */}
                <div className="rounded-2xl bg-[#1C1B18] border border-white/10 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
                    <span className="text-[#FAF8F5]/70">Featured 10-Yr Model (6%)</span>
                    <span className="font-mono-tabular font-semibold text-[#D4A359]">
                      $8,000/yr → ~$105,500
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-[#FAF8F5]/60">Principal Contributed</p>
                      <p className="font-mono-tabular font-semibold text-white mt-0.5">$80,000</p>
                    </div>
                    <div>
                      <p className="text-[#FAF8F5]/60">Tax-Free Growth</p>
                      <p className="font-mono-tabular font-semibold text-[#34D399] mt-0.5">
                        +$25,500
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Lines */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#FAF8F5]/80 pt-1">
                  <a
                    href={MANDEEP_CONFIG.advisor.phoneHref}
                    className="inline-flex items-center gap-1.5 font-mono-tabular hover:text-[#D4A359] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4A359]" />
                    <span>{MANDEEP_CONFIG.advisor.phoneDisplay}</span>
                  </a>
                  <a
                    href={MANDEEP_CONFIG.advisor.emailHref}
                    className="inline-flex items-center gap-1.5 font-mono-tabular hover:text-[#D4A359] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#D4A359]" />
                    <span>{MANDEEP_CONFIG.advisor.email}</span>
                  </a>
                </div>
              </div>

              {/* Advisor Nameplate */}
              <div className="pt-4 border-t border-white/12">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                  {MANDEEP_CONFIG.advisor.fullName}
                </h2>
                <p className="text-xs sm:text-sm text-[#FAF8F5]/75 mt-0.5">
                  {MANDEEP_CONFIG.advisor.roleTitle} · {MANDEEP_CONFIG.advisor.instagramHandle}
                </p>
              </div>
            </div>

            {/* Bottom White Discovery Strategy Session Card (Matching Sarmila-reddy) */}
            <div className="bg-white p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E1DA]">
                <span className="text-xs sm:text-sm font-bold text-[#141413]">
                  Discovery Strategy Session:
                </span>
                <span className="text-xs font-semibold text-[#15803D]">
                  Complimentary · 30 Min
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#57534E]">
                  <span className="font-semibold text-[#141413]">Virtual Video or Phone</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Flexible PST Times
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  A pressure-free review of your TFSA &amp; FHSA contribution room, tax deduction
                  strategy, and custom compounding blueprint.
                </p>
              </div>

              <button
                type="button"
                onClick={onPrimaryCtaClick}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#FAF8F5] bg-[#141413] hover:bg-[#292524] rounded-full transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#D4A359]" />
                <span>Select Time &amp; Book Strategy Call</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
