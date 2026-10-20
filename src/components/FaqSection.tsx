import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'Can I contribute to both a TFSA and an FHSA in the same tax year?',
    answer:
      'Yes! The TFSA and FHSA are completely independent registered accounts with separate CRA contribution limits ($7,000 for TFSA and $8,000 for FHSA in 2026). Contributing to one has zero impact on your room in the other.',
  },
  {
    question: 'How does the FHSA tax deduction work on my taxes?',
    answer:
      'FHSA contributions reduce your net taxable income dollar-for-dollar, exactly like an RRSP. For instance, contributing the full $8,000 at a 31% marginal tax bracket generates an estimated $2,480 income tax refund from the CRA.',
  },
  {
    question: 'What happens if I never end up buying a home with my FHSA?',
    answer:
      'If you do not purchase a qualifying first home within 15 years, you can transfer your entire FHSA balance (including all accumulated investment growth) directly into your RRSP tax-free, without using or needing any existing RRSP contribution room.',
  },
  {
    question: 'Is the 1-on-1 strategy call with Mandeep really complimentary?',
    answer:
      'Yes, 100% complimentary with zero obligation. It is a private 30-minute advisory call to audit your CRA My Account contribution room, model customized compounding scenarios, and provide clear next steps.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-16 py-14 lg:py-24 px-4 sm:px-6 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-[840px] mx-auto space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>Essential Answers</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628]">
            Frequently Asked Questions.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Clear, honest answers to the most common registered account questions.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-slate-50/60 transition-colors"
                >
                  <span className="font-editorial text-lg sm:text-xl font-bold text-[#0A1628] pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-teal-500/15 text-teal-700 rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
