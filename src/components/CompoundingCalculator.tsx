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
    <section id="calculator" className="scroll-mt-16 py-14 lg:py-24 px-4 sm:px-6 bg-white border-b border-slate-200/80">
      <div className="max-w-[1280px] mx-auto space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <Calculator className="w-3.5 h-3.5 text-teal-600" />
            <span>Interactive Wealth Simulator</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.15]">
            Calculate Your Compound Growth.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            See how regular annual contributions grow completely tax-free inside your TFSA &amp; FHSA over time.
          </p>
        </div>

        {/* Featured Mandeep Illustration Box from Graphic */}
        <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-500/15 text-teal-700 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <TrendingUp className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-800 block">
                The Power of Compounding · Featured Model
              </span>
              <p className="font-editorial text-base sm:text-xl font-bold text-[#0A1628]">
                $8,000 invested annually for 10 years reaches{' '}
                <span className="text-teal-700 font-bold tabular-nums">~$105,500</span>
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Approximately $80,000 contributed + $25,500 in tax-free growth @ 6% return.
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 italic md:text-right shrink-0 max-w-xs leading-tight">
            Hypothetical example, not a guaranteed return. Investment fees and losses are not included.
          </span>
        </div>

        {/* Main Calculator Box */}
        <div className="rounded-3xl bg-slate-50/80 border border-slate-200/90 p-4 sm:p-7 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-stretch">
            {/* Left Column: Sliders & Controls */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              {/* Account Selector + Reset */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-white rounded-xl sm:rounded-full border border-slate-200 shadow-xs w-full sm:w-auto">
                  {(
                    [
                      { id: 'FHSA', label: 'FHSA ($8k)' },
                      { id: 'TFSA', label: 'TFSA ($7k)' },
                      { id: 'BOTH', label: 'Both ($15k)' },
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
                      className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg sm:rounded-full transition-all cursor-pointer text-center ${
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
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer self-end sm:self-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to 10-Yr Model</span>
                  </button>
                )}
              </div>

              {/* Slider 1: Annual Contribution */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-[#0A1628]">Annual Deposit</span>
                  <span className="font-editorial text-xl sm:text-2xl font-bold tabular-nums text-teal-700">
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
                <div className="flex justify-between text-[11px] sm:text-xs text-slate-400 font-mono">
                  <span>Min: $1,000/yr</span>
                  <span>Max: $15,000/yr</span>
                </div>

                {/* Quick-Pick Preset Chips (Eliminates text overlap completely) */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-medium">Quick Pick:</span>
                  {[
                    { val: 1000, label: '$1k' },
                    { val: 7000, label: '$7k TFSA' },
                    { val: 8000, label: '$8k FHSA' },
                    { val: 15000, label: '$15k Combined' },
                  ].map((chip) => (
                    <button
                      key={chip.val}
                      type="button"
                      onClick={() => setAnnualContribution(chip.val)}
                      className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold border transition-colors cursor-pointer ${
                        annualContribution === chip.val
                          ? 'bg-teal-50 border-teal-400 text-teal-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 2: Horizon */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-[#0A1628]">Time Horizon</span>
                  <span className="font-editorial text-xl sm:text-2xl font-bold tabular-nums text-[#0A1628]">
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
                <div className="flex justify-between text-[11px] sm:text-xs text-slate-400 font-mono">
                  <span>1 Year</span>
                  <span>25 Years</span>
                </div>

                {/* Quick Horizon Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-medium">Quick Pick:</span>
                  {[
                    { val: 5, label: '5 Yrs' },
                    { val: 10, label: '10 Yrs (Model)' },
                    { val: 15, label: '15 Yrs' },
                    { val: 20, label: '20 Yrs' },
                    { val: 25, label: '25 Yrs' },
                  ].map((chip) => (
                    <button
                      key={chip.val}
                      type="button"
                      onClick={() => {
                        setYears(chip.val);
                        setInspectedYearIndex(null);
                      }}
                      className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold border transition-colors cursor-pointer ${
                        years === chip.val
                          ? 'bg-teal-50 border-teal-400 text-teal-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 3: Return */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-[#0A1628]">Estimated Annual Return</span>
                  <span className="font-editorial text-xl sm:text-2xl font-bold tabular-nums text-[#0A1628]">
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
                <div className="flex justify-between text-[11px] sm:text-xs text-slate-400 font-mono">
                  <span>2.0% (Fixed Income)</span>
                  <span>10.0% (Equities)</span>
                </div>

                {/* Quick Asset Mix Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-medium">Asset Mix:</span>
                  {[
                    { val: 4.0, label: '4% GICs' },
                    { val: 6.0, label: '6% Balanced (Model)' },
                    { val: 8.0, label: '8% Growth' },
                    { val: 10.0, label: '10% All-Equity' },
                  ].map((chip) => (
                    <button
                      key={chip.val}
                      type="button"
                      onClick={() => setAnnualReturnRate(chip.val)}
                      className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold border transition-colors cursor-pointer ${
                        Math.abs(annualReturnRate - chip.val) < 0.05
                          ? 'bg-teal-50 border-teal-400 text-teal-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Results & Visual Trajectory */}
            <div className="lg:col-span-6 lg:border-l lg:border-slate-200 lg:pl-10 flex flex-col justify-between space-y-5">
              <div className="space-y-4 sm:space-y-5">
                {/* Projected Portfolio Value Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Total Projected Portfolio Value
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                      {years} Yrs @ {annualReturnRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="font-editorial text-3xl sm:text-5xl font-bold tabular-nums text-[#0A1628]">
                      {scenario.displayProjectedTotal}
                    </span>
                    <span className="text-xs font-semibold text-teal-700 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      100% Tax-Free
                    </span>
                  </div>
                </div>

                {/* Ledger Breakdown */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs sm:text-sm">
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
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
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

                  <svg viewBox="0 0 540 140" className="w-full h-28 sm:h-32 overflow-visible">
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
                      const barWidth = Math.max(4, Math.min(18, slotWidth * 0.65));
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
                          onTouchStart={() => setInspectedYearIndex(idx)}
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
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full shadow-md shadow-teal-500/20 transition-all cursor-pointer hover-lift"
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
