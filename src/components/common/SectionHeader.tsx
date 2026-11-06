import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
  theme?: 'navy' | 'teal' | 'granite' | 'neutral';
  className?: string;
}

const badgeThemes = {
  navy: 'bg-brand-navy-50 text-brand-navy-800 border-brand-navy-200',
  teal: 'bg-brand-teal-50 text-brand-teal-800 border-brand-teal-200',
  granite: 'bg-brand-sandstone-50 text-brand-sandstone-900 border-brand-sandstone-300',
  neutral: 'bg-slate-100 text-slate-700 border-slate-200',
};

const accentThemes = {
  navy: 'bg-brand-navy',
  teal: 'bg-brand-teal',
  granite: 'bg-brand-sandstone',
  neutral: 'bg-slate-400',
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  align = 'left',
  theme = 'navy',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-5 sm:mb-6 md:mb-8 ${
        isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'
      } ${className}`}
    >
      {badge && (
        <div className={`mb-2 inline-block ${isCenter ? 'mx-auto' : ''}`}>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${badgeThemes[theme]}`}
          >
            {badge}
          </span>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-navy leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}

      <div
        className={`mt-3 sm:mt-3.5 h-1 w-12 rounded-full ${accentThemes[theme]} ${
          isCenter ? 'mx-auto' : ''
        }`}
        aria-hidden="true"
      />
    </div>
  );
};

export default SectionHeader;
