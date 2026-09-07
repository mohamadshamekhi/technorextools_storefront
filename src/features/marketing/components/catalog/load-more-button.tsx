type LoadMoreButtonProps = {
  remaining: number;
  onClick: () => void;
};

export function LoadMoreButton({ remaining, onClick }: LoadMoreButtonProps) {
  if (remaining <= 0) return null;

  return (
    <div className="mt-12 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className="border-hairline hover:border-brand-500 hover:text-brand-600 rounded-full border bg-surface px-10 py-3.5 text-sm font-bold transition-colors"
      >
        نمایش محصولات بیشتر
      </button>
    </div>
  );
}
