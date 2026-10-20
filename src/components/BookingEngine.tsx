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
    <section id="book" className="scroll-mt-20 py-20 lg:py-28 px-6 bg-[#FAF8F5]">
      <div className="max-w-[1280px] mx-auto space-y-14">
        {/* Centered Editorial Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9A6B26]">
            Direct Advisory &amp; 1-on-1 Consultation Scheduler
          </p>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#141413] leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            Let’s Build Your{' '}
            <span className="italic font-normal text-[#9A6B26]">
              Financial Plan Together.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            Connect directly with <strong className="text-[#141413]">Mandeep Gurm</strong> or
            reserve your preferred British Columbia (PST) strategy call slot below.
          </p>
        </div>

        {/* 2-Column Split: Left Executive Contact Dossier | Right Multi-Step Scheduler */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Mandeep Gurm Direct Contact Profile */}
          <aside className="lg:col-span-5 rounded-3xl bg-[#141413] text-[#FAF8F5] p-8 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Advisor Identity */}
              <div className="space-y-2 border-b border-white/12 pb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#D4A359]">
                  Private Wealth &amp; Registered Account Strategy
                </p>
                <h3 className="font-editorial text-3xl font-bold text-white">
                  {MANDEEP_CONFIG.advisor.fullName}
                </h3>
                <p className="text-sm text-[#FAF8F5]/75">
                  Instagram:{' '}
                  <a
                    href={MANDEEP_CONFIG.advisor.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#D4A359] hover:underline"
                  >
                    {MANDEEP_CONFIG.advisor.instagramHandle}
                  </a>{' '}
                  · {MANDEEP_CONFIG.advisor.region}
                </p>
              </div>

              {/* Direct Contact Channels */}
              <div className="space-y-3.5">
                <a
                  href={MANDEEP_CONFIG.advisor.phoneHref}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#1C1B18] border border-white/10 hover:border-[#D4A359]/50 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <Phone className="w-5 h-5 text-[#D4A359] shrink-0" />
                    <div>
                      <p className="text-xs text-[#FAF8F5]/60">Direct Phone / SMS (BC)</p>
                      <p className="text-base sm:text-lg font-bold font-mono-tabular text-white">
                        {MANDEEP_CONFIG.advisor.phoneDisplay}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#D4A359]">Call →</span>
                </a>

                <a
                  href={MANDEEP_CONFIG.advisor.emailHref}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#1C1B18] border border-white/10 hover:border-[#D4A359]/50 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <Mail className="w-5 h-5 text-[#D4A359] shrink-0" />
                    <div>
                      <p className="text-xs text-[#FAF8F5]/60">Direct Email</p>
                      <p className="text-sm sm:text-base font-bold font-mono-tabular text-white">
                        {MANDEEP_CONFIG.advisor.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#D4A359]">Email →</span>
                </a>

                <a
                  href={MANDEEP_CONFIG.advisor.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#1C1B18] border border-white/10 hover:border-white/30 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <ExternalLink className="w-5 h-5 text-[#D4A359] shrink-0" />
                    <div>
                      <p className="text-xs text-[#FAF8F5]/60">Instagram Insights</p>
                      <p className="text-base font-bold text-white">
                        {MANDEEP_CONFIG.advisor.instagramHandle}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#D4A359]">Follow →</span>
                </a>
              </div>

              {/* 1-Click Copy Contact Details Button */}
              <button
                type="button"
                onClick={handleCopyContactDetails}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-white bg-white/8 hover:bg-white/14 border border-white/15 rounded-full transition-colors cursor-pointer"
              >
                {copiedContact ? (
                  <>
                    <Check className="w-4 h-4 text-[#34D399]" />
                    <span>Copied Contact Info!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#D4A359]" />
                    <span>Copy Contact Details (Phone &amp; Email)</span>
                  </>
                )}
              </button>

              {/* Attached Calculator Snapshot if present */}
              {attachedScenario && (
                <div
                  data-testid="attached-scenario-card"
                  className="p-4 rounded-2xl bg-[#1C1B18] border border-[#D4A359]/40 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#D4A359]">
                      Attached Calculator Projection
                    </span>
                    <button
                      type="button"
                      onClick={onClearScenario}
                      className="text-xs text-[#FAF8F5]/60 hover:text-white underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-sm font-mono-tabular font-bold text-white">
                    {formatCurrencyCAD(attachedScenario.annualContribution)}/yr ·{' '}
                    {attachedScenario.years} yrs · {attachedScenario.annualReturnRate}% →{' '}
                    <span className="text-[#D4A359]">{attachedScenario.displayProjectedTotal}</span>
                  </p>
                  <p className="text-xs text-[#FAF8F5]/70">
                    {formatCurrencyCAD(attachedScenario.totalContributed)} principal +{' '}
                    {attachedScenario.displayGrowth} tax-free growth
                  </p>
                </div>
              )}
            </div>

            {/* Brand Promise Footer inside Contact Card */}
            <div className="pt-6 border-t border-white/12 flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2.5">
                <svg
                  className="w-5 h-5 text-[#D4A359] shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2L13.8 7.2L17.5 5.5L16.2 9.8L21 10.5L17.5 13.8L19.2 16.5L14.5 16.2L13 22H11L9.5 16.2L4.8 16.5L6.5 13.8L3 10.5L7.8 9.8L6.5 5.5L10.2 7.2L12 2Z" />
                </svg>
                <span className="font-editorial text-lg font-bold text-white">
                  {MANDEEP_CONFIG.advisor.brandPromise}
                </span>
              </div>
              <span className="font-editorial italic text-sm text-[#D4A359]">
                {MANDEEP_CONFIG.advisor.secondaryTagline}
              </span>
            </div>
          </aside>

          {/* Right Column: Interactive Consultation Booking Form or Confirmation View */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-[#E6E1DA] p-8 sm:p-10 shadow-xs">
            {submittedBooking ? (
              <div
                data-testid="booking-confirmation"
                className="h-full flex flex-col justify-between space-y-8"
              >
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#15803D]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Consultation Request Ready</span>
                  </div>

                  <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#141413]">
                    Thank you, {submittedBooking.clientName}.
                  </h3>

                  <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                    Your 1-on-1 <strong className="text-[#141413]">{submittedBooking.focus}</strong>{' '}
                    session is scheduled for{' '}
                    <strong className="font-mono-tabular text-[#141413]">
                      {submittedBooking.dateLabel} at {submittedBooking.timeSlot}
                    </strong>
                    . Add this appointment to your calendar or send an instant confirmation message
                    to Mandeep below.
                  </p>

                  {/* Summary Box */}
                  <div className="rounded-2xl bg-[#FAF8F5] border border-[#E6E1DA] p-5 space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#57534E]">Advisor:</span>
                      <span className="font-semibold text-[#141413]">
                        Mandeep Gurm (@mannygurm · 778-895-6630)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#57534E]">Topic:</span>
                      <span className="font-semibold text-[#141413]">{submittedBooking.focus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#57534E]">Date &amp; Time:</span>
                      <span className="font-mono-tabular font-semibold text-[#15803D]">
                        {submittedBooking.dateLabel} · {submittedBooking.timeSlot}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#57534E]">Client Contact:</span>
                      <span className="font-mono-tabular text-[#141413]">
                        {submittedBooking.clientPhone} · {submittedBooking.clientEmail}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Download .ics, Send Pre-Filled Email, Send Pre-Filled SMS */}
                <div className="space-y-3 pt-4 border-t border-[#E6E1DA]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleDownloadIcs}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#FAF8F5] bg-[#141413] hover:bg-[#292524] rounded-full transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#D4A359]" />
                      <span>Download .ics Calendar File</span>
                    </button>

                    <a
                      href={buildMailtoHref(submittedBooking)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#141413] bg-[#F3EFEA] hover:bg-[#E6E1DA] border border-[#E6E1DA] rounded-full transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[#9A6B26]" />
                      <span>Send Email Confirmation</span>
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <a
                      href={buildSmsHref(submittedBooking)}
                      className="text-xs sm:text-sm font-semibold text-[#9A6B26] hover:underline"
                    >
                      Text Confirmation via SMS to 778-895-6630 →
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmittedBooking(null)}
                      className="text-xs text-[#57534E] hover:text-[#141413] underline cursor-pointer"
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#57534E]">
                    Step 1: Select Your Strategy Focus
                  </label>
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
                          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-colors cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-[#141413] text-[#FAF8F5] border-[#141413]'
                              : 'bg-[#FAF8F5] text-[#57534E] border-[#E6E1DA] hover:border-[#141413]'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Select Preferred Date & PST Time Slot */}
                <div className="space-y-4 pt-3 border-t border-[#E6E1DA]">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#57534E]">
                      Step 2: Select Preferred Date &amp; Time (PST / BC)
                    </label>
                    <span className="text-xs font-mono-tabular text-[#9A6B26] font-semibold">
                      {selectedDateObj.fullLabel} · {timeSlot}
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
                          className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#141413] text-[#FAF8F5] border-[#141413]'
                              : 'bg-[#FAF8F5] text-[#141413] border-[#E6E1DA] hover:border-[#9A6B26]'
                          }`}
                        >
                          <span className="block text-[11px] opacity-75">{d.dayName}</span>
                          <span className="block text-xs font-bold font-mono-tabular mt-0.5">
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
                          className={`py-2.5 px-3 rounded-xl border text-xs font-mono-tabular font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                            isSelected
                              ? 'bg-[#141413] text-[#FAF8F5] border-[#141413]'
                              : 'bg-white text-[#57534E] border-[#E6E1DA] hover:border-[#141413]'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 shrink-0 opacity-75" />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Client Contact Details */}
                <div className="space-y-4 pt-3 border-t border-[#E6E1DA]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#57534E]">
                    Step 3: Your Contact Information
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="booking-client-name"
                        className="block text-xs font-semibold text-[#141413] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="booking-client-name"
                        type="text"
                        placeholder="e.g. Navneet Sidhu"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#FAF8F5] border border-[#E6E1DA] text-[#141413] focus:outline-none focus:border-[#141413]"
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
                        className="block text-xs font-semibold text-[#141413] mb-1.5"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="booking-client-phone"
                        type="tel"
                        placeholder="e.g. 778-555-0142"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm font-mono-tabular rounded-xl bg-[#FAF8F5] border border-[#E6E1DA] text-[#141413] focus:outline-none focus:border-[#141413]"
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
                      className="block text-xs font-semibold text-[#141413] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="booking-client-email"
                      type="email"
                      placeholder="you@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#FAF8F5] border border-[#E6E1DA] text-[#141413] focus:outline-none focus:border-[#141413]"
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
                      className="block text-xs font-semibold text-[#141413] mb-1.5"
                    >
                      Primary Financial Goal or Questions (Optional)
                    </label>
                    <textarea
                      id="booking-goal-note"
                      rows={2}
                      placeholder="e.g. Planning to buy our first home in BC within 3 years and want to maximize our FHSA & TFSA room..."
                      value={savingsGoalNote}
                      onChange={(e) => setSavingsGoalNote(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#FAF8F5] border border-[#E6E1DA] text-[#141413] focus:outline-none focus:border-[#141413]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm sm:text-base font-semibold text-[#FAF8F5] bg-[#141413] hover:bg-[#292524] rounded-full transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#D4A359] shrink-0" />
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
