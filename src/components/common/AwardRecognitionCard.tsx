import React from 'react';
import Image from 'next/image';
import { AwardItem, SupportedLanguage } from '@/types';
import { Award } from 'lucide-react';

interface AwardRecognitionCardProps {
  award: AwardItem;
  lang: SupportedLanguage;
  className?: string;
}

const CATEGORY_STYLES: Record<
  AwardItem['category'],
  { badgeBg: string; badgeText: string; borderColor: string }
> = {
  lic: {
    badgeBg: 'bg-brand-navy-50',
    badgeText: 'text-brand-navy',
    borderColor: 'border-brand-navy-200',
  },
  'new-india': {
    badgeBg: 'bg-slate-100',
    badgeText: 'text-brand-charcoal',
    borderColor: 'border-slate-300',
  },
  'star-health': {
    badgeBg: 'bg-brand-teal-50',
    badgeText: 'text-brand-teal-900',
    borderColor: 'border-brand-teal-200',
  },
  granite: {
    badgeBg: 'bg-brand-sandstone-50',
    badgeText: 'text-brand-charcoal',
    borderColor: 'border-brand-sandstone-300',
  },
};

export const AwardRecognitionCard: React.FC<AwardRecognitionCardProps> = ({
  award,
  lang,
  className = '',
}) => {
  // Never display unverified or fictional awards to customers
  if (!award.isVerified) {
    return null;
  }

  const styles = CATEGORY_STYLES[award.category] || CATEGORY_STYLES.lic;
  const altText = award.altText[lang] || award.altText.en;
  const titleText = award.title ? (award.title[lang] || award.title.en) : null;
  const captionText = award.caption ? (award.caption[lang] || award.caption.en) : null;

  return (
    <div
      className={`rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col ${className}`}
    >
      {/* Photo with clean aspect ratio */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        <Image
          src={award.imageSrc}
          alt={altText}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Company attribution badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs border ${styles.badgeBg} ${styles.badgeText} ${styles.borderColor}`}
          >
            <Award className="w-3 h-3" aria-hidden="true" />
            <span>{award.companyName}</span>
          </span>
        </div>
      </div>

      {/* Content block: only display verified details */}
      {(titleText || captionText || award.year) && (
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              {titleText && (
                <h4 className="text-sm font-bold text-brand-navy">{titleText}</h4>
              )}
              {award.year && (
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                  {award.year}
                </span>
              )}
            </div>

            {captionText && (
              <p className="text-xs text-slate-600 leading-relaxed">{captionText}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AwardRecognitionCard;

