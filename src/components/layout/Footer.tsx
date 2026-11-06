import React from 'react';
import Link from 'next/link';
import { SupportedLanguage } from '@/types';
import { BUSINESS_INFO, BRAND_TAGLINE, REGULATORY_DISCLAIMER, CONTACT_STATUS_MESSAGES } from '@/lib/constants';
import { Logo } from '@/components/common/Logo';
import { ShieldCheck, Phone, MapPin, Mail, MessageSquare, Clock } from 'lucide-react';

interface FooterProps {
  lang: SupportedLanguage;
  dict: Record<string, any>;
}

export const Footer: React.FC<FooterProps> = ({ lang, dict }) => {
  const contactStatus = CONTACT_STATUS_MESSAGES[lang] || CONTACT_STATUS_MESSAGES.en;

  return (
    <footer className="bg-brand-charcoal text-slate-300 pt-10 pb-10 md:pt-12 md:pb-12 border-t border-brand-charcoal-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 pb-8 border-b border-brand-charcoal-700">
          {/* Brand Identity & Overview */}
          <div className="md:col-span-2">
            <Logo lang={lang} variant="footer" showTagline={false} className="mb-4" />
            <p className="text-sm font-medium text-teal-300 mb-2">
              {BRAND_TAGLINE[lang]}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md mb-3">
              {dict.brand?.positioning ||
                'A professional business providing insurance-related assistance and granite selection and purchase coordination in Hosur, Tamil Nadu.'}
            </p>
            <p className="text-xs text-slate-400">
              <strong>{BUSINESS_INFO.owner}</strong> — Principal Advisor & Coordinator
            </p>
          </div>

          {/* Service Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Services & Divisions
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link
                  href={`/${lang}/insurance`}
                  className="hover:text-brand-teal transition-colors py-0.5 inline-block"
                >
                  {dict.nav?.insurance || 'Insurance Services'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/granites`}
                  className="hover:text-brand-sandstone transition-colors py-0.5 inline-block"
                >
                  {dict.nav?.granites || 'Siva Granites'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/granites/catalogue`}
                  className="hover:text-brand-sandstone transition-colors py-0.5 inline-block"
                >
                  {dict.nav?.catalogue || 'Granite Catalogue'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/about`}
                  className="hover:text-white transition-colors py-0.5 inline-block"
                >
                  {dict.nav?.about || 'About'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="hover:text-white transition-colors py-0.5 inline-block"
                >
                  {dict.nav?.contact || 'Contact'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Contact Information */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {dict.common?.addressLabel || 'Office & Contact'}
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed">{BUSINESS_INFO.address}</span>
              </div>

              {/* Both Telephone Numbers */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-teal shrink-0 mt-1" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+919894829633"
                    className="hover:text-white transition-colors font-medium text-slate-300 py-1.5 inline-flex items-center gap-1.5 min-h-[32px]"
                  >
                    <span>+91 98948 29633</span>
                    <span className="text-teal-400 text-[10px]">({lang === 'ta' ? 'முதன்மை' : 'Primary'})</span>
                  </a>
                  <a
                    href="tel:+919080445622"
                    className="hover:text-white transition-colors font-medium text-slate-300 py-1.5 inline-flex items-center gap-1.5 min-h-[32px]"
                  >
                    <span>+91 90804 45622</span>
                    <span className="text-slate-400 text-[10px]">({lang === 'ta' ? 'இரண்டாவது' : 'Secondary'})</span>
                  </a>
                </div>
              </div>

              {/* Email Address */}
              {BUSINESS_INFO.email && (
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" aria-hidden="true" />
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="hover:text-white transition-colors text-slate-300 break-all py-1 inline-block"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Factual Regulatory & Agency Disclosure */}
        <div className="my-6 p-4 sm:p-5 rounded-2xl bg-brand-charcoal-900 border border-brand-charcoal-700 text-xs text-slate-300">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold text-white mb-1.5">
                {dict.common?.disclaimer || 'Insurance Agency Disclosure'}
              </p>
              <p className="text-slate-300 leading-relaxed">
                {REGULATORY_DISCLAIMER[lang]}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Attribution & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-300 gap-2">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
          <p>{BUSINESS_INFO.location}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
