import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const variantStyles = {
  primary: 'bg-brand-navy text-white hover:bg-brand-navy-900 focus:ring-brand-teal',
  secondary: 'bg-brand-teal text-white hover:bg-brand-teal-700 focus:ring-brand-teal',
  outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-brand-teal',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-brand-teal',
};

const sizeStyles = {
  sm: 'w-9 h-9 p-1.5 rounded-lg',
  md: 'w-11 h-11 p-2 rounded-xl',
  lg: 'w-12 h-12 p-2.5 rounded-xl',
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  ariaLabel,
  onClick,
  className = '',
  variant = 'ghost',
  size = 'md',
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
