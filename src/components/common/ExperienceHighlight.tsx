import React from 'react';
import { SupportedLanguage } from '@/types';
import { getDictionary } from '@/lib/dictionary';
import { Award, Clock, ShieldCheck, Layers, Users } from 'lucide-react';

interface ExperienceHighlightProps {
  lang: SupportedLanguage;
  variant?: 'card' | 'compact' | 'stat';
  context?: 'general' | 'insurance' | 'granite';
  className?: string;
}

export const ExperienceHighlight: React.FC<ExperienceHighlightProps> = ({
  lang,
  variant = 'card',
  context = 'general',
  className = '',
}) => {
  const dict = getDictionary(lang);
  const exp = dict.experience || {};

  const statNumber = exp.stat || '~18';
  const statUnit = exp.statUnit || (lang === 'ta' ? 'ஆண்டுகள்' : 'Years');
  const mainTitle =
    exp.title ||
    (lang === 'ta'
      ? 'சுமார் 18 ஆண்டு கால ஒருங்கிணைந்த தொழில்முறை அனுபவம்'
      : 'Approximately 18 Years of Combined Professional Experience');

  const mainDesc =
    exp.description ||
    (lang === 'ta'
      ? 'காப்பீட்டு சேவைகள், வாடிக்கையாளர் உறவுகள் மற்றும் கிரானைட் தேர்வு & கொள்முதல் ஒருங்கிணைப்பில் நீண்டகால நேரடி அனுபவம்.'
      : 'Bringing together experience in insurance services, customer relationships and granite selection and purchase coordination.');

  // Context-specific text for compact banners
  let contextText = mainDesc;
  if (context === 'insurance') {
    contextText =
      exp.insuranceHighlight ||
      (lang === 'ta'
        ? 'வாடிக்கையாளர் சேவை, வணிக ஒருங்கிணைப்பு மற்றும் காப்பீட்டு வழிகாட்டலில் சுமார் 18 ஆண்டு கால ஒருங்கிணைந்த தொழில்முறை அனுபவத்தின் அடிப்படையில் வழங்கப்படுகிறது.'
        : 'Grounded in approximately 18 years of combined professional experience across customer service, business coordination, and insurance assistance.');
  } else if (context === 'granite') {
    contextText =
      exp.graniteHighlight ||
      (lang === 'ta'
        ? 'வாடிக்கையாளர் ஒருங்கிணைப்பு, சப்ளையர் தொடர்பு மற்றும் வணிக சேவைகளில் சுமார் 18 ஆண்டு கால ஒருங்கிணைந்த தொழில்முறை அனுபவம்.'
        : 'Backed by approximately 18 years of combined professional experience in customer coordination, supplier management, and business services.');
  }

  // VARIANT 1: COMPACT (Used on Insurance & Granite pages or tight layouts)
  if (variant === 'compact') {
    return (
      <div
        className={`rounded-2xl p-4 sm:p-5 bg-white border border-brand-navy-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-brand-navy-50 text-brand-navy flex flex-col items-center justify-center shrink-0 border border-brand-navy-200">
            <span className="text-xs font-black leading-none">{statNumber}</span>
            <span className="text-[9px] font-bold uppercase tracking-tight text-teal-800 mt-0.5">
              {statUnit}
            </span>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-brand-navy">
              {mainTitle}
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              {contextText}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // VARIANT 2: STAT ONLY
  if (variant === 'stat') {
    return (
      <div className={`flex items-baseline gap-2 ${className}`}>
        <span className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
          {statNumber}
        </span>
        <div className="text-xs font-bold uppercase tracking-wider text-teal-800">
          <span>{statUnit}</span>
          <span className="block text-[10px] text-slate-500 font-medium normal-case">
            {lang === 'ta' ? 'ஒருங்கிணைந்த அனுபவம்' : 'Combined Experience'}
          </span>
        </div>
      </div>
    );
  }

  // VARIANT 3: CARD (Prominent highlight used on Homepage and About page)
  return (
    <div
      className={`rounded-3xl bg-gradient-to-br from-brand-navy-50/70 via-white to-brand-light border border-brand-navy-200/80 p-4 sm:p-5 md:p-6 shadow-xs ${className}`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-brand-navy-100/70">
        <div className="flex items-center gap-4">
          {/* Prominent Stat Badge */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand-navy text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
            <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-white">
              {statNumber}
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-teal-300 mt-1">
              {statUnit}
            </span>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white text-brand-navy border border-brand-navy-200 mb-1.5 shadow-2xs">
              <Clock className="w-3 h-3 text-brand-teal" aria-hidden="true" />
              <span>{exp.badge || (lang === 'ta' ? 'தொழில்முறை அனுபவம்' : 'Professional Experience')}</span>
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-brand-navy tracking-tight leading-snug">
              {mainTitle}
            </h3>
          </div>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mt-4 mb-5">
        {mainDesc}
      </p>

      {/* 3 Core Experience Pillars (Clean, factual, no fabricated credentials) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-brand-teal shrink-0" aria-hidden="true" />
            <h4 className="text-xs font-bold text-brand-navy">
              {lang === 'ta' ? 'காப்பீட்டு சேவைகள்' : 'Insurance Services'}
            </h4>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {lang === 'ta'
              ? 'எல்.ஐ.சி, நியூ இந்தியா மற்றும் ஸ்டார் ஹெல்த் பாலிசி வழிகாட்டல்.'
              : 'Official portal policy guidance for LIC, New India, and Star Health.'}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-brand-sandstone-700 shrink-0" aria-hidden="true" />
            <h4 className="text-xs font-bold text-brand-charcoal">
              {lang === 'ta' ? 'கிரானைட் ஒருங்கிணைப்பு' : 'Granite Coordination'}
            </h4>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {lang === 'ta'
              ? 'ஓசூரின் 20-25 நிறுவனங்களுடன் நேரடி தேர்வு மற்றும் டெலிவரி.'
              : 'Direct showroom selection and delivery across Tamil Nadu.'}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-brand-teal shrink-0" aria-hidden="true" />
            <h4 className="text-xs font-bold text-brand-navy">
              {lang === 'ta' ? 'நேரடி வாடிக்கையாளர் சேவை' : 'Customer Guidance'}
            </h4>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {lang === 'ta'
              ? 'இடைத்தரகர்கள் இன்றி சிவகுமார் அவர்களின் நேரடி தனிப்பட்ட கவனம்.'
              : 'Direct owner assistance with transparent, personalized service.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceHighlight;

