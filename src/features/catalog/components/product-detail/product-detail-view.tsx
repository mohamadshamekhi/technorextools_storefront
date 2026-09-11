import Link from 'next/link';

import { Container } from '@/components/atoms';
import { routes } from '@/config/routes';

import type { ProductComments, ProductDetail } from '../../types';
import { ProductGrid } from '../product-grid';
import { DetailSection } from './detail-section';
import { ProductBuyBox } from './product-buy-box';
import { ProductGallery } from './product-gallery';
import { ProductReviews } from './product-reviews';
import { SpecList } from './spec-list';

type ProductDetailViewProps = {
  product: ProductDetail;
  comments: ProductComments;
};

export function ProductDetailView({ product, comments }: ProductDetailViewProps) {
  return (
    <>
      <Container>
        <nav aria-label="مسیر صفحه" className="text-foreground-muted flex items-center gap-2 pt-6 text-xs">
          <Link href={routes.home} className="hover:text-brand-600">
            خانه
          </Link>
          <span aria-hidden>/</span>
          <Link href={routes.products} className="hover:text-brand-600">
            همه محصولات
          </Link>
          <span aria-hidden>/</span>
          <Link href={routes.category(product.category.slug)} className="hover:text-brand-600">
            {product.category.title}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground truncate font-semibold">{product.title}</span>
        </nav>
      </Container>

      <Container className="grid items-start gap-10 pt-6 lg:grid-cols-[1.05fr_0.85fr]">
        <ProductGallery images={product.images} isAmazingDeal={product.isAmazingDeal} />
        <ProductBuyBox product={product} />
      </Container>

      <Container className="mt-10">
        {product.description ? (
          <DetailSection id="description" title="توضیحات و کاربرد" icon="doc">
            <p className="text-foreground-muted max-w-3xl text-[15px] leading-loose whitespace-pre-line">
              {product.description}
            </p>
          </DetailSection>
        ) : null}

        <DetailSection id="specs" title="مشخصات فنی" icon="gauge">
          <SpecList rows={product.attributeValues} />
        </DetailSection>

        <DetailSection id="reviews" title="نقد و نظر مشتریان" icon="star">
          <ProductReviews comments={comments} />
        </DetailSection>

        {product.related.length > 0 ? (
          <DetailSection id="related" title="محصولات مشابه" icon="bolt">
            <ProductGrid
              products={product.related}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            />
          </DetailSection>
        ) : null}
      </Container>
    </>
  );
}
