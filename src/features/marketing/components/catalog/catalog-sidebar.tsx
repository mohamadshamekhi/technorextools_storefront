import { Icon } from '@/components/atoms';

import { DISCOUNT_OPTIONS, RATING_OPTIONS, type CatalogFilters } from '../../types/catalog';
import type { useCatalogFilters } from '../../hooks/use-catalog-filters';
import { FilterCheckbox } from './filter-checkbox';
import { FilterRadioGroup } from './filter-radio-group';
import { FilterSection } from './filter-section';
import { PriceRangeFilter } from './price-range-filter';
import { UsageToggle } from './usage-toggle';

type Actions = ReturnType<typeof useCatalogFilters>;

type CatalogSidebarProps = {
  filters: CatalogFilters;
  actions: Actions;
  categories: { slug: string; title: string; count: number }[];
  brands: string[];
  /** Hide the category facet — used when the page is already scoped to one department. */
  hideCategories?: boolean;
};

export function CatalogSidebar({
  filters,
  actions,
  categories,
  brands,
  hideCategories = false,
}: CatalogSidebarProps) {
  return (
    <aside className="border-hairline bg-surface rounded-card border p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2 font-bold">
          <Icon name="sliders" className="text-brand-600 size-4" />
          فیلترها
        </span>
        <button
          type="button"
          onClick={actions.reset}
          className="text-brand-600 hover:text-brand-700 text-xs font-bold"
        >
          حذف همه
        </button>
      </div>

      {hideCategories ? null : (
        <FilterSection title="دسته‌بندی">
          <div className="flex flex-col">
            {categories.map((category) => (
              <FilterCheckbox
                key={category.slug}
                label={category.title}
                count={category.count}
                checked={filters.categories.includes(category.slug)}
                onToggle={() => actions.toggleCategory(category.slug)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      <FilterSection title="محدوده قیمت">
        <PriceRangeFilter value={filters.maxPrice} onChange={actions.setMaxPrice} />
      </FilterSection>

      <FilterSection title="برند">
        <div className="flex flex-col">
          {brands.map((brand) => (
            <FilterCheckbox
              key={brand}
              label={brand}
              checked={filters.brands.includes(brand)}
              onToggle={() => actions.toggleBrand(brand)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="میزان تخفیف">
        <FilterRadioGroup
          name="discount"
          options={DISCOUNT_OPTIONS}
          value={filters.minDiscount}
          onChange={actions.setMinDiscount}
        />
      </FilterSection>

      <FilterSection title="امتیاز مشتریان">
        <FilterRadioGroup
          name="rating"
          options={RATING_OPTIONS}
          value={filters.minRating}
          onChange={actions.setMinRating}
        />
      </FilterSection>

      <FilterSection title="کاربری">
        <UsageToggle value={filters.usage} onChange={actions.setUsage} />
      </FilterSection>

      <FilterSection title="موجودی" last>
        <FilterCheckbox
          label="فقط کالاهای موجود"
          checked={filters.inStockOnly}
          onToggle={actions.toggleInStock}
        />
      </FilterSection>
    </aside>
  );
}
