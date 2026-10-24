# .claude/docs/changelog.md — Live Workspace Ledger

> Update this file on every structural change: new feature, page, API route, atomic
> component, store slice, or refactor. Keep entries newest-first.

---

## 2026-10-24 — ریل دسته‌بندی صفحه‌ی اصلی: کارت‌های موبایل

**افزوده:**
- `src/features/catalog/components/category-rail-card.tsx` — کارت موبایل: تامبنیل + عنوان +
  تعداد زیردسته؛ `featured` = کارت عریض col-span-2 با گرادیان brand و دکمه‌ی فلش.

**تغییریافته:**
- `category-rail.tsx` — زیر `sm`: هدر «دسته‌بندی ابزارها» + لینک «همه محصولات» و گرید
  ۲ستونه‌ی `CategoryRailCard` (اولی featured)؛ از `sm` ردیف قبلی (`hidden sm:flex`) بدون اسکرول افقی.

---

## 2026-10-24 — منوی کشویی موبایل: «دسته‌بندی‌ها» آکاردئونی

**افزوده:**
- `src/features/marketing/components/drawer-categories.tsx` — ردیف تاگل «دسته‌بندی‌ها» با
  state `open` محلی؛ باز = `CategoryAccordion` روی کل درخت.

**تغییریافته:**
- `mobile-menu.tsx` — لینک `routes.categories` (صفحه نداشت → 404) حذف و `DrawerCategories`
  جایگزین؛ prop `categories` اضافه.
- `mobile-tab-bar.tsx` — `categories` به `MobileMenuDrawer` پاس می‌شود.
- `next.config.mjs` — redirect دائمی `/categories` → `/products` (لینک empty-state و لینک‌های قدیمی).

---

## 2026-10-24 — رفع باز نشدن آکاردئون دسته‌بندی موبایل

**تغییریافته:**
- `category-bottom-sheet.tsx` — ناحیه‌ی اسکرول `flex-1` → `flex-auto` (basis 0 در ستون با
  ارتفاع auto زیرشاخه‌های باز را ارتفاع صفر می‌داد).
- `catalog/components/category-tree-item.tsx` — کلیک روی عنوان والد علاوه بر انتخاب، زیرشاخه را باز می‌کند.

---

## 2026-10-24 — دسته‌بندی موبایل: آکاردئون

**افزوده:**
- `src/features/marketing/components/category-accordion.tsx` — درخت بازگشتی؛ state
  `openId` محلی هر سطح (یک باز در هر سطح)؛ والد = تاگل + لینک «همه‌ی X»، برگ = لینک.
- `src/features/marketing/components/category-chip.tsx` — تامبنیل ۳۶px (تصویر API یا آیکون preset).

**تغییریافته:**
- `category-bottom-sheet.tsx` — به‌جای `CategoryMegaMenuColumn` (فقط سطح اول)،
  `CategoryAccordion` روی کل درخت + لینک ثابت «مشاهده همه محصولات» پایین شیت.

---

## 2026-10-24 — فیلتر دسته‌بندی کاتالوگ: درخت جمع‌شونده

**افزوده:**
- `src/features/catalog/components/category-tree-filter.tsx` — fieldset «دسته‌بندی» + «همه»؛
  state `expanded: Set<slug>` محلی، مقدار اولیه = اجداد دسته‌ی انتخاب‌شده.
- `src/features/catalog/components/category-tree-item.tsx` — ردیف بازگشتی؛ دکمه‌ی انتخاب +
  تاگل chevron برای نودهای دارای فرزند، زیرشاخه با `border-s` تورفته.
- `utils/category-tree.ts` — `CategoryOption`، `toCategoryOptions()`، `categoryAncestors()`.

**تغییریافته:**
- `catalog-filters.tsx` — prop `categories` → `categoryTree`؛ `FilterRadioList` دسته‌بندی
  با `CategoryTreeFilter` جایگزین (برند همچنان `FilterRadioList`).
- `catalog-view.tsx` — `toCategoryOptions(tree)` به فیلتر؛ لیست flat برای toolbar/chips باقی است.

---

## 2026-10-24 — مگامنوی دسته‌بندی: نمایش کامل درخت + اسکرول

**تغییریافته:**
- `src/features/marketing/components/category-mega-menu-column.tsx` — لیست ستون از
  `flex-1` (basis 0، باعث جمع‌شدن به ۲ آیتم) به `min-h-0 flex-auto overflow-y-auto`؛
  همه‌ی دسته‌ها نمایش داده می‌شوند و ستون اسکرول می‌خورد.
- `src/features/marketing/components/category-mega-menu.tsx` — `max-h-176` حذف؛
  `maxHeight` زمان‌اجرا `min(44rem, 100dvh - top - 16px)` تا پنل از viewport بیرون نزند.

---

## 2026-10-15 — کارت‌های آمار هیرو: آیکون روی موبایل بالای متن

**تغییریافته:**
- `src/features/marketing/components/hero/hero-stats.tsx` — کانتینر هر
  کارت روی موبایل `flex-col items-center text-center`؛ از `sm` به بالا
  `flex-row` قبلی (آیکون کنار متن) برمی‌گردد.

## 2026-10-15 — هیرو موبایل: دو دکمه کنار هم + کارت‌های آمار بدون کلیپ

**تغییریافته:**
- `src/features/marketing/components/hero/hero.tsx` — دو `PillLink` CTA
  روی موبایل `flex-1` (نصف-نصف کنار هم، بدون wrap) با پدینگ/فونت کوچک‌تر
  (`px-4 py-3 text-[13px]`)؛ از `sm` به بالا دوباره اندازهٔ کامل `lg`
  (`sm:flex-initial sm:px-8 sm:py-4 sm:text-base`).
- `src/features/marketing/components/hero/hero-stats.tsx` — علت کلیپ‌شدن
  لیبل («سال ت...»): `truncate` روی متن تنگ سه‌ستونه. `truncate` حذف شد
  (لیبل حالا دو خط می‌شکند، نه بریده)؛ آیکون/پدینگ/فونت روی موبایل
  کوچک‌تر شدند تا فضای بیشتری به متن برسد، از `sm` اندازهٔ قبلی برمی‌گردد.

## 2026-10-15 — ریورت: ترتیب قبلی هیرو برگشت

تغییر قبلی (تصویر بعد از هدلاین با grid-template-areas) طبق خواست کاربر
کامل ریورت شد — `hero.tsx` و `hero.module.css` به حالت قبل از آن تغییر
برگشتند (متن کامل اول، تصویر در DOM/ترتیب بصری بعد از آمار، دوباره فقط
`lg:grid-cols-[1.05fr_0.95fr]` ساده بدون named areas).

## 2026-10-15 — هیرو موبایل: تصویر محصول بعد از هدلاین، نه ته صفحه

فیدبک: «حس بصری ضعیفه/خسته‌کننده» — چون در استک موبایل قبلی، ترتیب DOM
(badge+headline+پاراگراف+CTA+آمار، بعد تصویر) یعنی کاربر موبایل قبل از
دیدن تصویر محصول باید از کل متن رد می‌شد.

**تغییریافته:**
- `src/features/marketing/components/hero/hero.module.css` — `.layout`
  با `grid-template-areas` (موبایل: `head`→`media`→`body` عمودی؛ از
  `lg` به بالا: دو ستونه با `media` کشیده روی هر دو ردیف — همون چیدمان
  قبلی دسکتاپ).
- `src/features/marketing/components/hero/hero.tsx` — سه بلاک
  (`head`=بج+هدلاین، `media`=`HeroShowcase`، `body`=پاراگراف+CTAها+آمار)
  به‌عنوان آیتم‌های جدا به grid areas وصل شدند؛ ترتیب DOM همونه، فقط
  `order` بصری عوض شد.

## 2026-10-15 — ریدیزاین کارت محصول (مینیمال)

نسخهٔ پرکنتراست (نوار تیرهٔ قیمت/CTA + گرادیان‌ها) فیدبک «زشت و دهاتی،
مینیمال باشه جذاب باشه» گرفت. جایگزین شد با نسخهٔ سوم: کارت تخت سفید،
بج‌های outline ظریف (بدون گرادیان)، دکمهٔ سبد فلت (بدون گرادیان/shadow)،
فاصله‌گذاری سبک‌تر — مطابق راهنمای Minimalism & Swiss Style (بدون سایهٔ
غیرضروری، یک رنگ accent، تایپوگرافی تمیز).

**تغییریافته:**
- `src/features/catalog/components/product-card.tsx` — کارت به حالت
  تخت p-3 برگشت؛ بج «شگفت‌انگیز» outline (`ring-sale/25` + متن `text-sale`
  به‌جای fill گرادیان)؛ ردیف برند/موجودی با `·` جداکننده به‌جای چیپ پررنگ؛
  قیمت ساده مشکی (`text-lg font-extrabold`)؛ دکمهٔ سبد compact با
  `shadow-none` (فلت). بدون داده‌ی جدید — schema کارت فیلد تخفیف ندارد.

## 2026-10-15 — ریدیزاین کارت محصول (پرکنتراست‌تر)

نسخهٔ اول (edge-to-edge + حلقهٔ ظریف) فیدبک «اصلا خوب نشده» گرفت؛ نسخهٔ دوم
عمداً پرکنتراست‌تر و جسورانه‌تر، بر پایهٔ سیستم طراحی مستند شده در
`globals.css` («Drama comes from dark-colored sections … built on the
ink token»).

**تغییریافته:**
- `src/features/catalog/components/product-card.tsx` —
  - نوار پایینی تیره (`surface-ink` + `texture-grid`، همون utility
    نوار اعلانات) حامل قیمت سفید بزرگ (`23px`) + دکمهٔ کامل
    «افزودن به سبد خرید» با گرادیان کهربایی (`--gradient-spark`).
  - بج «شگفت‌انگیز» با گرادیان کهربایی و سایهٔ accent به‌جای رنگ تخت.
  - چیپ برند روی `bg-ink` سفید-روی-تیره به‌جای چیپ خاکستری کم‌کنتراست.
  - پس‌زمینهٔ ناحیهٔ تصویر `bg-brand-50` (به‌جای خاکستری خنثی).
  - حلقهٔ کارت ضخیم‌تر (`ring-2`) و روی hover `ring-brand-400` +
    `shadow-(--shadow-brand)` به‌جای سایهٔ نرم خنثی.

## 2026-10-15 — انیمیشن باز شدن دراور منو

**افزوده:**
- `src/features/marketing/components/mobile-menu.module.css` —
  `drawer-backdrop-in` (fade) و `drawer-panel-in` (`translateX(100%)→0`،
  چون پنل با `start-0` روی لبهٔ راست RTL انکر شده).

**تغییریافته:**
- `src/features/marketing/components/mobile-menu.tsx` — بک‌دراپ و پنل
  دراور این دو کلاس انیمیشن را گرفتند.

## 2026-10-15 — همبرگر منو به تب‌بار پایین + سرچ تک‌ردیفه کنار لوگو

**تغییریافته:**
- `src/features/marketing/components/mobile-menu.tsx` — `MobileMenu`
  (با دکمهٔ تریگر داخلی) جایگزین شد با `MobileMenuDrawer({ onClose })`:
  کامپوننت کنترل‌شده بدون دکمهٔ خودش، با همان الگوی mount/unmount شرطی
  `CategoryBottomSheet`.
- `src/features/marketing/components/mobile-tab-bar.tsx` — تب پنجم جدید
  «منو» (آیکون `menu`) جایگزین تب «جست‌وجو» شد و `MobileMenuDrawer` را
  باز می‌کند؛ ترتیب نهایی: خانه / دسته‌بندی(شیت) / سبد / منو(دراور) /
  حساب من.
- `src/features/marketing/components/store-header.tsx` — ردیف دوم موبایل
  (سرچ جدا) و دکمهٔ همبرگر حذف شدند؛ `HeaderSearch` حالا همیشه در همان
  ردیف هدر، بلافاصله کنار لوگو (`flex max-w-lg flex-1`)، در همهٔ سایزها.

## 2026-10-15 — سرچ در هدر موبایل + دکمهٔ مگامنو به باتم‌شیت

**افزوده:**
- `src/features/marketing/components/category-bottom-sheet.tsx` —
  باتم‌شیت موبایل (`createPortal` به `document.body`)، دسته‌بندی‌های
  سطح‌اول با آیکون از `topLevelCategories` + `CategoryMegaMenuColumn`
  موجود، تپ روی هر آیتم مستقیم ناوبری می‌کند (بدون drill-down تو خود شیت).

**تغییریافته:**
- `src/features/marketing/components/category-mega-menu-column.tsx` —
  `className` اختیاری اضافه شد تا عرض ثابت دسکتاپی (`w-80`) در باتم‌شیت
  موبایل (`w-full`) قابل override باشد.
- `src/features/marketing/components/mobile-tab-bar.tsx` — تب
  «دسته‌بندی» از `Link` به دکمهٔ بازکنندهٔ `CategoryBottomSheet` تغییر
  کرد؛ prop جدید `categories: CategoryNode[]`.
- `src/app/(public)/layout.tsx` — `getCategoryTree()` همین‌جا هم فراخوانی
  و به `MobileTabBar` پاس داده می‌شود (RSC؛ کش fetch با `PrimaryNav`
  مشترک است، درخواست دوبرابر واقعی ندارد).
- `src/features/marketing/components/store-header.tsx` — ردیف جست‌وجوی
  همیشه-نمایان موبایل (`md:hidden`) برگشت به زیر هدر.
- `src/features/marketing/components/mobile-menu.tsx` — `HeaderSearch`
  از دراور حذف شد (دیگر در هدر همیشه در دسترس است)؛ «دسته‌بندی‌ها» در
  دراور همچنان لینک ساده به `/categories` است (باتم‌شیت جایگزینش نشده،
  مکمل آن است).

## 2026-10-15 — فیکس: دراور موبایل زیر backdrop-blur هدر جمع می‌شد

**علت:** `backdrop-filter` روی ظرف هدر Containing Block برای فرزند
`position: fixed` می‌سازد (دقیقاً همان دلیلی که `CategoryMegaMenu` را قبلاً
`createPortal` کرده بود)؛ در نتیجه `fixed inset-0` دراور به‌جای viewport،
نسبت به همان دیو ~۶۰px هدر محاسبه می‌شد و دراور جمع می‌شد.

**تغییریافته:**
- `src/features/marketing/components/mobile-menu.tsx` — `Drawer` با
  `createPortal(..., document.body)` رندر می‌شود.

## 2026-10-15 — سرچ و ناوبری ثانویه موبایل داخل منوی همبرگری

**افزوده:**
- `src/features/marketing/components/mobile-menu.tsx` — دکمه همبرگر
  (`sm:hidden`) + دراور کشویی از سمت start؛ داخلش `HeaderSearch`، لینک
  «دسته‌بندی‌ها»، آیتم‌های `PRIMARY_NAV`، «پیگیری سفارش» و «حساب کاربری».
  بسته‌شدن با Escape و با تغییر مسیر (`usePathname`).
- آیکون `home` در `icon-paths.tools.tsx` (برای تب‌بار پایین).

**تغییریافته:**
- `src/features/marketing/components/store-header.tsx` — ردیف جست‌وجوی
  مستقل زیر هدر و `PrimaryNav` (ردیف چیپ دسته‌بندی) روی موبایل حذف شدند؛
  `PrimaryNav` فقط از `sm` به بالا نمایش داده می‌شود، محتوای معادلش داخل
  `MobileMenu` است.

## 2026-10-15 — ریسپانسیو هیرو + هدر/ناوبری موبایل شبیه اپ

**افزوده:**
- `src/features/marketing/components/mobile-tab-bar.tsx` — تب‌بار پایین ثابت،
  فقط موبایل (`sm:hidden`)، ۵ آیتم (خانه/دسته‌بندی/دکمه سبد برجسته با
  badge تعداد/جست‌وجو/حساب من)، `usePathname` برای active state،
  `env(safe-area-inset-bottom)`. در بارل `features/marketing/index.ts` export شد.
- آیکون‌های `home` و `grid` در `src/components/atoms/icons/icon-paths.tools.tsx`.

**تغییریافته:**
- `src/app/(public)/layout.tsx` — `<MobileTabBar />` اضافه شد؛ `<main>`
  روی موبایل `pb-20` گرفت تا تب‌بار محتوا را نپوشاند.
- `src/features/marketing/components/store-header.tsx` — `AnnouncementBar` و
  `HeaderActions` فقط از `sm` به بالا نمایش داده می‌شوند (حذف شلوغی نوار بالا
  در موبایل)، پدینگ هدر روی موبایل جمع‌تر شد.
- `src/features/marketing/components/hero/hero-floating-card.tsx` — کارت‌های
  شناور دکوراتیو هیرو زیر `sm` با هم تداخل/هم‌پوشانی داشتند (فاصله لبه فقط
  ۰.۵rem)؛ با `hidden sm:flex` فقط از تبلت به بالا نمایش داده می‌شوند.

## 2026-10-15 — مگامنوی سه‌سطحی دسته‌بندی در هدر

**افزوده:**
- `src/features/marketing/hooks/use-category-menu.ts` — هوک کلاینت state
  باز/بسته + دو سطح hover (`l1`/`l2`) + بستن با Escape/کلیک بیرون.
- `src/features/marketing/components/category-mega-menu-column.tsx` — یک
  ستون flyout (هدر + دکمه بازگشت اختیاری، لیست آیتم با آیکون/تصویر، لینک
  «مشاهده همه»).
- `src/features/marketing/components/category-mega-menu.tsx` — دکمه trigger
  (`bg-accent-500`) + پنل کشویی ۳ ستونه (سطح۱ → فرزندان → نوه‌ها)، کلاینت لیف.
- `src/components/atoms/icons/icon-paths.tools.tsx` — آیکون `chevron` جدید
  (برای فلش بازگشت و نشانگر زیرمنو، با `rotate-180` در دو جهت استفاده می‌شود).

**تغییر:**
- `primary-nav.tsx` از Server Component معمولی به `async` تبدیل شد؛ درخت
  دسته‌بندی را با `getCategoryTree()` (مسیر مستقیم، نه بارل) می‌خواند و
  `CategoryMegaMenu` را به‌عنوان اولین آیتم ردیف ناوبری رندر می‌کند.
- `data/navigation.ts` — آیتم ایستای «دسته‌بندی‌ها» (لینک anchor مرده به
  `#categories`، چون هیچ عنصری آن id را نداشت) از `PRIMARY_NAV` حذف شد؛
  جایگزین آن مگامنوی تعاملی بالاست.

**State flow:** `PrimaryNav` (RSC) درخت را فچ می‌کند → `CategoryMegaMenu`
(کلاینت) مالک state باز/بسته و دو سطح فعال است → `CategoryMegaMenuColumn`ها
state را فقط از طریق props/callback می‌خوانند و تغییر می‌دهند، بدون state
داخلی خودشان.

**اصلاح (همان روز):**
- باز شدن با hover هم اضافه شد (قبلاً فقط کلیک)، با تاخیر ۱۵۰ms روی بسته
  شدن تا جابه‌جایی موس از دکمه به پنل آن را نبندد — در
  `use-category-menu.ts` (`openOnHover`/`closeOnHoverOut`).
- پنل با `createPortal` به `document.body` منتقل شد و با `position: fixed`
  + مختصات واقعی viewport (`use-panel-position.ts`) پوزیشن می‌گیرد؛ قبلاً
  به‌خاطر `overflow-x-auto` ردیف ناوبری و containing-block ناشی از
  `backdrop-filter` هدر، داخل خود هدر کلیپ/خراب می‌شد.
- سایز ستون‌ها بزرگ‌تر شد (`w-80`، تامبنیل ۴۸px، ردیف‌های پرپدینگ‌تر) تا با
  مرجع بصری کاربر مطابقت کند.
- `CategoryMegaMenuColumn` پراپ `headerNode` گرفت: در ستون سطح۲ یک چیپ
  تصویر/آیکون کوچک کنار عنوان هدر نشان می‌دهد (مطابق رفرنس کاربر). خطوط
  جداکننده نازک بین ردیف‌ها (`divide-y`) اضافه شد و شورون هر ردیف دیگر
  مشروط به `hasChildren` نیست — همیشه نمایش داده می‌شود چون هر ردیف خودش
  هم لینک به صفحه‌ی همان دسته است.

**باگ‌فیکس:** `onMouseEnter`/`onFocus` روی هر ردیف قبلاً فقط وقتی
`onHoverItem` را صدا می‌زد که `item.children.length > 0` بود؛ هاور روی
دسته‌ای بدون زیرشاخه هیچ کاری نمی‌کرد و ستون بعدی را روی انتخاب قبلی
«یخ‌زده» نگه می‌داشت. حالا هاور همیشه `onHoverItem` را صدا می‌زند؛ ستون
بعدی خودش بر اساس خالی/پر بودن `children` نمایش داده می‌شود یا نه (منطق
موجود در `category-mega-menu.tsx`). سایز تصویر/آیکون ردیف‌ها و چیپ هدر هم
کوچک‌تر شد (`size-9`/`size-8`).

**ریزاصلاح برای تطبیق دقیق با رفرنس:**
- `sizes="3۰0px"` (عدد فارسی تایپی، مقدار نامعتبر CSS) به `"36px"` درست شد.
- خطوط جداکننده بین ردیف‌ها (`divide-y`) حذف شد، به‌جایش `space-y-1` برای
  فاصله‌ی ظریف بدون خط — مطابق رفرنس که هیچ خط جداکننده‌ای ندارد.
- `rounded-xl` که از هایلایت هاور روی هر ردیف افتاده بود برگشت.

---

## 2026-10-09 — نماد اعتماد الکترونیکی در فوتر

**افزوده:**
- `src/config/site.ts` — `siteConfig.enamad = { id, code }` (id: `8041899`).
- `src/features/marketing/components/footer/footer-enamad-badge.tsx` — کامپوننت جدید؛
  لینک رسمی `trustseal.enamad.ir` + `next/image` با `unoptimized` (لوگوی داینامیک enamad
  باید دقیقاً همان‌طور که سرویس می‌دهد رندر شود، بدون پردازش Next).
- `store-footer.tsx` — بج زیر `FooterSocialLinks` در ستون برند اضافه شد.
- `next.config.mjs` — `images.remotePatterns` برای `trustseal.enamad.ir` اضافه شد.

---

## 2026-10-04 — متای enamad

**تغییر:**
- `src/app/layout.tsx:26` — خروجی `buildMetadata()` با `other: { enamad: '33398049' }`
  spread می‌شود تا Next تگ `<meta name="enamad" content="33398049">` را در `<head>`
  همه‌ی صفحات رندر کند. دستی داخل JSX اضافه نشد (قرارداد seo.md: متادیتا فقط از طریق
  Metadata API).

---

## 2026-09-26 — زیرساخت deploy پروداکشن (Docker + nginx هاست)

**افزوده:**
- `Dockerfile` — multi-stage (deps → builder → runner) روی `node:20-alpine`، pnpm با
  `--frozen-lockfile`. build args برای `NEXT_PUBLIC_*` (Next در build inline می‌کند) و
  `API_BASE_URL`/`SESSION_COOKIE_NAME`/`DOCUMENT_SIGNING_SECRET` (چون `config/env.ts`
  در prerender اعتبارسنجی می‌شود). runner فقط `.next/standalone` + `.next/static` +
  `public` را دارد، user غیر root (`nextjs:1001`)، `HOSTNAME=0.0.0.0`،
  `HEALTHCHECK` روی `/api/health`.
- `.dockerignore`
- `docker-compose.prod.yml` — تنها سرویس `web`، `restart: unless-stopped`،
  `env_file: .env.production`، `ports: ['127.0.0.1:3000:3000']` (loopback؛ ufw فقط
  22/80/443)، healthcheck و rotation لاگ.
- `deploy/env.production.example` — `API_BASE_URL=https://api.technorextools.com/api/v1`،
  `API_SERVICE_TOKEN` (هدر `X-Service-Token`، باید با بکند یکی باشد)، `NODE_ENV`, `PORT`.
- `deploy/deploy.sh` — الگوی abzar-api: git pull → build → up -d → poll
  `http://127.0.0.1:3000/api/health` تا `HEALTH_TIMEOUT` (پیش‌فرض 120s)، در صورت شکست
  لاگ می‌دهد و exit≠0؛ prune image. فلگ `--no-pull`.
- `deploy/setup-server.sh` — یک‌بارمصرف/idempotent: preflight DNS (مقایسه A record دو
  دامنه با IP سرور)، نصب certbot، نصب vhost، `certbot --nginx -d technorextools.com
  -d www.technorextools.com --redirect`. به ufw دست نمی‌زند.
- `deploy/nginx/abzar-storefront.conf` — vhost هاست (بیرون docker) برای
  `technorextools.com` + `www`، proxy به `127.0.0.1:3000`. هم‌شکل با vhost موجودِ
  `abzar-api`: بدون بلاک `upstream`، `proxy_set_header Connection ""`، لاگ اختصاصی،
  `client_max_body_size 55m`، timeout 120s. به‌علاوه cache روی `/_next/static/`،
  `location = /api/health` بدون access_log و مسیر acme-challenge. عمداً فقط پورت 80
  است تا certbot خودش بلاک 443 و ریدایرکت را تزریق کند.
- `deploy/README.md` — رویه‌ی نصب اول، آپدیت، چک‌ها، یادآوری CORS بکند. مسیر سرور:
  `/root/projects/storefront` کنار `/root/projects/api`، اجرا با root.

**تغییر:**
- `next.config.mjs` — `output: 'standalone'` (لازمه‌ی ایمیج runner سبک) و افزودن
  `api.technorextools.com` / `technorextools.com` / `www.technorextools.com` به
  `images.remotePatterns`.
- `.gitignore` — `.env.production`.

**بدون تغییر state/کامپوننت.**

---

## 2026-09-25 — کالای ناموجود در کارت محصول

- `catalog/components/add-to-cart-button.tsx`: prop جدید `disabled` — به‌جای دکمه، یک
  `span` مرده با متن/برچسب «ناموجود» رندر می‌شود (قبلاً کالای با موجودی صفر هم قابل افزودن
  به سبد بود).
- `catalog/components/product-card.tsx`: `outOfStock` از `firstVariant.stockQty <= 0`؛
  تصویر grayscale + بج «ناموجود» روی تصویر و `disabled` روی دکمه سبد.

---

## 2026-09-25 — `available` / `packagesInStock` مرجع خرید پکیج

- `bundles.schemas.ts`: `available: boolean` و `packagesInStock: number` اضافه شد.
- `utils/bundle.ts`: `bundleInStock` و `bundlePackagesInStock` حذف شدند (fallback محلی دیگر
  لازم نیست — حکم سرور مرجع است)؛ فقط `memberUnavailableLabel` برای برچسب هر عضو ماند.
- `bundle-add-button.tsx`: گیت دکمه = `bundle.available`.
- `bundle-band-panel.tsx`: زیر CTA، وقتی `packagesInStock <= 3` پیام «فقط N پکیج موجود است».
- `app/api/cart/discount/route.ts`: اگر خطای sync سبد `details.code` داشته باشد، همان
  `message` فارسی و `details` عیناً pass-through می‌شود (شرط روی `code`، نه متن)؛ در غیر این
  صورت پیام عمومی قبلی. `app/api/checkout/route.ts` از قبل `details` را برمی‌گرداند.

---

## 2026-09-25 — پولیش باند پکیج

- `bundle-band.tsx`: اعضا به‌صورت «کالا + کالا» با جداکننده‌ی آیکن `plus` چیده می‌شوند،
  محتوا عمودی وسط‌چین است (فضای خالی بزرگ زیر تایل‌ها حذف شد) و یک ردیف جمع‌بندی
  «قیمت جداگانه» خط‌خورده در پایین اضافه شد. ستون‌ها `1fr + 23rem` (پنل تیره سمت چپ).
- `bundle-member-card.tsx`: تایل عمودی با تصویر ۴:۳، بج `×تعداد` و بج قرمز «ناموجود/غیرفعال»
  روی تصویر، عنوان دوخطی و قیمت واحد.
- `bundle-band-panel.tsx`: قیمت خط‌خورده تکراری حذف و با برچسب «قیمت پکیج» جایگزین شد.
- `bundle-rail.tsx`: `pb-4` تا باند به تیکر آبی نچسبد.

---

## 2026-09-25 — شرط خرید پکیج بر اساس `isActive` اعضا

- `bundles.schemas.ts`: `items[].variant.isActive` و `items[].variant.product.isActive`
  (هر دو `default(true)`؛ فلگ محصول شرط soft-delete را هم در خود دارد).
- `utils/bundle.ts`: `bundleInStock` حالا علاوه بر موجودی، فعال‌بودن variant و محصول را هم
  چک می‌کند؛ **جدید** `bundlePackagesInStock` (تعداد پکیج کامل قابل تأمین) و
  `memberUnavailableLabel` (`غیرفعال` / `ناموجود` / `null`).
- `bundle-member-card.tsx`: برچسب دقیق‌تر به‌جای «ناموجود» ثابت.

---

## 2026-09-25 — بازطراحی بخش پکیج‌ها (باند تمام‌عرض)

گرید سه‌ستونه برای یک پکیج، یک کارت تنها و باریک با فضای خالی بزرگ می‌ساخت. جایگزین:

- **جدید** `bundles/bundle-band.tsx`: هر پکیج یک باند تمام‌عرض
  (`lg:grid-cols-[minmax(0,23rem)_1fr]`) — پنل تیره‌ی پیشنهاد + گرید اعضا.
- **جدید** `bundles/bundle-band-panel.tsx`: پنل `surface-ink texture-grid` با بج «پکیج ویژه»،
  درصد تخفیف، عنوان، قیمت خط‌خورده، قیمت پکیج و مبلغ سود + CTA.
- **جدید** `bundles/bundle-member-card.tsx`: تایل هر عضو (تصویر ۶۴px، عنوان، رنگ/تعداد، قیمت،
  برچسب ناموجود) و لینک به صفحه محصول.
- حذف: `bundle-card.tsx` و `bundle-item-row.tsx`.
- `bundle-rail.tsx`: هدر سکشن بازنویسی شد و باندها زیر هم می‌آیند (`flex flex-col gap-5`).
- `bundle-add-button.tsx`: حالت ناموجود و سایه برای زمینه‌ی تیره تنظیم شد.

---

## 2026-09-25 — فیلدهای جدید پکیج (imageUrl / compareAtTotal / savingAmount)

- `catalog/services/bundles.schemas.ts`: سه فیلد جدید با `default` اضافه شد.
- `catalog/utils/bundle.ts`: `bundleListPrice` و `bundleSavings` اول مقدار API را می‌خوانند و
  محاسبه از روی اعضا فقط fallback است؛ `bundleCoverImage` حالا `bundle.imageUrl` را ترجیح
  می‌دهد.
- `bundles/bundle-card.tsx`: کاور واقعی پکیج (۵۶px) جای آیکن مکعب را می‌گیرد و اگر تصویری
  نبود آیکن می‌ماند.

---

## 2026-09-25 — فروش پکیجی (bundles) در صفحه اصلی

- **جدید** `catalog/services/bundles.schemas.ts`: mirror شمای `GET /storefront/catalog/bundles`
  (+ `/:slug`) — `bundleSchema`, `bundleItemSchema`, `bundleListSchema`.
- `catalog/services/catalog.api.ts`: `listBundles()` و `getBundle(slug)` (unauth، ISR 5 دقیقه،
  تگ‌های `catalog:bundles` / `catalog:bundle:<slug>`).
- **جدید** `catalog/utils/bundle.ts`: `bundleListPrice`, `bundleSavings`,
  `bundleSavingsPercent`, `bundleInStock` (همه‌ی اعضا باید به اندازه‌ی `qty` موجود باشند),
  `bundleCoverImage`.
- **جدید** `catalog/components/bundles/`: `bundle-rail.tsx` (سکشن RSC، اگر پکیجی نباشد چیزی
  رندر نمی‌کند)، `bundle-card.tsx` (قیمت تکی خط‌خورده + قیمت پکیج + بج درصد و مبلغ سود)،
  `bundle-item-row.tsx` (هر عضو با لینک به صفحه محصول)، `bundle-add-button.tsx` (client leaf).
- سبد: `CartLine.kind` مقدار `'bundle'` گرفت؛ `cart/utils/sync-lines.ts` آن را به
  `{bundleId, qty}` نگاشت می‌کند؛ `cartSyncLineSchema` شاخه‌ی `bundleId` گرفت؛
  `cartApi.addBundle` → `POST /storefront/cart/bundles` و `syncCartToServer` آن را صدا می‌زند
  (پس checkout و اعتبارسنجی کد تخفیف هم پکیج را می‌فهمند).
- `app/(public)/page.tsx`: `<BundleRail />` بین `ProductShowcase` و `PromoTicker`.

State: پکیج یک خط سبد با `id` برابر `bundle.id` است؛ سرور آن را به اعضایش باز می‌کند.

---

## 2026-09-25 — نوار پیشرفت تغییر مسیر (route progress)

- **جدید** `components/molecules/route-progress.tsx` + `route-progress.module.css`:
  نوار ۲px بالای صفحه. App Router رویداد ناوبری ندارد، پس شروع از کلیک روی لینک
  same-origin (listener در فاز capture، با رد کردن کلیک میانی/مودیفایر/`target=_blank`/
  `download`/anchor و مسیر یکسان) و `popstate`؛ پایان وقتی `usePathname` مسیر جدید را گزارش
  می‌کند. تایم‌اوت ۱۲ ثانیه‌ای برای کلیکی که ناوبری نمی‌شود، `role="progressbar"` +
  `aria-busy`، و حالت `prefers-reduced-motion` بدون انیمیشن.
- `app/layout.tsx`: یک instance قبل از `AppProviders` mount شد. export از
  `components/molecules/index.ts`.

---

## 2026-09-25 — هایلایت صفحه فعال در نوار پیمایش فروشگاه

- **جدید** `marketing/components/primary-nav-link.tsx`: client leaf با `usePathname`؛
  `aria-current="page"` + استایل `bg-brand-50/ring` برای مسیر فعال. تطبیق: مساوی بودن مسیر یا
  شروع با `href + '/'`؛ لینک‌های anchor (`/#deals`) هیچ‌وقت فعال نمی‌شوند.
- `primary-nav.tsx`: همچنان RSC، فقط لینک‌ها به کامپوننت جدید واگذار شدند.

---

## 2026-09-25 — سخت‌ترکردن `/checkout/result`

صفحه از قبل وجود داشت (`app/(checkout)/checkout/result/page.tsx`)؛ دو حفره بسته شد:

- ترتیب عوض شد: اول `searchParams` پارس می‌شود، بعد session چک می‌شود؛ و `next` لاگین حالا
  `?orderNumber=` را هم حمل می‌کند (قبلاً بعد از لاگین شماره سفارش گم می‌شد و کاربر به لیست
  سفارش‌ها پرت می‌شد).
- وقتی `ordersApi.detail` شکست می‌خورد دیگر redirect بی‌صدا نمی‌کنیم؛ **جدید**
  `checkout/components/checkout-result-missing.tsx` با شماره سفارش + «پیگیری سفارش» +
  «سفارش‌های من» رندر می‌شود (هیچ ادعایی درباره وضعیت پرداخت نمی‌کند). export از
  `features/checkout/index.ts`.

---

## 2026-09-25 — تصویر و لینک کالا در اقلام سفارش

- **جدید** `lib/order-items.ts`: `ORDER_ITEM_KINDS` + `orderItemHref(kind, slug)` —
  `variant` → `routes.product`, `spare_part` → `routes.sparePart`, `bundle` → `null`
  (مسیر باندل در storefront وجود ندارد)، `slug` تهی → `null`.
- `account/services/orders.schemas.ts` و `order-tracking/services/order-tracking.schemas.ts`:
  فیلدهای `imageUrl`, `productSlug`, `kind` به هر آیتم اضافه شد (همه با `default` تا پاسخ‌های
  قدیمی نشکنند).
- `account/components/order-detail-items.tsx`: آیکن جعبه جای خود را به `MediaPlaceholder` با
  تصویر واقعی داد؛ عنوان وقتی `href` دارد لینک می‌شود.
- `order-tracking/components/tracked-items.tsx`: همان ساختار (تصویر + لینک + تعداد).
- `.claude/docs/api-contract.md`: سه فیلد جدید مستند شد.

---

## 2026-09-25 — نمایش تصویر کالا در مرحله بازبینی checkout

- `checkout/components/review-item-row.tsx`: `MediaPlaceholder` با `label="عکس"` ثابت و بدون
  `src` رندر می‌شد؛ حالا `src={line.imageUrl}` و `label={line.title}` (alt درست) با
  `sizes="52px"` و بردر می‌گیرد. `imageUrl` از قبل در `CartLine` بود.

---

## 2026-09-25 — پیام خطای کد تخفیف وقتی sync سبد شکست می‌خورد

- `app/api/cart/discount/route.ts`: `syncCartToServer` از `validateDiscount` جدا شد. خطای sync
  دیگر پیام upstream («محصول مورد نظر یافت نشد») را زیر فیلد کوپن نشان نمی‌دهد؛ `404` → `409` با
  «یکی از کالاهای سبد روی سرور در دسترس نیست…» و بقیه → پیام عمومی. علت ریشه‌ای در سمت داده است:
  خط سبدی که `variantId` آن واقعاً variant نیست (محصول بدون variant) روی
  `POST /storefront/cart/items` ۴۰۴ می‌گیرد.

---

## 2026-09-25 — مینی‌کارت سراسری (کلیک روی سبد خرید هدر)

- `store/ui-store.ts`: `miniCartOpen` + `setMiniCartOpen` (persist نمی‌شود — `partialize`
  فقط `theme`/`sidebarOpen`).
- انتقال `mini-cart-drawer.tsx` و `mini-cart-line.tsx` از
  `features/catalog/.../buy-box/` به `components/organisms/` (مصرف‌کننده‌اش دو feature شد:
  marketing و catalog) و export از `components/organisms/index.ts`.
- `mini-cart-drawer.tsx`: بدون prop؛ state را از `useUiStore` می‌خواند. یک instance در
  `app/(public)/layout.tsx` mount می‌شود.
- `marketing/components/cart-button.tsx`: از `Link href={routes.cart}` به `button` تبدیل شد که
  دراور را باز می‌کند (`data-cart-target` برای انیمیشن fly-to-cart حفظ شد)؛ رفتن به `/cart` از
  دکمه‌ی داخل دراور انجام می‌شود.
- `buy-box/use-add-to-cart.ts`: `drawerOpen`/`closeDrawer` حذف شد، بعد از افزودن
  `setMiniCartOpen(true)` صدا می‌شود؛ `product-buy-box.tsx` دیگر دراور را رندر نمی‌کند.

---

## 2026-09-25 — بازطراحی مینی‌کارت (دراور افزودن به سبد)

- `buy-box/mini-cart-drawer.tsx`: هدر با آیکن موفقیت + «به سبد خرید اضافه شد» و تعداد کل
  (`selectCartQuantity`)، بدنه با کارت‌های تصویردار، فوتر: جمع کل + یادداشت هزینه ارسال +
  CTA اصلی «مشاهده سبد و پرداخت» + «ادامه خرید»، حالت خالی، بک‌دراپ `bg-ink/45` با blur.
- **جدید** `buy-box/mini-cart-line.tsx`: ردیف read-only سبد (تصویر ۶۴px، عنوان، variant،
  تعداد، مبلغ ردیف) — ویرایش فقط در صفحه سبد.

---

## 2026-09-25 — فیکس: مینی‌کارت زیر هدر سایت می‌رفت

- `catalog/components/product-detail/buy-box/mini-cart-drawer.tsx`: با `createPortal` به
  `document.body` منتقل شد. علت باگ: `ProductBuyBox` کلاس `lg:sticky` دارد و `position: sticky`
  یک stacking context می‌سازد، پس `z-[60]` دراور هیچ‌وقت از `z-50` هدر سایت بالاتر نمی‌رفت و
  هدر + ردیف‌های سبد پشت هدر sticky پنهان می‌شدند. همراهش scroll-lock روی `body` هنگام باز بودن
  و گارد `mounted` برای SSR.

---

## 2026-09-25 — کارت قطعه در نمای انفجاری همیشه فعال

- `catalog/components/product-detail/exploded/part-info-card.tsx`: به‌جای `return <></>` وقتی
  قطعه‌ای فعال نیست، کارت با همان `min-h-16` و حالت dashed رندر می‌شود و راهنمای «موس را روی
  شماره‌ها ببرید» نشان می‌دهد — hover روی هاتاسپات دیگر لِی‌اوت را جابه‌جا نمی‌کند و
  `aria-live` همیشه mount است. State بدون تغییر: `hovered ?? pinned` در `ExplodedView`.

---

## 2026-09-25 — تأیید/رد هزینه تخمینی تعمیر توسط مشتری

- `features/repairs/types/index.ts`: `repairStatusEntrySchema.by` (`admin|customer|system`،
  default `admin` برای ردیف‌های قدیمی) + `repairDecisionSchema` (`decision`, `note ≤500`).
  هر دو از `features/repairs/index.ts` export شدند.
- `features/account/services/repairs.api.ts`: `repairsApi.decision(id, body)` →
  `POST /storefront/repairs/:id/decision`، پاسخ با `repairRequestSchema` پارس می‌شود.
- **جدید** `app/api/account/repairs/[id]/decision/route.ts`: BFF، `getSession` → 401،
  `safeParse` بدنه → 400 + `fieldErrors`، `404` → «درخواست تعمیر یافت نشد»، `409` → همان
  `message` فارسی upstream، بقیه → 502.
- **جدید** `features/account/hooks/use-repair-decision.ts`: mutation + `router.refresh()` در
  `onSuccess` (صفحه RSC است، state محلی نگه نمی‌داریم)، `UnauthorizedError` روی 401.
- **جدید** `features/account/components/repair-decision.tsx`: فقط وقتی
  `status === 'awaiting_customer' && estimatedCost !== null` رندر می‌شود؛ textarea اختیاری،
  دو دکمه تأیید/انصراف، disable بعد از کلیک، نمایش خطای سرور با `role="alert"`.
- `repair-detail-view.tsx`: `RepairDecision` بعد از `RepairVerdict`.
- `repair-status-timeline.tsx`: بج «ثبت‌شده توسط شما» برای `entry.by === 'customer'`.
- `data/repairs.ts`: hint وضعیت `awaiting_customer` دیگر به تماس تلفنی ارجاع نمی‌دهد.
- `.claude/docs/api-contract.md`: endpoint جدید + فیلد `by` مستند شد.

---

## 2026-09-25 — بازطراحی هدر داشبورد + صفحه نوتیفیکیشن‌ها

- `features/account/components/account-topbar.tsx`: هدر هم‌تراز با کانتینر شل (`max-w-[1440px]`)،
  ارتفاع ثابت ۶۴px، لینک «بازگشت به فروشگاه»، بج شمارنده روی زنگوله (`+۹` برای >۹) با `aria-label`
  توصیفی، چیپ کاربر با بردر.
- `account-sidebar.tsx`: `sticky top-[72px]` هماهنگ با ارتفاع هدر جدید.
- `notifications-view.tsx`: تب فیلتر همه/خوانده‌نشده (state محلی `filter`)، اکشن «خواندن همه»
  داخل `PageHeading.action`، حالت‌های loading/error/empty.
- **جدید** `notifications-list.tsx`: `NotificationsList` (گروه‌بندی روزانه، کارت با divider) +
  `NotificationsEmpty` (پیام متفاوت برای حالت فیلترشده).
- **جدید** `utils/notifications.ts`: `groupNotificationsByDay` — امروز/دیروز/تاریخ فارسی،
  ترتیب newest-first API حفظ می‌شود.
- `notification-row.tsx`: ردیف لیستی به‌جای کارت مجزا، نوار برند برای خوانده‌نشده، نقطه unread،
  chevron روی hover وقتی `link` داخلی دارد، زمان در موبایل زیر متن.

State: لیست از `useNotifications` (React Query، کش مشترک با شمارنده هدر)؛ فیلتر فقط client-side.

---

## 2026-09-25 — رفع خالی‌بودن لیست تعمیرها (enum عقب‌مانده)

علت: `RepairStatus` در API به هشت مقدار رسیده بود (`reviewing`, `awaiting_customer`,
`awaiting_parts`, `delivered`, `canceled` اضافه شده) و فیلد `statusLabel` هم روی خود درخواست
می‌آید. `z.enum(REPAIR_STATUSES)` پاسخ را رد می‌کرد → `ApiError 502` → `.catch(() => null)` در
صفحه → لیست خالی بدون هیچ خطایی.

- `features/repairs/types`: `REPAIR_STATUSES` به هر هشت مقدار به‌ترتیب پایپ‌لاین به‌روز شد و
  `statusLabel: z.string()` به `repairRequestSchema` اضافه شد.
- `features/account/data/repairs.ts`: `REPAIR_STATUS_META` فقط آیکن/رنگ نگه می‌دارد (لیبل همیشه
  از API)؛ `REPAIR_STATUS_HINT` برای هر هشت وضعیت.
- `repair-status-badge.tsx` (جدید): جایگزین استفاده از `OrderStatusBadge` در کارت و صفحه جزئیات؛
  `label` را از `statusLabel` سرور می‌گیرد.
- صفحه‌های `dashboard/repairs` و `dashboard/repairs/[id]`: خطای گرفته‌شده حالا
  `console.error` می‌شود تا این دسته از mismatchها دوباره بی‌صدا به «موردی نیست» تبدیل نشود.

## 2026-09-25 — هم‌سو شدن با فیلدهای جدید تعمیر و اعلان‌ها

- `features/repairs/types`: `repairStatusEntrySchema` (`status`, `statusLabel`, `at`,
  `note|null`) + فیلدهای `statusHistory`، `technicianNote`، `estimatedCost` روی
  `repairRequestSchema` (همه `.default()` دار برای مقاومت در برابر عقب‌ماندن API).
- `repair-progress.tsx` **حذف شد** (پیشرفت از ایندکس enum حدس زده می‌شد). جایش
  `repair-status-timeline.tsx` تایم‌لاین واقعی `statusHistory` را با `statusLabel` سرور رندر
  می‌کند؛ `repair-verdict.tsx` نظر کارشناس و هزینه تخمینی را نشان می‌دهد (تا وقتی هر دو `null`
  باشند چیزی رندر نمی‌شود).
- `notifications.schemas.ts`: نوع `repair_status` به enum اضافه شد + فیلد `link`
  (`nullable().default(null)`). `notification-type-meta.ts` آیکن `wrench` گرفت.
- `notification-row.tsx`: کلیک روی اعلان علاوه بر mark-as-read به `link` هم navigate می‌کند؛
  فقط مسیرهای داخلی (`/…` و نه `//…`) پذیرفته می‌شوند تا open redirect نشود.
- `.claude/docs/api-contract.md` با شکل جدید `notifications` و `repairs` به‌روز شد.

## 2026-09-25 — صفحه پیگیری درخواست‌های تعمیر در پنل کاربر

**صفحه‌ها**
- `app/(dashboard)/dashboard/repairs/page.tsx` — لیست درخواست‌های تعمیر کاربر (`repairsApi.list`,
  `take: 50`) → `<RepairsView>`.
- `app/(dashboard)/dashboard/repairs/[id]/page.tsx` — جزئیات یک درخواست (`repairsApi.detail`)،
  `notFound()` روی خطا → `<RepairDetailView>`.
- هر دو `noindex` با `buildMetadata()`.

**سرویس (server-only)**
- `features/account/services/repairs.schemas.ts`: `repairListSchema` (`{items,total,skip,take}`)
  بر پایه `repairRequestSchema` از `features/repairs`.
- `features/account/services/repairs.api.ts`: `repairsApi.list` / `repairsApi.detail` روی
  `GET /storefront/repairs` و `GET /storefront/repairs/:id` با `revalidate: 0`.

**کامپوننت‌ها** (همه RSC — هیچ state کلاینتی لازم نیست)
- `repairs-view.tsx` → `repair-card.tsx` (بج وضعیت + خلاصه مشکل + لینک به جزئیات)
- `repair-detail-view.tsx` → `repair-progress.tsx` (سه مرحله ثابت از `REPAIR_STATUSES`؛ API تاریخچه
  ندارد، پیشرفت از ایندکس وضعیت فعلی مشتق می‌شود) + `repair-attachments.tsx` + بازاستفاده از
  `OrderStatusBadge`.
- `features/account/data/repairs.ts`: `REPAIR_STATUS_META` و `REPAIR_STATUS_HINT` برای
  `received | in_progress | done`.

**اتصال‌ها**
- `config/routes.ts`: `dashboard.repairs` + `dashboard.repairDetail(id)`.
- `features/account/data/nav.ts`: آیتم «درخواست‌های تعمیر» (آیکن `wrench`).
- `features/repairs/index.ts`: اکسپورت `repairRequestSchema` و تایپ `RepairAttachment`.
- `repair-sent.tsx`: دکمه‌ی تایید حالا به `/dashboard/repairs` می‌رود، نه ریشه داشبورد.

---

## 2026-09-25 — هم‌ترازی هات‌اسپات‌های نمای انفجاری

- `exploded/use-contain-rect.ts` (جدید): هندسه‌ی تصویر `object-contain` داخل باکس با
  `ResizeObserver`.
- `exploded/exploded-stage.tsx` (جدید): جایگزین `PhotoStage` در نمای انفجاری؛ overlay دقیقاً روی
  مستطیل تصویر قرار می‌گیرد تا درصدهای ذخیره‌شده در پنل ادمین دقیقاً همان‌جا بیفتند (قبلاً
  نسبت به کل کانتینر + `p-[7%]` محاسبه می‌شد و جابه‌جا بود).
- `exploded/part-hotspots.tsx`: `pointer-events-auto` روی مارکرها (overlay والد
  `pointer-events-none` است).

## 2026-09-24 — پراکسی مدل سه‌بعدی (رفع CORS)

- `src/app/api/models/route.ts` (جدید): `GET /api/models?src=<url>` فایل GLB را از باکت رسانه
  استریم می‌کند. باکت آروان هدر `Access-Control-Allow-Origin` نمی‌دهد و `GLTFLoader` با fetch
  cross-origin بلاک می‌شد؛ پراکسی same-origin مشکل را حل می‌کند. `src` با Zod اعتبارسنجی می‌شود
  (فقط `https` + هاست‌های `.arvanstorage.ir` / `.abzar.example`) تا open proxy نشود.
- `features/catalog/utils/pdp-extras.ts:22`: `glbUrl` حالا `/api/models?src=…` است.

## 2026-09-24 — حذف کامل داده‌های ماک: PDP، پیگیری سفارش، تماس، خبرنامه

**PDP — همه‌چیز از `abzar/api`**
- `features/catalog/data/pdp-mock.ts` **حذف شد**. `documents`، `highlights`، `model3dHotspots` و
  `questions` حالا فیلدهای `productDetailSchema` هستند (`.default([])` برای مقاومت در برابر
  عقب‌ماندن API).
- `services/pdp.schemas.ts` بازنویسی شد و مالک primitiveهای PDP شد (`productDocumentSchema`,
  `hotspotSchema`, `highlightSchema`, `questionSchema`, `productPartSchema`). جهت وابستگی برعکس
  شد: `catalog.schemas.ts` → `pdp.schemas.ts` (قبلاً برعکس بود؛ حلقه ایجاد می‌شد).
- `services/comments.schemas.ts` (جدید): سه اسکیمای کامنت از `catalog.schemas.ts` جدا شد تا
  سقف ۱۵۰ خط نشکند. importerها: `catalog.api.ts`, `types/index.ts`, `hooks/use-review-form.ts`,
  `app/api/catalog/products/[slug]/comments/route.ts`.
- `utils/pdp-extras.ts`: `buildExtras` دیگر ماک overlay نمی‌کند — `model3d` از `model3dUrl` +
  `model3dHotspots` ساخته می‌شود، poster از تصویر اصلی محصول.
- `utils/pdp-icon.ts` (جدید): `toPdpIcon(key)` کلید متنی آزاد API را به نام `Icon` نگاشت می‌کند،
  fallback = `gear`. `highlightSchema.icon` از enum به `z.string()` تغییر کرد.
- `buy-box/key-specs.tsx`: تعداد ستون‌ها داینامیک (۱/۲/۳)، با آرایه‌ی خالی رندر نمی‌شود.
- `withDownloadHrefs(documents, slug)` حالا `?product=<slug>` می‌سازد؛
  `app/api/documents/[id]/route.ts` سند را با `getProduct(slug)` از API پیدا می‌کند و فقط روی
  URL برگشتی از API ریدایرکت امضاشده می‌دهد (جلوگیری از open redirect).

**پرسش و پاسخ محصول (جدید)**
- `catalog.api.ts`: `getProductQuestions(slug)` → `GET /storefront/catalog/products/:slug/questions`،
  tag: `catalog:questions:<slug>`.
- `app/api/catalog/products/[slug]/questions/route.ts` (جدید): POST با `getSession()` گارد،
  `safeParse`، revalidate دو tag، نگاشت ۴۰۱/۴۲۹/۴۰۰.
- `hooks/use-question-form.ts` + `components/product-detail/sections/question-form.tsx` (جدید) —
  الگوی `use-review-form`/`review-form`؛ ۴۰۱ → `UnauthorizedError` → مودال ورود.
- `qa-section.tsx`: empty-state واقعی + فرم + تاریخ پاسخ (`answeredAt`).

**پیگیری سفارش — واقعی شد**
- `features/order-tracking/data/orders.ts` (`DEMO_ORDERS`) **حذف شد**.
- `services/order-tracking.schemas.ts` (جدید): `trackedOrderSchema` — `orderNumber`,
  `statusLabel`, `carrier|null`, `trackingNumber|null`, `total`, `placedAt`, `timeline[]`,
  `items[{productTitle, sku, qty, lineTotal}]`.
- `app/api/orders/track/route.ts` (جدید): POST بدون auth → `/storefront/orders/track`؛
  ۴۰۴/۴۰۰ → یک پیام واحد (عمداً «موبایل اشتباه» لو نمی‌رود)، ۴۲۹ → پیام محدودیت نرخ،
  `Cache-Control: private, no-store`.
- `use-order-tracking.ts`: از `useMutation` + fetch؛ `pending` اضافه شد و تا
  `TrackingHero` → `TrackingForm` (اسپینر + disable) پاس می‌شود.
- `tracking-timeline.tsx`: `done` از `step.date !== null` می‌آید — `STATUS_ORDER` و prop `current`
  حذف شدند (کلیدهای دلخواه API پشتیبانی می‌شود).
- `shipping-info.tsx`: ردیف‌های خالی حذف می‌شوند؛ پیشوند ثابت `IR` روی کد رهگیری برداشته شد.
- `tracked-items.tsx`: روی `productTitle/qty/lineTotal` واقعی. `tracking-hero.tsx`: متن دمو حذف شد.
- `types/index.ts`: regex `^PA-\d{6}$` به الگوی عمومی کد سفارش باز شد؛ `TrackingStatus` حذف.

**تماس و خبرنامه**
- `app/api/contact/route.ts`: `console.warn` جای خود را به `apiClient.post('/storefront/contact')`
  داد → `201 {id}`؛ ۴۲۹ پیام اختصاصی. `use-contact-form.ts` پیام خطای سرور را نمایش می‌دهد.
- `newsletter.actions.ts`: `POST /storefront/newsletter` → `{created}`؛ `NewsletterState` حالا
  `{created: boolean}` حمل می‌کند و `newsletter-cta.tsx` پیام «قبلاً عضو بودید» را از آن می‌سازد.

**باقی‌مانده‌ی استاتیک (عمدی):** محتوای مارکتینگ (`marketing/data/*`, `contact/data/contact.ts`) —
API ندارد. `account/data/orders.ts` و `catalog/data/presentation.ts` فقط metadata نمایشی enum‌اند.

---

## 2026-09-24 — ریدیزاین بخش برندهای همکار (خانه)

- `features/catalog/components/brand-strip.tsx` حذف و به پوشه‌ی
  `components/brand-strip/` منتقل شد: `brand-strip.tsx` (RSC) + `brand-tile.tsx` +
  `brand-strip.module.css`.
- `brand-strip.tsx`: بند کامل با `SectionHeading` (eyebrow `Partners`، وسط‌چین)، زیرعنوان داینامیک
  بر اساس تعداد برند و تعداد نمایندگی‌های رسمی، و CTA «مشاهده محصولات همه برندها» → `routes.products`.
- چیدمان تطبیقی: کمتر از ۷ برند → گرید wrap وسط‌چین با `Reveal` (مشکل فضای خالی مارکی با ۲ برند حل شد)؛
  ۷ به بالا → `Marquee` با ماسک محوشدگی لبه‌ها.
- `brand-tile.tsx`: کارت لینک‌دار به `/products?brand=<slug>`، لوگوی `next/image` با
  `width/height` (fallback: وردمارک متنی)، افکت grayscale→رنگی و shine در hover، بج امبر
  «نمایندگی رسمی» برای `isExclusiveDistributor` (فیلدی که قبلاً از API می‌آمد و رندر نمی‌شد).
- `brand-strip.module.css`: ماسک fade لبه‌ی مارکی + پس‌زمینه‌ی گرید بلوپرینت با هاله‌ی برند.
- `app/(public)/page.tsx`: مسیر import به‌روز شد.

---

## 2026-09-24 — ریدیزاین لیوت داشبورد کاربر

- `components/overview-hero.tsx` (جدید): بنر گرادیان برند با سلام، سطح عضویت و progress bar
  (از `buildMembership(tier)` که تا حالا fetch می‌شد ولی رندر نمی‌شد).
- `components/quick-actions-card.tsx` (جدید): ریل دسترسی سریع (سفارش‌ها، آدرس‌ها، علاقه‌مندی‌ها، ادامه خرید).
- `overview-view.tsx`: چیدمان جدید — hero → ۴ استت‌کارت → گرید `xl:[1.7fr_1fr]` (نمودار + دسترسی سریع)
  → سفارش‌های اخیر. `PageHeading` از این صفحه حذف شد (hero جایش را گرفت).
- `stat-card.tsx`: لیبل بالا / عدد بزرگ پایین، هاله رنگی محو، آیکن ۴۰px.
- `purchase-trend-card.tsx`: گریدلاین، هایلایت ماه اوج، ارتفاع حداقل برای ماه‌های صفر،
  تولتیپ عدد فارسی، و empty state وقتی هیچ خریدی نیست.
- `recent-orders.tsx`: کارت‌بندی‌شده با `ul/li`، ردیف‌های فشرده‌تر و empty state با CTA خرید.
- `account-shell.tsx` / `account-sidebar.tsx` / `account-mobile-nav.tsx`: کانتینر `max-w-[1440px]`،
  سایدبار به کارت شناور sticky با هدر گرادیانی تبدیل شد، پدینگ‌ها یکدست شد.

## 2026-09-24 — آپلود عکس/فایل در فرم درخواست تعمیر

- **فیچر جدید `features/media/`** (سطح عمومی، قابل استفاده برای تیکت‌ها هم):
  - `types/index.ts`: `mediaViewSchema`، `ACCEPTED_UPLOAD_TYPES` (JPEG/PNG/WebP/PDF)،
    `MAX_UPLOAD_BYTES` (۱۰MB)، `UPLOAD_ACCEPT_ATTR`، تایپ `Attachment`.
  - `hooks/use-attachments.ts`: مالک state فایل‌های انتخاب‌شده — اعتبارسنجی نوع/حجم سمت کلاینت،
    آپلود موازی هر فایل به `/api/media/upload`، وضعیت `uploading|done|error` برای هر آیتم،
    `revokeObjectURL` روی remove و unmount، خروجی `mediaIds`/`uploading`/`reset`.
  - `components/attachment-picker.tsx`: drag & drop + دکمه‌ی انتخاب فایل (طبق WCAG 2.2 درگ تنها
    راه نیست) + پیام خطای rejection.
  - `components/attachment-tile.tsx`: پیش‌نمایش تصویر (object URL به‌صورت `backgroundImage` چون
    مقدار runtime است)، آیکن `doc` برای PDF، اسپینر حین آپلود، دکمه‌ی حذف ۴۴px.
  - `index.ts`: بارل کلاینت‌سِیف.
- **`app/api/media/upload/route.ts` (جدید)**: BFF برای `POST /storefront/media/upload` —
  نیازمند session، `multipart/form-data` با فیلد `file`، اعتبارسنجی نوع و حجم قبل از forward،
  پاسخ `MediaView`.
- **`lib/api-client.ts`**: `apiClient.postForm(...)` اضافه شد — `FormData` را بدون
  `Content-Type: application/json` فوروارد می‌کند (boundary حفظ می‌شود).
- **`features/repairs/`**: `MAX_REPAIR_ATTACHMENTS = 5` و `repairAttachmentSchema` +
  `attachments[]` در `repairRequestSchema`؛ `use-repair-form.ts` حالا `useAttachments` را مالک است
  و `mediaIds` را در payload می‌فرستد و تا پایان آپلود submit را می‌بندد؛ `repair-form.tsx`
  `<AttachmentPicker>` را زیر «شرح مشکل» رندر می‌کند.
- **`app/api/repairs/route.ts`**: `mediaIds: string[] (≤5)` به Zod payload اضافه شد.

State flow: `RepairForm` → `useRepairForm` → `useAttachments` (مالک لیست فایل‌ها) →
`AttachmentPicker` (presentational) → `AttachmentTile`.

---

## 2026-09-24 — فرم ثبت دیدگاه روی PDP

- `src/app/api/catalog/products/[slug]/comments/route.ts` (جدید): BFF برای
  `POST /storefront/catalog/products/{slug}/comments`. session اجباری (۴۰۱)، `safeParse` روی body با
  `createCommentSchema`، نگاشت خطا: ۴۰۹ «قبلاً دیدگاه ثبت کرده‌اید»، ۴۰۰/۴۰۴ ورودی نامعتبر، بقیه ۵۰۲.
  در موفقیت `revalidateTag('catalog:comments:<slug>')`.
- `catalog/services/catalog.schemas.ts`: `createCommentSchema` (rating 1..5، body ۱۰..۱۰۰۰) و
  `createCommentResultSchema` (`{ status }`). تایپ `CreateCommentInput` در `catalog/types/index.ts`.
- `catalog/hooks/use-review-form.ts` (جدید): state فرم + `useMutation`؛ روی ۴۰۱
  `UnauthorizedError` پرتاب می‌شود تا `QueryProvider` مودال ورود را باز کند (بدون ریدایرکت).
- `product-detail/reviews/rating-input.tsx` (جدید): ۵ رادیوی نیتیو با اسکین ستاره (کیبورد/SR سازگار)
  + لیبل زنده‌ی متنی.
- `product-detail/reviews/review-form.tsx` (جدید): عنوان، امتیاز، textarea با شمارنده و خطای inline،
  دکمه با Spinner، و حالت موفقیت «در انتظار تأیید».
- `reviews-section.tsx`: prop از `productPath` به `slug` تغییر کرد؛ CTA لینک‌به‌ورود حذف و
  `<ReviewForm slug>` همیشه پایین لیست/خالی رندر می‌شود. `product-detail-view.tsx` call site به‌روز شد.

---

## 2026-09-24 — جستجوی قطعات یدکی بدون ریلود صفحه

- `features/spare-parts/components/spare-parts-search-form.tsx`: از Server Component به
  `'use client'` تبدیل شد. `<form action={routes.spareParts}>` برای حالت بدون JS و SEO باقی ماند،
  ولی `onSubmit` با `preventDefault` + `router.replace(href, { scroll: false })` داخل
  `useTransition` ناوبری نرم انجام می‌دهد — دیگر full reload رخ نمی‌دهد.
- دکمه‌ی جستجو در حین transition `aria-busy` می‌گیرد و `Spinner` (اتم موجود) نشان می‌دهد.
- `features/marketing/components/header-search.tsx`: همان الگو برای سرچ هدر (`/search?q=`) —
  `'use client'` + `router.push` داخل `useTransition`، آیکن سرچ در حالت pending با `Spinner` عوض می‌شود.
- بقیه‌ی صفحه (`(public)/spare-parts/page.tsx`، `SparePartsToolbar`) بدون تغییر — چیپ‌ها از قبل
  `Link` بودند.
- تأیید عملی با Chrome headless (CDP): بعد از submit، مقدار `window.__marker` باقی می‌ماند و
  `performance.getEntriesByType('navigation').length === 1` → ناوبری نرم، بدون reload.

---

## 2026-09-24 — داینامیک شدن توضیحات و مشخصات فنی PDP

- `utils/description-html.ts` (جدید، server-only): `toDescriptionHtml()` — توضیح محصول از `abzar/api`
  اگر HTML بود sanitize می‌شود، اگر متن ساده بود به پاراگراف تبدیل می‌شود؛ خروجی `null` وقتی خالی است.
- `sections/description-section.tsx`: prop از `text` به `html` تغییر کرد و با
  `dangerouslySetInnerHTML` روی HTML پاک‌شده رندر می‌شود (دیگر تگ‌ها به‌صورت متن دیده نمی‌شوند).
  استایل prose در `description-section.module.css`.
- `utils/pdp-extras.ts`: `mergeSpecs` حذف و `buildSpecs(product)` جایگزین شد — فقط
  `attributeValues` واقعی API، بدون ردیف‌های mock.
- `data/pdp-mock.ts` + `services/pdp.schemas.ts` + `types/pdp.ts`: فیلدهای `specs` و `keyFeatures`
  (و `keyFeatureSchema`/`KeyFeature`) حذف شدند.
- `product-detail-view.tsx`: prop جدید `descriptionHtml`؛ تب و سکشن «توضیحات» و «مشخصات فنی»
  فقط وقتی داده دارند رندر/لیست می‌شوند.
- `products/[slug]/page.tsx`: `buildSpecs` + `toDescriptionHtml` صدا زده و به ویو پاس می‌دهد.

## 2026-09-24 — حذف بلوک ویژگی‌های کلیدی از PDP

- حذف `src/features/catalog/components/product-detail/sections/key-features.tsx`.
- `product-detail-view.tsx`: رندر `<KeyFeatures />` و import آن از بخش «توضیحات و کاربرد» برداشته شد؛ این بخش حالا فقط `DescriptionSection` دارد.
- `keyFeatures` در `pdp.schemas.ts` و `pdp-mock.ts` دست‌نخورده ماند (قرارداد API بدون تغییر).

## 2026-09-24 — Content: `/contact` page depth (shortcuts, location, FAQ)

- `data/contact.ts`: `CONTACT_CHANNELS` gains a `note` line per card and swaps the duplicated «ساعات پاسخگویی» card for WhatsApp; `WORK_HOURS` gains the Friday/holiday row; new `CONTACT_SHORTCUTS` (repair request / spare parts / order tracking), `CONTACT_FAQ` (4 Q&As) and `MAP_LINKS` (Neshan + Google Maps search built from `siteConfig.address`).
- `contact-hero.tsx`: concrete response-time copy + two direct actions (tel: and WhatsApp).
- New `contact-location-card.tsx`: ink card with address, visit notes and routing links — replaces the grey `MediaPlaceholder` map stand-in.
- New `contact-shortcuts.tsx`: self-serve deflection list rendered inside `ContactInfoPanel`.
- New `contact-faq.tsx`: `<details>` accordion (same pattern as `about-page/faq-section.tsx`); page emits `faqSchema(CONTACT_FAQ)` alongside `localBusinessSchema` + breadcrumb.
- `contact-info-panel.tsx`: location card + hours + shortcuts + a `tel:` consultation prompt (was a static box).
- Barrel exports `ContactFaq` + `CONTACT_FAQ` (data only, no server module).
- State flow: unchanged — only `ContactForm` is a client leaf posting to `/api/contact`.

---

## 2026-09-20 — Redesign: `/products` catalog (hero, toolbar, filters, card)

- `catalog-hero.tsx`: light header → ink band (`surface-ink` + `texture-grid`) matching the spare-parts hero; single column with breadcrumb/eyebrow/h1/trust row, then a full-width 3-cell stats `<dl>` strip (hairline via `gap-px` on a `bg-white/10` grid).
- `catalog-filters.tsx`: deal label shortened to «فقط شگفت‌انگیزها» (was wrapping in the 260px rail), `sale`-tinted checked state; brand options render `uppercase` via the new `FilterRadioList` `itemClassName` prop.
- New `catalog-toolbar.tsx` (RSC): result count + «نمایش X تا Y» range + `CatalogSort` + `ActiveFilterChips`. Replaces `CatalogSort` as the bar in `catalog-view.tsx`; `CatalogSort` is now the select only and no longer takes `total`.
- New `active-filter-chips.tsx` (client): removable chips per active filter (category/brand/deal/min/max) + «پاک‌کردن همه», driven by `useCatalogParams`.
- `catalog-filters.tsx`: added active-filter count badge and a mobile collapse (`useState` + `hidden lg:flex`), so the sidebar no longer pushes the grid off-screen on phones; deal checkbox gets `has-checked:` styling.
- `product-card.tsx`: deal badge moved to top-start, brand becomes a chip, stock line from `firstVariant.stockQty` (موجود / تنها N عدد / ناموجود), price row separated by a hairline, `h-full` for equal card heights.
- `product-grid.tsx`: empty state now renders `CatalogEmptyState` (optional `body` override) instead of a one-line `<p>`; reveal stagger capped at 7 steps; `Reveal` wrapper is `h-full`.
- `catalog-empty-state.tsx`: icon per variant + CTAs to `routes.products` / new `routes.categories`.
- `config/routes.ts`: added `categories: '/categories'`.
- State flow: unchanged — filters/sort/page live in the URL via `useCatalogParams`; `CatalogView` re-fetches server-side.

---

## 2026-09-20 — Redesign: `/spare-parts` listing (hero, toolbar, card, empty state)

- New `features/spare-parts/components/`: `spare-parts-hero.tsx` (ink band + breadcrumb + `texture-grid`, wraps search), `spare-parts-search-form.tsx` (GET form: `q` input + `inStock` checkbox chip, no client JS), `spare-parts-toolbar.tsx` (result count + «همه قطعات»/«فقط موجود» chip links preserving `q`), `spare-parts-empty.tsx` (separate copy for empty vs. upstream failure, CTAs to `routes.spareParts` / `routes.contact`).
- `spare-part-card.tsx` rebuilt: stock/low-stock badge + part-number chip overlaid on media, compatible-tool count, hover lift + image zoom, price pinned to bottom via `mt-auto`.
- `spare-part-grid.tsx`: gap 4→5, dropped redundant wrapper div (card is now `h-full w-full`).
- `(public)/spare-parts/page.tsx`: inline `<h1>`/form replaced by `SparePartsHero` + `SparePartsToolbar` + `SparePartGrid`/`SparePartsEmpty`; `result === null` now renders the failure state instead of "قطعه‌ای یافت نشد".
- Barrel `features/spare-parts/index.ts` re-exports the three new client-safe components.
- State flow: unchanged — all filtering is URL `searchParams` → RSC fetch; only `AddSparePartButton` is a client leaf.

---

## 2026-09-20 — Feat: repair request page + header nav (قطعات یدکی / درخواست تعمیر)

- `PRIMARY_NAV` + footer "دسترسی سریع" (`features/marketing/data/navigation.ts`): added «قطعات یدکی» → `routes.spareParts` and «درخواست تعمیر» → `routes.repairRequest`.
- `routes.repairRequest = '/repair-request'`; added `/spare-parts` + `/repair-request` to `PUBLIC_PATHS`; sitemap entry (0.6, monthly).
- New `features/repairs/`: `types/index.ts` (`repairFormSchema` mirroring `POST /storefront/repairs` bounds, `repairRequestSchema`, `REPAIR_STATUSES`), `hooks/use-repair-form.ts` (fields + field errors + submitted flag), `components/{repair-form,repair-sent,repair-login-notice}.tsx`, barrel `index.ts`.
- BFF `POST /api/repairs`: `getSession()` gate → 401, Zod `safeParse` → 400 + `fieldErrors`, then `apiClient.post('/storefront/repairs')`; upstream 400/404 → 400 "سریال نامعتبر", other → 502.
- Page `(public)/repair-request/page.tsx` (RSC): `buildMetadata` + breadcrumb JSON-LD, `getSession()` decides `RepairForm` (client) vs `RepairLoginNotice` (link to `/login?next=/repair-request`); static 3-step aside.
- State flow: form state lives in `useRepairForm` (client leaf); page stays server-rendered, no store slice.

## 2026-09-20 — Feat: checkout 409 conflicts + `checkout/in-flight`

- Schemas (`checkout.schemas.ts`): `checkoutConflictSchema` (`details.code` = `checkout_in_progress` | `pending_order_exists`, `orderNumber` nullable), `checkoutInFlightSchema` (`{locked, order|null}` with `orderNumber/status/total/paymentMethod/expiresAt`).
- `checkoutApi.inFlight()` (`cache: 'no-store'`) + BFF `GET /api/checkout/in-flight` (session-gated, `private, no-store`).
- `services/checkout-errors.ts`: `CheckoutConflictError` (carries the parsed conflict) + `toCheckoutConflict(details)`; replaces the earlier `CheckoutInFlightError`.
- `hooks/use-checkout-in-flight.ts`: react-query poll every 3s while a conflict is open, stops itself on `locked === false` — replaces the 20s guess timer.
- `use-checkout.ts` owns `conflict`; exposes `conflict` / `blockingOrder` / `conflictResolved`, keeps `confirming` true while locked, and clears the conflict on the next confirm.
- `components/checkout-conflict-notice.tsx`: spinner while processing, "می‌توانید دوباره ثبت کنید" once unlocked with no order, or an order card (number, total, minutes left to `expiresAt`) with "پرداخت همین سفارش" (`useRetryPayment`, now exported from `features/account`) + link to the order detail. Threaded through `review-step.tsx` ← `checkout-page-view.tsx`.

## 2026-09-20 — Feat: exploded-view parts from `abzar/api`

- `productPartSchema` + `productDetailSchema.parts` (`catalog.schemas.ts`) — `{number, name, code, sellable, hotspot: {x,y}|null}`, sorted by `number`, `[]` when none.
- `utils/pdp-extras.ts` builds `explodedView` from `explodedViewUrl` + `parts` (null only when both are empty); mock parts dropped from `data/pdp-mock.ts` (`pdpMock` is now `Omit<ProductExtras,'explodedView'>`).
- `exploded/part-hotspots.tsx` renders markers for parts with a `hotspot` (percent of the image); `PartInfoCard` shows only when at least one hotspot exists. Gallery "انفجاری" mode hidden when no image and no parts; "ساختار و قطعات" section (PartsTable) hidden when no parts.
- Still open with `abzar/api`: parts carry no `sparePartId`, so "سفارش قطعه" links to `/search?q=<code>`.

## 2026-09-19 — Feat: spare parts (storefront)

- New `features/spare-parts/`: `services/spare-parts.{schemas,api}.ts` (server-only fetchers, ISR 5m, tags `spare-parts`), `components/{add-spare-part-button,spare-part-card,spare-part-grid,spare-part-detail-view}.tsx`, barrel `index.ts`.
- Pages: `(public)/spare-parts` (search `q`, Zod-parsed) and `(public)/spare-parts/[slug]`; `routes.spareParts/sparePart`; sitemap entries.
- PDP: `products/[slug]/page.tsx` fetches `listSpareParts({productSlug})` → `ProductDetailView.spareParts` → `DetailSection#spare-parts` + tab.
- Cart state: `CartLine.kind?: 'spare_part'` (id = sparePartId; absent = variant). `features/cart/utils/sync-lines.ts#toSyncLines` maps lines → `{variantId|sparePartId, qty}` (`cartSyncLinesSchema`) for `/api/checkout` + `/api/cart/discount`; `syncCartToServer` calls `cartApi.addSparePart` (`POST /storefront/cart/spare-parts`) for parts.
- Not covered: no nav link; discounts targeted at product/category don't apply to parts (API side).

## 2026-09-19 — Change: cart schema accepts spare parts

- `features/cart/services/cart.schemas.ts`: `cartLineViewSchema.kind` += `'spare_part'`, new `sparePartId: string | null`. Prevents 502 on carts containing spare parts. No UI consumes `kind`/`productSlug` yet.
- Not built (needs decision): `/spare-parts` pages, PDP "قطعات یدکی" section (`GET storefront/spare-parts?productSlug=`), add-to-cart (`POST storefront/cart/spare-parts`). Backoffice work belongs to the admin panel.

## 2026-09-19 — Change: exploded view = admin-uploaded image

- `productDetailSchema.explodedViewUrl` (from `abzar/api` `EXPLODED_VIEW` media). Exploded mode/section render only when it exists (`utils/pdp-extras.ts`).
- Removed SVG diagram + explode controls. `exploded/exploded-view.tsx` now: zoomable image (`PhotoStage` + `Lightbox`), optional `part-hotspots.tsx` markers (`ExplodedPart.hotspot` %, none in mock), `part-info-card.tsx`, `parts-table.tsx`. State (hover/pinned part) owned by `ExplodedView`; gallery rail gets an exploded thumb.
- Blocked on `abzar/api`: no parts list / hotspot coordinates per product — parts are still mock (`data/pdp-mock.ts`).

## 2026-09-18 — Feat: PDP v2 (gallery modes, 3D, exploded view, docs, mobile bar)

- `features/catalog/components/product-detail/` split into `gallery/` (mode switcher, thumb rail, hover-zoom stage, mobile swiper, lightbox), `viewer/` (R3F + drei Draco GLB, `dynamic ssr:false`, hotspots, toolbar, WebGL/error fallback), `exploded/` (SVG diagram + accessible parts table, two-way hover/focus sync, explode toggle/slider), `buy-box/`, `mobile/` (sticky bar, bottom sheet), `sections/` (tab bar scroll-spy, description read-more, bento, zebra specs, Q&A, progress bar, mobile accordion), `documents/`, `reviews/`, `carousels/`.
- State: `ProductBuyBox` (client) owns qty/variant/city/sheet; `useAddToCart` owns add sequence (spinner → store commit → `flyToCart` → mini-cart drawer). `ProductGallery` owns mode + photo index. Cart store unchanged; `CartButton` gets `data-cart-target` + badge pop.
- Data: `services/pdp.schemas.ts` (Zod) → `types/pdp.ts`; `data/pdp-mock.ts` (documents, model3d, exploded view, specs, Q&A, highlights) + `data/delivery.ts` — **mock**, `abzar/api` has no such fields (except `datasheetUrl`, `model3dUrl`, overlaid in `utils/pdp-extras.ts`).
- `app/api/documents/[id]/route.ts`: per-request expiring HMAC file URL (`services/document-signing.ts`), env `DOCUMENT_SIGNING_SECRET` (required in prod).
- New: `store/toast-store.ts`, `components/molecules/toaster.tsx`, hooks `use-tweened-number|scroll-direction|in-view|recently-viewed`, keyframes in `styles/animations.css`.
- Removed: `product-buy-box.tsx`, `product-gallery.tsx`, `product-reviews.tsx`, `quantity-stepper.tsx`, `key-spec-chips.tsx`, `spec-list.tsx` (old flat versions).

## 2026-09-18 — Fix: card price/cart id from first variant

- `abzar/api`: `StorefrontProductCardView.firstVariant {id, effectivePrice, stockQty} | null` (list + `related`), new `ProductVariantRepository.findActiveByProductIds`.
- Storefront: `productCardSchema.firstVariant`, `features/catalog/utils/card-variant.ts` (`cardPurchase`) used by `product-card`, `flash-deals`, cart upsell pool, home JSON-LD. Cart line id = first variant id (matches buy box).

## 2026-09-18 — Feat: card cart stepper

- `features/catalog/hooks/use-cart-line-quantity.ts` (hydration-safe line qty), `components/card-quantity-stepper.tsx` (+/−, − at 1 removes).
- `add-to-cart-button.tsx` `compact` mode swaps to the stepper once the line is in the cart. State owner: `useCartStore` (`setQuantity`).
- Blocked on `abzar/api`: card list payload has no first variant (id/effectivePrice) — card still uses `basePrice` and `product.id` as cart line id.

## 2026-09-18 — UI: product card v2 (replaces catalog card redesign below)

- `product-card.tsx`: inset image tile (`surface-muted`, multiply blend) inside a ring card; brand as muted label; price left, round icon-only cart button right; wishlist top-end.
- `add-to-cart-button.tsx`: new `compact` prop (44px round icon button, aria-label).
- Removed `coming-soon-card.tsx` + filler logic and `minRowSize` prop from `product-grid.tsx` / `product-showcase.tsx`.

## 2026-09-18 — UI: catalog card redesign

- `features/catalog/components/product-card.tsx`: brand moved from image pill to uppercase label above title; hover = lift (`-translate-y-1`, reduced-motion safe) instead of scale; dashed price divider.
- `coming-soon-card.tsx`: dashed brand-tinted centered filler tile (no duplicated image block), `min-h-80`.
- `add-to-cart-button.tsx`: pointer cursor + focus-visible outline.

## 2026-09-18 — Fix: homepage QA pass — USP strip, trust-card palette, product skeletons, testimonial nav

Continuation of the homepage redesign already in progress (hero/promo-card/value-props work
below). Fixed the remaining brief gaps and screenshot defects:

- `announcement-bar.tsx`: sticky USP strip now shows all 4 items (shipping/warranty/returns/
  payment) as a horizontally scrollable row on mobile (`overflow-x-auto`) instead of hiding two
  of them behind `hidden sm:flex`.
- `promo-card.tsx` + `promo-cards.tsx`: removed the per-card `style={{ backgroundColor, color }}`
  arbitrary-`oklch` inline styling (banned static inline style + mixed-palette violation) —
  3 cards now cycle a single brand/accent token scheme (`--gradient-brand`, `bg-ink`,
  `bg-brand-50`). `types/index.ts` + `data/content.ts`: dropped the now-unused `tint`/`ink`
  fields from `PromoCard`. Cards get `items-stretch` + `h-full` for equal-height alignment (the
  "misaligned trust-badge grid" defect).
- `components/molecules/reveal.tsx`: added an optional `delayMs` prop (the one sanctioned
  runtime-computed inline style — grid stagger position) so `product-grid.tsx` and
  `promo-cards.tsx` can pass `index * 60` for a proper scroll-triggered stagger instead of every
  card animating in sync.
- New `product-card-skeleton.tsx`, `product-grid-skeleton.tsx`, `product-showcase-skeleton.tsx`
  (catalog feature) — shimmer loaders (wires up the previously-unused `shimmer` keyframe) matching
  the real grid's column layout. `page.tsx` now wraps `<ProductShowcase>` in
  `<Suspense fallback={<ProductShowcaseSkeleton />}>` so the new-arrivals grid streams in with a
  shimmer placeholder instead of ever showing an empty/broken card.
- `testimonials.tsx`: added prev/next chevron buttons (manual nav beyond the dot tabs), pause
  autoplay on `mouseenter`/`focus` (resume on leave/blur), and a crossfade+slide entrance per
  slide via new `animate-carousel-in` keyframe in `animations.css` (respects
  `prefers-reduced-motion` through the existing global override).
- `overview-view.tsx` (account/dashboard, unrelated in-progress work already in the tree): dropped
  an unused `buildMembership` import and unused `tier` destructure to get `pnpm lint` back to
  zero warnings — no behavior change.

Verified `pnpm typecheck && pnpm lint && pnpm build` all green.

## 2026-09-18 — Fix: promo cards — remove fake installment offer, redesign card visuals

`content.ts`: replaced non-existent "خرید اقساطی ابزار" (installment purchase — not an offered
service) with "خرید عمده کارگاهی" (bulk/wholesale pricing for workshops), added `icon` field to
all three `PROMO_CARDS`. `types/index.ts`: `PromoCard.icon: IconName`. `promo-card.tsx`: added
icon badge (frosted-glass square), tightened title/description spacing, CTA restyled as a pill
button instead of bare text+chevron.

## 2026-09-18 — Redesign: full homepage hero (intro) polish pass

`hero-badge.tsx`: merged the pulsing-dot + clashing amber "رسمی" pill into one cohesive badge —
brand-tinted shield-icon circle + single trailing accent dot. `hero-stats.tsx`: bare
number/divider list → 3 icon-chip stat cards (`award`/`user`/`box`, matched by label text),
reusing the same icon-chip visual language as the floating spec cards for a consistent system.
`hero.module.css`: toned down `.blobWarm`/`.blobCool` opacity (0.42/0.4 → 0.16/0.14) and shrank
them so they read as an ambient glow instead of washing the whole white section; `.ring` opacity
0.35 → 0.22 and spin slowed 46s → 60s; added `.ground` (soft radial contact-shadow ellipse under
the product shot for grounding). `hero-showcase.tsx`: wired in `.ground`, dropped the inner glow
opacity 0.25 → 0.14, `rounded-[2rem]` → canonical `rounded-4xl`. Builds on the floating-card
redesign below.

## 2026-09-18 — Redesign: hero showcase floating spec cards (homepage)

`hero-floating-card.tsx` restyled: dropped inline icon box, added a small corner-pinned check
badge (`-inset-s-2`/`-inset-e-2`, `badgeSide` prop) over a glass surface (`bg-surface/90` +
`backdrop-blur-md`), tighter value/label stack. `hero-showcase.tsx`: cut `MAX_SPECS` 6 → 3 and
replaced the 6-slot grid with 3 sparse corner slots (top-start, top-end, bottom-end), removed the
now-unused `IconName`/`iconForAttr` icon-per-attribute logic. Fixes cluttered/overlapping cards on
the homepage hero art.

## 2026-09-17 — Feature: wishlist heart button on product card + product detail

New `WishlistButton` (`features/account/components/wishlist-button.tsx`) — optimistic toggle,
`overlay` variant (round, over product-card image) and `inline` variant (square, buy box). Added
`useAddWishlistItem` mutation to `hooks/use-wishlist.ts` alongside existing `useRemoveWishlistItem`;
both invalidate the `['account','wishlist']` query key. Exported via `features/account/index.ts`.
Wired into `ProductCard` (`catalog/components/product-card.tsx`, absolute top-end over image) and
`ProductBuyBox` (`catalog/components/product-detail/product-buy-box.tsx`, badge row). 401 on click
bounces to `/login` via existing `UnauthorizedError`/`QueryProvider` global handler — no eager
wishlist fetch on public pages, so anonymous browsing is unaffected.

## 2026-09-17 — Fix: `/dashboard/notifications` wired to real data (was fully static)

`NotificationsView` rendered a hardcoded `NOTIFICATIONS` array (`features/account/data/notifications.ts`,
removed); `AccountTopbar`/`AccountNavLink` badges read a static `UNREAD_COUNT`. Backend has no
`/storefront/notifications` resource yet — needs `GET /storefront/notifications`,
`PATCH /storefront/notifications/:id/read`, `POST /storefront/notifications/read-all` (list item:
`id`, `type` enum `order_shipped|order_delivered|order_cancelled|discount|system`, `title`,
`body`, `createdAt` ISO, `read` boolean — no icon/color fields, those stay presentation-only).
Frontend built ready to wire in against that contract:
- `notifications.schemas.ts`/`notifications.api.ts` (server-only, same shape as `wishlist.api.ts`).
- BFF: `app/api/account/notifications/route.ts` (GET list, POST read-all),
  `app/api/account/notifications/[id]/read/route.ts` (PATCH one).
- `hooks/use-notifications.ts`: `useNotifications`, `useUnreadNotificationsCount` (shares the
  list query, no extra fetch), `useMarkNotificationRead`, `useMarkAllNotificationsRead`.
- `data/notification-type-meta.ts`: `type` → icon/tint/ink lookup (presentation only).
- `lib/persian.ts`: added `formatRelativeTime()`.
- `NotificationsView`/`NotificationRow` now loading/error/empty states; row is clickable and
  marks itself read. `ACCOUNT_NAV`'s notifications badge and `AccountTopbar`'s bell badge now
  read `useUnreadNotificationsCount()` instead of the static count.

## 2026-09-17 — Fix: `/dashboard/wishlist` wired to real data (was fully static)

`WishlistView` rendered a hardcoded `WISHLIST` array (`features/account/data/wishlist.ts`,
removed). Now backed by `abzar/api`'s `/storefront/wishlist` (list/add/remove), matching the
`addresses` page's pattern:
- `wishlist.schemas.ts` extended with `addToWishlistInputSchema` (`productId`, Mongo-id regex)
  and `addToWishlistResultSchema`; `wishlist.api.ts` extended with `add`/`remove`.
- New BFF routes: `app/api/account/wishlist/route.ts` (GET, POST) and
  `app/api/account/wishlist/[productId]/route.ts` (DELETE, 204).
- New `features/account/hooks/use-wishlist.ts` — `useWishlist()` (TanStack Query) +
  `useRemoveWishlistItem()` (mutation, invalidates on success), same shape as
  `checkout/hooks/use-addresses.ts`.
- `WishlistView` → client component, reads `useWishlist()`, handles pending/error/empty states.
  `WishlistCard` now links to the product page, shows brand + real image, and calls
  `onRemove`/`removing` props instead of local `useState` fake-delete.
- `features/account/types/index.ts`'s `WishlistItem` now re-exports the Zod-inferred type
  (`productId`/`brand`/`addedAt`, not the old `id`/`price` shape).

## 2026-09-17 — Fix: `/dashboard` overview wired to real data (was fully static)

`OverviewView`'s 4-stat grid, 6-month purchase-trend chart, and membership-tier card were all
hardcoded (`features/account/data/overview.ts`). First pass removed the 3 unbackable cards; API
then added the missing endpoints (non-breaking, additive) and they're now wired in:
- `orders.schemas.ts`/`orders.api.ts`: `orderStatsSchema` + `ordersApi.stats()` →
  `GET /storefront/orders/stats` (`totalSpend`, `paidOrderCount`, zero-filled 6-month
  `monthlyTrend`).
- New `loyalty.schemas.ts`/`loyalty.api.ts`: `loyaltyApi.summary()` →
  `GET /storefront/loyalty`, now carries a `tier` field (`lifetimePoints`, current/next tier,
  `progressPercent`) alongside the existing points `balance`.
- New `discounts.schemas.ts`/`discounts.api.ts`: `discountsApi.active()` →
  `GET /storefront/discounts/active` (customer's currently-usable discount codes).
- `lib/persian.ts`: added `formatPersianMonth()` (Gregorian `"YYYY-MM"` → Jalali month name via
  `Intl` `fa-IR-u-ca-persian`, no new dependency) for the trend chart's x-axis labels.
- `data/overview.ts`: `buildStatCards()` now takes `totalSpend`/`bestDiscount` too (discount card
  only renders when an active discount exists); added `buildTrendPoints()` and
  `buildMembership()`. Restored `purchase-trend-card.tsx`/`membership-card.tsx` as prop-driven
  components (no more direct static-data imports).
- `dashboard/page.tsx` fetches `orders.list` + `orders.stats` + `wishlist.list` +
  `loyalty.summary({ take: 1 })` + `discounts.active` in parallel, each independently
  `.catch()`-guarded with a zero/empty fallback so one endpoint failing doesn't blank the page.

---

## 2026-09-17 — Polish: homepage visual pass (elevation, rhythm, motion), broken hero image fixed

`PRODUCT_SHOT` (`src/features/marketing/data/media.ts`) pointed at a `public/products/` file that
was never committed (only a README there), so `MediaPlaceholder` rendered a broken-image icon in
the hero. `hero-showcase.tsx` no longer passes `src` — falls back to the built-in striped stand-in
surface. Confirmed no other homepage component passes a `src` to a nonexistent `public/` path
(product/article cards already omit `src` when no real image URL exists).

No token changes — reused existing `--shadow-soft/lift/float`, `--gradient-brand/spark`, `ink`
tokens more deliberately across the homepage:
- `testimonial-quote.tsx`: rebuilt as a proper card (`shadow-float`, `ring-white/10` panel, large
  quote-mark glyph, gradient-spark avatar-fallback with the reviewer's initial) instead of bare
  centered text.
- `value-prop.tsx` / `value-props.tsx`: each item is now a bordered, shadowed card with hover lift
  (was a flat icon+text row); section wrapped items in `Reveal`.
- `pillar-card.tsx`, `promo-card.tsx`: resting shadow bumped `shadow-soft` → `shadow-lift`, hover
  `shadow-lift`/`shadow-float` → `shadow-float` for clearer primary-card elevation.
- `category-rail.tsx`, `product-grid.tsx`: items wrapped in `Reveal` (was un-animated), matching
  the stagger-on-load pattern already used by `PromoCards`/`AboutSection`/`JournalRail`.
- Section vertical rhythm stepped up on desktop (`py-20 lg:py-28` / `py-16 sm:py-24 lg:py-28`
  pattern) in `hero.tsx`, `product-showcase.tsx`, `about-section.tsx`, `testimonials.tsx`,
  `newsletter-cta.tsx`, `journal-rail.tsx`, `store-footer.tsx` (`pt-16` → `pt-20`) — was a flat
  `py-20`/`py-24` with no desktop step-up.

No API/schema/data changes; no new tokens added.

---

## 2026-09-13 — Feature: `/dashboard/addresses` wired to real `abzar/api` data (was static mock)

`AddressesView` listed a hardcoded `ADDRESSES` array with fake edit/delete buttons. Now reuses
the checkout feature's address stack instead of duplicating it: `useAddresses`,
`useCreateAddress`, `useUpdateAddress` (new), `useDeleteAddress` (new) — all re-exported from
`features/checkout/index.ts` — plus a new BFF route `src/app/api/checkout/addresses/[addressId]/route.ts`
(`PATCH`/`DELETE`, safeParse via new `updateAddressInputSchema`, owner-scoped via session cookie)
and `checkoutAddressApi.update`/`.remove` server fetchers (`PATCH`/`DELETE`
`/storefront/addresses/:id`).

New in `features/account/components/`: `address-form-dialog.tsx` (client, wraps the shared
`Modal`, branches create vs. edit by whether an `address` prop is passed), `address-form-fields.tsx`
+ `address-form-field.tsx` (extracted so the dialog stays under the 150-line cap). `address-card.tsx`
now takes `onEdit`/`onDelete`/`deleting` and renders the real `Address` shape (`receiverName`,
`province`/`city`/`fullAddress`) instead of the old mock `{title, body}`; delete requires a second
click to confirm (no dedicated confirm dialog). `add-address-button.tsx` now takes `onClick` to
open the dialog. `addresses-view.tsx` owns loading/error/empty states and the open dialog's target
(`Address | 'new' | null`).

Removed: `features/account/data/addresses.ts` (mock data), the account-local `Address` type in
`features/account/types/index.ts` (superseded by `features/checkout`'s real `Address`, which
mirrors `abzar/api`'s `/storefront/addresses` resource).

---

## 2026-09-11 — Feature: `/checkout/result` gateway return page (was 404)

`window.location.assign(result.paymentUrl)` in `use-checkout.ts` sends the customer to the
online gateway, which redirects back to `/checkout/result?orderNumber=...&status=...` — that
route never existed, so the return trip 404'd after every online payment.

Added `src/app/(checkout)/checkout/result/page.tsx`: authenticated (redirect to login with
`next`), Zod-validates `orderNumber` from `searchParams` (the gateway's own `status` query param
is a hint only, never trusted), then re-fetches the real order via `ordersApi.detail()` —
owner-scoped, so a tampered `orderNumber` just 404s to `/dashboard/orders` instead of leaking
another customer's order. Rendering branches on `order.status`, not the query string.

New in `features/checkout/components/`: `checkout-result-view.tsx` (RSC switch: `paid` /
`processing` / `shipped` / `delivered` → existing `SuccessStep`; `pending_payment` + `cash` →
existing `CashPendingStep`; `payment_failed` / `abandoned` / `cancelled` → new `FailedStep`
(retry via `RetryPaymentButton` for `online`, else back-to-cart); `pending_payment` + `online`
(webhook not landed yet) → new `PendingConfirmationStep`, same retry fallback.

Account barrel (`features/account/index.ts`) now also exports `RetryPaymentButton`,
`ORDER_STATUS_META`, and the `OrderDetail`/`OrderStatus` types — needed cross-feature by the new
checkout view, previously only used inside `account`. Added `routes.checkoutResult` (`/checkout/
result`); already covered by `robots.ts`'s `/checkout` disallow prefix, no change needed there.

## 2026-09-11 — Fix: payment-method contract settled (was 502-ing silently to an empty list)

User: `/checkout` payment step showed "هیچ روش پرداختی در دسترس نیست" (empty) even though
`abzar/api` was up. Root cause: the payment-methods contract moved a **third** time after the
previous entry shipped — `curl localhost:4000/api/v1/storefront/payment-methods` returned
`{id, code, title, description, sortOrder}`, not the `{id, title, kind, sortOrder}` the previous
pass built against. The mismatched `kind` field failed `paymentMethodListSchema`'s `safeParse` →
`ApiError` → swallowed by the page's `.catch(() => [])` → an empty, silently-wrong list. Checked
the now-current `abzar/api` source to confirm: it settled back close to the *original* spec from
the top of this conversation — `POST /storefront/checkout` takes a plain `paymentMethod: 'online'
| 'cash'` again (not `paymentMethodId`), and `Order.paymentMethod` is the bare `PaymentMethodKind`
enum (not a relation) — `/storefront/payment-methods` is purely a read-only metadata table
(title/description per code) for display, never referenced by id anywhere.

Reverted/fixed to match: `payment-methods.schemas.ts` (`kind`→`code`, added `description`),
`checkout.schemas.ts` (`paymentMethodId`→`paymentMethod: enum`), `use-checkout.ts` /
`checkout-page-view.tsx` / `payment-step.tsx` / `payment-option.tsx` select and submit by `code`
again (not a DB id) — `PaymentOption` now shows the catalog's own `description` when present,
falling back to a built-in one per code. `orders.schemas.ts`'s `paymentMethod` is a bare code
enum again too (`orderPaymentMethodSchema` removed); `order-row.tsx` / `order-detail-summary.tsx`
display it through the restored `paymentMethodLabel()` helper instead of a `.title` field that no
longer exists on the order. This is the third payment-method contract shift mid-conversation —
worth a live smoke test once `abzar/api` stops moving before trusting this further.

---

## 2026-09-11 — Checkout + orders wired to real `abzar/api` end to end (was fully mock)

User handed over the backend spec for `paymentMethod` on checkout-start; investigation showed
checkout/orders were **still 100% local mock** (`useCheckout.confirm` just faked an order code —
no `abzar/api` call existed at all, per the 2026-09-04 checkout entry). Scoped up to the full
real wiring per explicit confirmation ("همه‌چیز با هم"), covering checkout-start, retry-payment,
and the orders list/detail pages.

**Contract moved under us mid-implementation.** The user's spec described
`paymentMethod: "online" | "cash"` as a request field; partway through, `abzar/api`'s actual
`storefront-checkout.schemas.ts` changed to `paymentMethodId` (an objectId) referencing a new
`GET /storefront/payment-methods` catalog — an admin-configurable list of named methods (each
with a `kind: 'online' | 'cash'`), not a fixed pair. Adapted to the *current* contract rather
than the originally-pasted one: payment methods are fetched, not hardcoded, and the picker shows
however many the backoffice has configured. `Order.paymentMethod` in the DB is likewise a full
relation to that catalog (`{id, title, kind, sortOrder}`), not a bare string — mirrored as such.

### Checkout-start (`features/checkout/`)

- **`services/checkout.schemas.ts`** — `startCheckoutInputSchema` (`addressId,
  shippingMethodId?, discountCode?, redeemPoints, paymentMethodId`), `checkoutStartResultSchema`
  (`{orderNumber, total, paymentUrl, paid}`), `payAgainResultSchema`.
- **`services/payment-methods.schemas.ts`** — `paymentMethodViewSchema`
  (`{id, title, kind, sortOrder}`), shared with the orders module below.
- **`services/checkout.api.ts`** (server-only) — `listPaymentMethods` (public, cached like
  shipping methods), `start`, `payAgain`.
- **`features/cart/services/cart.api.ts`** gained `syncCartToServer(lines)` — factored out of
  the discount route (which now uses it too) since checkout-start needs the identical
  clear-then-re-add sync of the local cart into `abzar/api`'s real cart before it can run.
- **New BFF routes**: `POST /api/checkout` (`safeParse`s `{input, lines}`, syncs the cart, calls
  `checkoutApi.start`) and `POST /api/checkout/[orderNumber]/pay` (retry).
- **`hooks/use-checkout.ts`** rewritten as a `useMutation` (was a synchronous fake). On success:
  a `paymentUrl` → `window.location.assign` (leaves the app for the gateway); no url + `paid` →
  `success` step; no url + not paid → new **`cash-pending`** step. The cart is cleared in
  `onSuccess` only — a failed attempt no longer wipes it. Throws `UnauthorizedError` on 401
  (global modal, same as everywhere else).
- **New `CashPendingStep`** — "سفارش شما ثبت شد، در انتظار تأیید/تسویه" (mirrors `SuccessStep`'s
  layout, distinct copy/icon since nothing was actually charged yet).
- **`PaymentStep`/`PaymentOption`** rewritten around the fetched `CheckoutPaymentMethod[]` —
  icon/description derived from `kind`, not stored per hardcoded entry. Deleted
  `data/payment-methods.ts` (the old 3-item fake gateway list).
- **`/checkout/page.tsx`** now fetches `listShippingMethods()` *and*
  `checkoutApi.listPaymentMethods()` server-side, passed into `CheckoutPageView`, which defaults
  the picked payment method the same way it already defaulted the address.
- **`ReviewStep`** gained `confirming`/`confirmError` (spinner + real Persian error message from
  `abzar/api`, e.g. "شما یک سفارش در انتظار پرداخت دارید").

### Orders (`features/account/`)

- **`services/orders.schemas.ts`** — `orderStatusSchema` (all 8 real `OrderStatus` values, not
  the old 3-value mock), `orderListItemSchema`/`orderDetailSchema` mirroring
  `OrderListItemView`/`OrderDetailView` exactly (`paymentMethod` as the relation object, address,
  items, `statusHistory`, `payment`).
- **`services/orders.api.ts`** (server-only) — `list`, `detail`; called directly from RSC pages
  (no BFF needed, these are plain authenticated reads).
- **`data/orders.ts`** — `ORDER_STATUS_META` now covers all 8 statuses; dropped the fake
  `ORDERS` array and the 4-stage `FULFILMENT_STAGES` concept (doesn't map to real,
  non-linear statuses like `cancelled`/`abandoned`).
- **New `dashboard/orders/[orderNumber]/page.tsx`** — a real order didn't have its own page
  before (the old list just expanded a fake inline 4-stage stepper). RSC, 404s on `ApiError`
  404/403. New `OrderDetailView` (+ `OrderDetailItems`, `OrderDetailSummary`,
  `OrderStatusTimeline` — a real chronological log from `statusHistory`, not a guessed
  4-stage progress bar) and `RetryPaymentButton` (`hooks/use-retry-payment.ts`, a `useMutation`
  hitting the new retry BFF route) — shown **only** when `paymentMethod.kind === 'online' &&
  status === 'pending_payment'`, matching `abzar/api`'s own 400 rejection of a cash retry.
- `OrderCard` (list) now links to the detail page instead of expanding an inline fake timeline.
  `order-filter-tabs.tsx` filters on the real statuses. `dashboard/page.tsx` and
  `dashboard/orders/page.tsx` fetch real orders server-side and pass them down — `OverviewView`/
  `OrdersView`/`RecentOrders` no longer import mock data.

**Verified:** `pnpm typecheck && pnpm lint && pnpm build` green. Not exercised against a live
`abzar/api` in this session — given the contract shifted once already mid-build, a real
end-to-end pass (place an online order, a cash order, retry a failed online payment, view both
in the orders list/detail) is worth doing once the backend settles.

---

## 2026-09-11 — Cart → checkout: shipping method + discount no longer lost

User: going from `/cart` to `/checkout` dropped data, and going back lost more. Root cause —
shipping-method selection and the applied discount were both plain local `useState` inside
`OrderSummary`/`useCoupon`, scoped to `/cart` only. `CheckoutPageView` never received either:
it recomputed its own bare `subtotal` from cart lines and `CheckoutSummarySidebar` **hardcoded**
"هزینه ارسال: رایگان" regardless of what was actually picked, with no discount line at all.
Going back to `/cart` remounted `OrderSummary` fresh, so even the coupon and shipping choice
made moments earlier were gone.

Moved both into `store/cart-store.ts` (already the persisted, `zustand` source of truth for cart
lines) — new `shippingMethodId`/`shippingCost`/`discountCode`/`discountAmount` fields +
`setShippingMethod`/`setDiscount`/`clearDiscount`. A discount is now auto-cleared by
`addItem`/`setQuantity`/`removeItem` (it was validated against a specific subtotal — once the
cart changes, that number is stale and must be re-applied). `clear()` (called post-order) resets
all four.

`use-cart-totals.ts` / `use-coupon.ts` now read/write the store instead of local state — no
prop-drilled `couponCode`. `OrderSummary` picks a default shipping method into the store once
the list loads, instead of local `useState`. `/checkout` now fetches shipping methods
server-side too (same `listShippingMethods()` as `/cart`'s page.tsx) and `CheckoutPageView` calls
the same `useCartTotals` (newly exported from `features/cart`'s barrel, alongside
`OrderSummaryLines` and the `CartTotals`/`ShippingMethod` types) — so `CheckoutSummarySidebar`
renders the real chosen shipping cost/free-shipping state and discount line instead of a
hardcoded one, and `checkout.confirm()` uses the real `totals.total` (was the bare subtotal,
silently overcharging by ignoring both shipping cost and discount).

---

## 2026-09-11 — Sign-in modal is now global (was one-off per `CheckoutButton`)

User: applying a coupon while signed out did a full-page redirect instead of the same in-place
modal the checkout button already used; asked for the modal everywhere auth is needed, not just
checkout.

New **`store/auth-modal-store.ts`** — plain (non-persisted) zustand store: `{isOpen, redirectTo,
open(redirectTo?), close()}`. New **`components/organisms/auth-modal.tsx`** — the actual `Modal` +
`PhoneAuthFlow` pairing, reading that store; mounted exactly once in `providers/index.tsx`
(`AppProviders`, inside `QueryProvider` so `PhoneAuthFlow`'s `useQueryClient` call resolves) —
covers every route group from one place.

**`providers/query-provider.tsx`**'s global `UnauthorizedError` handler now calls
`useAuthModalStore.getState().open(currentPath)` instead of `window.location.assign('/login?...')`
— so `useCoupon`, `useAddresses`/`useCreateAddress`, and any future hook that throws
`UnauthorizedError` all open the same modal in place, no page leave. `CheckoutButton` was
rewritten to open the shared store (`openAuthModal(routes.checkout)`) instead of owning its own
local `Modal`/`useState` — same visual result, one instance instead of N.

`PhoneAuthFlow` gained an optional `onDone` prop, threaded to `DoneStep`'s `onContinue` (fires
right as the success screen's Link is clicked) — the global modal passes its own `close()` so it
doesn't stay open behind the page after a completed sign-in.

---

## 2026-09-11 — Cart discount code → real `abzar/api` (was `COUPONS` lookup table)

User: applying "QWE" said invalid — correctly, since it isn't a real code, but the whole coupon
feature was a client-side `Record<string, number>` (`TECHNOREX10`/`TECHNOREX20`) mock. Wired to
the real `POST /storefront/discounts/validate`.

**The catch, documented back on 2026-09-11's rebrand entry:** that endpoint takes no cart data in
its body — it evaluates `abzar/api`'s own **server-side** cart for the authenticated user
(`CartRepository.findActiveByUserId`), 400ing "سبد خرید شما خالی است" if that cart is empty. The
storefront's cart is still 100% local (`zustand`/`localStorage`) — full migration to the real
`X-Cart-Token`/server-cart model (`GET/POST/PATCH/DELETE /storefront/cart*`, rewiring
`AddToCartButton`/`ProductBuyBox`/`UpsellAddButton`/the whole cart page, guest-cart-token
handling, merge-on-login) is its own sizable project, not something to fold into a coupon fix.

**Interim, real, working fix:** new `src/app/api/cart/discount/route.ts` — on apply, the BFF first
mirrors the client's current local cart lines into the real server cart (`DELETE
/storefront/cart` then `POST /storefront/cart/items` per line, via new server-only
`features/cart/services/cart.{api,schemas}.ts`), THEN calls the real `discounts/validate` and
returns its `{discountAmount, eligibleSubtotal}`. So the coupon rules (min order amount, per-user
usage limits, active window, product/category targeting) are now genuinely enforced by
`abzar/api`'s `DiscountEvaluatorService` — not guessed locally — at the cost of clearing +
rebuilding the user's real server cart as a side effect of clicking "اعمال" (harmless today since
nothing else reads that server cart yet).

`use-coupon.ts` is now a `useMutation` (was local `useState` + a table lookup) — throws
`UnauthorizedError` on 401 (guest clicking apply → bounced to `/login`, same global handler as
everywhere else) and surfaces the real Persian error message from `abzar/api` (expired code,
usage limit, "کد تخفیف روی اقلام سبد شما اعمال نمی‌شود", etc.) instead of one generic string.
`use-cart-totals.ts` takes the server's absolute `discountAmount` (تومان) instead of computing
`subtotal × mockRate` from a code lookup. `CouponField` gained a `pending` state (disabled inputs
+ spinner while the request is in flight). Deleted `features/cart/data/coupons.ts`.

**Known gap:** a product with zero variant rows (shouldn't happen for anything actually
sellable — every cart-eligible item is a `ProductVariant` in the schema) has no valid
`variantId` to sync; that line's sync call 404s ("محصول مورد نظر یافت نشد") rather than being
silently skipped.

---

## 2026-09-11 — Dev auth bypass removed entirely; key-spec chips on the buy-box

**Dev auth bypass removed.** User manually commented out the `getSession()` bypass line while
testing (visible via IDE selection on `lib/session.ts`) — that alone would have left the
mechanism in a broken half-state: `middleware.ts`'s Edge check would still wave a bypassed
visitor through to `/dashboard`, only for `(dashboard)/layout.tsx`'s `getSession()` re-check to
immediately bounce them back to `/login` anyway (dead loop), and `/api/auth/me`'s own bypass
branch would never run either since it's gated behind a truthy `session` first. With real OTP
login now fully wired (previous entry), the bypass no longer serves a purpose and half-alive is
worse than gone. Removed for good: `DEV_SESSION_USER` + `isDevAuthBypass()` out of `lib/jwt.ts`,
the dead branch out of `lib/session.ts#getSession`, the fallback out of `middleware.ts` and
`app/api/auth/me/route.ts`'s `GET`, and the now-meaningless `DEV_AUTH_BYPASS` var out of
`.env.example`. `getSession()` is unconditionally real from here on; `/dashboard` requires an
actual `abzar/api`-issued session both at the Edge and on every re-check.

**Buy-box key-spec chips.** New `features/catalog/components/product-detail/key-spec-chips.tsx` —
up to 4 of `product.attributeValues` (`value` + `unit`, `attributeTitle`) rendered as compact
pills, shown in `ProductBuyBox` between the short description and the price. This is exactly
`attributeValues`-derived data the API already returns (no new endpoint/schema) — the real
`abzar/api` product model has no per-variant attribute axis (e.g. a phone case's "compatible
device model" is a plain product-level spec, not a variant dimension like `colorName` is), so
this surfaces existing specs as a scannable strip rather than fabricating a variant picker the
backend doesn't support. The existing `colorName`-driven "مدل" variant picker in `ProductBuyBox`
(shown only when `variants.length > 1`) is untouched and remains the real variant axis.

---

## 2026-09-11 — Phone/OTP login wired to real `abzar/api` (was fully client-mocked)

User: "login is fine now, it needs to actually hit the server — no more hardcoded dev stuff."
The whole sign-in flow was client-side mock (`phone-auth.service.ts`: `wait()` + a hardcoded
known-phone/rejected-OTP pair, session "persisted" as a `localStorage` marker only). Replaced end
to end with the real `abzar/api` OTP endpoints, discovered by reading
`../api/src/modules/auth/{auth.controller,auth.service,auth.schemas,otp.service,token.types}.ts`
(no saved Postman response bodies to go on).

**New BFF routes** (server-only `apiClient`, `auth:false` where the real endpoint is public):
- `POST /api/auth/otp/request` → `abzar/api` `/auth/otp/request` — `safeParse({mobile,
  referralCode?})`, 400+`fieldErrors` on failure.
- `POST /api/auth/otp/verify` → `/auth/otp/verify`; on success calls
  `setSessionCookie(accessToken, expiresIn)` itself (HttpOnly, real JWT) and returns only
  `{isNewUser, user}` to the client — the refresh token is intentionally not forwarded (no
  refresh flow wired yet, see Open below).
- `app/api/auth/me/route.ts` gained `PATCH` (self-service `fullName`/`email` edit, same
  `safeParse` pattern) alongside the existing `GET`.

**`features/auth/services/auth.api.ts`** rewritten: dropped the dead password-auth endpoints
(`/auth/login`, `/auth/register` — predates the OTP pivot, never worked against the real API) for
`requestOtp` / `verifyOtp` / `me` / `updateProfile` / `logout` matching the real controller.
**`features/auth/types/index.ts`**: `authUserSchema` now mirrors the real `UserView`
(`id, fullName, mobile, email, role, referralCode` — was a fictional `{id,email,name,role}`
shape); added `otpRequestResultSchema` / `authResultSchema`; deleted the unused
`loginSchema`/`registerSchema`/`authTokensSchema`.

**Critical fix uncovered along the way — the JWT payload didn't match reality at all.**
`lib/jwt.ts`'s `jwtPayloadSchema` expected `{sub, email, role: UserRole, name?}`; the real
access token (`modules/auth/token.types.ts` `tokenPayloadSchema`, signed in
`auth.service.ts#issueTokens`) only ever carries `{sub, mobile, role: <db slug>}` — no email, no
name, and role is a free-form DB slug, not the storefront's old fixed enum. Every real login
would have failed `decodeToken()`'s schema check and silently fallen through to "no session".
Fixed: `SessionUser = {id, mobile, role: string, name?}`; `constants/index.ts` `UserRole` trimmed
to the two slugs `abzar/api` actually exports as constants (`customer`, `superadmin` —
`CUSTOMER_ROLE_SLUG`/`SUPERADMIN_ROLE_SLUG`; other roles are DB-seeded, rank unknown);
`ROLE_RANK` → `Partial<Record<string, number>>` (unknown slug ranks as 0); `lib/rbac.ts`
`hasRole`/`isAdmin` take a plain `role: string | undefined`; `formatRole` keys off the string
slug with a raw-slug fallback instead of `Record<UserRole,string>`.

**Client-side flow (`use-phone-auth.ts`, `phone-auth.service.ts`)**: removed
`KNOWN_PHONE`/`REJECTED_OTP`/`persistSession()` entirely — errors and "new vs. existing user"
now come straight from the server's response/message. `resendAfter` from the real OTP-request
response now drives `useResendTimer` (`restart(seconds?)` gained an override param) instead of
the fixed `RESEND_SECONDS` constant (kept only as the pre-first-request default).
`ProfileStep`'s "تکمیل ثبت‌نام" now actually persists (`finishProfile` calls `PATCH /auth/me`
through the service) — previously `auth.finishProfile()` took no input and just flipped the
local step to `done`, never saving anything. Both `verifyCode` and `finishProfile` invalidate the
`['auth','me']` query on success so the header/`CheckoutButton`/dashboard reflect the new session
immediately, no reload needed.

**Dashboard UI fallout from `SessionUser` losing `.email`:** `account-sidebar.tsx`,
`dashboard-topbar.tsx` now show the real `user.mobile` (Persian-digit formatted) instead of a
nonexistent email field. `account-form.tsx` also had its own separate hardcoded phone number
literal (`"09121234567"`, unrelated leftover from the scaffold) — now shows `user.mobile` too.

**Open / not in this pass:**
- No refresh-token flow — a session is exactly `expiresIn` seconds (`abzar/api`'s
  `JWT_ACCESS_TTL`, default 15m) and then requires a fresh OTP login; `/auth/refresh` exists
  server-side but nothing here calls it yet.
- OTP-verify's `cartToken` (guest-cart merge on login) isn't sent — the cart is still 100% local
  `zustand`/`localStorage`, unrelated to `abzar/api`'s server-side cart (same gap noted in the
  2026-09-11 rebrand entry below).
- Beyond `customer`/`superadmin`, real backoffice role slugs are unknown from the storefront's
  side (dynamic, DB-seeded) — `/dashboard/admin/*` gating only recognizes `superadmin` for now.

Verified against `pnpm typecheck && pnpm lint && pnpm build` — end-to-end request against a
running `abzar/api` not yet exercised in this session (would need OTP_DEV_ECHO or real SMS).

---

## 2026-09-11 — Dev auth bypass flipped to opt-in (was opt-out)

User report: a signed-out visitor with no token could still open `/dashboard`. Root cause is the
intentional [`DEV_AUTH_BYPASS`](.claude/docs/changelog.md) escape hatch from 2026-09-07 — hard-
gated to `NODE_ENV !== 'production'` so it can never fire on a real deployment — but
`isDevAuthBypass()`'s polarity was **opt-out**: `DEV_AUTH_BYPASS !== '0'`, so it defaulted ON in
dev even with the var unset. Flipped to **opt-in**: `DEV_AUTH_BYPASS === '1'`, default OFF — a
fresh `pnpm dev` (or any `.env.local` that doesn't explicitly set it) now enforces the real
session gate, and `/dashboard` correctly bounces a signed-out visitor to `/login`. Also added a
one-time `console.warn` in `lib/jwt.ts` when the bypass actually fires, so it can't go unnoticed
again. `.env.example`'s `DEV_AUTH_BYPASS` default flipped `1` → `0` with an updated comment.

**Action needed from the user:** `.env.local` is permission-blocked from Claude's `Read`/`Edit` —
if it explicitly sets `DEV_AUTH_BYPASS=1`, that still wins over the new code default and must be
changed by hand to `0` (or removed) + dev server restarted for the fix to take effect locally.

Note: real session issuance is still not wired — `phone-auth.service.ts`'s `persistSession()`
only writes a `localStorage` marker, no HttpOnly cookie — so completing the login modal/`/login`
flow locally won't yet produce a session `getSession()` recognizes once the bypass is off. That's
the next piece once `abzar/api` auth is reachable.

---

## 2026-09-11 — Fix: `logoutAction` 500 on an already-invalid session

Reported crash: `POST /dashboard 500` — `logoutAction`'s `try { authApi.logout() } finally {
clearSessionCookie() }` cleared the cookie but the `ApiError(401)` from `authApi.logout()` (the
dev-bypass mock session isn't a token `abzar/api` accepts) still propagated after the `finally`,
crashing the Server Action before it reached `redirect()`. Added a `catch` that swallows the
logout-call failure — sign-out is best-effort against `abzar/api` and must never block clearing
the local cookie + redirecting to `/login`.

---

## 2026-09-11 — Global client-side 401 → redirect to `/login`

New **`lib/api-error.ts`**: `UnauthorizedError`. **`providers/query-provider.tsx`** now builds
its `QueryClient` with a `QueryCache`/`MutationCache` `onError` that redirects
(`window.location.assign`) to `/login?next=<current path+search>` whenever a query/mutation
throws it; `retry` is also patched to never retry an `UnauthorizedError` (retrying a 401 is
pointless — go straight to the redirect). One central place, so every future client hook gets
this for free just by throwing the right error type.

`features/checkout/hooks/use-addresses.ts` (`useAddresses` + `useCreateAddress`) now throws
`UnauthorizedError` on `res.status === 401` instead of a generic `Error` — was surfacing as an
inline "بارگذاری آدرس‌ها ناموفق بود" message even when the real cause was a missing/expired
session; now it correctly bounces to login instead.

`useCurrentUser` is the deliberate exception — it already treats 401 as "no session" and
resolves to `null` rather than throwing, which is correct: it's read on every public page to
decide header/`CheckoutButton` state, and must never force a redirect for an anonymous visitor
just browsing. Documented the convention (which hooks throw vs. return `null`) in
`.claude/rules/security.md` and the `CLAUDE.md` quick-reference table.

---

## 2026-09-11 — In-place login modal at "تکمیل سفارش و پرداخت"

User picked inline modal over full-page redirect (fewer hops, cart stays visible) after a
design-tradeoff review. New generic **`components/molecules/modal.tsx`** — `Modal` (portalled to
`body`, backdrop-click + Escape close, body-scroll lock, focuses the first focusable element,
`role="dialog"`/`aria-modal`); exported from `components/molecules/index.ts`. New
`animate-modal-in`/`animate-modal-backdrop-in` keyframes in `animations.css`.

**`features/cart/components/checkout-button.tsx`** rewritten client-side: was a bare `<Link
href={routes.checkout}>`. Now reads `useCurrentUser()` (`@/features/auth`) — signed-in →
`router.push(routes.checkout)`; guest → opens the `Modal` with the existing `PhoneAuthFlow
redirectTo={routes.checkout}` inside (no new auth code — same phone/OTP state machine used at
`/login`; its `DoneStep` CTA already accepts `redirectTo` and lands the user on `/checkout`
directly, closing the modal by navigating away). Button disabled + `Spinner` while the user query
is pending, to avoid a flash of the wrong branch.

`/checkout`'s existing page-level `getSession()` redirect-to-`/login` guard is untouched and
stays as the fallback for anyone who reaches `/checkout` by URL directly (deep link, back button)
without going through this modal — defense in depth, same pattern as the dashboard RBAC gate.

Known gap (pre-existing, not introduced here): `phone-auth.service.ts` is still a full mock — its
`persistSession()` writes a `localStorage` marker only, not the real HttpOnly session cookie, so
completing the modal flow won't actually flip `getSession()`/`useCurrentUser()` outside of
`DEV_AUTH_BYPASS`. Same limitation the `/login` page already has; resolves itself once phone-auth
is wired to `abzar/api`.

---

## 2026-09-11 — Ledger moved out of repo root: `cloud.md` → `.claude/docs/changelog.md`

User feedback: a live workspace ledger doesn't belong at the project root — it's tooling data
for Claude, not app/product content. Moved (`git mv`, history preserved) `cloud.md` →
`.claude/docs/changelog.md`. Updated every reference: `CLAUDE.md` (`## cloud.md — mandatory live
ledger` section + the "Done =" line), `.claude/rules/working-style.md` (terse-prose rule),
`README.md` (Architecture section link). Past entries below still say "`cloud.md`" where that
was the accurate filename at the time — left as historical record, not rewritten.

---

## 2026-09-11 — Checkout address empty state

New `features/checkout/components/address-empty-state.tsx` — shown by `AddressStep` when
`addresses.length === 0` (and the new-address form isn't already open): brand-tinted `pin` icon
badge, heading + helper copy, single solid CTA that opens `NewAddressForm`. Replaces the old
bare list + dashed "add address" row for the zero-state; that dashed row still shows once ≥1
address exists. The bottom "ادامه به روش پرداخت" button is now hidden entirely in the zero-state
(no address list yet, so nothing to continue with) instead of just being disabled.

---

## 2026-09-11 — Checkout addresses → real `abzar/api`

`GET/POST /storefront/addresses` wired for real, replacing the hardcoded
`checkout/data/addresses.ts` (deleted). New:
- `features/checkout/services/checkout-address.{api,schemas}.ts` — `addressSchema` mirrors
  `{id,receiverName,receiverMobile,province,city,fullAddress,postalCode,isDefault}`;
  `createAddressInputSchema` validates the create form.
- `src/app/api/checkout/addresses/route.ts` — BFF: `GET` lists, `POST` `safeParse`s the body
  (400 + `fieldErrors` on failure), both 401 when unauthenticated.
- `features/checkout/hooks/use-addresses.ts` — client `useAddresses` (`useQuery`) +
  `useCreateAddress` (`useMutation`, invalidates the list on success).

`Address` type now `z.infer<typeof addressSchema>` (was a hand-written mock shape with
`title`/`text`). `AddressCard`/`ReviewStep` render `receiverName` + `province/city/fullAddress`
instead of the old label/text pair. `AddressStep` gained loading (skeleton) and error states and
now takes `addresses`/`isLoading`/`isError` as props instead of importing static data.
`NewAddressForm` is now a real controlled form (was visual-only) posting through
`useCreateAddress`, with inline field errors; on success it selects the new address and closes
itself. `useCheckout`'s `addressId` starts empty; `CheckoutPageView` defaults it to the
customer's default (or first) address once the query resolves. `CheckoutNextButton` gained a
`disabled` prop, used to block "ادامه" while no address is selected/loaded.

Note: `dashboard/addresses` (account settings page) still uses its own separate, still-static
`features/account/data/addresses.ts` — out of scope for this change, left untouched.

---

## 2026-09-11 — Rebrand to Technorextools; real shipping methods; checkout login-gate; number font

**Rebrand.** Visible brand switched from "تکنورکس / Puma Air" to "تکنورکس / Technorextools"
across ~40 files (copy, `src/config/site.ts` — email/social/keywords/OG handle — `.env.example`
`NEXT_PUBLIC_SITE_NAME`, `BrandLogo`'s monogram, mock coupon codes, `localStorage`/cart-store
keys). `.env.local` needs the same `NEXT_PUBLIC_SITE_NAME` edit by hand (blocked path).

**Number font.** `--font-display` (used on every price/number) listed `Space Grotesk` before
`Vazirmatn` — Space Grotesk has no Persian-digit glyphs, so ۰-۹ fell back inconsistently.
Reordered to Vazirmatn-first in `globals.css`.

**Cart → real `abzar/api`, partially.** Read the live API + `../api` source directly (Postman
had no response bodies saved) to confirm the actual contract:
- `GET /storefront/shipping/methods` — public, `{id,title,costType,cost,freeOverAmount,sortOrder}`.
  Wired for real: new `features/cart/services/shipping.{api,schemas}.ts`, `ShippingMethod` type
  now mirrors the API shape (no more fake `eta`), `cart/page.tsx` fetches methods server-side
  and threads them through `CartPageView → OrderSummary/ShippingMethods` and
  `FreeShippingBar` (threshold = cheapest method's `freeOverAmount`, hidden if none set).
  `data/shipping.ts` (static list + hardcoded threshold) deleted.
- `POST /storefront/discounts/validate` and the whole `/storefront/checkout/*` module require
  a **logged-in** user AND evaluate against that user's **server-side** cart
  (`CartRepository.findActiveByUserId`) — our cart is still 100% local (`zustand` +
  `localStorage`), so a real discount/checkout call would 400 "cart is empty" even once
  logged in. **Not wired** — needs the cart itself migrated to the API's `X-Cart-Token`
  guest-cart model first (own effort). Coupon panel stays the local mock for now.
- Added the login-gate piece that *is* safe standalone: `/checkout` (page-level, mirrors the
  `(dashboard)/layout.tsx getSession()` re-check pattern) redirects a guest to
  `/login?next=/checkout`; `/login` now reads that `next` param (previously set by
  `middleware.ts` but never consumed anywhere) and `PhoneAuthFlow → DoneStep` sends the user
  back there post-OTP instead of always to `/`.
- Cart item image was always the placeholder (`CartLine`/`UpsellProduct` never carried an
  image url). Threaded `mainImageUrl`/`image.url` through `AddToCartButton`, `ProductBuyBox`,
  `cart/page.tsx`'s upsell mapping, `CartItemRow`, `UpsellCard`.

---

## 2026-09-11 — Catalog fixes: real API base URL, live product images, polished `/products`

`.env.local`/`.env.example` `API_BASE_URL` was missing the `/api/v1` prefix — every
`apiClient` call 404'd, silently caught to `null` in `catalog-view.tsx`/`products/page.tsx`,
rendering as the connection-error empty state. Fixed the env value; no code change needed
for the fetch path itself.

`next.config.mjs` `images.remotePatterns` only allowlisted the placeholder
`**.abzar.example` host — added `**.arvanstorage.ir` (real product-media host). `ProductCard`,
`ProductGallery`, and `FlashDeals` were also never passing `src` to `MediaPlaceholder`, so
every product photo silently fell back to the labelled stand-in even once the host was
allowlisted — wired `product.mainImageUrl` / `image.url` through in all three.

Redesign pass on `/products` + the shared `ProductCard` (used everywhere): `catalog-hero.tsx`
gained a trust-highlight chip row (`shield`/`truck`/`headset`); `catalog-filters.tsx` is now a
bordered/shadowed panel with a header row and section dividers instead of bare stacked
controls; `filter-radio-list.tsx` rows are full-width ≥40px touch targets with an active
check icon instead of plain text links; `catalog-sort.tsx` is a matching card bar. New
`coming-soon-card.tsx` — dashed-border filler tile shown by `product-grid.tsx` whenever the
result set is under 3 items, so a sparse catalog doesn't look broken. `product-card.tsx` now
shows the brand as a pill chip and separates the price/CTA block with a hairline divider.

---

## 2026-09-10 — Storefront wired to `abzar/api` (catalog + content dynamic)

The whole public site now reads from `abzar/api` `/storefront/*` over `apiClient`
(server-only, `auth:false`, `next.revalidate=300`). Mock data deleted.

### New domains

- **`src/features/catalog/`**
  - `services/catalog.schemas.ts` — Zod mirrors of the API views (category tree,
    brand, product card/detail, comments).
  - `services/catalog.api.ts` — `getCategoryTree` · `listBrands` · `listProducts` ·
    `getProduct` · `getProductComments`. **server-only, import by path.**
  - `services/catalog.query.ts` — URL `searchParams` schema (`q,category,brand,
    minPrice,maxPrice,deal,sort,page`) + `toProductsQuery` mapping to the API query.
    `sort ∈ newest|price-asc|price-desc`. `CATALOG_PAGE_SIZE=12`.
  - `data/presentation.ts` — slug→{icon,tint,ink} registry (API carries no visuals).
  - `utils/category-tree.ts` — `flattenCategories` / `findCategoryNode` / `topLevelCategories`.
  - `hooks/use-catalog-params.ts` — reads filter state from URL, writes via
    `router.replace` (every change = server round-trip).
  - `components/` — `catalog-view` (RSC: filters sidebar + grid + pagination),
    `catalog-filters`/`filter-radio-list`/`price-range-filter`/`catalog-sort`/
    `catalog-pagination` (client, URL-driven), `product-card`/`product-grid`/
    `add-to-cart-button`, `category-rail`/`brand-strip`/`flash-deals`/`product-showcase`
    (RSC home sections, each self-fetches), `catalog-hero`/`category-hero`,
    `product-detail/*` (`product-detail-view`, `product-gallery`, `product-buy-box`
    with variant picker, `spec-list` from `attributeValues`, `product-reviews` from
    the comments endpoint, `detail-section`, `star-row`, `quantity-stepper`).
  - `index.ts` — client-safe surface only (types, query utils, pure components).
    Data-fetching RSC sections + `*.api.ts` import by direct path (barrel hygiene).

- **`src/features/content/`**
  - `services/content.schemas.ts` + `content.api.ts` (`listArticles`, `getArticle`).
  - `utils/date.ts` — `formatJalaliDate` (ISO → `Intl.DateTimeFormat('fa-IR')`).
  - `utils/sanitize.ts` — `sanitizeArticleHtml` via **`sanitize-html`** (pure JS,
    no jsdom). Feeds the only sanctioned `dangerouslySetInnerHTML` (`article-body`).
  - `components/` — `article-card`, `article-body` (+ `.module.css` prose), `journal-hero`,
    `featured-article`, `journal-rail` (RSC, import by path).

### Pages rewritten

- `(public)/page.tsx` — RSC, `revalidate=300`; sections self-fetch; `itemListSchema`
  from a page-level `listProducts`.
- `products/page.tsx` — `searchParams`→`parseCatalogParams`→`CatalogView`; `noindex`
  when any filter active.
- `categories/[slug]/page.tsx` — `generateStaticParams`+`findCategoryNode` from the
  category tree; `CatalogView` with `lockedCategory`; 404 when slug absent.
- `products/[slug]/page.tsx` — `getProduct` + `getProductComments`; `generateStaticParams`
  from `listProducts({take:100})`, `dynamicParams=true`; 404 on `ApiError` 404.
- `search/page.tsx` — real results via `listProducts({search})`.
- `blog/page.tsx` + `blog/[slug]/page.tsx` — `listArticles`/`getArticle`; sanitized
  HTML body; article taxonomy/tabs dropped (API has none).
- `cart/page.tsx` — upsell pool from `listProducts`; `sitemap.ts` async, slugs from API.

### Contact form

- `src/app/api/contact/route.ts` — Zod `safeParse`, `400 + fieldErrors`, else
  `console.warn('[contact] TODO wire to abzar/api')` + `202`. No public API endpoint
  exists yet. `features/contact/hooks/use-contact-form.ts` now POSTs there (+ `pending`).

### Cart adaptations

`Product`/`Category` (marketing mock) → `UpsellProduct` (`features/cart/types`) +
`categoryChip` (wraps `categoryPresentation`). `pick-upsells` drops the stock filter.

### Deleted

`features/marketing/{data/{products,categories,catalog,journal,journal-taxonomy,
journal-bodies,product-details},utils/{catalog-params,catalog-filter,catalog-chips,
category,journal-params,journal-detail,product-detail},types/{catalog,product-detail},
hooks/use-catalog-filters,components/{catalog,category,products,journal,journal-page,
flash-deals,category-rail,product-detail,brand-strip}}`. Marketing barrel + `types/index.ts`
trimmed to static sections only. `data/content.ts` lost `JOURNAL`.

### Open

- Product/article images: API returns absolute URLs but the host is not on the
  `next/image` allowlist → every slot is `MediaPlaceholder` (no `src`). Add
  `next.config.mjs` `images.remotePatterns` + wire `src` once the host is known.
- `article.body` assumed HTML; add a Markdown renderer if it turns out to be MD.
- Review submission (`POST .../comments`) needs auth — not built.
- Verified: `typecheck` + `lint` + `build` green (25/25 pages, empty DB).

---

## 2026-09-10 — Claude Code config: token-lean + hardened

Tooling only, no app code.

- **`CLAUDE.md`** compressed 215 → ~150 lines. Every rule kept (architecture law,
  Tailwind v4 + CSS Modules hybrid, 150-line cap, `any` ban, RSC-first, cloud.md
  protocol, SEO/CWV, OWASP/RBAC/CSRF/XSS); prose collapsed to terse bullets, the
  ASCII tree trimmed to essentials. Loaded verbatim into every session → smaller
  fixed context cost per turn.
- **`.claude/settings.json`** (new, team-shared): permission allowlist for safe
  read/build commands (`pnpm dev|build|lint|typecheck|format`, `git` read verbs,
  `rg`/`ls`/`find`, …) to cut prompt round-trips; `deny` on `.env*` reads,
  `rm -rf`, `git push`, `git reset --hard`; `ask` on `git commit`/`checkout`.
- **`~/.claude/settings.json`** (personal, global): `promptCacheTtl` +
  `subagentPromptCacheTtl` = `1h` (keeps the prompt cache warm across breaks →
  fewer cache-write billings on resume), `precomputeCompactionEnabled`,
  `spinnerTipsEnabled: false`, `fileCheckpointingEnabled`. Dropped two stale
  project-specific allow entries.

No component tree / state flow changes.

### Follow-up — CLAUDE.md split into modular files

`CLAUDE.md` is now a lean root (~65 lines): role, app summary, commands, cloud.md
protocol, quick-reference. Everything else moved out:

- `.claude/rules/` — `working-style.md` (token discipline: no preamble, narrow reads,
  batch calls, verify once), `architecture.md`, `styling.md`, `components.md` (+ providers
  roadmap), `seo.md`, `security.md`. Pulled in via `@.claude/rules/*.md` imports → still
  always in context, just organized.
- `.claude/docs/api-contract.md` — full `abzar/api` surface. **Not** imported; CLAUDE.md
  points at it, Claude reads it only when touching API code → smaller default context.

### Follow-up — full permission ruleset (no more per-command prompts)

- **`.claude/settings.json`** `permissions` expanded: `allow` now covers all read-only
  inspection (`Read`/`Grep`/`Glob`, `rg`/`ls`/`cat`/`find`/`jq`/`git` read verbs, `git add`/
  `restore`/`fetch`), the full dev loop (`pnpm dev|build|lint|typecheck|format|test|install|
  add|exec|dlx`, `npx tsc|next|eslint|prettier`, `node`), scaffolding (`mkdir`/`touch`/`cp`/
  `mv`), and `curl` to `localhost:3000/4000`. `deny`: `.env*`/`*.pem` reads+edits, `rm -rf`,
  `sudo`, `git push`/`reset --hard`/`clean`/`rebase`/`filter-branch`, piped `curl|sh`. `ask`:
  `git commit`/`checkout`/`switch`/`merge`/`tag`, `pnpm remove`/`publish`, bare `rm`.
- **`.claude/settings.local.json`** (new, git-ignored, personal): `defaultMode: acceptEdits`
  (file edits apply without a prompt) + broad `Bash(pnpm:*)`/`npx:*`/`node:*` and
  `WebFetch(domain:localhost)`.

### Follow-up — `abzar/api` contract wired into config

- `.claude/settings.json` → `permissions.additionalDirectories: ["../api/postman"]` so
  Claude can read the Postman collection (it sits outside the storefront working dir).
- `CLAUDE.md` gained an **"`abzar/api` contract"** section: points at
  `../api/postman/abzar-api.postman_collection.json` as the source of truth, with the
  base URL, OTP auth flow, and the `/storefront/*` vs `/backoffice/*` split summarized.
  Rule: read the collection before any `apiClient` call / BFF route / Zod response schema.

---

## 2026-09-07 — Real product photography wired into the media slots

- **`MediaPlaceholder`** now takes optional `src` / `fit` / `sizes` / `priority`.
  With `src` it renders a `next/image` (`fill`, `object-contain p-[7%]`) over a
  calm cobalt-tinted `.photo` backdrop (which shows through if the file is
  missing); without it, the striped stand-in is unchanged.
- **`features/marketing/data/media.ts`** — `PRODUCT_SHOT =
  '/products/puma-air-screwdriver.png'` (one shared hero shot for now).
- Wired into: `hero-showcase` (priority), `products/product-media` (home + catalog
  cards), `flash-deals/deal-card`, `product-detail/product-gallery` (main image +
  photo thumbs).
- `public/products/README.md` documents the expected file. **Manual step:** drop
  the screwdriver PNG at `public/products/puma-air-screwdriver.png` — no
  `next.config` change needed (local asset).

Verified: `typecheck` + `lint` + `build` green.

---

## 2026-09-07 — `/contact` page built out from the mockup ("Puma Air Contact")

Replaced the earlier stub with the full contact page, adapted to the cobalt/amber
system. New feature `features/contact/`:

- **types/index.ts** — `CONTACT_SUBJECTS` (4 chips) + `contactFormSchema`
  (Zod: name ≥ 2, `09xxxxxxxxx` phone, message ≥ 5).
- **data/contact.ts** — `CONTACT_CHANNELS` (phone / email / address / hours) +
  `WORK_HOURS`.
- **hooks/use-contact-form.ts** — owns fields + field errors + `submitted` flag.
- **components** — `contact-hero` (blob + gradient headline), `contact-channels`
  (4 cards, RSC, link when a channel has an href), `contact-form` (client) →
  `subject-chips` + `contact-sent` (success panel); `contact-info-panel` (RSC:
  map `MediaPlaceholder` `#location`, working-hours card, support prompt).
- **index.ts** barrel.

Route: `(public)/contact/page.tsx` — RSC; `buildMetadata` + `localBusinessSchema`
+ breadcrumb JSON-LD; hero + channels + `lg:grid-cols-2` (form | info panel).

State flow: all client state in `useContactForm` (owned by `ContactForm`); subject
is local UI state (not validated); on valid submit the form swaps to `ContactSent`.
No server action, no store.

Verified: `typecheck` + `lint` + `build` green.

---

## 2026-09-07 — Navigation / page-linking fixes

Site links were partly broken off the homepage.

- **`anchors.ts`**: `anchor()` now returns root-absolute `/#id` (was bare `#id`,
  which only scrolls while already on `/`). Fixes every home-section link used in
  the header nav, footer, hero and promo cards when clicked from another route.
- **`data/navigation.ts` `PRIMARY_NAV`**: repointed to real pages — "مجله پوما" →
  `/blog`, "درباره ما" → `/about`, added "تماس با ما" → `/contact` (dropped the
  dead "نظر مشتریان" `#voices` nav entry; section still exists on home).
- **`FOOTER_COLUMNS` "دسترسی سریع"**: all entries now real routes (`/about`,
  `/products`, `/blog`, `/order-tracking`, `/contact`) instead of `#` anchors.
- **`/contact` page created** (`(public)/contact/page.tsx`) — was referenced by
  `routes.contact`, `sitemap.ts`, `about-cta` and hero but never existed (404).
  Persian "تماس با ما"; phone/whatsapp/email channel cards, `surface-ink` address
  block, social links; `localBusinessSchema` + breadcrumb JSON-LD.
- **`hero.tsx`** / **`promo-card.tsx`** / **`flash-deals.tsx`**: `#contact` /
  `#products` CTAs repointed to `routes.contact` / `routes.products`.

Verified: `typecheck` + `lint` + `build` green.

---

## 2026-09-07 — Deep visual redesign: light "cobalt + hi-vis amber" system

Full-project restyle at the user's request ("make it striking, not simple; very
important"). Direction locked: **stay light**, fresh palette, drama from
dark-colored *sections* not a dark theme. See memory `redesign-direction-2026-09`.

### Token system — `src/styles/globals.css`

- **Brand pivot** rust-orange → **electric cobalt** (`--color-brand-50..700`).
- **Accent** machined-gold → **hi-vis amber** (`--color-accent-100..600`).
- New: `--color-ink` / `--color-ink-soft` / `--color-surface-inverse` /
  `--color-hairline-inverse` for dark sections; cool near-white surfaces re-tinted
  to hue 260; `--color-success/-sale/-info` promoted to real tokens.
- **Elevation scale**: `--shadow-soft / -lift / -float / -brand / -accent`.
- **Signature gradients**: `--gradient-brand`, `--gradient-spark`, `--gradient-ink`.
- New `@utility`s: `surface-ink` (ink gradient bg), `texture-grid` (engineered grid
  overlay for dark sections), `text-gradient-brand` (clipped gradient text).
- `::selection` tint added.

### animations.css

Added `animate-soft-float`, `animate-glow-pulse`, `animate-gradient-pan`, and
`shine-sweep` / `gradient-pan` keyframes.

### Primitives rebuilt

`Button` (gradient primary + brand shadow + lift, rounded-xl, h-11), `PillLink`
(gradient/elevated variants), `Badge` (ringed tones, token colors), `Card`
(hairline + `--shadow-soft`), `SectionHeading` (pill eyebrow w/ accent dot),
`MediaPlaceholder` (cobalt/amber radial wash + hover shine sweep).

### Components touched (visual only, no logic change)

- **Global chrome:** `store-header` (elevated bar), `announcement-bar` +
  `auth-brand-panel` + `testimonials` + `store-footer` (→ `surface-ink texture-grid`),
  `brand-logo` (gradient chip + accent notch), `header-search` (focus ring glow),
  `header-actions`, `primary-nav` (pill links), all `footer/*`.
- **Home:** `hero` (+ `hero.module.css` recolor, badge/showcase/floating-card/stats),
  `category-rail-item`, `flash-deals` + `deal-card` + `deals-countdown`,
  `promo-card`, `value-prop`, `promo-ticker`, `brand-strip`, `product-card` +
  `product-badge` + `product-price` + `add-to-cart-button`, `about-section` +
  `pillar-card`, `journal/article-card`, `newsletter-cta`.
- **Page heroes:** `catalog-hero`, `category-hero`, `journal-hero` (+ tabs),
  `about-hero` + `about-eyebrow` (orange blobs → cobalt/amber).
- **Product detail:** `product-buy-box`, `buy-box-price`.
- **Cart:** `order-summary`, `checkout-button`.
- **Account:** `account-sidebar`, `account-nav-link` (active rail), `stat-card`.
- **Bug fixes:**
  - `not-found.tsx` + `error.tsx` were English → localized to Persian and restyled.
  - `search` page given a real on-page search form + hero treatment.
  - `(dashboard)/dashboard/page.tsx` was a stale English SaaS placeholder
    ("Welcome / Active users / MRR / Open tickets") — now renders the real
    `OverviewView` (stats, purchase-trend chart, membership card, recent orders).
  - `(dashboard)/dashboard/analytics` + `admin/users` were English stubs →
    localized "به‌زودی" placeholder panels.

Verified: `typecheck` + `lint` (`--max-warnings 0`) + `build` all green.

---

## 2026-09-07 — Dev-only dashboard auth bypass

`abzar/api` auth is not runnable locally, so `/dashboard/*` was unreachable. Added a
hard dev-gated escape hatch: a mock super-admin session (`DEV_SESSION_USER`) that
stands in when there is no real API-issued session.

- **`lib/jwt.ts`** (edge-pure): `DEV_SESSION_USER` + `isDevAuthBypass()` —
  `NODE_ENV !== 'production' && process.env.DEV_AUTH_BYPASS !== '0'`. Cannot ever
  fire on a production build.
- **`lib/session.ts`**: `getSession()` falls back to `DEV_SESSION_USER` when no
  cookie/token and bypass is on.
- **`middleware.ts`**: same fallback for the Edge gate; the auth-route redirect
  still keys off the *real* token so `/login` stays reachable while bypassing.
- **`app/api/auth/me/route.ts`**: on `authApi.me()` failure, returns the mock
  session instead of 502 when bypass is on (keeps client `useCurrentUser` happy).
- **`.env.example` / `.env.local`**: `DEV_AUTH_BYPASS=1` documented; set `0` to
  exercise the real gate in dev.

No new components or state flow. Remove this once real auth is wired.

---

## 2026-09-07 — Order tracking (`/order-tracking`) — new `features/order-tracking/`

Implemented the last un-built mockup ("Puma Air Order Tracking"): a public guest
lookup of an order's fulfilment status by order code + mobile number. No auth, no
DB — fixture-backed, ready to swap for an `abzar/api` call.

### Route

- **`(public)/order-tracking/page.tsx`** — RSC. `buildMetadata` (indexable) +
  `breadcrumbSchema([خانه, پیگیری سفارش])`. Renders the one client island.

### `features/order-tracking/`

| Area | Files |
| --- | --- |
| types | `trackingFormSchema` (Zod: `PA-######` code + `09xxxxxxxxx` mobile), `TrackedOrder` / `TimelineStep` / `TrackedItem` / `TrackingStatus` |
| data | `orders.ts` — `DEMO_ORDERS` fixture + `findDemoOrder(code, mobile)` (case-insensitive code, exact mobile) |
| hooks | `use-order-tracking.ts` — `safeParse` → `findDemoOrder` → `{ order, error }` |
| components | `order-tracking-view` (client orchestrator) → `tracking-hero` → `tracking-form` (client, 2 inputs + submit + alert); `tracking-result` → `tracking-timeline` (flex dot-rail, done = index ≤ current status), `shipping-info` (carrier + `IR…` parcel no.), `tracked-items` |
| index.ts | exports `OrderTrackingView`, `trackingFormSchema`, `TrackedOrder`/`TrackingStatus` |

State flow: all state client-side in `useOrderTracking` (owned by
`OrderTrackingView`). Form fields are local `useState` in `TrackingForm`, lifted to
the hook only on submit. No store slice, no URL state, no server round-trip — the
result panel mounts conditionally when a fixture matches.

Wiring: `routes.orderTracking = '/order-tracking'` (+ `PUBLIC_PATHS`); `PrimaryNav`
"پیگیری سفارش" link and checkout `SuccessStep` "پیگیری سفارش" link both repointed
here (were `/dashboard` and `/contact`); `sitemap.ts` += route (0.4 monthly).

Verified: `typecheck` + `lint` + `build` green.

---

## 2026-09-07 — Journal/blog (`/blog` + `/blog/[slug]`) — new `journal-page/` family

Replaced the placeholder journal with the full "مجله تکنورکس" (mockup "Puma Air Blog").
Index is server-filtered via `?cat=` (Zod-validated, noindex on filtered views —
canonical index only); the mockup's client tabs became crawlable `<Link>` pills.

### Routes

- **`(public)/blog/page.tsx`** — hero (stats + tabs), trending marquee strip, pinned
  featured card, 3-col grid, `NewsletterCta`. JSON-LD: breadcrumb + ItemList.
  `generateMetadata` mirrors `?cat=` for noindex.
- **`(public)/blog/[slug]/page.tsx`** — SSG (`generateStaticParams` over all 13
  articles), breadcrumb nav, category chip, meta row, ArticleBody prose, related
  links. JSON-LD: breadcrumb + `articleSchema`. Unknown slug → `notFound()`.

### `features/marketing/`

| Area | Files |
| --- | --- |
| types | `JournalCategory`, `JournalArticle`, `ArticleBlock` |
| data | `journal.ts` (13 articles + `FEATURED_SLUG` + `AUTHOR_NAME`), `journal-taxonomy.ts` (5 categories w/ chip classes + `JOURNAL_TRENDING`), `journal-bodies.ts` (`ARTICLE_BODIES` h/p blocks) |
| utils | `journal-params.ts` (`journalParamsSchema`, `toJournalList`), `journal-detail.ts` (`findArticle`, `relatedArticles`) |
| components/journal-page | `journal-hero` (+ `CategoryTabs`), `journal-sections` (`TrendingStrip`/`FeaturedArticle`/`JournalList`+card), `article-body` |

State flow: zero client state — filter lives in the URL (`?cat=slug`), server
re-renders; marquee/pulse are pure CSS; tag colors are per-category full class
literals (Tailwind-safe). Category split out of `journal.ts` to respect the
150-line cap.

Supporting: `icon-paths.ui.tsx` += `fire`, `scale`. Sitemap += all article slugs
(0.6 monthly). Barrel exports hero/strip/featured/list + params/detail utils.

Verified: `typecheck` + `lint` + `build` green; `/blog` ƒ SSR, `/blog/[slug]` ● SSG
×13.

---

## 2026-09-06 — About page (`/about`) — new `about-page/` section family

Replaced the English placeholder on `(public)/about` with the full Persian "درباره ما"
page (mockup "Puma Air About"). Server-rendered end to end; only client leaves are
`CountUp` (stats sweep) and the CSS-only `Reveal` entrances.

### Routes

- **`(public)/about/page.tsx`** — Persian `buildMetadata` (indexable) +
  `breadcrumbSchema([خانه, درباره ما])`; composes seven RSC sections.

### `features/marketing/components/about-page/`

| Component | Role |
| --- | --- |
| `about-hero` | Story badge + headline + intro over two ambient blobs |
| `mission-section` | Workshop media placeholder + checklist (3 assurance points) |
| `stats-band` | Dark `bg-ink` band; `CountUp` counters (۱۴+/۱۲۰۰۰+/۳۵۰+/۴۰+) |
| `timeline-section` | Alternating vertical timeline ۱۳۹۱→۱۴۰۵, center rail on lg, start-rail on mobile |
| `values-section` | 4 trust cards reusing `about/pillar-card` (award/handshake/wrench/headset) |
| `team-section` | 4 portrait placeholders + name/role |
| `about-cta` | Orange wholesale banner → `routes.contact`, drifting blob |
| `about-eyebrow` / `about-section-heading` | Shared pill kicker + centered heading pair |
| `about-cta-blob` | Decorative blob extracted to respect single responsibility |

### Supporting changes

- `data/about.ts` — `ABOUT_MISSION_POINTS`, `ABOUT_STATS`, `ABOUT_TIMELINE`,
  `ABOUT_VALUES`, `ABOUT_TEAM`; types `TimelineEntry` / `TeamMember` added to
  `marketing/types`.
- `animations.css` += `blob-float` keyframes + `animate-blob` utility
  (`prefers-reduced-motion` collapses it via the existing global reset).
- `icon-paths.ui.tsx` += `award`; `icon-paths.tools.tsx` += `handshake`.
- Barrel (`features/marketing/index.ts`) exports the seven sections.

State flow: fully static RSC — no store, no URL state; scroll entrances are pure CSS,
stat sweep is the existing `CountUp` IntersectionObserver leaf.

Verified: `typecheck` + `lint` + `build` green; `/about` prerendered static (○).

---

## 2026-09-05 — Customer account dashboard (`/dashboard/*`) — new `features/account/`

Rebuilt the `(dashboard)` route group from the generic SaaS scaffold into the
storefront's Persian, RTL customer account area (mockup "Puma Air Dashboard").
Every route `noindex`; still gated by `middleware.ts` (Edge) + the layout's
`getSession()` (defense in depth). The mockup's client-side tab SPA is split into
six real routes so each is server-rendered and directly linkable.

### Routes (`app/(dashboard)/`)

- **`layout.tsx`** — now just `getSession()` gate → `<AccountShell user>`. The old
  `DashboardTopbar` / `DashboardSidebar` (English SaaS chrome) are no longer
  mounted here (files left in place, unused).
- **`dashboard/page.tsx`** → `OverviewView` · **`dashboard/orders`** → `OrdersView`
  · **`dashboard/addresses`** → `AddressesView` · **`dashboard/account`** →
  `AccountView` · **`dashboard/wishlist`** → `WishlistView` ·
  **`dashboard/notifications`** → `NotificationsView`. Pages that need the user
  (`overview`, `account`) re-check `getSession()` and pass `SessionUser` down.
- `routes.dashboard` gains `orders` / `addresses` / `profile` / `wishlist` /
  `notifications`.
- `icon-paths.ui.tsx` += `clock`, `gift`, `pencil`, `logout`.

### `features/account/`

| Area | Files |
| --- | --- |
| types | `Order`/`OrderStatus`/`OrderStatusMeta`, `Address`, `WishlistItem`, `AccountNotification`, `StatCard`, `TrendPoint`, `AccountNavItem` |
| data | `orders.ts` (`ORDERS` + `ORDER_STATUS_META` + `FULFILMENT_STAGES`), `addresses.ts`, `wishlist.ts`, `notifications.ts` (+ `UNREAD_COUNT`), `overview.ts` (`STAT_CARDS`, `PURCHASE_TREND`, `MEMBERSHIP`), `nav.ts` (`ACCOUNT_NAV`) |
| utils | `orders.ts` — `statusMeta`, `itemCountLabel` |

Shell (RSC, client only on leaves): `AccountShell` → `AccountTopbar` (logo + bell
badge + avatar) + `AccountSidebar` (profile chip + nav + `AccountLogoutButton`) +
`AccountMobileNav` (horizontal-scroll nav shown < lg). `AccountNavLink` (client)
resolves active state via `usePathname`. `AccountLogoutButton` (client) calls
`logoutAction` directly with Persian copy.

Content components: `page-heading` (shared), `stat-card` + `stat-card-grid`,
`purchase-trend-card` (pure-CSS bar chart), `membership-card` (dark, `bg-ink`),
`recent-orders` + `order-row` (compact) + `order-status-badge`, `order-list`
(client — status filter) + `order-filter-tabs` (client) + `order-card` (client —
expand) + `order-timeline` (4-stage stepper), `address-card` + `add-address-button`,
`account-form` (client, visual — submit wires with `abzar/api`), `wishlist-card`
(client — optimistic remove), `notification-row`. Each `*-view` composes one
page. Barrel exports the shell + the six views only.

State flow: shell chrome is fully static RSC; the two interactive surfaces
(`OrderList` status filter + expanded card, `WishlistCard` remove) own local
`useState` — no store slice, no URL sync (single-visit account views).

Verified: `typecheck` + `lint` + `build` green; screenshots at 1360/1200/390px
across all six routes with a seeded session cookie, zero horizontal overflow.

---

## 2026-09-05 — Category landing pages (`/categories/[slug]`)

Per-department landing + catalog page, built on the existing catalog machinery
(mockup "Puma Air Category"). SSG for every stocked department, indexable.

### Route

- **`app/(public)/categories/[slug]/page.tsx`** — `generateStaticParams` over
  `stockedCategories()` (6 pages today; `measurement`/`spare-parts` have no mock
  products so they render on-demand + show the empty state). `generateMetadata`
  builds `خرید {title} صنعتی` title + the category `description`; `noindex` only when
  the visitor adds a *non-category* filter. JSON-LD: `breadcrumbSchema` +
  `itemListSchema` of the department's products. Renders `CategoryHero` →
  `PromoTicker` → `CategoryLanding`.
- `routes.category(slug)` = `/categories/${slug}`; `/categories` added to
  `PUBLIC_PATHS`. `sitemap.ts` emits every stocked category at priority 0.85.
- **`CategoryRailItem`** (home dept rail) now links to `routes.category(slug)`
  instead of the search page.

### `features/marketing` additions

| File | Role |
| --- | --- |
| `data/categories.ts` | `Category` type gains `description`; all 8 entries filled with SEO copy |
| `utils/category.ts` | `findCategory`, `stockedCategories`, `categoryProductCount` |
| `components/category/category-hero.tsx` | RSC — breadcrumb + tinted icon badge + title + description + count banner |
| `components/category/category-chips.tsx` | RSC — sibling-department pill nav, current = filled |
| `components/category/category-landing.tsx` | client — catalog scoped to one slug |

### Reused / parameterised

- **`useCatalogFilters(initial, { basePath?, lockedCategories? })`** — `basePath`
  chooses which path the URL mirror writes (`/products` default, `/categories/x`
  here); `lockedCategories` keeps the department pinned through `reset()` and omits
  it from the serialised query.
- **`CatalogSidebar`** gains `hideCategories` — the category facet is dropped on a
  page already scoped to one department; brand facet is narrowed to brands present
  in that category.
- `CategoryLanding` composes the existing `CatalogToolbar` / `ActiveFilterChips` /
  `CatalogResults` / `LoadMoreButton` / `MobileFilterDisclosure` / `CatalogEmpty`.

State flow: page parses `searchParams` → injects `categories:[slug]` → passes as
`initial` to `CategoryLanding`, which owns filter/sort/view state via
`useCatalogFilters` and mirrors it to `/categories/[slug]?…` with `history.replaceState`.

Verified: `typecheck` + `lint` + `build` green (6 category pages prerendered);
screenshots at 1360px & 390px + empty-state, zero horizontal overflow.

---

## 2026-09-05 — Cart (`/cart`) visual redesign — depth, colour, sale signalling

User feedback: the cart page felt "بی‌روح" (lifeless) — flat grey placeholders, thin
hairline borders, no colour beyond brand orange. Redesign reuses the site's existing
**category icon-chip** language (each `Category` carries `icon`/`tint`/`ink`) plus
elevation and sale cues. No layout/route changes; still `noindex`, still RSC-first
(client leaves unchanged).

### Store / data

- **`store/cart-store.ts`** — `CartLine` gains `compareAt?: number | null` (pre-discount
  unit price) and `categorySlug?: string` (drives the coloured badge). `addItem` signature
  unchanged — new fields flow through `Omit<CartLine,'quantity'>`.
- Threaded `compareAt` + `categorySlug` into all three `addItem` call sites:
  `AddToCartButton`, `ProductBuyBox` (marketing), `UpsellAddButton` (cart).
- **`features/cart/types` `ShippingMethod`** += `icon: IconName`; **`data/shipping.ts`**
  sets `truck` (standard) / `bolt` (express).
- **`features/marketing/index.ts`** now also exports `CATEGORIES`, `type Category`,
  `type Product` so the cart feature resolves categories through the barrel.

### New components / utils (`features/cart/`)

| File | Role |
| --- | --- |
| `utils/category-lookup.ts` | `categoryFor(slug)` → `Category` from `@/features/marketing` |
| `components/product-media-badge.tsx` | RSC — absolutely-positioned coloured icon chip on a product placeholder; `null` when no category |
| `components/cart-quantity-control.tsx` | client — rounded-pill stepper (`plus` icon + `−` glyph), extracted from the row to stay under 150 lines |
| `components/cart-heading.tsx` | RSC — `cart` icon chip + "سبد خرید شما (N کالا)" title, mirroring the `CartUpsells` heading |

### Redesigned

- **`CartItemRow`** — `shadow-sm` + `hover:-translate-y-0.5 hover:shadow-md`; media wrapped
  in `relative` + `ProductMediaBadge`; `variant` now a `bg-surface-sunken` pill; on-sale
  lines show the `bg-sale` `٪X` badge + struck-through `compareAt` (per unit, matching
  `ProductPrice`); new `CartQuantityControl`; حذف button muted → `hover:text-sale`.
  New props: `categorySlug`.
- **`CartItemList`** — takes `resolveCategory: (line) => slug | undefined`, forwards per row.
- **`CartPageView`** — builds `Map<productId, categorySlug>` from `upsellPool` (= full
  `PRODUCTS`); `resolveCategory = line.categorySlug ?? map.get(line.id)`; swaps the plain
  `<h1>` for `<CartHeading>`.
- **`FreeShippingBar`** — tinted icon chip; **celebratory green state at 100%** (green
  border/bg/track + `check` icon + "ارسال این سفارش رایگان شد 🎉"); `shadow-sm`.
- **`OrderSummary`** — `<p>خلاصه سفارش</p>` → `cart` icon-chip header; card gets `shadow-sm`.
- **`ShippingOption`** — icon chip (`method.icon`) between radio and label, filled
  `bg-brand-500` when selected — matches checkout's `PaymentOption`.
- **`OrderSummaryLines`** — highlighted green "شما … صرفه‌جویی کردید" savings row when
  `totals.discount > 0`.
- **`UpsellCard`** — `relative` media + `ProductMediaBadge`; `shadow-sm` +
  `hover:-translate-y-1 hover:shadow-md`.

Verified: `typecheck` + `lint` + `build` green; screenshots at 1360px & 390px, zero
horizontal overflow (`scrollWidth === clientWidth`).

---

## 2026-09-04 — Checkout (`/checkout`) — new `features/checkout/` domain, distraction-free shell

### Routes

- **New `app/(checkout)/` group** — replaces the old `(public)/checkout` placeholder.
  `layout.tsx` renders `CheckoutTopbar` only (logo + pulsing "پرداخت امن و
  رمزنگاری‌شده" badge) — no store header/nav/search/cart, matching the mockup's
  distraction-free checkout chrome (a standard pattern for cutting checkout abandonment).
  `checkout/page.tsx` renders `CheckoutPageView`, `noindex`.
- `/checkout` added to `PUBLIC_PATHS` (already in `robots.ts` disallow from the cart entry).

### `features/checkout/` (all new)

| Area | Files |
| --- | --- |
| types | `types/index.ts` — `CheckoutStep`, `Address`, `CheckoutPaymentMethod`, `PlacedOrder` |
| data | `data/addresses.ts`, `data/payment-methods.ts` (mock) |
| hooks | `use-checkout.ts` — address → payment → review → success state machine; `confirm(lines, total)` snapshots a `PlacedOrder` *before* the cart is cleared |

Components: `CheckoutStepper` (3-dot progress, done/active/upcoming), `CheckoutNextButton`
(shared forward/back pill — arrow leads+reversed for back, trails plain for forward),
`AddressStep` → `AddressCard` + `NewAddressForm` (visual-only scratch form), `PaymentStep`
→ `PaymentOption`, `ReviewStep` → `ReviewSection` (reusable edit-card) + `ReviewItemRow`,
`SuccessStep` (reuses the `auth-pulse`/`auth-pop` keyframes), `CheckoutSummarySidebar`,
`EmptyCheckout`, `CheckoutTopbar`. `CheckoutPageView` (client) ties it together — reads
`useCartStore` directly (same hydration-guard pattern as `CartPageView`), shows
`EmptyCheckout` when the cart is empty and the flow hasn't reached `success`, and **clears
the cart on confirm** (a real behavior the static mockup didn't have, since it only had
mock data).

### Fixed while building this

Two real overflow bugs (Tailwind's classic "flex/grid child won't shrink below its
max-content" trap), caught via headless-Chrome `scrollWidth` diagnostics at 390px width:
`CheckoutSummarySidebar`'s truncated line-item span needed `min-w-0 flex-1` (a
`truncate` span without it never actually shrinks), and the `grid lg:grid-cols-[1fr_*px]`
wrapper in both `CheckoutPageView` and `CartPageView` needed `min-w-0` on itself and its
children (an implicit grid track sizes to its widest descendant's max-content otherwise).
Both pages re-verified at 390px with zero horizontal scroll after the fix.

### Shared

- `icon-paths.tools.tsx` += `cash`, `pin`.

---

## 2026-09-04 — Cart (`/cart`) + checkout placeholder — new `features/cart/` domain

### Routes

- **`app/(public)/cart/page.tsx`** — RSC shell (`noindex`), renders `CartBreadcrumb` +
  `CartPageView`. Static, ~3.9 kB page.
- **`app/(public)/checkout/page.tsx`** — RSC placeholder ("پرداخت به‌زودی راه‌اندازی
  می‌شود") so the checkout button is never a dead link; links back to `/cart`.
- `routes.cart`, `routes.checkout` added; both added to `PUBLIC_PATHS`; `/cart` and
  `/checkout` added to `robots.ts` disallow (transactional, no SEO value).
- `CartButton` (header) now links to `routes.cart` instead of `routes.account`.

### Store

`store/cart-store.ts` — `CartLine` gained an optional `variant` (e.g. "آبی · ۱/۲ اینچ
استاندارد", set by `ProductBuyBox` from the selected color/model); added `setQuantity(id,
quantity)` (drops the line at `0`) and a `selectCartSubtotal` selector alongside the
existing `selectCartQuantity`.

### `features/cart/` (all new)

| Area | Files |
| --- | --- |
| types | `types/index.ts` — `ShippingMethod(Key)`, `CouponFeedback`, `CartTotals` |
| data | `data/shipping.ts` (`FREE_SHIPPING_THRESHOLD`, `SHIPPING_METHODS`) · `data/coupons.ts` (mock `PUMA10`/`PUMA20`) |
| utils | `utils/pick-upsells.ts` — in-stock products not already in the cart |
| hooks | `use-cart-totals.ts` (subtotal → discount → shipping → total) · `use-coupon.ts` (input/apply/feedback) |

Components: `CartBreadcrumb`, `FreeShippingBar`, `CartItemList` → `CartItemRow` (qty
stepper + remove; mobile stacks image/title/price, `sm:` switches to a 3-column grid),
`OrderSummary` (owns shipping-method + coupon state, composes `CouponField`,
`CouponMessage`, `ShippingMethods` → `ShippingOption`, `OrderSummaryLines`,
`CheckoutButton`), `CallForOrderBox`, `CartUpsells` → `UpsellCard` → `UpsellAddButton`,
`EmptyCart`. `CartPageView` (client) ties it together — reads `useCartStore`, guards
against the SSR/localStorage hydration flash (same pattern as `useCartQuantity`), and
renders `EmptyCart` when there are no lines.

### Shared cleanup

- Persian number formatting (`toPersianDigits`, `formatToman`, `discountPercent`) moved
  to **`lib/persian.ts`** (was `features/marketing/utils/persian.ts`, now a re-export
  shim so existing imports keep working). `features/auth/utils/format-fa.ts` builds on
  the same helper instead of duplicating it.
- `icon-paths.ui.tsx` += `trash`, `plus`.
- `features/marketing/index.ts` += `export type { Product }`.

---

## 2026-09-04 — Sign-in (`/login`) — phone + OTP flow, split screen

Replaces the email/password login with a Persian phone → OTP → (profile) → done flow.
`LoginForm` / `RegisterForm` and `loginAction` / `registerAction` were removed;
`auth.api.ts` + `logoutAction` + the token schemas stay for when `abzar/api` lands.

### Routes

- New **`app/(auth)/`** group (root layout only — no store header/footer).
- `(auth)/login/page.tsx` — RSC, `noindex`, renders `<AuthSplit><PhoneAuthFlow/></AuthSplit>`.
  Static, ~228 B page.
- `(auth)/register/page.tsx` — `permanentRedirect(routes.auth.login)` (the flow routes a new
  number to the profile step itself).
- Deleted `(public)/login/`, `(public)/register/`.

### `features/auth/` additions

| Area | Files |
| --- | --- |
| types | `types/phone-auth.ts` — `phoneSchema` · `otpSchema` · `profileSchema` (Zod), `AuthStep`, `OTP_LENGTH`, `RESEND_SECONDS`; re-exported from `types/index.ts` |
| data | `data/auth-content.ts` — `AUTH_TRUST_POINTS`, panel copy |
| services | `services/phone-auth.service.ts` — client mock (`requestOtp` / `verifyOtp` / `persistSession`); demo: `09121234567` = existing user, `00000` = rejected code |
| utils | `utils/format-fa.ts` — `toFaDigits`, `formatPhoneFa` |
| hooks | `use-phone-auth.ts` (state machine) · `use-otp-inputs.ts` (N-box field: change/backspace/paste/autofocus) · `use-resend-timer.ts` (countdown) |

### Components

`AuthSplit` (RSC) → `AuthBrandPanel` (RSC, dark, `auth-brand-panel.module.css` for the
spin/blob/float decoration) + right column.
`PhoneAuthFlow` (client) owns `usePhoneAuth`, renders `AuthProgress` + one of
`PhoneStep` / `OtpStep` / `ProfileStep` / `DoneStep`. Shared leaves: `StepHeading`,
`AuthField`, `AuthSubmit`, `AuthError`, `OtpInputs`, `ResendControl`.
State flow: `usePhoneAuth` holds step/phone/errors/`failures`/`isNewUser` and composes
`useResendTimer`; `OtpStep` owns `useOtpInputs` and reacts to `failures` (reset + shake).

### Shared / cross-cutting

- `BrandLogo` promoted `features/marketing/components/` → **`components/molecules/`**
  (domain-agnostic); marketing header/footer + auth panel import it from the barrel.
- `icon-paths.ui.tsx` += `arrowStart`, `alert`, `lock`, `userPlus`, `wallet`.
- `constants/regex.ts` += `phoneIR`, `otp5`.
- `styles/animations.css` += `auth-fade-up`, `auth-shake`, `auth-pulse`, `auth-pop`.

---

## 2026-09-04 — Product detail page (`/products/[slug]`) — SSG, JSON-LD, 3D viewer

### Route

- **`app/(public)/products/[slug]/page.tsx`** — `generateStaticParams` from `PRODUCTS`
  (`●` SSG, all 9 slugs prerendered). `generateMetadata` per product (title `نام | برند`,
  canonical `/products/<slug>`; `noindex` on unknown slug). `notFound()` for missing slug.
  Emits `breadcrumbSchema` (3 crumbs) + new **`productSchema`** (`Product` + `Offer` IRR +
  `AggregateRating`) as one JSON-LD script. Page JS 253 B / 145 kB First Load —
  **`three` is NOT in the bundle** (loaded on demand, see below).
- `routes.product(slug)` added; `sitemap.ts` now appends every product URL (imports
  `PRODUCTS` from `data/catalog` directly).
- `ProductCard` title + media now link to `routes.product(id)` (catalog + related nav).
- `cart-store.addItem(item, quantity?)` — accepts a quantity for the buy-box stepper.

### Detail data (mock, `features/marketing/`)

| File | Role |
| --- | --- |
| `types/product-detail.ts` | `ProductDetail` (gallery, keySpecs, colors, models, highlights, specs, reviews, ratingBars, faqs) + `SpecRow` · `Faq` · `ProductReview` · `RatingBar` · `ColorOption` |
| `data/product-details.ts` | `SPEC_TEMPLATES` / `HIGHLIGHTS` by `ProductGroup`, `COLOR_OPTIONS`, `MODELS_BY_CATEGORY`, `REVIEW_POOL`, `PRODUCT_FAQS`, gallery labels |
| `utils/product-detail.ts` | `getProductDetail(product)` · `ratingBars(rating)` (rating-weighted histogram) · `findProduct(slug)` · `relatedProducts(product, limit)` (same category first) |

### Components (`components/product-detail/`)

`ProductDetailView` (RSC) composes: `ProductBreadcrumb` → hero grid
[`ProductGallery` (client) · `ProductBuyBox` (client)] → `DetailTabs` (client, sticky,
IntersectionObserver-driven active state) → `DetailSection` ×4 wrapping `ProductDescription`
(+ `HighlightList`), `SpecTable`, `ProductReviews` (`ReviewSummary` + `RatingBar` +
`ReviewCard`), `ProductFaq` (native `<details>`, JS-free) → `RelatedProducts` (reuses
`ProductCard`). Buy-box atoms: `BuyBoxPrice` · `KeySpecChips` · `ColorSwatches` ·
`ModelPicker` · `QuantityStepper` · `StarRow`. The old cream guarantee strip was dropped —
`StoreFooter`'s trust bar already covers it site-wide.

### 3D viewer (`three` + `@react-three/fiber` v9 + `@react-three/drei` v10)

`ProductGallery` toggles `photo` ⇄ `stage`. `ProductStage` → `StageBoundary` (class error
boundary → graceful "پشتیبانی نمی‌شود" fallback if WebGL fails) → `next/dynamic(StageScene,
{ ssr: false })`. `StageScene` = an r3f `<Canvas>` with plain lights (no remote HDR),
`OrbitControls` (auto-rotate) and a **procedural stand-in impact wrench** (swap for a real
GLB later). Because it is `dynamic`+`ssr:false`, the `three` chunk is fetched only when the
viewer opens — First Load JS is unchanged.

### Deps / config

`three`, `@react-three/fiber`, `@react-three/drei` added; `@types/three` dev. R3F v9 augments
`declare module 'react' { JSX.IntrinsicElements }`, which turned `<Tag …>` (dynamic
`ElementType`) into `never` props — fixed by switching `Container` and `Reveal` to
`React.createElement`. `icon-paths.tsx` split into `icon-paths.tools.tsx` +
`icon-paths.ui.tsx` (150-line cap). `next.config` `optimizePackageImports` += `@react-three/drei`.

---

## 2026-09-04 — Catalog page (`/products`) — faceted, URL-synced, RSC shell

### Route

- **`app/(public)/products/page.tsx`** — `ƒ` dynamic (reads `searchParams`). `generateMetadata`
  parses params → `noindex` when any filter is active (`hasActiveFilters`), canonical always
  clean `/products`. Emits `breadcrumbSchema` + `itemListSchema(PRODUCTS)` as one JSON-LD
  script. Renders `<CatalogHero>` (RSC breadcrumb + h1 + SEO copy) → `<PromoTicker>` (reused)
  → `<ProductCatalog>` (client island). Page JS 227 B / 141 kB First Load (== home).
- `routes.products = '/products'` added; `PUBLIC_PATHS` + `sitemap.ts` (priority 0.9) updated.
- `PRIMARY_NAV` "پرفروش‌ها" → **"همه محصولات" → `routes.products`**; footer category links now
  deep-link `?category=<slug>`.

### Data / logic (`features/marketing/`)

| File | Role |
| --- | --- |
| `types/catalog.ts` | `CatalogFilters` · `SortKey` · `CatalogView` · `FilterChip` + option consts (`SORT_/DISCOUNT_/RATING_/USAGE_OPTIONS`, `CATALOG_MAX_PRICE`) |
| `utils/catalog-params.ts` | Zod `catalogParamsSchema` (csv category/brand, coerced numerics, enum guards) · `toCatalogState` · `toCatalogSearch` · `hasActiveFilters` · `DEFAULT_FILTERS` |
| `utils/catalog-filter.ts` | pure `applyCatalogFilters(products, filters, sort)` · `categoryCounts` · `catalogBrands` |
| `utils/catalog-chips.ts` | `buildFilterChips(filters, patch, categoryTitle)` → removable pills |
| `hooks/use-catalog-filters.ts` | `'use client'` — owns filters/sort/view, mirrors to URL via `window.history.replaceState` (no RSC round-trip); exposes `toggleCategory/Brand`, `setMaxPrice/MinDiscount/MinRating/Usage`, `toggleInStock`, `reset`, `patch` |

### Components (`components/catalog/`)

`product-catalog.tsx` (client top-level) composes: `MobileFilterDisclosure` (collapses the
panel `<lg`, sticky column `lg`) → `CatalogSidebar` → `CatalogToolbar`
(`SortMenu` client dropdown + `ViewToggle`) → `ActiveFilterChips` → `CatalogResults`
(grid `ProductCard` / list `ProductListRow`) → `LoadMoreButton` (`PAGE_SIZE = 6`) or
`CatalogEmpty`. Sidebar atoms: `FilterSection` · `FilterCheckbox` · `FilterRadioGroup` ·
`PriceRangeFilter` · `UsageToggle`.

### Product card — out-of-stock

`product-card.tsx` split: new `ProductMedia` (grayscale + "ناموجود" overlay when
`!inStock`), new `NotifyButton` (client, replaces `AddToCartButton` when out of stock).
New `ProductListRow` reuses badge/media/price/rating for list view. 7 icons added
(`chevronDown`, `close`, `bell`, `sliders`, `sort`, `grid`, `list`).

### State flow

`searchParams` → server `toCatalogState` → `initial` prop → `useCatalogFilters` seeds
client state → user edits mutate state → `useEffect` serializes back to the URL. Results are
`useMemo(applyCatalogFilters)`; `visibleCount` (load-more) resets to `PAGE_SIZE` on any
filter/sort change. `PRODUCTS` re-exported via `data/catalog.ts` from `data/products.ts`
(9 items, extended `Product`: `categorySlug`, `group`, `brand`, `usage`, `inStock`,
`description`).

---

## 2026-09-04 — Storefront home page (`تکنورکس`) + RTL/Persian foundation

### Foundation

- **Locale/RTL:** root `layout.tsx` → `lang="fa" dir="rtl"`; `Vazirmatn` (arabic+latin)
  as `--font-vazirmatn`/body, `Space_Grotesk` as `--font-space-grotesk` → `--font-display`
  (numerals, eyebrows). `NEXT_PUBLIC_SITE_NAME` = `تکنورکس` in `.env.local`/`.env.example`.
- **Design tokens** (`styles/globals.css` `@theme`): rust brand ramp (`--color-brand-*`),
  `--color-accent-*` (gold), `--color-ink`, `--color-sale`, `--color-info`, warm surface
  ramp (`surface` / `surface-muted` = body / `surface-sunken`), `--color-hairline`,
  `--radius-card: 1.375rem`. **Storefront is committed light** — dark blocks removed,
  `color-scheme: light`; dark theming reserved for the dashboard.
- **Animations** (`styles/animations.css`): `marquee-forward` / `marquee-reverse` keyframes;
  `.reveal` = one-shot on-load `reveal-in` entrance (never scroll- or JS-gated, always
  settles visible; reduced-motion reset collapses it).
- `config/site.ts` rewritten (Persian copy, phone/email/address, `links` = instagram/
  telegram/whatsapp). `lib/json-ld.ts` gained `websiteSchema` (SearchAction),
  `localBusinessSchema` (`HardwareStore`), `itemListSchema`. `robots.ts` disallows `/search`.
- `config/routes.ts` + `search`, `account`. New stub route `(public)/search` (SSR,
  Zod-parsed `?q`, `noindex`).

### Shared primitives (`components/`)

| Atom | Purpose |
| --- | --- |
| `atoms/icons/{icon-paths.tsx,icon.tsx}` | 1em stroked `<Icon name>` registry (~28 icons), no `dangerouslySetInnerHTML` |
| `atoms/media-placeholder.tsx` (+`.module.css`) | zero-CLS striped stand-in for `next/image` |
| `atoms/count-up.tsx` | `'use client'` — SSR-renders the real figure, rewinds + sweeps on view |
| `atoms/container.tsx` | page-width wrapper (`max-w-[1400px]` + responsive gutter) |
| `atoms/pill-link.tsx` | `next/link` styled as a pill button (primary/outline/ghost) |
| `molecules/marquee/` | `<Marquee reverse speed>` — content rendered twice, copy `aria-hidden` |
| `molecules/reveal.tsx` | RSC `.reveal` wrapper (CSS-only entrance) |
| `molecules/section-heading.tsx` | eyebrow + `h2` + optional trailing `action` |

Old `components/organisms/site-header.tsx` + `site-footer.tsx` **deleted**
(`organisms/index.ts` now only exports `DashboardSidebar`).

### Feature: `features/marketing/` (storefront)

```
features/marketing/
├── anchors.ts                 SECTION ids + anchor()
├── data/{navigation,categories,catalog,content}.ts   mock content (Persian)
├── types/index.ts             Category · Product · Deal · PromoCard · ValueProp · …
├── utils/persian.ts           toPersianDigits · formatToman · discountPercent
├── hooks/use-cart-quantity.ts hydration-safe cart count
├── services/newsletter.actions.ts   'use server' — Zod-validated opt-in (ActionResult)
├── components/
│   ├── store-header.tsx  ← announcement-bar · brand-logo · header-search (GET /search)
│   │                        · header-actions · cart-button (client) · primary-nav
│   ├── hero/             hero · hero-badge · hero-headline (client, rotating word)
│   │                     · hero-stats (CountUp) · hero-showcase · hero-floating-card
│   ├── category-rail/    category-rail · category-rail-item (data-driven chip colour)
│   ├── flash-deals/      flash-deals · deals-countdown (client) · deal-card
│   ├── promo-cards/      promo-cards · promo-card
│   ├── products/         product-showcase (client, tab state) · product-tabs (client)
│   │                     · product-card · product-badge · product-price · rating-stars
│   │                     · wishlist-button (client) · add-to-cart-button (client)
│   ├── promo-ticker.tsx · value-props/ · about/ · testimonials/ (client) · brand-strip.tsx
│   ├── newsletter-cta.tsx (client, useActionState + .module.css)
│   └── journal/ · footer/ (store-footer · trust-bar · social-links · nav-column · contact)
└── index.ts               barrel — components + `PRODUCTS`; never re-exports `*.actions.ts`
```

### State flow

- **Cart:** `store/cart-store.ts` (new, persisted `pumaair-cart`) — `addItem` /
  `selectCartQuantity`. `AddToCartButton` writes; `CartButton` reads via
  `useCartQuantity` (0 until hydrated → no badge mismatch).
- **Tabs:** `ProductShowcase` owns `tab` state, filters `PRODUCTS` by `group`, feeds
  `ProductTabs` (controlled) + grid.
- **Testimonials / hero word:** local `useState` + `setInterval` (paused under
  reduced-motion). **Countdown:** deadline set on client mount, ticks 1 s.
- **Newsletter:** `useActionState(subscribeToNewsletter)` → server Zod validation →
  `ActionResult`; success swaps the form for a confirmation.

### Routing / SEO

- `(public)/layout.tsx` → skip-link + `StoreHeader` / `StoreFooter` from the feature.
- `(public)/page.tsx` — static; all 12 sections composed; injects `websiteSchema` +
  `localBusinessSchema` + `itemListSchema(PRODUCTS)` as one JSON-LD script; metadata via
  `buildMetadata`. Every section is `aria-labelledby` a real heading; `scroll-mt-24`
  for anchor offset. First Load JS ≈ 123 kB (page 220 B — RSC-first, ~8 small client leaves).

---

## 2026-09-03 — Operating mandate codified in CLAUDE.md

Folded the full enterprise mandate (directory law, Tailwind v4 + CSS Modules hybrid,
150-line cap, `any` ban, RSC-first, cloud.md protocol, SEO/CWV rules, OWASP/RBAC/CSRF/XSS
standards) into `CLAUDE.md` as the binding contract. Added gap-fills: API-route Zod
validation rule, `searchParams` validation, `next/image` + `next/font` mandate, CSP as a
pre-launch TODO, `dangerouslySetInnerHTML` policy (JSON-LD only), providers roadmap
(Toast + Session), and a quick-reference table. Updated stale `pnpm lint` description
(now `eslint --max-warnings 0`, not `next lint`).

---

## 2026-09-03 — Foundation scaffold

### Stack

| Concern            | Choice                                                        |
| ------------------ | ------------------------------------------------------------ |
| Framework          | Next.js 15 (App Router, RSC-first)                          |
| Language           | TypeScript 5.7 (`strict`, `noUncheckedIndexedAccess`)       |
| Styling            | Tailwind CSS v4 (CSS-first `@theme`) + CSS Modules hybrid   |
| Data fetching (client) | TanStack Query v5                                       |
| Global state       | Zustand v5 (persisted)                                      |
| Validation         | Zod (env, inputs, API responses, JWT payload)               |
| Backend            | **External** — `abzar/api` (this app is frontend + BFF only) |
| Auth               | API-issued JWT in HttpOnly `abzar_session` cookie           |

### Directory contract

```
src/
  app/(public)      RSC marketing site + auth pages
  app/(dashboard)   Server-gated portal shell
  app/api           BFF route handlers (health, auth/me)
  components/{atoms,molecules,organisms}
  features/<domain>/{components,hooks,services,types,utils}
  config            env (zod), routes, site
  constants         enums, regex
  lib               api-client, jwt, session, rbac, seo, json-ld, utils
  providers         AppProviders → QueryProvider → ThemeProvider
  store             ui-store (theme, sidebar)
  styles            globals.css, animations.css
  types             LayoutProps, PageProps, ActionResult
```

### Routes

| Path                          | Group       | Rendering | Guard                         |
| ----------------------------- | ----------- | --------- | ----------------------------- |
| `/`                           | (public)    | RSC       | —                             |
| `/about`                      | (public)    | RSC       | — (+ Breadcrumb JSON-LD)      |
| `/login`, `/register`         | (public)    | RSC+form  | redirect to `/dashboard` if session |
| `/dashboard`                  | (dashboard) | RSC       | middleware + layout `getSession` |
| `/dashboard/analytics`        | (dashboard) | RSC       | as above                      |
| `/dashboard/admin/users`      | (dashboard) | RSC       | middleware + page `isAdmin`   |
| `/api/health`                 | api         | dynamic   | —                             |
| `/api/auth/me`                | api         | dynamic   | session cookie → `abzar/api`  |
| `/sitemap.xml`, `/robots.txt` | app         | static    | —                             |

### Features

- **auth** — `loginSchema`/`registerSchema`/`authTokensSchema` (types),
  `authApi` (server-only api wrappers), `loginAction`/`registerAction`/`logoutAction`
  (server actions, set/clear cookie), `LoginForm`/`RegisterForm`/`LogoutButton`,
  `useCurrentUser` (client, hits `/api/auth/me`), `formatRole`.
- **marketing** — `Hero`, `FeatureGrid` (pure RSC sections for `/`).
- **dashboard-shell** — `DashboardTopbar` (RSC) + `SidebarToggle` (client leaf).

### State flows

- **Session**: `abzar/api` issues JWT → `setSessionCookie` (HttpOnly, SameSite=Lax,
  Secure in prod) → `middleware` decodes for routing (edge, `lib/jwt`) → server
  components read via `getSession` (`lib/session`) → client reads via `useCurrentUser`.
- **Theme**: `ui-store.theme` (persisted) → `ThemeProvider` sets `<html data-theme>`.
- **Sidebar**: `ui-store.sidebarOpen` (persisted) ↔ `SidebarToggle` / `DashboardSidebar`.

### Components

| Layer     | Components                                            |
| --------- | ---------------------------------------------------- |
| atoms     | Button, Input, Badge, Heading/Text, Spinner         |
| molecules | FormField, Card/CardHeader/CardTitle                 |
| organisms | SiteHeader, SiteFooter, DashboardSidebar             |
