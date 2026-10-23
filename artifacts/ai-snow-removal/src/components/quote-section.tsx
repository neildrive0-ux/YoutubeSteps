import { type ChangeEvent, type FormEvent, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { createQuoteRequest } from '@workspace/api-client-react';
import { LoaderCircle, Send, X } from 'lucide-react';
import { SITE, type ServiceKind } from '@/site';

const OPTIONS = {
  snow: [
    { value: 'driveway', label: 'Driveway' },
    { value: 'sidewalk', label: 'Sidewalk' },
    { value: 'staircase', label: 'Steps / Staircase' },
    { value: 'back-alley-parking-pad', label: 'Back-Alley Parking Pad' },
    { value: 'ice-control', label: 'Salting & Ice Control' },
  ],
  landscaping: [
    { value: 'lawn-mowing', label: 'Lawn Mowing & Maintenance' },
    { value: 'yard-cleanup', label: 'Spring / Fall Cleanup' },
    { value: 'garden-beds', label: 'Garden Beds & Mulch' },
    { value: 'hedge-trimming', label: 'Hedge & Shrub Trimming' },
    { value: 'sod-and-seeding', label: 'Sod & Seeding' },
    { value: 'landscape-project', label: 'Landscape Project' },
  ],
} as const;

type Area =
  | (typeof OPTIONS.snow)[number]['value']
  | (typeof OPTIONS.landscaping)[number]['value'];

type FormValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
  propertyAreas: Area[];
};
type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmissionState = 'idle' | 'sending' | 'error';

export const QUOTE_SUBMITTED_KEY = 'ai-quote-submitted';

export function QuoteForm({ service }: { service: ServiceKind }) {
  const options = OPTIONS[service];
  const [, setLocation] = useLocation();
  const [values, setValues] = useState<FormValues>({ name: '', phone: '', email: '', address: '', propertyAreas: [] });
  const [errors, setErrors] = useState<FormErrors>({});
  const [website, setWebsite] = useState('');
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [submitError, setSubmitError] = useState('');
  const submissionIdRef = useRef<string | null>(null);
  const isSending = submissionState === 'sending';
  const prefix = `${service}-`;

  const resetStatus = () => {
    setSubmissionState((current) => (current === 'sending' ? current : 'idle'));
    setSubmitError('');
    submissionIdRef.current = null;
  };

  const clearError = (field: keyof FormValues) =>
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });

  const update = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement>) => {
    resetStatus();
    setValues((current) => ({ ...current, [field]: event.target.value }));
    clearError(field);
  };

  const toggleArea = (area: Area) => {
    resetStatus();
    setValues((current) => ({
      ...current,
      propertyAreas: current.propertyAreas.includes(area)
        ? current.propertyAreas.filter((a) => a !== area)
        : [...current.propertyAreas, area],
    }));
    clearError('propertyAreas');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (values.phone.replace(/\D/g, '').length < 10) nextErrors.phone = 'Please enter a valid phone number.';
    if (!emailPattern.test(values.email.trim())) nextErrors.email = 'Please enter a valid email address.';
    if (values.address.trim().length < 3) nextErrors.address = 'Please enter the property address.';
    if (values.propertyAreas.length === 0) nextErrors.propertyAreas = 'Please choose at least one service.';

    if (Object.keys(nextErrors).length > 0) {
      const formElement = event.currentTarget;
      const first = Object.keys(nextErrors)[0] as keyof FormValues;
      setErrors(nextErrors);
      window.requestAnimationFrame(() => {
        if (first === 'propertyAreas') {
          document.getElementById(`${prefix}area-${options[0].value}`)?.focus();
          return;
        }
        const field = formElement.elements.namedItem(first);
        if (field instanceof HTMLElement) field.focus();
      });
      return;
    }

    setErrors({});
    setSubmitError('');
    setSubmissionState('sending');
    const requestId = submissionIdRef.current ?? crypto.randomUUID();
    submissionIdRef.current = requestId;

    try {
      await createQuoteRequest({
        requestId,
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        address: values.address.trim(),
        propertyAreas: values.propertyAreas,
        website,
      });
      try {
        window.sessionStorage.setItem(QUOTE_SUBMITTED_KEY, JSON.stringify({ requestId, service }));
      } catch {
        // Storage can be blocked; the thank-you page still shows.
      }
      setLocation(`/thank-you?service=${service}`);
      window.scrollTo({ top: 0 });
    } catch (error) {
      const status = typeof error === 'object' && error !== null && 'status' in error ? error.status : null;
      setSubmitError(
        status === 429
          ? `We received several requests from this connection. Please wait a few minutes, or call us at ${SITE.phoneDisplay}.`
          : `We could not send your request right now. Please try again, or call us at ${SITE.phoneDisplay}.`,
      );
      setSubmissionState('error');
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-snow px-4 py-3.5 text-base text-ink placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${hasError ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-ice focus:ring-ice/40'}`;
  const labelClass = 'text-xs font-bold uppercase tracking-[0.14em] text-slate-700';

  const field = (key: 'name' | 'phone' | 'email' | 'address', label: string, props: Record<string, string>, span = false) => (
    <div className={`space-y-2 ${span ? 'sm:col-span-2' : ''}`}>
      <label htmlFor={`${prefix}${key}`} className={labelClass}>{label}</label>
      <input
        id={`${prefix}${key}`}
        name={key}
        value={values[key]}
        onChange={update(key)}
        required
        disabled={isSending}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `${prefix}${key}-error` : undefined}
        className={inputClass(Boolean(errors[key]))}
        data-testid={`input-${key}`}
        {...props}
      />
      {errors[key] && <p id={`${prefix}${key}-error`} className="text-sm text-red-700">{errors[key]}</p>}
    </div>
  );

  return (
    <form
      id="quote-form"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSending}
      aria-label={service === 'snow' ? 'Snow and ice removal quote request' : 'Landscaping quote request'}
      className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-30px_rgba(5,8,12,0.45)] sm:p-9"
      data-testid={`form-quote-${service}`}
    >
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${prefix}website`}>Website</label>
        <input id={`${prefix}website`} name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {field('name', 'Name', { autoComplete: 'name', placeholder: 'Your name' })}
        {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '780-555-0123' })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'you@example.com' }, true)}
        {field('address', 'Property address', { autoComplete: 'street-address', placeholder: 'Street address, Grande Prairie or Sexsmith' }, true)}

        <fieldset className="space-y-3 sm:col-span-2" aria-describedby={errors.propertyAreas ? `${prefix}areas-error` : undefined}>
          <legend className={labelClass}>{service === 'snow' ? 'What do you need cleared?' : 'What do you need done?'}</legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {options.map(({ value, label }) => {
              const checked = values.propertyAreas.includes(value);
              return (
                <label
                  key={value}
                  htmlFor={`${prefix}area-${value}`}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors ${checked ? 'border-ice bg-ice/10 text-ink' : 'border-slate-300 bg-snow text-slate-800 hover:border-ice/60'}`}
                >
                  <input
                    id={`${prefix}area-${value}`}
                    name="propertyAreas"
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleArea(value)}
                    disabled={isSending}
                    className="h-4 w-4 accent-[#0a6db5]"
                  />
                  <span className="text-sm font-semibold">{label}</span>
                </label>
              );
            })}
          </div>
          {errors.propertyAreas && <p id={`${prefix}areas-error`} className="text-sm text-red-700">{errors.propertyAreas}</p>}
        </fieldset>
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-extrabold uppercase tracking-[0.08em] text-white transition-colors hover:bg-steel disabled:cursor-not-allowed disabled:opacity-70"
        data-testid="button-submit-quote"
      >
        {isSending ? (
          <>Sending… <LoaderCircle size={18} className="animate-spin" /></>
        ) : (
          <>{submissionState === 'error' ? 'Try Again' : service === 'snow' ? 'Get My Snow Removal Quote' : 'Get My Landscaping Quote'} <Send size={18} /></>
        )}
      </button>
      <p className="mt-4 text-center text-sm text-slate-600">
        Free quote. We call you back with a price. Nothing is booked until you sign.
      </p>

      {submissionState === 'error' && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800" role="alert">
          <X size={20} className="mt-0.5 shrink-0 text-red-500" />
          <span className="text-sm font-medium">{submitError}</span>
        </div>
      )}
    </form>
  );
}
