'use client';

import React, { useState, useCallback } from 'react';
import { SupportedLanguage } from '@/types';
import { BUSINESS_INFO, BRAND_TAGLINE, CONTACT_STATUS_MESSAGES } from '@/lib/constants';
import { Logo } from '@/components/common/Logo';
import { Navigation } from './Navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNavigation } from './MobileNavigation';
import { Menu, Phone, MapPin } from 'lucide-react';

interface HeaderProps {
  lang: SupportedLanguage;
  dict: Record<string, any>;
  isMobileMenuOpen?: boolean;
  onOpenMobileMenu?: () => void;
  onCloseMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  dict,
  isMobileMenuOpen: controlledOpen,
  onOpenMobileMenu,
  onCloseMobileMenu,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isMobileMenuOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleCloseMobileMenu = useCallback(() => {
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    } else {
      setInternalOpen(false);
    }
  }, [onCloseMobileMenu]);

  const handleOpenMobileMenu = useCallback(() => {
    if (onOpenMobileMenu) {
      onOpenMobileMenu();
    } else {
      setInternalOpen(true);
    }
  }, [onOpenMobileMenu]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro-bar: Location & Verified Status */}
      <div className="bg-brand-navy text-white text-xs py-1.5 px-3 sm:px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 truncate min-w-0">
            <a
              href="https://maps.app.goo.gl/6DvzC8DF2p4a3wdy8?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal-300 hover:text-white transition-colors shrink-0 inline-flex items-center gap-1 focus:outline-hidden focus:ring-1 focus:ring-teal-300 rounded px-1 -mx-1"
              aria-label={lang === 'ta' ? 'கூகுள் மேப்ஸில் சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் இருப்பிடத்தைக் காண்க' : 'View SIVA INSURANCES & GRANITE SERVICES location in Google Maps'}
              title="Hosur, Tamil Nadu (View on Google Maps)"
            >
              <span>Hosur</span>
            </a>
            <span className="text-slate-400 hidden sm:inline" aria-hidden="true">•</span>
            <span className="text-slate-300 truncate text-[11px] sm:text-xs">{BRAND_TAGLINE[lang]}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {BUSINESS_INFO.isPhoneConfigured && BUSINESS_INFO.phone ? (
              <div className="flex items-center gap-2.5">
                <a
                  href="tel:+919894829633"
                  className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors py-1"
                >
                  <Phone className="w-3 h-3 text-teal-300" aria-hidden="true" />
                  <span className="text-xs font-semibold">+91 98948 29633</span>
                </a>
                <span className="text-slate-500 hidden sm:inline" aria-hidden="true">|</span>
                <a
                  href="tel:+919080445622"
                  className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors text-xs font-semibold py-1"
                >
                  <span>+91 90804 45622</span>
                </a>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-slate-300 text-[11px]">
                <MapPin className="w-3 h-3 text-teal-300 shrink-0" aria-hidden="true" />
                <span className="truncate">Hosur, TN</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <Logo lang={lang} variant="header" showTagline={true} />

        {/* Desktop Navigation & Language Switcher */}
        <div className="hidden lg:flex items-center gap-8">
          <Navigation lang={lang} dict={dict} className="flex items-center gap-6" />
          <div className="h-5 w-px bg-slate-200" aria-hidden="true" />
          <LanguageSwitcher currentLang={lang} />
        </div>

        {/* Mobile Controls: Language Switcher + Hamburger Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <LanguageSwitcher currentLang={lang} />
          <button
            type="button"
            onClick={handleOpenMobileMenu}
            className="p-2.5 rounded-xl text-slate-700 hover:text-brand-navy hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-brand-teal min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label={dict.nav?.menu || 'Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer Navigation */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
        lang={lang}
        dict={dict}
      />
    </header>
  );
};

export default Header;
