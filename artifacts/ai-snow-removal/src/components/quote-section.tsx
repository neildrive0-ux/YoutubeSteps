import { type ChangeEvent, type FormEvent, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { createQuoteRequest } from '@workspace/api-client-react';
import { LoaderCircle, Mail, MapPin, Phone, Send, X } from 'lucide-react';
import { SITE } from '@/site';
import { trackCallClick } from '@/lib/tracking';

const propertyAreaOptions = [
  { value: 'driveway', label: 'Driveway' },
  { value: 'sidewalk', label: 'Sidewalk' },
  { value: 'staircase', label: 'Steps / Staircase' },
  { value: 'back-alley-parking-pad', label: 'Back-Alley Parking Pad' },
] as const;

type PropertyArea = (typeof propertyAreaOptions)[number]['value'];

type FormValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
  propertyAreas: PropertyArea[];
};
type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmissionState = 'idle' | 'sending' | 'error';

export const QUOTE_SUBMITTED_KEY = 'ai-quote-submitted';

export function QuoteSection({
  title = 'Get Your Snow Removal Quote',
  intro = "Send a few details and we'll call you back with a straightforward quote. This form is a request only, with no commitment until you're ready.",
}: {
  title?: string;
  intro?: string;
}) {
  const [, setLocation] = useLocation();
  const [values, setValues] = useState<FormValues>({ name: '', phone: '', email: '', address: '', propertyAreas: [] });
  const [errors, setErrors] = useState<FormErrors>({});
  const [website, setWebsite] = useState('');
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [submitError, setSubmitError] = useState('');
  const submissionIdRef = useRef<string | null>(null);
  const isSending = submissionState === 'sending';

  const update = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement>) => {
    setSubmissionState((current) => (current === 'sending' ? current : 'idle'));
    setSubmitError('');
    submissionIdRef.current = null;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const togglePropertyArea = (area: PropertyArea) => {
    setSubmissionState((current) => (current === 'sending' ? current : 'idle'));
    setSubmitError('');
    submissionIdRef.current = null;
    setValues((current) => ({
      ...current,
      propertyAreas: current.propertyAreas.includes(area)
        ? current.propertyAreas.filter((currentArea) => currentArea !== area)
        : [...current.propertyAreas, area],
    }));
    setErrors((current) => {
      if (!current.propertyAreas) return current;
      const nextErrors = { ...current };
      delete nextErrors.propertyAreas;
      return nextErrors;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = values.phone.replace(/\D/g, '');

    if (values.name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (phoneDigits.length < 10) nextErrors.phone = 'Please enter a valid phone number.';
    if (!emailPattern.test(values.email.trim())) nextErrors.email = 'Please enter a valid email address.';
    if (values.address.trim().length < 3) nextErrors.address = 'Please enter the property address.';
    if (values.propertyAreas.length === 0) nextErrors.propertyAreas = 'Please select at least one area to clear.';

    if (Object.keys(nextErrors).length > 0) {
      const formElement = event.currentTarget;
      const firstInvalidName = Object.keys(nextErrors)[0] as keyof FormValues;
      setErrors(nextErrors);
      setSubmissionState('idle');
      setSubmitError('');
      window.requestAnimationFrame(() => {
        if (firstInvalidName === 'propertyAreas') {
          document.getElementById('property-area-driveway')?.focus();
          return;
        }
        const firstInvalidField = formElement.elements.namedItem(firstInvalidName);
        if (firstInvalidField instanceof HTMLElement) firstInvalidField.focus();
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
        window.sessionStorage.setItem(QUOTE_SUBMITTED_KEY, requestId);
      } catch {
        // Storage can be blocked; the thank-you page still shows.
      }
      setLocation('/thank-you');
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
    `w-full bg-slate-50 border rounded-md px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 transition-all ${hasError ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-sky-500/50 focus:border-sky-500'}`;

  return (
    <section className="py-24 lg:py-32 bg-slate-50 border-t border-slate-200" id="quote" aria-labelledby="quote-title">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:pt-8">
            <p className="text-sky-700 font-bold text-xs tracking-widest uppercase mb-4">Book before winter fills up</p>
            <h2 id="quote-title" className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              {title}
            </h2>
            <p className="text-slate-600 text-lg mb-12 leading-relaxed max-w-md">{intro}</p>

            <div className="space-y-8">
              <div className="flex items-center gap-5 text-slate-700">
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center text-sky-600 shadow-sm shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Call us</div>
                  <a href={SITE.phoneHref} onClick={trackCallClick} className="text-lg font-semibold hover:text-sky-700 transition-colors" data-testid="link-phone">{SITE.phoneDisplay}</a>
                </div>
              </div>
              <div className="flex items-center gap-5 text-slate-700">
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center text-sky-600 shadow-sm shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Email</div>
                  <a href={`mailto:${SITE.email}`} className="text-lg font-semibold hover:text-sky-700 transition-colors break-all" data-testid="link-email">{SITE.email}</a>
                </div>
              </div>
              <div className="flex items-center gap-5 text-slate-700">
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center text-sky-600 shadow-sm shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Service area</div>
                  <div className="text-lg font-semibold">Grande Prairie, Sexsmith &amp; County</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form
              id="quote-form"
              className="bg-white border border-slate-200 rounded-2xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 scroll-mt-24"
              onSubmit={handleSubmit}
              noValidate
              aria-busy={isSending}
              aria-label="Snow removal quote request"
              data-testid="form-quote"
            >
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" data-testid="input-quote-website" />
              </div>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-600">Name</label>
                  <input id="name" name="name" autoComplete="name" value={values.name} onChange={update('name')} placeholder="Your name" required disabled={isSending} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} className={inputClass(Boolean(errors.name))} data-testid="input-name" />
                  {errors.name && <p id="name-error" className="text-sm text-red-700" data-testid="error-name">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-600">Phone</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update('phone')} placeholder="Your phone number" required disabled={isSending} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} className={inputClass(Boolean(errors.phone))} data-testid="input-phone" />
                  {errors.phone && <p id="phone-error" className="text-sm text-red-700" data-testid="error-phone">{errors.phone}</p>}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-600">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={update('email')} placeholder="you@example.com" required disabled={isSending} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} className={inputClass(Boolean(errors.email))} data-testid="input-email" />
                  {errors.email && <p id="email-error" className="text-sm text-red-700" data-testid="error-email">{errors.email}</p>}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="address" className="text-xs font-bold uppercase tracking-widest text-slate-600">Property address</label>
                  <input id="address" name="address" autoComplete="street-address" value={values.address} onChange={update('address')} placeholder="Street address, Grande Prairie or Sexsmith" required disabled={isSending} aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? 'address-error' : undefined} className={inputClass(Boolean(errors.address))} data-testid="input-address" />
                  {errors.address && <p id="address-error" className="text-sm text-red-700" data-testid="error-address">{errors.address}</p>}
                </div>
                <fieldset className="sm:col-span-2 space-y-3" aria-invalid={Boolean(errors.propertyAreas)} aria-describedby={errors.propertyAreas ? 'property-areas-error' : undefined}>
                  <legend className="text-xs font-bold uppercase tracking-widest text-slate-600">Areas to clear</legend>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {propertyAreaOptions.map(({ value, label }) => (
                      <label
                        key={value}
                        htmlFor={`property-area-${value}`}
                        className={`flex items-center gap-3 rounded-md border px-4 py-3.5 cursor-pointer transition-colors ${
                          values.propertyAreas.includes(value) ? 'border-sky-500 bg-sky-50 text-slate-900' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-300'
                        }`}
                      >
                        <input id={`property-area-${value}`} name="propertyAreas" type="checkbox" checked={values.propertyAreas.includes(value)} onChange={() => togglePropertyArea(value)} disabled={isSending} className="h-4 w-4 accent-sky-500" data-testid={`checkbox-property-area-${value}`} />
                        <span className="text-sm font-medium">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.propertyAreas && <p id="property-areas-error" className="text-sm text-red-700" data-testid="error-property-areas">{errors.propertyAreas}</p>}
                </fieldset>
              </div>

              <button type="submit" disabled={isSending} className="w-full inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-70 disabled:cursor-not-allowed text-[#071118] font-bold px-8 py-4 rounded-md transition-all duration-200 mb-4" data-testid="button-submit-quote">
                {isSending ? (
                  <>Sending Request… <LoaderCircle size={18} className="animate-spin" /></>
                ) : (
                  <>{submissionState === 'error' ? 'Try Again' : 'Get My Free Quote'} <Send size={18} /></>
                )}
              </button>

              <p className="text-center text-xs text-slate-600">
                We only use these details to reply to your quote request. Nothing is booked until you sign an agreement.
              </p>

              {submissionState === 'sending' && (
                <div className="mt-6 p-4 bg-sky-50 border border-sky-200 text-sky-900 rounded-md flex items-start gap-3" role="status" data-testid="status-quote-sending">
                  <LoaderCircle size={20} className="text-sky-500 shrink-0 mt-0.5 animate-spin" />
                  <span className="text-sm font-medium">Sending your request securely to our team…</span>
                </div>
              )}

              {submissionState === 'error' && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md flex items-start gap-3" role="alert" data-testid="status-quote-error">
                  <X size={20} className="text-red-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{submitError}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
