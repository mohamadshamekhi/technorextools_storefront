import { Container, Icon, MediaPlaceholder } from '@/components/atoms';
import { Reveal } from '@/components/molecules';

import { ABOUT_MISSION_POINTS } from '../../data/about';

/** Shop-floor photo slot beside the mission statement. */
function MissionMedia() {
  return (
    <MediaPlaceholder
      label="تصویر کارگاه / خط تولید"
      className="border-hairline aspect-[4/3] rounded-[1.625rem] border"
    />
  );
}

/** Mission statement with the three-point assurance checklist. */
export function MissionSection() {
  return (
    <section className="pb-24">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <MissionMedia />
        </Reveal>
        <Reveal>
          <h2 className="mb-4 text-2xl leading-[1.4] font-black tracking-tight text-balance sm:text-[1.75rem]">
            مأموریت ما، ابزاری است که می‌توان به آن تکیه کرد
          </h2>
          <p className="text-foreground-muted mb-6 text-[15px] leading-loose">
            در پوما ایر باور داریم ابزار خوب، یعنی کار روان‌تر و ایمن‌تر. به همین دلیل هر محصولی که
            عرضه می‌کنیم، پیش از رسیدن به دست شما آزمایش کیفیت می‌شود و با گارانتی اصالت کامل همراه
            است.
          </p>
          <ul className="flex flex-col gap-3.5">
            {ABOUT_MISSION_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span className="bg-brand-50 text-brand-600 grid size-[26px] shrink-0 place-items-center rounded-full">
                  <Icon name="check" className="size-3.5" />
                </span>
                <span className="text-sm font-bold">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
