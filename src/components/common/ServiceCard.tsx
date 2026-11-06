import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

export type ServiceCardTheme = 'insurance' | 'granite' | 'neutral';

interface ServiceCardProps {
  title: string;
  category: string;
  description: string;
  features?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  badge?: string;
  theme?: ServiceCardTheme;
  note?: string;
  icon?: React.ReactNode;
  className?: string;
}

const themeStyles = {
  insurance: {
    card: 'border-slate-200 hover:border-brand-teal/40',
    badge: 'bg-brand-navy-50 text-brand-navy-800 border-brand-navy-200',
    category: 'text-brand-navy-700',
    featureIcon: 'text-brand-teal',
    ctaVariant: 'primary' as const,
  },
  granite: {
    card: 'border-slate-200 hover:border-brand-sandstone/60',
    badge: 'bg-brand-sandstone-50 text-brand-sandstone-900 border-brand-sandstone-300',
    category: 'text-brand-charcoal-700',
    featureIcon: 'text-brand-sandstone-700',
    ctaVariant: 'charcoal' as const,
  },
  neutral: {
    card: 'border-slate-200 hover:border-slate-300',
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    category: 'text-slate-600',
    featureIcon: 'text-brand-teal',
    ctaVariant: 'outline' as const,
  },
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  category,
  description,
  features = [],
  ctaLabel,
  ctaHref,
  badge,
  theme = 'neutral',
  note,
  icon,
  className = '',
}) => {
  const currentTheme = themeStyles[theme];

  return (
    <div
      className={`bg-white rounded-2xl border ${currentTheme.card} shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            {icon && <span className="shrink-0">{icon}</span>}
            <span
              className={`text-xs font-bold tracking-wider uppercase ${currentTheme.category}`}
            >
              {category}
            </span>
          </div>
          {badge && (
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${currentTheme.badge}`}
            >
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-brand-navy mb-2 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-slate-600 mb-5 leading-relaxed font-normal">
          {description}
        </p>

        {features.length > 0 && (
          <ul className="space-y-2.5 mb-5 border-t border-slate-100 pt-4" aria-label="Included services">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal">
                <CheckCircle2
                  className={`w-4 h-4 ${currentTheme.featureIcon} shrink-0 mt-0.5`}
                  aria-hidden="true"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {note && (
          <p className="text-xs text-slate-500 italic mb-4 border-t border-slate-100 pt-3">
            {note}
          </p>
        )}
      </div>

      {ctaLabel && ctaHref && (
        <div className="pt-4 border-t border-slate-100 mt-2">
          <Button
            href={ctaHref}
            variant={currentTheme.ctaVariant}
            size="sm"
            fullWidth
          >
            {ctaLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
