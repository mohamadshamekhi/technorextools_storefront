'use client';

import Image from 'next/image';

const TRUST_PAGE = 'https://www.zarinpal.com/trustPage/technorextools.com';

export function FooterZarinpalBadge() {
  return (
    <a
      href={TRUST_PAGE}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        event.preventDefault();
        window.open(
          TRUST_PAGE,
          'zarinpal-trust',
          'width=450,height=600,scrollbars=no,resizable=no',
        );
      }}
      aria-label="پرداخت ایمن با زرین‌پال"
      className="block h-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10 transition-opacity hover:opacity-90"
    >
      <Image
        src="/badges/zarinpal.png"
        alt="پرداخت ایمن با زرین‌پال"
        width={248}
        height={353}
        className="h-full w-auto"
      />
    </a>
  );
}
