import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { AccountDeepDive } from './components/AccountDeepDive.tsx';
import { CompoundingCalculator } from './components/CompoundingCalculator.tsx';
import { StrategyRoadmap } from './components/StrategyRoadmap.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { BookingEngine } from './components/BookingEngine.tsx';
import { Footer } from './components/Footer.tsx';
import { CalculatorScenario, ConsultationFocus } from './types/financial.ts';

export default function App() {
  const [selectedFocus, setSelectedFocus] = useState<ConsultationFocus>('First Home FHSA Plan');
  const [attachedScenario, setAttachedScenario] = useState<CalculatorScenario | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectConsultationFocus = (focus: ConsultationFocus) => {
    setSelectedFocus(focus);
    scrollToSection('#book');
    showToast(`Selected: ${focus}`);
  };

  const handleLockScenarioAndBook = (scenario: CalculatorScenario) => {
    setAttachedScenario(scenario);
    if (scenario.accountFocus === 'FHSA') {
      setSelectedFocus('First Home FHSA Plan');
    } else if (scenario.accountFocus === 'TFSA') {
      setSelectedFocus('TFSA Wealth Growth');
    } else {
      setSelectedFocus('Combined FHSA + TFSA Strategy');
    }
    scrollToSection('#book');
    showToast(
      `Attached ${scenario.years}-year (${scenario.displayProjectedTotal}) scenario to booking.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F4F8] text-[#0A1628]">
      <Navbar onBookClick={() => scrollToSection('#book')} />

      <main className="flex-1">
        {/* 1. Hero: High-Impact Value Proposition & At-a-Glance Snapshot */}
        <HeroSection
          onPrimaryCtaClick={() => scrollToSection('#book')}
          onExploreCalculatorClick={() => scrollToSection('#calculator')}
        />

        {/* 2. Core Comparison: TFSA vs. FHSA Decoded */}
        <AccountDeepDive onSelectConsultationFocus={handleSelectConsultationFocus} />

        {/* 3. Interactive Wealth Simulator: 10-Yr Compounding */}
        <CompoundingCalculator onLockScenarioAndBook={handleLockScenarioAndBook} />

        {/* 4. Action Sequence: 3-Step Strategy Blueprint */}
        <StrategyRoadmap onBookStrategyClick={() => scrollToSection('#book')} />

        {/* 5. Essential FAQs: 4 High-Value Answers */}
        <FaqSection />

        {/* 6. Direct Scheduler & Advisory Desk */}
        <BookingEngine
          selectedFocus={selectedFocus}
          onFocusChange={setSelectedFocus}
          attachedScenario={attachedScenario}
          onClearScenario={() => setAttachedScenario(null)}
          onTriggerToast={showToast}
        />
      </main>

      <Footer />

      {/* Accessible Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-sm px-5 py-3.5 rounded-2xl bg-[#0A1628] text-white border border-white/10 shadow-2xl text-xs sm:text-sm font-medium flex items-center justify-between gap-3"
          style={{ backdropFilter: 'blur(12px)' }}
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-xs text-[#2DD4BF] hover:underline shrink-0 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
