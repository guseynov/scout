"use client";

import type { Deal } from "@/app/types/deal";
import { Search } from "lucide-react";
import type { ChangeEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import { CategoryFilterButton } from "./CategoryFilterButton";
import { DealCard } from "./DealCard";
import { DealFilter } from "./dealFilter";

type DealFiltersProps = {
  deals: Deal[];
};

function getCategories(deals: Deal[]): string[] {
  return Array.from(new Set(deals.map((deal) => deal.category))).sort();
}

export function DealFilters({ deals }: DealFiltersProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(DealFilter.AllCategories);

  const categories = useMemo(() => getCategories(deals), [deals]);
  const visibleDeals = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return deals.filter((deal) => {
      const matchesCategory =
        category === DealFilter.AllCategories || deal.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${deal.title} ${deal.description} ${deal.category}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, deals, query]);

  const handleCategorySelect = useCallback((selectedCategory: string) => {
    setCategory(selectedCategory);
  }, []);

  const handleQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [],
  );

  const handleClearFilters = useCallback(() => {
    setQuery("");
    setCategory(DealFilter.AllCategories);
  }, []);

  const hasActiveFilters =
    query.length > 0 || category !== DealFilter.AllCategories;
  const resultsContext =
    category !== DealFilter.AllCategories
      ? `in ${category}`
      : "in the current edit";
  const resultsSummary = `${visibleDeals.length} ${
    visibleDeals.length === 1 ? "find" : "finds"
  } ${resultsContext}`;

  return (
    <section aria-label="Deal collection">
      <div className="sticky top-0 z-20 border-y border-black/10 bg-[color:rgba(245,242,234,0.92)] backdrop-blur-xl">
        <div className="site-shell py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1 lg:max-w-[70%] lg:pb-0">
              <CategoryFilterButton
                category={DealFilter.AllCategories}
                isSelected={category === DealFilter.AllCategories}
                label="All"
                onSelect={handleCategorySelect}
              />
              {categories.map((item) => (
                <CategoryFilterButton
                  key={item}
                  category={item}
                  isSelected={category === item}
                  label={item}
                  onSelect={handleCategorySelect}
                />
              ))}
            </div>
            <label className="search-field">
              <span className="sr-only">Search deals</span>
              <Search aria-hidden="true" className="size-5" strokeWidth={1.5} />
              <input
                type="search"
                value={query}
                onChange={handleQueryChange}
                placeholder="Search the collection"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="site-shell py-10 sm:py-14">
        <div className="mb-8 flex items-center justify-between gap-4">
          <p
            className="min-w-0 truncate text-sm text-[var(--muted)]"
            aria-live="polite"
            title={resultsSummary}
          >
            <strong className="font-semibold text-[var(--ink)]">
              {visibleDeals.length}
            </strong>{" "}
            {visibleDeals.length === 1 ? "find" : "finds"}
            {` ${resultsContext}`}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-link text-sm"
            >
              Clear filters
            </button>
          )}
        </div>

        {visibleDeals.length > 0 ? (
          <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleDeals.map((deal, index) => (
              <DealCard key={deal.id} deal={deal} priority={index < 4} />
            ))}
          </div>
        ) : (
          <div className="grid min-h-80 place-items-center rounded-[2rem] border border-dashed border-black/15 bg-white/35 px-6 text-center">
            <div>
              <p className="font-serif text-3xl">Nothing in this corner yet.</p>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Try a broader search or another category.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
