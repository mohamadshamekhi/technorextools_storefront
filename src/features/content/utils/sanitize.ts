import sanitizeHtml from 'sanitize-html';

/**
 * Server-side sanitize of admin-authored article HTML from `abzar/api` before it
 * reaches `dangerouslySetInnerHTML` — the only sanctioned use per `security.md`.
 * `sanitize-html` is pure JS (no jsdom) so it runs in the Next server build.
 */
export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'br', 'hr', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote',
      'strong', 'em', 'b', 'i', 'a', 'code', 'pre', 'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
    },
  });
}
