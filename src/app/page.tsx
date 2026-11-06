'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const savedLang = typeof window !== 'undefined' ? localStorage.getItem('siva_lang') : null;
      if (savedLang === 'ta') {
        router.replace('/ta');
        return;
      }
    } catch {
      // Default to English on error
    }
    router.replace('/en');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light">
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/en/" />
      </noscript>
      <div className="flex flex-col items-center gap-3 text-slate-500 text-xs">
        <div className="w-6 h-6 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
        <span>Loading SIVA INSURANCES & GRANITE SERVICES...</span>
      </div>
    </div>
  );
}
