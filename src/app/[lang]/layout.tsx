import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SupportedLanguage } from '@/types';
import { getDictionary } from '@/lib/dictionary';
import { generateSeoMetadata } from '@/lib/seo';
import { AppShell } from '@/components/layout/AppShell';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ta' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const lang: SupportedLanguage = resolved.lang === 'ta' ? 'ta' : 'en';
  return generateSeoMetadata(lang);
}

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const resolvedParams = await params;
  if (resolvedParams.lang !== 'en' && resolvedParams.lang !== 'ta') {
    notFound();
  }
  const lang: SupportedLanguage = resolvedParams.lang as SupportedLanguage;
  const dict = getDictionary(lang);

  return (
    <AppShell lang={lang} dict={dict}>
      {children}
    </AppShell>
  );
}
