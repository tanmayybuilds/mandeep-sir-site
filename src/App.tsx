import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { AboutPracticeSection } from './components/AboutPracticeSection.tsx';
import { AccountDeepDive } from './components/AccountDeepDive.tsx';
import { CompoundingCalculator } from './components/CompoundingCalculator.tsx';
import { ComparisonMatrix } from './components/ComparisonMatrix.tsx';
import { StrategyRoadmap } from './components/StrategyRoadmap.tsx';
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
    showToast(`Selected consultation topic: ${focus}`);
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
      `Attached ${scenario.years}-year (${scenario.displayProjectedTotal}) scenario to your booking request.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#141413]">
      <Navbar onBookClick={() => scrollToSection('#book')} />

      <main className="flex-1">
        <HeroSection
          onPrimaryCtaClick={() => scrollToSection('#book')}
          onExploreCalculatorClick={() => scrollToSection('#calculator')}
        />

        <AboutPracticeSection />

        <CompoundingCalculator onLockScenarioAndBook={handleLockScenarioAndBook} />

        <AccountDeepDive onSelectConsultationFocus={handleSelectConsultationFocus} />

        <ComparisonMatrix />

        <StrategyRoadmap onBookStrategyClick={() => scrollToSection('#book')} />

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
          className="fixed bottom-5 right-5 z-50 max-w-sm px-4 py-3 rounded-xl bg-[#141413] text-[#FAF8F5] border border-white/15 shadow-lg text-xs sm:text-sm font-medium flex items-center justify-between gap-3"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-xs text-[#D4A359] hover:underline shrink-0 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
