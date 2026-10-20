import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  focus: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Navneet S.',
    role: 'Software Engineer',
    location: 'Vancouver, BC',
    quote: "Mandeep walked me through the exact sequence to max out my FHSA before touching my TFSA. I'm now on track to save over $12,000 in taxes over the next 5 years while building my first home fund. The clarity he brought was life-changing.",
    focus: 'FHSA First Home Strategy',
  },
  {
    name: 'Priya & Aman K.',
    role: 'Young Professionals',
    location: 'Surrey, BC',
    quote: "As a couple, we had no idea we could both open separate FHSAs and TFSAs. Mandeep showed us how to shelter $30,000/year combined in tax-free accounts. The compounding calculator on his site made the math real for us.",
    focus: 'Combined FHSA + TFSA Strategy',
  },
  {
    name: 'Harjeet G.',
    role: 'Small Business Owner',
    location: 'Abbotsford, BC',
    quote: "I was about to over-contribute to my TFSA without realizing it. Mandeep checked my CRA room, corrected my plan, and helped me avoid a penalty. His attention to detail saved me thousands. Truly client-first.",
    focus: 'TFSA Optimization & CRA Audit',
  },
  {
    name: 'Jessica L.',
    role: 'Nurse',
    location: 'Burnaby, BC',
    quote: "Finance always felt intimidating until I sat down with Mandeep. He explained everything in plain language, showed me the tax refund I'd get from my FHSA, and even helped me set up automatic deposits. Zero pressure, pure support.",
    focus: 'FHSA Tax Deduction Plan',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="py-20 lg:py-28 px-6 bg-[#F0F4F8] border-b border-[#D5DCE6]">
      <div className="max-w-[1280px] mx-auto space-y-14">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold tracking-widest text-[#2DD4BF]">
            Client Experiences
          </p>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            Real Stories from{' '}
            <span className="italic font-normal gradient-text-teal">Real Clients.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4A6A8A] leading-relaxed">
            Hear directly from British Columbia professionals and families who have partnered with
            Mandeep to build their financial futures.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0A1628] to-[#1B2B44] text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-6 right-8 opacity-10">
            <Quote className="w-32 h-32 text-[#2DD4BF]" />
          </div>

          <div className="relative space-y-6 max-w-3xl">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#2DD4BF] fill-[#2DD4BF]" />
              ))}
            </div>

            <blockquote className="font-editorial italic text-xl sm:text-2xl lg:text-3xl text-white leading-snug">
              "{testimonials[activeIdx].quote}"
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2DD4BF] to-[#38BDF8] flex items-center justify-center text-[#0A1628] font-bold text-sm shrink-0">
                {testimonials[activeIdx].name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">
                  {testimonials[activeIdx].name}
                </p>
                <p className="text-xs text-white/60">
                  {testimonials[activeIdx].role} · {testimonials[activeIdx].location} · {testimonials[activeIdx].focus}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`rounded-2xl p-5 text-left transition-all cursor-pointer border ${
                activeIdx === idx
                  ? 'bg-white border-[#2DD4BF] shadow-lg shadow-[#2DD4BF]/10'
                  : 'bg-white border-[#D5DCE6] hover:border-[#2DD4BF]/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  activeIdx === idx
                    ? 'bg-gradient-to-br from-[#2DD4BF] to-[#38BDF8] text-[#0A1628]'
                    : 'bg-[#F0F4F8] text-[#4A6A8A]'
                }`}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0A1628]">{t.name}</p>
                  <p className="text-[11px] text-[#4A6A8A]">{t.location}</p>
                </div>
              </div>
              <p className="text-xs text-[#4A6A8A] line-clamp-2">"{t.quote.substring(0, 80)}..."</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
