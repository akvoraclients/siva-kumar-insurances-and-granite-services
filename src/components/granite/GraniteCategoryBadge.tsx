import React from 'react';

interface GraniteCategoryBadgeProps {
  label: string;
  variant?: 'sandstone' | 'charcoal' | 'outline' | 'slate';
  className?: string;
}

const variantStyles = {
  sandstone: 'bg-brand-sandstone-50 text-brand-sandstone-900 border-brand-sandstone-300',
  charcoal: 'bg-brand-charcoal-50 text-brand-charcoal-900 border-brand-charcoal-200',
  outline: 'border-slate-300 text-slate-700 bg-white',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
};

export const GraniteCategoryBadge: React.FC<GraniteCategoryBadgeProps> = ({
  label,
  variant = 'sandstone',
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
};

export default GraniteCategoryBadge;
