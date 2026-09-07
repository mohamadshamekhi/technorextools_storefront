import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/utils';

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
};

/** Compose a full `Metadata` object with sane, SEO-complete defaults. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  image = siteConfig.ogImage,
  noindex = false,
  type = 'website',
}: BuildMetadataInput = {}): Metadata {
  const url = absoluteUrl(path, siteConfig.url);
  const fullTitle = title ? `${title} · ${siteConfig.name}` : siteConfig.name;
  const ogImage = absoluteUrl(image, siteConfig.url);

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords],
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
