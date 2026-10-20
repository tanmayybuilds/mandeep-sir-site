import React from 'react';
import { Users, Clock, TrendingUp, ShieldCheck, MapPin, Heart } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '500+',
      label: 'British Columbia Families Guided',
      description: 'Helping individuals and families across BC navigate TFSA & FHSA planning.',
    },
    {
      icon: Clock,
      value: '30 Min',
      label: 'Complimentary Discovery Call',
      description: 'Your first session is free — no obligation, no pressure, just clarity.',
    },
    {
      icon: TrendingUp,
      value: '$15K',
      label: 'Combined Annual Contribution Room',
      description: 'Maximize both FHSA ($8K) and TFSA ($7K) for 2026 tax-free growth.',
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Client-First Advisory',
      description: 'Every recommendation is structured around your personal CRA limits and goals.',
    },
    {
      icon: MapPin,
      value: 'BC',
      label: 'British Columbia Specialist',
      description: 'Deep understanding of BC marginal tax brackets and provincial considerations.',
    },
    {
      icon: Heart,
      value: '0',
      label: 'Hidden Fees or Jargon',
      description: 'Transparent math, plain language, and honest guidance on every call.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 px-6 bg-[#F0F4F8]">
      <div className="max-w-[1280px] mx-auto space-y-14">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold tracking-widest text-[#2DD4BF]">
            Why Clients Trust Mandeep
          </p>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            Built on{' '}
            <span className="italic font-normal gradient-text-teal">Trust & Results.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4A6A8A] leading-relaxed">
            Every financial plan is backed by discipline, transparency, and a genuine commitment to
            your long-term success in Canada.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-[#D5DCE6] p-7 space-y-4 hover-lift"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2DD4BF]/15 to-[#38BDF8]/15 flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5 text-[#2DD4BF]" />
                  </div>
                  <span className="font-editorial text-3xl font-bold gradient-text-teal">
                    {stat.value}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0A1628] text-sm">{stat.label}</h3>
                  <p className="text-xs text-[#4A6A8A] mt-1 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
