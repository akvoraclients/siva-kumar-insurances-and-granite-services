import React from 'react';
import Link from 'next/link';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'whatsapp'
  | 'sandstone'
  | 'charcoal'
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  external?: boolean;
  ariaLabel?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantStyles: Record<ButtonVariant, string> = {
  // Primary CTA: #17324D, Hover #10263A
  primary:
    'bg-[#17324D] text-white hover:bg-[#10263A] active:bg-[#0c1e2e] shadow-xs focus:ring-[#278C83]',
  // Secondary CTA: Deep Teal with high WCAG contrast
  secondary:
    'bg-[#1F716A] text-white hover:bg-[#185B55] active:bg-[#12443F] shadow-xs focus:ring-[#278C83]',
  // Outline Button: Transparent, border #17324D, text #17324D, hover bg #17324D, hover text #FFFFFF
  outline:
    'border-2 border-[#17324D] bg-transparent text-[#17324D] hover:bg-[#17324D] hover:text-white active:bg-[#10263A] focus:ring-[#278C83]',
  // WhatsApp Button: #25D366, Hover #1DA851
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#1DA851] active:bg-[#178a42] shadow-xs focus:ring-[#25D366]',
  // Granite Sandstone: #C2A27C
  sandstone:
    'bg-[#C2A27C] text-[#30343B] hover:bg-[#B08C64] active:bg-[#9E7B54] shadow-xs focus:ring-[#C2A27C]',
  // Charcoal: #30343B
  charcoal:
    'bg-[#30343B] text-white hover:bg-[#24272C] active:bg-[#1a1c20] shadow-xs focus:ring-[#30343B]',
  // Ghost
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-[#17324D] focus:ring-[#278C83]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-2 text-xs font-semibold rounded-lg gap-1.5 min-h-[44px]',
  md: 'px-5 py-2.5 text-sm font-semibold rounded-xl gap-2 min-h-[44px]',
  lg: 'px-6 py-3 text-base font-semibold rounded-xl gap-2.5 min-h-[48px]',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  external = false,
  ariaLabel,
  fullWidth = false,
  icon,
  iconPosition = 'left',
}) => {
  const widthClass = fullWidth ? 'w-full' : '';
  const combinedClasses = `inline-flex items-center justify-center font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:bg-[#E5E7EB] disabled:text-[#6B7280] disabled:border-transparent disabled:shadow-none disabled:cursor-not-allowed select-none ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};

export default Button;
