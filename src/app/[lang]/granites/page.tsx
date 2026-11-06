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
import { ExperienceHighlight } from '@/components/common/ExperienceHighlight';
import { RecognitionGallery } from '@/components/common/RecognitionGallery';
import { GraniteEnquiryForm } from '@/components/forms/GraniteEnquiryForm';
import { hasVerifiedAwards } from '@/lib/recognition';
import {
  MapPin,
  Building2,
  CheckCircle2,
  ArrowRight,
  Search,
  Calculator,
  Truck,
  CreditCard,
  ClipboardCheck,
  Layers,
  Info,
  HelpCircle,
  Ruler,
  Compass,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  PackageCheck,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const lang: SupportedLanguage = resolved.lang === 'ta' ? 'ta' : 'en';

  const title =
    lang === 'ta'
      ? 'சிவா கிரானைட்ஸ் | ஓசூர் கிரானைட் தேர்வு & கொள்முதல் ஒருங்கிணைப்பு'
      : 'Siva Granites | Hosur Granite Sourcing, Selection & Coordination';

  const description =
    lang === 'ta'
      ? 'ஓசூரிலுள்ள 20–25 கிரானைட் நிறுவனங்கள் மற்றும் விற்பனையகங்களில் இருந்து தரமான கற்களைத் தேர்ந்தெடுக்கவும், விலைப்பட்டியல் பெறவும், தமிழ்நாடு முழுவதும் டெலிவரி செய்யவும் உதவி.'
      : 'Explore granite varieties from 20–25 granite companies and showrooms in Hosur with personal selection guidance, per-sq-ft quotations, and delivery across Tamil Nadu.';

  return generateSeoMetadata(lang, title, description);
}

export default async function GranitesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang: SupportedLanguage = resolvedParams.lang === 'ta' ? 'ta' : 'en';
  const dict = getDictionary(lang);
  const granites = dict.granites || {};

  const hero = granites.hero || {};
  const intro = granites.intro || {};
  const varieties = granites.varieties || {};
  const services = granites.services || {};
  const processData = granites.process || {};
  const sqftGuide = granites.sqftGuide || {};
  const supplierNetwork = granites.supplierNetwork || {};
  const faqData = granites.faq || {};
  const ctaData = granites.cta || {};

  // Icons for Section 4: Our Granite Services
  const serviceIcons = [
    <Search key="search" className="w-5 h-5 text-brand-sandstone-700" aria-hidden="true" />,
    <Building2 key="building" className="w-5 h-5 text-brand-sandstone-700" aria-hidden="true" />,
    <Calculator key="calc" className="w-5 h-5 text-brand-sandstone-700" aria-hidden="true" />,
    <ClipboardCheck key="clip" className="w-5 h-5 text-brand-sandstone-700" aria-hidden="true" />,
    <CreditCard key="credit" className="w-5 h-5 text-brand-sandstone-700" aria-hidden="true" />,
    <Truck key="truck" className="w-5 h-5 text-brand-sandstone-700" aria-hidden="true" />,
  ];

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-8 md:pb-12">
      {/* Back Navigation Bar */}
      <div className="pt-6">
        <Container>
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-charcoal font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{dict.nav?.home || (lang === 'ta' ? 'முகப்பு' : 'Home')}</span>
          </Link>
        </Container>
      </div>

      {/* =========================================================================
          SECTION 1 – GRANITE HERO SECTION
          Find the Right Granite for Your Space
          ========================================================================= */}
      <section className="relative overflow-hidden pt-2 pb-12 md:pb-16 bg-gradient-to-b from-brand-sandstone-50/60 via-white to-brand-light border-b border-slate-200/80">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading, description, scope, CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-sandstone-200 shadow-xs text-xs font-semibold text-brand-charcoal mb-5">
                <span className="w-2 h-2 rounded-full bg-brand-sandstone animate-pulse" aria-hidden="true" />
                <span>
                  {hero.badge ||
                    (lang === 'ta' ? 'சிவகுமார் | ஓசூரை மையமாகக் கொண்டு செயல்படுகிறார்' : 'Siva Kumar | Based in Hosur')}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight leading-[1.15] mb-5">
                {hero.heading ||
                  (lang === 'ta'
                    ? 'உங்கள் கட்டிடத்திற்கான சரியான கிரானைட்டைத் தேர்வு செய்யுங்கள்'
                    : 'Find the Right Granite for Your Space')}
              </h1>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6 max-w-2xl">
                {hero.description ||
                  (lang === 'ta'
                    ? 'சிவா கிரானைட்ஸ், ஓசூரிலுள்ள முன்னணி கிரானைட் நிறுவனங்கள் மற்றும் விற்பனையகங்களில் இருந்து தரமான கற்களைத் தேர்ந்தெடுக்கவும், விலைப்பட்டியல் பெறவும், கொள்முதல் மற்றும் தமிழ்நாடு முழுவதும் தளங்களுக்கு டெலிவரி செய்யவும் வாடிக்கையாளர்களுக்கு உதவுகிறது.'
                    : 'Siva Granites helps customers explore granite varieties from different granite companies and showrooms in Hosur, with assistance in selection, quotations, purchase coordination and delivery across Tamil Nadu.')}
              </p>

              {/* Highlights List */}
              <div className="space-y-2.5 mb-8 w-full max-w-xl">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white/90 p-3 rounded-xl border border-brand-sandstone-200/80">
                  <Building2 className="w-4 h-4 text-brand-sandstone-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="font-semibold text-brand-charcoal">
                    {hero.highlight1 ||
                      (lang === 'ta'
                        ? 'ஓசூரிலுள்ள சுமார் 20–25 கிரானைட் நிறுவனங்கள் மற்றும் விற்பனையகங்களுடன் ஒருங்கிணைப்பு.'
                        : 'Working with approximately 20–25 granite companies and showrooms in Hosur.')}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white/90 p-3 rounded-xl border border-slate-200">
                  <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="font-medium text-slate-800">
                    {hero.highlight2 ||
                      (lang === 'ta' ? 'தமிழ்நாடு முழுவதும் வாடிக்கையாளர்களுக்கு சேவை.' : 'Serving customers across Tamil Nadu.')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Button href="#enquiry" variant="charcoal" size="md">
                  {hero.ctaEnquiry || (lang === 'ta' ? 'கிரானைட் விலைப்பட்டியல் கோர' : 'Request a Granite Quotation')}
                </Button>
                <Button href={`/${lang}/granites/catalogue`} variant="sandstone" size="md">
                  {hero.ctaCatalogue || (lang === 'ta' ? 'கிரானைட் வகைகளை அறிய' : 'Explore Granite Varieties')}
                </Button>
              </div>

              <p className="text-[11px] text-slate-500 mt-2.5 italic">
                {hero.ctaCatalogueSub ||
                  (lang === 'ta'
                    ? 'பல்வேறு இயற்கை கல் பாணிகளைப் பார்வையிடுங்கள் (மாதிரி வடிவமைப்பு)'
                    : 'Browse illustrative variety styles')}
              </p>
            </div>

            {/* Right Column: Hero Visual Graphic */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-4/3 rounded-3xl overflow-hidden shadow-md border border-brand-sandstone-200 bg-brand-charcoal">
                <Image
                  src="/images/granite-hero.svg"
                  alt={
                    lang === 'ta'
                      ? 'ஓசூர் கிரானைட் கற்களின் தேர்வு மற்றும் வடிவமைப்பு மாதிரி'
                      : 'Hosur granite stone selection and finish showcase'
                  }
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center mt-3 max-w-xs leading-tight">
                {lang === 'ta'
                  ? 'ஓசூரின் இயற்கை கிரானைட் கற்கள் மற்றும் பல்வேறு மேற்பரப்பு ஃபினிஷிங்'
                  : 'Hosur natural granite slabs with diverse finishes and textures'}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2 – INTRODUCTION TO SIVA GRANITES
          Granite Selection Made Easier
          ========================================================================= */}
      <section className="scroll-mt-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              badge={intro.badge || (lang === 'ta' ? 'கிரானைட் தேர்வு & ஒருங்கிணைப்பு' : 'Granite Selection & Coordination')}
              title={intro.heading || (lang === 'ta' ? 'கிரானைட் தேர்வு இனி எளிதானது' : 'Granite Selection Made Easier')}
              subtitle={
                intro.description ||
                (lang === 'ta'
                  ? 'சரியான கிரானைட்டைத் தேர்ந்தெடுப்பது என்பது பல்வேறு வண்ணங்கள், மேற்பரப்பு ஃபினிஷிங், சப்ளையர் தேர்வுகள் மற்றும் விலைகளை ஒப்பிட்டுப் பார்ப்பதை உள்ளடக்கியது. சிவகுமார் அவர்கள் ஓசூரிலுள்ள கிரானைட் நிறுவனங்களில் இருந்து வாடிக்கையாளர்கள் தங்களுக்கு ஏற்ற வகைகளைத் தேர்வு செய்யவும், கொள்முதல் நடைமுறைகளை ஒருங்கிணைக்கவும் உதவுகிறார்.'
                  : 'Choosing the right granite involves comparing different colours, surface finishes, supplier options and prices. Siva Kumar helps customers explore available options from granite companies and showrooms in Hosur and coordinate the purchasing process.')
              }
              theme="granite"
              align="center"
            />

            {/* 5 Key Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              {(
                intro.points || [
                  {
                    title: 'Personal Customer Assistance',
                    desc: 'Direct guidance from Siva Kumar tailored to your specific architectural or residential requirements.',
                  },
                  {
                    title: 'Multiple Supplier Options',
                    desc: 'Access to a broad network of Hosur granite companies and showrooms without being tied to a single vendor.',
                  },
                  {
                    title: 'Selection Guidance',
                    desc: 'Assistance in evaluating slab colours, pattern consistency, and appropriate finishes for your intended usage.',
                  },
                  {
                    title: 'Square-Foot Quotation Coordination',
                    desc: 'Clear, transparent per-square-foot rate coordination directly from verified supplier options.',
                  },
                  {
                    title: 'Purchase & Delivery Coordination',
                    desc: 'Supervision of order dispatch and reliable logistics directly to your site across Tamil Nadu.',
                  },
                ]
              ).map((pt: { title: string; desc: string }, idx: number) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-brand-sandstone-300 transition-all ${
                    idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-sandstone-50 text-brand-sandstone-800 flex items-center justify-center text-xs font-bold mb-3 border border-brand-sandstone-200">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-brand-charcoal mb-1.5">{pt.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3 – GRANITE VARIETY EXPLORATION (6 Visual Categories)
          Explore Different Granite Styles
          ========================================================================= */}
      <section className="py-6 bg-brand-light/60 border-y border-slate-200/80">
        <Container>
          <SectionHeader
            badge={varieties.badge || (lang === 'ta' ? 'காட்சிப் பார்வை' : 'Visual Exploration')}
            title={varieties.heading || (lang === 'ta' ? 'பல்வேறு கிரானைட் வகைகளை அறியுங்கள்' : 'Explore Different Granite Styles')}
            subtitle={
              varieties.subtitle ||
              (lang === 'ta'
                ? 'ஓசூரின் கிரானைட் நெட்வொர்க் மூலம் கிடைக்கும் இயற்கை கற்களின் வண்ணங்கள் மற்றும் மேற்பரப்பு ஃபினிஷிங் வகைகள்.'
                : "Explore natural stone varieties and surface textures available through Hosur's granite network.")
            }
            theme="granite"
          />

          {/* Mandatory Natural Stone Variation Disclaimer */}
          <div className="mb-8 p-4 rounded-2xl bg-brand-sandstone-50 border border-brand-sandstone-200 text-xs text-brand-charcoal flex items-start gap-3">
            <Info className="w-4 h-4 text-brand-sandstone-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold mb-0.5">
                {varieties.disclaimerTitle ||
                  (lang === 'ta'
                    ? 'இயற்கை கற்களின் மாற்றங்கள் குறித்த முக்கிய குறிப்பு:'
                    : 'Important Note on Natural Stone Variations:')}
              </p>
              <p className="leading-relaxed text-slate-600">
                {varieties.disclaimer ||
                  (lang === 'ta'
                    ? 'கிரானைட் வண்ணங்கள், வரிகள், ஃபினிஷிங் மற்றும் இருப்பு ஆகியவை சப்ளையர்களுக்கும் தனிப்பட்ட கல் தொகுதிகளுக்கும் (lot/batch) ஏற்ப மாறுபடலாம். இறுதித் தேர்வு சப்ளையரிடம் நேரடியாக உறுதிப்படுத்தப்பட வேண்டும்.'
                    : 'Granite colours, patterns, finishes and availability may vary between suppliers and individual stone batches. Final selection should be confirmed with the supplier.')}
              </p>
            </div>
          </div>

          {/* 6 Visual Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(
              varieties.categories || [
                {
                  id: 'black',
                  name: 'Black Granite',
                  tag: 'Classic & Dense',
                  description:
                    'Timeless, dense black granite varieties offering sleek aesthetics and high durability for countertops and flooring.',
                  finishes: 'Available in Polished, Honed, and Leather finishes',
                  image: '/images/granite/black-granite.svg',
                  alt: 'Black granite slab sample',
                },
                {
                  id: 'white',
                  name: 'White & Light Granite',
                  tag: 'Bright & Elegant',
                  description:
                    'Bright, light-toned granite varieties that create open, luminous interior spaces and elegant feature walls.',
                  finishes: 'Available in Polished and Honed finishes',
                  image: '/images/granite/white-granite.svg',
                  alt: 'White and light natural granite sample',
                },
                {
                  id: 'grey',
                  name: 'Grey Granite',
                  tag: 'Versatile & Durable',
                  description:
                    'Versatile medium and dark grey granite with subtle crystalline patterns, well suited for high-traffic areas.',
                  finishes: 'Available in Polished, Flamed, and Leather finishes',
                  image: '/images/granite/grey-granite.svg',
                  alt: 'Grey granite stone surface',
                },
                {
                  id: 'brown',
                  name: 'Brown Granite',
                  tag: 'Warm & Earthy',
                  description:
                    'Warm, earthy brown and tan shades with rich natural mineral formations for warm interior accents.',
                  finishes: 'Available in Polished and Antique Leather finishes',
                  image: '/images/granite/brown-granite.svg',
                  alt: 'Brown and tan natural granite stone',
                },
                {
                  id: 'red',
                  name: 'Red & Natural Tones',
                  tag: 'Distinctive & Bold',
                  description:
                    'Vibrant deep red, pink, and multi-colour natural granite stones creating bold architectural statements.',
                  finishes: 'Available in Polished and Flamed finishes',
                  image: '/images/granite/red-granite.svg',
                  alt: 'Red and multi-colour natural granite stone',
                },
                {
                  id: 'finishes',
                  name: 'Different Surface Finishes',
                  tag: 'Surface Treatments',
                  description:
                    'Granite can be finished in multiple surface textures including high-gloss Polished, tactile Leather, non-slip Flamed, and matte Honed.',
                  finishes: 'Polished • Leather • Flamed • Honed',
                  image: '/images/granite/granite-finishes.svg',
                  alt: 'Comparison of granite surface finishes',
                },
              ]
            ).map(
              (
                item: {
                  id: string;
                  name: string;
                  tag?: string;
                  description: string;
                  finishes: string;
                  image: string;
                  alt: string;
                },
                idx: number
              ) => (
                <div
                  key={item.id || idx}
                  className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-brand-sandstone-300 transition-all flex flex-col"
                >
                  {/* Image Aspect Box */}
                  <div className="relative aspect-3/2 w-full bg-slate-900 border-b border-slate-100">
                    <Image
                      src={item.image}
                      alt={item.alt || item.name}
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-base font-extrabold text-brand-charcoal">{item.name}</h3>
                      {item.tag && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-sandstone-50 text-brand-sandstone-800 border border-brand-sandstone-200">
                          {item.tag}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
                      {item.description}
                    </p>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-semibold text-slate-500">
                      <span className="truncate">{item.finishes}</span>
                      <span className="text-brand-sandstone-700 shrink-0 font-bold">
                        {lang === 'ta' ? 'ஓசூர்' : 'Hosur'}
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4 – OUR GRANITE SERVICES (6 Service Cards A-F)
          How We Help You
          ========================================================================= */}
      <section>
        <Container>
          <SectionHeader
            badge={services.badge || (lang === 'ta' ? 'எங்கள் சேவைகள்' : 'Our Services')}
            title={services.heading || (lang === 'ta' ? 'நாங்கள் உங்களுக்கு எவ்வாறு உதவுகிறோம்' : 'How We Help You')}
            subtitle={
              services.subtitle ||
              (lang === 'ta'
                ? 'ஆரம்ப கல் தேர்வு முதல் தளத்திற்கான டெலிவரி வரை முழுமையான கிரானைட் சேவை ஒருங்கிணைப்பு.'
                : 'Comprehensive granite assistance from initial stone selection to doorstep delivery coordination.')
            }
            theme="granite"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(
              services.items || [
                {
                  id: 'selection',
                  title: 'A. Granite Selection Assistance',
                  desc: 'Help customers explore different granite colours, patterns, and surface finishes tailored to their aesthetic and durability requirements.',
                },
                {
                  id: 'supplier',
                  title: 'B. Supplier Coordination',
                  desc: 'Coordinate with different granite companies and showrooms in Hosur to locate suitable slabs and verify availability.',
                },
                {
                  id: 'quotation',
                  title: 'C. Square-Foot Quotation Assistance',
                  desc: 'Help customers understand the required material quantity and obtain transparent per-square-foot quotations from suppliers.',
                },
                {
                  id: 'order',
                  title: 'D. Order Coordination',
                  desc: 'Coordinate order confirmation, specification details, cutting preferences, and supplier communication throughout.',
                },
                {
                  id: 'payment',
                  title: 'E. Payment Coordination',
                  desc: "Coordinate payment procedures according to the customer's and supplier's mutually agreed financial terms.",
                },
                {
                  id: 'delivery',
                  title: 'F. Transportation & Delivery Coordination',
                  desc: "Coordinate reliable delivery arrangements depending on the customer's location, supplier location, and specific order volume.",
                },
              ]
            ).map((card: { id: string; title: string; desc: string }, idx: number) => (
              <div
                key={card.id || idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-brand-sandstone-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-brand-sandstone-50 text-brand-sandstone-700 flex items-center justify-center mb-4 border border-brand-sandstone-200">
                    {serviceIcons[idx % serviceIcons.length]}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-brand-charcoal mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-brand-sandstone-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-sandstone-700" aria-hidden="true" />
                  <span>{lang === 'ta' ? 'முழுமையான ஒருங்கிணைப்பு' : 'Direct Coordination'}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5 – HOW THE GRANITE PURCHASE PROCESS WORKS (4-Step Visual Process)
          From Selection to Delivery
          ========================================================================= */}
      <section className="py-6 bg-brand-light/60 border-y border-slate-200/80">
        <Container>
          <SectionHeader
            badge={processData.badge || (lang === 'ta' ? 'செயல்முறை' : 'Working Process')}
            title={processData.heading || (lang === 'ta' ? 'தேர்வு முதல் டெலிவரி வரை' : 'From Selection to Delivery')}
            subtitle={
              processData.subtitle ||
              (lang === 'ta'
                ? 'உங்கள் கிரானைட் வாங்குதலை எளிதாக்கும் நான்கு-படி வெளிப்படையான செயல்முறை.'
                : 'A clear four-step coordination process to simplify your granite purchase.')
            }
            theme="granite"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(
              processData.steps || [
                {
                  step: '01',
                  title: 'Share Your Requirements',
                  desc: 'Understand the customer preferences, intended usage (flooring, countertops, elevation), site location, and approximate quantity.',
                },
                {
                  step: '02',
                  title: 'Explore Granite Options',
                  desc: 'Explore varieties and compare colours, patterns, and finishes through available supplier options and showroom visits in Hosur.',
                },
                {
                  step: '03',
                  title: 'Quotation & Order Confirmation',
                  desc: 'Obtain relevant supplier pricing, prepare transparent square-foot quotations, and coordinate formal order confirmation.',
                },
                {
                  step: '04',
                  title: 'Payment & Delivery Coordination',
                  desc: 'Coordinate agreed payment schedules and arrange direct vehicle transport to your site across Tamil Nadu.',
                },
              ]
            ).map((st: { step: string; title: string; desc: string }, idx: number) => (
              <div
                key={idx}
                className="relative p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:border-brand-sandstone-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-brand-sandstone-700 tracking-tight">
                      {st.step}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-brand-sandstone-50 border border-brand-sandstone-200 flex items-center justify-center text-xs font-bold text-brand-charcoal">
                      ✓
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-brand-charcoal mb-2 leading-snug">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-sandstone" />
                  <span>
                    {idx === 0
                      ? lang === 'ta'
                        ? 'தொடக்கப் படி'
                        : 'Initial Step'
                      : idx === 3
                      ? lang === 'ta'
                        ? 'இறுதி டெலிவரி'
                        : 'Site Handover'
                      : lang === 'ta'
                      ? 'ஒருங்கிணைப்பு'
                      : 'Active Step'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Confirmation Notice */}
          <div className="mt-8 p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center gap-2.5">
            <Info className="w-4 h-4 text-brand-teal shrink-0" aria-hidden="true" />
            <p className="leading-relaxed">
              {processData.note ||
                (lang === 'ta'
                  ? 'இறுதி விலைகள், இருப்பு மற்றும் டெலிவரி காலக்கெடு ஆகியவை சம்பந்தப்பட்ட சப்ளையருடன் நேரடியாக உறுதி செய்யப்படும்.'
                  : 'Final prices, slab availability, and delivery terms are confirmed directly with the respective supplier.')}
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 6 – UNDERSTANDING SQUARE-FOOT REQUIREMENTS
          How Much Granite Do You Need? (Method 1 & Method 2)
          ========================================================================= */}
      <section className="scroll-mt-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              badge={sqftGuide.badge || (lang === 'ta' ? 'அளவு வழிகாட்டி' : 'Quantity Guide')}
              title={sqftGuide.heading || (lang === 'ta' ? 'உங்களுக்கு எவ்வளவு கிரானைட் தேவை?' : 'How Much Granite Do You Need?')}
              subtitle={
                sqftGuide.subtitle ||
                (lang === 'ta'
                  ? 'சரியான விலைப்பட்டியல் பெற மற்றும் தேவையை துல்லியமாக மதிப்பிட சதுர அடி அளவுகளைப் புரிந்துகொள்ளுதல்.'
                  : 'Understanding square-foot requirements to receive accurate quotations and avoid material shortfalls.')
              }
              theme="granite"
              align="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Method 1: Customer Already Knows the Quantity */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:border-brand-sandstone-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sandstone-50 border border-brand-sandstone-200 text-xs font-bold text-brand-charcoal mb-4">
                    <Ruler className="w-3.5 h-3.5 text-brand-sandstone-700" aria-hidden="true" />
                    <span>{lang === 'ta' ? 'முறை 1' : 'Method 1'}</span>
                  </div>

                  <h3 className="text-base font-bold text-brand-charcoal mb-2 leading-snug">
                    {sqftGuide.method1Title ||
                      (lang === 'ta'
                        ? 'முறை 1 – வாடிக்கையாளருக்கு ஏற்கனவே அளவு தெரியும் போது'
                        : 'Method 1 – Customer Already Knows the Quantity')}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {sqftGuide.method1Desc ||
                      (lang === 'ta'
                        ? 'சில வாடிக்கையாளர்கள் அல்லது ஒப்பந்ததாரர்கள் ஏற்கனவே வரைபடங்கள் அல்லது அளவீடுகள் மூலம் தங்களுக்குத் தேவையான சரியான சதுர அடி பரப்பளவை அறிந்திருப்பார்கள்.'
                        : 'Some customers or contractors already have architectural drawings or measured takeoffs with an exact square footage requirement.')}
                  </p>

                  <div className="p-4 rounded-2xl bg-brand-light border border-slate-200">
                    <p className="text-[11px] font-bold text-brand-charcoal mb-1">
                      {sqftGuide.method1ExampleLabel || (lang === 'ta' ? 'நேரடி அளவு உதாரணம்:' : 'Direct Quantity Example:')}
                    </p>
                    <p className="text-xs text-slate-700 font-mono">
                      {sqftGuide.method1Example ||
                        (lang === 'ta'
                          ? 'உதாரணம்: தேவையான பரப்பு = 500 சதுர அடி. உடனடி விலைப்பட்டியல் ஒருங்கிணைப்பிற்கு இந்த அளவை நேரடியாக படிவத்தில் குறிப்பிடலாம்.'
                          : 'Example: Required area: 500 sq. ft. You can directly share this quantity on our enquiry form for immediate quotation coordination.')}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  {lang === 'ta' ? 'படிவத்தில் நேரடியாக உள்ளிடலாம்' : 'Enter directly on quotation form'}
                </div>
              </div>

              {/* Method 2: Measurement Assistance */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:border-brand-sandstone-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sandstone-50 border border-brand-sandstone-200 text-xs font-bold text-brand-charcoal mb-4">
                    <Calculator className="w-3.5 h-3.5 text-brand-sandstone-700" aria-hidden="true" />
                    <span>{lang === 'ta' ? 'முறை 2' : 'Method 2'}</span>
                  </div>

                  <h3 className="text-base font-bold text-brand-charcoal mb-2 leading-snug">
                    {sqftGuide.method2Title ||
                      (lang === 'ta'
                        ? 'முறை 2 – அளவீட்டு உதவி தேவைப்படும் போது'
                        : 'Method 2 – Measurement Assistance')}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {sqftGuide.method2Desc ||
                      (lang === 'ta'
                        ? 'தேவையான பரப்பளவைக் கணக்கிட உதவி தேவைப்பட்டால், நீளம் மற்றும் அகல அளவுகளைக் கொண்டு எளிதாகக் கணக்கிடலாம்:'
                        : 'If you need help determining the required area, calculate each room or surface using basic length and width dimensions:')}
                  </p>

                  <div className="p-3 rounded-xl bg-brand-charcoal text-white text-center font-mono text-xs font-bold mb-3">
                    {sqftGuide.formula || 'Area = Length × Width'}
                  </div>

                  <div className="p-4 rounded-2xl bg-brand-light border border-slate-200">
                    <p className="text-[11px] font-bold text-brand-charcoal mb-1">
                      {sqftGuide.method2ExampleLabel || (lang === 'ta' ? 'அளவீட்டு உதாரணம்:' : 'Dimension Example:')}
                    </p>
                    <p className="text-xs text-slate-700 font-mono">
                      {sqftGuide.method2Example ||
                        (lang === 'ta'
                          ? 'நீளம் = 20 அடி, அகலம் = 15 அடி → பரப்பளவு = 300 சதுர அடி. பல அறைகள் அல்லது படிக்கட்டுகளுக்கு தனித்தனியாகக் கணக்கிட்டு மொத்தமாகக் கூட்டிக்கொள்ளலாம்.'
                          : 'Length = 20 ft, Width = 15 ft → Area = 300 sq. ft. For multiple rooms or staircases, each area can be calculated separately and combined.')}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  {lang === 'ta' ? 'படிக்கட்டுகள் மற்றும் பல அறைகளுக்கு உதவுகிறோம்' : 'Assistance available for stairs & complex layouts'}
                </div>
              </div>
            </div>

            {/* Wastage and Layout Allowance Notice */}
            <div className="mt-6 p-5 rounded-3xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-3.5">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="font-bold text-amber-900 mb-1">
                  {sqftGuide.wastageNoticeTitle ||
                    (lang === 'ta'
                      ? 'வெட்டுதல் மற்றும் வீணாதல் (Wastage) குறித்த முக்கிய குறிப்பு:'
                      : 'Important Note on Cutting, Layout & Wastage Allowance:')}
                </h4>
                <p className="leading-relaxed">
                  {sqftGuide.wastageNoticeDesc ||
                    (lang === 'ta'
                      ? 'கற்களை வெட்டுதல், விளிம்பு வேலைப்பாடு (edge profiling), வடிவமைப்பு பொருத்தம் மற்றும் நிறுவலின் போது ஏற்படும் சேதாரம் காரணமாக உண்மையான தேவை கணித பரப்பளவை விட சற்று அதிகமாக இருக்கும். இறுதி அளவை உங்கள் கொத்தனார் அல்லது நிறுவல் நிபுணருடன் கலந்தாலோசித்து சப்ளையரிடம் உறுதிப்படுத்த வேண்டும்.'
                      : 'Actual material requirements may differ from simple mathematical area due to slab cutting, edge profiling, pattern matching, breakage margin, and installation layout. The final purchase quantity should always be verified with your contractor, installer, and supplier before placing an order.')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 7 – SUPPLIER NETWORK
          Access to Multiple Granite Companies in Hosur
          ========================================================================= */}
      <section className="py-6 bg-brand-light/60 border-y border-slate-200/80">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              badge={supplierNetwork.badge || (lang === 'ta' ? 'ஓசூர் நெட்வொர்க்' : 'Local Presence')}
              title={
                supplierNetwork.heading ||
                (lang === 'ta'
                  ? 'ஓசூரின் பல முன்னணி கிரானைட் நிறுவனங்களுடன் நேரடி அணுகல்'
                  : 'Access to Multiple Granite Companies in Hosur')
              }
              subtitle={
                supplierNetwork.subtitle ||
                (lang === 'ta'
                  ? 'ஓசூர் இந்தியாவின் முன்னணி இயற்கை கல் பதப்படுத்தும் மையங்களில் ஒன்றாகும். இந்த நேரடி நன்மையை நாங்கள் உங்களுக்கு வழங்குகிறோம்.'
                  : "Hosur is one of India's premier natural stone processing hubs. We leverage this direct proximity for your benefit.")
              }
              theme="granite"
              align="center"
            />

            {/* Description Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs mb-8 text-center sm:text-left">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {supplierNetwork.description ||
                  (lang === 'ta'
                    ? 'ஓசூரிலுள்ள சுமார் 20–25 முன்னணி கிரானைட் நிறுவனங்கள் மற்றும் விற்பனையகங்களுடன் சிவகுமார் அவர்கள் ஒருங்கிணைந்து செயல்படுகிறார். இதன் மூலம் வாடிக்கையாளர்கள் பல சப்ளையர்களின் தயாரிப்புகளை ஒப்பிட்டுச் சிறந்த முடிவை எடுக்க முடிகிறது.'
                    : "Siva Kumar coordinates with approximately 20–25 established granite companies and showrooms in Hosur. Rather than being limited to a single showroom's catalog, customers benefit from comprehensive local market access.")}
              </p>
            </div>

            {/* Customer Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(
                supplierNetwork.benefits || [
                  {
                    title: 'Explore Multiple Granite Options',
                    desc: 'Review a diverse spectrum of colours, slab thicknesses, and natural patterns across multiple yards.',
                  },
                  {
                    title: 'Compare Available Varieties',
                    desc: 'Evaluate stone quality, hardness, and grain consistency across different regional sources.',
                  },
                  {
                    title: 'Understand Supplier Quotations',
                    desc: 'Compare transparent square-foot pricing from different showrooms to make informed, value-driven decisions.',
                  },
                  {
                    title: 'Coordinate Showroom Visits',
                    desc: 'Visit Hosur granite yards accompanied by Siva Kumar when you want to inspect actual stone lots in person.',
                  },
                  {
                    title: 'Select Based on Customer Requirements',
                    desc: 'Choose stone tailored to your specific architectural layout, durability demands, and budget parameters.',
                  },
                ]
              ).map((ben: { title: string; desc: string }, idx: number) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-brand-sandstone-300 transition-all ${
                    idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-brand-sandstone-50 text-brand-sandstone-800 flex items-center justify-center text-xs font-bold mb-3 border border-brand-sandstone-200">
                    <PackageCheck className="w-4 h-4 text-brand-sandstone-700" aria-hidden="true" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal mb-1.5">{ben.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{ben.desc}</p>
                </div>
              ))}
            </div>

            {/* Factual Disclaimer: No fabricated supplier names, no false endorsement */}
            <div className="mt-8 p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 leading-relaxed">
              <p>
                {supplierNetwork.disclaimer ||
                  (lang === 'ta'
                    ? 'சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் நிறுவனம் ஓசூரின் சுயாதீன கிரானைட் நிறுவனங்களுடன் இணைந்து சேவை ஒருங்கிணைப்பை மட்டுமே வழங்குகிறது. சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் நிறுவனத்திற்கு சொந்தமாக கிரானைட் குவாரிகள் அல்லது உற்பத்தி தொழிற்சாலைகள் இல்லை, மேலும் சப்ளையர் பெயர்கள் சரிபார்க்கப்படாத உரிமைகோரல்கள் இன்றி உள்ளபடியே குறிப்பிடப்படுகின்றன.'
                    : 'SIVA INSURANCES & GRANITE SERVICES coordinates with independent granite companies and showrooms in Hosur. SIVA INSURANCES & GRANITE SERVICES does not own granite quarries or processing factories, and supplier names are presented factually without unverified endorsement claims.')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 8 – EXPERIENCE AND PROFESSIONAL PROFILE
          Reusing OwnerProfile & ExperienceHighlight (context="granite")
          ========================================================================= */}
      <section className="scroll-mt-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-sandstone-50 text-brand-charcoal border border-brand-sandstone-200 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-sandstone-700" aria-hidden="true" />
                <span>{lang === 'ta' ? 'தொழில்முறை தலைமை' : 'Leadership & Trust'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal">
                {lang === 'ta' ? 'அனுபவம் & தொழில்முறை பார்வை' : 'Experience & Professional Profile'}
              </h2>
            </div>

            <div className="space-y-6">
              {/* Owner Profile Hero View */}
              <OwnerProfile lang={lang} variant="hero" />

              {/* Combined Professional Experience Highlight */}
              <ExperienceHighlight lang={lang} variant="card" context="granite" />
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 9 – GRANITE COMPANY RECOGNITION
          Reuse RecognitionGallery (category="granite")
          Hidden completely if no verified photographs exist
          ========================================================================= */}
      {hasVerifiedAwards('granite') && (
        <section className="scroll-mt-16">
          <Container>
            <RecognitionGallery lang={lang} category="granite" />
          </Container>
        </section>
      )}

      {/* =========================================================================
          SECTION 10 – FREQUENTLY ASKED QUESTIONS (8 Specific Q&As)
          ========================================================================= */}
      <section className="scroll-mt-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              badge={faqData.badge || (lang === 'ta' ? 'பொதுவான கேள்விகள்' : 'Common Questions')}
              title={faqData.heading || (lang === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions')}
              subtitle={
                faqData.subtitle ||
                (lang === 'ta'
                  ? 'சிவா கிரானைட்ஸ் மூலம் கிரானைட் தேர்வு மற்றும் கொள்முதல் தொடர்பான தெளிவான விளக்கங்கள்.'
                  : 'Clear, straightforward answers about exploring, selecting, and purchasing granite through Siva Granites.')
              }
              theme="granite"
              align="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {(
                faqData.items || [
                  {
                    q: 'Where can I explore granite varieties?',
                    a: 'Siva Kumar coordinates with approximately 20–25 granite companies and showrooms in Hosur, giving you access to view a wide range of natural stone varieties, colours, and finishes in one central hub.',
                  },
                  {
                    q: 'Do you serve customers outside Hosur?',
                    a: 'Yes. Granite coordination services are available to customers across Tamil Nadu. We coordinate direct transportation from Hosur to your project site, subject to supplier and transport arrangements.',
                  },
                  {
                    q: 'Can I request a quotation based on square feet?',
                    a: 'Yes. Customers can share their required area in square feet. Siva Kumar will coordinate with suppliers to obtain competitive, transparent per-square-foot quotations based on your chosen stone and finish.',
                  },
                  {
                    q: "What if I don't know the required square footage?",
                    a: 'If you do not know the exact square footage, you can share room dimensions (length and width) or architectural plans. We assist in understanding the calculations and estimating the required quantity including cutting allowances.',
                  },
                  {
                    q: 'Can I compare different granite varieties?',
                    a: 'Yes. Personal assistance is provided to help you explore and compare different varieties in terms of colour consistency, mineral patterns, durability, surface finishes (polished, leather, flamed, honed), and price points.',
                  },
                  {
                    q: 'Who arranges transportation?',
                    a: 'Transportation is coordinated based on your delivery location, the supplier dispatch point, and order volume. We coordinate with reliable logistics providers to ensure safe transport from Hosur to your site.',
                  },
                  {
                    q: 'How does the payment process work?',
                    a: 'Payment arrangements depend on the individual supplier and order requirements. The applicable payment terms, advance conditions, and delivery schedules will be explained transparently before you confirm your order.',
                  },
                  {
                    q: 'Can I visit granite companies with Siva Kumar?',
                    a: 'Yes. Showroom and yard visits in Hosur can be coordinated based on customer requirements and supplier arrangements, allowing you to inspect actual stone slabs before purchase.',
                  },
                ]
              ).map((faq: { q: string; a: string }, idx: number) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-brand-sandstone-300 transition-all flex flex-col justify-start"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-4 h-4 text-brand-sandstone-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal mb-2 leading-snug">
                        {faq.q}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 11 – GRANITE ENQUIRY FORM
          Integrated Formspree submission, full inputs
          ========================================================================= */}
      <section id="enquiry" className="scroll-mt-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <GraniteEnquiryForm lang={lang} />
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 12 – FINAL CALL TO ACTION
          Ready to Explore Granite Options?
          ========================================================================= */}
      <section className="scroll-mt-16">
        <Container>
          <div className="rounded-3xl bg-brand-charcoal p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-lg border border-slate-800">
            {/* Background Texture & Tone */}
            <div className="absolute inset-0 bg-radial from-brand-sandstone/15 via-transparent to-transparent pointer-events-none" />

            <div className="relative max-w-2xl mx-auto flex flex-col items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-brand-sandstone border border-brand-sandstone/30 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-brand-sandstone" aria-hidden="true" />
                <span>{ctaData.badge || (lang === 'ta' ? 'தொடர்புகொள்ள' : 'Get in Touch')}</span>
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">
                {ctaData.heading ||
                  (lang === 'ta' ? 'கிரானைட் வகைகளை அறிய தயாரா?' : 'Ready to Explore Granite Options?')}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8 max-w-xl">
                {ctaData.description ||
                  (lang === 'ta'
                    ? 'உங்கள் கிரானைட் தேவைகளைப் பகிர்ந்து, தேர்வு, விலைப்பட்டியல் மற்றும் கொள்முதல் ஒருங்கிணைப்பிற்கான நேரடி உதவியைப் பெறுங்கள்.'
                    : 'Share your granite requirements and get assistance with selection, quotations and purchase coordination.')}
              </p>

              {/* 3 Buttons: Request a Granite Quotation (#enquiry), Contact SIVA INSURANCES & GRANITE SERVICES (/contact), Explore Granite Catalogue (/granites/catalogue) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto">
                <Button href="#enquiry" variant="sandstone" size="md">
                  {ctaData.btnQuotation ||
                    (lang === 'ta' ? 'கிரானைட் விலைப்பட்டியல் கோர' : 'Request a Granite Quotation')}
                </Button>

                <Button href={`/${lang}/contact`} variant="outline" size="md" className="border-slate-500 text-white hover:bg-white/10">
                  {ctaData.btnContact ||
                    (lang === 'ta' ? 'எங்களை தொடர்புகொள்ள' : 'Contact SIVA INSURANCES & GRANITE SERVICES')}
                </Button>

                <Button href={`/${lang}/granites/catalogue`} variant="outline" size="md" className="border-slate-500 text-white hover:bg-white/10">
                  {ctaData.btnCatalogue ||
                    (lang === 'ta' ? 'கிரானைட் வகைகளை அறிய' : 'Explore Granite Catalogue')}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
