import React from 'react';
import { SupportedLanguage } from '@/types';
import { REGULATORY_DISCLAIMER } from '@/lib/constants';
import { ShieldCheck } from 'lucide-react';

interface ComplianceNoticeProps {
  lang?: SupportedLanguage;
  className?: string;
}

export const ComplianceNotice: React.FC<ComplianceNoticeProps> = ({
  lang = 'en',
  className = '',
}) => {
  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-brand-navy-50/70 border border-brand-navy-200/80 text-xs text-brand-navy-900 ${className}`}
      role="note"
      aria-label="Insurance Regulatory Disclosure"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck
          className="w-5 h-5 text-brand-teal shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div className="space-y-1">
          <p className="font-bold text-brand-navy text-xs uppercase tracking-wider">
            {lang === 'ta' ? 'காப்பீட்டு வழிகாட்டல் & சட்டப்பூர்வ தகவல்' : 'Insurance Regulatory Disclosure'}
          </p>
          <p className="text-slate-700 leading-relaxed font-normal">
            {REGULATORY_DISCLAIMER[lang]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplianceNotice;
