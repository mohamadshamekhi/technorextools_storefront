import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Vazirmatn } from 'next/font/google';

import { RouteProgress } from '@/components/molecules';
import { siteConfig } from '@/config/site';
import { organizationSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';
import { AppProviders } from '@/providers';
import type { WithChildren } from '@/types';

import '@/styles/globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: WithChildren) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          // JSON-LD is safe, static, server-generated structured data.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <RouteProgress />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
