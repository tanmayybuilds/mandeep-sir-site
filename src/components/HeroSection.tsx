import React from 'react';
import { Calendar, ArrowRight, Check, Shield, Clock, Phone, Mail, TrendingUp } from 'lucide-react';
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
      className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0F1D32] to-[#1B2B44] text-white"
    >
      {/* Ambient glow effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#2DD4BF]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-30%] left-[-15%] w-[500px] h-[500px] rounded-full bg-[#38BDF8]/6 blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6 pt-12 pb-16 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-7">
              {/* Credential Kicker */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-white/60">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#2DD4BF]">
                  <svg
                    className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2L13.8 7.2L17.5 5.5L16.2 9.8L21 10.5L17.5 13.8L19.2 16.5L14.5 16.2L13 22H11L9.5 16.2L4.8 16.5L6.5 13.8L3 10.5L7.8 9.8L6.5 5.5L10.2 7.2L12 2Z" />
                  </svg>
                  Canadian Registered Wealth &amp; Tax Strategy
                </span>
                <span aria-hidden="true" className="hidden sm:inline text-white/30">
                  ·
                </span>
                <span>
                  {MANDEEP_CONFIG.advisor.region} · {MANDEEP_CONFIG.advisor.instagramHandle}
                </span>
              </div>

              {/* Hero Headline */}
              <div className="space-y-3">
                <h1
                  className="font-editorial font-bold tracking-tight text-white leading-[1.06]"
                  style={{
                    fontSize: 'clamp(2.5rem, 4.6vw, 4.25rem)',
                    textWrap: 'balance',
                  }}
                >
                  {MANDEEP_CONFIG.advisor.heroHeadline}.{' '}
                  <span className="italic font-normal gradient-text-teal block sm:inline">
                    {MANDEEP_CONFIG.advisor.heroScriptSubheadline}
                  </span>
                </h1>
              </div>

              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
                <strong className="font-semibold text-white">
                  {MANDEEP_CONFIG.advisor.heroSupportingLine}
                </strong>{' '}
                Trusted, client-first financial planning for British Columbia professionals,
                families, and first-time home buyers. From capturing immediate income tax deductions
                with the <strong className="font-semibold text-[#2DD4BF]">FHSA ($8,000/yr)</strong>{' '}
                to compounding lifelong tax-free wealth inside your{' '}
                <strong className="font-semibold text-[#38BDF8]">TFSA ($7,000/yr)</strong>—we
                replace financial overwhelm with enduring clarity.
              </p>

              {/* Value Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs sm:text-sm font-medium text-white">
                {[
                  'Complimentary, Zero-Pressure Consultations',
                  'FHSA ($8,000/yr) Tax Deduction & Home Plan',
                  'TFSA ($7,000/yr) Tax-Free Compounding',
                  'Tax-Refund Reinvestment & CRA Room Audit',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#2DD4BF] to-[#38BDF8] text-[#0A1628] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={onPrimaryCtaClick}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold text-[#0A1628] bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#2DD4BF] rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 pulse-glow"
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{MANDEEP_CONFIG.advisor.primaryCta}</span>
                </button>

                <button
                  type="button"
                  onClick={onExploreCalculatorClick}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-white bg-white/8 hover:bg-white/14 border border-white/15 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Interactive Wealth Calculator</span>
                  <ArrowRight className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                </button>
              </div>

              {/* Trust Line */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/50">
                <Shield className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0" />
                <span className="font-semibold text-white/80">
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

            {/* Bottom Stats Strip */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
              <div>
                <p className="font-editorial text-2xl sm:text-3xl font-bold tabular-nums text-white">
                  $8,000
                </p>
                <p className="mt-1 text-xs text-white/50">
                  2026 FHSA Annual Limit ($40k Lifetime)
                </p>
              </div>
              <div>
                <p className="font-editorial text-2xl sm:text-3xl font-bold tabular-nums text-white">
                  $7,000
                </p>
                <p className="mt-1 text-xs text-white/50">
                  2026 TFSA Annual Limit (Tax-Free Growth)
                </p>
              </div>
              <div>
                <p className="font-editorial text-2xl sm:text-3xl font-bold tabular-nums gradient-text-teal">
                  ~$105,500
                </p>
                <p className="mt-1 text-xs text-white/50">
                  $8k/yr × 10 Yrs @ 6% Return
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Advisor Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl overflow-hidden glass-card-dark shadow-2xl">
            {/* Dark Header */}
            <div className="relative p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-8">
              {/* Top Meta */}
              <div className="flex items-center justify-between gap-2 text-xs text-white/60">
                <span>British Columbia · Canada</span>
                <span className="text-[#2DD4BF] font-medium">Client-First Practice</span>
              </div>

              {/* Center: Identity & Wealth Mandate */}
              <div className="my-auto py-4 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2DD4BF]/20 to-[#38BDF8]/20 border border-[#2DD4BF]/30 flex items-center justify-center shrink-0">
                    <span className="font-editorial text-2xl font-bold tracking-wider text-[#2DD4BF]">
                      MG
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#2DD4BF] tracking-wider">
                      Private Wealth Advisory
                    </p>
                    <p className="font-editorial italic text-xl text-white">
                      "{MANDEEP_CONFIG.advisor.brandPromise}"
                    </p>
                  </div>
                </div>

                {/* Growth Preview Card */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
                    <span className="text-white/60">Featured 10-Yr Model (6%)</span>
                    <span className="font-mono-tabular font-semibold text-[#2DD4BF]">
                      $8,000/yr → ~$105,500
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-white/50">Principal Contributed</p>
                      <p className="font-mono-tabular font-semibold text-white mt-0.5">$80,000</p>
                    </div>
                    <div>
                      <p className="text-white/50">Tax-Free Growth</p>
                      <p className="font-mono-tabular font-semibold text-[#34D399] mt-0.5">
                        +$25,500
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Lines */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70 pt-1">
                  <a
                    href={MANDEEP_CONFIG.advisor.phoneHref}
                    className="inline-flex items-center gap-1.5 font-mono-tabular hover:text-[#2DD4BF] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#2DD4BF]" />
                    <span>{MANDEEP_CONFIG.advisor.phoneDisplay}</span>
                  </a>
                  <a
                    href={MANDEEP_CONFIG.advisor.emailHref}
                    className="inline-flex items-center gap-1.5 font-mono-tabular hover:text-[#2DD4BF] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#2DD4BF]" />
                    <span>{MANDEEP_CONFIG.advisor.email}</span>
                  </a>
                </div>
              </div>

              {/* Advisor Nameplate */}
              <div className="pt-4 border-t border-white/10">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                  {MANDEEP_CONFIG.advisor.fullName}
                </h2>
                <p className="text-xs sm:text-sm text-white/60 mt-0.5">
                  {MANDEEP_CONFIG.advisor.roleTitle} · {MANDEEP_CONFIG.advisor.instagramHandle}
                </p>
              </div>
            </div>

            {/* Bottom Discovery Card */}
            <div className="bg-white/5 border-t border-white/10 p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                <span className="text-xs sm:text-sm font-bold text-white">
                  Discovery Strategy Session:
                </span>
                <span className="text-xs font-semibold text-[#34D399]">
                  Complimentary · 30 Min
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="font-semibold text-white">Virtual Video or Phone</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Flexible PST Times
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  A pressure-free review of your TFSA &amp; FHSA contribution room, tax deduction
                  strategy, and custom compounding blueprint.
                </p>
              </div>

              <button
                type="button"
                onClick={onPrimaryCtaClick}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#0A1628] bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#2DD4BF] rounded-full transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Select Time &amp; Book Strategy Call</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
