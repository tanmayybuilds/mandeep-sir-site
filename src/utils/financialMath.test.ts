import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCompoundingScenario,
  validateBookingRequest,
  generateIcsCalendarContent,
} from './financialMath.ts';

test('Mandeep signature scenario ($8,000/yr for 10 years at 6%) yields ~$105,500 ($80,000 contributed + $25,500 growth)', () => {
  const { scenario, series } = calculateCompoundingScenario({
    annualContribution: 8000,
    years: 10,
    annualReturnRate: 6.0,
    accountFocus: 'FHSA',
    includeTaxRefundBoost: true,
    marginalTaxRate: 31.0,
  });

  assert.equal(scenario.totalContributed, 80000);
  assert.equal(scenario.projectedTotal, 105500);
  assert.equal(scenario.totalGrowth, 25500);
  assert.equal(scenario.displayProjectedTotal, '~$105,500');
  assert.equal(scenario.displayGrowth, '$25,500');
  assert.equal(series.length, 10);
  assert.equal(series[9].cumulativeContributed, 80000);
  // Exact year 10 balance is ~105,446
  assert.equal(series[9].totalBalance, 105446);
  // FHSA tax refund at 31% on $8,000/yr = $2,480/yr, capped at $40,000 lifetime ($12,400 total saved)
  assert.equal(scenario.estimatedAnnualTaxRefund, 2480);
  assert.equal(scenario.estimatedTotalTaxSaved, 12400);
});

test('TFSA focus has zero upfront tax deduction refund', () => {
  const { scenario } = calculateCompoundingScenario({
    annualContribution: 7000,
    years: 15,
    annualReturnRate: 6.0,
    accountFocus: 'TFSA',
    includeTaxRefundBoost: true,
    marginalTaxRate: 31.0,
  });

  assert.equal(scenario.totalContributed, 105000);
  assert.equal(scenario.estimatedAnnualTaxRefund, 0);
  assert.equal(scenario.estimatedTotalTaxSaved, 0);
  assert.ok(scenario.projectedTotal > 160000);
});

test('validateBookingRequest rejects empty or malformed fields and accepts valid Canadian booking details', () => {
  const invalidResult = validateBookingRequest({
    clientName: 'A',
    clientPhone: '778-123',
    clientEmail: 'not-an-email',
    dateISO: '',
    timeSlot: '',
  });

  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.clientName);
  assert.ok(invalidResult.errors.clientPhone);
  assert.ok(invalidResult.errors.clientEmail);
  assert.ok(invalidResult.errors.dateISO);
  assert.ok(invalidResult.errors.timeSlot);

  const validResult = validateBookingRequest({
    clientName: 'Simran Gill',
    clientPhone: '778-895-6630',
    clientEmail: 'simran@example.ca',
    dateISO: '2026-10-22',
    timeSlot: '11:00 AM PST',
  });

  assert.equal(validResult.valid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('generateIcsCalendarContent produces valid VCALENDAR payload with advisor details', () => {
  const ics = generateIcsCalendarContent({
    focus: 'First Home FHSA Plan',
    dateISO: '2026-10-24',
    dateLabel: 'Sat, Oct 24',
    timeSlot: '01:30 PM PST',
    clientName: 'Alex Chen',
    clientPhone: '604-555-0199',
    clientEmail: 'alex@example.com',
    savingsGoalNote: 'Buying first townhome in Surrey in 2028',
    attachedScenario: null,
  });

  assert.ok(ics.includes('BEGIN:VCALENDAR'));
  assert.ok(ics.includes('SUMMARY:TFSA & FHSA Strategy Call: Alex Chen x Mandeep Gurm'));
  assert.ok(ics.includes('778-895-6630'));
  assert.ok(ics.includes('mknj2224@gmail.com'));
  assert.ok(ics.includes('END:VCALENDAR'));
});
