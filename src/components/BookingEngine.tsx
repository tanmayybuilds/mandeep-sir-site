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
  MessageSquare,
  ArrowRight,
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
  const [timeSlot, setTimeSlot] = useState<string>(MANDEEP_CONFIG.bookingTimeSlots[1] || '11:00 AM PST');
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
        // Fallback gracefully
      }
    }

    setSubmittedBooking(bookingPayload);
    onTriggerToast(`Session requested for ${selectedDateObj.dayName}, ${selectedDateObj.monthDay}!`);
  };

  const handleDownloadIcs = () => {
    if (!submittedBooking) return;
    const icsContent = generateIcsCalendarContent(submittedBooking);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Mandeep-Gurm-Strategy-${submittedBooking.dateISO}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onTriggerToast('Downloaded .ics calendar invite.');
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
    <section
      id="book"
      className="scroll-mt-16 py-14 lg:py-20 px-6 bg-[#0A1628]/[0.02] border-t border-slate-200/80 relative overflow-hidden"
    >
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Compact Editorial Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/25 text-xs font-semibold uppercase tracking-wider text-teal-800">
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            <span>Direct Advisory Desk · British Columbia</span>
          </div>
          <h2
            className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#0A1628]"
            style={{ textWrap: 'balance' }}
          >
            Book Your 1-on-1 Strategy Call.{' '}
            <span className="font-instrument italic font-normal gradient-text-teal block sm:inline">
              Fast, Private &amp; Zero Pressure.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Choose a convenient PST slot below or reach out directly to{' '}
            <strong className="text-[#0A1628] font-semibold">{MANDEEP_CONFIG.advisor.fullName}</strong>.
          </p>
        </div>

        {/* Quick Instant-Contact Bar (One-click contact chips) */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-semibold">
            {/* Direct Phone */}
            <a
              href={MANDEEP_CONFIG.advisor.phoneHref}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-800 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span>{MANDEEP_CONFIG.advisor.phoneDisplay}</span>
            </a>

            {/* Direct Email */}
            <a
              href={MANDEEP_CONFIG.advisor.emailHref}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-800 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-teal-600" />
              <span>{MANDEEP_CONFIG.advisor.email}</span>
            </a>

            {/* Instagram */}
            <a
              href={MANDEEP_CONFIG.advisor.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
              <span>{MANDEEP_CONFIG.advisor.instagramHandle}</span>
            </a>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopyContactDetails}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 cursor-pointer"
          >
            {copiedContact ? (
              <>
                <Check className="w-3.5 h-3.5 text-teal-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-teal-600" />
                <span>Copy Details</span>
              </>
            )}
          </button>
        </div>

        {/* Streamlined Booking Card */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          {submittedBooking ? (
            <div data-testid="booking-confirmation" className="space-y-6">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-800 w-fit">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Strategy Request Reserved</span>
              </div>

              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A1628]">
                  Thank you, {submittedBooking.clientName}.
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Your 1-on-1 session for{' '}
                  <strong className="text-[#0A1628] font-semibold">{submittedBooking.focus}</strong> has
                  been reserved for{' '}
                  <strong className="font-mono text-[#0A1628]">
                    {submittedBooking.dateLabel} at {submittedBooking.timeSlot}
                  </strong>
                  .
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadIcs}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full transition-all cursor-pointer shadow-xs hover-lift"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Download .ics Calendar Invite</span>
                </button>

                <a
                  href={buildMailtoHref(submittedBooking)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#0A1628] bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-full transition-colors"
                >
                  <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Send Confirmation Email</span>
                </a>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <a
                  href={buildSmsHref(submittedBooking)}
                  className="text-teal-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                  <span>Send direct SMS to 778-895-6630 →</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSubmittedBooking(null)}
                  className="text-slate-500 hover:text-[#0A1628] underline cursor-pointer"
                >
                  Modify Details
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* 1. Select Focus Topic */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Select Strategy Topic
                </label>
                <div className="flex flex-wrap gap-2">
                  {MANDEEP_CONFIG.consultationFocusOptions.map((option) => {
                    const active = selectedFocus === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => onFocusChange(option)}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#0A1628] text-white border-[#0A1628] shadow-xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Select Date & Time (Clean 2-Column Row + Quick Chips) */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Preferred Date &amp; Time (PST / BC)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Date Dropdown */}
                  <div>
                    <select
                      value={dateISO}
                      onChange={(e) => setDateISO(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-slate-50 border border-slate-200 text-[#0A1628] focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
                    >
                      {upcomingDates.map((d) => (
                        <option key={d.iso} value={d.iso}>
                          {d.dayName}, {d.monthDay}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Time Slot Dropdown */}
                  <div>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold font-mono rounded-xl bg-slate-50 border border-slate-200 text-[#0A1628] focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
                    >
                      {MANDEEP_CONFIG.bookingTimeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quick Next-Slot Fast Chips */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 pt-1">
                  <span className="text-[11px] font-medium text-slate-400">Quick Picks:</span>
                  {upcomingDates.slice(0, 3).map((d, idx) => {
                    const sampleSlot = idx === 0 ? '11:00 AM PST' : idx === 1 ? '01:30 PM PST' : '03:30 PM PST';
                    const isCurrent = dateISO === d.iso && timeSlot === sampleSlot;
                    return (
                      <button
                        key={d.iso}
                        type="button"
                        onClick={() => {
                          setDateISO(d.iso);
                          setTimeSlot(sampleSlot);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                          isCurrent
                            ? 'bg-teal-50 border-teal-300 text-teal-800 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {d.dayName} {sampleSlot.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Client Information (Compact 2-Column Grid) */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Your Contact Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="booking-client-name"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      id="booking-client-name"
                      type="text"
                      placeholder="e.g. Navneet Sidhu"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 text-[#0A1628] focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
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
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      Phone Number (Direct / SMS) *
                    </label>
                    <input
                      id="booking-client-phone"
                      type="tel"
                      placeholder="e.g. 778-555-0142"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm font-mono rounded-xl bg-slate-50 border border-slate-200 text-[#0A1628] focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
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
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="booking-client-email"
                    type="email"
                    placeholder="you@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 text-[#0A1628] focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                  {errors.clientEmail && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.clientEmail}</span>
                    </p>
                  )}
                </div>

                {/* Attached Calculator Snapshot if present */}
                {attachedScenario && (
                  <div
                    data-testid="attached-scenario-card"
                    className="p-3 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-teal-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                      Attached: {formatCurrencyCAD(attachedScenario.annualContribution)}/yr {attachedScenario.years}yr ({attachedScenario.displayProjectedTotal})
                    </span>
                    <button
                      type="button"
                      onClick={onClearScenario}
                      className="text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-[#0A1628] bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-full shadow-md shadow-teal-500/20 transition-all cursor-pointer hover-lift"
              >
                <span>Confirm 1-on-1 Strategy Session with Mandeep</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 text-center">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  Complimentary 30-Min Call
                </span>
                <span>·</span>
                <span>Zero Sales Pressure</span>
                <span>·</span>
                <span>British Columbia Fiduciary</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
