import React from 'react';
import Image from 'next/image';
import { SupportedLanguage } from '@/types';
import { OWNER_PROFILE } from '@/lib/recognition';
import { MapPin, ShieldCheck, User } from 'lucide-react';

interface OwnerProfileProps {
  lang: SupportedLanguage;
  variant?: 'compact' | 'card' | 'hero' | 'about';
  showBio?: boolean;
  className?: string;
}

export const OwnerProfile: React.FC<OwnerProfileProps> = ({
  lang,
  variant = 'card',
  showBio = true,
  className = '',
}) => {
  const profile = OWNER_PROFILE;
  const roleText = profile.role[lang] || profile.role.en;
  const locationText = profile.location[lang] || profile.location.en;

  // Compact variant for hero or tight spaces
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-3 p-2 pr-4 rounded-2xl bg-white border border-brand-navy-100 shadow-xs ${className}`}>
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-navy-50 border border-brand-navy-200 shrink-0 flex items-center justify-center">
          {profile.hasGenuinePhoto ? (
            <Image
              src={profile.imageSrc}
              alt={profile.name}
              fill
              className="object-cover object-top"
              sizes="48px"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-navy-50 to-brand-teal-50 text-brand-navy">
              <span className="text-sm font-extrabold tracking-wider">SK</span>
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-brand-navy truncate">{profile.name}</p>
          <p className="text-[11px] text-slate-500 truncate">{locationText}</p>
        </div>
      </div>
    );
  }

  // Hero variant - side-by-side or framed highlight
  if (variant === 'hero') {
    return (
      <div className={`relative rounded-3xl bg-white border border-brand-navy-200/80 p-5 shadow-xs ${className}`}>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-brand-navy-50 border border-brand-navy-200 shrink-0">
            {profile.hasGenuinePhoto ? (
              <Image
                src={profile.imageSrc}
                alt={profile.name}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 640px) 64px, 80px"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-navy-50 via-white to-brand-teal-50 text-brand-navy">
                <span className="text-xl sm:text-2xl font-black text-brand-navy tracking-wider">SK</span>
                <span className="text-[9px] font-semibold text-brand-teal uppercase tracking-widest mt-0.5">Hosur</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-navy-50 text-brand-navy text-[11px] font-semibold mb-1 border border-brand-navy-100">
              <span>{lang === 'ta' ? 'வணிக உரிமையாளர்' : 'Business Owner'}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-brand-navy truncate">
              {profile.name}
            </h3>
            <p className="text-xs text-slate-600 truncate">{roleText}</p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-brand-teal shrink-0" aria-hidden="true" />
              <span>{locationText}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Card & About variant (Standard presentation with framed image on left/top)
  return (
    <div className={`rounded-3xl bg-white border border-slate-200 p-4 sm:p-5 md:p-6 shadow-xs ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
        {/* Photo Container */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-brand-light border border-brand-navy-200 shrink-0 shadow-xs">
          {profile.hasGenuinePhoto ? (
            <Image
              src={profile.imageSrc}
              alt={`${profile.name} - SIVA INSURANCES & GRANITE SERVICES`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 112px, 144px"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-navy-50 via-white to-brand-sandstone-50 text-brand-navy p-3 text-center">
              <div className="w-12 h-12 rounded-xl bg-white border border-brand-navy-100 flex items-center justify-center text-brand-navy font-black text-lg shadow-xs mb-1">
                SK
              </div>
              <span className="text-[11px] font-bold text-brand-navy">{profile.name}</span>
              <span className="text-[9px] text-slate-500 font-medium">Hosur</span>
            </div>
          )}
        </div>

        {/* Profile Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-navy-50 text-brand-navy border border-brand-navy-200">
              {lang === 'ta' ? 'வணிக உரிமையாளர்' : 'Business Owner'}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200">
              <MapPin className="w-3 h-3 text-brand-teal" aria-hidden="true" />
              <span>{locationText}</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy mb-1">
            {profile.name}
          </h3>

          <p className="text-xs sm:text-sm font-semibold text-teal-800 mb-2 sm:mb-3">
            {roleText}
          </p>

          {showBio && (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {lang === 'ta'
                ? 'சிவகுமார் அவர்கள் ஓசூரை மையமாகக் கொண்டு செயல்படும் தொழில்முனைவோர் ஆவார். இவர் எல்.ஐ.சி, ஸ்டார் ஹெல்த் மற்றும் நியூ இந்தியா அஷ்யூரன்ஸ் ஆகியவற்றின் காப்பீட்டு முகவர் சேவைகளை வழங்குவதோடு, ஓசூரின் 20-25 முன்னணி கிரானைட் நிறுவனங்கள் மற்றும் விற்பனையகங்களுடன் இணைந்து தமிழ்நாடு முழுவதும் கிரானைட் தேர்வு மற்றும் கொள்முதல் ஒருங்கிணைப்பு சேவைகளை வழங்கி வருகிறார்.'
                : 'Siva Kumar manages SIVA INSURANCES & GRANITE SERVICES in Hosur, providing insurance agency assistance representing LIC, Star Health, and New India Assurance, alongside coordinating granite selection and orders across 20–25 established granite companies and showrooms in Hosur for customers across Tamil Nadu.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;

