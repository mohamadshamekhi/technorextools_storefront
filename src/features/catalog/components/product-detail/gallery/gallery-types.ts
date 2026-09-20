import type { GalleryMode } from '../../../types/pdp';

export type GalleryPhoto = { id: string; url: string; alt: string };

/** One tile in the thumbnail rail — a photo, or an entry point into another mode. */
export type RailEntry = {
  key: string;
  mode: GalleryMode;
  photoIndex?: number;
  src?: string;
  label: string;
  badge?: string;
};
