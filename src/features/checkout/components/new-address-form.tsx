const FIELD_CLASS =
  'rounded-xl border border-hairline px-3.5 py-3 text-[13.5px] outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15';

/** Visual-only scratch form — nothing to persist to until `abzar/api` ships addresses. */
export function NewAddressForm() {
  return (
    <div className="border-hairline grid grid-cols-2 gap-3 border-t pt-4.5">
      <input placeholder="نام و نام خانوادگی" className={`${FIELD_CLASS} col-span-2`} />
      <input placeholder="شماره موبایل" dir="ltr" className={FIELD_CLASS} />
      <input placeholder="کد پستی" dir="ltr" className={FIELD_CLASS} />
      <input placeholder="استان" className={FIELD_CLASS} />
      <input placeholder="شهر" className={FIELD_CLASS} />
      <textarea placeholder="آدرس کامل" rows={3} className={`${FIELD_CLASS} col-span-2 resize-none`} />
    </div>
  );
}
