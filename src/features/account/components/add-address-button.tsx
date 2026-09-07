import { Icon } from '@/components/atoms';

/** Visual-only affordance — the address form arrives with the `abzar/api` wiring. */
export function AddAddressButton() {
  return (
    <button
      type="button"
      className="bg-brand-500 hover:bg-brand-600 flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-bold text-white transition-colors"
    >
      <Icon name="plus" className="size-3.5" />
      افزودن آدرس جدید
    </button>
  );
}
