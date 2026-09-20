import { pdpMock } from '../data/pdp-mock';
import type { ProductDetail, ProductCard } from '../types';
import type { DownloadableDocument, ProductDocument, ProductExtras, SpecRow } from '../types/pdp';

/** Real API attributes first; mock rows fill in labels the API doesn't carry. */
export function mergeSpecs(product: ProductDetail, extras: ProductExtras): SpecRow[] {
  const api = product.attributeValues.map((attr) => ({
    label: attr.attributeTitle,
    value: attr.unit ? `${attr.value} ${attr.unit}` : attr.value,
  }));
  const seen = new Set(api.map((row) => row.label));
  return [...api, ...extras.specs.filter((row) => !seen.has(row.label))];
}

/** Mock extras overlaid with anything the API already provides (datasheet, 3D model). */
export function buildExtras(product: ProductDetail): ProductExtras {
  const documents: ProductDocument[] = product.datasheetUrl
    ? pdpMock.documents.map((doc) =>
        doc.type === 'datasheet' ? { ...doc, url: product.datasheetUrl ?? doc.url } : doc,
      )
    : pdpMock.documents;
  const model3d =
    pdpMock.model3d && product.model3dUrl
      ? { ...pdpMock.model3d, glbUrl: product.model3dUrl }
      : pdpMock.model3d;
  // Image and parts both come from `abzar/api`; drop the whole view only when neither exists.
  const explodedView =
    product.explodedViewUrl || product.parts.length > 0
      ? {
          imageUrl: product.explodedViewUrl ?? '',
          alt: `نمای انفجاری ${product.title}`,
          parts: product.parts,
        }
      : null;
  return { ...pdpMock, documents, model3d, explodedView };
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

/** Stable BFF download links; the route signs a fresh expiring URL on each hit. */
export function withDownloadHrefs(documents: ProductDocument[]): DownloadableDocument[] {
  return documents.map((doc) => ({ ...doc, href: `/api/documents/${doc.id}` }));
}
