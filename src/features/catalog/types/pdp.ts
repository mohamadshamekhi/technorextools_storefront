import type { z } from 'zod';

import type {
  explodedViewSchema,
  highlightSchema,
  hotspotSchema,
  model3dSchema,
  productDocumentSchema,
  productExtrasSchema,
  questionSchema,
  specRowSchema,
} from '../services/pdp.schemas';

export type ProductDocument = z.infer<typeof productDocumentSchema>;
export type Hotspot = z.infer<typeof hotspotSchema>;
export type Model3d = z.infer<typeof model3dSchema>;
export type ExplodedView = z.infer<typeof explodedViewSchema>;
export type ExplodedPart = ExplodedView['parts'][number];
export type SpecRow = z.infer<typeof specRowSchema>;
export type Highlight = z.infer<typeof highlightSchema>;
export type ProductQuestion = z.infer<typeof questionSchema>;
export type ProductExtras = z.infer<typeof productExtrasSchema>;

export type GalleryMode = 'photos' | '3d' | 'exploded' | 'video';

/** Document plus its BFF download link (`/api/documents/[id]`). */
export type DownloadableDocument = ProductDocument & { href: string };
