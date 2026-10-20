import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Phone } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

interface FloatingStickyCTAProps {
  onBookClick: () => void;
}

export const FloatingStickyCTA: React.FC<FloatingStickyCTAProps> = ({ onBookClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Floating Pill CTA (Bottom Right) */}
      <div
        className={`hidden lg:block fixed bottom-8 right-8 z-40 transition-all duration-300 ${
          visible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={onBookClick}
          className="group flex items-center gap-3.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-300 pl-6 pr-3 py-3 shadow-xl shadow-teal-500/25 hover:shadow-2xl hover:shadow-teal-500/35 active:scale-95 transition-all cursor-pointer float-shadow"
        >
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#0A1628]/70 leading-none">
              Complimentary · 30 Min
            </span>
            <span className="text-sm font-bold text-[#0A1628] leading-tight mt-0.5">
              Book a Strategy Call
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0A1628] text-teal-300 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 shrink-0">
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>
      </div>

      {/* Mobile Bottom Sticky Bar (Bottom) */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
          visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
        }`}
      >
        <div className="border-t border-slate-200 bg-white/95 backdrop-blur-md px-5 py-3 shadow-2xl flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-teal-700">
              30 Min · Zero Pressure
            </div>
            <div className="font-editorial text-sm font-bold text-[#0A1628] truncate">
              Book Your Strategy Call
            </div>
          </div>

          <button
            type="button"
            onClick={onBookClick}
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-teal-400 hover:bg-teal-300 px-5 py-2.5 text-xs font-bold text-[#0A1628] shadow-md shadow-teal-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};
