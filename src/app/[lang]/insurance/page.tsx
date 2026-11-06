import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SupportedLanguage } from '@/types';
import { getDictionary } from '@/lib/dictionary';
import { generateSeoMetadata } from '@/lib/seo';
import { Container } from '@/components/common/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/common/Button';
import { OwnerProfile } from '@/components/common/OwnerProfile';
import { ExperienceHighlight } from '@/components/common/ExperienceHighlight';
import { RecognitionGallery } from '@/components/common/RecognitionGallery';
import { ComplianceNotice } from '@/components/insurance/ComplianceNotice';
import { InsuranceEnquiryForm } from '@/components/forms/InsuranceEnquiryForm';
import { hasVerifiedAwards } from '@/lib/recognition';
import {
  Shield,
  HeartPulse,
  Car,
  FileSearch,
  FileText,
  RefreshCw,
  FileCheck2,
  Edit3,
  Users,
  ArrowRight,
  HelpCircle,
  MapPin,
  Clock,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const lang: SupportedLanguage = resolved.lang === 'ta' ? 'ta' : 'en';

  const title =
    lang === 'ta'
      ? 'காப்பீட்டு சேவைகள் | எல்.ஐ.சி, நியூ இந்தியா, ஸ்டார் ஹெல்த்'
      : 'Insurance Services | LIC, New India Assurance, Star Health in Hosur';

  const description =
    lang === 'ta'
      ? 'ஓசூரில் எல்.ஐ.சி, தி நியூ இந்தியா அஷ்யூரன்ஸ் மற்றும் ஸ்டார் ஹெல்த் இன்சூரன்ஸ் பாலிசி வழிகாட்டல், விண்ணப்ப உதவி, புதுப்பித்தல் மற்றும் க்ளெய்ம் ஆவண ஆதரவு.'
      : 'Personal assistance for LIC life insurance, New India Assurance general insurance, and Star Health insurance in Hosur and surrounding areas.';

  return generateSeoMetadata(lang, title, description);
}

export default async function InsurancePage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang: SupportedLanguage = resolvedParams.lang === 'ta' ? 'ta' : 'en';
  const dict = getDictionary(lang);
  const ins = dict.insurance || {};
  const hero = ins.hero || {};
  const companies = ins.companies || {};
  const services = ins.servicesProvided || {};
  const processData = ins.process || {};
  const faqData = ins.faq || {};
  const ctaData = ins.cta || {};

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-8 md:pb-12">
      {/* =========================================================================
          SECTION 1 – INSURANCE HERO
          Clean, trust-oriented hero introducing Siva Kumar's agency assistance
          ========================================================================= */}
      <section className="relative overflow-hidden py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-b from-brand-navy-50/70 via-white to-brand-light border-b border-slate-200/80">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading, description, scope, CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-navy-200/80 shadow-xs text-xs font-semibold text-brand-navy mb-5">
                <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" aria-hidden="true" />
                <span>{hero.badge || (lang === 'ta' ? 'சிவகுமார் | ஓசூரை மையமாகக் கொண்டு செயல்படுகிறார்' : 'Siva Kumar | Based in Hosur')}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-[1.15] mb-5">
                {hero.heading || (lang === 'ta' ? 'நீங்கள் நாடக்கூடிய தனிப்பட்ட காப்பீட்டு வழிகாட்டல்' : 'Insurance Assistance You Can Reach Out For')}
              </h1>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6 max-w-2xl">
                {hero.description ||
                  (lang === 'ta'
                    ? 'சிவகுமார் அவர்கள் தனது காப்பீட்டு முகவர் தொடர்புகள் மூலம் காப்பீட்டு விசாரணைகள், பாலிசி விண்ணப்பங்கள், புதுப்பித்தல் மற்றும் பாலிசிதாரர் சேவைகளுக்கான நேரடி உதவியை வழங்குகிறார்.'
                    : 'Siva Kumar provides personal assistance for insurance enquiries, policy applications, renewals and policyholder servicing through his insurance agency relationships.')}
              </p>

              {/* Location Scope Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 mb-8 shadow-2xs">
                <MapPin className="w-4 h-4 text-brand-teal shrink-0" aria-hidden="true" />
                <span>
                  <strong>{lang === 'ta' ? 'சேவை பகுதி:' : 'Service Area:'}</strong>{' '}
                  {hero.location || (lang === 'ta' ? 'ஓசூர் மற்றும் சுற்றியுள்ள பகுதிகள்.' : 'Hosur and surrounding areas.')}
                </span>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  href="#enquiry"
                  variant="primary"
                  size="lg"
                  icon={<Shield className="w-4 h-4 text-brand-teal" aria-hidden="true" />}
                  className="sm:w-auto"
                >
                  {hero.ctaEnquiry || (lang === 'ta' ? 'காப்பீட்டு விசாரணை சமர்ப்பிக்க' : 'Submit an Insurance Enquiry')}
                </Button>

                <Button
                  href={`/${lang}/contact`}
                  variant="outline"
                  size="lg"
                  className="sm:w-auto"
                >
                  {hero.ctaContact || (lang === 'ta' ? 'எங்களை தொடர்புகொள்ள' : 'Contact Us')}
                </Button>
              </div>
            </div>

            {/* Right Column: Siva Kumar Owner Profile & Experience Highlight */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <OwnerProfile lang={lang} variant="hero" />
              <ExperienceHighlight lang={lang} variant="compact" context="insurance" />
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2 – INSURANCE COMPANIES
          Separate cards for LIC, New India Assurance, and Star Health
          ========================================================================= */}
      <section className="relative">
        <Container>
          <SectionHeader
            title={companies.title || (lang === 'ta' ? 'எங்கள் காப்பீட்டு சேவைகள்' : 'Our Insurance Services')}
            subtitle={
              companies.subtitle ||
              (lang === 'ta'
                ? 'மூன்று முன்னணி காப்பீட்டு நிறுவனங்களுக்கான தனிப்பட்ட வழிகாட்டல் மற்றும் அதிகாரப்பூர்வ விண்ணப்ப உதவி.'
                : 'Personal guidance and official portal application assistance for three leading insurance institutions.')
            }
            badge={companies.badge || (lang === 'ta' ? 'முகமை தொடர்புகள்' : 'Agency Representation')}
            theme="navy"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Company A: LIC */}
            <div className="rounded-3xl bg-white border border-brand-navy-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-navy-50 text-brand-navy border border-brand-navy-200">
                    <Shield className="w-3.5 h-3.5 text-brand-teal" aria-hidden="true" />
                    <span>{companies.lic?.category || 'Life Insurance'}</span>
                  </span>
                  <span className="text-xs font-bold text-slate-400">01</span>
                </div>

                <h3 className="text-xl font-extrabold text-brand-navy mb-1">
                  {companies.lic?.shortName || 'LIC'}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-3">
                  {companies.lic?.fullName || 'Life Insurance Corporation of India'}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  {companies.lic?.description ||
                    'Assistance with LIC insurance enquiries, policy application procedures and existing policyholder requirements.'}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {lang === 'ta' ? 'சேவை வரம்பு:' : 'Services Available:'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    {(companies.lic?.services || [
                      'Policy enquiries',
                      'Application assistance',
                      'Renewal support',
                      'Claims assistance',
                      'Policy information updates',
                    ]).map((srv: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal shrink-0" aria-hidden="true" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button href="#enquiry" variant="outline" size="sm" fullWidth>
                {lang === 'ta' ? 'எல்.ஐ.சி விசாரணை' : 'Enquire About LIC'}
              </Button>
            </div>

            {/* Company B: NEW INDIA ASSURANCE */}
            <div className="rounded-3xl bg-white border border-slate-300 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-brand-charcoal border border-slate-300">
                    <Car className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                    <span>{companies.newIndia?.category || 'General Insurance'}</span>
                  </span>
                  <span className="text-xs font-bold text-slate-400">02</span>
                </div>

                <h3 className="text-xl font-extrabold text-brand-navy mb-1">
                  {companies.newIndia?.shortName || 'New India Assurance'}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-3">
                  {companies.newIndia?.fullName || 'The New India Assurance Co. Ltd.'}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  {companies.newIndia?.description ||
                    'Assistance with New India Assurance enquiries, relevant policy application procedures and policyholder servicing.'}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {lang === 'ta' ? 'சேவை வரம்பு:' : 'Services Available:'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    {(companies.newIndia?.services || [
                      'Insurance enquiries',
                      'Application assistance',
                      'Renewal support',
                      'Claims assistance',
                      'Policy information updates',
                    ]).map((srv: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal shrink-0" aria-hidden="true" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button href="#enquiry" variant="outline" size="sm" fullWidth>
                {lang === 'ta' ? 'நியூ இந்தியா விசாரணை' : 'Enquire About New India'}
              </Button>
            </div>

            {/* Company C: STAR HEALTH INSURANCE */}
            <div className="rounded-3xl bg-white border border-brand-teal-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-teal-50 text-brand-teal-900 border border-brand-teal-200">
                    <HeartPulse className="w-3.5 h-3.5 text-brand-teal" aria-hidden="true" />
                    <span>{companies.starHealth?.category || 'Health Insurance'}</span>
                  </span>
                  <span className="text-xs font-bold text-slate-400">03</span>
                </div>

                <h3 className="text-xl font-extrabold text-brand-navy mb-1">
                  {companies.starHealth?.shortName || 'Star Health Insurance'}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-3">
                  {companies.starHealth?.fullName || 'Star Health and Allied Insurance'}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  {companies.starHealth?.description ||
                    'Assistance with Star Health insurance enquiries, application procedures and existing policyholder requirements.'}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {lang === 'ta' ? 'சேவை வரம்பு:' : 'Services Available:'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    {(companies.starHealth?.services || [
                      'Health insurance enquiries',
                      'Application assistance',
                      'Renewal support',
                      'Claims assistance',
                      'Policy information updates',
                    ]).map((srv: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal shrink-0" aria-hidden="true" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button href="#enquiry" variant="outline" size="sm" fullWidth>
                {lang === 'ta' ? 'ஸ்டார் ஹெல்த் விசாரணை' : 'Enquire About Star Health'}
              </Button>
            </div>
          </div>

          {/* Statutory Portal & Entity Notice */}
          <div className="p-4 rounded-2xl bg-brand-light border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <Info className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              {companies.portalNotice ||
                'All applications and payments are processed directly through the respective official insurance company portals. SIVA INSURANCES & GRANITE SERVICES is an independent service firm and does not underwrite policies or hold customer premium funds.'}
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3 – SERVICES PROVIDED
          6 Cards: New Policy, Applications, Renewals, Claims, Updates, Support
          ========================================================================= */}
      <section className="relative py-12 bg-white border-y border-slate-200/80">
        <Container>
          <SectionHeader
            title={services.title || (lang === 'ta' ? 'வாடிக்கையாளர்களுக்கு நாங்கள் எவ்வாறு உதவுகிறோம்' : 'How We Assist Our Customers')}
            subtitle={
              services.subtitle ||
              (lang === 'ta'
                ? 'உங்கள் காப்பீட்டு தேவைகளின் ஒவ்வொரு கட்டத்திலும் வெளிப்படையான, நேரடி வழிகாட்டல் ஆதரவு.'
                : 'Transparent, direct advisory support across every stage of your insurance requirements.')
            }
            badge={services.badge || (lang === 'ta' ? 'சேவை வரம்பு' : 'Scope of Assistance')}
            theme="teal"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(services.items || [
              {
                id: 'new-policy',
                title: 'New Policy Enquiries',
                desc: 'Discussing individual, family, or commercial insurance requirements to help you identify suitable policy options from LIC, New India Assurance, or Star Health.',
              },
              {
                id: 'application',
                title: 'Policy Application Assistance',
                desc: "Step-by-step assistance in accurately completing proposal forms and submitting applications directly on the respective insurer's official portal.",
              },
              {
                id: 'renewal',
                title: 'Policy Renewal Support',
                desc: 'Timely reminders, premium receipt guidance, and official online payment assistance to ensure uninterrupted insurance coverage.',
              },
              {
                id: 'claims',
                title: 'Claims Assistance',
                desc: 'Clear guidance on required documentation, claim intimation procedures, and portal submission for hospitalization, maturity, or damage claims.',
              },
              {
                id: 'updates',
                title: 'Policy Information Updates',
                desc: 'Assistance with official requests for address modifications, contact details updates, and nominee endorsements in existing policies.',
              },
              {
                id: 'existing-support',
                title: 'Existing Customer Support',
                desc: 'Continuing local support for any policy-related questions, status enquiries, or servicing needs in Hosur and surrounding areas.',
              },
            ]).map((item: any, idx: number) => {
              const icons = [
                <FileSearch key="0" className="w-5 h-5 text-brand-teal" aria-hidden="true" />,
                <FileText key="1" className="w-5 h-5 text-brand-navy" aria-hidden="true" />,
                <RefreshCw key="2" className="w-5 h-5 text-brand-teal" aria-hidden="true" />,
                <FileCheck2 key="3" className="w-5 h-5 text-brand-navy" aria-hidden="true" />,
                <Edit3 key="4" className="w-5 h-5 text-brand-teal" aria-hidden="true" />,
                <Users key="5" className="w-5 h-5 text-brand-navy" aria-hidden="true" />,
              ];

              return (
                <div
                  key={item.id || idx}
                  className="p-6 rounded-2xl bg-brand-light border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-2xs">
                    {icons[idx % icons.length]}
                  </div>
                  <h4 className="text-base font-bold text-brand-navy mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4 – CUSTOMER JOURNEY
          4-step process timeline explaining the official portal procedure
          ========================================================================= */}
      <section className="relative">
        <Container>
          <SectionHeader
            title={processData.title || (lang === 'ta' ? 'காப்பீட்டு சேவை எவ்வாறு செயல்படுகிறது' : 'How the Insurance Process Works')}
            subtitle={
              processData.subtitle ||
              (lang === 'ta'
                ? 'முழுமையான வெளிப்படைத்தன்மையுடன் கூடிய 4-படி ஆலோசனை வழிமுறை.'
                : 'A straightforward 4-step consultation process with complete transparency.')
            }
            badge={processData.badge || (lang === 'ta' ? 'வெளிப்படையான வழிமுறை' : 'Transparent Workflow')}
            theme="navy"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {(processData.steps || [
              {
                step: '01',
                title: 'Understand Customer Requirements',
                desc: 'We listen to your specific coverage requirements—whether life protection, family health coverage, or general property insurance.',
              },
              {
                step: '02',
                title: 'Explain Relevant Insurance Information',
                desc: 'We explain key terms, policy benefits, exclusions, and premium illustrations in plain language so you make well-informed decisions.',
              },
              {
                step: '03',
                title: 'Complete Application Through Official Insurer Process',
                desc: 'The application is securely submitted directly through the official insurer portal, ensuring verified documentation and official receipts.',
              },
              {
                step: '04',
                title: 'Provide Appropriate Policyholder Support',
                desc: 'Receive ongoing assistance with renewal dates, policy servicing, and documentation support whenever claims arise.',
              },
            ]).map((st: any, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-brand-navy-100 shadow-xs flex flex-col justify-start relative"
              >
                <span className="w-9 h-9 rounded-xl bg-brand-navy text-white text-xs font-black flex items-center justify-center shrink-0 mb-4 shadow-2xs">
                  {st.step}
                </span>
                <h4 className="text-sm font-bold text-brand-navy mb-2">
                  {st.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Underwriting and Decision Disclaimer */}
          <div className="p-4 rounded-2xl bg-brand-light border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <Info className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              {processData.disclaimer ||
                'Important Disclosure: Policy issuance, underwriting, premiums, benefits, terms, conditions, and claims decisions are strictly controlled by the respective insurance company (LIC, The New India Assurance Co. Ltd., or Star Health and Allied Insurance) and subject to its regulatory terms. SIVA INSURANCES & GRANITE SERVICES acts as a service facilitator and insurance agent, not an insurance underwriter.'}
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5 – EXPERIENCE & PROFESSIONAL PROFILE
          OwnerProfile and ExperienceHighlight (~18 Years combined experience)
          ========================================================================= */}
      <section className="relative">
        <Container size="narrow">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-navy-50 text-brand-navy border border-brand-navy-200 mb-2">
                    {lang === 'ta' ? 'தொழில்முறை சுயவிவரம்' : 'Professional Profile'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                    Siva Kumar
                  </h2>
                  <p className="text-xs font-semibold text-brand-teal mt-1">
                    {lang === 'ta' ? 'சிவகுமார் | ஓசூரை மையமாகக் கொண்டு செயல்படுகிறார்' : 'Siva Kumar | Based in Hosur'}
                  </p>
                </div>

                <div className="shrink-0">
                  <Button href={`/${lang}/about`} variant="outline" size="sm">
                    {lang === 'ta' ? 'எங்களைப் பற்றி மேலும் அறிய' : 'Learn More About Us'}
                  </Button>
                </div>
              </div>

              {/* Framed Owner Profile presentation */}
              <OwnerProfile lang={lang} variant="card" showBio={false} className="border-0 p-0 shadow-none mb-4" />

              {/* Prominent Combined Experience Highlight Card */}
              <ExperienceHighlight lang={lang} variant="card" context="insurance" />
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 6 – COMPANY RECOGNITION
          Only shows when genuine verified award photographs exist
          ========================================================================= */}
      {hasVerifiedAwards() && (
        <section className="relative">
          <Container>
            <div className="space-y-6">
              <SectionHeader
                title={lang === 'ta' ? 'நிறுவன அங்கீகாரங்கள்' : 'Company Recognition'}
                subtitle={
                  lang === 'ta'
                    ? 'எல்.ஐ.சி, நியூ இந்தியா அஷ்யூரன்ஸ் மற்றும் ஸ்டார் ஹெல்த் நிறுவனங்களுடனான எங்கள் நேரடி கூட்டுறவின் சரிபார்க்கப்பட்ட பதிவுகள்.'
                    : 'Verified recognition and certificates presented by our partner insurance institutions.'
                }
                badge={lang === 'ta' ? 'நற்சான்றிதழ்கள்' : 'Credentials'}
                theme="navy"
                align="center"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RecognitionGallery lang={lang} category="lic" />
                <RecognitionGallery lang={lang} category="new-india" />
                <RecognitionGallery lang={lang} category="star-health" />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* =========================================================================
          SECTION 7 – FREQUENTLY ASKED QUESTIONS
          7 Factual, transparent Q&A entries
          ========================================================================= */}
      <section className="relative">
        <Container size="narrow">
          <SectionHeader
            title={faqData.title || (lang === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions')}
            subtitle={
              faqData.subtitle ||
              (lang === 'ta'
                ? 'எங்கள் காப்பீட்டு உதவி சேவைகள் பற்றிய தெளிவான, வெளிப்படையான பதில்கள்.'
                : 'Clear, factual answers regarding our insurance assistance services.')
            }
            badge={faqData.badge || (lang === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Common Enquiries')}
            theme="teal"
            align="center"
          />

          <div className="space-y-4">
            {(faqData.items || [
              {
                q: 'Which insurance companies does Siva Kumar work with?',
                a: 'Siva Kumar provides insurance agency assistance representing Life Insurance Corporation of India (LIC) for life insurance, The New India Assurance Co. Ltd. for general insurance, and Star Health and Allied Insurance for health insurance.',
              },
              {
                q: 'Where are insurance assistance services available?',
                a: 'Insurance assistance services are primarily provided for customers residing in Hosur and surrounding areas, allowing for direct, personalized coordination.',
              },
              {
                q: 'Can I enquire about a new insurance policy?',
                a: 'Yes. You can enquire about new life, health, motor, or property insurance policies. Siva Kumar will discuss suitable options and explain terms before assisting you with the official insurer application.',
              },
              {
                q: 'Can existing policyholders receive renewal assistance?',
                a: 'Yes. Existing policyholders of LIC, New India Assurance, and Star Health Insurance can receive assistance with renewal premium payments and official receipt generation.',
              },
              {
                q: 'Can I request assistance with an insurance claim?',
                a: 'Yes. We assist policyholders with understanding required claim documents, completing forms, and submitting them through the appropriate official insurer procedures. Final claim decisions and settlements rest entirely with the respective insurance company.',
              },
              {
                q: 'How are insurance applications submitted?',
                a: 'All insurance applications and premium payments are processed directly through the respective official insurance company portals. SIVA INSURANCES & GRANITE SERVICES does not collect or hold premium funds directly.',
              },
              {
                q: 'Can I request assistance with policy information updates?',
                a: 'Yes. We help policyholders prepare and submit official requests for contact updates, address changes, and nominee modifications to their respective insurance company.',
              },
            ]).map((item: any, idx: number) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-brand-navy-50 text-brand-navy flex items-center justify-center shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4 text-brand-teal" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-brand-navy mb-2">
                      {item.q}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 8 – INSURANCE ENQUIRY
          Client-side accessible form integrated with Formspree
          ========================================================================= */}
      <section id="enquiry" className="relative scroll-mt-20">
        <Container size="narrow">
          <InsuranceEnquiryForm lang={lang} />
        </Container>
      </section>

      {/* =========================================================================
          SECTION 9 – FINAL CALL TO ACTION
          Clear action routing for insurance customers
          ========================================================================= */}
      <section className="relative">
        <Container>
          <div className="rounded-3xl bg-brand-navy text-white p-8 sm:p-12 md:p-16 text-center shadow-lg relative overflow-hidden">
            {/* Subtle brand glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-brand-teal border border-white/20 mb-4">
                {ctaData.badge || (lang === 'ta' ? 'தொடர்புகொள்ள' : 'Get in Touch')}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
                {ctaData.title ||
                  (lang === 'ta'
                    ? 'உங்கள் காப்பீட்டு தேவைகளுக்கு வழிகாட்டல் தேவையா?'
                    : 'Need Assistance With Your Insurance Requirements?')}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-8">
                {ctaData.description ||
                  (lang === 'ta'
                    ? 'தனிப்பட்ட வழிகாட்டலுக்கு உங்கள் விசாரணையை சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் நிறுவனத்துடன் பகிருங்கள்.'
                    : 'Share your enquiry with SIVA INSURANCES & GRANITE SERVICES for personal assistance.')}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5">
                <Button
                  href="#enquiry"
                  variant="secondary"
                  size="md"
                  icon={<Shield className="w-4 h-4" aria-hidden="true" />}
                  className="sm:w-auto"
                >
                  {ctaData.btnEnquiry || (lang === 'ta' ? 'காப்பீட்டு விசாரணை சமர்ப்பிக்க' : 'Submit an Insurance Enquiry')}
                </Button>

                <Button
                  href={`/${lang}/contact`}
                  variant="outline"
                  size="md"
                  className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  {ctaData.btnContact || (lang === 'ta' ? 'எங்களை தொடர்புகொள்ள' : 'Contact Us')}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
