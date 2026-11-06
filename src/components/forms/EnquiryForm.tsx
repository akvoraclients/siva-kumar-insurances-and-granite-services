'use client';

import React, { useState, useRef } from 'react';
import { SupportedLanguage } from '@/types';
import { FORMSPREE_ENDPOINT } from '@/lib/constants';
import { getDictionary } from '@/lib/dictionary';
import { ShieldAlert, Send, AlertCircle, Loader2 } from 'lucide-react';
import { FormSuccess } from './FormSuccess';

interface EnquiryFormProps {
  lang: SupportedLanguage;
  defaultCategory?: 'insurance' | 'granite' | 'general';
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * EnquiryForm - Direct Formspree customer enquiry submission.
 * Sends customer enquiries directly to Siva Kumar with honeypot spam protection.
 */
export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  lang,
  defaultCategory = 'general',
}) => {
  const dict = getDictionary(lang);
  const contactText = dict.contact || {};
  const commonText = dict.common || {};

  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent duplicate clicks during ongoing submission
    if (status === 'loading') {
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot spam check: if filled, quietly resolve without submitting
    const gotcha = formData.get('_gotcha');
    if (gotcha && typeof gotcha === 'string' && gotcha.trim().length > 0) {
      setStatus('success');
      setErrorMessage(null);
      form.reset();
      return;
    }

    // Required fields client-side validation
    const name = (formData.get('name') as string)?.trim() || '';
    const phone = (formData.get('phone') as string)?.trim() || '';

    if (!name || !phone) {
      setStatus('error');
      setErrorMessage(
        contactText.validationError ||
          commonText.validationError ||
          (lang === 'ta'
            ? 'தயவுசெய்து உங்கள் பெயர் மற்றும் தொலைபேசி எண்ணை உள்ளிடவும்.'
            : 'Please provide your name and phone number.')
      );
      return;
    }

    // Basic phone validation (at least 7 digits)
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      setStatus('error');
      setErrorMessage(
        contactText.validationError ||
          (lang === 'ta'
            ? 'தயவுசெய்து சரியான தொலைபேசி எண்ணை உள்ளிடவும்.'
            : 'Please enter a valid phone number.')
      );
      return;
    }

    // If email is provided, configure Formspree Reply-To header
    const email = (formData.get('email') as string)?.trim();
    if (email) {
      formData.set('_replyto', email);
    }

    // Ensure metadata is consistently present
    formData.set('_service', 'General Enquiry');
    formData.set('_subject', 'New General Enquiry - SIVA INSURANCES & GRANITE SERVICES');

    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        setErrorMessage(null);
        // Reset form ONLY on confirmed successful submission
        form.reset();
      } else {
        let errorDetail = '';
        try {
          const data = await response.json();
          if (data && Array.isArray(data.errors) && data.errors.length > 0) {
            errorDetail = data.errors
              .map((err: { message?: string }) => err.message)
              .filter(Boolean)
              .join(', ');
          } else if (data && data.error) {
            errorDetail = data.error;
          }
        } catch {
          // Response body was not JSON
        }

        setStatus('error');
        setErrorMessage(
          errorDetail ||
            contactText.submissionError ||
            commonText.submissionError ||
            (lang === 'ta'
              ? 'விசாரணையை சமர்ப்பிப்பதில் சிக்கல் ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.'
              : 'There was a problem submitting your enquiry. Please try again.')
        );
      }
    } catch {
      // Network error or fetch failure
      setStatus('error');
      setErrorMessage(
        contactText.networkError ||
          commonText.networkError ||
          (lang === 'ta'
            ? 'இணைய இணைப்பு பிழை. தயவுசெய்து உங்கள் இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.'
            : 'Network connection error. Please check your network and try again.')
      );
    }
  };

  const handleResetStatus = () => {
    setStatus('idle');
    setErrorMessage(null);
  };

  if (status === 'success') {
    return <FormSuccess lang={lang} onReset={handleResetStatus} />;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-xs">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-brand-navy mb-1">
          {contactText.formTitle || (lang === 'ta' ? 'ஆன்லைன் விசாரணை படிவம்' : 'Online Enquiry Form')}
        </h3>
        <p className="text-xs text-slate-500">
          {contactText.formDesc ||
            (lang === 'ta'
              ? 'உங்கள் தகவல்கள் நேரடியாக சிவகுமார் அவர்களுக்கு அனுப்பி வைக்கப்படும்.'
              : 'Enquiries are delivered directly to Siva Kumar.')}
        </p>
      </div>

      {/* Compliance Warning: Never collect sensitive health/identity info */}
      <div className="mb-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          <strong>{lang === 'ta' ? 'பாதுகாப்பு குறிப்பு:' : 'Privacy Notice:'}</strong>{' '}
          {lang === 'ta'
            ? 'தயவுசெய்து ஆதார் எண், மருத்துவ அறிக்கைகள் அல்லது ரகசிய ஆவணங்களை இந்த பொது படிவத்தில் பகிர வேண்டாம்.'
            : 'Please do not enter Aadhaar numbers, health records, policy document scans, or sensitive data in this enquiry form.'}
        </p>
      </div>

      {/* Error Notification */}
      {status === 'error' && errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 flex items-start gap-3"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1">
            <p className="font-bold text-red-800 mb-0.5">
              {lang === 'ta' ? 'சமர்ப்பிப்பதில் பிழை' : 'Submission Failed'}
            </p>
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Form structure wired for Formspree */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4"
        noValidate={false}
      >
        {/* Formspree Metadata */}
        <input type="hidden" name="_service" value="General Enquiry" />
        <input type="hidden" name="_subject" value="New General Enquiry - SIVA INSURANCES & GRANITE SERVICES" />

        {/* Honeypot Spam Protection: hidden from real users */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          style={{ display: 'none' }}
          aria-hidden="true"
        />

        {/* Customer Name */}
        <div>
          <label htmlFor="customer-name" className="block text-xs font-semibold text-slate-700 mb-1">
            {lang === 'ta' ? 'பெயர்' : 'Full Name'} <span className="text-red-500">*</span>
          </label>
          <input
            id="customer-name"
            type="text"
            name="name"
            autoComplete="name"
            required
            disabled={status === 'loading'}
            placeholder={lang === 'ta' ? 'உங்கள் பெயர்' : 'e.g. Siva Kumar'}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-hidden disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Customer Phone */}
        <div>
          <label htmlFor="customer-phone" className="block text-xs font-semibold text-slate-700 mb-1">
            {lang === 'ta' ? 'தொலைபேசி எண் (WhatsApp)' : 'Phone Number (WhatsApp)'} <span className="text-red-500">*</span>
          </label>
          <input
            id="customer-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            required
            disabled={status === 'loading'}
            placeholder={lang === 'ta' ? '10 இலக்க தொலைபேசி எண்' : '10-digit mobile number'}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-hidden disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Customer Email (Optional) */}
        <div>
          <label htmlFor="customer-email" className="block text-xs font-semibold text-slate-700 mb-1">
            {lang === 'ta' ? 'மின்னஞ்சல் முகவரி (விருப்பத்திற்குரியது)' : 'Email Address (Optional)'}
          </label>
          <input
            id="customer-email"
            type="email"
            name="email"
            autoComplete="email"
            disabled={status === 'loading'}
            placeholder={lang === 'ta' ? 'yourname@example.com' : 'yourname@example.com'}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-hidden disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Service Category */}
        <div>
          <label htmlFor="service-category" className="block text-xs font-semibold text-slate-700 mb-1">
            {lang === 'ta' ? 'சேவை பிரிவு' : 'Service Required'} <span className="text-red-500">*</span>
          </label>
          <select
            id="service-category"
            name="service_category"
            defaultValue={defaultCategory}
            disabled={status === 'loading'}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-hidden bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
          >
            <option value="insurance">
              {lang === 'ta' ? 'காப்பீட்டு சேவைகள் (LIC, Star Health, New India)' : 'Insurance Services (LIC, Star Health, New India)'}
            </option>
            <option value="granite">
              {lang === 'ta' ? 'சிவா கிரானைட்ஸ் (Hosur Granite Coordination)' : 'Siva Granites (Hosur Granite Coordination)'}
            </option>
            <option value="general">
              {lang === 'ta' ? 'பொதுவான தகவல் (General Enquiry)' : 'General Enquiry'}
            </option>
          </select>
        </div>

        {/* Requirements / Notes */}
        <div>
          <label htmlFor="customer-message" className="block text-xs font-semibold text-slate-700 mb-1">
            {lang === 'ta' ? 'உங்கள் தேவை / குறிப்பு' : 'Your Requirement / Message'}
          </label>
          <textarea
            id="customer-message"
            name="message"
            rows={3}
            disabled={status === 'loading'}
            placeholder={
              lang === 'ta'
                ? 'உங்கள் தேவை அல்லது விவரங்களை இங்கே உள்ளிடவும்...'
                : 'Provide details such as granite quantity (sq. ft.) or policy type...'
            }
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-brand-teal focus:border-brand-teal outline-hidden disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 px-4 rounded-xl bg-brand-navy text-white font-semibold text-sm hover:bg-brand-navy-900 transition-all flex items-center justify-center gap-2 focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-brand-teal" aria-hidden="true" />
              <span>
                {lang === 'ta' ? 'அனுப்பப்படுகிறது...' : 'Sending...'}
              </span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-brand-teal" aria-hidden="true" />
              <span>{lang === 'ta' ? 'விசாரணையை சமர்ப்பிக்க' : 'Submit Query'}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
