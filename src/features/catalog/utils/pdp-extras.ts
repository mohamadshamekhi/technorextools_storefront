import type { ProductDetail, ProductCard } from '../types';
import type { DownloadableDocument, ProductDocument, ProductExtras, SpecRow } from '../types/pdp';

/** Specs come straight from `abzar/api` attribute values — no static filler. */
export function buildSpecs(product: ProductDetail): SpecRow[] {
  return product.attributeValues
    .filter((attr) => attr.value.trim().length > 0)
    .map((attr) => ({
      label: attr.attributeTitle,
      value: attr.unit ? `${attr.value} ${attr.unit}` : attr.value,
    }));
}

/**
 * Everything the PDP renders beyond the core product, all served by `abzar/api`.
 * The GLB goes through `/api/models` because the media bucket sends no CORS header.
 */
export function buildExtras(product: ProductDetail): ProductExtras {
  const poster = product.images.find((image) => image.isMain) ?? product.images[0];
  const model3d = product.model3dUrl
    ? {
        glbUrl: `/api/models?src=${encodeURIComponent(product.model3dUrl)}`,
        posterUrl: poster?.url ?? '',
        alt: `مدل سه‌بعدی ${product.title}`,
        hotspots: product.model3dHotspots,
      }
    : null;
  // Image and parts both come from `abzar/api`; drop the whole view only when neither exists.
  const explodedView =
    product.explodedViewUrl || product.parts.length > 0
      ? {
          imageUrl: product.explodedViewUrl ?? '',
          alt: `نمای انفجاری ${product.title}`,
          parts: product.parts,
        }
      : null;

  return {
    documents: product.documents,
    model3d,
    explodedView,
    video: null,
    highlights: product.highlights,
    questions: product.questions,
  };
}

export function toProductCard(product: ProductDetail): ProductCard {
  const main = product.images.find((image) => image.isMain) ?? product.images[0];
  const first = product.variants[0];
  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    basePrice: product.basePrice,
    isAmazingDeal: product.isAmazingDeal,
    brand: product.brand ? { title: product.brand.title, slug: product.brand.slug } : null,
    mainImageUrl: main?.url ?? null,
    firstVariant: first
      ? { id: first.id, effectivePrice: first.effectivePrice, stockQty: first.stockQty }
      : null,
  };
}

/**
 * Stable BFF download links. The route re-reads the document from `abzar/api` by product slug
 * and mints a fresh expiring URL on each hit, so cached pages never carry an expired link.
 */
export function withDownloadHrefs(
  documents: ProductDocument[],
  slug: string,
): DownloadableDocument[] {
  const product = encodeURIComponent(slug);
  return documents.map((doc) => ({
    ...doc,
    href: `/api/documents/${encodeURIComponent(doc.id)}?product=${product}`,
  }));
}
