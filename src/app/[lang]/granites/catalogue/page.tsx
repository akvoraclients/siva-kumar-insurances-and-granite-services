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
import { GraniteCatalogueExplorer } from '@/components/granite/GraniteCatalogueExplorer';
import {
  ArrowLeft,
  Info,
  Layers,
  Sparkles,
  Flame,
  Hand,
  Disc,
  ShieldCheck,
  Building2,
  Calculator,
  Truck,
  ArrowRight,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const lang: SupportedLanguage = resolved.lang === 'ta' ? 'ta' : 'en';

  const title =
    lang === 'ta'
      ? 'கிரானைட் அட்டவணை & வகைகள் | சிவா கிரானைட்ஸ் ஓசூர்'
      : 'Granite Catalogue & Varieties | Siva Granites Hosur';

  const description =
    lang === 'ta'
      ? 'கருப்பு, வெள்ளை, சாம்பல், பிரவுன், சிவப்பு கிரானைட் வண்ணங்கள் மற்றும் பாலிஷ், லெதர், ஃபிளேம்ட், ஹோன்ட் ஃபினிஷிங் வகைகளை ஆராயுங்கள்.'
      : 'Explore black, white, grey, brown, and red granite varieties with polished, leather, flamed, and honed surface finishes in Hosur.';

  return generateSeoMetadata(lang, title, description);
}

export default async function GraniteCataloguePage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang: SupportedLanguage = resolvedParams.lang === 'ta' ? 'ta' : 'en';
  const dict = getDictionary(lang);
  const cat = dict.granites?.cataloguePage || {};
  const finishesData = cat.finishesSection || {};
  const quoteData = cat.quoteSection || {};

  const valueIcons = [
    <ShieldCheck key="shield" className="w-4 h-4 text-brand-sandstone-700 shrink-0" aria-hidden="true" />,
    <Building2 key="build" className="w-4 h-4 text-brand-sandstone-700 shrink-0" aria-hidden="true" />,
    <Calculator key="calc" className="w-4 h-4 text-brand-sandstone-700 shrink-0" aria-hidden="true" />,
    <Truck key="truck" className="w-4 h-4 text-brand-sandstone-700 shrink-0" aria-hidden="true" />,
  ];

  const finishIcons: Record<string, React.ReactNode> = {
    polished: <Sparkles className="w-4 h-4 text-brand-sandstone-700 shrink-0" aria-hidden="true" />,
    leather: <Hand className="w-4 h-4 text-brand-sandstone-700 shrink-0" aria-hidden="true" />,
    flamed: <Flame className="w-4 h-4 text-brand-sandstone-700 shrink-0" aria-hidden="true" />,
    honed: <Disc className="w-4 h-4 text-brand-sandstone-700 shrink-0" aria-hidden="true" />,
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-8 md:pb-12">
      {/* =========================================================================
          TOP NAVIGATION BAR & INTRODUCTION
          ========================================================================= */}
      <section className="pt-6">
        <Container>
          <Link
            href={`/${lang}/granites`}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-charcoal font-semibold mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{dict.nav?.granites || (lang === 'ta' ? 'சிவா கிரானைட்ஸ்' : 'Siva Granites')}</span>
          </Link>

          <div className="max-w-4xl">
            <SectionHeader
              badge={cat.badge || (lang === 'ta' ? 'காட்சிப் பார்வை அட்டவணை' : 'Visual Exploration Catalogue')}
              title={cat.heading || (lang === 'ta' ? 'கிரானைட் வகைகளை அறியுங்கள்' : 'Explore Granite Varieties')}
              subtitle={
                cat.description ||
                (lang === 'ta'
                  ? 'பல்வேறு கிரானைட் வண்ணங்கள், இயற்கை வடிவங்கள் மற்றும் மேற்பரப்பு ஃபினிஷிங் வகைகளை ஆராயுங்கள். ஓசூரிலுள்ள முன்னணி கிரானைட் நிறுவனங்கள் மற்றும் விற்பனையகங்களில் இருந்து உங்கள் இடத்திற்கு ஏற்ற கற்களைத் தேர்ந்தெடுக்க சிவா கிரானைட்ஸ் உதவுகிறது.'
                  : 'Explore different granite colours, natural patterns and surface finishes. Siva Granites helps customers coordinate with different granite companies and showrooms in Hosur to find suitable options.')
              }
              theme="granite"
            />

            {/* 4 Core Pillars of Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6 mb-8">
              {(
                cat.introPoints || [
                  {
                    title: 'Personal Selection Assistance',
                    desc: 'Direct consultation with Siva Kumar to understand your aesthetic preferences.',
                  },
                  {
                    title: 'Multiple Supplier Options',
                    desc: 'Access 20–25 granite companies and showrooms in Hosur.',
                  },
                  {
                    title: 'Quotations Based on Sq. Ft.',
                    desc: 'Clear per-square-foot quotations based on your dimensions and finish.',
                  },
                  {
                    title: 'Service Across Tamil Nadu',
                    desc: 'Direct vehicle logistics from Hosur to sites across Tamil Nadu.',
                  },
                ]
              ).map((pt: { title: string; desc: string }, idx: number) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-start"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {valueIcons[idx % valueIcons.length]}
                    <h4 className="text-xs font-bold text-brand-charcoal">{pt.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{pt.desc}</p>
                </div>
              ))}
            </div>

            {/* Mandatory Catalogue Disclaimer Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-sandstone-50 border border-brand-sandstone-200 text-xs text-brand-charcoal flex items-start gap-3 shadow-2xs">
              <Info className="w-5 h-5 text-brand-sandstone-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-bold text-brand-charcoal mb-0.5">
                  {cat.disclaimerTitle || (lang === 'ta' ? 'அட்டவணை குறித்த முக்கிய குறிப்பு:' : 'Important Catalogue Notice:')}
                </p>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {cat.disclaimer ||
                    (lang === 'ta'
                      ? 'இங்கு காட்டப்பட்டுள்ள படங்கள் கிரானைட் தோற்றத்திற்கான மாதிரி எடுத்துக்காட்டுகளே. உண்மையான வண்ணங்கள், வரிகள், ஃபினிஷிங் மற்றும் இருப்பு ஆகியவை சப்ளையர்களுக்கும் தனிப்பட்ட கல் தொகுதிகளுக்கும் (batch) ஏற்ப மாறுபடலாம். இறுதித் தேர்வு சப்ளையரிடம் நேரடியாக உறுதிப்படுத்தப்பட வேண்டும்.'
                      : 'Images are representative examples of granite appearances. Actual colours, patterns, finishes and availability may vary between suppliers and individual stone batches. Please confirm the final selection with the supplier.')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2: UNDERSTANDING SURFACE FINISHES
          Polished, Leather, Flamed, Honed
          ========================================================================= */}
      <section className="py-10 bg-brand-light/70 border-y border-slate-200/80">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              badge={finishesData.badge || (lang === 'ta' ? 'மேற்பரப்பு சிகிச்சைகள்' : 'Surface Treatments')}
              title={finishesData.heading || (lang === 'ta' ? 'மேற்பரப்பு ஃபினிஷிங் வகைகளைப் புரிந்துகொள்ளுதல்' : 'Understanding Surface Finishes')}
              subtitle={
                finishesData.subtitle ||
                (lang === 'ta'
                  ? 'இயற்கை கிரானைட் கற்களை பல்வேறு மேற்பரப்பு சிகிச்சைகள் மூலம் உருவாக்கலாம், ஒவ்வொன்றும் தனித்துவமான பளபளப்பு, தொடு உணர்வு மற்றும் வழுக்காத அமைப்பை வழங்குகின்றன.'
                  : 'Natural granite can be crafted with distinct surface treatments, each offering different visual sheen, tactile textures, and slip resistance.')
              }
              theme="granite"
              align="center"
            />

            {/* Visual Overview Graphic */}
            <div className="mb-8 rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 relative aspect-21/9 max-w-3xl mx-auto">
              <Image
                src="/images/granite/granite-finishes.svg"
                alt={
                  lang === 'ta'
                    ? 'கிரானைட் மேற்பரப்பு ஃபினிஷிங் ஒப்பீடு: பாலிஷ், லெதர், ஃபிளேம்ட், ஹோன்ட்'
                    : 'Comparison of granite surface finishes: Polished, Leather, Flamed, Honed'
                }
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            {/* 4 Finishes Explanatory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
              {(
                finishesData.items || [
                  {
                    id: 'polished',
                    name: 'Polished Finish',
                    tag: 'High Gloss & Reflective',
                    desc: 'Diamond-polished to a high mirror shine that accentuates deep crystal reflections and natural stone color depth.',
                    usage: 'Recommended for kitchen countertops, dining tables, interior flooring, and luxury feature walls.',
                  },
                  {
                    id: 'leather',
                    name: 'Leather / Antique Finish',
                    tag: 'Tactile & Matte Textured',
                    desc: 'Brushed with diamond abrasive brushes to produce a subtle undulating, leather-like texture that conceals smudges and fingerprints.',
                    usage: 'Popular for modern kitchen islands, bathroom vanities, bar counters, and low-glare accent spaces.',
                  },
                  {
                    id: 'flamed',
                    name: 'Flamed Finish',
                    tag: 'Rough & Non-Slip',
                    desc: 'Heat-treated with intense torches to fracture surface quartz crystals, creating a rough, weathered, non-slip textured face.',
                    usage: 'Essential for exterior paving, outdoor staircases, ramps, swimming pool decks, and garden pathways.',
                  },
                  {
                    id: 'honed',
                    name: 'Honed Finish',
                    tag: 'Smooth Satin Matte',
                    desc: 'Precision-ground to a flat, velvety satin matte surface without high-gloss reflections, offering subtle modern sophistication.',
                    usage: 'Well-suited for high-traffic commercial foyers, contemporary residential floors, and minimalist wall cladding.',
                  },
                ]
              ).map(
                (f: { id: string; name: string; tag: string; desc: string; usage: string }) => (
                  <div
                    key={f.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:border-brand-sandstone-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-brand-sandstone-50 border border-brand-sandstone-200 flex items-center justify-center">
                            {finishIcons[f.id] || <Sparkles className="w-4 h-4 text-brand-sandstone-700" />}
                          </div>
                          <h4 className="text-sm font-bold text-brand-charcoal">{f.name}</h4>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-light text-slate-700 border border-slate-200">
                          {f.tag}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-3">{f.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                      <span className="font-semibold text-brand-charcoal">
                        {lang === 'ta' ? 'பரிந்துரைக்கப்படும் பயன்பாடு:' : 'Recommended Application:'}{' '}
                      </span>
                      <span>{f.usage}</span>
                    </div>
                  </div>
                )
              )}
            </div>

            <p className="text-[11px] text-slate-500 text-center italic">
              {finishesData.note ||
                (lang === 'ta'
                  ? 'குறிப்பு: அனைத்து கிரானைட் வகைகளும் அனைத்து ஃபினிஷிங்கிலும் கிடைக்காது. கல் கடினத்தன்மை மற்றும் சப்ளையர் தயாரிப்பு முறைகளுக்கு ஏற்ப இது மாறுபடும்.'
                  : 'Note: Not every granite variety is available in every finish. Specific finish availability depends on natural stone density and supplier processing lines.')}
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3: INTERACTIVE CATALOGUE EXPLORER (With Filters)
          ========================================================================= */}
      <section>
        <Container>
          <GraniteCatalogueExplorer lang={lang} dict={dict} />
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4: SQUARE-FOOT QUOTATION CTA
          Looking for a Granite Quotation?
          ========================================================================= */}
      <section className="scroll-mt-16">
        <Container>
          <div className="rounded-3xl bg-brand-charcoal text-white p-8 sm:p-12 relative overflow-hidden shadow-lg border border-slate-800">
            <div className="absolute inset-0 bg-radial from-brand-sandstone/15 via-transparent to-transparent pointer-events-none" />

            <div className="relative max-w-2xl mx-auto text-center flex flex-col items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-brand-sandstone border border-brand-sandstone/30 mb-4">
                <Calculator className="w-3.5 h-3.5 text-brand-sandstone" aria-hidden="true" />
                <span>{quoteData.badge || (lang === 'ta' ? 'விலைப்பட்டியல் ஒருங்கிணைப்பு' : 'Quotation Coordination')}</span>
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">
                {quoteData.heading || (lang === 'ta' ? 'கிரானைட் விலைப்பட்டியல் தேவையா?' : 'Looking for a Granite Quotation?')}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-xl">
                {quoteData.description ||
                  (lang === 'ta'
                    ? 'உங்களுக்குத் தேவையான சதுர அடி பரப்பளவு தெரிந்திருந்தாலும், அல்லது அளவீடுகளைக் கணக்கிடவும் வீணாதல் அளவுகளை மதிப்பிடவும் உதவி தேவைப்பட்டாலும், சிவகுமார் அவர்கள் வெளிப்படையான சதுர அடி விலைப்பட்டியல்களை நேரடியாக ஒருங்கிணைக்கிறார்.'
                    : 'Whether you already know your required area in square feet or need assistance calculating room measurements and wastage allowances, Siva Kumar coordinates transparent per-sq-ft quotations directly from Hosur showrooms.')}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto">
                <Button href={`/${lang}/granites#enquiry`} variant="sandstone" size="md">
                  {quoteData.ctaBtn || (lang === 'ta' ? 'கிரானைட் விலைப்பட்டியல் கோர' : 'Request a Granite Quotation')}
                </Button>

                <Button
                  href={`/${lang}/granites`}
                  variant="outline"
                  size="md"
                  className="border-slate-500 text-white hover:bg-white/10"
                >
                  {quoteData.backToOverview || (lang === 'ta' ? 'சிவா கிரானைட்ஸ் முகப்பிற்கு' : 'View Siva Granites Overview')}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
