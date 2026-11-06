import React from 'react';
import { SupportedLanguage } from '@/types';
import { GraniteCategoryBadge } from './GraniteCategoryBadge';
import { WhatsAppButton } from '@/components/contact/WhatsAppButton';
import { Button } from '@/components/common/Button';
import { Layers } from 'lucide-react';

interface GraniteCardProps {
  name: string;
  finish: string;
  tone: string;
  description?: string;
  lang?: SupportedLanguage;
  className?: string;
}

export const GraniteCard: React.FC<GraniteCardProps> = ({
  name,
  finish,
  tone,
  description,
  lang = 'en',
  className = '',
}) => {
  const quoteMessage = `Hello Siva Kumar, I would like to enquire about ${name} granite quotations and availability.`;

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 hover:border-brand-sandstone shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Granite slab thumbnail / visual representation placeholder */}
        <div className="relative h-36 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center text-slate-500 text-xs mb-4 border border-slate-200/60 overflow-hidden">
          <Layers className="w-8 h-8 text-brand-sandstone-700/60 mb-1" aria-hidden="true" />
          <span className="font-semibold text-slate-600">{name}</span>
          <span className="text-[10px] text-slate-500">[Verified Slab Visual]</span>
        </div>

        {/* Badges for Tone & Finish */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <GraniteCategoryBadge label={tone} variant="sandstone" />
          <GraniteCategoryBadge label={finish} variant="charcoal" />
        </div>

        {/* Variety Title */}
        <h3 className="text-base font-bold text-brand-charcoal mb-1 leading-snug">
          {name}
        </h3>

        {description && (
          <p className="text-xs text-slate-600 mb-4 leading-relaxed font-normal">
            {description}
          </p>
        )}

        <div className="border-t border-slate-100 pt-3 mb-4 text-[11px] text-slate-500">
          <span>{lang === 'ta' ? 'ஃபினிஷிங்:' : 'Surface Finish:'} </span>
          <span className="font-semibold text-slate-700">{finish}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
        <WhatsAppButton
          variant="full"
          size="sm"
          category="granite"
          lang={lang}
          customMessage={quoteMessage}
          label={lang === 'ta' ? 'விலைப்பட்டியல் கேட்க' : 'Get Quotation'}
        />
        <Button
          href={`/${lang}/contact?service=granite&variety=${encodeURIComponent(name)}`}
          variant="outline"
          size="sm"
          fullWidth
        >
          {lang === 'ta' ? 'விசாரணை படிவம்' : 'Enquiry Form'}
        </Button>
      </div>
    </div>
  );
};

export default GraniteCard;
