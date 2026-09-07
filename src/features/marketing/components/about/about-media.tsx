import { MediaPlaceholder } from '@/components/atoms';

export function AboutMedia() {
  return (
    <div className="relative">
      <MediaPlaceholder
        label="تصویر کارگاه / تیم فنی"
        className="border-hairline aspect-[4/5] rounded-[1.75rem] border"
      />
      <div className="bg-brand-500 shadow-brand-500/35 absolute bottom-6 end-[-1.5rem] max-w-[210px] rounded-3xl px-6 py-5 text-white shadow-2xl">
        <div className="font-display text-3xl leading-none font-bold">۹۸٪</div>
        <p className="mt-2 text-[13px] leading-relaxed font-bold">
          رضایت مشتریان از خدمات پس از فروش
        </p>
      </div>
    </div>
  );
}
