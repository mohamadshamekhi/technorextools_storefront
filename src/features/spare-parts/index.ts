/** Spare parts — client-safe surface. Fetchers (`services/spare-parts.api.ts`) are imported by path. */
export { SparePartCard } from './components/spare-part-card';
export { SparePartGrid } from './components/spare-part-grid';
export { SparePartDetailView } from './components/spare-part-detail-view';
export { sparePartsQuerySchema } from './services/spare-parts.schemas';
export type { SparePart, SparePartsQuery } from './services/spare-parts.schemas';
