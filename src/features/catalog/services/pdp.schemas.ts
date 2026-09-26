import { z } from 'zod';

/**
 * PDP primitives returned inside `productDetailSchema` (`catalog.schemas.ts` imports from
 * here, never the reverse) plus the composed view-model the PDP renders.
 */

/** Icons the PDP feature cards may reference (subset of the `Icon` atom). */
export const pdpIconSchema = z.enum([
  'bolt',
  'gauge',
  'weight',
  'shield',
  'drill',
  'gear',
  'wrench',
]);
export type PdpIcon = z.infer<typeof pdpIconSchema>;

export const documentTypeSchema = z.enum(['catalog', 'manual', 'datasheet', 'certificate']);

export const productDocumentSchema = z.object({
  id: z.string(),
  type: documentTypeSchema,
  title: z.string(),
  url: z.string(),
  sizeKb: z.number().positive(),
  locale: z.enum(['fa', 'en']),
  updatedAt: z.string(),
});

export const hotspotSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  /** Model-space position [x, y, z] — unlike `productPartSchema.hotspot`, which is image percent. */
  position: z.tuple([z.number(), z.number(), z.number()]),
});

export const model3dSchema = z.object({
  glbUrl: z.string(),
  posterUrl: z.string(),
  alt: z.string(),
  hotspots: z.array(hotspotSchema),
});

/** Exploded-view part from `abzar/api`; `hotspot` is a percent offset on `explodedViewUrl`. */
export const productPartSchema = z.object({
  number: z.number().int().positive(),
  name: z.string(),
  code: z.string(),
  sellable: z.boolean(),
  hotspot: z.object({ x: z.number(), y: z.number() }).nullable(),
});

export const explodedViewSchema = z.object({
  /** Admin-uploaded exploded image (`explodedViewUrl`); empty until one is uploaded. */
  imageUrl: z.string(),
  alt: z.string(),
  parts: z.array(productPartSchema),
});

export const specRowSchema = z.object({ label: z.string(), value: z.string() });

/** `icon` is a free-form key from `abzar/api`; mapped to an `Icon` name in `pdp-icon.ts`. */
export const highlightSchema = z.object({
  icon: z.string(),
  value: z.string(),
  label: z.string(),
});

/** Only moderator-approved questions are returned; `answer` is null while pending. */
export const questionSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string().nullable().default(null),
  askedAt: z.string(),
  answeredAt: z.string().nullable().default(null),
});

/** Body + result of `POST /storefront/catalog/products/{slug}/questions`. */
export const createQuestionSchema = z.object({
  question: z
    .string()
    .trim()
    .min(10, 'پرسش باید دست‌کم ۱۰ نویسه باشد')
    .max(500, 'پرسش حداکثر ۵۰۰ نویسه است'),
});
export const createQuestionResultSchema = z.object({ status: z.string() });
export const productQuestionsSchema = z.array(questionSchema);

/** View-model the PDP renders — assembled from `ProductDetail` in `utils/pdp-extras.ts`. */
export const productExtrasSchema = z.object({
  documents: z.array(productDocumentSchema),
  model3d: model3dSchema.nullable(),
  explodedView: explodedViewSchema.nullable(),
  video: z.object({ url: z.string(), posterUrl: z.string() }).nullable(),
  highlights: z.array(highlightSchema),
  questions: z.array(questionSchema),
});
