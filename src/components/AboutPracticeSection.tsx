import React from 'react';
import { Target, Compass, ShieldCheck, MessageSquareQuote, BookOpen, Award, Sparkles } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

export const AboutPracticeSection: React.FC = () => {
  const pillars = [
    {
      kicker: 'Relieving Tax & Savings Confusion',
      title: 'The Problem I Solve',
      body: 'Many hardworking Canadians leave thousands of dollars in tax refunds and tax-free compounding on the table simply because nobody showed them how to sequence their FHSA and TFSA properly.',
      icon: Target,
      gradient: 'from-[#2DD4BF]/15 to-[#38BDF8]/15',
      iconColor: 'text-[#2DD4BF]',
    },
    {
      kicker: 'Accelerating First-Home & Wealth Goals',
      title: 'Why I Chose This Mission',
      body: 'Whether you are saving for keys to your first home in British Columbia or building long-term financial independence, a clear registered-account blueprint turns uncertainty into measurable progress.',
      icon: Compass,
      gradient: 'from-[#38BDF8]/15 to-[#818CF8]/15',
      iconColor: 'text-[#38BDF8]',
    },
    {
      kicker: 'Unwavering Client-First Ethics',
      title: 'What I Refuse to Compromise',
      body: 'Your Goals. My Priority. Transparent math, zero confusing jargon, and strict attention to your personal CRA contribution limits so you never face accidental over-contribution penalties.',
      icon: ShieldCheck,
      gradient: 'from-[#818CF8]/15 to-[#C084FC]/15',
      iconColor: 'text-[#818CF8]',
    },
    {
      kicker: 'Real Client Clarity',
      title: 'What Drives Every Plan',
      body: '"Two powerful accounts. One goal — your financial future." Every consultation is structured so you walk away knowing the exact dollar amount, account order, and tax impact of your next deposit.',
      icon: MessageSquareQuote,
      gradient: 'from-[#C084FC]/15 to-[#2DD4BF]/15',
      iconColor: 'text-[#C084FC]',
    },
  ];

  return (
    <section
      id="purpose"
      className="scroll-mt-20 py-20 lg:py-28 px-6 bg-white border-b border-[#D5DCE6]"
    >
      <div className="max-w-[1280px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold tracking-widest text-[#2DD4BF]">
            Guiding Principles · {MANDEEP_CONFIG.advisor.fullName}
          </p>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            Beyond the Numbers, Here's My{' '}
            <span className="italic font-normal gradient-text-teal">Core Purpose.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4A6A8A] leading-relaxed">
            Wealth planning is never just about tax codes and contribution limits. It is about
            waking up knowing your savings are sheltered from unnecessary taxation, your hard work is
            compounding, and your future in Canada is anchored in clarity.
          </p>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <article
                key={idx}
                className="rounded-3xl bg-[#F0F4F8] border border-[#D5DCE6] p-7 flex flex-col justify-between space-y-6 hover-lift"
              >
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pillar.gradient} border border-white/50 flex items-center justify-center ${pillar.iconColor} shrink-0`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider text-[#4A6A8A] leading-tight">
                      {pillar.kicker}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-[#0A1628]">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#4A6A8A] leading-relaxed">{pillar.body}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Executive Statement & Commitments */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0A1628] to-[#1B2B44] text-white p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold tracking-widest text-[#2DD4BF]">
                The Philosophy Behind Every Strategy Call
              </p>
              <blockquote className="font-editorial italic text-2xl sm:text-4xl text-white leading-snug">
                "Save Today. Build Tomorrow. Two powerful accounts. One goal — your financial
                future."
              </blockquote>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                When clients see how an $8,000 annual contribution compounding at 6% over 10 years
                reaches <strong className="text-[#2DD4BF]">~$105,500</strong> ($80,000 contributed +
                $25,500 in tax-free growth)—while simultaneously reducing their annual taxable
                income—finance stops feeling intimidating and starts working in their favour.
              </p>

              <div className="pt-2 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2DD4BF] to-[#38BDF8] text-[#0A1628] flex items-center justify-center font-editorial font-bold text-sm shrink-0">
                  MG
                </div>
                <div>
                  <p className="font-editorial font-bold text-base text-white">
                    {MANDEEP_CONFIG.advisor.fullName}
                  </p>
                  <p className="text-xs text-white/60">
                    {MANDEEP_CONFIG.advisor.roleTitle} · {MANDEEP_CONFIG.advisor.instagramHandle} ·{' '}
                    {MANDEEP_CONFIG.advisor.region}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-10 space-y-5">
              <h3 className="font-editorial text-lg font-bold text-white">
                Core Advisory Commitments
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4 text-[#2DD4BF]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {MANDEEP_CONFIG.advisor.secondaryTagline}
                    </p>
                    <p className="text-xs text-white/50 mt-0.5">
                      Daily client roadmap for tax-efficient Canadian wealth
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-[#38BDF8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {MANDEEP_CONFIG.advisor.brandPromise}
                    </p>
                    <p className="text-xs text-white/50 mt-0.5">
                      Guiding principle across every 1-on-1 consultation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#C084FC]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Disciplined Tax-Free Compounding
                    </p>
                    <p className="text-xs text-white/50 mt-0.5">
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
