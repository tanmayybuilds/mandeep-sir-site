import React, { useState } from 'react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';

export const ComparisonMatrix: React.FC = () => {
  const [selectedRowId, setSelectedRowId] = useState<string>('limit-2026');
  const [accountFilter, setAccountFilter] = useState<'ALL' | 'TFSA' | 'FHSA'>('ALL');

  const rows = MANDEEP_CONFIG.comparisonMatrix;
  const activeRow = rows.find((r) => r.id === selectedRowId) || rows[0];

  return (
    <section
      id="comparison"
      className="scroll-mt-20 py-20 lg:py-28 px-6 bg-[#FAF8F5] border-b border-[#E6E1DA]"
    >
      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Centered Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9A6B26]">
              Side-by-Side Rule Breakdown · 2026 CRA Limits
            </p>
            <h2
              className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#141413] leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              TFSA vs. FHSA{' '}
              <span className="italic font-normal text-[#9A6B26]">at a Glance.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
              Compare 2026 annual contribution limits, upfront tax deductions, tax-free growth, and
              withdrawal rules side by side.
            </p>
          </div>

          {/* Interactive Column Highlight Filter */}
          <div
            role="group"
            aria-label="Filter comparison view"
            className="flex items-center gap-1 p-1.5 bg-white rounded-full border border-[#E6E1DA] self-start lg:self-auto"
          >
            {(
              [
                { id: 'ALL', label: 'Compare Both' },
                { id: 'TFSA', label: 'Focus TFSA' },
                { id: 'FHSA', label: 'Focus FHSA' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setAccountFilter(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  accountFilter === tab.id
                    ? 'bg-[#141413] text-[#FAF8F5]'
                    : 'text-[#57534E] hover:text-[#141413]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop & Tablet Institutional Table */}
        <div className="hidden sm:block rounded-3xl bg-white border border-[#E6E1DA] overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E6E1DA] bg-[#FAF8F5]">
                <th className="py-5 px-8 text-xs font-bold uppercase tracking-wider text-[#57534E] w-1/3">
                  Feature
                </th>
                <th
                  className={`py-5 px-8 font-editorial text-xl font-bold text-[#141413] w-1/3 transition-opacity ${
                    accountFilter === 'FHSA' ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  TFSA{' '}
                  <span className="block font-sans text-xs font-normal text-[#57534E]">
                    Tax-Free Savings Account
                  </span>
                </th>
                <th
                  className={`py-5 px-8 font-editorial text-xl font-bold text-[#141413] w-1/3 transition-opacity ${
                    accountFilter === 'TFSA' ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  FHSA{' '}
                  <span className="block font-sans text-xs font-normal text-[#9A6B26]">
                    First Home Savings Account
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E1DA] text-sm sm:text-base">
              {rows.map((row) => {
                const isSelected = row.id === selectedRowId;
                const isNumericRow = row.id === 'limit-2026';
                return (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedRowId(row.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#FAF8F5]' : 'hover:bg-[#FAF8F5]/60'
                    }`}
                  >
                    <td className="py-5 px-8 font-semibold text-[#141413]">{row.feature}</td>
                    <td
                      className={`py-5 px-8 tabular-nums font-medium text-[#141413] transition-opacity ${
                        isNumericRow ? 'font-mono-tabular font-bold text-lg' : ''
                      } ${accountFilter === 'FHSA' ? 'opacity-40' : 'opacity-100'}`}
                    >
                      {row.tfsaValue}
                    </td>
                    <td
                      className={`py-5 px-8 tabular-nums font-semibold text-[#9A6B26] transition-opacity ${
                        isNumericRow ? 'font-mono-tabular font-bold text-lg' : ''
                      } ${accountFilter === 'TFSA' ? 'opacity-40' : 'opacity-100'}`}
                    >
                      {row.fhsaValue}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Advisor Takeaway Footer Bar */}
          <div className="px-8 py-4 bg-[#FAF8F5] border-t border-[#E6E1DA] flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            <div>
              <span className="font-semibold text-[#141413]">
                Mandeep’s Advisory Note on “{activeRow.feature}”:
              </span>{' '}
              <span className="text-[#57534E]">{activeRow.highlightNote}</span>
            </div>
            <span className="text-xs text-[#57534E]">Select any row to inspect</span>
          </div>
        </div>

        {/* Mobile Stacked Cards */}
        <div className="sm:hidden space-y-4">
          {rows.map((row) => {
            const isNumericRow = row.id === 'limit-2026';
            return (
              <div
                key={row.id}
                className="rounded-2xl bg-white border border-[#E6E1DA] p-5 space-y-3"
              >
                <h3 className="font-editorial text-lg font-bold text-[#141413]">{row.feature}</h3>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div
                    className={`p-3 rounded-xl bg-[#FAF8F5] border border-[#E6E1DA] ${
                      accountFilter === 'FHSA' ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    <p className="text-xs font-semibold text-[#57534E]">TFSA</p>
                    <p
                      className={`mt-1 text-sm tabular-nums font-semibold text-[#141413] ${
                        isNumericRow ? 'font-mono-tabular' : ''
                      }`}
                    >
                      {row.tfsaValue}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl bg-[#FAF8F5] border border-[#E6E1DA] ${
                      accountFilter === 'TFSA' ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    <p className="text-xs font-semibold text-[#9A6B26]">FHSA</p>
                    <p
                      className={`mt-1 text-sm tabular-nums font-semibold text-[#141413] ${
                        isNumericRow ? 'font-mono-tabular' : ''
                      }`}
                    >
                      {row.fhsaValue}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#57534E] pt-1">{row.highlightNote}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
