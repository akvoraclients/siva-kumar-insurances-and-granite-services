import React from 'react';
import Link from 'next/link';
import { SupportedLanguage } from '@/types';
import { BUSINESS_INFO, BRAND_TAGLINE } from '@/lib/constants';

interface LogoProps {
  lang?: SupportedLanguage;
  variant?: 'header' | 'footer' | 'standalone';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  lang = 'en',
  variant = 'header',
  showTagline = true,
  className = '',
}) => {
  const isFooter = variant === 'footer';

  // Original geometric SVG "S" mark with Navy (#17324D) & Teal (#278C83) interlocking ribbons
  const LogoMark = (
    <svg
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform group-hover:scale-105"
      aria-hidden="true"
    >
      {/* Background soft shield */}
      <rect
        width="40"
        height="40"
        rx="10"
        fill={isFooter ? '#1F2937' : '#F0F5FA'}
      />
      {/* Geometric upper facet of 'S' in Primary Navy */}
      <path
        d="M26 12H16C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20H24C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28H14"
        stroke={isFooter ? '#278C83' : '#17324D'}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dynamic diagonal accent bar in Secondary Teal */}
      <circle cx="26" cy="12" r="2.2" fill="#278C83" />
      <circle cx="14" cy="28" r="2.2" fill="#C2A27C" />
    </svg>
  );

  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      {LogoMark}
      <div className="flex flex-col">
        <span
          className={`text-xs sm:text-base md:text-lg lg:text-xl font-extrabold tracking-tight leading-tight max-w-[190px] xs:max-w-[240px] sm:max-w-none ${
            isFooter ? 'text-white' : 'text-brand-navy'
          }`}
        >
          {BUSINESS_INFO.name}
        </span>
        {showTagline && (
          <span
            className={`hidden sm:inline text-[10px] md:text-xs font-medium tracking-normal leading-none mt-0.5 ${
              isFooter ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {BUSINESS_INFO.owner} • {BRAND_TAGLINE[lang]}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <Link
      href={`/${lang}`}
      className="group inline-flex items-center focus:outline-hidden focus:ring-2 focus:ring-brand-teal rounded-lg p-0.5"
    >
      {content}
    </Link>
  );
};

export default Logo;
