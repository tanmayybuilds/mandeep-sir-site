import React, { useState } from 'react';
import { CheckCircle2, Circle, ArrowRight, Calendar } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

interface StrategyRoadmapProps {
  onBookStrategyClick: () => void;
}

export const StrategyRoadmap: React.FC<StrategyRoadmapProps> = ({ onBookStrategyClick }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((s) => s !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  return (
    <section
      id="strategy"
      className="scroll-mt-20 py-20 lg:py-28 px-6 bg-white border-b border-[#E6E1DA]"
    >
      <div className="max-w-[1280px] mx-auto space-y-14">
        {/* Centered Editorial Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9A6B26]">
            4-Step Client Action Roadmap · {MANDEEP_CONFIG.advisor.secondaryTagline}
          </p>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#141413] leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            The Smartest{' '}
            <span className="italic font-normal text-[#9A6B26]">Strategy.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            Follow this disciplined 4-step sequence to capture immediate FHSA tax deductions, build
            unrestricted TFSA liquidity, and protect your CRA contribution room.
          </p>
        </div>

        {/* 4-Step Institutional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {MANDEEP_CONFIG.strategySteps.map((step) => {
            const isChecked = completedSteps.includes(step.stepNumber);
            return (
              <article
                key={step.stepNumber}
                className={`rounded-3xl bg-[#FAF8F5] border p-8 sm:p-9 flex flex-col justify-between transition-colors ${
                  isChecked ? 'border-[#9A6B26]' : 'border-[#E6E1DA]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-mono-tabular font-bold uppercase tracking-wider text-[#9A6B26]">
                      0{step.stepNumber}. Step {step.stepNumber}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleStep(step.stepNumber)}
                      aria-label={`Mark Step ${step.stepNumber}: ${step.title} as reviewed`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#57534E] hover:text-[#141413] transition-colors cursor-pointer"
                    >
                      {isChecked ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                          <span className="text-[#15803D] font-semibold">Reviewed</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4 text-[#57534E]" />
                          <span>Mark Reviewed</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-[#141413]">
                    Step {step.stepNumber} — {step.title}
                  </h3>

                  <p className="text-base font-medium text-[#141413] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E6E1DA] text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  <strong className="font-semibold text-[#141413]">Mandeep’s Execution Note:</strong>{' '}
                  {step.actionTip}
                </div>
              </article>
            );
          })}
        </div>

        {/* Institutional Dark Espresso Callout Card */}
        <div className="rounded-3xl bg-[#141413] text-[#FAF8F5] p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2.5 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D4A359]">
              {MANDEEP_CONFIG.advisor.secondaryTagline}
            </p>
            <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-white">
              Ready to put all 4 steps to work for your{' '}
              <span className="italic font-normal text-[#D4A359]">2026 financial plan?</span>
            </h3>
            <p className="text-sm sm:text-base text-[#FAF8F5]/75 leading-relaxed">
              Schedule a complimentary 1-on-1 strategy session with Mandeep Gurm to review your CRA
              room and structure your deposits properly.
            </p>
          </div>

          <button
            type="button"
            onClick={onBookStrategyClick}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold text-[#141413] bg-[#FAF8F5] hover:bg-[#F3EFEA] rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Calendar className="w-4 h-4 text-[#9A6B26] shrink-0" />
            <span>{MANDEEP_CONFIG.advisor.primaryCta}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};
