import React, { useState } from 'react';
import { RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
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
      className="scroll-mt-20 py-20 lg:py-28 px-6 bg-white border-b border-[#E6E1DA]"
    >
      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Centered Editorial Header (Matching Sarmila-reddy "Calculate Your Compound Growth in Canada.") */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9A6B26]">
            Interactive Canadian Wealth Simulator · The Power of Compounding
          </p>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#141413] leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            Calculate Your{' '}
            <span className="italic font-normal text-[#9A6B26]">
              Compound Growth in Canada.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            Featured Illustration: <strong className="text-[#141413]">$8,000 invested annually</strong>{' '}
            for <strong className="text-[#141413]">10 years</strong> at a{' '}
            <strong className="text-[#141413]">6% annual return</strong> reaches{' '}
            <strong className="font-mono-tabular text-[#15803D]">~$105,500</strong> ($80,000
            contributed + $25,500 in tax-free growth).
          </p>
        </div>

        {/* Main Institutional Calculator Card */}
        <div className="rounded-3xl bg-[#FAF8F5] border border-[#E6E1DA] p-7 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Sliders, Quick Presets & Tax Bracket Controls */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-7">
              <div className="space-y-7">
                {/* Account Strategy Mode & Reset */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div
                    role="group"
                    aria-label="Account Strategy Mode"
                    className="inline-flex items-center gap-1 p-1 bg-white rounded-full border border-[#E6E1DA]"
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
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                          accountFocus === item.id
                            ? 'bg-[#141413] text-[#FAF8F5]'
                            : 'text-[#57534E] hover:text-[#141413]'
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
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A6B26] hover:text-[#141413] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to $8,000 / 10-Yr</span>
                    </button>
                  )}
                </div>

                {/* Slider 1: Annual Contribution */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="slider-annual-contribution"
                      className="text-sm font-semibold text-[#141413]"
                    >
                      Annual Contribution
                    </label>
                    <span className="font-editorial text-xl font-bold tabular-nums text-[#141413]">
                      {formatCurrencyCAD(annualContribution)} / yr
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
                    className="w-full accent-[#9A6B26] cursor-pointer h-2 bg-[#E6E1DA] rounded-lg"
                  />
                  <div className="flex justify-between text-xs tabular-nums text-[#57534E]">
                    <span>$1,000/yr</span>
                    <span>$7,000 (TFSA)</span>
                    <span>$8,000 (FHSA)</span>
                    <span>$15,000/yr</span>
                  </div>

                  {/* Quick Amount Buttons (Matching Sarmila-reddy) */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs text-[#57534E] mr-1">Quick:</span>
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
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-colors cursor-pointer whitespace-nowrap ${
                          annualContribution === preset.val
                            ? 'bg-[#141413] text-[#FAF8F5] border-[#141413]'
                            : 'bg-white text-[#57534E] border-[#E6E1DA] hover:border-[#141413]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider 2: Investment Horizon */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="slider-time-horizon"
                      className="text-sm font-semibold text-[#141413]"
                    >
                      Investment Horizon
                    </label>
                    <span className="font-editorial text-xl font-bold tabular-nums text-[#141413]">
                      {years} {years === 1 ? 'Year' : 'Years'}
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
                    className="w-full accent-[#9A6B26] cursor-pointer h-2 bg-[#E6E1DA] rounded-lg"
                  />
                  <div className="flex justify-between text-xs tabular-nums text-[#57534E]">
                    <span>1 yr</span>
                    <span>10 yrs (Featured)</span>
                    <span>20 yrs</span>
                    <span>30 yrs</span>
                  </div>
                </div>

                {/* Slider 3: Estimated Annual Return */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="slider-return-rate"
                      className="text-sm font-semibold text-[#141413]"
                    >
                      Estimated Annual Return
                    </label>
                    <span className="font-editorial text-xl font-bold tabular-nums text-[#141413]">
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
                    className="w-full accent-[#9A6B26] cursor-pointer h-2 bg-[#E6E1DA] rounded-lg"
                  />
                  <div className="flex justify-between text-xs tabular-nums text-[#57534E]">
                    <span>2% (Conservative)</span>
                    <span>6% (Balanced)</span>
                    <span>10% (Growth)</span>
                  </div>
                </div>

                {/* FHSA Marginal Tax Bracket Estimator */}
                <div className="pt-4 border-t border-[#E6E1DA] space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="toggle-tax-refund"
                      className="text-xs sm:text-sm font-semibold text-[#141413] cursor-pointer"
                    >
                      Include Estimated FHSA Tax Deduction Refund
                    </label>
                    <input
                      id="toggle-tax-refund"
                      type="checkbox"
                      checked={includeTaxRefundBoost && accountFocus !== 'TFSA'}
                      disabled={accountFocus === 'TFSA'}
                      onChange={(e) => setIncludeTaxRefundBoost(e.target.checked)}
                      className="w-4 h-4 accent-[#141413] rounded cursor-pointer"
                    />
                  </div>

                  {includeTaxRefundBoost && accountFocus !== 'TFSA' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <label htmlFor="select-marginal-tax" className="text-xs text-[#57534E]">
                        BC Marginal Tax Bracket:
                      </label>
                      <select
                        id="select-marginal-tax"
                        value={marginalTaxRate}
                        onChange={(e) => setMarginalTaxRate(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs font-mono-tabular rounded-xl bg-white border border-[#E6E1DA] text-[#141413] focus:outline-none focus:border-[#141413]"
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
            <div className="lg:col-span-6 lg:border-l lg:border-[#E6E1DA] lg:pl-12 flex flex-col justify-between space-y-6">
              {/* Primary Total Projected Value Callout */}
              <div className="space-y-5">
                <div className="border-b border-[#E6E1DA] pb-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#57534E]">
                    Projected Portfolio Value ({years} {years === 1 ? 'Year' : 'Years'} @{' '}
                    {annualReturnRate.toFixed(1)}%)
                  </p>
                  <div className="mt-2 flex items-baseline justify-between gap-4">
                    <p
                      data-testid="projected-total-value"
                      className="font-editorial text-4xl sm:text-5xl font-bold tabular-nums text-[#141413]"
                    >
                      {scenario.displayProjectedTotal}
                    </p>
                    <span className="text-xs font-semibold text-[#15803D]">
                      100% Tax-Sheltered Growth
                    </span>
                  </div>
                </div>

                {/* Breakdown Rows (Matching Sarmila-reddy right calculator panel) */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-1.5 border-b border-[#E6E1DA]/70">
                    <span className="text-[#57534E]">Total Principal Contributed:</span>
                    <strong
                      data-testid="total-contributed-value"
                      className="font-mono-tabular font-semibold text-[#141413]"
                    >
                      {formatCurrencyCAD(scenario.totalContributed)}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#E6E1DA]/70">
                    <span className="text-[#57534E]">Tax-Free Compounding Growth:</span>
                    <strong
                      data-testid="total-growth-value"
                      className="font-mono-tabular font-bold text-[#15803D]"
                    >
                      +{scenario.displayGrowth}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-[#E6E1DA]/70">
                    <div>
                      <span className="font-semibold text-[#141413]">
                        Estimated Canadian Tax Deduction Advantage:
                      </span>
                      <p className="text-xs text-[#57534E]">
                        {accountFocus === 'TFSA'
                          ? 'TFSA grows 100% tax-free (switch to FHSA to model upfront tax refund)'
                          : `Est. ${formatCurrencyCAD(scenario.estimatedAnnualTaxRefund)}/yr tax refund from FHSA deduction`}
                      </p>
                    </div>
                    <strong className="font-mono-tabular font-bold text-[#15803D]">
                      +{formatCurrencyCAD(scenario.estimatedTotalTaxSaved)}
                    </strong>
                  </div>
                </div>

                {/* Refined Architectural Stacked Bar Trajectory */}
                <div className="rounded-2xl bg-white border border-[#E6E1DA] p-4 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E]">
                    <span>
                      Year {activePoint.year}:{' '}
                      <strong className="font-mono-tabular text-[#141413]">
                        {formatCurrencyCAD(activePoint.totalBalance)}
                      </strong>{' '}
                      ({formatCurrencyCAD(activePoint.cumulativeContributed)} principal +{' '}
                      <span className="text-[#15803D] font-mono-tabular font-semibold">
                        {formatCurrencyCAD(activePoint.investmentGrowth)} growth
                      </span>
                      )
                    </span>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#141413] inline-block" />
                        Principal
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#9A6B26] inline-block" />
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
                          stroke="#E6E1DA"
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
                          className="cursor-pointer"
                          onMouseEnter={() => setInspectedYearIndex(idx)}
                          onClick={() => setInspectedYearIndex(idx)}
                        >
                          <rect
                            x={x}
                            y={yContrib}
                            width={barWidth}
                            height={Math.max(2, contribHeight)}
                            rx={2}
                            fill={isHovered ? '#292524' : '#141413'}
                          />
                          {growthHeight > 0.5 && (
                            <rect
                              x={x}
                              y={yGrowth}
                              width={barWidth}
                              height={growthHeight}
                              rx={2}
                              fill={isHovered ? '#B47B2B' : '#9A6B26'}
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
                              fill="#57534E"
                              fontSize="9"
                              fontFamily="JetBrains Mono, monospace"
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
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold text-[#FAF8F5] bg-[#141413] hover:bg-[#292524] rounded-full transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-[#D4A359] shrink-0" />
                  <span>Review This Projection with Mandeep</span>
                  <ArrowRight className="w-4 h-4 text-[#D4A359] shrink-0" />
                </button>

                <p className="text-[11px] text-center text-[#57534E] leading-relaxed">
                  * {defaults.complianceDisclaimer} Assuming annual contributions at year-end and a{' '}
                  {annualReturnRate.toFixed(1)}% annual return.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
