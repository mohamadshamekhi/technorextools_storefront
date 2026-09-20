import type { Metadata } from 'next';

import { Container, Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { RepairForm, RepairLoginNotice } from '@/features/repairs';
import { breadcrumbSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';
import { toPersianDigits } from '@/lib/persian';
import { getSession } from '@/lib/session';

export const metadata: Metadata = buildMetadata({
  title: 'درخواست تعمیر ابزار',
  description:
    'ثبت آنلاین درخواست تعمیر ابزار بادی و شارژی تکنورکس؛ سریال گارانتی و شرح مشکل را وارد کنید و وضعیت را در حساب کاربری دنبال کنید.',
  path: routes.repairRequest,
});

const STEPS = [
  { icon: 'pencil', title: 'ثبت درخواست', body: 'شرح مشکل و سریال گارانتی را وارد کنید.' },
  { icon: 'headset', title: 'بررسی کارشناس', body: 'تیم فنی برای هماهنگی با شما تماس می‌گیرد.' },
  { icon: 'wrench', title: 'تعمیر و تحویل', body: 'وضعیت تعمیر در حساب کاربری به‌روز می‌شود.' },
] as const;

export default async function RepairRequestPage() {
  const user = await getSession();
  const structuredData = breadcrumbSchema([
    { name: 'خانه', path: routes.home },
    { name: 'درخواست تعمیر', path: routes.repairRequest },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // Static, server-generated structured data — XSS-safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Container className="py-10 lg:py-14">
        <div className="max-w-xl">
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">درخواست تعمیر</h1>
          <p className="text-foreground-muted mt-3 text-sm leading-loose text-pretty">
            ابزار بادی یا شارژی شما ایراد پیدا کرده؟ درخواست را همین‌جا ثبت کنید تا کارشناسان خدمات
            پس از فروش تکنورکس بررسی کنند.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {user ? <RepairForm /> : <RepairLoginNotice />}

          <ol className="border-hairline bg-surface-muted/60 rounded-card flex flex-col gap-5 border p-6">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="bg-surface text-brand-600 grid size-10 shrink-0 place-items-center rounded-xl shadow-(--shadow-soft)">
                  <Icon name={step.icon} className="size-5" />
                </span>
                <div>
                  <p className="text-[13px] font-extrabold">
                    {toPersianDigits(index + 1)}. {step.title}
                  </p>
                  <p className="text-foreground-muted mt-1 text-[13px] leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </>
  );
}
