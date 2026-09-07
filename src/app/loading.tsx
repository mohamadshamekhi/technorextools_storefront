import { Spinner } from '@/components/atoms';

export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Spinner className="text-brand-500 size-6" />
    </div>
  );
}
