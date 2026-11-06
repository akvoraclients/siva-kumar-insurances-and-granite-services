'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SupportedLanguage } from '@/types';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLang: SupportedLanguage;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  className = '',
}) => {
  const pathname = usePathname();

  const getTargetHref = (targetLang: SupportedLanguage) => {
    if (!pathname) return `/${targetLang}`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) {
      return `/${targetLang}`;
    }
    // Replace language prefix if already [en|ta]
    if (segments[0] === 'en' || segments[0] === 'ta') {
      segments[0] = targetLang;
      return `/${segments.join('/')}`;
    }
    // Prepend targetLang
    return `/${targetLang}/${segments.join('/')}`;
  };

  const handleLanguageClick = (lang: SupportedLanguage) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('siva_lang', lang);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  };

  return (
    <div
      className={`inline-flex items-center bg-slate-100/90 border border-slate-200/80 rounded-full p-0.5 sm:p-1 text-xs font-semibold ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1 shrink-0 hidden xs:block" aria-hidden="true" />
      
      <Link
        href={getTargetHref('en')}
        onClick={() => handleLanguageClick('en')}
        className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full transition-all text-xs font-semibold select-none ${
          currentLang === 'en'
            ? 'bg-brand-navy text-white shadow-xs'
            : 'text-slate-700 hover:text-brand-navy hover:bg-slate-200/60'
        }`}
        aria-label="EN - Switch to English"
        aria-current={currentLang === 'en' ? 'page' : undefined}
      >
        EN
      </Link>

      <span className="text-slate-300 mx-0.5 select-none" aria-hidden="true">|</span>

      <Link
        href={getTargetHref('ta')}
        onClick={() => handleLanguageClick('ta')}
        className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full transition-all text-xs font-semibold select-none ${
          currentLang === 'ta'
            ? 'bg-brand-navy text-white shadow-xs'
            : 'text-slate-700 hover:text-brand-navy hover:bg-slate-200/60'
        }`}
        aria-label="தமிழ் - தமிழுக்கு மாறவும்"
        aria-current={currentLang === 'ta' ? 'page' : undefined}
      >
        தமிழ்
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
