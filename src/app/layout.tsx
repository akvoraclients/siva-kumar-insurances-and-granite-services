import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SIVA INSURANCES & GRANITE SERVICES | Insurance Assistance & Granite Solutions',
  description:
    'Siva Kumar — Professional insurance assistance for LIC, Star Health, New India Assurance and Hosur granite selection coordination across Tamil Nadu.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#17324D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-brand-light text-brand-charcoal">
        {children}
      </body>
    </html>
  );
}
