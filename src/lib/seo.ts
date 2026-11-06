import { Metadata } from 'next';
import { SupportedLanguage } from '@/types';
import { BUSINESS_INFO } from './constants';

export const BASE_URL = 'https://sivaservices.in'; // Production domain placeholder

export function generateSeoMetadata(
  lang: SupportedLanguage,
  pageTitle?: string,
  pageDescription?: string
): Metadata {
  const isTa = lang === 'ta';

  const defaultTitle = isTa
    ? `${BUSINESS_INFO.name} | ஓசூரில் காப்பீட்டு வழிகாட்டல் & கிரானைட் தீர்வுகள்`
    : `${BUSINESS_INFO.name} | Insurance Assistance & Granite Solutions in Hosur`;

  const title = pageTitle ? `${pageTitle} | ${BUSINESS_INFO.name}` : defaultTitle;

  const defaultDescription = isTa
    ? 'சிவகுமார் — ஓசூரில் எல்.ஐ.சி, ஸ்டார் ஹெல்த், நியூ இந்தியா அஷ்யூரன்ஸ் காப்பீட்டு வழிகாட்டல் மற்றும் ஓசூர் கிரானைட் நிறுவனங்கள் மூலம் தமிழ்நாடு முழுவதும் கொள்முதல் ஒருங்கிணைப்பு.'
    : 'Siva Kumar — Professional insurance assistance for LIC, Star Health, New India Assurance and Hosur granite selection coordination across Tamil Nadu.';

  const description = pageDescription || defaultDescription;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en-IN': '/en',
        'ta-IN': '/ta',
      },
    },
    openGraph: {
      title,
      description,
      siteName: BUSINESS_INFO.name,
      locale: isTa ? 'ta_IN' : 'en_IN',
      type: 'website',
      url: `/${lang}`,
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      shortcut: '/favicon.ico',
    },
  };
}
