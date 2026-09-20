import Image from 'next/image';
import Link from 'next/link';

import { Container, Icon } from '@/components/atoms';
import { Reveal } from '@/components/molecules';
import { routes } from '@/config/routes';

import { getCategoryTree } from '../services/catalog.api';
import { categoryPresentation } from '../data/presentation';
import { topLevelCategories } from '../utils/category-tree';

export async function CategoryRail() {
  const tree = await getCategoryTree().catch(() => []);
  const categories = topLevelCategories(tree);
  if (categories.length === 0) return null;

  return (
    <section
      aria-labelledby="categories-heading"
      className="bg-surface border-hairline scroll-mt-24 border-y"
    >
      <h2 id="categories-heading" className="sr-only">
        دسته‌بندی ابزارها
      </h2>
      <Container className="flex gap-4 overflow-x-auto py-8 sm:justify-between">
        {categories.map((category) => {
          const style = categoryPresentation(category.slug);
          return (
            <Reveal key={category.id} as="div" className="flex shrink-0 basis-24 sm:flex-1">
              <Link
                href={routes.category(category.slug)}
                className="group flex w-full flex-col items-center gap-3 text-center"
              >
                {category.imageUrl ? (
                  <span className="bg-surface border-hairline relative grid size-19.5 place-items-center overflow-hidden rounded-2xl border shadow-(--shadow-soft) transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1.5 group-hover:shadow-(--shadow-lift)">
                    <Image
                      src={category.imageUrl}
                      alt={category.title}
                      fill
                      sizes="78px"
                      className="object-contain p-3"
                    />
                  </span>
                ) : (
                  <span
                    className="grid size-19.5 place-items-center rounded-2xl shadow-(--shadow-soft) ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1.5 group-hover:shadow-(--shadow-lift)"
                    style={{ backgroundColor: style.tint, color: style.ink }}
                  >
                    <Icon name={style.icon} className="size-8" />
                  </span>
                )}
                <span className="group-hover:text-brand-700 text-[13px] font-bold transition-colors">
                  {category.title}
                </span>
              </Link>
            </Reveal>
          );
        })}
      </Container>
    </section>
  );
}
