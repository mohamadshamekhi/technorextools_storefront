import sanitizeHtml from 'sanitize-html';

const HAS_TAG = /<[a-z][\s\S]*>/i;

const ESCAPE: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ESCAPE[char] ?? char);
}

/** Plain-text descriptions become paragraphs; rich text is kept as-is for sanitizing. */
function toHtmlSource(text: string): string {
  if (HAS_TAG.test(text)) return text;
  return text
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => `<p>${escapeHtml(chunk).replace(/\n/g, '<br />')}</p>`)
    .join('');
}

/**
 * Server-only. `abzar/api` returns the product description as admin-authored rich text
 * (or plain text). Sanitized here before it reaches `dangerouslySetInnerHTML` — the
 * only sanctioned use per `security.md`.
 */
export function toDescriptionHtml(text: string | null): string | null {
  if (!text?.trim()) return null;
  const clean = sanitizeHtml(toHtmlSource(text), {
    allowedTags: [
      'p',
      'br',
      'hr',
      'h3',
      'h4',
      'ul',
      'ol',
      'li',
      'blockquote',
      'strong',
      'em',
      'b',
      'i',
      'a',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
    ],
    allowedAttributes: { a: ['href', 'title', 'target', 'rel'] },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    transformTags: { a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }) },
  }).trim();
  return clean || null;
}
