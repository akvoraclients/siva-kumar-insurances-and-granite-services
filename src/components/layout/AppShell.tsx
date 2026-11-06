'use client';

import React, { useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingContactActions } from '@/components/contact/FloatingContactActions';
import { SupportedLanguage } from '@/types';

interface AppShellProps {
  children: React.ReactNode;
  lang: SupportedLanguage;
  dict: Record<string, any>;
}

export const AppShell: React.FC<AppShellProps> = ({ children, lang, dict }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header
        lang={lang}
        dict={dict}
        isMobileMenuOpen={isMobileMenuOpen}
        onOpenMobileMenu={handleOpenMobileMenu}
        onCloseMobileMenu={handleCloseMobileMenu}
      />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} dict={dict} />
      <FloatingContactActions
        lang={lang}
        isMobileMenuOpen={isMobileMenuOpen}
      />
    </div>
  );
};

export default AppShell;

