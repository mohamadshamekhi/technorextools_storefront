import { Container } from '@/components/atoms';
import { Toaster } from '@/components/molecules/toaster';
import { SparePartGrid, type SparePart } from '@/features/spare-parts';

import type { ProductComments, ProductDetail } from '../../types';
import type { ProductExtras, DownloadableDocument, SpecRow } from '../../types/pdp';
import { toProductCard } from '../../utils/pdp-extras';
import { ProductBuyBox } from './buy-box/product-buy-box';
import { ProductCarousel } from './carousels/product-carousel';
import { RecentlyViewed } from './carousels/recently-viewed';
import { DocumentsCard } from './documents/documents-card';
import { PartsTable } from './exploded/parts-table';
import { ProductGallery } from './gallery/product-gallery';
import { ReviewsSection } from './reviews/reviews-section';
import { DescriptionSection } from './sections/description-section';
import { DetailSection } from './sections/detail-section';
import { PdpBreadcrumb } from './sections/pdp-breadcrumb';
import { PdpTabBar, type PdpTab } from './sections/pdp-tab-bar';
import { QaSection } from './sections/qa-section';
import { ScrollProgress } from './sections/scroll-progress';
import { SpecsTable } from './sections/specs-table';

type ProductDetailViewProps = {
  product: ProductDetail;
  comments: ProductComments;
  extras: ProductExtras;
  documents: DownloadableDocument[];
  specs: SpecRow[];
  descriptionHtml: string | null;
  spareParts?: SparePart[];
};

export function ProductDetailView({
  product,
  comments,
  extras,
  documents,
  specs,
  descriptionHtml,
  spareParts = [],
}: ProductDetailViewProps) {
  const { explodedView } = extras;
  const catalog = documents.find((doc) => doc.type === 'catalog') ?? null;

  const tabs: PdpTab[] = [
    ...(descriptionHtml ? [{ id: 'description', label: 'توضیحات' }] : []),
    ...(explodedView && explodedView.parts.length > 0
      ? [{ id: 'structure', label: 'ساختار و قطعات' }]
      : []),
    ...(specs.length > 0 ? [{ id: 'specs', label: 'مشخصات فنی' }] : []),
    ...(documents.length > 0 ? [{ id: 'documents', label: 'اسناد' }] : []),
    ...(spareParts.length > 0 ? [{ id: 'spare-parts', label: 'قطعات یدکی' }] : []),
    { id: 'reviews', label: 'دیدگاه‌ها' },
    { id: 'qa', label: 'پرسش و پاسخ' },
  ];

  return (
    <>
      <ScrollProgress />
      <Container>
        <PdpBreadcrumb category={product.category} title={product.title} />
      </Container>

      <Container className="mt-4 grid gap-8 lg:grid-cols-[58fr_42fr] lg:gap-x-10">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <ProductGallery product={product} extras={extras} />
        </div>
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ProductBuyBox product={product} comments={comments} extras={extras} catalog={catalog} />
        </div>

        <div className="min-w-0 lg:col-start-1 lg:row-start-2">
          <PdpTabBar tabs={tabs} />
          {descriptionHtml ? (
            <DetailSection
              id="description"
              title="توضیحات و کاربرد"
              icon="doc"
              accordion={{ defaultOpen: true }}
            >
              <DescriptionSection html={descriptionHtml} />
            </DetailSection>
          ) : null}
          {explodedView && explodedView.parts.length > 0 ? (
            <DetailSection id="structure" title="ساختار و قطعات" icon="gear" accordion={{}}>
              <PartsTable parts={explodedView.parts} />
            </DetailSection>
          ) : null}
          {specs.length > 0 ? (
            <DetailSection id="specs" title="مشخصات فنی" icon="gauge" accordion={{}}>
              <SpecsTable rows={specs} />
            </DetailSection>
          ) : null}
          {documents.length > 0 ? (
            <DetailSection id="documents" title="اسناد فنی" icon="doc">
              <DocumentsCard documents={documents} />
            </DetailSection>
          ) : null}
          {spareParts.length > 0 ? (
            <DetailSection id="spare-parts" title="قطعات یدکی این دستگاه" icon="gear">
              <SparePartGrid parts={spareParts} />
            </DetailSection>
          ) : null}
          <DetailSection id="reviews" title="نقد و نظر مشتریان" icon="star">
            <ReviewsSection comments={comments} slug={product.slug} />
          </DetailSection>
          <DetailSection id="qa" title="پرسش و پاسخ" icon="question">
            <QaSection questions={extras.questions} slug={product.slug} />
          </DetailSection>
        </div>
      </Container>

      <Container>
        <ProductCarousel id="similar" title="محصولات مشابه" products={product.related} />
        <RecentlyViewed current={toProductCard(product)} />
      </Container>
      <Toaster />
    </>
  );
}
