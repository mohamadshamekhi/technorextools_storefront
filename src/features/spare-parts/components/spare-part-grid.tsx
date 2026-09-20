import type { SparePart } from '../services/spare-parts.schemas';
import { SparePartCard } from './spare-part-card';

export function SparePartGrid({ parts }: { parts: SparePart[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {parts.map((part) => (
        <li key={part.id} className="flex">
          <div className="flex w-full flex-col">
            <SparePartCard part={part} />
          </div>
        </li>
      ))}
    </ul>
  );
}
