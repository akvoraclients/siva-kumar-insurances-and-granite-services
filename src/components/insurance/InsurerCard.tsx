import React from 'react';
import { SupportedLanguage } from '@/types';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { WhatsAppButton } from '@/components/contact/WhatsAppButton';
import { Button } from '@/components/common/Button';

interface InsurerCardProps {
  id: string;
  name: string;
  shortName: string;
  services: string[];
  lang?: SupportedLanguage;
  enquireLabel?: string;
  className?: string;
}

export const InsurerCard: React.FC<InsurerCardProps> = ({
  id,
  name,
  shortName,
  services = [],
  lang = 'en',
  enquireLabel = 'Enquire on WhatsApp',
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 hover:border-brand-teal/50 shadow-xs hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Top header badge - factual services description */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-navy-50 text-brand-navy flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-brand-teal" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-navy-700">
              {lang === 'ta' ? 'காப்பீட்டு வழிகாட்டல்' : 'Insurance Guidance'}
            </span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold border bg-slate-100 text-slate-700 border-slate-200">
            {lang === 'ta' ? 'வாடிக்கையாளர் உதவி' : 'Customer Assistance'}
          </span>
        </div>

        {/* Company Title (Text-based, clean, no unofficial logos, distinct from SIVA INSURANCES & GRANITE SERVICES) */}
        <h3 className="text-xl font-extrabold text-brand-navy mb-1 leading-snug">
          {shortName}
        </h3>
        <p className="text-xs text-slate-500 font-medium mb-4">
          {name}
        </p>

        {/* Services provided */}
        <div className="border-t border-slate-100 pt-3.5 mb-5">
          <p className="text-xs font-semibold text-slate-700 mb-2">
            {lang === 'ta' ? 'வழங்கப்படும் சேவைகள்:' : 'Services Offered:'}
          </p>
          <ul className="space-y-2" aria-label={`Services offered for ${shortName}`}>
            {services.map((service, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                <CheckCircle2
                  className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Official Portal Notice */}
        <p className="text-[11px] text-slate-500 italic mb-5 border-t border-slate-100 pt-3">
          {lang === 'ta'
            ? 'அனைத்து விண்ணப்பங்களும் அதிகாரப்பூர்வ இணையதளம் மூலம் மட்டுமே செயல்படுத்தப்படும்.'
            : 'Applications and servicing are handled through the respective official insurance company portals.'}
        </p>
      </div>

      {/* Direct Contact Actions */}
      <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
        <Button
          href={`/${lang}/contact?service=insurance&company=${id}`}
          variant="primary"
          size="sm"
          fullWidth
        >
          {lang === 'ta' ? 'ஆன்லைன் விசாரணை' : 'Online Form Enquiry'}
        </Button>
        <WhatsAppButton
          variant="full"
          size="sm"
          category="insurance"
          lang={lang}
          customMessage={`Hello Siva Kumar, I would like to enquire about ${shortName} services.`}
          label={enquireLabel}
        />
      </div>
    </div>
  );
};

export default InsurerCard;
