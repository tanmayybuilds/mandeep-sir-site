import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#141413] text-[#FAF8F5]/80 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-6 py-14 lg:py-20 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand Lockup & Maple Leaf Motto */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="inline-flex items-center gap-2.5">
              <svg
                className="w-5 h-5 text-[#D4A359] shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2L13.8 7.2L17.5 5.5L16.2 9.8L21 10.5L17.5 13.8L19.2 16.5L14.5 16.2L13 22H11L9.5 16.2L4.8 16.5L6.5 13.8L3 10.5L7.8 9.8L6.5 5.5L10.2 7.2L12 2Z" />
              </svg>
              <span className="font-editorial text-xl font-bold text-white">
                {MANDEEP_CONFIG.advisor.fullName}
              </span>
              <span aria-hidden="true" className="text-white/40">
                ·
              </span>
              <span className="text-sm font-semibold text-[#D4A359]">
                {MANDEEP_CONFIG.advisor.brandPromise}
              </span>
            </div>

            <p className="font-editorial italic text-xl text-[#D4A359]">
              {MANDEEP_CONFIG.advisor.secondaryTagline}
            </p>

            <p className="text-xs sm:text-sm text-[#FAF8F5]/65 max-w-md leading-relaxed">
              {MANDEEP_CONFIG.advisor.heroSupportingLine} Personalized TFSA &amp; FHSA wealth
              planning for individuals and families across British Columbia, Canada.
            </p>
          </div>

          {/* Quick Section Links */}
          <div className="md:col-span-3 space-y-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">
              Navigation
            </p>
            <ul className="space-y-2 text-[#FAF8F5]/70">
              <li>
                <a href="#purpose" className="hover:text-white transition-colors">
                  My Purpose &amp; Philosophy
                </a>
              </li>
              <li>
                <a href="#accounts" className="hover:text-white transition-colors">
                  TFSA &amp; FHSA Decoded
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  10-Year Compounding Calculator
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-white transition-colors">
                  TFSA vs. FHSA Comparison Matrix
                </a>
              </li>
              <li>
                <a href="#strategy" className="hover:text-white transition-colors">
                  The Smartest 4-Step Strategy
                </a>
              </li>
              <li>
                <a href="#book" className="hover:text-white transition-colors">
                  Book 1-on-1 Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div className="md:col-span-4 space-y-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">
              Direct Advisory Desk
            </p>
            <div className="space-y-2.5 text-[#FAF8F5]/80">
              <p>
                <a
                  href={MANDEEP_CONFIG.advisor.phoneHref}
                  className="inline-flex items-center gap-2 font-mono-tabular hover:text-[#D4A359] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4A359]" />
                  <span>{MANDEEP_CONFIG.advisor.phoneDisplay}</span>
                </a>
              </p>
              <p>
                <a
                  href={MANDEEP_CONFIG.advisor.emailHref}
                  className="inline-flex items-center gap-2 font-mono-tabular hover:text-[#D4A359] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D4A359]" />
                  <span>{MANDEEP_CONFIG.advisor.email}</span>
                </a>
              </p>
              <p>
                <a
                  href={MANDEEP_CONFIG.advisor.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram: {MANDEEP_CONFIG.advisor.instagramHandle}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Compliance & Educational Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#FAF8F5]/55">
          <p className="max-w-3xl leading-relaxed">
            Educational Disclaimer: {MANDEEP_CONFIG.defaultCalculator.complianceDisclaimer} Always
            verify your personal CRA TFSA and FHSA contribution room via CRA My Account before making
            deposits.
          </p>
          <p className="shrink-0">
            © {new Date().getFullYear()} {MANDEEP_CONFIG.advisor.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
