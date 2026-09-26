import type { SparePart } from '../services/spare-parts.schemas';
import { SparePartCard } from './spare-part-card';

export function SparePartGrid({ parts }: { parts: SparePart[] }) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {parts.map((part) => (
        <li key={part.id} className="flex">
          <SparePartCard part={part} />
        </li>
      ))}
    </ul>
  );
}
