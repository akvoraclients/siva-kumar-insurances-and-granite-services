import { SupportedLanguage } from '@/types';

export type GraniteColour = 'black' | 'white' | 'grey' | 'brown' | 'red';
export type GraniteFinish = 'polished' | 'leather' | 'flamed' | 'honed';

export interface GraniteCatalogueItem {
  id: string;
  name: {
    en: string;
    ta: string;
  };
  colour: GraniteColour;
  finishes: GraniteFinish[];
  imageSrc: string;
  imageAlt: {
    en: string;
    ta: string;
  };
  colourDescription: {
    en: string;
    ta: string;
  };
  patternDescription: {
    en: string;
    ta: string;
  };
  suggestedUsage: {
    en: string;
    ta: string;
  };
  finishNotes: {
    en: string;
    ta: string;
  };
}

export const GRANITE_CATALOGUE_ITEMS: GraniteCatalogueItem[] = [
  // 1. Absolute Black Style
  {
    id: 'absolute-black',
    name: {
      en: 'Absolute Black Style',
      ta: 'அப்சலூட் பிளாக் பாணி',
    },
    colour: 'black',
    finishes: ['polished', 'honed', 'leather'],
    imageSrc: '/images/granite/black-granite.svg',
    imageAlt: {
      en: 'Absolute Black granite illustrative slab sample',
      ta: 'அப்சலூட் பிளாக் கிரானைட் மாதிரி தோற்றம்',
    },
    colourDescription: {
      en: 'Dense, uniform, deep jet black appearance with high mineral purity.',
      ta: 'அடர்ந்த, சீரான, ஆழ்ந்த ஜெட் பிளாக் இயற்கை நிறத் தோற்றம்.',
    },
    patternDescription: {
      en: 'Fine-grained, homogeneous crystalline structure providing a solid black look.',
      ta: 'வரிகள் இல்லாத ஒரே சீரான நுண்ணிய படிக அமைப்பைக் கொண்ட அடர்ந்த நிறம்.',
    },
    suggestedUsage: {
      en: 'Kitchen countertops, vanity counters, thresholds, and interior floor borders.',
      ta: 'சமையலறை மேடைகள், வாஷ்பேசின் மேடைகள் மற்றும் பிரீமியம் தரைத்தளங்கள்.',
    },
    finishNotes: {
      en: 'High-gloss polished provides a mirror reflection; honed and leather provide contemporary low-glare options.',
      ta: 'பாலிஷ் கண்ணாடி போன்ற பளபளப்பைத் தருகிறது; ஹோன்ட் மற்றும் லெதர் மேட் தோற்றத்தைத் தருகிறது.',
    },
  },

  // 2. Black Galaxy Style
  {
    id: 'black-galaxy',
    name: {
      en: 'Black Galaxy Style',
      ta: 'பிளாக் கேலக்ஸி பாணி',
    },
    colour: 'black',
    finishes: ['polished', 'honed'],
    imageSrc: '/images/granite/black-granite.svg',
    imageAlt: {
      en: 'Black Galaxy granite illustrative visual with golden specks',
      ta: 'தங்கப் புள்ளிகளுடன் கூடிய பிளாக் கேலக்ஸி கிரானைட் மாதிரி',
    },
    colourDescription: {
      en: 'Rich dark black bedrock accented with sparkling natural golden and silver crystalline specks.',
      ta: 'ஆழ்ந்த கருப்புப் பின்னணியில் பளபளக்கும் இயற்கையான தங்க மற்றும் வெள்ளிப் புள்ளிகள்.',
    },
    patternDescription: {
      en: 'Subtle bronzite and copper flakes distributed naturally across the dark stone matrix.',
      ta: 'ஒளி படும்போது நட்சத்திரங்களைப் போல மின்னிப் பிரகாசிக்கும் இயற்கை கனிமப் புள்ளிகள்.',
    },
    suggestedUsage: {
      en: 'Premium kitchen worktops, dining tabletops, bar tops, and luxury lobby focal areas.',
      ta: 'சமையலறை கவுண்டர்டாப்புகள், டைனிங் டேபிள்கள் மற்றும் பிரீமியம் வரவேற்பறை தரைத்தளங்கள்.',
    },
    finishNotes: {
      en: 'Polished finish is most popular to bring out the golden crystal luminosity.',
      ta: 'தங்க படிகங்களின் ஒளிரும் தன்மையை முழுமையாக வெளிப்படுத்த பாலிஷ் மிகவும் சிறந்தது.',
    },
  },

  // 3. Kashmir White Style
  {
    id: 'kashmir-white',
    name: {
      en: 'Kashmir White Style',
      ta: 'காஷ்மீர் ஒயிட் பாணி',
    },
    colour: 'white',
    finishes: ['polished', 'honed'],
    imageSrc: '/images/granite/white-granite.svg',
    imageAlt: {
      en: 'Kashmir White granite illustrative stone sample with garnet flecks',
      ta: 'காஷ்மீர் ஒயிட் கிரானைட் கல் மாதிரி தோற்றம்',
    },
    colourDescription: {
      en: 'Luminous light creamy white and soft silver-grey background that brightens interiors.',
      ta: 'உட்புறத்தை வெளிச்சமாகக் காட்டும் மென்மையான கிரீமி வெள்ளை மற்றும் வெளிர் சாம்பல் நிறம்.',
    },
    patternDescription: {
      en: 'Delicate smoky grey clouds with small burgundy and garnet-red natural mineral flecks.',
      ta: 'மென்மையான சாம்பல் அலைகளும் ஆங்காங்கே சிறிய கார்னெட் சிவப்பு கனிமப் புள்ளிகளும் கொண்டது.',
    },
    suggestedUsage: {
      en: 'Spacious residential living room flooring, hallway cladding, and bright kitchen islands.',
      ta: 'விசாலமான வரவேற்பறை தரைகள், ஹால் தரைத்தளங்கள் மற்றும் வெளிச்சமான சமையலறைகள்.',
    },
    finishNotes: {
      en: 'Polished finish offers an open, luminous aesthetic; honed creates a soft satin ambiance.',
      ta: 'பாலிஷ் வெளிச்சமான பிரகாசத்தைத் தருகிறது; ஹோன்ட் சாடின் போன்ற அமைதியான மேட் தோற்றத்தைத் தருகிறது.',
    },
  },

  // 4. Colonial White Style
  {
    id: 'colonial-white',
    name: {
      en: 'Colonial White Style',
      ta: 'கொலோனியல் ஒயிட் பாணி',
    },
    colour: 'white',
    finishes: ['polished', 'leather'],
    imageSrc: '/images/granite/white-granite.svg',
    imageAlt: {
      en: 'Colonial White natural granite illustrative pattern sample',
      ta: 'கொலோனியல் ஒயிட் இயற்கை கிரானைட் மாதிரி தோற்றம்',
    },
    colourDescription: {
      en: 'Warm off-white base laced with gentle platinum-grey swirls and occasional amber accents.',
      ta: 'பிளாட்டினம் சாம்பல் சுழல்களும் லேசான ஆம்பர் வண்ணக் கலவையும் கொண்ட கதகதப்பான ஆஃப்-ஒயிட்.',
    },
    patternDescription: {
      en: 'Soft flowing wave patterns with subtle mineral deposits for a warm, welcoming presence.',
      ta: 'மென்மையான அலைபோன்ற இயற்கை வரிகளும் கனிமப் படிவுகளும் கலந்த நேர்த்தியான அமைப்பு.',
    },
    suggestedUsage: {
      en: 'Open-concept floor layouts, bathroom vanity counters, and contemporary residential spaces.',
      ta: 'திறந்தவெளி தரைத்தளங்கள், குளியலறை மேடைகள் மற்றும் நவீன வீடுகளுக்கான தரை பதிப்பு.',
    },
    finishNotes: {
      en: 'Available in polished for light reflection and leather for a tactile matte touch.',
      ta: 'ஒளி பிரதிபலிப்பிற்கு பாலிஷ் மற்றும் தொட்டுணரக்கூடிய மேட் அமைப்பிற்கு லெதர் ஃபினிஷிங் கிடைக்கிறது.',
    },
  },

  // 5. Steel Grey Style
  {
    id: 'steel-grey',
    name: {
      en: 'Steel Grey Style',
      ta: 'ஸ்டீல் கிரே பாணி',
    },
    colour: 'grey',
    finishes: ['polished', 'flamed', 'leather', 'honed'],
    imageSrc: '/images/granite/grey-granite.svg',
    imageAlt: {
      en: 'Steel Grey granite illustrative slab texture',
      ta: 'ஸ்டீல் கிரே கிரானைட் மாதிரி தோற்றம்',
    },
    colourDescription: {
      en: 'Medium to dark gunmetal grey with cool undertones and consistent stone density.',
      ta: 'குளிர்ந்த தன்மை கொண்ட நடுத்தர மற்றும் ஆழ்ந்த ஸ்டீல் சாம்பல் நிறம்.',
    },
    patternDescription: {
      en: 'Compact crystalline quartz specks and small silver-grey flecks with uniform distribution.',
      ta: 'ஒரே சீராக பரவியுள்ள குவார்ட்ஸ் படிகங்களும் சிறிய வெள்ளி-சாம்பல் நிற கனிமப் புள்ளிகளும் கொண்டது.',
    },
    suggestedUsage: {
      en: 'High-traffic commercial foyers, residential kitchens, staircases, and outdoor treads.',
      ta: 'அதிக புழக்கம் உள்ள வணிக தளங்கள், சமையலறை கவுண்டர்கள், படிக்கட்டுகள் மற்றும் வெளிப்புறத் தரைகள்.',
    },
    finishNotes: {
      en: 'Versatile in all finishes: flamed for non-slip steps, leather for low-glare worktops.',
      ta: 'அனைத்து ஃபினிஷிங்கிற்கும் ஏற்றது: படிக்கட்டுகளுக்கு ஃபிளேம்ட், குறைந்த பளபளப்பு மேடைகளுக்கு லெதர்.',
    },
  },

  // 6. Sadarahalli Grey Style
  {
    id: 'sadarahalli-grey',
    name: {
      en: 'Sadarahalli Grey Style',
      ta: 'சதராஹல்லி கிரே பாணி',
    },
    colour: 'grey',
    finishes: ['polished', 'flamed'],
    imageSrc: '/images/granite/grey-granite.svg',
    imageAlt: {
      en: 'Sadarahalli grey granite illustrative salt and pepper pattern',
      ta: 'சதராஹல்லி சாம்பல் கிரானைட் உப்பு-மிளகு பாணி மாதிரி தோற்றம்',
    },
    colourDescription: {
      en: 'Classic South Indian salt-and-pepper light grey and white composition.',
      ta: 'பாரம்பரிய தென்னிந்திய உப்பு-மிளகு போன்ற வெளிர் சாம்பல் மற்றும் வெள்ளை நிறக் கலவை.',
    },
    patternDescription: {
      en: 'Uniform granular texture with consistent black, grey, and white mineral distribution.',
      ta: 'கருப்பு, சாம்பல் மற்றும் வெள்ளை கனிமங்கள் சமச்சீராகப் பரவியுள்ள சீரான மணி போன்ற அமைப்பு.',
    },
    suggestedUsage: {
      en: 'Apartment corridors, office flooring, parking ramps, and durable exterior areas.',
      ta: 'அபார்ட்மெண்ட் தாழ்வாரங்கள், அலுவலகத் தரைகள், வாகன நிறுத்துமிடங்கள் மற்றும் வெளிப்புறத் தளங்கள்.',
    },
    finishNotes: {
      en: 'Polished for cost-effective interior flooring; flamed for non-slip exterior ramps and steps.',
      ta: 'உட்புற தரைகளுக்கு பாலிஷ்; வெளிப்புற சாய்வுதளங்கள் மற்றும் படிக்கட்டுகளுக்கு ஃபிளேம்ட் ஏற்றது.',
    },
  },

  // 7. Tan Brown Style
  {
    id: 'tan-brown',
    name: {
      en: 'Tan Brown Style',
      ta: 'டான் பிரவுன் பாணி',
    },
    colour: 'brown',
    finishes: ['polished', 'leather'],
    imageSrc: '/images/granite/brown-granite.svg',
    imageAlt: {
      en: 'Tan Brown granite illustrative natural stone sample',
      ta: 'டான் பிரவுன் கிரானைட் இயற்கை கல் மாதிரி',
    },
    colourDescription: {
      en: 'Deep dark brown and black background filled with warm earthy red-brown tones.',
      ta: 'கதகதப்பான மண் நிற சிவப்பு-பிரவுன் கலவையுடன் கூடிய ஆழ்ந்த பிரவுன் மற்றும் கருப்புப் பின்னணி.',
    },
    patternDescription: {
      en: 'Distinctive circular feldspar orbs and chocolate-brown mineral flower formations.',
      ta: 'வட்ட வடிவ ஃபெல்ட்ஸ்பார் கனிம அமைப்புகளும் சாக்லேட் பிரவுன் பூக்கள் போன்ற வடிவங்களும் கொண்டது.',
    },
    suggestedUsage: {
      en: 'Kitchen countertops, solid staircase steps, window sills, and warm traditional interiors.',
      ta: 'சமையலறை கவுண்டர்கள், படிக்கட்டு தளங்கள் மற்றும் பாரம்பரிய கதகதப்பான உட்புற வடிவமைப்புகள்.',
    },
    finishNotes: {
      en: 'Polished highlights deep stone depth; antique leather finish offers an artisanal rustic touch.',
      ta: 'பாலிஷ் ஆழமான பிரகாசத்தை அளிக்கிறது; ஆண்டிக் லெதர் கிராமிய தொடு உணர்வைத் தருகிறது.',
    },
  },

  // 8. Desert Brown Style
  {
    id: 'desert-brown',
    name: {
      en: 'Desert Brown Style',
      ta: 'டெசர்ட் பிரவுன் பாணி',
    },
    colour: 'brown',
    finishes: ['polished', 'flamed', 'honed'],
    imageSrc: '/images/granite/brown-granite.svg',
    imageAlt: {
      en: 'Desert Brown granite illustrative stone texture',
      ta: 'டெசர்ட் பிரவுன் கிரானைட் மாதிரி தோற்றம்',
    },
    colourDescription: {
      en: 'Warm golden sand and medium earthy brown harmonious color palette.',
      ta: 'பொன்மணல் மற்றும் நடுத்தர மண் நிற பிரவுன் கலந்த சீரான கதகதப்பான வண்ண அமைப்பு.',
    },
    patternDescription: {
      en: 'Fine-to-medium grain consistency with steady mineral flow across the slab surface.',
      ta: 'கல்லின் மேற்பரப்பு முழுவதும் சீரான கனிமப் பரவலுடன் கூடிய நடுத்தர மணி போன்ற வடிவமைப்பு.',
    },
    suggestedUsage: {
      en: 'Residential flooring, porch steps, wall cladding, and door frames.',
      ta: 'குடியிருப்புத் தரைகள், முகப்புப் படிக்கட்டுகள், சுவர் பதிப்புகள் மற்றும் கதவு நிலைப் பட்டைகள்.',
    },
    finishNotes: {
      en: 'Polished for inviting interior hallways; flamed for non-slip outdoor entryways.',
      ta: 'வரவேற்பறை தாழ்வாரங்களுக்கு பாலிஷ்; வெளிப்புற நுழைவுப் படிக்கட்டுகளுக்கு ஃபிளேம்ட் சிறந்தது.',
    },
  },

  // 9. Jhansi Red Style
  {
    id: 'jhansi-red',
    name: {
      en: 'Jhansi Red Style',
      ta: 'ஜான்சி ரெட் பாணி',
    },
    colour: 'red',
    finishes: ['polished', 'flamed'],
    imageSrc: '/images/granite/red-granite.svg',
    imageAlt: {
      en: 'Jhansi Red granite illustrative crimson stone visual',
      ta: 'ஜான்சி ரெட் கிரானைட் மாதிரி தோற்றம்',
    },
    colourDescription: {
      en: 'Vibrant deep ruby red, rich crimson, and terracotta natural tone.',
      ta: 'கம்பீரமான ஆழ்ந்த ரூபி சிவப்பு, செம்பழுப்பு மற்றும் டெரகோட்டா இயற்கை வண்ணத் தோற்றம்.',
    },
    patternDescription: {
      en: 'Bold crystalline veins and dark charcoal-to-black mineral ribbons weaving through red matrix.',
      ta: 'சிவப்பு நிறப் பின்னணியில் அடர்ந்த சாம்பல் மற்றும் கருப்பு கனிமக் கோடுகள் கலந்த தனித்துவ அமைப்பு.',
    },
    suggestedUsage: {
      en: 'Exterior architectural elevation, temple and monument architecture, and decorative borders.',
      ta: 'கட்டிட முகப்பு அலங்காரம் (Elevation), தூண்கள், எல்லைப் பட்டைகள் மற்றும் பிரதான நுழைவுப் பகுதிகள்.',
    },
    finishNotes: {
      en: 'Polished brings out intense color contrast; flamed creates dramatic rustic facade textures.',
      ta: 'பாலிஷ் வண்ணத்தின் செழுமையை வெளிப்படுத்துகிறது; ஃபிளேம்ட் சொரசொரப்பான முகப்புத் தோற்றத்தைத் தருகிறது.',
    },
  },

  // 10. Multi Red / Paradiso Style
  {
    id: 'multi-red-paradiso',
    name: {
      en: 'Multi Red / Paradiso Style',
      ta: 'மல்டி ரெட் / பாரடைசோ பாணி',
    },
    colour: 'red',
    finishes: ['polished', 'leather'],
    imageSrc: '/images/granite/red-granite.svg',
    imageAlt: {
      en: 'Multi Red and Paradiso granite illustrative wave pattern sample',
      ta: 'மல்டி ரெட் மற்றும் பாரடைசோ கிரானைட் அலைவடிவ மாதிரி தோற்றம்',
    },
    colourDescription: {
      en: 'Dramatic fusion of lilac, purplish-red, grey, and charcoal multi-colour natural hues.',
      ta: 'இளஞ்சிவப்பு, ஊதா-சிவப்பு, சாம்பல் மற்றும் கரி நிறங்கள் கலந்த கவர்ச்சிகரமான பலவண்ணக் கலவை.',
    },
    patternDescription: {
      en: 'Fluid, metamorphic wave striations with swirling mineral rivers moving across the slab.',
      ta: 'அழகான நதி போன்ற சுழல்களும் அலை அலையான கனிம வரிகளும் கொண்ட கண்கவர் இயற்கை அமைப்பு.',
    },
    suggestedUsage: {
      en: 'Feature entrances, decorative flooring medallions, staircase risers, and accent wall panels.',
      ta: 'சிறப்பு நுழைவுப் பகுதிகள், அலங்கார தரை வட்டங்கள், படிக்கட்டு முகப்புகள் மற்றும் மையச் சுவர்கள்.',
    },
    finishNotes: {
      en: 'Polished finish accentuates sweeping waves; leather gives a velvety tactile texture.',
      ta: 'பாலிஷ் அலை போன்ற வரிகளை எடுப்பாகக் காட்டுகிறது; லெதர் வெல்வெட் போன்ற தொடு உணர்வைத் தருகிறது.',
    },
  },
];

