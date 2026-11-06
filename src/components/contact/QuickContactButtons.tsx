import React from 'react';
import { SupportedLanguage, ServiceCategory } from '@/types';
import { BUSINESS_INFO } from '@/lib/constants';
import { PhoneButton } from './PhoneButton';
import { WhatsAppButton } from './WhatsAppButton';

interface QuickContactButtonsProps {
  lang?: SupportedLanguage;
  category?: ServiceCategory;
  callLabel?: string;
  whatsappLabel?: string;
  layout?: 'row' | 'stack' | 'sticky-bottom';
  className?: string;
}

export const QuickContactButtons: React.FC<QuickContactButtonsProps> = ({
  lang = 'en',
  category = 'general',
  callLabel = 'Call',
  whatsappLabel = 'WhatsApp',
  layout = 'row',
  className = '',
}) => {
  const isAnyContactConfigured = Boolean(
    BUSINESS_INFO.isPhoneConfigured || BUSINESS_INFO.isWhatsAppConfigured
  );

  // If sticky-bottom mobile bar is requested but no contact details are configured yet,
  // do not render the bar so it never covers content or occupies screen space.
  if (layout === 'sticky-bottom') {
    if (!isAnyContactConfigured) {
      return null;
    }

    return (
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden shadow-lg ${className}`}
        role="region"
        aria-label="Quick mobile contact bar"
      >
        <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
          <PhoneButton
            variant="primary"
            size="sm"
            lang={lang}
            label={callLabel}
            className="w-full"
          />
          <WhatsAppButton
            variant="inline"
            size="sm"
            category={category}
            lang={lang}
            label={whatsappLabel}
            className="w-full"
          />
        </div>
      </div>
    );
  }

  const containerClasses =
    layout === 'stack'
      ? 'flex flex-col gap-2.5 w-full'
      : 'flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto';

  return (
    <div className={`${containerClasses} ${className}`} role="group" aria-label="Direct contact options">
      <PhoneButton
        variant="primary"
        size="md"
        lang={lang}
        label={callLabel}
        className={layout === 'stack' ? 'w-full' : 'w-full sm:w-auto'}
      />
      <WhatsAppButton
        variant="inline"
        size="md"
        category={category}
        lang={lang}
        label={whatsappLabel}
        className={layout === 'stack' ? 'w-full' : 'w-full sm:w-auto'}
      />
    </div>
  );
};

export default QuickContactButtons;
