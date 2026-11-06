import React from 'react';
import { SupportedLanguage } from '@/types';
import { getDictionary } from '@/lib/dictionary';
import { BRAND_TAGLINE, REGULATORY_DISCLAIMER } from '@/lib/constants';
import { Container } from '@/components/common/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { OwnerProfile } from '@/components/common/OwnerProfile';
import { RecognitionGallery } from '@/components/common/RecognitionGallery';
import { ExperienceHighlight } from '@/components/common/ExperienceHighlight';
import { hasVerifiedAwards } from '@/lib/recognition';
import { Shield, Layers } from 'lucide-react';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang: SupportedLanguage = resolvedParams.lang === 'ta' ? 'ta' : 'en';
  const dict = getDictionary(lang);

  return (
    <Container size="narrow" className="py-6 sm:py-8 md:py-10">
      <SectionHeader
        title={dict.nav?.about || (lang === 'ta' ? 'சிவா இன்சூரன்ஸ் & கிரானைட் சர்வீசஸ் பற்றி' : 'About SIVA INSURANCES & GRANITE SERVICES')}
        subtitle={
          lang === 'ta'
            ? 'ஓசூர் மற்றும் தமிழ்நாடு முழுவதிலும் உள்ள வாடிக்கையாளர்களுக்கு நேர்மையான, வெளிப்படையான சேவை.'
            : 'Committed to transparent insurance advisory and direct Hosur granite coordination.'
        }
        badge={lang === 'ta' ? 'எங்களைப் பற்றி' : 'About Us'}
        theme="navy"
      />

      <div className="space-y-6 sm:space-y-8">
        {/* Professional Owner Profile Presentation */}
        <OwnerProfile lang={lang} variant="card" showBio />

        {/* Dedicated Experience & Professional Journey Section */}
        <div className="space-y-5 sm:space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-navy-50 text-brand-navy border border-brand-navy-200 mb-2">
              {lang === 'ta' ? 'அனுபவம்' : 'Experience'}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy">
              {dict.experience?.aboutSectionTitle || (lang === 'ta' ? 'அனுபவம் & தொழில்முறை பயணம்' : 'Experience & Professional Journey')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {dict.experience?.aboutSectionSubtitle ||
                (lang === 'ta'
                  ? 'வாடிக்கையாளர் வழிகாட்டல், வெளிப்படையான ஒருங்கிணைப்பு மற்றும் நீண்டகால நம்பகத்தன்மைக்கான அர்ப்பணிப்பு.'
                  : 'A proven commitment to client guidance, transparent coordination, and long-term customer relationships.')}
            </p>
          </div>

          <ExperienceHighlight lang={lang} variant="card" />

          {/* Factual Journey Narrative */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            <p>
              {dict.experience?.journeyP1 ||
                (lang === 'ta'
                  ? 'காப்பீட்டு சேவைகள், வாடிக்கையாளர் உறவுகள் மற்றும் கிரானைட் தேர்வு & கொள்முதல் ஒருங்கிணைப்பில் சுமார் 18 ஆண்டு கால ஒருங்கிணைந்த தொழில்முறை அனுபவத்தைக் கொண்டு, சிவகுமார் அவர்கள் நேர்மையான தொடர்பு, நேரடி உரிமையாளர் பொறுப்பு மற்றும் வெளிப்படையான வழிமுறைகளுடன் செயல்பட்டு வருகிறார்.'
                  : 'Approximately 18 years of combined professional experience across insurance services, customer relationships and granite selection and purchase coordination forms the foundation of Siva Kumar’s direct client service approach.')}
            </p>
            <p>
              {dict.experience?.journeyP2 ||
                (lang === 'ta'
                  ? 'இவரது ஒருங்கிணைந்த அனுபவம் இரண்டு அத்தியாவசிய சேவைப் பிரிவுகளை இணைக்கிறது: அதிகாரப்பூர்வ இணையதளங்கள் மூலம் குடும்பங்கள் மற்றும் வணிகங்களுக்கு ஏற்ற காப்பீட்டுத் திட்டங்களைத் தேர்வு செய்ய உதவுதல், மற்றும் ஓசூரின் கிரானைட் நிறுவனங்கள் மூலம் தரமான கற்களைத் தேர்வு செய்து தளங்களுக்கு பாதுகாப்பாக அனுப்பி வைத்தல்.'
                  : 'His combined background bridges two essential service areas: helping families and businesses choose suitable insurance coverage through official insurer portals, and guiding clients through Hosur’s granite showrooms for material selection and site delivery.')}
            </p>
            <p>
              {dict.experience?.journeyP3 ||
                (lang === 'ta'
                  ? 'இடைத்தரகர்கள் இன்றி, ஒவ்வொரு வாடிக்கையாளரின் தேவையையும் சிவகுமார் அவர்களே நேரடியாகக் கவனித்து, துல்லியமான மற்றும் வெளிப்படையான ஆலோசனைகளை வழங்கி வருகிறார்.'
                  : 'Every customer enquiry is handled directly by Siva Kumar, ensuring consistent attention to detail without intermediaries, third-party call centers, or conflicting claims.')}
            </p>
          </div>
        </div>

        {/* Dedicated Company Recognition & Achievements Gallery (Only displays when genuine photos are supplied) */}
        {hasVerifiedAwards() && (
          <div id="recognition">
            <RecognitionGallery
              lang={lang}
              title={
                lang === 'ta'
                  ? 'நிறுவன அங்கீகாரங்கள்'
                  : 'Company Recognition'
              }
              subtitle={
                lang === 'ta'
                  ? 'எல்.ஐ.சி, நியூ இந்தியா அஷ்யூரன்ஸ் மற்றும் ஸ்டார் ஹெல்த் நிறுவனங்களிடமிருந்து பெறப்பட்ட அதிகாரப்பூர்வ நற்சான்றிதழ்கள்.'
                  : 'Official recognition from partner companies.'
              }
            />
          </div>
        )}

        {/* Operating Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-brand-navy-50/60 border border-brand-navy-100">
            <div className="flex items-center gap-2 mb-2 text-brand-navy font-bold text-sm">
              <Shield className="w-4 h-4 text-brand-teal" aria-hidden="true" />
              <span>{lang === 'ta' ? 'காப்பீட்டு வழிகாட்டல் நெறிமுறைகள்' : 'Insurance Advisory Principles'}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {REGULATORY_DISCLAIMER[lang]}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-brand-sandstone-50/60 border border-brand-sandstone-200">
            <div className="flex items-center gap-2 mb-2 text-brand-charcoal font-bold text-sm">
              <Layers className="w-4 h-4 text-brand-sandstone-700" aria-hidden="true" />
              <span>{lang === 'ta' ? 'கிரானைட் ஒருங்கிணைப்பு நெறிமுறைகள்' : 'Granite Coordination Principles'}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'ta'
                ? 'வெளிப்படையான விலைப்பட்டியல் வழிகாட்டல், தரம் சரிபார்த்தல் மற்றும் வாடிக்கையாளர் தேவைகளுக்கேற்ப ஒருங்கிணைப்பு.'
                : 'Transparent quotation guidance, physical quality inspection, and direct coordination tailored to project requirements.'}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500 italic text-center border-t border-slate-100 pt-4">
          {BRAND_TAGLINE[lang]}
        </p>
      </div>
    </Container>
  );
}
