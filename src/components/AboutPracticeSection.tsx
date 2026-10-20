import React from 'react';
import { Target, Compass, ShieldCheck, MessageSquareQuote, BookOpen, Award, Sparkles } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

export const AboutPracticeSection: React.FC = () => {
  const pillars = [
    {
      kicker: 'RELIEVING TAX & SAVINGS CONFUSION',
      title: 'The Problem I Solve',
      body: 'Many hardworking Canadians leave thousands of dollars in tax refunds and tax-free compounding on the table simply because nobody showed them how to sequence their FHSA and TFSA properly.',
      icon: Target,
    },
    {
      kicker: 'ACCELERATING FIRST-HOME & WEALTH GOALS',
      title: 'Why I Chose This Mission',
      body: 'Whether you are saving for keys to your first home in British Columbia or building long-term financial independence, a clear registered-account blueprint turns uncertainty into measurable progress.',
      icon: Compass,
    },
    {
      kicker: 'UNWAVERING CLIENT-FIRST ETHICS',
      title: 'What I Refuse to Compromise',
      body: 'Your Goals. My Priority. Transparent math, zero confusing jargon, and strict attention to your personal CRA contribution limits so you never face accidental over-contribution penalties.',
      icon: ShieldCheck,
    },
    {
      kicker: 'REAL CLIENT CLARITY',
      title: 'What Drives Every Plan',
      body: '“Two powerful accounts. One goal — your financial future.” Every consultation is structured so you walk away knowing the exact dollar amount, account order, and tax impact of your next deposit.',
      icon: MessageSquareQuote,
    },
  ];

  return (
    <section
      id="purpose"
      className="scroll-mt-20 py-20 lg:py-28 px-6 bg-white border-b border-[#E6E1DA]"
    >
      <div className="max-w-[1280px] mx-auto space-y-16">
        {/* Centered Editorial Heading (Matching Sarmila-reddy "Beyond the Numbers") */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9A6B26]">
            Guiding Principles · {MANDEEP_CONFIG.advisor.fullName}
          </p>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#141413] leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            Beyond the Numbers, Here’s My{' '}
            <span className="italic font-normal text-[#9A6B26]">Core Purpose.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            Wealth planning is never just about tax codes and contribution limits. It is about
            waking up knowing your savings are sheltered from unnecessary taxation, your hard work is
            compounding, and your future in Canada is anchored in clarity.
          </p>
        </div>

        {/* 4-Column Institutional Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <article
                key={idx}
                className="rounded-3xl bg-[#FAF8F5] border border-[#E6E1DA] p-7 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F3EFEA] border border-[#E6E1DA] flex items-center justify-center text-[#141413] shrink-0">
                      <IconComponent className="w-4 h-4 text-[#9A6B26]" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#57534E] leading-tight">
                      {pillar.kicker}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-[#141413]">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#57534E] leading-relaxed">{pillar.body}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Executive Statement & "On My Daily Desk" Card (Matching ref-sec4.png) */}
        <div className="rounded-3xl bg-[#FAF8F5] border border-[#E6E1DA] p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9A6B26]">
                The Philosophy Behind Every Strategy Call
              </p>
              <blockquote className="font-editorial italic text-2xl sm:text-4xl text-[#141413] leading-snug">
                “Save Today. Build Tomorrow. Two powerful accounts. One goal — your financial
                future.”
              </blockquote>
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                When clients see how an $8,000 annual contribution compounding at 6% over 10 years
                reaches <strong className="text-[#141413]">~$105,500</strong> ($80,000 contributed +
                $25,500 in tax-free growth)—while simultaneously reducing their annual taxable
                income—finance stops feeling intimidating and starts working in their favour.
              </p>

              <div className="pt-2 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#141413] text-[#D4A359] flex items-center justify-center font-editorial font-bold text-sm shrink-0">
                  MG
                </div>
                <div>
                  <p className="font-editorial font-bold text-base text-[#141413]">
                    {MANDEEP_CONFIG.advisor.fullName}
                  </p>
                  <p className="text-xs text-[#57534E]">
                    {MANDEEP_CONFIG.advisor.roleTitle} · {MANDEEP_CONFIG.advisor.instagramHandle} ·{' '}
                    {MANDEEP_CONFIG.advisor.region}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-[#E6E1DA] lg:pl-10 space-y-5">
              <h3 className="font-editorial text-lg font-bold text-[#141413]">
                Core Advisory Commitments
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E6E1DA] flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4 text-[#9A6B26]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#141413]">
                      {MANDEEP_CONFIG.advisor.secondaryTagline}
                    </p>
                    <p className="text-xs text-[#57534E] mt-0.5">
                      Daily client roadmap for tax-efficient Canadian wealth
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E6E1DA] flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-[#9A6B26]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#141413]">
                      {MANDEEP_CONFIG.advisor.brandPromise}
                    </p>
                    <p className="text-xs text-[#57534E] mt-0.5">
                      Guiding principle across every 1-on-1 consultation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E6E1DA] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#9A6B26]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#141413]">
                      Disciplined Tax-Free Compounding
                    </p>
                    <p className="text-xs text-[#57534E] mt-0.5">
                      Combining FHSA deductions with TFSA flexibility
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
