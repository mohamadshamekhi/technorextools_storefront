/** Spare parts — client-safe surface. Fetchers (`services/spare-parts.api.ts`) are imported by path. */
export { SparePartCard } from './components/spare-part-card';
export { SparePartGrid } from './components/spare-part-grid';
export { SparePartDetailView } from './components/spare-part-detail-view';
export { SparePartsHero } from './components/spare-parts-hero';
export { SparePartsToolbar } from './components/spare-parts-toolbar';
export { SparePartsEmpty } from './components/spare-parts-empty';
export { sparePartsQuerySchema } from './services/spare-parts.schemas';
export type { SparePart, SparePartsQuery } from './services/spare-parts.schemas';
