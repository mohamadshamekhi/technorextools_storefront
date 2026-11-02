import Script from 'next/script';

const GA_ID = 'G-KSK2PQDNTV';

/** GA4 gtag — the library loads after hydration so it never blocks LCP, but the small inline init
 * runs before hydration so `window.gtag` exists (and `config` is queued first) by the time an
 * ecommerce event fires from a mount effect (`lib/analytics.ts`). */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document -- pages-router rule; App Router allows it in the root layout */}
      <Script id="ga4-init" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
