import React, { useState } from 'react';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#D5DCE6]">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 py-4">
        {/* Wordmark */}
        <a
          href="#top"
          className="font-editorial text-lg sm:text-2xl font-bold tracking-tight text-[#0A1628] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2DD4BF]"
        >
          {MANDEEP_CONFIG.advisor.fullName}
        </a>

        {/* Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A6A8A]"
        >
          <a
            href="#purpose"
            className="hover:text-[#0A1628] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            My Purpose
          </a>
          <a
            href="#accounts"
            className="hover:text-[#0A1628] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Accounts
          </a>
          <a
            href="#calculator"
            className="hover:text-[#0A1628] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Calculator
          </a>
          <a
            href="#comparison"
            className="hover:text-[#0A1628] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Comparison
          </a>
          <a
            href="#strategy"
            className="hover:text-[#0A1628] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Strategy
          </a>
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookClick}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#0A1628] to-[#1B2B44] rounded-full hover:shadow-lg hover:shadow-[#2DD4BF]/10 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0" />
            <span>Book Consultation</span>
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-full border border-[#D5DCE6] text-[#0A1628] hover:bg-[#0A1628]/5 transition-colors shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D5DCE6] bg-white/95 backdrop-blur-xl px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 text-base font-medium text-[#0A1628]">
            <button
              type="button"
              onClick={() => handleMobileNav('#purpose')}
              className="text-left py-1.5 hover:text-[#2DD4BF] transition-colors"
            >
              My Purpose &amp; Philosophy
            </button>
            <button
              type="button"
              onClick={() => handleMobileNav('#accounts')}
              className="text-left py-1.5 hover:text-[#2DD4BF] transition-colors"
            >
              TFSA &amp; FHSA Accounts Decoded
            </button>
            <button
              type="button"
              onClick={() => handleMobileNav('#calculator')}
              className="text-left py-1.5 hover:text-[#2DD4BF] transition-colors"
            >
              Interactive Wealth Calculator
            </button>
            <button
              type="button"
              onClick={() => handleMobileNav('#comparison')}
              className="text-left py-1.5 hover:text-[#2DD4BF] transition-colors"
            >
              TFSA vs. FHSA Comparison Matrix
            </button>
            <button
              type="button"
              onClick={() => handleMobileNav('#strategy')}
              className="text-left py-1.5 hover:text-[#2DD4BF] transition-colors"
            >
              4-Step Smartest Strategy
            </button>
            <button
              type="button"
              onClick={() => handleMobileNav('#book')}
              className="text-left py-1.5 hover:text-[#2DD4BF] transition-colors"
            >
              Schedule 1-on-1 Consultation
            </button>
          </div>

          <div className="pt-3 border-t border-[#D5DCE6] flex items-center justify-between text-sm">
            <a
              href={MANDEEP_CONFIG.advisor.phoneHref}
              className="inline-flex items-center gap-2 font-mono-tabular font-semibold text-[#0A1628] hover:text-[#2DD4BF]"
            >
              <Phone className="w-4 h-4 text-[#2DD4BF]" />
              {MANDEEP_CONFIG.advisor.phoneDisplay}
            </a>
            <a
              href={MANDEEP_CONFIG.advisor.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4A6A8A] hover:text-[#0A1628] font-medium"
            >
              {MANDEEP_CONFIG.advisor.instagramHandle}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
