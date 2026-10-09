import Image from 'next/image';

import { siteConfig } from '@/config/site';

export function FooterEnamadBadge() {
  const { id, code } = siteConfig.enamad;

  return (
    <a
      href={`https://trustseal.enamad.ir/?id=${id}&Code=${code}`}
      target="_blank"
      rel="noopener noreferrer"
      referrerPolicy="origin"
      aria-label="نماد اعتماد الکترونیکی"
      className="grid size-16 shrink-0 place-items-center rounded-xl bg-white/90 p-1.5 ring-1 ring-white/10 transition-opacity hover:opacity-90"
    >
      <Image
        src={`https://trustseal.enamad.ir/logo.aspx?id=${id}&Code=${code}`}
        alt="نماد اعتماد الکترونیکی"
        width={90}
        height={90}
        unoptimized
      />
    </a>
  );
}
