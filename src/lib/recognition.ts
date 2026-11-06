import { AwardItem, AwardCategory, OwnerProfileInfo } from '@/types';

/**
 * SIVA KUMAR PROFESSIONAL PROFILE DATA
 * Set hasGenuinePhoto to true once the genuine professional photograph
 * is placed at /images/siva-kumar/profile.webp.
 */
export const OWNER_PROFILE: OwnerProfileInfo = {
  name: 'Siva Kumar',
  role: {
    en: 'Insurance Advisor & Granite Coordinator',
    ta: 'காப்பீட்டு ஆலோசகர் & கிரானைட் ஒருங்கிணைப்பாளர்',
  },
  location: {
    en: 'Based in Hosur, Tamil Nadu',
    ta: 'ஓசூர், தமிழ்நாடு',
  },
  imageSrc: '/images/siva-kumar/sivakumar.webp',
  hasGenuinePhoto: true,
};

/**
 * COMPANY RECOGNITION & AWARDS DATA
 *
 * Rules:
 * 1. Each award photograph must appear under its respective company.
 * 2. Do not mix up awards belonging to different companies.
 * 3. Do not invent award titles, years, achievements or designations.
 * 4. Display captions only when details are verified.
 * 5. Use original photographs supplied by the business owner.
 * 6. Do not generate artificial award photographs.
 * 7. Do not imply an endorsement of SIVA INSURANCES & GRANITE SERVICES unless explicitly established.
 * 8. Only items with isVerified: true will be displayed to customers.
 */
export const COMPANY_RECOGNITION_AWARDS: AwardItem[] = [
  // Examples of verified structure to uncomment once photographs are provided:
  // {
  //   id: 'lic-award-1',
  //   category: 'lic',
  //   companyName: 'Life Insurance Corporation of India (LIC)',
  //   imageSrc: '/images/awards/lic/lic-recognition-1.webp',
  //   altText: {
  //     en: 'Siva Kumar receiving recognition from Life Insurance Corporation of India (LIC)',
  //     ta: 'எல்.ஐ.சி (LIC) நிறுவனத்திடம் இருந்து பாராட்டு பெறும் சிவகுமார்',
  //   },
  //   title: {
  //     en: 'Agency Recognition',
  //     ta: 'முகவர் அங்கீகாரம்',
  //   },
  //   year: '2023',
  //   caption: {
  //     en: 'Verified agency performance recognition presented by LIC.',
  //     ta: 'எல்.ஐ.சி வழங்கிய முகவர் சேவை அங்கீகாரம்.',
  //   },
  //   isVerified: false,
  // },
];

/**
 * Retrieve verified awards, optionally filtered by category.
 * If no genuine photograph or verified record exists, returns empty array.
 */
export function getVerifiedAwards(category?: AwardCategory): AwardItem[] {
  return COMPANY_RECOGNITION_AWARDS.filter(
    (item) => item.isVerified && (!category || item.category === category)
  );
}

/**
 * Check if verified awards exist for a given category.
 */
export function hasVerifiedAwards(category?: AwardCategory): boolean {
  return getVerifiedAwards(category).length > 0;
}

