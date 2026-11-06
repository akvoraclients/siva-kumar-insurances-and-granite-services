'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SupportedLanguage } from '@/types';
import {
  GRANITE_CATALOGUE_ITEMS,
  GraniteColour,
  GraniteFinish,
  GraniteCatalogueItem,
} from '@/lib/granite-catalogue';
import {
  Sparkles,
  Layers,
  ArrowRight,
  RotateCcw,
  Check,
  SearchX,
  Compass,
} from 'lucide-react';

interface GraniteCatalogueExplorerProps {
  lang: SupportedLanguage;
  dict: any;
}

export const GraniteCatalogueExplorer: React.FC<GraniteCatalogueExplorerProps> = ({
  lang,
  dict,
}) => {
  const [selectedColour, setSelectedColour] = useState<GraniteColour | 'all'>('all');
  const [selectedFinish, setSelectedFinish] = useState<GraniteFinish | 'all'>('all');

  const filterText = dict.granites?.cataloguePage?.filters || {};
  const cardText = dict.granites?.cataloguePage?.cards || {};

  // Colour filter definitions
  const colourOptions: { id: GraniteColour | 'all'; label: string; dotClass: string }[] = [
    { id: 'all', label: filterText.colours?.all || (lang === 'ta' ? 'அனைத்தும்' : 'All Colours'), dotClass: 'bg-slate-400' },
    { id: 'black', label: filterText.colours?.black || (lang === 'ta' ? 'கருப்பு' : 'Black'), dotClass: 'bg-slate-900 border border-slate-700' },
    { id: 'white', label: filterText.colours?.white || (lang === 'ta' ? 'வெள்ளை' : 'White & Light'), dotClass: 'bg-slate-100 border border-slate-300' },
    { id: 'grey', label: filterText.colours?.grey || (lang === 'ta' ? 'சாம்பல்' : 'Grey'), dotClass: 'bg-slate-500' },
    { id: 'brown', label: filterText.colours?.brown || (lang === 'ta' ? 'பிரவுன்' : 'Brown'), dotClass: 'bg-amber-900' },
    { id: 'red', label: filterText.colours?.red || (lang === 'ta' ? 'சிவப்பு' : 'Red / Natural'), dotClass: 'bg-red-700' },
  ];

  // Finish filter definitions
  const finishOptions: { id: GraniteFinish | 'all'; label: string }[] = [
    { id: 'all', label: filterText.finishes?.all || (lang === 'ta' ? 'அனைத்து ஃபினிஷிங்கும்' : 'All Finishes') },
    { id: 'polished', label: filterText.finishes?.polished || (lang === 'ta' ? 'பாலிஷ்' : 'Polished') },
    { id: 'leather', label: filterText.finishes?.leather || (lang === 'ta' ? 'லெதர்' : 'Leather') },
    { id: 'flamed', label: filterText.finishes?.flamed || (lang === 'ta' ? 'ஃபிளேம்ட்' : 'Flamed') },
    { id: 'honed', label: filterText.finishes?.honed || (lang === 'ta' ? 'ஹோன்ட்' : 'Honed') },
  ];

  // Filter items based on combined selection
  const filteredItems = useMemo(() => {
    return GRANITE_CATALOGUE_ITEMS.filter((item) => {
      const matchColour = selectedColour === 'all' || item.colour === selectedColour;
      const matchFinish = selectedFinish === 'all' || item.finishes.includes(selectedFinish);
      return matchColour && matchFinish;
    });
  }, [selectedColour, selectedFinish]);

  const isFiltered = selectedColour !== 'all' || selectedFinish !== 'all';

  const resetFilters = () => {
    setSelectedColour('all');
    setSelectedFinish('all');
  };

  return (
    <div id="styles-explorer" className="scroll-mt-16">
      {/* =========================================================================
          FILTER CONTROLS BAR (Mobile-friendly, responsive, interactive)
          ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-brand-charcoal flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-sandstone-700" aria-hidden="true" />
              <span>{filterText.title || (lang === 'ta' ? 'ஊடாடும் அட்டவணை வடிகட்டி' : 'Interactive Catalogue Explorer')}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'ta'
                ? 'உங்கள் இடத்திற்கான வண்ணங்கள் மற்றும் மேற்பரப்பு ஃபினிஷிங் அடிப்படையில் வடிகட்டுங்கள்'
                : 'Filter natural granite styles by colour tone and surface treatment'}
            </p>
          </div>

          {/* Results count & Reset action */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-light text-slate-700 border border-slate-200">
              {filterText.showing || (lang === 'ta' ? 'காட்டப்படும் அளவுகள்:' : 'Showing')}{' '}
              <strong className="text-brand-charcoal">{filteredItems.length}</strong>{' '}
              {filterText.of || (lang === 'ta' ? '/' : 'of')}{' '}
              {GRANITE_CATALOGUE_ITEMS.length}{' '}
              {filterText.styles || (lang === 'ta' ? 'பாணிகள்' : 'styles')}
            </span>

            {isFiltered && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-sandstone-800 hover:text-brand-charcoal px-3 py-1 rounded-full bg-brand-sandstone-50 border border-brand-sandstone-300 hover:bg-brand-sandstone-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-brand-sandstone-700" aria-hidden="true" />
                <span>{filterText.reset || (lang === 'ta' ? 'மீட்டமைக்க' : 'Reset')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Rows */}
        <div className="pt-5 space-y-4">
          {/* Row 1: Colour Filter Pills */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              {filterText.colourLabel || (lang === 'ta' ? 'வண்ணம் வாரியாக தேர்வு:' : 'Filter by Colour:')}
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {colourOptions.map((opt) => {
                const isActive = selectedColour === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedColour(opt.id)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-brand-charcoal text-white shadow-xs'
                        : 'bg-brand-light text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${opt.dotClass} shrink-0`} aria-hidden="true" />
                    <span>{opt.label}</span>
                    {isActive && <Check className="w-3 h-3 text-brand-sandstone shrink-0" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Finish Filter Pills */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              {filterText.finishLabel || (lang === 'ta' ? 'ஃபினிஷிங் வாரியாக தேர்வு:' : 'Filter by Finish:')}
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {finishOptions.map((opt) => {
                const isActive = selectedFinish === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedFinish(opt.id)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-brand-sandstone-700 text-white shadow-xs'
                        : 'bg-brand-light text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isActive && <Check className="w-3 h-3 text-white shrink-0" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CATALOGUE CARDS GRID / EMPTY STATE
          ========================================================================= */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-brand-sandstone-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* 3:2 Aspect Ratio Image Frame */}
                <div className="relative aspect-3/2 w-full bg-slate-900 border-b border-slate-100">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt[lang] || item.imageAlt.en}
                    fill
                    loading="lazy"
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Subtle Illustrative Badge */}
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs border border-white/20">
                    {cardText.badge || (lang === 'ta' ? 'மாதிரி பாணி' : 'Illustrative Sample')}
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 space-y-3">
                  {/* Title and Tone */}
                  <div>
                    <h4 className="text-base font-extrabold text-brand-charcoal">
                      {item.name[lang] || item.name.en}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.colourDescription[lang] || item.colourDescription.en}
                    </p>
                  </div>

                  {/* Natural Pattern Description */}
                  <div className="p-3 rounded-xl bg-brand-light border border-slate-200/80 text-xs">
                    <span className="font-bold text-brand-charcoal block mb-0.5">
                      {cardText.pattern || (lang === 'ta' ? 'இயற்கை அமைப்பு:' : 'Natural Pattern:')}
                    </span>
                    <span className="text-slate-600 leading-relaxed">
                      {item.patternDescription[lang] || item.patternDescription.en}
                    </span>
                  </div>

                  {/* Finishes Pills */}
                  <div>
                    <span className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                      {cardText.availableFinishes || (lang === 'ta' ? 'கிடைக்கும் ஃபினிஷிங்:' : 'Available Finishes:')}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.finishes.map((f) => (
                        <span
                          key={f}
                          className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-brand-sandstone-50 text-brand-sandstone-900 border border-brand-sandstone-200"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Usage */}
                  <div className="text-xs text-slate-600 pt-1">
                    <span className="font-semibold text-slate-800">
                      {cardText.usage || (lang === 'ta' ? 'பரிந்துரைக்கப்படும் பயன்பாடு:' : 'Suggested Usage:')}{' '}
                    </span>
                    <span>{item.suggestedUsage[lang] || item.suggestedUsage.en}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Action button carrying category to enquiry form */}
              <div className="p-5 sm:p-6 pt-0">
                <Link
                  href={`/${lang}/granites?colour=${item.colour}&style=${encodeURIComponent(item.name[lang] || item.name.en)}#enquiry`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#17324D] hover:bg-[#10263A] active:bg-[#0c1e2e] text-white text-xs font-bold transition-all shadow-xs cursor-pointer min-h-[44px]"
                >
                  <span>{cardText.enquireBtn || (lang === 'ta' ? 'விலைப்பட்டியல் கேட்க' : 'Request Quotation')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-sandstone" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty-results State */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <SearchX className="w-7 h-7" aria-hidden="true" />
          </div>
          <h4 className="text-base sm:text-lg font-bold text-brand-charcoal mb-2">
            {filterText.noResults || (lang === 'ta' ? 'கிரானைட் பாணிகள் எதுவும் கிடைக்கவில்லை' : 'No matching granite styles found')}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-6">
            {filterText.noResultsHint ||
              (lang === 'ta'
                ? 'நீங்கள் தேர்ந்தெடுத்த வண்ணங்கள் மற்றும் ஃபினிஷிங் கலவைக்கு ஏற்ப பாணிகள் இல்லை. வடிகட்டிகளை மீட்டமைக்கலாம்.'
                : 'No styles match this specific colour and finish combination. Try clearing or relaxing your filters.')}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#17324D] text-white text-xs font-bold hover:bg-[#10263A] active:bg-[#0c1e2e] transition-all cursor-pointer min-h-[44px]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-brand-sandstone" aria-hidden="true" />
            <span>{filterText.reset || (lang === 'ta' ? 'வடிகட்டிகளை மீட்டமைக்க' : 'Reset All Filters')}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default GraniteCatalogueExplorer;
