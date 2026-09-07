import { Container } from '@/components/atoms';

import type { Product } from '../../types';
import { getProductDetail } from '../../utils/product-detail';
import { DetailSection } from './detail-section';
import { DetailTabs } from './detail-tabs';
import { ProductBuyBox } from './product-buy-box';
import { ProductBreadcrumb } from './product-breadcrumb';
import { ProductDescription } from './product-description';
import { ProductFaq } from './product-faq';
import { ProductGallery } from './product-gallery';
import { ProductReviews } from './product-reviews';
import { RelatedProducts } from './related-products';
import { SpecTable } from './spec-table';

type ProductDetailViewProps = {
  product: Product;
  related: Product[];
};

export function ProductDetailView({ product, related }: ProductDetailViewProps) {
  const detail = getProductDetail(product);

  return (
    <>
      <Container>
        <ProductBreadcrumb title={product.title} />
      </Container>
      <Container className="grid items-start gap-10 pt-6 lg:grid-cols-[1.05fr_0.85fr]">
        <ProductGallery
          images={detail.gallery}
          price={product.price}
          compareAt={product.compareAt}
        />
        <ProductBuyBox product={product} detail={detail} />
      </Container>

      <Container className="mt-14">
        <DetailTabs />

        <DetailSection
          id="description"
          title="توضیحات و کاربرد"
          icon="doc"
          tint="oklch(0.95 0.035 45)"
          ink="oklch(0.6 0.19 45)"
        >
          <ProductDescription description={product.description} highlights={detail.highlights} />
        </DetailSection>

        <DetailSection
          id="specs"
          title="مشخصات فنی"
          icon="gauge"
          tint="oklch(0.94 0.035 250)"
          ink="oklch(0.53 0.16 250)"
        >
          <SpecTable rows={detail.specs} />
        </DetailSection>

        <DetailSection
          id="reviews"
          title="نقد و نظر مشتریان"
          icon="star"
          tint="oklch(0.95 0.05 85)"
          ink="oklch(0.6 0.17 75)"
        >
          <ProductReviews
            rating={product.rating}
            reviewCount={product.reviews}
            bars={detail.ratingBars}
            reviews={detail.reviews}
          />
        </DetailSection>

        <DetailSection
          id="faq"
          title="سوالات متداول"
          icon="question"
          tint="oklch(0.94 0.035 300)"
          ink="oklch(0.5 0.16 300)"
        >
          <ProductFaq faqs={detail.faqs} />
        </DetailSection>

        <RelatedProducts products={related} />
      </Container>
    </>
  );
}
