import { sanitizeArticleHtml } from '../utils/sanitize';
import styles from './article-body.module.css';

/**
 * Renders an article's HTML body from `abzar/api`. The string is sanitized
 * server-side first — the single sanctioned `dangerouslySetInnerHTML` per `security.md`.
 */
export function ArticleBody({ html }: { html: string }) {
  return (
    <div className={styles.prose} dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(html) }} />
  );
}
