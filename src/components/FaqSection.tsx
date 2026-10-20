import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What is the difference between a TFSA and an FHSA?',
    answer: 'A TFSA (Tax-Free Savings Account) lets your investments grow and be withdrawn tax-free for any purpose. An FHSA (First Home Savings Account) combines RRSP-style tax-deductible contributions with TFSA-style tax-free qualifying withdrawals—but only for purchasing your first qualifying home. Both shelter your investment growth from Canadian capital gains, dividend, and interest taxes.',
    category: 'Accounts',
  },
  {
    question: 'Can I have both a TFSA and an FHSA at the same time?',
    answer: 'Yes! You can contribute up to $7,000/year to your TFSA and $8,000/year to your FHSA in 2026, for a combined $15,000 of annual tax-sheltered contribution room. Mandeep helps you determine the optimal order and allocation based on your personal goals.',
    category: 'Accounts',
  },
  {
    question: 'What happens to my FHSA if I don\'t buy a home?',
    answer: 'If you don\'t purchase a qualifying first home, you may transfer your FHSA funds to an RRSP or RRIF without affecting your RRSP contribution room (up to certain limits), or you can withdraw the funds on a taxable basis. The account must be closed by December 31 of the year that is 15 years after opening, or when you turn 71, whichever comes first.',
    category: 'FHSA Rules',
  },
  {
    question: 'How much can I save in taxes with an FHSA contribution?',
    answer: 'An $8,000 annual FHSA contribution at a 31% combined marginal tax rate generates approximately $2,480 in income tax savings per year. Over 5 years of maximum contributions ($40,000 lifetime limit), that could mean approximately $12,400 in total tax refunds—money you can reinvest into your TFSA for additional tax-free compounding.',
    category: 'Tax Savings',
  },
  {
    question: 'Is the initial consultation really free?',
    answer: 'Absolutely. Your first 30-minute Discovery Strategy Session with Mandeep is completely complimentary with zero obligation. It\'s a pressure-free review of your current TFSA and FHSA situation, your CRA contribution room, and your financial goals. You\'ll walk away with actionable next steps regardless of whether you continue working together.',
    category: 'Consultation',
  },
  {
    question: 'What should I prepare before my consultation?',
    answer: 'For the best session, have your most recent CRA Notice of Assessment handy (it shows your TFSA contribution room), know your approximate annual income (for tax bracket estimation), and think about your primary financial goal—whether that\'s buying a first home, building emergency savings, or long-term wealth. Mandeep will guide you through everything else.',
    category: 'Consultation',
  },
  {
    question: 'Do I need a minimum amount of savings to work with Mandeep?',
    answer: 'No minimum is required. Whether you\'re starting with $100/month or ready to contribute the full $15,000 annually, Mandeep structures a plan around your actual capacity. The key is starting early to benefit from tax-free compounding over time.',
    category: 'Getting Started',
  },
  {
    question: 'How do TFSA withdrawals work? Can I access my money anytime?',
    answer: 'TFSA withdrawals are generally tax-free and available anytime, subject to your account\'s terms and any investment lock-in periods. When you withdraw from your TFSA, that contribution room is generally restored the following calendar year. This makes the TFSA both a wealth-building vehicle and a flexible reserve for emergencies or opportunities.',
    category: 'TFSA Rules',
  },
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 px-6 bg-white border-b border-[#D5DCE6]">
      <div className="max-w-[900px] mx-auto space-y-14">
        <div className="text-center space-y-4">
          <p className="text-xs font-semibold tracking-widest text-[#2DD4BF]">
            Common Questions
          </p>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            Everything You Need to{' '}
            <span className="italic font-normal gradient-text-teal">Know.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4A6A8A] leading-relaxed">
            Get clear answers about TFSA, FHSA, tax savings, and working with Mandeep.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'bg-[#F0F4F8] border-[#2DD4BF]/30 shadow-sm'
                    : 'bg-white border-[#D5DCE6] hover:border-[#2DD4BF]/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isOpen ? 'text-[#2DD4BF]' : 'text-[#9BB3CC]'}`} />
                    <div>
                      <span className="text-sm sm:text-base font-semibold text-[#0A1628] leading-snug block">
                        {faq.question}
                      </span>
                      <span className={`text-[11px] font-medium mt-1 inline-block ${isOpen ? 'text-[#2DD4BF]' : 'text-[#9BB3CC]'}`}>
                        {faq.category}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#4A6A8A] shrink-0 mt-0.5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-13 sm:pl-14">
                    <p className="text-sm text-[#4A6A8A] leading-relaxed ml-8">
                      {faq.answer}
                    </p>
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
