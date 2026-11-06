import React from 'react';
import Link from 'next/link';
import { SupportedLanguage, AwardCategory } from '@/types';
import { getVerifiedAwards } from '@/lib/recognition';
import { AwardRecognitionCard } from './AwardRecognitionCard';
import { Shield, Award, ArrowRight } from 'lucide-react';

interface RecognitionGalleryProps {
  lang: SupportedLanguage;
  category?: AwardCategory | 'all';
  compact?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const RecognitionGallery: React.FC<RecognitionGalleryProps> = ({
  lang,
  category = 'all',
  compact = false,
  title,
  subtitle,
  className = '',
}) => {
  const filterCat = category === 'all' ? undefined : category;
  const verifiedAwards = getVerifiedAwards(filterCat);
  const hasAwards = verifiedAwards.length > 0;

  // Texts for bilingual support
  const defaultTitle =
    title ||
    (lang === 'ta'
      ? 'தொழில்முறை அங்கீகாரம்'
      : 'Professional Recognition');

  const defaultSubtitle =
    subtitle ||
    (lang === 'ta'
      ? 'காப்பீட்டு நிறுவனங்கள் மற்றும் கிரானைட் நிறுவனங்களுடனான எங்கள் நேரடி கூட்டுறவின் சரிபார்க்கப்பட்ட பதிவுகள்.'
      : 'Verified recognition and direct agency relationships with our partner companies.');

  // CASE 1: Genuine award photographs have been supplied
  if (hasAwards) {
    const displayedAwards = compact ? verifiedAwards.slice(0, 3) : verifiedAwards;

    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-teal-50 text-brand-teal-800 border border-brand-teal-200 mb-2">
              <Award className="w-3.5 h-3.5 text-brand-teal" aria-hidden="true" />
              <span>{lang === 'ta' ? 'நிறுவன அங்கீகாரம்' : 'Company Recognition'}</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy">
              {defaultTitle}
            </h3>
            {defaultSubtitle && (
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-normal">
                {defaultSubtitle}
              </p>
            )}
          </div>

          {compact && (
            <Link
              href={`/${lang}/about#recognition`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-teal hover:text-brand-teal-700 transition-colors shrink-0"
            >
              <span>{lang === 'ta' ? 'அனைத்தையும் காண்க' : 'View All Recognition'}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Gallery Grid */}
        <div
          className={`grid gap-6 ${
            compact
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}
        >
          {displayedAwards.map((award) => (
            <AwardRecognitionCard key={award.id} award={award} lang={lang} />
          ))}
        </div>
      </div>
    );
  }

  // CASE 2: No genuine photographs provided yet
  // If this gallery was filtered for a specific company and no awards are verified, return null.
  if (filterCat) {
    return null;
  }

  // For the homepage (compact), render the factual Insurance Services summary with plain text company names.
  // No credential badges or additional authorization claims.
  if (compact) {
    return (
      <div
        className={`rounded-2xl p-4 sm:p-5 bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-navy-50 text-brand-navy flex items-center justify-center shrink-0 border border-brand-navy-100">
            <Shield className="w-4 h-4 text-brand-teal" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold text-brand-navy">
              {lang === 'ta' ? 'காப்பீட்டு சேவைகள்' : 'Insurance Services'}
            </p>
            <p className="text-xs text-slate-600 mt-0.5">
              LIC • New India Assurance • Star Health Insurance
            </p>
          </div>
        </div>

        <div className="shrink-0 text-xs text-slate-500 font-medium">
          {lang === 'ta' ? 'ஓசூர், தமிழ்நாடு' : 'Hosur, Tamil Nadu'}
        </div>
      </div>
    );
  }

  // On full pages (e.g. About page), hide the entire section when genuine photographs are unavailable.
  // Empty recognition sections or placeholder notices do not appear on the public website.
  return null;
};

export default RecognitionGallery;
