import React, { useState } from 'react';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-[1280px] mx-auto px-6 h-18 flex items-center justify-between">
        {/* Brand Lockup */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A1628] to-[#1B2B44] flex items-center justify-center text-white font-editorial text-lg font-bold shadow-xs">
            MG
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-editorial text-xl font-bold tracking-tight text-[#0A1628]">
                {MANDEEP_CONFIG.advisor.fullName}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Registered Account Advisory · @mannygurm
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#accounts" className="hover:text-[#0A1628] transition-colors">
            TFSA vs. FHSA
          </a>
          <a href="#calculator" className="hover:text-[#0A1628] transition-colors">
            Growth Simulator
          </a>
          <a href="#strategy" className="hover:text-[#0A1628] transition-colors">
            The Smartest Strategy
          </a>
          <a href="#faq" className="hover:text-[#0A1628] transition-colors">
            FAQ
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={MANDEEP_CONFIG.advisor.phoneHref}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0A1628] rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-teal-600" />
            <span>{MANDEEP_CONFIG.advisor.phoneDisplay}</span>
          </a>

          <button
            type="button"
            onClick={onBookClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full shadow-xs transition-all cursor-pointer hover-lift"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0A1628]" />
            <span>Book Free Call</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-[#0A1628] cursor-pointer"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-700">
            <a
              href="#accounts"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0A1628]"
            >
              TFSA vs. FHSA
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0A1628]"
            >
              Growth Simulator
            </a>
            <a
              href="#strategy"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0A1628]"
            >
              The Smartest Strategy
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0A1628]"
            >
              FAQ
            </a>
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-[#0A1628] bg-teal-400 hover:bg-teal-300 rounded-full cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
