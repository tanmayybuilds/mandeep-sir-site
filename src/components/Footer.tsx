import React from 'react';
import { Phone, Mail, Instagram, ShieldCheck, ArrowUpRight, Heart, Sparkles } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A1628] text-slate-300 border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 py-16 lg:py-20 space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start justify-between">
          {/* Brand Lockup & Canadian Emblem */}
          <div className="md:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-sky-500 flex items-center justify-center text-[#0A1628] shadow-md shadow-teal-500/20">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2L13.8 7.2L17.5 5.5L16.2 9.8L21 10.5L17.5 13.8L19.2 16.5L14.5 16.2L13 22H11L9.5 16.2L4.8 16.5L6.5 13.8L3 10.5L7.8 9.8L6.5 5.5L10.2 7.2L12 2Z" />
                </svg>
              </div>
              <div>
                <span className="font-editorial text-2xl font-bold text-white block leading-tight">
                  {MANDEEP_CONFIG.advisor.fullName}
                </span>
                <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                  {MANDEEP_CONFIG.advisor.brandPromise}
                </span>
              </div>
            </div>

            <p className="font-editorial italic text-lg text-teal-300/90">
              "{MANDEEP_CONFIG.advisor.secondaryTagline}"
            </p>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {MANDEEP_CONFIG.advisor.heroSupportingLine} Personalized, tax-optimized TFSA &amp; FHSA wealth
              guidance for individuals and families across British Columbia, Canada.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Independent &amp; CRA-Compliant Financial Education</span>
            </div>
          </div>

          {/* Quick Section Links */}
          <div className="md:col-span-3 space-y-4 text-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-white">
              Navigation
            </p>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <a href="#purpose" className="hover:text-teal-300 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">My Purpose &amp; Philosophy</span>
                </a>
              </li>
              <li>
                <a href="#why-choose" className="hover:text-teal-300 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Why Choose Mandeep</span>
                </a>
              </li>
              <li>
                <a href="#accounts" className="hover:text-teal-300 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">TFSA &amp; FHSA Decoded</span>
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-teal-300 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">10-Year Compounding Simulator</span>
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-teal-300 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">TFSA vs. FHSA Comparison</span>
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-teal-300 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Client Testimonials</span>
                </a>
              </li>
              <li>
                <a href="#strategy" className="hover:text-teal-300 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">4-Step Action Sequence</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-teal-300 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Frequently Asked Questions</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Advisory Desk */}
          <div className="md:col-span-4 space-y-4 text-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-white">
              Direct Advisory Desk
            </p>
            <div className="space-y-3">
              <a
                href={MANDEEP_CONFIG.advisor.phoneHref}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/30 hover:bg-white/[0.08] text-slate-200 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-[#0A1628] transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Direct Line</span>
                  <span className="font-mono text-sm font-semibold">{MANDEEP_CONFIG.advisor.phoneDisplay}</span>
                </div>
              </a>

              <a
                href={MANDEEP_CONFIG.advisor.emailHref}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/30 hover:bg-white/[0.08] text-slate-200 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-[#0A1628] transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Confidential Inquiries</span>
                  <span className="font-mono text-sm font-semibold">{MANDEEP_CONFIG.advisor.email}</span>
                </div>
              </a>

              <a
                href={MANDEEP_CONFIG.advisor.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/30 hover:bg-white/[0.08] text-slate-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-[#0A1628] transition-colors">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Instagram Community</span>
                    <span className="font-medium text-sm">{MANDEEP_CONFIG.advisor.instagramHandle}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-teal-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Compliance & Educational Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p className="max-w-3xl leading-relaxed">
            <strong className="text-slate-300">Educational Disclaimer:</strong> {MANDEEP_CONFIG.defaultCalculator.complianceDisclaimer} Always
            verify your personal CRA TFSA and FHSA contribution limits on CRA My Account before initiating deposits.
          </p>
          <p className="shrink-0 font-medium">
            © {new Date().getFullYear()} {MANDEEP_CONFIG.advisor.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
