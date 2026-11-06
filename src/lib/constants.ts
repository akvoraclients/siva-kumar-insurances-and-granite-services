import { BusinessDetails } from '@/types';

/**
 * BUSINESS INFORMATION
 * SIVA INSURANCES & GRANITE SERVICES
 * Hosur, Tamil Nadu, India
 */
export const BUSINESS_INFO: BusinessDetails = {
  name: 'SIVA INSURANCES & GRANITE SERVICES',
  owner: 'Siva Kumar',
  location: 'Hosur, Tamil Nadu, India',
  phone: '9894829633',
  phoneSecondary: '9080445622',
  whatsapp: '9894829633',
  email: 'sivakumarpriya9894@gmail.com',
  address: 'Sai Venture Layout, Near Sathyanarayana Temple, Hosur - 635109, Tamil Nadu, India.',
  isPhoneConfigured: true,
  isWhatsAppConfigured: true,
  isEmailConfigured: true,
  isAddressConfigured: true,
};

export const CONTACT_STATUS_MESSAGES = {
  en: {
    phonePending: 'Phone number to be confirmed',
    whatsappPending: 'WhatsApp contact to be confirmed',
    emailPending: 'Email address to be confirmed',
    addressPending: 'Sai Venture Layout, Near Sathyanarayana Temple, Hosur - 635109, Tamil Nadu, India.',
    contactNotice: 'Contact Siva Kumar directly for insurance consultations and granite inquiries.',
    contactPendingBadge: 'Available for Enquiries',
  },
  ta: {
    phonePending: 'தொலைபேசி எண் விரைவில் அறிவிக்கப்படும்',
    whatsappPending: 'வாட்ஸ்அப் தொடர்பு விரைவில் அறிவிக்கப்படும்',
    emailPending: 'மின்னஞ்சல் முகவரி விரைவில் அறிவிக்கப்படும்',
    addressPending: 'சாய் வென்ச்சர் லேஅவுட், சத்யநாராயணா கோவில் அருகில், ஓசூர் - 635109, தமிழ்நாடு, இந்தியா.',
    contactNotice: 'காப்பீட்டு வழிகாட்டல் மற்றும் கிரானைட் விசாரணைகளுக்கு சிவகுமார் அவர்களை நேரடியாக தொடர்பு கொள்ளவும்.',
    contactPendingBadge: 'விசாரணைக்கு தொடர்புகொள்ளலாம்',
  },
};

export const BRAND_TAGLINE = {
  en: 'Insurance Assistance & Granite Solutions',
  ta: 'காப்பீட்டு வழிகாட்டல் & கிரானைட் தீர்வுகள்',
};

// WhatsApp prefilled message templates per service category
export const WHATSAPP_MESSAGES = {
  en: {
    insurance: 'Hello Siva Kumar, I would like to enquire about insurance services.',
    granite: 'Hello Siva Kumar, I would like to enquire about granite varieties and quotations.',
    general: 'Hello Siva Kumar, I am contacting you through the SIVA INSURANCES & GRANITE SERVICES website.',
  },
  ta: {
    insurance: 'வணக்கம் சிவகுமார், காப்பீட்டு சேவைகள் பற்றி அறிய விரும்புகிறேன்.',
    granite: 'வணக்கம் சிவகுமார், கிரானைட் வகைகள் மற்றும் விலைப்பட்டியல் பற்றி அறிய விரும்புகிறேன்.',
    general: 'வணக்கம் சிவகுமார், சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் இணையதளம் மூலம் தங்களை தொடர்பு கொள்கிறேன்.',
  },
};

// Formspree enquiry submission endpoint
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqppwdnq';

// Insurance companies represented as an agent
export const INSURANCE_COMPANIES = [
  {
    id: 'lic',
    name: 'Life Insurance Corporation of India (LIC)',
    shortName: 'LIC',
    services: [
      'Life insurance policy consultation',
      'Official portal application assistance',
      'Policy renewal reminders and assistance',
      'Death and maturity claims documentation guidance',
      'Policy status and information updates',
    ],
  },
  {
    id: 'new-india',
    name: 'The New India Assurance Co. Ltd.',
    shortName: 'New India Assurance',
    services: [
      'General insurance enquiries (Motor, Property, Commercial)',
      'Official portal application assistance',
      'Policy renewal assistance',
      'Claims documentation support',
      'Policy servicing assistance',
    ],
  },
  {
    id: 'star-health',
    name: 'Star Health and Allied Insurance Co. Ltd.',
    shortName: 'Star Health Insurance',
    services: [
      'Individual and family health insurance consultation',
      'Official portal application assistance',
      'Policy renewal assistance',
      'Cashless hospital network guidance and claims assistance',
      'Coverage and benefits explanation',
    ],
  },
];

// Siva Granites coordination services (Reflecting granite companies and showrooms)
export const GRANITE_SERVICES = [
  {
    id: 'selection',
    title: 'Granite Selection Assistance',
    description: 'Guidance on selecting suitable granite varieties for flooring, countertops, elevation, and monuments based on durability and aesthetics.',
  },
  {
    id: 'supplier-coordination',
    title: 'Supplier & Showroom Coordination in Hosur',
    description: 'Direct coordination with approximately 20–25 established granite companies and showrooms located in Hosur.',
  },
  {
    id: 'quotations',
    title: 'Transparent Quotations per Sq. Ft.',
    description: 'Accurate cost estimates per square foot tailored to required dimensions, thickness, and finish.',
  },
  {
    id: 'order-coordination',
    title: 'Order Processing & Quality Inspection',
    description: 'Supervision of slab cutting, surface finishing, edge processing, and batch checks before dispatch.',
  },
  {
    id: 'delivery-coordination',
    title: 'Transportation & Delivery Coordination',
    description: 'Reliable logistics coordination from Hosur suppliers directly to construction sites across Tamil Nadu.',
  },
];

// Factual and compliant insurance disclosure - no unverified designations or registration claims
export const REGULATORY_DISCLAIMER = {
  en: 'Siva Kumar provides insurance agency services representing Life Insurance Corporation of India (LIC), Star Health and Allied Insurance, and The New India Assurance Co. Ltd. SIVA INSURANCES & GRANITE SERVICES is an independent service firm and is not an insurance company. All insurance policies are underwritten and issued directly by the respective insurance companies subject to their terms and conditions. All insurance applications are processed directly through the respective official insurer portals.',
  ta: 'சிவகுமார் அவர்கள் எல்.ஐ.சி (LIC), ஸ்டார் ஹெல்த் மற்றும் தி நியூ இந்தியா அஷ்யூரன்ஸ் ஆகியவற்றின் காப்பீட்டு முகவர் சேவைகளை வழங்குகிறார். சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் என்பது ஒரு சுயாதீன சேவை நிறுவனமாகும், இது காப்பீட்டு நிறுவனம் அல்ல. காப்பீட்டு பாலிசிகள் அனைத்தும் அந்தந்த காப்பீட்டு நிறுவனங்களால் மட்டுமே நேரடியாக வழங்கப்படுகின்றன. அனைத்து காப்பீட்டு விண்ணப்பங்களும் அதிகாரப்பூர்வ இணையதளங்கள் மூலமாக மட்டுமே செயல்படுத்தப்படுகின்றன.',
};
