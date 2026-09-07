import Link from 'next/link';

import type { FooterColumn } from '../../types';

export function FooterNavColumn({ column }: { column: FooterColumn }) {
  return (
    <nav aria-label={column.title}>
      <p className="mb-4 text-[15px] font-bold text-white">{column.title}</p>
      <ul className="flex flex-col gap-3 text-sm">
        {column.links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-accent-500 text-white/80 transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
