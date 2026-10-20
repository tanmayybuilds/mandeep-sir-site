import React, { useState } from 'react';
import { RotateCcw, ArrowRight, Sparkles, TrendingUp, Calculator } from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';
import { AccountType, CalculatorScenario } from '../types/financial.ts';
import { calculateCompoundingScenario, formatCurrencyCAD } from '../utils/financialMath.ts';

interface CompoundingCalculatorProps {
  onLockScenarioAndBook: (scenario: CalculatorScenario) => void;
}

export const CompoundingCalculator: React.FC<CompoundingCalculatorProps> = ({
  onLockScenarioAndBook,
}) => {
  const defaults = MANDEEP_CONFIG.defaultCalculator;

  const [annualContribution, setAnnualContribution] = useState<number>(
    defaults.annualContribution
  );
  const [years, setYears] = useState<number>(defaults.years);
  const [annualReturnRate, setAnnualReturnRate] = useState<number>(defaults.annualReturnRate);
  const [accountFocus, setAccountFocus] = useState<AccountType>(defaults.accountFocus);
  const [includeTaxRefundBoost, setIncludeTaxRefundBoost] = useState<boolean>(
    defaults.includeTaxRefundBoost
  );
  const [marginalTaxRate, setMarginalTaxRate] = useState<number>(defaults.marginalTaxRate);
  const [inspectedYearIndex, setInspectedYearIndex] = useState<number | null>(null);

  const { scenario, series } = calculateCompoundingScenario({
    annualContribution,
    years,
    annualReturnRate,
    accountFocus,
    includeTaxRefundBoost,
    marginalTaxRate,
  });

  const isDefaultIllustration =
    annualContribution === 8000 && years === 10 && Math.abs(annualReturnRate - 6.0) < 0.01;

  const handleReset = () => {
    setAnnualContribution(8000);
    setYears(10);
    setAnnualReturnRate(6.0);
    setAccountFocus('FHSA');
    setIncludeTaxRefundBoost(true);
    setMarginalTaxRate(31.0);
    setInspectedYearIndex(null);
  };

  const maxBalance = Math.max(...series.map((pt) => pt.totalBalance), 1);
  const activePoint =
    inspectedYearIndex !== null && series[inspectedYearIndex]
      ? series[inspectedYearIndex]
      : series[series.length - 1];

  return (
    <section id="calculator" className="scroll-mt-20 py-20 lg:py-24 px-6 bg-white border-b border-slate-200/80">
      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <Calculator className="w-3.5 h-3.5 text-teal-600" />
            <span>Interactive Wealth Simulator</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.15]">
            Calculate Your Compound Growth.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            See how regular annual contributions grow completely tax-free inside your TFSA &amp; FHSA over time.
          </p>
        </div>

        {/* Featured Mandeep Illustration Box from Graphic */}
        <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-teal-500/15 text-teal-700 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-800 block">
                The Power of Compounding · Featured Illustration
              </span>
              <p className="font-editorial text-lg sm:text-xl font-bold text-[#0A1628]">
                $8,000 invested annually for 10 years reaches{' '}
                <span className="text-teal-700 font-bold tabular-nums">~$105,500</span>
              </p>
              <p className="text-xs text-slate-600">
                Approximately $80,000 contributed + $25,500 in tax-free growth, assuming annual contributions at year-end and a 6% return.
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 italic md:text-right shrink-0 max-w-xs leading-tight">
            Hypothetical example, not a guaranteed return. Investment fees and losses are not included.
          </span>
        </div>

        {/* Main Calculator Box */}
        <div className="rounded-3xl bg-slate-50/80 border border-slate-200/90 p-7 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column: Sliders */}
            <div className="lg:col-span-6 space-y-6">
              {/* Account Selector + Reset */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-1 p-1 bg-white rounded-full border border-slate-200 shadow-xs">
                  {(
                    [
                      { id: 'FHSA', label: 'FHSA ($8k/yr)' },
                      { id: 'TFSA', label: 'TFSA ($7k/yr)' },
                      { id: 'BOTH', label: 'Combined ($15k/yr)' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setAccountFocus(item.id);
                        if (item.id === 'TFSA' && annualContribution === 8000) setAnnualContribution(7000);
                        else if (item.id === 'FHSA' && annualContribution === 7000) setAnnualContribution(8000);
                        else if (item.id === 'BOTH' && annualContribution < 12000) setAnnualContribution(15000);
                      }}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                        accountFocus === item.id
                          ? 'bg-[#0A1628] text-white shadow-xs'
                          : 'text-slate-600 hover:text-[#0A1628]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {!isDefaultIllustration && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Slider 1: Annual Contribution */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#0A1628]">Annual Deposit</span>
                  <span className="font-editorial text-2xl font-bold tabular-nums text-teal-700">
                    {formatCurrencyCAD(annualContribution)}
                    <span className="text-xs font-sans font-normal text-slate-500"> / yr</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={15000}
                  step={500}
                  value={annualContribution}
                  onChange={(e) => setAnnualContribution(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-teal-500"
                />
                <div className="flex justify-between text-xs text-slate-500 tabular-nums">
                  <span>$1,000/yr</span>
                  <span className="text-teal-700 font-medium">$7,000 (TFSA)</span>
                  <span className="text-teal-700 font-medium">$8,000 (FHSA)</span>
                  <span>$15,000/yr</span>
                </div>
              </div>

              {/* Slider 2: Horizon */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#0A1628]">Time Horizon</span>
                  <span className="font-editorial text-2xl font-bold tabular-nums text-[#0A1628]">
                    {years} <span className="text-xs font-sans font-normal text-slate-500">{years === 1 ? 'Year' : 'Years'}</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={25}
                  step={1}
                  value={years}
                  onChange={(e) => {
                    setYears(Number(e.target.value));
                    setInspectedYearIndex(null);
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-teal-500"
                />
                <div className="flex justify-between text-xs text-slate-500 tabular-nums">
                  <span>1 yr</span>
                  <span className="text-teal-700 font-medium">10 yrs</span>
                  <span>20 yrs</span>
                  <span>25 yrs</span>
                </div>
              </div>

              {/* Slider 3: Return */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#0A1628]">Estimated Annual Return</span>
                  <span className="font-editorial text-2xl font-bold tabular-nums text-[#0A1628]">
                    {annualReturnRate.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={2.0}
                  max={10.0}
                  step={0.5}
                  value={annualReturnRate}
                  onChange={(e) => setAnnualReturnRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-teal-500"
                />
                <div className="flex justify-between text-xs text-slate-500 tabular-nums">
                  <span>2% (Conservative)</span>
                  <span className="text-teal-700 font-medium">6% (Balanced)</span>
                  <span>10% (Growth)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Results & Visual Trajectory */}
            <div className="lg:col-span-6 lg:border-l lg:border-slate-200 lg:pl-10 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Projected Portfolio Value Card */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Total Projected Portfolio Value
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                      {years} Yrs @ {annualReturnRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="font-editorial text-4xl sm:text-5xl font-bold tabular-nums text-[#0A1628]">
                      {scenario.displayProjectedTotal}
                    </span>
                    <span className="text-xs font-semibold text-teal-700 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      100% Tax-Free
                    </span>
                  </div>
                </div>

                {/* Ledger Breakdown */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 text-sm">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600">Total Principal Contributed:</span>
                    <strong className="font-semibold tabular-nums text-[#0A1628]">
                      {formatCurrencyCAD(scenario.totalContributed)}
                    </strong>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-600">Tax-Free Compound Growth:</span>
                    <strong className="font-bold tabular-nums text-teal-600">
                      +{scenario.displayGrowth}
                    </strong>
                  </div>
                </div>

                {/* Chart */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>
                      Year {activePoint.year}:{' '}
                      <strong className="text-[#0A1628] tabular-nums">{formatCurrencyCAD(activePoint.totalBalance)}</strong>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 text-[11px]">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#0A1628] inline-block" />
                        Principal
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px]">
                        <span className="w-2.5 h-2.5 rounded-xs bg-teal-400 inline-block" />
                        Growth
                      </span>
                    </div>
                  </div>

                  <svg viewBox="0 0 540 140" className="w-full h-32 overflow-visible">
                    {[0.5, 1].map((ratio) => (
                      <line
                        key={ratio}
                        x1="0"
                        y1={120 - ratio * 100}
                        x2="540"
                        y2={120 - ratio * 100}
                        stroke="#E2E8F0"
                        strokeDasharray="3 3"
                      />
                    ))}

                    {series.map((pt, idx) => {
                      const slotWidth = 520 / series.length;
                      const barWidth = Math.max(5, Math.min(20, slotWidth * 0.65));
                      const x = 10 + idx * slotWidth + (slotWidth - barWidth) / 2;
                      const totalHeight = (pt.totalBalance / maxBalance) * 100;
                      const contribHeight = (pt.cumulativeContributed / maxBalance) * 100;
                      const growthHeight = Math.max(0, totalHeight - contribHeight);
                      const yContrib = 120 - contribHeight;
                      const yGrowth = yContrib - growthHeight;

                      return (
                        <g
                          key={pt.year}
                          className="cursor-pointer"
                          onMouseEnter={() => setInspectedYearIndex(idx)}
                        >
                          <rect x={x} y={yContrib} width={barWidth} height={Math.max(2, contribHeight)} rx={2} fill="#0A1628" />
                          {growthHeight > 0.5 && (
                            <rect x={x} y={yGrowth} width={barWidth} height={growthHeight} rx={2} fill="#2DD4BF" />
                          )}
                          {(pt.year === 1 || pt.year % 5 === 0 || pt.year === series.length) && (
                            <text x={x + barWidth / 2} y="135" textAnchor="middle" fill="#64748B" fontSize="9">
                              Y{pt.year}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onLockScenarioAndBook(scenario)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full shadow-md shadow-teal-500/20 transition-all cursor-pointer hover-lift"
              >
                <Sparkles className="w-4 h-4 text-[#0A1628]" />
                <span>Review This Scenario with Mandeep</span>
                <ArrowRight className="w-4 h-4 text-[#0A1628]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
