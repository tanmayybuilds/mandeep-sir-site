import React from 'react';
import { Phone, Mail, Instagram, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A1628] text-slate-300 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-6 py-14 lg:py-18 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand Lockup */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-sky-500 flex items-center justify-center text-[#0A1628] font-bold font-editorial text-lg">
                MG
              </div>
              <div>
                <span className="font-editorial text-xl font-bold text-white block leading-tight">
                  {MANDEEP_CONFIG.advisor.fullName}
                </span>
                <span className="text-xs font-semibold text-teal-400">
                  {MANDEEP_CONFIG.advisor.brandPromise}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Personalized, tax-optimized TFSA &amp; FHSA wealth planning for individuals and families across British Columbia, Canada.
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Independent &amp; CRA-Compliant Financial Education</span>
            </div>
          </div>

          {/* Clean Navigation */}
          <div className="md:col-span-3 space-y-3 text-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </p>
            <ul className="space-y-2 text-slate-400 text-xs sm:text-sm">
              <li>
                <a href="#accounts" className="hover:text-teal-300 transition-colors">
                  TFSA vs. FHSA Decoded
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-teal-300 transition-colors">
                  Growth Simulator
                </a>
              </li>
              <li>
                <a href="#strategy" className="hover:text-teal-300 transition-colors">
                  3-Step Strategy
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-teal-300 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#book" className="hover:text-teal-300 transition-colors">
                  Book Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3 text-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </p>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a
                href={MANDEEP_CONFIG.advisor.phoneHref}
                className="flex items-center gap-2.5 text-slate-300 hover:text-teal-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-semibold">{MANDEEP_CONFIG.advisor.phoneDisplay}</span>
              </a>

              <a
                href={MANDEEP_CONFIG.advisor.emailHref}
                className="flex items-center gap-2.5 text-slate-300 hover:text-teal-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{MANDEEP_CONFIG.advisor.email}</span>
              </a>

              <a
                href={MANDEEP_CONFIG.advisor.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-teal-300 transition-colors"
              >
                <Instagram className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Instagram: {MANDEEP_CONFIG.advisor.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p className="max-w-2xl leading-relaxed">
            <strong className="text-slate-300">Disclaimer:</strong> For educational purposes only. Always verify your personal CRA contribution limits on CRA My Account before depositing.
          </p>
          <p className="shrink-0 font-medium">
            © {new Date().getFullYear()} {MANDEEP_CONFIG.advisor.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
