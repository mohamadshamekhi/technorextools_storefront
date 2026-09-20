import { z } from 'zod';

import { productPartSchema } from './catalog.schemas';

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
  /** Model-space position [x, y, z]. */
  position: z.tuple([z.number(), z.number(), z.number()]),
});

export const model3dSchema = z.object({
  glbUrl: z.string(),
  posterUrl: z.string(),
  alt: z.string(),
  hotspots: z.array(hotspotSchema),
});

export const explodedViewSchema = z.object({
  /** Admin-uploaded exploded image (`explodedViewUrl`); empty until one is uploaded. */
  imageUrl: z.string(),
  alt: z.string(),
  parts: z.array(productPartSchema),
});

export const specRowSchema = z.object({ label: z.string(), value: z.string() });

export const keyFeatureSchema = z.object({
  icon: pdpIconSchema,
  title: z.string(),
  value: z.string(),
  hint: z.string(),
});

export const highlightSchema = z.object({
  icon: pdpIconSchema,
  value: z.string(),
  label: z.string(),
});

export const questionSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string().nullable(),
  askedAt: z.string(),
});

export const productExtrasSchema = z.object({
  documents: z.array(productDocumentSchema),
  model3d: model3dSchema.nullable(),
  explodedView: explodedViewSchema.nullable(),
  video: z.object({ url: z.string(), posterUrl: z.string() }).nullable(),
  specs: z.array(specRowSchema),
  highlights: z.array(highlightSchema).length(3),
  keyFeatures: z.array(keyFeatureSchema),
  questions: z.array(questionSchema),
});
