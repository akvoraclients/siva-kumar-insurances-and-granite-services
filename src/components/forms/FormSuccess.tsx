'use client';

import React from 'react';
import Link from 'next/link';
import { SupportedLanguage } from '@/types';
import { getDictionary } from '@/lib/dictionary';
import { Button } from '@/components/common/Button';
import { Home, RotateCcw } from 'lucide-react';

interface FormSuccessProps {
  lang?: SupportedLanguage;
  onReset?: () => void;
  heading?: string;
  message?: string;
  className?: string;
}

export const FormSuccess: React.FC<FormSuccessProps> = ({
  lang = 'en',
  onReset,
  heading,
  message,
  className = '',
}) => {
  const isTa = lang === 'ta';
  const dict = getDictionary(lang);
  const common = dict.common || {};

  const defaultHeading = isTa
    ? 'வினவல் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!'
    : 'Query Submitted Successfully!';

  const defaultMessage = isTa
    ? 'சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் நிறுவனத்தை தொடர்பு கொண்டதற்கு நன்றி. உங்கள் வினவல் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது. எங்கள் குழு உங்கள் கோரிக்கையை பரிசீலித்து விரைவில் உங்களைத் தொடர்பு கொள்ளும்.'
    : 'Thank you for contacting SIVA INSURANCES & GRANITE SERVICES. Your query has been submitted successfully. Our team will review your request and contact you soon.';

  const displayHeading = heading || common.querySuccessTitle || defaultHeading;
  const displayMessage = message || common.querySuccessMessage || defaultMessage;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`bg-white rounded-2xl sm:rounded-3xl border border-emerald-100 p-6 sm:p-10 md:p-12 shadow-xs text-center flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px] transition-all duration-300 ${className}`}
    >
      {/* Step 1 & 2: Animated Circular Success Badge & Drawing Checkmark */}
      <div className="relative mb-6 flex items-center justify-center">
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-50 border-2 border-emerald-500/80 flex items-center justify-center animate-success-circle shadow-lg shadow-emerald-500/10"
          aria-hidden="true"
        >
          {/* Animated SVG Checkmark */}
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="26"
              cy="26"
              r="24"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="opacity-20"
            />
            <path
              d="M14 27L22 35L38 17"
              stroke="#059669"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-success-check"
            />
          </svg>
        </div>
      </div>

      {/* Step 3: Exact Heading with Fade-in Animation */}
      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight mb-3 animate-success-title max-w-lg">
        {displayHeading}
      </h3>

      {/* Step 4: Exact Confirmation Message with Staggered Fade-in */}
      <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-lg mb-8 animate-success-body">
        {displayMessage}
      </p>

      {/* Step 5: Action Buttons (Go to Home + Optional Submit Another) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto animate-success-actions">
        {/* Go to Home Button */}
        <Button
          href={`/${lang}`}
          variant="primary"
          size="md"
          icon={<Home className="w-4 h-4 text-teal-300" aria-hidden="true" />}
          className="w-full sm:w-auto min-w-[160px] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          {common.goToHome || (isTa ? 'முகப்பிற்குச் செல்லவும்' : 'Go to Home')}
        </Button>

        {/* Optional: Submit Another Enquiry */}
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-brand-navy hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" aria-hidden="true" />
            <span>{isTa ? 'மற்றொரு வினவலைச் சமர்ப்பிக்க' : 'Submit Another Enquiry'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FormSuccess;
