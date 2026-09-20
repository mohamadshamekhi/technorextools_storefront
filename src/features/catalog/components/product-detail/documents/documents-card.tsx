import type { DownloadableDocument } from '../../../types/pdp';
import { DocumentRow } from './document-row';

/** Renders only documents that exist — no disabled placeholders; the whole card hides when empty. */
export function DocumentsCard({ documents }: { documents: DownloadableDocument[] }) {
  if (documents.length === 0) return null;
  return (
    <ul className="border-hairline bg-surface divide-y divide-[var(--color-hairline)] rounded-2xl border px-4 shadow-(--shadow-soft)">
      {documents.map((doc) => (
        <DocumentRow key={doc.id} doc={doc} />
      ))}
    </ul>
  );
}
