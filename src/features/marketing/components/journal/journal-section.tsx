import Link from 'next/link';

import { Container, Icon } from '@/components/atoms';
import { Reveal, SectionHeading } from '@/components/molecules';
import { routes } from '@/config/routes';

import { SECTION } from '../../anchors';
import { JOURNAL } from '../../data/content';
import { ArticleCard } from './article-card';

export function JournalSection() {
  return (
    <Container as="section" id={SECTION.journal} aria-labelledby="journal-heading" className="scroll-mt-24 pb-24">
      <SectionHeading
        id="journal-heading"
        eyebrow="JOURNAL"
        title="راهنمای خرید و نگهداری ابزار"
        className="mb-9"
        action={
          <Link href={routes.blog} className="text-brand-600 flex items-center gap-1.5 text-sm font-bold">
            همهٔ مقالات
            <Icon name="chevronEnd" className="size-4" />
          </Link>
        }
      />
      <div className="grid gap-5 md:grid-cols-3">
        {JOURNAL.map((article) => (
          <Reveal key={article.slug}>
            <ArticleCard article={article} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
