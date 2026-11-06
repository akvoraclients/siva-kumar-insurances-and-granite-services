'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SupportedLanguage } from '@/types';
import { BUSINESS_INFO } from '@/lib/constants';
import { Logo } from '@/components/common/Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { X, ArrowRight, MapPin, Phone } from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  lang: SupportedLanguage;
  dict: Record<string, any>;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  lang,
  dict,
}) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const lastPathnameRef = React.useRef(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close drawer ONLY upon actual route change
  useEffect(() => {
    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { key: 'home', label: dict.nav?.home || 'Home', href: `/${lang}` },
    { key: 'insurance', label: dict.nav?.insurance || 'Insurance Services', href: `/${lang}/insurance` },
    { key: 'granites', label: dict.nav?.granites || 'Siva Granites', href: `/${lang}/granites` },
    { key: 'about', label: dict.nav?.about || 'About', href: `/${lang}/about` },
    { key: 'contact', label: dict.nav?.contact || 'Contact', href: `/${lang}/contact` },
  ];

  if (!mounted) {
    return null;
  }

  const drawerContent = (
    <div
      className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={dict.nav?.menu || 'Navigation Menu'}
    >
      {/* Dimmed backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out z-[101] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top bar with logo and close button */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <Logo lang={lang} showTagline={false} />
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-brand-teal min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label={dict.nav?.closeMenu || 'Close Menu'}
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Language switch bar inside mobile menu */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600">
            {dict.common?.language || 'Language'}:
          </span>
          <LanguageSwitcher currentLang={lang} />
        </div>

        {/* Navigation links list */}
        <nav className="p-4 flex-1 space-y-1" aria-label="Mobile Menu Links">
          {navItems.map((item) => {
            const isExactMatch = pathname === item.href || pathname === `${item.href}/`;
            const isNestedMatch = item.key !== 'home' && pathname?.startsWith(`${item.href}`);
            const isActive = isExactMatch || isNestedMatch;

            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors min-h-[48px] ${
                  isActive
                    ? 'bg-brand-navy-50 text-brand-navy font-bold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-brand-navy'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{item.label}</span>
                <ArrowRight
                  className={`w-4 h-4 ${isActive ? 'text-brand-teal' : 'text-slate-300'}`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        {/* Bottom quick contact section */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
          <div className="flex items-start gap-2.5 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" aria-hidden="true" />
            <span className="leading-relaxed">{BUSINESS_INFO.address || BUSINESS_INFO.location}</span>
          </div>

          {/* Both Phone numbers displayed & clickable */}
          <div className="space-y-2 pt-1 border-t border-slate-200/60">
            <a
              href="tel:+919894829633"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-brand-navy-900 transition-colors min-h-[44px]"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-300" aria-hidden="true" />
                <span>+91 98948 29633</span>
              </div>
              <span className="text-[10px] text-teal-300 font-semibold uppercase tracking-wider">{lang === 'ta' ? 'முதன்மை' : 'Primary'}</span>
            </a>

            <a
              href="tel:+919080445622"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-brand-navy text-xs font-bold hover:bg-slate-100 transition-colors min-h-[44px]"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-teal" aria-hidden="true" />
                <span>+91 90804 45622</span>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{lang === 'ta' ? 'இரண்டாவது' : 'Secondary'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
};

export default MobileNavigation;
