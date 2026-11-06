'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SupportedLanguage } from '@/types';
import { FORMSPREE_ENDPOINT } from '@/lib/constants';
import { getDictionary } from '@/lib/dictionary';
import { Layers, Send, AlertCircle, Loader2 } from 'lucide-react';

interface GraniteEnquiryFormProps {
  lang: SupportedLanguage;
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export const GraniteEnquiryForm: React.FC<GraniteEnquiryFormProps> = ({ lang }) => {
  const router = useRouter();
  const dict = getDictionary(lang);
  const enquiryText = dict.granites?.enquiry || {};
  const commonText = dict.common || {};

  const defaultMeasurement =
    enquiryText.measurementOptions?.[0] || 'I already know the required square footage';

  const initialFormState = {
    name: '',
    phone: '',
    district: '',
    colour: '',
    finish: '',
    area: '',
    measurementAssistance: defaultMeasurement,
    usageArea: '',
    message: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Update default measurement selection when language changes
  useEffect(() => {
    if (enquiryText.measurementOptions?.[0]) {
      setFormData((prev) => ({
        ...prev,
        measurementAssistance: prev.measurementAssistance || enquiryText.measurementOptions[0],
      }));
    }
  }, [lang, enquiryText.measurementOptions]);

  // Prefill colour/style from query parameters if navigated from digital catalogue
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const colourParam = params.get('colour');
        const styleParam = params.get('style');
        if (colourParam || styleParam) {
          setFormData((prev) => ({
            ...prev,
            colour: colourParam ? colourParam.charAt(0).toUpperCase() + colourParam.slice(1) : prev.colour,
            message: styleParam
              ? (lang === 'ta'
                  ? `ஆர்வமுள்ள மாதிரி: ${styleParam}`
                  : `Enquiry regarding: ${styleParam}`)
              : prev.message,
          }));
        }
      } catch {
        // Fallback gracefully on query parse
      }
    }
  }, [lang]);

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

    // Honeypot spam protection: if bot filled _gotcha, quietly complete
    const gotcha = data.get('_gotcha');
    if (gotcha && typeof gotcha === 'string' && gotcha.trim().length > 0) {
      setStatus('success');
      setErrorMessage(null);
      setFormData(initialFormState);
      router.push(`/${lang}/success`);
      return;
    }

    // Client-side required field validation
    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedDistrict = formData.district.trim();

    if (!trimmedName || !trimmedPhone || !trimmedDistrict || !formData.measurementAssistance) {
      setStatus('error');
      setErrorMessage(
        enquiryText.validationError ||
          commonText.validationError ||
          (lang === 'ta'
            ? 'தேவையான அனைத்து விவரங்களையும் (பெயர், கைபேசி எண், மாவட்டம்) சரியாக நிரப்பவும்.'
            : 'Please complete all required fields (Name, Mobile Number, District).')
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
    data.set('_service', 'Granite Quotation');
    data.set('_subject', 'New Granite Quotation Request - SIVA INSURANCES & GRANITE SERVICES');

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
              ? 'கிரானைட் விலைப்பட்டியல் கோரிக்கையை சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
              : 'Unable to submit your granite quotation request. Please try again.')
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-sandstone-50 text-brand-charcoal border border-brand-sandstone-200">
            <Layers className="w-3.5 h-3.5 text-brand-sandstone-700" aria-hidden="true" />
            <span>{enquiryText.badge || (lang === 'ta' ? 'கிரானைட் ஆலோசனை' : 'Granite Consultation')}</span>
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-brand-charcoal">
          {enquiryText.title ||
            (lang === 'ta'
              ? 'உங்கள் கிரானைட் தேவைகளை எங்களிடம் தெரிவியுங்கள்'
              : 'Tell Us Your Granite Requirements')}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          {enquiryText.description ||
            (lang === 'ta'
              ? 'உங்கள் திட்டத் தேவைகளைப் பகிருங்கள், சிவகுமார் அவர்கள் பொருத்தமான கிரானைட் தேர்வுகள் மற்றும் விலைப்பட்டியல்களை ஒருங்கிணைப்பார்.'
              : 'Share your project requirements and Siva Kumar can coordinate suitable granite options and quotations.')}
        </p>
      </div>

      {/* Strict Privacy Notice (Never collect Aadhaar, bank details or passwords) */}
      <div className="mb-6 p-4 rounded-2xl bg-brand-light border border-slate-200 text-xs text-slate-600 leading-relaxed">
        <p className="font-semibold text-brand-charcoal mb-0.5">
          {lang === 'ta' ? 'பாதுகாப்பு & தனியுரிமை குறிப்பு:' : 'Privacy & Security Note:'}
        </p>
        <p>
          {enquiryText.privacyNotice ||
            (lang === 'ta'
              ? 'சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் உங்கள் தனியுரிமையை மதிக்கிறது. நாங்கள் ஆதார் எண்கள், வங்கி கணக்கு விவரங்கள், கடவுச்சொற்கள் அல்லது ஆவணப் பதிவேற்றங்களை இந்த தளத்தில் கோருவதில்லை.'
              : 'SIVA INSURANCES & GRANITE SERVICES respects your privacy. We do not request Aadhaar numbers, bank account details, passwords, or document uploads on this website.')}
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
        <input type="hidden" name="_service" value="Granite Quotation" />
        <input type="hidden" name="_subject" value="New Granite Quotation Request - SIVA INSURANCES & GRANITE SERVICES" />

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

        {/* Row 1: Name and Mobile Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="granite-name" className="block text-xs font-bold text-brand-charcoal mb-1.5">
              {enquiryText.nameLabel || (lang === 'ta' ? 'வாடிக்கையாளர் பெயர்' : 'Customer Name')}{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="granite-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              disabled={status === 'loading'}
              value={formData.name}
              onChange={handleChange}
              placeholder={
                enquiryText.namePlaceholder ||
                (lang === 'ta' ? 'உங்கள் முழுப் பெயரை உள்ளிடவும்' : 'Enter your full name')
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-sandstone-600 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="granite-phone" className="block text-xs font-bold text-brand-charcoal mb-1.5">
              {enquiryText.phoneLabel || (lang === 'ta' ? 'கைபேசி எண்' : 'Mobile Number')}{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="granite-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              disabled={status === 'loading'}
              value={formData.phone}
              onChange={handleChange}
              placeholder={
                enquiryText.phonePlaceholder ||
                (lang === 'ta' ? '10-இலக்க கைபேசி எண்' : 'Enter 10-digit mobile number')
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-sandstone-600 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Row 2: District / Town & Approximate Required Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="granite-district" className="block text-xs font-bold text-brand-charcoal mb-1.5">
              {enquiryText.districtLabel || (lang === 'ta' ? 'மாவட்டம் / நகரம்' : 'District / Town')}{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="granite-district"
              name="district"
              type="text"
              autoComplete="address-level2"
              required
              disabled={status === 'loading'}
              value={formData.district}
              onChange={handleChange}
              placeholder={
                enquiryText.districtPlaceholder ||
                (lang === 'ta'
                  ? 'உதாரணம்: ஓசூர், சென்னை, சேலம், கோயம்புத்தூர்'
                  : 'e.g., Hosur, Chennai, Salem, Coimbatore, etc.')
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-sandstone-600 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="granite-area" className="block text-xs font-bold text-brand-charcoal mb-1.5">
              {enquiryText.areaLabel ||
                (lang === 'ta' ? 'தோராயமான பரப்பளவு (சதுர அடி)' : 'Approximate Required Area (sq. ft.)')}
            </label>
            <input
              id="granite-area"
              name="area"
              type="text"
              disabled={status === 'loading'}
              value={formData.area}
              onChange={handleChange}
              placeholder={enquiryText.areaPlaceholder || (lang === 'ta' ? 'உதாரணம்: 500' : 'e.g., 500 (Optional)')}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-sandstone-600 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Row 3: Measurement Assistance (Required selection) */}
        <div>
          <label htmlFor="granite-measurement" className="block text-xs font-bold text-brand-charcoal mb-1.5">
            {enquiryText.measurementLabel ||
              (lang === 'ta' ? 'அளவீட்டு உதவி' : 'Measurement Assistance')}{' '}
            <span className="text-red-500">*</span>
          </label>
          <select
            id="granite-measurement"
            name="measurementAssistance"
            required
            disabled={status === 'loading'}
            value={formData.measurementAssistance}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-sandstone-600 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
          >
            {(
              enquiryText.measurementOptions || [
                'I already know the required square footage',
                'I need help understanding the measurements',
                'Not decided yet',
              ]
            ).map((opt: string, idx: number) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Row 4: Granite Colour Preference & Preferred Finish */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="granite-colour" className="block text-xs font-bold text-brand-charcoal mb-1.5">
              {enquiryText.colourLabel ||
                (lang === 'ta' ? 'கிரானைட் நிற விருப்பம்' : 'Granite Colour Preference')}
            </label>
            <input
              id="granite-colour"
              name="colour"
              type="text"
              disabled={status === 'loading'}
              value={formData.colour}
              onChange={handleChange}
              placeholder={
                enquiryText.colourPlaceholder ||
                (lang === 'ta'
                  ? 'உதாரணம்: கருப்பு, சாம்பல், வெள்ளை, பிரவுன், சிவப்பு'
                  : 'e.g., Black, Grey, White, Brown, Red, etc. (Optional)')
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-sandstone-600 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="granite-finish" className="block text-xs font-bold text-brand-charcoal mb-1.5">
              {enquiryText.finishLabel ||
                (lang === 'ta' ? 'விருப்பமான ஃபினிஷிங்' : 'Preferred Finish')}
            </label>
            <select
              id="granite-finish"
              name="finish"
              disabled={status === 'loading'}
              value={formData.finish}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-sandstone-600 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {enquiryText.finishPlaceholder ||
                  (lang === 'ta' ? 'விருப்பமான ஃபினிஷிங்கைத் தேர்ந்தெடுக்கவும்' : 'Select preferred finish (Optional)')}
              </option>
              {(
                enquiryText.finishOptions || [
                  'Not sure / Need recommendation',
                  'Polished (High gloss mirror finish)',
                  'Leather (Matte textured tactile finish)',
                  'Flamed (Rough non-slip outdoor finish)',
                  'Honed (Smooth satin matte finish)',
                ]
              ).map((opt: string, idx: number) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 5: Where will the granite be used? */}
        <div>
          <label htmlFor="granite-usage" className="block text-xs font-bold text-brand-charcoal mb-1.5">
            {enquiryText.usageLabel ||
              (lang === 'ta' ? 'கிரானைட் எங்கு பயன்படுத்தப்பட உள்ளது?' : 'Where will the granite be used?')}
          </label>
          <select
            id="granite-usage"
            name="usageArea"
            disabled={status === 'loading'}
            value={formData.usageArea}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-sandstone-600 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
          >
            <option value="">
              {enquiryText.usagePlaceholder ||
                (lang === 'ta' ? 'பயன்படுத்தப்படும் பகுதியைக் குறிப்பிடவும்' : 'Select intended usage area (Optional)')}
            </option>
            {(
              enquiryText.usageOptions || [
                'Not specified / Multiple areas',
                'Flooring',
                'Kitchen Countertop',
                'Staircase Steps & Risers',
                'Wall Cladding / Elevation',
                'Bathroom / Vanity',
                'Outdoor / Paving',
              ]
            ).map((opt: string, idx: number) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Row 6: Additional Requirements */}
        <div>
          <label htmlFor="granite-message" className="block text-xs font-bold text-brand-charcoal mb-1.5">
            {enquiryText.messageLabel ||
              (lang === 'ta' ? 'கூடுதல் தேவைகள்' : 'Additional Requirements')}
          </label>
          <textarea
            id="granite-message"
            name="message"
            rows={3}
            disabled={status === 'loading'}
            value={formData.message}
            onChange={handleChange}
            placeholder={
              enquiryText.messagePlaceholder ||
              (lang === 'ta'
                ? 'கூடுதல் விவரங்கள், தள விவரங்கள் அல்லது டெலிவரி தேவைகளைப் பகிரவும்...'
                : 'Share any additional specifications, site details, or delivery requirements...')
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-sandstone-600 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-charcoal hover:bg-black text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-brand-sandstone" aria-hidden="true" />
                <span>
                  {lang === 'ta' ? 'அனுப்பப்படுகிறது...' : 'Sending...'}
                </span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-brand-sandstone" aria-hidden="true" />
                <span>
                  {enquiryText.submitBtn ||
                    (lang === 'ta' ? 'கிரானைட் விலைப்பட்டியல் கோர' : 'Submit Query')}
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GraniteEnquiryForm;
