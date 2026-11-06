import React from 'react';
import { MessageSquare, Clock } from 'lucide-react';
import { BUSINESS_INFO, WHATSAPP_MESSAGES, CONTACT_STATUS_MESSAGES } from '@/lib/constants';
import { ServiceCategory, SupportedLanguage } from '@/types';

interface WhatsAppButtonProps {
  category?: ServiceCategory;
  lang?: SupportedLanguage;
  customMessage?: string;
  label?: string;
  className?: string;
  variant?: 'inline' | 'full' | 'floating' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  phone?: string | null;
  hideIfPending?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  category = 'general',
  lang = 'en',
  customMessage,
  label = 'WhatsApp',
  className = '',
  variant = 'inline',
  size = 'md',
  phone = BUSINESS_INFO.whatsapp,
  hideIfPending = false,
}) => {
  const isConfigured = Boolean(BUSINESS_INFO.isWhatsAppConfigured && phone && !phone.includes('00000'));

  // If floating and unconfigured, do not render floating widget to avoid broken action
  if (!isConfigured) {
    if (variant === 'floating' || hideIfPending) {
      return null;
    }

    const sizeStyles = {
      sm: 'py-1.5 px-3 text-xs min-h-[38px] gap-1.5',
      md: 'py-2 px-4 text-sm min-h-[44px] gap-2',
      lg: 'py-3 px-6 text-base min-h-[48px] gap-2.5',
    };

    const tooltip = CONTACT_STATUS_MESSAGES[lang]?.whatsappPending || 'WhatsApp contact pending confirmation';
    const pendingLabel = lang === 'ta' ? 'வாட்ஸ்அப் (விரைவில்)' : 'WhatsApp (Pending)';

    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title={tooltip}
        className={`inline-flex items-center justify-center font-medium rounded-lg border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed select-none ${sizeStyles[size]} ${className}`}
      >
        <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" aria-hidden="true" />
        <span>{label ? `${label} (${lang === 'ta' ? 'விரைவில்' : 'Pending'})` : pendingLabel}</span>
      </button>
    );
  }

  const defaultText = WHATSAPP_MESSAGES[lang]?.[category] || WHATSAPP_MESSAGES.en.general;
  const messageToSend = customMessage || defaultText;
  const encodedMessage = encodeURIComponent(messageToSend);
  const waUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  if (variant === 'floating') {
    return (
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Enquiry"
        className={`fixed bottom-6 right-6 z-50 p-3.5 bg-brand-teal text-white rounded-full shadow-lg hover:bg-brand-teal-700 hover:scale-105 transition-all flex items-center justify-center focus:outline-hidden focus:ring-4 focus:ring-brand-teal/30 min-w-[48px] min-h-[48px] ${className}`}
      >
        <MessageSquare className="w-6 h-6" aria-hidden="true" />
        <span className="sr-only">Open WhatsApp chat with Siva Kumar</span>
      </a>
    );
  }

  const sizeStyles = {
    sm: 'py-2 px-3.5 text-xs min-h-[44px] gap-1.5',
    md: 'py-2.5 px-5 text-sm min-h-[44px] gap-2',
    lg: 'py-3 px-6 text-base min-h-[48px] gap-2.5',
  };

  const variantStyles = {
    inline: 'bg-[#25D366] text-white hover:bg-[#1DA851] active:bg-[#178a42] shadow-xs focus:ring-[#25D366]',
    full: 'w-full bg-[#25D366] text-white hover:bg-[#1DA851] active:bg-[#178a42] shadow-xs focus:ring-[#25D366]',
    outline: 'border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white focus:ring-[#25D366]',
  };

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={`WhatsApp Enquiry: ${label}`}
    >
      <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
};

export default WhatsAppButton;
