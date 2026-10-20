import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  Copy,
  Check,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  User,
  MessageSquare,
} from 'lucide-react';
import { MANDEEP_CONFIG } from '../data/mandeepConfig.ts';
import {
  BookingRequest,
  CalculatorScenario,
  ConsultationFocus,
} from '../types/financial.ts';
import {
  BookingValidationErrors,
  formatCurrencyCAD,
  generateIcsCalendarContent,
  validateBookingRequest,
} from '../utils/financialMath.ts';

interface BookingEngineProps {
  selectedFocus: ConsultationFocus;
  onFocusChange: (focus: ConsultationFocus) => void;
  attachedScenario: CalculatorScenario | null;
  onClearScenario: () => void;
  onTriggerToast: (message: string) => void;
}

interface UpcomingDateOption {
  iso: string;
  dayName: string;
  monthDay: string;
  fullLabel: string;
}

function getUpcomingConsultationDates(): UpcomingDateOption[] {
  const dates: UpcomingDateOption[] = [];
  const base = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  let offset = 1;
  while (dates.length < 7 && offset < 20) {
    const d = new Date(base.getTime() + offset * 86400000);
    const dow = d.getDay();
    if (dow !== 0) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const dayName = dayNames[dow];
      const monthDay = `${monthNames[d.getMonth()]} ${d.getDate()}`;
      dates.push({
        iso: `${yyyy}-${mm}-${dd}`,
        dayName,
        monthDay,
        fullLabel: `${dayName}, ${monthDay}, ${yyyy}`,
      });
    }
    offset++;
  }
  return dates;
}

export const BookingEngine: React.FC<BookingEngineProps> = ({
  selectedFocus,
  onFocusChange,
  attachedScenario,
  onClearScenario,
  onTriggerToast,
}) => {
  const upcomingDates = getUpcomingConsultationDates();

  const [dateISO, setDateISO] = useState<string>(upcomingDates[0]?.iso || '2026-10-21');
  const [timeSlot, setTimeSlot] = useState<string>(MANDEEP_CONFIG.bookingTimeSlots[1]);
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [savingsGoalNote, setSavingsGoalNote] = useState<string>('');
  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const [submittedBooking, setSubmittedBooking] = useState<BookingRequest | null>(null);
  const [copiedContact, setCopiedContact] = useState<boolean>(false);

  useEffect(() => {
    if (attachedScenario) {
      setSavingsGoalNote(
        `Reviewing my ${attachedScenario.years}-year ${attachedScenario.accountFocus} projection: $${attachedScenario.annualContribution.toLocaleString()}/yr at ${attachedScenario.annualReturnRate}% (${attachedScenario.displayProjectedTotal}).`
      );
    }
  }, [attachedScenario]);

  const selectedDateObj =
    upcomingDates.find((d) => d.iso === dateISO) || upcomingDates[0];

  const handleCopyContactDetails = async () => {
    const text = `${MANDEEP_CONFIG.advisor.fullName} (${MANDEEP_CONFIG.advisor.instagramHandle}) | Phone: ${MANDEEP_CONFIG.advisor.phoneDisplay} | Email: ${MANDEEP_CONFIG.advisor.email}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // Silent fallback
    }
    setCopiedContact(true);
    onTriggerToast('Copied Mandeep Gurm’s contact details to clipboard.');
    setTimeout(() => setCopiedContact(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingRequest({
      clientName,
      clientPhone,
      clientEmail,
      dateISO,
      timeSlot,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const bookingPayload: BookingRequest = {
      focus: selectedFocus,
      dateISO,
      dateLabel: selectedDateObj.fullLabel,
      timeSlot,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      savingsGoalNote: savingsGoalNote.trim(),
      attachedScenario,
    };

    if (MANDEEP_CONFIG.integrations.bookingWebhookUrl) {
      try {
        await fetch(MANDEEP_CONFIG.integrations.bookingWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingPayload),
        });
      } catch {
        // Proceed with local confirmation
      }
    }

    setSubmittedBooking(bookingPayload);
    onTriggerToast('Strategy call request prepared for Mandeep Gurm.');
  };

  const handleDownloadIcs = () => {
    if (!submittedBooking) return;
    const icsContent = generateIcsCalendarContent(submittedBooking);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Mandeep-Gurm-Strategy-Call-${submittedBooking.dateISO}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onTriggerToast('Downloaded .ics calendar file.');
  };

  const buildMailtoHref = (booking: BookingRequest) => {
    const subject = encodeURIComponent(
      `1-on-1 Strategy Call Request: ${booking.focus} (${booking.clientName})`
    );
    const scenarioLine = booking.attachedScenario
      ? `\nCalculator Projection: $${booking.attachedScenario.annualContribution.toLocaleString()}/yr for ${booking.attachedScenario.years} yrs at ${booking.attachedScenario.annualReturnRate}% -> ${booking.attachedScenario.displayProjectedTotal}`
      : '';
    const body = encodeURIComponent(
      `Hi Mandeep,\n\nI would like to book a 1-on-1 financial strategy session.\n\n` +
        `Focus: ${booking.focus}\n` +
        `Preferred Date: ${booking.dateLabel}\n` +
        `Preferred Time: ${booking.timeSlot}\n` +
        `Name: ${booking.clientName}\n` +
        `Phone: ${booking.clientPhone}\n` +
        `Email: ${booking.clientEmail}` +
        scenarioLine +
        (booking.savingsGoalNote ? `\nNotes: ${booking.savingsGoalNote}` : '') +
        `\n\nThank you!`
    );
    return `mailto:${MANDEEP_CONFIG.advisor.email}?subject=${subject}&body=${body}`;
  };

  const buildSmsHref = (booking: BookingRequest) => {
    const msg = encodeURIComponent(
      `Hi Mandeep (@mannygurm), I'm ${booking.clientName}. I'd like to book a ${booking.focus} call on ${booking.dateLabel} at ${booking.timeSlot}. My email is ${booking.clientEmail}.`
    );
    return `sms:7788956630?body=${msg}`;
  };

  return (
    <section id="book" className="scroll-mt-20 py-20 lg:py-28 px-6 bg-[#0A1628]/[0.02] border-t border-slate-200/80 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto space-y-14 relative z-10">
        {/* Centered Editorial Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            <span>Direct Advisory &amp; Consultation Scheduler</span>
          </div>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#0A1628] leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            Let’s Build Your{' '}
            <span className="italic font-normal gradient-text-teal">
              Financial Plan Together.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Connect directly with <strong className="text-[#0A1628] font-semibold">Mandeep Gurm</strong> or
            reserve your preferred British Columbia (PST) private strategy call below.
          </p>
        </div>

        {/* 2-Column Split: Left Dossier | Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Mandeep Gurm Direct Profile Dossier */}
          <aside className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#0A1628] via-[#0F1D32] to-[#1B2B44] text-white p-8 sm:p-10 flex flex-col justify-between space-y-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Advisor Identity */}
              <div className="space-y-2 border-b border-white/10 pb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  Private Advisory Desk
                </span>
                <h3 className="font-editorial text-3xl font-bold text-white">
                  {MANDEEP_CONFIG.advisor.fullName}
                </h3>
                <p className="text-sm text-slate-300">
                  Instagram:{' '}
                  <a
                    href={MANDEEP_CONFIG.advisor.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    {MANDEEP_CONFIG.advisor.instagramHandle}
                  </a>{' '}
                  · {MANDEEP_CONFIG.advisor.region}
                </p>
              </div>

              {/* Direct Contact Channels */}
              <div className="space-y-3">
                <a
                  href={MANDEEP_CONFIG.advisor.phoneHref}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-500/40 hover:bg-white/[0.08] transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-[#0A1628] transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Direct Phone / SMS (BC)</p>
                      <p className="text-base font-bold font-mono text-white">
                        {MANDEEP_CONFIG.advisor.phoneDisplay}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-teal-400 group-hover:translate-x-0.5 transition-transform">Call →</span>
                </a>

                <a
                  href={MANDEEP_CONFIG.advisor.emailHref}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-500/40 hover:bg-white/[0.08] transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-[#0A1628] transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Direct Email</p>
                      <p className="text-sm font-semibold font-mono text-white">
                        {MANDEEP_CONFIG.advisor.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-teal-400 group-hover:translate-x-0.5 transition-transform">Email →</span>
                </a>

                <a
                  href={MANDEEP_CONFIG.advisor.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-500/40 hover:bg-white/[0.08] transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-[#0A1628] transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Instagram Insights</p>
                      <p className="text-base font-bold text-white">
                        {MANDEEP_CONFIG.advisor.instagramHandle}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-teal-400 group-hover:translate-x-0.5 transition-transform">Follow →</span>
                </a>
              </div>

              {/* 1-Click Copy Contact Details Button */}
              <button
                type="button"
                onClick={handleCopyContactDetails}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-full transition-all cursor-pointer shadow-xs"
              >
                {copiedContact ? (
                  <>
                    <Check className="w-4 h-4 text-teal-400" />
                    <span className="text-teal-300">Copied Contact Info!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-teal-400" />
                    <span>Copy Contact Details (Phone &amp; Email)</span>
                  </>
                )}
              </button>

              {/* Attached Calculator Snapshot if present */}
              {attachedScenario && (
                <div
                  data-testid="attached-scenario-card"
                  className="p-5 rounded-2xl bg-teal-950/40 border border-teal-500/30 space-y-2 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-teal-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Attached Calculator Projection
                    </span>
                    <button
                      type="button"
                      onClick={onClearScenario}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-sm font-mono font-bold text-white">
                    {formatCurrencyCAD(attachedScenario.annualContribution)}/yr ·{' '}
                    {attachedScenario.years} yrs · {attachedScenario.annualReturnRate}% →{' '}
                    <span className="text-teal-400">{attachedScenario.displayProjectedTotal}</span>
                  </p>
                  <p className="text-xs text-slate-300">
                    {formatCurrencyCAD(attachedScenario.totalContributed)} principal +{' '}
                    {attachedScenario.displayGrowth} tax-free growth
                  </p>
                </div>
              )}
            </div>

            {/* Brand Promise Footer inside Contact Card */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3 relative z-10">
              <div className="inline-flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-teal-400 flex items-center justify-center text-[#0A1628]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-editorial text-lg font-bold text-white">
                  {MANDEEP_CONFIG.advisor.brandPromise}
                </span>
              </div>
              <span className="font-editorial italic text-sm text-teal-300">
                {MANDEEP_CONFIG.advisor.secondaryTagline}
              </span>
            </div>
          </aside>

          {/* Right Column: Interactive Consultation Booking Form or Confirmation View */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-sm">
            {submittedBooking ? (
              <div
                data-testid="booking-confirmation"
                className="h-full flex flex-col justify-between space-y-8"
              >
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-semibold uppercase tracking-wider text-teal-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>Consultation Request Confirmed</span>
                  </div>

                  <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0A1628]">
                    Thank you, {submittedBooking.clientName}.
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Your 1-on-1 <strong className="text-[#0A1628] font-semibold">{submittedBooking.focus}</strong>{' '}
                    session has been pre-scheduled for{' '}
                    <strong className="font-mono text-[#0A1628]">
                      {submittedBooking.dateLabel} at {submittedBooking.timeSlot}
                    </strong>
                    . Add this session directly to your calendar or send an immediate confirmation message
                    to Mandeep below.
                  </p>

                  {/* Summary Box */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Advisor:</span>
                      <span className="font-semibold text-[#0A1628]">
                        Mandeep Gurm (@mannygurm · 778-895-6630)
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Strategy Topic:</span>
                      <span className="font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 text-xs">
                        {submittedBooking.focus}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Date &amp; Time (PST):</span>
                      <span className="font-mono font-semibold text-[#0A1628]">
                        {submittedBooking.dateLabel} · {submittedBooking.timeSlot}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-500">Client Details:</span>
                      <span className="font-mono text-[#0A1628]">
                        {submittedBooking.clientPhone} · {submittedBooking.clientEmail}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Download .ics, Send Pre-Filled Email, Send Pre-Filled SMS */}
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleDownloadIcs}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full transition-all cursor-pointer shadow-sm hover-lift"
                    >
                      <Download className="w-4 h-4 shrink-0" />
                      <span>Download .ics Calendar File</span>
                    </button>

                    <a
                      href={buildMailtoHref(submittedBooking)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#0A1628] bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-full transition-colors"
                    >
                      <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>Send Email Confirmation</span>
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <a
                      href={buildSmsHref(submittedBooking)}
                      className="text-xs sm:text-sm font-semibold text-teal-600 hover:text-teal-700 hover:underline flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Text Confirmation via SMS to 778-895-6630 →</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmittedBooking(null)}
                      className="text-xs text-slate-500 hover:text-[#0A1628] underline cursor-pointer"
                    >
                      Modify Booking Details
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-7">
                {/* Step 1: Select Consultation Focus */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Step 1: Select Your Strategy Focus
                    </label>
                    <span className="text-[11px] text-teal-600 font-semibold">Complimentary 1-on-1</span>
                  </div>
                  <div
                    role="group"
                    aria-label="Select Consultation Focus"
                    className="flex flex-wrap gap-2"
                  >
                    {MANDEEP_CONFIG.consultationFocusOptions.map((option) => {
                      const active = selectedFocus === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => onFocusChange(option)}
                          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-[#0A1628] text-white border-[#0A1628] shadow-xs'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Select Preferred Date & PST Time Slot */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Step 2: Select Preferred Date &amp; Time (PST / BC)
                    </label>
                    <span className="text-xs font-mono text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                      {selectedDateObj.dayName}, {selectedDateObj.monthDay} · {timeSlot}
                    </span>
                  </div>

                  {/* Date Picker Strip */}
                  <div
                    role="group"
                    aria-label="Select Consultation Date"
                    className="grid grid-cols-3 sm:grid-cols-7 gap-2"
                  >
                    {upcomingDates.map((d) => {
                      const isSelected = d.iso === dateISO;
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          onClick={() => setDateISO(d.iso)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0A1628] text-white border-[#0A1628] shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-white'
                          }`}
                        >
                          <span className={`block text-[11px] ${isSelected ? 'text-teal-300 font-medium' : 'text-slate-400'}`}>
                            {d.dayName}
                          </span>
                          <span className="block text-xs font-bold font-mono mt-0.5">
                            {d.monthDay}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Time Slot Buttons */}
                  <div
                    role="group"
                    aria-label="Select Consultation Time Slot"
                    className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                  >
                    {MANDEEP_CONFIG.bookingTimeSlots.map((slot) => {
                      const isSelected = slot === timeSlot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                            isSelected
                              ? 'bg-[#0A1628] text-white border-[#0A1628] shadow-xs'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <Clock className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-teal-400' : 'text-slate-400'}`} />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Client Contact Details */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Step 3: Your Contact Information
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="booking-client-name"
                        className="block text-xs font-semibold text-[#0A1628] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="booking-client-name"
                        type="text"
                        placeholder="e.g. Navneet Sidhu"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 text-[#0A1628] focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                      />
                      {errors.clientName && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.clientName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-client-phone"
                        className="block text-xs font-semibold text-[#0A1628] mb-1.5"
                      >
                        Phone Number (Direct / SMS) *
                      </label>
                      <input
                        id="booking-client-phone"
                        type="tel"
                        placeholder="e.g. 778-555-0142"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm font-mono rounded-xl bg-slate-50 border border-slate-200 text-[#0A1628] focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                      />
                      {errors.clientPhone && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.clientPhone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-client-email"
                      className="block text-xs font-semibold text-[#0A1628] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="booking-client-email"
                      type="email"
                      placeholder="you@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 text-[#0A1628] focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                    {errors.clientEmail && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.clientEmail}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-goal-note"
                      className="block text-xs font-semibold text-[#0A1628] mb-1.5"
                    >
                      Primary Financial Goal or Questions (Optional)
                    </label>
                    <textarea
                      id="booking-goal-note"
                      rows={2}
                      placeholder="e.g. Planning to buy our first home in BC within 3 years and want to maximize our FHSA & TFSA room..."
                      value={savingsGoalNote}
                      onChange={(e) => setSavingsGoalNote(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 text-[#0A1628] focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm sm:text-base font-semibold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full shadow-lg shadow-teal-500/25 transition-all duration-200 cursor-pointer hover-lift"
                >
                  <Calendar className="w-4 h-4 text-[#0A1628] shrink-0" />
                  <span>Confirm 1-on-1 Strategy Session with Mandeep</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
