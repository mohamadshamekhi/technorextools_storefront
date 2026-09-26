/**
 * Stopgap cover resolution: `abzar/api` only reports `coverImage` when a media
 * row with `purpose=COVER` exists. Editors who only drop an image inside the
 * article body leave the field null, so we fall back to the first body image.
 * Keep the host list in sync with `next.config.mjs` `images.remotePatterns` —
 * `next/image` throws on an unconfigured host.
 */
const ALLOWED_HOST_SUFFIXES = ['.arvanstorage.ir', '.abzar.example'];

const IMG_SRC = /<img[^>]+src=["']([^"']+)["']/i;

/** First `https` `<img>` in the HTML whose host is allowed, else `null`. */
export function firstImageFromHtml(html: string | null | undefined): string | null {
  const match = html ? IMG_SRC.exec(html) : null;
  const raw = match?.[1];
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:') return null;
    return ALLOWED_HOST_SUFFIXES.some((suffix) => url.hostname.endsWith(suffix)) ? url.href : null;
  } catch {
    return null;
  }
}
