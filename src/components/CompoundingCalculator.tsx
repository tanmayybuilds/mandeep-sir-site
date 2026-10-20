import React, { useState } from 'react';
import { RotateCcw, ArrowRight, Sparkles, TrendingUp, DollarSign, Calculator, HelpCircle } from 'lucide-react';
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

  const handleResetToMandeepIllustration = () => {
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
    <section
      id="calculator"
      className="scroll-mt-20 py-20 lg:py-28 px-6 bg-white border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto space-y-12 relative z-10">
        {/* Centered Editorial Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <Calculator className="w-3.5 h-3.5 text-teal-600" />
            <span>Interactive Canadian Wealth Simulator · The Power of Compounding</span>
          </div>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            Calculate Your{' '}
            <span className="italic font-normal gradient-text-teal">
              Compound Growth in Canada.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Featured Model: <strong className="text-[#0A1628] font-semibold">$8,000 invested annually</strong>{' '}
            for <strong className="text-[#0A1628] font-semibold">10 years</strong> at a{' '}
            <strong className="text-[#0A1628] font-semibold">6% annual return</strong> reaches{' '}
            <strong className="font-mono font-bold text-teal-600">~$105,500</strong> ($80,000
            contributed + $25,500 in tax-free compounding growth).
          </p>
        </div>

        {/* Main Institutional Calculator Card */}
        <div className="rounded-3xl bg-slate-50/80 border border-slate-200/90 p-7 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Sliders, Presets & Controls */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-7">
              <div className="space-y-7">
                {/* Account Strategy Mode & Reset */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div
                    role="group"
                    aria-label="Account Strategy Mode"
                    className="inline-flex items-center gap-1 p-1 bg-white rounded-full border border-slate-200 shadow-xs"
                  >
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
                          if (item.id === 'TFSA' && annualContribution === 8000) {
                            setAnnualContribution(7000);
                          } else if (item.id === 'FHSA' && annualContribution === 7000) {
                            setAnnualContribution(8000);
                          } else if (item.id === 'BOTH' && annualContribution < 12000) {
                            setAnnualContribution(15000);
                          }
                        }}
                        className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                          accountFocus === item.id
                            ? 'bg-[#0A1628] text-white shadow-xs'
                            : 'text-slate-600 hover:text-[#0A1628] hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {!isDefaultIllustration && (
                    <button
                      type="button"
                      onClick={handleResetToMandeepIllustration}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to $8,000 / 10-Yr</span>
                    </button>
                  )}
                </div>

                {/* Slider 1: Annual Contribution */}
                <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="slider-annual-contribution"
                      className="text-sm font-semibold text-[#0A1628] flex items-center gap-1.5"
                    >
                      <span>Annual Contribution</span>
                    </label>
                    <span className="font-editorial text-2xl font-bold tabular-nums gradient-text-teal">
                      {formatCurrencyCAD(annualContribution)}
                      <span className="text-xs font-sans font-medium text-slate-500"> / yr</span>
                    </span>
                  </div>
                  <input
                    id="slider-annual-contribution"
                    type="range"
                    min={1000}
                    max={15000}
                    step={500}
                    value={annualContribution}
                    onChange={(e) => setAnnualContribution(Number(e.target.value))}
                    className="w-full cursor-pointer h-2 bg-slate-200 rounded-lg accent-teal-500"
                  />
                  <div className="flex justify-between text-xs tabular-nums text-slate-500">
                    <span>$1,000/yr</span>
                    <span className="text-teal-700 font-medium">$7,000 (TFSA)</span>
                    <span className="text-teal-700 font-medium">$8,000 (FHSA)</span>
                    <span>$15,000/yr</span>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                    <span className="text-xs text-slate-400 mr-1">Quick Select:</span>
                    {[
                      { val: 5000, label: '$5,000' },
                      { val: 7000, label: '$7,000 (TFSA)' },
                      { val: 8000, label: '$8,000 (FHSA)' },
                      { val: 15000, label: '$15,000 (Both)' },
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setAnnualContribution(preset.val)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                          annualContribution === preset.val
                            ? 'bg-[#0A1628] text-white border-[#0A1628]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider 2: Investment Horizon */}
                <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="slider-time-horizon"
                      className="text-sm font-semibold text-[#0A1628]"
                    >
                      Investment Horizon
                    </label>
                    <span className="font-editorial text-2xl font-bold tabular-nums text-[#0A1628]">
                      {years} <span className="text-sm font-sans font-normal text-slate-500">{years === 1 ? 'Year' : 'Years'}</span>
                    </span>
                  </div>
                  <input
                    id="slider-time-horizon"
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={years}
                    onChange={(e) => {
                      setYears(Number(e.target.value));
                      setInspectedYearIndex(null);
                    }}
                    className="w-full cursor-pointer h-2 bg-slate-200 rounded-lg accent-teal-500"
                  />
                  <div className="flex justify-between text-xs tabular-nums text-slate-500">
                    <span>1 yr</span>
                    <span className="text-teal-700 font-medium">10 yrs (Featured)</span>
                    <span>20 yrs</span>
                    <span>30 yrs</span>
                  </div>
                </div>

                {/* Slider 3: Estimated Annual Return */}
                <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="slider-return-rate"
                      className="text-sm font-semibold text-[#0A1628]"
                    >
                      Estimated Annual Return Rate
                    </label>
                    <span className="font-editorial text-2xl font-bold tabular-nums text-[#0A1628]">
                      {annualReturnRate.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    id="slider-return-rate"
                    type="range"
                    min={2.0}
                    max={10.0}
                    step={0.5}
                    value={annualReturnRate}
                    onChange={(e) => setAnnualReturnRate(Number(e.target.value))}
                    className="w-full cursor-pointer h-2 bg-slate-200 rounded-lg accent-teal-500"
                  />
                  <div className="flex justify-between text-xs tabular-nums text-slate-500">
                    <span>2% (Conservative)</span>
                    <span className="text-teal-700 font-medium">6% (Balanced)</span>
                    <span>10% (Aggressive)</span>
                  </div>
                </div>

                {/* FHSA Marginal Tax Bracket Estimator */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="toggle-tax-refund"
                      className="text-xs sm:text-sm font-semibold text-[#0A1628] cursor-pointer"
                    >
                      Include Estimated FHSA Tax Deduction Refund
                    </label>
                    <input
                      id="toggle-tax-refund"
                      type="checkbox"
                      checked={includeTaxRefundBoost && accountFocus !== 'TFSA'}
                      disabled={accountFocus === 'TFSA'}
                      onChange={(e) => setIncludeTaxRefundBoost(e.target.checked)}
                      className="w-4 h-4 accent-teal-500 rounded cursor-pointer"
                    />
                  </div>

                  {includeTaxRefundBoost && accountFocus !== 'TFSA' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pt-2 border-t border-slate-100">
                      <label htmlFor="select-marginal-tax" className="text-xs text-slate-600">
                        BC Marginal Tax Bracket:
                      </label>
                      <select
                        id="select-marginal-tax"
                        value={marginalTaxRate}
                        onChange={(e) => setMarginalTaxRate(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-slate-50 border border-slate-200 text-[#0A1628] focus:outline-none focus:border-teal-500"
                      >
                        {MANDEEP_CONFIG.bcMarginalTaxBrackets.map((b) => (
                          <option key={b.rate} value={b.rate}>
                            {b.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Institutional Results Ledger & Trajectory Chart */}
            <div className="lg:col-span-6 lg:border-l lg:border-slate-200 lg:pl-12 flex flex-col justify-between space-y-6">
              {/* Primary Total Projected Value Callout */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Projected Portfolio Value
                    </p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[11px] font-semibold border border-teal-200">
                      {years} {years === 1 ? 'Year' : 'Years'} @ {annualReturnRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                    <p
                      data-testid="projected-total-value"
                      className="font-editorial text-4xl sm:text-5xl font-bold tabular-nums text-[#0A1628]"
                    >
                      {scenario.displayProjectedTotal}
                    </p>
                    <span className="text-xs font-semibold text-teal-600 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      100% Tax-Sheltered Growth
                    </span>
                  </div>
                </div>

                {/* Breakdown Rows */}
                <div className="space-y-2.5 text-sm bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Total Principal Contributed:</span>
                    <strong
                      data-testid="total-contributed-value"
                      className="font-mono font-semibold text-[#0A1628]"
                    >
                      {formatCurrencyCAD(scenario.totalContributed)}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Tax-Free Compounding Growth:</span>
                    <strong
                      data-testid="total-growth-value"
                      className="font-mono font-bold text-teal-600"
                    >
                      +{scenario.displayGrowth}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <span className="font-semibold text-[#0A1628]">
                        Estimated Canadian Tax Deduction Advantage:
                      </span>
                      <p className="text-xs text-slate-500">
                        {accountFocus === 'TFSA'
                          ? 'TFSA grows 100% tax-free (switch to FHSA to model upfront tax refund)'
                          : `Est. ${formatCurrencyCAD(scenario.estimatedAnnualTaxRefund)}/yr tax refund from FHSA deduction`}
                      </p>
                    </div>
                    <strong className="font-mono font-bold text-sky-600">
                      +{formatCurrencyCAD(scenario.estimatedTotalTaxSaved)}
                    </strong>
                  </div>
                </div>

                {/* Refined Architectural Stacked Bar Trajectory */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 space-y-3 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                    <div>
                      Year {activePoint.year}:{' '}
                      <strong className="font-mono text-[#0A1628]">
                        {formatCurrencyCAD(activePoint.totalBalance)}
                      </strong>{' '}
                      <span className="text-slate-400">
                        ({formatCurrencyCAD(activePoint.cumulativeContributed)} principal +{' '}
                        <span className="text-teal-600 font-mono font-semibold">
                          {formatCurrencyCAD(activePoint.investmentGrowth)} growth
                        </span>
                        )
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#0A1628] inline-block" />
                        Principal
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-teal-400 inline-block" />
                        Compound Growth
                      </span>
                    </div>
                  </div>

                  <svg
                    viewBox="0 0 560 155"
                    className="w-full h-36 overflow-visible"
                    role="img"
                    aria-label={`Bar chart showing ${years}-year compounding trajectory reaching ${scenario.displayProjectedTotal}`}
                  >
                    {[0.5, 1].map((ratio) => {
                      const yPos = 135 - ratio * 115;
                      return (
                        <line
                          key={ratio}
                          x1="0"
                          y1={yPos}
                          x2="560"
                          y2={yPos}
                          stroke="#E2E8F0"
                          strokeDasharray="3 3"
                        />
                      );
                    })}

                    {series.map((pt, idx) => {
                      const slotWidth = 540 / series.length;
                      const barWidth = Math.max(5, Math.min(24, slotWidth * 0.66));
                      const x = 10 + idx * slotWidth + (slotWidth - barWidth) / 2;

                      const totalHeight = (pt.totalBalance / maxBalance) * 115;
                      const contribHeight = (pt.cumulativeContributed / maxBalance) * 115;
                      const growthHeight = Math.max(0, totalHeight - contribHeight);

                      const yContrib = 135 - contribHeight;
                      const yGrowth = yContrib - growthHeight;
                      const isHovered = inspectedYearIndex === idx;

                      return (
                        <g
                          key={pt.year}
                          className="cursor-pointer transition-opacity"
                          onMouseEnter={() => setInspectedYearIndex(idx)}
                          onClick={() => setInspectedYearIndex(idx)}
                        >
                          <rect
                            x={x}
                            y={yContrib}
                            width={barWidth}
                            height={Math.max(2, contribHeight)}
                            rx={2}
                            fill={isHovered ? '#1B2B44' : '#0A1628'}
                          />
                          {growthHeight > 0.5 && (
                            <rect
                              x={x}
                              y={yGrowth}
                              width={barWidth}
                              height={growthHeight}
                              rx={2}
                              fill={isHovered ? '#5EEAD4' : '#2DD4BF'}
                            />
                          )}
                          {(series.length <= 12 ||
                            pt.year === 1 ||
                            pt.year % 5 === 0 ||
                            pt.year === series.length) && (
                            <text
                              x={x + barWidth / 2}
                              y="150"
                              textAnchor="middle"
                              fill="#64748B"
                              fontSize="9"
                              fontFamily="IBM Plex Mono, monospace"
                            >
                              Y{pt.year}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Action CTA + Mandatory Compliance Disclaimer */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => onLockScenarioAndBook(scenario)}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full shadow-md shadow-teal-500/20 transition-all duration-200 cursor-pointer whitespace-nowrap hover-lift"
                >
                  <Sparkles className="w-4 h-4 text-[#0A1628] shrink-0" />
                  <span>Review This Scenario with Mandeep</span>
                  <ArrowRight className="w-4 h-4 text-[#0A1628] shrink-0" />
                </button>

                <p className="text-[11px] text-center text-slate-500 leading-relaxed">
                  * {defaults.complianceDisclaimer} Assuming annual deposits at year-end with compounding at a{' '}
                  {annualReturnRate.toFixed(1)}% annual rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
