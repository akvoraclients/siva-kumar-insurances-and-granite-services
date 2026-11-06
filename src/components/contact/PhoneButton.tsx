import React from 'react';
import { Phone, Clock } from 'lucide-react';
import { BUSINESS_INFO, CONTACT_STATUS_MESSAGES } from '@/lib/constants';
import { SupportedLanguage } from '@/types';

interface PhoneButtonProps {
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'full';
  size?: 'sm' | 'md' | 'lg';
  phone?: string | null;
  lang?: SupportedLanguage;
  hideIfPending?: boolean;
}

export const PhoneButton: React.FC<PhoneButtonProps> = ({
  label = 'Call',
  className = '',
  variant = 'primary',
  size = 'md',
  phone = BUSINESS_INFO.phone,
  lang = 'en',
  hideIfPending = false,
}) => {
  const isConfigured = Boolean(BUSINESS_INFO.isPhoneConfigured && phone && !phone.includes('00000'));

  if (!isConfigured) {
    if (hideIfPending) return null;

    const sizeStyles = {
      sm: 'py-2 px-3.5 text-xs min-h-[44px] gap-1.5',
      md: 'py-2.5 px-5 text-sm min-h-[44px] gap-2',
      lg: 'py-3 px-6 text-base min-h-[48px] gap-2.5',
    };

    const pendingLabel = lang === 'ta' ? 'அழைப்பு (விரைவில்)' : 'Call (Pending)';
    const tooltip = CONTACT_STATUS_MESSAGES[lang]?.phonePending || 'Phone number pending confirmation';

    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title={tooltip}
        className={`inline-flex items-center justify-center font-medium rounded-lg bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed select-none ${sizeStyles[size]} ${className}`}
      >
        <Clock className="w-3.5 h-3.5 shrink-0 text-[#6B7280]" aria-hidden="true" />
        <span>{label ? `${label} (${lang === 'ta' ? 'விரைவில்' : 'Pending'})` : pendingLabel}</span>
      </button>
    );
  }

  const digits = phone ? phone.replace(/\D/g, '') : '';
  const telUrl = digits ? `tel:+91${digits}` : '#';

  const sizeStyles = {
    sm: 'py-2 px-3.5 text-xs min-h-[44px] gap-1.5',
    md: 'py-2.5 px-5 text-sm min-h-[44px] gap-2',
    lg: 'py-3 px-6 text-base min-h-[48px] gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-[#17324D] text-white hover:bg-[#10263A] active:bg-[#0c1e2e] shadow-xs focus:ring-[#278C83]',
    secondary: 'bg-[#278C83] text-white hover:bg-[#1F716A] active:bg-[#185b55] shadow-xs focus:ring-[#278C83]',
    outline: 'border-2 border-[#17324D] text-[#17324D] hover:bg-[#17324D] hover:text-white focus:ring-[#278C83]',
    full: 'w-full bg-[#17324D] text-white hover:bg-[#10263A] active:bg-[#0c1e2e] shadow-xs focus:ring-[#278C83]',
  };

  return (
    <a
      href={telUrl}
      className={`inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={`Direct Call: ${phone}`}
    >
      <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
};

export default PhoneButton;
