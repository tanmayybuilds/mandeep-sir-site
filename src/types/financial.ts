export type AccountType = 'TFSA' | 'FHSA' | 'BOTH';

export interface AccountDetails {
  id: 'TFSA' | 'FHSA';
  shortName: string;
  fullName: string;
  coreBenefit: string;
  themeColor: 'emerald' | 'cobalt';
  accentHex: string;
  annualLimit2026: string;
  lifetimeLimit: string;
  taxDeduction: string;
  features: string[];
  idealFor: string;
}

export interface ComparisonRow {
  id: string;
  feature: string;
  tfsaValue: string;
  fhsaValue: string;
  highlightNote: string;
  winner: 'TFSA' | 'FHSA' | 'TIE';
}

export interface StrategyStep {
  stepNumber: number;
  title: string;
  description: string;
  actionTip: string;
  accountTag: 'FHSA' | 'TFSA' | 'TAX' | 'CRA';
}

export interface YearlyProjectionPoint {
  year: number;
  annualContribution: number;
  cumulativeContributed: number;
  investmentGrowth: number;
  totalBalance: number;
}

export interface CalculatorScenario {
  annualContribution: number;
  years: number;
  annualReturnRate: number;
  accountFocus: AccountType;
  includeTaxRefundBoost: boolean;
  marginalTaxRate: number;
  totalContributed: number;
  totalGrowth: number;
  projectedTotal: number;
  displayProjectedTotal: string;
  displayGrowth: string;
  estimatedAnnualTaxRefund: number;
  estimatedTotalTaxSaved: number;
}

export type ConsultationFocus =
  | 'First Home FHSA Plan'
  | 'TFSA Wealth Growth'
  | 'Combined FHSA + TFSA Strategy'
  | 'Tax Refund Optimization'
  | 'General Financial Review';

export interface BookingRequest {
  focus: ConsultationFocus;
  dateISO: string;
  dateLabel: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  savingsGoalNote: string;
  attachedScenario: CalculatorScenario | null;
}

export type ClientPriorityProfile = 'first-home' | 'flexible-wealth' | 'maximize-both';

export interface PriorityRecommendation {
  id: ClientPriorityProfile;
  label: string;
  subtitle: string;
  primaryAccount: string;
  allocationSplit: string;
  rationale: string;
  nextAction: string;
}
