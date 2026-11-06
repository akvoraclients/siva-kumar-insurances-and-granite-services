import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SupportedLanguage } from '@/types';
import { getDictionary } from '@/lib/dictionary';
import { generateSeoMetadata } from '@/lib/seo';
import { Container } from '@/components/common/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/common/Button';
import { OwnerProfile } from '@/components/common/OwnerProfile';
import { RecognitionGallery } from '@/components/common/RecognitionGallery';
import { ExperienceHighlight } from '@/components/common/ExperienceHighlight';
import {
  Shield,
  ShieldCheck,
  Layers,
  ArrowRight,
  MapPin,
  CheckCircle2,
  FileText,
  UserCheck,
  Building2,
  Truck,
  Sparkles,
  Compass,
  Clock,
  PhoneCall,
  Check,
  Info,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const lang: SupportedLanguage = resolved.lang === 'ta' ? 'ta' : 'en';
  return generateSeoMetadata(lang);
}

export default async function HomePage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang: SupportedLanguage = resolvedParams.lang === 'ta' ? 'ta' : 'en';
  const dict = getDictionary(lang);
  const home = dict.home;

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-8 md:pb-12">
      {/* =========================================================================
          SECTION 1: HERO SECTION
          Prominently featuring Siva Kumar, Founder & Business Owner of SIVA INSURANCES & GRANITE SERVICES,
          with clear dual-service routing (Insurance & Granite)
          ========================================================================= */}
      <section className="relative overflow-hidden py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-b from-brand-navy-50/70 via-white to-brand-light border-b border-slate-200/80">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Mobile-Only Prominent Owner Card (appears first on mobile screens for instant identity recognition) */}
            <div className="block lg:hidden w-full">
              <div className="relative rounded-3xl bg-white border border-brand-navy-200/90 p-4 sm:p-5 shadow-xs bg-gradient-to-b from-white via-white to-brand-navy-50/40">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
                  {/* Photo container */}
                  <div className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-2xl overflow-hidden bg-brand-navy-950 border-2 border-brand-navy-100 shadow-md shrink-0">
                    <Image
                      src="/images/siva-kumar/sivakumar.webp"
                      alt={home?.hero?.ownerAlt || (lang === 'ta' ? 'சிவகுமார், நிறுவனர் & வணிக உரிமையாளர் - சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ், ஓசூர்' : 'Siva Kumar, Founder & Business Owner of SIVA INSURANCES & GRANITE SERVICES in Hosur')}
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 144px, 160px"
                    />
                  </div>

                  {/* Owner Credentials text */}
                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-navy-50 text-brand-navy border border-brand-navy-200 text-xs font-semibold mb-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" aria-hidden="true" />
                      <span>{home?.hero?.ownerRole || (lang === 'ta' ? 'நிறுவனர் & வணிக உரிமையாளர்' : 'Founder & Business Owner')}</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight">
                      {home?.hero?.ownerName || 'Siva Kumar'}
                    </p>
                    <p className="text-xs font-bold text-teal-800 mt-0.5">
                      SIVA INSURANCES & GRANITE SERVICES
                    </p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {lang === 'ta'
                        ? 'காப்பீட்டு முகமை ஆலோசனைகள் மற்றும் ஓசூர் கிரானைட் கொள்முதல் ஒருங்கிணைப்பிற்கான நேரடி வழிகாட்டல்.'
                        : 'Personal assistance for insurance agency services and direct Hosur granite coordination.'}
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] font-semibold text-slate-700">
                      <a
                        href="https://maps.app.goo.gl/6DvzC8DF2p4a3wdy8?g_st=ac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-slate-100 hover:bg-teal-50 hover:text-brand-teal px-2 py-0.5 rounded-md transition-colors focus:outline-hidden focus:ring-2 focus:ring-brand-teal group cursor-pointer"
                        aria-label={lang === 'ta' ? 'கூகுள் மேப்ஸில் சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் இருப்பிடத்தைக் காண்க' : 'View SIVA INSURANCES & GRANITE SERVICES location in Google Maps'}
                        title={lang === 'ta' ? 'கூகுள் மேப்ஸில் காண்க' : 'View SIVA INSURANCES & GRANITE SERVICES location in Google Maps'}
                      >
                        <MapPin className="w-3 h-3 text-brand-teal group-hover:scale-110 transition-transform shrink-0" aria-hidden="true" />
                        <span className="group-hover:underline">Hosur, Tamil Nadu</span>
                      </a>
                      <span className="inline-flex items-center gap-1 bg-brand-navy-50 text-brand-navy px-2 py-0.5 rounded-md font-semibold">
                        <Clock className="w-3 h-3 text-brand-teal" aria-hidden="true" />
                        <span>~18 {lang === 'ta' ? 'ஆண்டுகள் அனுபவம்' : 'Years Experience'}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Content Column (Main introduction, headline, pillars, CTAs) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Desktop-Only Owner & Location Verified Pill */}
              <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-navy-200/80 shadow-xs text-xs font-semibold text-brand-navy mb-5">
                <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" aria-hidden="true" />
                <span>{home?.hero?.badge || (lang === 'ta' ? 'சிவகுமார் | ஓசூரை மையமாகக் கொண்டு செயல்படுகிறார்' : 'Siva Kumar | Based in Hosur')}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-[1.18] mb-4">
                {home?.hero?.headline || 'Insurance Assistance & Granite Solutions Under One Roof'}
              </h1>

              {/* Supporting Description */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal mb-6 max-w-2xl">
                {home?.hero?.description ||
                  'SIVA INSURANCES & GRANITE SERVICES, founded and managed by Siva Kumar in Hosur, provides personal assistance for insurance agency services and direct granite sourcing and purchase coordination.'}
              </p>

              {/* Dual Core Division Overview */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                {/* Division 1: Insurance */}
                <div className="p-3.5 rounded-2xl bg-white/90 border border-brand-navy-100 shadow-2xs flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-navy-50 text-brand-navy flex items-center justify-center shrink-0 border border-brand-navy-100">
                    <Shield className="w-4 h-4 text-brand-teal" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-navy-700 block">
                      {lang === 'ta' ? 'காப்பீட்டு பிரிவு' : 'Insurance Division'}
                    </span>
                    <h2 className="text-xs sm:text-sm font-bold text-brand-navy truncate">
                      LIC • Star Health • New India
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {home?.hero?.coverageInsurance || (lang === 'ta' ? 'ஓசூர் மற்றும் சுற்றியுள்ள பகுதிகள்' : 'Hosur & surrounding areas')}
                    </p>
                  </div>
                </div>

                {/* Division 2: Granite */}
                <div className="p-3.5 rounded-2xl bg-white/90 border border-brand-sandstone-200 shadow-2xs flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-sandstone-50 text-brand-sandstone-900 flex items-center justify-center shrink-0 border border-brand-sandstone-200">
                    <Layers className="w-4 h-4 text-brand-sandstone-700" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal-700 block">
                      {lang === 'ta' ? 'கிரானைட் பிரிவு' : 'Granite Division'}
                    </span>
                    <h2 className="text-xs sm:text-sm font-bold text-brand-charcoal truncate">
                      {lang === 'ta' ? 'ஓசூர் கிரானைட் ஷோரூம்கள்' : 'Hosur Granite Showrooms'}
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {home?.hero?.coverageGranite || (lang === 'ta' ? 'தமிழ்நாடு முழுவதும் விநியோகம்' : 'Delivery across Tamil Nadu')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  href={`/${lang}/insurance`}
                  variant="primary"
                  size="lg"
                  icon={<Shield className="w-4 h-4 text-brand-teal" aria-hidden="true" />}
                  className="w-full sm:w-auto"
                >
                  {home?.hero?.ctaInsurance || 'Explore Insurance Services'}
                </Button>

                <Button
                  href={`/${lang}/granites`}
                  variant="charcoal"
                  size="lg"
                  icon={<Layers className="w-4 h-4 text-brand-sandstone" aria-hidden="true" />}
                  className="w-full sm:w-auto"
                >
                  {home?.hero?.ctaGranite || 'Explore Granite Solutions'}
                </Button>

                <Button
                  href={`/${lang}/contact`}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {home?.hero?.ctaContact || (lang === 'ta' ? 'தொடர்புகொள்ள' : 'Contact Us')}
                </Button>
              </div>

              {/* Trust statement */}
              <div className="mt-5 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" aria-hidden="true" />
                <span>
                  {home?.hero?.directConsultation || (lang === 'ta' ? 'நேரடி உரிமையாளர் வழிகாட்டல்' : 'Direct Owner Consultation')} • {home?.hero?.noMiddlemen || (lang === 'ta' ? 'நேரடி தொடர்பு • வெளிப்படையான ஒருங்கிணைப்பு' : 'Direct Guidance • Transparent Coordination')}
                </span>
              </div>
            </div>

            {/* Desktop-Only Prominent Siva Kumar Portrait Showcase (Right 5 columns) */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative rounded-3xl bg-white border border-slate-200/90 shadow-md p-4 bg-gradient-to-b from-white via-white to-brand-navy-50/40">
                {/* Soft backdrop glow */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-teal/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

                {/* Portrait Frame */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-brand-navy-950 border border-slate-200/80 shadow-inner">
                  <Image
                    src="/images/siva-kumar/sivakumar.webp"
                    alt={home?.hero?.ownerAlt || (lang === 'ta' ? 'சிவகுமார், நிறுவனர் & வணிக உரிமையாளர் - சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ், ஓசூர்' : 'Siva Kumar, Founder & Business Owner of SIVA INSURANCES & GRANITE SERVICES in Hosur')}
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />

                  {/* Top-left Experience Floating Badge */}
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 text-white border border-white/20 backdrop-blur-md shadow-xs text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-brand-teal" aria-hidden="true" />
                    <span>~18 {lang === 'ta' ? 'ஆண்டுகள் அனுபவம்' : 'Years Experience'}</span>
                  </div>

                  {/* Top-right Direct Owner Badge */}
                  <div className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-navy/90 text-brand-teal border border-brand-teal/30 backdrop-blur-md shadow-xs text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{lang === 'ta' ? 'நேரடி முகவர்' : 'Direct Advisor'}</span>
                  </div>

                  {/* Bottom Glassmorphic Identity Plaque */}
                  <div className="absolute bottom-3 inset-x-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 p-3.5 text-white shadow-lg">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight truncate">
                            {home?.hero?.ownerName || 'Siva Kumar'}
                          </h2>
                          <span className="w-2 h-2 rounded-full bg-brand-teal shrink-0" aria-hidden="true" />
                        </div>
                        <p className="text-xs font-semibold text-teal-300 truncate">
                          {home?.hero?.ownerTitle || 'Founder / Business Owner • SIVA INSURANCES & GRANITE SERVICES'}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <a
                          href="https://maps.app.goo.gl/6DvzC8DF2p4a3wdy8?g_st=ac"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-teal-300 transition-colors py-0.5 px-1.5 rounded-md hover:bg-white/10 focus:outline-hidden focus:ring-2 focus:ring-brand-teal group cursor-pointer"
                          aria-label={lang === 'ta' ? 'கூகுள் மேப்ஸில் சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் இருப்பிடத்தைக் காண்க' : 'View SIVA INSURANCES & GRANITE SERVICES location in Google Maps'}
                          title={lang === 'ta' ? 'கூகுள் மேப்ஸில் காண்க' : 'View SIVA INSURANCES & GRANITE SERVICES location in Google Maps'}
                        >
                          <MapPin className="w-3 h-3 text-brand-teal group-hover:scale-110 transition-transform shrink-0" aria-hidden="true" />
                          <span className="group-hover:underline">Hosur, TN</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-card quick feature points */}
                <div className="mt-3.5 px-1 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-brand-teal" aria-hidden="true" />
                    <span className="font-semibold text-brand-navy">{lang === 'ta' ? 'நேரடி ஆலோசனை' : 'Direct Consultation'}</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-brand-sandstone-700" aria-hidden="true" />
                    <span className="font-semibold text-brand-charcoal">{lang === 'ta' ? '20–25 சப்ளையர்கள்' : '20–25 Suppliers'}</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2: INTRODUCING SIVA INSURANCES & GRANITE SERVICES
          Clear, simple narrative explaining the dual business structure
          ========================================================================= */}
      <section className="relative">
        <Container>
          <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200 p-5 sm:p-7 md:p-8 shadow-xs text-center">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-navy-50 text-brand-navy border border-brand-navy-200 mb-4">
              {home?.intro?.badge || 'Welcome'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight mb-4">
              {home?.intro?.title || 'Welcome to SIVA INSURANCES & GRANITE SERVICES'}
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-4">
              {home?.intro?.content ||
                'SIVA INSURANCES & GRANITE SERVICES, managed by Siva Kumar in Hosur, brings together insurance assistance and granite selection and purchase coordination through two dedicated service divisions.'}
            </p>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
              {home?.intro?.subcontent ||
                'Customers can connect with one trusted business for either service, receiving personalized guidance and transparent coordination from start to finish.'}
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3: OUR TWO BUSINESS SERVICES
          Card A: Insurance Services (Navy/White)
          Card B: Siva Granites (Charcoal/Sandstone)
          ========================================================================= */}
      <section className="relative">
        <Container>
          <SectionHeader
            title={home?.services?.title || 'Our Two Business Services'}
            subtitle={
              home?.services?.subtitle ||
              'Discover our two dedicated service offerings tailored to your personal and project requirements.'
            }
            badge={home?.services?.badge || 'Two Core Divisions'}
            theme="navy"
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            {/* CARD A – INSURANCE SERVICES */}
            <div className="rounded-3xl bg-white border border-brand-navy-100 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                {/* Visual header */}
                <div className="relative h-44 rounded-2xl overflow-hidden mb-6 border border-slate-100">
                  <Image
                    src="/images/insurance-hero.svg"
                    alt="Insurance policy assistance and consultation in Hosur"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-navy/90 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-xs">
                    Hosur & Surrounding Areas
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-brand-teal" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-navy-700">
                    {home?.services?.insurance?.relationshipsLabel || 'Insurance Agency Services'}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-brand-navy mb-3">
                  {home?.services?.insurance?.title || 'Insurance Services'}
                </h3>

                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {home?.services?.insurance?.description ||
                    'Get personal assistance with insurance enquiries, policy applications, renewals and customer servicing.'}
                </p>

                {/* Insurance Relationships as pure text */}
                <div className="p-4 rounded-xl bg-brand-navy-50/70 border border-brand-navy-100 mb-6">
                  <p className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">
                    {home?.services?.insurance?.relationshipsLabel || 'Represented Insurance Agencies:'}
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {(home?.services?.insurance?.relationships || [
                      'LIC (Life Insurance)',
                      'The New India Assurance Co. Ltd. (General Insurance)',
                      'Star Health and Allied Insurance (Health Insurance)',
                    ]).map((rel, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-brand-teal shrink-0" aria-hidden="true" />
                        <span>{rel}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features Checklist */}
                <div className="space-y-2.5 mb-6">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Services Provided:
                  </p>
                  <ul className="space-y-2" aria-label="Insurance service features">
                    {(home?.services?.insurance?.features || [
                      'Policy enquiry assistance',
                      'Application support',
                      'Renewal assistance',
                      'Claims assistance',
                      'Policy information updates',
                    ]).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Portal Notice */}
                <p className="text-[11px] text-slate-500 italic border-t border-slate-100 pt-3 mb-6">
                  {home?.services?.insurance?.portalNotice ||
                    'All applications and payments are processed directly through the respective official insurance company portals.'}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  href={`/${lang}/insurance`}
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
                  iconPosition="right"
                >
                  {home?.services?.insurance?.cta || 'Explore Insurance Services'}
                </Button>
              </div>
            </div>

            {/* CARD B – SIVA GRANITES */}
            <div className="rounded-3xl bg-white border border-brand-sandstone-300 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                {/* Visual header */}
                <div className="relative h-44 rounded-2xl overflow-hidden mb-6 border border-slate-100">
                  <Image
                    src="/images/granite-hero.svg"
                    alt="Hosur granite varieties, finishes and delivery coordination across Tamil Nadu"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-charcoal/90 text-brand-sandstone text-[11px] font-bold tracking-wider uppercase backdrop-blur-xs">
                    Across Tamil Nadu
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-5 h-5 text-brand-sandstone-700" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal-700">
                    {home?.services?.granites?.coverageLabel || 'Granite Showroom Network'}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-brand-charcoal mb-3">
                  {home?.services?.granites?.title || 'Siva Granites'}
                </h3>

                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {home?.services?.granites?.description ||
                    'Explore granite varieties from different granite companies and showrooms in Hosur, with assistance for selection, quotations, orders and delivery coordination.'}
                </p>

                {/* Showroom Network Pill */}
                <div className="p-4 rounded-xl bg-brand-sandstone-50/70 border border-brand-sandstone-200 mb-6">
                  <p className="text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1">
                    Hosur Granite Network:
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {home?.services?.granites?.coverage ||
                      'Coordinating with 20–25 established granite companies and showrooms in Hosur for selection and transport across Tamil Nadu.'}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="space-y-2.5 mb-6">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Services Provided:
                  </p>
                  <ul className="space-y-2" aria-label="Granite service features">
                    {(home?.services?.granites?.features || [
                      'Granite variety exploration',
                      'Colour and finish comparison',
                      'Square-foot quotation assistance',
                      'Order coordination',
                      'Payment coordination',
                      'Transportation and delivery coordination',
                    ]).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-brand-sandstone-700 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing Notice */}
                <p className="text-[11px] text-slate-500 italic border-t border-slate-100 pt-3 mb-6">
                  {home?.services?.granites?.pricingNotice ||
                    'Quotations depend on required dimensions, thickness, surface finish, and supplier batch availability.'}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  href={`/${lang}/granites`}
                  variant="charcoal"
                  size="md"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4 text-brand-sandstone" aria-hidden="true" />}
                  iconPosition="right"
                >
                  {home?.services?.granites?.cta || 'Explore Granite Services'}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4: HOW OUR SERVICES WORK
          Factual 4-step customer journeys for Insurance and Granites
          ========================================================================= */}
      <section className="relative py-8 sm:py-10 md:py-12 bg-white border-y border-slate-200/80">
        <Container>
          <SectionHeader
            title={home?.process?.title || 'How Our Services Work'}
            subtitle={
              home?.process?.subtitle ||
              'A straightforward and transparent working approach for insurance guidance and granite coordination.'
            }
            badge={home?.process?.badge || 'Customer Journey'}
            theme="teal"
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left: Insurance Process */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-brand-navy-100">
                <div className="w-9 h-9 rounded-xl bg-brand-navy-50 text-brand-navy flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-brand-teal" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy">
                  {home?.process?.insuranceTitle || 'Insurance Guidance Process'}
                </h3>
              </div>

              <div className="space-y-4">
                {(home?.process?.insuranceSteps || [
                  {
                    step: '01',
                    title: 'Share Requirements',
                    desc: 'Share your insurance needs (Life, General, or Health coverage).',
                  },
                  {
                    step: '02',
                    title: 'Discuss Options',
                    desc: 'Discuss suitable plans based on your specific requirements.',
                  },
                  {
                    step: '03',
                    title: 'Official Application',
                    desc: "Complete the application through the respective insurer's official portal process.",
                  },
                  {
                    step: '04',
                    title: 'Servicing & Renewal',
                    desc: 'Receive continued assistance with renewals, claims guidance, and policy updates.',
                  },
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-brand-light border border-slate-200/70">
                    <span className="w-8 h-8 rounded-xl bg-brand-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-brand-navy">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Granite Process */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-brand-sandstone-200">
                <div className="w-9 h-9 rounded-xl bg-brand-sandstone-50 text-brand-sandstone-900 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-brand-sandstone-700" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-brand-charcoal">
                  {home?.process?.graniteTitle || 'Granite Selection & Order Process'}
                </h3>
              </div>

              <div className="space-y-4">
                {(home?.process?.graniteSteps || [
                  {
                    step: '01',
                    title: 'Share Requirements',
                    desc: 'Share your granite needs, intended application, and approximate dimensions.',
                  },
                  {
                    step: '02',
                    title: 'Explore Varieties',
                    desc: 'Explore granite varieties, colours, and surface finishes across Hosur showrooms.',
                  },
                  {
                    step: '03',
                    title: 'Obtain Quotation',
                    desc: 'Obtain a transparent per-square-foot quotation based on verified supplier rates.',
                  },
                  {
                    step: '04',
                    title: 'Order & Delivery',
                    desc: 'Coordinate order placement, payment conditions, and direct site transport across Tamil Nadu.',
                  },
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-brand-light border border-slate-200/70">
                    <span className="w-8 h-8 rounded-xl bg-brand-charcoal text-brand-sandstone text-xs font-bold flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-brand-charcoal">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5: WHY CONTACT SIVA INSURANCES & GRANITE SERVICES?
          Factual capabilities: Personal Attention, Dual Options, Showroom Network
          ========================================================================= */}
      <section className="relative">
        <Container>
          <SectionHeader
            title={home?.whyUs?.title || 'Why Contact SIVA INSURANCES & GRANITE SERVICES?'}
            subtitle={
              home?.whyUs?.subtitle ||
              'Built on direct accountability, local supplier access, and personal attention to every customer.'
            }
            badge={home?.whyUs?.badge || 'Our Working Approach'}
            theme="navy"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {(home?.whyUs?.points || [
              {
                title: 'Personal Assistance',
                desc: 'Direct interaction with Siva Kumar to understand individual customer requirements without intermediaries.',
              },
              {
                title: 'Multiple Service Options',
                desc: 'Access life, general, and health insurance guidance along with natural stone granite coordination through one trusted contact.',
              },
              {
                title: 'Supplier Coordination',
                desc: 'Active coordination with 20–25 established granite companies and showrooms in Hosur to compare choices and fair rates.',
              },
              {
                title: 'Complete Service Coordination',
                desc: 'End-to-end guidance from initial enquiry to policy renewal support or safe granite site delivery across Tamil Nadu.',
              },
            ]).map((point, idx) => {
              const icons = [
                <UserCheck key="0" className="w-6 h-6 text-brand-teal" aria-hidden="true" />,
                <Compass key="1" className="w-6 h-6 text-brand-navy" aria-hidden="true" />,
                <Building2 key="2" className="w-6 h-6 text-brand-sandstone-700" aria-hidden="true" />,
                <Truck key="3" className="w-6 h-6 text-brand-teal" aria-hidden="true" />,
              ];

              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                    {icons[idx % icons.length]}
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mb-2">
                    {point.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 6: BUSINESS SERVICE AREAS
          Card 1: Insurance (Hosur & surrounding)
          Card 2: Siva Granites (Across Tamil Nadu)
          ========================================================================= */}
      <section className="relative">
        <Container>
          <SectionHeader
            title={home?.areas?.title || 'Business Service Areas'}
            subtitle={
              home?.areas?.subtitle ||
              'Serving customers locally in Hosur and across Tamil Nadu according to service category.'
            }
            badge={home?.areas?.badge || 'Service Coverage'}
            theme="teal"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-5">
            {/* Insurance Service Area */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-brand-navy-100 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-brand-teal" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                    {home?.areas?.insuranceCard?.title || 'Insurance Services'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-brand-navy mb-2">
                  {home?.areas?.insuranceCard?.location || (lang === 'ta' ? 'ஓசூர் மற்றும் சுற்றியுள்ள பகுதிகள்' : 'Hosur and Surrounding Areas')}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {home?.areas?.insuranceCard?.desc ||
                    (lang === 'ta'
                      ? 'ஓசூர் மற்றும் சுற்றியுள்ள பகுதி மக்களுக்கு நேரடி ஆலோசனை மற்றும் பாலிசி வழிகாட்டல் வழங்கப்படுகிறது.'
                      : 'Personal insurance consultation and policy assistance primarily focused on customers in Hosur and surrounding areas.')}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800">
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>{lang === 'ta' ? 'ஓசூர் மற்றும் சுற்றியுள்ள பகுதிகள்' : 'Hosur and surrounding areas'}</span>
                </span>
              </div>
            </div>

            {/* Siva Granites Service Area */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-brand-sandstone-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="w-5 h-5 text-brand-sandstone-700" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                    {home?.areas?.graniteCard?.title || 'Siva Granites'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-brand-charcoal mb-2">
                  {home?.areas?.graniteCard?.location || (lang === 'ta' ? 'தமிழ்நாடு முழுவதும் உள்ள வாடிக்கையாளர்களுக்கு சேவை' : 'Serving Customers Across Tamil Nadu')}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {home?.areas?.graniteCard?.desc ||
                    (lang === 'ta'
                      ? 'ஓசூரில் கிரானைட் தேர்வு மற்றும் விலைப்பட்டியல் ஒருங்கிணைக்கப்பட்டு, தமிழ்நாடு முழுவதும் உள்ள வாடிக்கையாளர்களுக்கு சேவை வழங்கப்படுகிறது.'
                      : 'Granite variety selection and showroom coordination in Hosur, serving customers across Tamil Nadu.')}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>{lang === 'ta' ? 'தமிழ்நாடு முழுவதும் உள்ள வாடிக்கையாளர்களுக்கு சேவை' : 'Serving customers across Tamil Nadu'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Factual Office Note */}
          <div className="p-4 rounded-2xl bg-brand-light border border-slate-200 text-xs text-slate-600 flex items-center justify-center gap-2 text-center">
            <Info className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
            <span>
              {home?.areas?.officeNote ||
                (lang === 'ta'
                  ? 'குறிப்பு: சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் ஓசூரை மையமாகக் கொண்டு செயல்படுகிறது. ஓசூரில் புதிய அலுவலகம் திட்டமிடப்பட்டு வருகிறது, தற்போதைய சேவை ஆலோசனைகள் நேரடி சந்திப்பு மூலம் ஒருங்கிணைக்கப்படுகின்றன.'
                  : 'Note: SIVA INSURANCES & GRANITE SERVICES operates from Hosur. Direct service enquiries are handled online and by appointment while dedicated office premises in Hosur are being planned.')}
            </span>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 7: ABOUT SIVA KUMAR & COMPANY RECOGNITION
          Meet Siva Kumar with framed OwnerProfile and compact recognition
          ========================================================================= */}
      <section className="relative">
        <Container size="narrow">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-5 sm:p-7 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-navy-50 text-brand-navy border border-brand-navy-200 mb-2">
                    {home?.aboutOwner?.badge || (lang === 'ta' ? 'தலைமை' : 'Leadership')}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                    {home?.aboutOwner?.title || (lang === 'ta' ? 'சிவகுமார் அவர்களை பற்றி' : 'Meet Siva Kumar')}
                  </h2>
                  <p className="text-xs font-semibold text-teal-800 mt-1">
                    {home?.aboutOwner?.subtitle || (lang === 'ta' ? 'சிவகுமார் | ஓசூரை மையமாகக் கொண்டு செயல்படுகிறார்' : 'Siva Kumar | Based in Hosur')}
                  </p>
                </div>

                <div className="shrink-0">
                  <Button href={`/${lang}/about`} variant="outline" size="sm">
                    {home?.aboutOwner?.cta || (lang === 'ta' ? 'எங்களைப் பற்றி மேலும் அறிய' : 'Learn More About Us')}
                  </Button>
                </div>
              </div>

              {/* Framed Owner Profile presentation */}
              <OwnerProfile lang={lang} variant="card" showBio={false} className="border-0 p-0 shadow-none mb-4" />

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {home?.aboutOwner?.content ||
                  (lang === 'ta'
                    ? 'சிவகுமார் அவர்கள் ஓசூரை மையமாகக் கொண்டு சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் நிறுவனத்தை நிர்வகித்து வருகிறார். இவர் வாடிக்கையாளர்களுக்கு காப்பீட்டு வழிகாட்டல் மற்றும் கிரானைட் தேர்வு & கொள்முதல் ஒருங்கிணைப்பு சேவைகளை வழங்கி வருகிறார். ஒவ்வொரு வாடிக்கையாளரின் தேவையையும் தனிப்பட்ட கவனத்துடன் அணுகி, அதிகாரப்பூர்வ இணையதளங்கள் மூலம் காப்பீட்டு வழிகாட்டலையும், ஓசூரின் முன்னணி நிறுவனங்கள் மூலம் கிரானைட் கொள்முதல் வழிகாட்டலையும் வெளிப்படைத்தன்மையுடன் செய்து வருகிறார்.'
                    : "Siva Kumar manages SIVA INSURANCES & GRANITE SERVICES in Hosur, providing insurance-related assistance and coordinating granite selection and purchases for customers. With personal attention to every enquiry, he assists clients in choosing suitable insurance policies through official insurer portals and coordinates granite orders across Hosur's established companies and showrooms.")}
              </p>

              {/* Prominent Combined Experience Highlight */}
              <ExperienceHighlight lang={lang} variant="card" className="mt-6" />
            </div>

            {/* Compact Professional Recognition */}
            <RecognitionGallery lang={lang} compact />
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 8: FINAL CUSTOMER CALL TO ACTION
          Prominent closing section with 3 internal route buttons
          ========================================================================= */}
      <section className="relative">
        <Container>
          <div className="rounded-3xl bg-brand-navy text-white p-6 sm:p-8 md:p-10 text-center shadow-lg relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-sandstone/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-teal-300 border border-white/20 mb-4">
                {home?.cta?.badge || 'Get Started'}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
                {home?.cta?.title || 'Looking for Insurance Assistance or Granite Solutions?'}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-8">
                {home?.cta?.desc ||
                  'Tell us what you need. Contact SIVA INSURANCES & GRANITE SERVICES and share your requirements with Siva Kumar for personalized support.'}
              </p>

              {/* 3 Clear Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5">
                <Button
                  href={`/${lang}/contact?service=insurance`}
                  variant="secondary"
                  size="md"
                  icon={<Shield className="w-4 h-4" aria-hidden="true" />}
                  className="sm:w-auto"
                >
                  {home?.cta?.btnInsurance || 'Insurance Enquiry'}
                </Button>

                <Button
                  href={`/${lang}/contact?service=granite`}
                  variant="sandstone"
                  size="md"
                  icon={<Layers className="w-4 h-4 text-brand-charcoal" aria-hidden="true" />}
                  className="sm:w-auto"
                >
                  {home?.cta?.btnGranite || 'Granite Enquiry'}
                </Button>

                <Button
                  href={`/${lang}/contact`}
                  variant="outline"
                  size="md"
                  className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  {home?.cta?.btnContact || 'Contact Us'}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
