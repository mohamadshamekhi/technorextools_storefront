import Image from 'next/image';
import Link from 'next/link';

import { Container, Icon } from '@/components/atoms';
import { Reveal } from '@/components/molecules';
import { routes } from '@/config/routes';

import { getCategoryTree } from '../services/catalog.api';
import { categoryPresentation } from '../data/presentation';
import { CategoryRailCard } from './category-rail-card';
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
      <Container className="py-6 sm:hidden">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 id="categories-heading" className="text-lg font-black">
            دسته‌بندی ابزارها
          </h2>
          <Link
            href={routes.products}
            className="text-brand-700 flex min-h-11 items-center gap-1 text-[13px] font-bold"
          >
            همه محصولات
            <Icon name="chevron" className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {categories.map((category, index) => (
            <CategoryRailCard key={category.id} category={category} featured={index === 0} />
          ))}
        </div>
      </Container>
      <Container className="hidden justify-between gap-4 py-8 sm:flex">
        {categories.map((category) => {
          const style = categoryPresentation(category.slug);
          return (
            <Reveal key={category.id} as="div" className="flex min-w-0 flex-1">
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
                      className="object-contain p-1"
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
                <span className="group-hover:text-brand-700 line-clamp-2 text-[13px] leading-snug font-bold transition-colors">
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
