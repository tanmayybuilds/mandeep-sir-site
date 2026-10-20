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
      className="scroll-mt-20 py-20 lg:py-28 px-6 bg-[#F0F4F8] border-b border-[#D5DCE6]"
    >
      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-widest text-[#2DD4BF]">
              Side-by-Side Rule Breakdown · 2026 CRA Limits
            </p>
            <h2
              className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              TFSA vs. FHSA{' '}
              <span className="italic font-normal gradient-text-teal">at a Glance.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#4A6A8A] leading-relaxed">
              Compare 2026 annual contribution limits, upfront tax deductions, tax-free growth, and
              withdrawal rules side by side.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            role="group"
            aria-label="Filter comparison view"
            className="flex items-center gap-1 p-1.5 bg-white rounded-full border border-[#D5DCE6] self-start lg:self-auto"
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
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  accountFilter === tab.id
                    ? 'bg-gradient-to-r from-[#0A1628] to-[#1B2B44] text-white shadow-md'
                    : 'text-[#4A6A8A] hover:text-[#0A1628]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block rounded-3xl bg-white border border-[#D5DCE6] overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#D5DCE6] bg-[#F0F4F8]">
                <th className="py-5 px-8 text-xs font-bold tracking-wider text-[#4A6A8A] w-1/3">
                  Feature
                </th>
                <th
                  className={`py-5 px-8 font-editorial text-xl font-bold text-[#0A1628] w-1/3 transition-opacity ${
                    accountFilter === 'FHSA' ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  TFSA{' '}
                  <span className="block font-sans text-xs font-normal text-[#4A6A8A]">
                    Tax-Free Savings Account
                  </span>
                </th>
                <th
                  className={`py-5 px-8 font-editorial text-xl font-bold text-[#0A1628] w-1/3 transition-opacity ${
                    accountFilter === 'TFSA' ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  FHSA{' '}
                  <span className="block font-sans text-xs font-normal text-[#2DD4BF]">
                    First Home Savings Account
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D5DCE6] text-sm sm:text-base">
              {rows.map((row) => {
                const isSelected = row.id === selectedRowId;
                const isNumericRow = row.id === 'limit-2026';
                return (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedRowId(row.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#F0F4F8]' : 'hover:bg-[#F0F4F8]/60'
                    }`}
                  >
                    <td className="py-5 px-8 font-semibold text-[#0A1628]">{row.feature}</td>
                    <td
                      className={`py-5 px-8 tabular-nums font-medium text-[#0A1628] transition-opacity ${
                        isNumericRow ? 'font-mono-tabular font-bold text-lg' : ''
                      } ${accountFilter === 'FHSA' ? 'opacity-40' : 'opacity-100'}`}
                    >
                      {row.tfsaValue}
                    </td>
                    <td
                      className={`py-5 px-8 tabular-nums font-semibold text-[#2DD4BF] transition-opacity ${
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

          {/* Footer */}
          <div className="px-8 py-4 bg-[#F0F4F8] border-t border-[#D5DCE6] flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            <div>
              <span className="font-semibold text-[#0A1628]">
                Mandeep's Advisory Note on "{activeRow.feature}":
              </span>{' '}
              <span className="text-[#4A6A8A]">{activeRow.highlightNote}</span>
            </div>
            <span className="text-xs text-[#4A6A8A]">Select any row to inspect</span>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-4">
          {rows.map((row) => {
            const isNumericRow = row.id === 'limit-2026';
            return (
              <div
                key={row.id}
                className="rounded-2xl bg-white border border-[#D5DCE6] p-5 space-y-3"
              >
                <h3 className="font-editorial text-lg font-bold text-[#0A1628]">{row.feature}</h3>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div
                    className={`p-3 rounded-xl bg-[#F0F4F8] border border-[#D5DCE6] ${
                      accountFilter === 'FHSA' ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    <p className="text-xs font-semibold text-[#4A6A8A]">TFSA</p>
                    <p
                      className={`mt-1 text-sm tabular-nums font-semibold text-[#0A1628] ${
                        isNumericRow ? 'font-mono-tabular' : ''
                      }`}
                    >
                      {row.tfsaValue}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl bg-[#F0F4F8] border border-[#D5DCE6] ${
                      accountFilter === 'TFSA' ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    <p className="text-xs font-semibold text-[#2DD4BF]">FHSA</p>
                    <p
                      className={`mt-1 text-sm tabular-nums font-semibold text-[#0A1628] ${
                        isNumericRow ? 'font-mono-tabular' : ''
                      }`}
                    >
                      {row.fhsaValue}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#4A6A8A] pt-1">{row.highlightNote}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
