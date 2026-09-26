import { z } from 'zod';

/** `MediaView` returned by `POST /storefront/media/upload` in `abzar/api`. */
export const mediaViewSchema = z.object({
  id: z.string(),
  url: z.string(),
  contentType: z.string(),
  originalName: z.string().nullable().optional(),
});

export type MediaView = z.infer<typeof mediaViewSchema>;

/** Mirrors the `abzar/api` upload guard — JPEG/PNG/WebP/PDF ≤ 10MB. */
export const ACCEPTED_UPLOAD_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
] as const;

export const UPLOAD_ACCEPT_ATTR = ACCEPTED_UPLOAD_TYPES.join(',');
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export type AttachmentStatus = 'uploading' | 'done' | 'error';

/** One picked file plus its upload lifecycle. `mediaId` exists only when `done`. */
export type Attachment = {
  localId: string;
  name: string;
  size: number;
  previewUrl: string | null;
  status: AttachmentStatus;
  mediaId?: string;
  error?: string;
};
