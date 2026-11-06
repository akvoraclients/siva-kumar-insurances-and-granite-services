import React from 'react';
import { SupportedLanguage } from '@/types';
import { getDictionary } from '@/lib/dictionary';
import { BUSINESS_INFO, CONTACT_STATUS_MESSAGES } from '@/lib/constants';
import { Container } from '@/components/common/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PhoneButton } from '@/components/contact/PhoneButton';
import { WhatsAppButton } from '@/components/contact/WhatsAppButton';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { MapPin, Phone, Mail, Info, MessageSquare } from 'lucide-react';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function ContactPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang: SupportedLanguage = resolvedParams.lang === 'ta' ? 'ta' : 'en';
  const dict = getDictionary(lang);
  const contactStatus = CONTACT_STATUS_MESSAGES[lang] || CONTACT_STATUS_MESSAGES.en;

  return (
    <Container className="py-6 sm:py-8 md:py-10">
      <SectionHeader
        title={dict.contact?.title || (lang === 'ta' ? 'சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் தொடர்புக்கு' : 'Contact SIVA INSURANCES & GRANITE SERVICES')}
        subtitle={
          dict.contact?.subtitle ||
          (lang === 'ta'
            ? 'நேரடி தொலைபேசி அழைப்பு அல்லது இணையவழி படிவம் மூலம் சிவகுமார் அவர்களை நேரடியாக தொடர்பு கொள்ளலாம்.'
            : 'Reach out directly by phone or via our online enquiry form for personal assistance from Siva Kumar.')
        }
        badge="Contact"
        theme="navy"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
        {/* Contact Info & Direct CTAs */}
        <div className="space-y-5 sm:space-y-6">
          {/* Quick Direct Buttons Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
            <h2 className="text-base font-bold text-brand-navy mb-2">
              {dict.contact?.directChannels || 'Direct Contact Channels'}
            </h2>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              {lang === 'ta'
                ? 'காப்பீட்டு ஆலோசனைகள் மற்றும் கிரானைட் கொள்முதல் வழிகாட்டலுக்கு சிவகுமார் அவர்களை நேரடியாக அழைக்கவும்.'
                : 'Call Siva Kumar directly for insurance consultations and granite inquiries.'}
            </p>

            {/* Both Phone Buttons with proper tel: links and Indian format */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
              <a
                href="tel:+919894829633"
                className="inline-flex items-center justify-center font-semibold rounded-xl transition-colors focus:ring-2 focus:ring-offset-2 select-none bg-[#17324D] text-white hover:bg-[#10263A] active:bg-[#0c1e2e] shadow-xs focus:ring-[#278C83] py-2.5 px-4 text-sm min-h-[44px] gap-2 w-full"
                aria-label="Call Primary: +91 98948 29633"
              >
                <Phone className="w-4 h-4 shrink-0 text-teal-300" aria-hidden="true" />
                <span>+91 98948 29633</span>
              </a>

              <a
                href="tel:+919080445622"
                className="inline-flex items-center justify-center font-semibold rounded-xl transition-colors focus:ring-2 focus:ring-offset-2 select-none border-2 border-[#17324D] bg-transparent text-[#17324D] hover:bg-[#17324D] hover:text-white active:bg-[#10263A] focus:ring-[#278C83] py-2.5 px-4 text-sm min-h-[44px] gap-2 w-full"
                aria-label="Call Secondary: +91 90804 45622"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>+91 90804 45622</span>
              </a>
            </div>

            {/* Direct WhatsApp Chat Channel */}
            <a
              href="https://wa.me/919894829633"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold rounded-xl transition-colors focus:ring-2 focus:ring-offset-2 select-none bg-[#25D366] text-white hover:bg-[#1DA851] active:bg-[#178a42] shadow-xs focus:ring-[#25D366] py-2.5 px-4 text-sm min-h-[44px] gap-2 w-full"
              aria-label="Chat on WhatsApp: +91 98948 29633"
            >
              <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{lang === 'ta' ? 'வாட்ஸ்அப் அரட்டை (+91 98948 29633)' : 'WhatsApp Chat (+91 98948 29633)'}</span>
            </a>
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-brand-navy mb-2">
              {dict.common?.addressLabel || 'Office & Location Information'}
            </h2>

            <div className="flex items-start gap-3 text-xs text-slate-700">
              <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-900">{lang === 'ta' ? 'அலுவலக முகவரி' : 'Office Address'}</p>
                <p className="text-slate-600 leading-relaxed mt-0.5">
                  {BUSINESS_INFO.address}
                </p>
              </div>
            </div>

            {/* Both Phone numbers displayed clearly */}
            <div className="flex items-start gap-3 text-xs text-slate-700">
              <Phone className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-900">{lang === 'ta' ? 'தொலைபேசி எண்கள்' : 'Telephone Numbers'}</p>
                <div className="flex flex-col gap-1.5 mt-1">
                  <a
                    href="tel:+919894829633"
                    className="text-brand-navy font-bold hover:text-brand-teal transition-colors flex items-center gap-2"
                  >
                    <span>+91 98948 29633</span>
                    <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md font-semibold border border-teal-200">
                      {lang === 'ta' ? 'முதன்மை' : 'Primary'}
                    </span>
                  </a>
                  <a
                    href="tel:+919080445622"
                    className="text-brand-navy font-bold hover:text-brand-teal transition-colors flex items-center gap-2"
                  >
                    <span>+91 90804 45622</span>
                    <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-semibold border border-slate-200">
                      {lang === 'ta' ? 'இரண்டாவது' : 'Secondary'}
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Email Address */}
            {BUSINESS_INFO.email && (
              <div className="flex items-start gap-3 text-xs text-slate-700">
                <Mail className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-slate-900">{lang === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'Email Address'}</p>
                  <div className="mt-1">
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="text-brand-navy font-bold hover:text-brand-teal transition-colors break-all"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-brand-light border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
              <Info className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" aria-hidden="true" />
              <p className="leading-relaxed">
                {lang === 'ta'
                  ? 'நேரடி சேவை ஆலோசனைகளுக்கு தொலைபேசி வாயிலாகவோ அல்லது ஆன்லைன் படிவம் மூலமாகவோ முன்கூட்டியே தொடர்பு கொள்ளவும்.'
                  : 'For personalized assistance, contact Siva Kumar by telephone or submit the enquiry form below.'}
              </p>
            </div>
          </div>
        </div>

        {/* Formspree Enquiry Form */}
        <div>
          <EnquiryForm lang={lang} defaultCategory="general" />
        </div>
      </div>
    </Container>
  );
}
