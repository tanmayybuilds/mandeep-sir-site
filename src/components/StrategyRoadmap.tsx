import React, { useState } from 'react';
import { CheckCircle2, Circle, ArrowRight, Calendar, Sparkles, Check, ChevronRight } from 'lucide-react';
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

  const progressPercent = Math.round((completedSteps.length / MANDEEP_CONFIG.strategySteps.length) * 100);

  return (
    <section
      id="strategy"
      className="scroll-mt-20 py-20 lg:py-28 px-6 bg-[#0A1628]/[0.02] border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Background decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto space-y-14 relative z-10">
        {/* Centered Editorial Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>4-Step Action Sequence · {MANDEEP_CONFIG.advisor.secondaryTagline}</span>
          </div>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            The Smartest{' '}
            <span className="italic font-normal gradient-text-teal">Strategy.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Follow this disciplined 4-step sequence to capture immediate FHSA tax deductions, build
            unrestricted TFSA liquidity, and protect your CRA contribution room with zero guesswork.
          </p>

          {/* Progress Tracker Pill */}
          <div className="pt-2 flex items-center justify-center gap-4">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Interactive Checklist:</span>
              <div className="w-24 sm:w-32 bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-teal-500 to-sky-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-[#0A1628]">
                {completedSteps.length} of {MANDEEP_CONFIG.strategySteps.length} Reviewed
              </span>
            </div>
          </div>
        </div>

        {/* 4-Step Institutional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {MANDEEP_CONFIG.strategySteps.map((step) => {
            const isChecked = completedSteps.includes(step.stepNumber);
            return (
              <article
                key={step.stepNumber}
                className={`rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  isChecked
                    ? 'bg-white border-2 border-teal-500/60 shadow-lg shadow-teal-500/5'
                    : 'bg-white/90 border border-slate-200/90 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Subtle top indicator bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transition-colors ${
                    isChecked
                      ? 'bg-gradient-to-r from-teal-500 to-sky-500'
                      : 'bg-transparent'
                  }`}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0A1628]/5 text-[#0A1628]">
                      <span className="text-teal-600">0{step.stepNumber}</span>
                      <span className="text-slate-300">/</span>
                      <span className="uppercase text-[11px] tracking-wide text-slate-600">Phase {step.stepNumber}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleStep(step.stepNumber)}
                      aria-label={`Mark Step ${step.stepNumber}: ${step.title} as reviewed`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100'
                          : 'bg-slate-50 text-slate-500 border border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {isChecked ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="font-semibold">Reviewed</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Mark Reviewed</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-[#0A1628] leading-tight">
                    Step {step.stepNumber} — {step.title}
                  </h3>

                  <p className="text-base text-slate-700 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong className="font-semibold text-[#0A1628]">Mandeep’s Execution Tip:</strong>{' '}
                    {step.actionTip}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Institutional Navy CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0A1628] via-[#0F1D32] to-[#1B2B44] text-white p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{MANDEEP_CONFIG.advisor.secondaryTagline}</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-white leading-tight">
              Ready to put all 4 steps to work for your{' '}
              <span className="italic font-normal gradient-text-teal">2026 financial roadmap?</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Schedule a complimentary 1-on-1 strategy session with Mandeep Gurm to audit your CRA
              room, optimize timing, and structure your deposits tax-free.
            </p>
          </div>

          <button
            type="button"
            onClick={onBookStrategyClick}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full shadow-lg shadow-teal-500/25 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 hover-lift relative z-10"
          >
            <Calendar className="w-4 h-4 text-[#0A1628] shrink-0" />
            <span>{MANDEEP_CONFIG.advisor.primaryCta}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};
