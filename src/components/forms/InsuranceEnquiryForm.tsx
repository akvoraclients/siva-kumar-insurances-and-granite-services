'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SupportedLanguage } from '@/types';
import { FORMSPREE_ENDPOINT } from '@/lib/constants';
import { getDictionary } from '@/lib/dictionary';
import { Shield, Send, AlertCircle, Loader2 } from 'lucide-react';

interface InsuranceEnquiryFormProps {
  lang: SupportedLanguage;
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export const InsuranceEnquiryForm: React.FC<InsuranceEnquiryFormProps> = ({ lang }) => {
  const router = useRouter();
  const dict = getDictionary(lang);
  const enquiryText = dict.insurance?.enquiry || {};
  const commonText = dict.common || {};

  const defaultCompany =
    enquiryText.companyOptions?.[0] || 'Life Insurance Corporation of India (LIC)';
  const defaultCategory =
    enquiryText.categoryOptions?.[0] || 'New Policy';

  const initialFormState = {
    name: '',
    phone: '',
    company: defaultCompany,
    category: defaultCategory,
    location: '',
    message: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Update default selections when language changes if form hasn't been modified yet
  useEffect(() => {
    if (enquiryText.companyOptions?.[0] && enquiryText.categoryOptions?.[0]) {
      setFormData((prev) => ({
        ...prev,
        company: prev.company || enquiryText.companyOptions[0],
        category: prev.category || enquiryText.categoryOptions[0],
      }));
    }
  }, [lang, enquiryText.companyOptions, enquiryText.categoryOptions]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === 'loading') {
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot spam check: if filled, quietly resolve without submitting
    const gotcha = data.get('_gotcha');
    if (gotcha && typeof gotcha === 'string' && gotcha.trim().length > 0) {
      setStatus('success');
      setErrorMessage(null);
      setFormData(initialFormState);
      router.push(`/${lang}/success`);
      return;
    }

    // Required fields client-side validation
    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();

    if (!trimmedName || !trimmedPhone) {
      setStatus('error');
      setErrorMessage(
        enquiryText.validationError ||
          commonText.validationError ||
          (lang === 'ta'
            ? 'தயவுசெய்து உங்கள் பெயர் மற்றும் கைபேசி எண்ணை உள்ளிடவும்.'
            : 'Please provide your name and mobile number.')
      );
      return;
    }

    const digitsOnly = trimmedPhone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      setStatus('error');
      setErrorMessage(
        lang === 'ta'
          ? 'தயவுசெய்து சரியான 10-இலக்க கைபேசி எண்ணை உள்ளிடவும்.'
          : 'Please enter a valid mobile number.'
      );
      return;
    }

    // Set Formspree metadata
    data.set('_service', 'Insurance Consultation');
    data.set('_subject', 'New Insurance Consultation - SIVA INSURANCES & GRANITE SERVICES');

    // If email exists in data, set _replyto
    const email = data.get('email');
    if (email && typeof email === 'string' && email.trim()) {
      data.set('_replyto', email.trim());
    }

    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        setErrorMessage(null);
        // Reset form ONLY on confirmed successful submission
        setFormData(initialFormState);
        // Redirect to dedicated localized success page
        router.push(`/${lang}/success`);
      } else {
        let errorDetail = '';
        try {
          const resJson = await response.json();
          if (resJson && Array.isArray(resJson.errors) && resJson.errors.length > 0) {
            errorDetail = resJson.errors
              .map((err: { message?: string }) => err.message)
              .filter(Boolean)
              .join(', ');
          } else if (resJson && resJson.error) {
            errorDetail = resJson.error;
          }
        } catch {
          // Response body was not JSON
        }

        setStatus('error');
        setErrorMessage(
          errorDetail ||
            enquiryText.submissionError ||
            commonText.submissionError ||
            (lang === 'ta'
              ? 'காப்பீட்டு விசாரணையை சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
              : 'Unable to submit your insurance enquiry. Please try again.')
        );
      }
    } catch {
      // Network failure
      setStatus('error');
      setErrorMessage(
        enquiryText.networkError ||
          commonText.networkError ||
          (lang === 'ta'
            ? 'இணைய இணைப்பு பிழை ஏற்பட்டது. தயவுசெய்து உங்கள் இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.'
            : 'Network error occurred. Please verify your internet connection and try again.')
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-8 lg:p-10 shadow-xs">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-navy-50 text-brand-navy border border-brand-navy-200">
            <Shield className="w-3.5 h-3.5 text-brand-teal" aria-hidden="true" />
            <span>{enquiryText.badge || (lang === 'ta' ? 'நேரடி ஆலோசனை' : 'Direct Consultation')}</span>
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy">
          {enquiryText.title || (lang === 'ta' ? 'காப்பீட்டு விசாரணை உள்ளதா?' : 'Have an Insurance Enquiry?')}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          {enquiryText.description ||
            (lang === 'ta'
              ? 'உங்கள் தேவைகளை எங்களிடம் பகிருங்கள், சிவகுமார் அவர்கள் உங்களை நேரடியாகத் தொடர்புகொள்வார்.'
              : 'Share your requirements and Siva Kumar will contact you.')}
        </p>
      </div>

      {/* Strict Privacy Notice (Never collect Aadhaar, health records or passwords) */}
      <div className="mb-6 p-4 rounded-2xl bg-brand-light border border-slate-200 text-xs text-slate-600 leading-relaxed">
        <p className="font-semibold text-brand-navy mb-0.5">
          {lang === 'ta' ? 'பாதுகாப்பு & தனியுரிமை குறிப்பு:' : 'Privacy & Security Note:'}
        </p>
        <p>
          {enquiryText.privacyNotice ||
            (lang === 'ta'
              ? 'சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் உங்கள் தனியுரிமையை மதிக்கிறது. நாங்கள் ஆதார் எண்கள், வங்கி கடவுச்சொற்கள் அல்லது மருத்துவ ஆவணங்களை இந்த பொது இணையதளத்தில் கோருவதில்லை.'
              : 'SIVA INSURANCES & GRANITE SERVICES respects your privacy. We do not request Aadhaar numbers, bank passwords, medical records, or sensitive document uploads on this website.')}
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

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        noValidate={false}
      >
        {/* Formspree Metadata */}
        <input type="hidden" name="_service" value="Insurance Consultation" />
        <input type="hidden" name="_subject" value="New Insurance Consultation - SIVA INSURANCES & GRANITE SERVICES" />

        {/* Honeypot Spam Protection */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          style={{ display: 'none' }}
          aria-hidden="true"
        />

        {/* Row 1: Name and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ins-name" className="block text-xs font-bold text-brand-navy mb-1.5">
              {enquiryText.nameLabel || (lang === 'ta' ? 'உங்கள் முழுப் பெயர்' : 'Your Full Name')}{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="ins-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              disabled={status === 'loading'}
              value={formData.name}
              onChange={handleChange}
              placeholder={enquiryText.namePlaceholder || (lang === 'ta' ? 'உங்கள் பெயரை உள்ளிடவும்' : 'Enter your name')}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="ins-phone" className="block text-xs font-bold text-brand-navy mb-1.5">
              {enquiryText.phoneLabel || (lang === 'ta' ? 'கைபேசி எண்' : 'Mobile Number')}{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="ins-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              disabled={status === 'loading'}
              value={formData.phone}
              onChange={handleChange}
              placeholder={enquiryText.phonePlaceholder || (lang === 'ta' ? '10-இலக்க கைபேசி எண்' : 'Enter 10-digit mobile number')}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Row 2: Insurance Company & Enquiry Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ins-company" className="block text-xs font-bold text-brand-navy mb-1.5">
              {enquiryText.companyLabel || (lang === 'ta' ? 'காப்பீட்டு நிறுவனம்' : 'Insurance Company')}{' '}
              <span className="text-red-500">*</span>
            </label>
            <select
              id="ins-company"
              name="company"
              required
              disabled={status === 'loading'}
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
            >
              {(
                enquiryText.companyOptions || [
                  'Life Insurance Corporation of India (LIC)',
                  'The New India Assurance Co. Ltd.',
                  'Star Health and Allied Insurance',
                  'Not sure / Need guidance',
                ]
              ).map((opt: string, idx: number) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="ins-category" className="block text-xs font-bold text-brand-navy mb-1.5">
              {enquiryText.categoryLabel || (lang === 'ta' ? 'விசாரணை பிரிவு' : 'Enquiry Category')}{' '}
              <span className="text-red-500">*</span>
            </label>
            <select
              id="ins-category"
              name="category"
              required
              disabled={status === 'loading'}
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
            >
              {(
                enquiryText.categoryOptions || [
                  'New Policy',
                  'Policy Renewal',
                  'Claims Assistance',
                  'Policy Information Update',
                  'General Enquiry',
                ]
              ).map((opt: string, idx: number) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Location */}
        <div>
          <label htmlFor="ins-location" className="block text-xs font-bold text-brand-navy mb-1.5">
            {enquiryText.locationLabel || (lang === 'ta' ? 'உங்கள் இருப்பிடம்' : 'Your Location')}
          </label>
          <input
            id="ins-location"
            name="location"
            type="text"
            autoComplete="address-level2"
            disabled={status === 'loading'}
            value={formData.location}
            onChange={handleChange}
            placeholder={enquiryText.locationPlaceholder || (lang === 'ta' ? 'உதாரணம்: ஓசூர், சுற்றியுள்ள பகுதி' : 'e.g. Hosur, surrounding areas')}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Row 4: Message */}
        <div>
          <label htmlFor="ins-message" className="block text-xs font-bold text-brand-navy mb-1.5">
            {enquiryText.messageLabel || (lang === 'ta' ? 'செய்தி / குறிப்பிட்ட தேவைகள்' : 'Message / Specific Requirements')}
          </label>
          <textarea
            id="ins-message"
            name="message"
            rows={3}
            disabled={status === 'loading'}
            value={formData.message}
            onChange={handleChange}
            placeholder={
              enquiryText.messagePlaceholder ||
              (lang === 'ta'
                ? 'உங்கள் காப்பீட்டு தேவைகள் அல்லது தற்போதைய பாலிசி விவரங்களை உள்ளிடவும்...'
                : 'Tell us about your coverage requirements or existing policy details...')
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-navy-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
                <span>
                  {enquiryText.submitBtn ||
                    (lang === 'ta' ? 'காப்பீட்டு விசாரணையை சமர்ப்பிக்கவும்' : 'Submit Query')}
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsuranceEnquiryForm;
