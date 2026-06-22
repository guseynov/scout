"use client";

import type { Deal } from "@/app/types/deal";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { debounce } from "throttle-debounce";
import { CategoryFilterButton } from "./CategoryFilterButton";
import { DealCard } from "./DealCard";
import {
  DealFilter,
  MAX_DEAL_QUERY_LENGTH,
  DealFilterParam,
  normalizeDealQuery,
  resolveDealCategory,
} from "./dealFilter";
import LayoutSelector from "../components/LayoutSelector";
import { LayoutModel, TStore, useShopStore } from "./store";

type DealFiltersProps = {
  deals: Deal[];
};

function getCategories(deals: Deal[]): string[] {
  return Array.from(new Set(deals.map((deal) => deal.category))).sort();
}

export function DealFilters({ deals }: DealFiltersProps) {
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const categories = useMemo(() => getCategories(deals), [deals]);
  const query = normalizeDealQuery(searchParams.get(DealFilterParam.Query));
  const category = resolveDealCategory(
    searchParams.get(DealFilterParam.Category),
    categories,
  );

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

  const createFilterUrl = useCallback(
    (nextQuery: string, nextCategory: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (nextQuery.trim()) {
        params.set(DealFilterParam.Query, nextQuery);
      } else {
        params.delete(DealFilterParam.Query);
      }

      if (nextCategory !== DealFilter.AllCategories) {
        params.set(DealFilterParam.Category, nextCategory);
      } else {
        params.delete(DealFilterParam.Category);
      }

      const queryString = params.toString();

      return queryString ? `?${queryString}` : window.location.pathname;
    },
    [searchParams],
  );

  const handleQueryChange = useCallback(
    (nextQuery: string) => {
      window.history.replaceState(
        null,
        "",
        createFilterUrl(nextQuery, category),
      );
    },
    [category, createFilterUrl],
  );

  const debouncedHandleQueryChange = useMemo(
    () => debounce(300, handleQueryChange),
    [handleQueryChange],
  );

  useEffect(() => {
    return () => {
      debouncedHandleQueryChange.cancel();
    };
  }, [debouncedHandleQueryChange]);

  const handleSearchInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      debouncedHandleQueryChange(normalizeDealQuery(event.currentTarget.value));
    },
    [debouncedHandleQueryChange],
  );

  const handleCategorySelect = useCallback(
    (selectedCategory: string) => {
      const currentQuery = normalizeDealQuery(
        searchInputRef.current?.value ?? query,
      );

      debouncedHandleQueryChange.cancel();
      window.history.pushState(
        null,
        "",
        createFilterUrl(currentQuery, selectedCategory),
      );
    },
    [createFilterUrl, debouncedHandleQueryChange, query],
  );

  const handleClearFilters = useCallback(() => {
    debouncedHandleQueryChange.cancel();

    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }

    window.history.pushState(
      null,
      "",
      createFilterUrl("", DealFilter.AllCategories),
    );
  }, [createFilterUrl, debouncedHandleQueryChange]);

  const hasActiveFilters =
    query.length > 0 || category !== DealFilter.AllCategories;
  const resultsContext =
    category !== DealFilter.AllCategories
      ? `in ${category}`
      : "in the current collection";
  const resultsSummary = `${visibleDeals.length} ${
    visibleDeals.length === 1 ? "find" : "finds"
  } ${resultsContext}`;

  const shopLayout = useShopStore((state: TStore) => state.layout);
  const setShopLayout = useShopStore((state: TStore) => state.setLayout);

  return (
    <section aria-label="Deal collection">
      <div className="sticky top-0 z-20 border-y border-black/10 bg-[color:rgba(245,242,234,0.92)] backdrop-blur-xl">
        <div className="site-shell py-3.5 sm:py-4">
          <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
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

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <LayoutSelector layout={shopLayout} onChange={setShopLayout} />

              <label className="search-field">
                <span className="sr-only">Search deals</span>
                <Search aria-hidden="true" strokeWidth={1.5} />
                <input
                  ref={searchInputRef}
                  type="search"
                  defaultValue={query}
                  onChange={handleSearchInputChange}
                  maxLength={MAX_DEAL_QUERY_LENGTH}
                  placeholder="Search the collection"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="site-shell py-7 sm:py-11">
        <div className="mb-6 grid gap-3 border-b border-black/10 pb-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
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
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-link text-sm lg:justify-self-end"
            >
              Clear filters
            </button>
          ) : (
            <p className="text-sm text-[var(--muted)] lg:justify-self-end">
              Search or narrow by category to refine the collection.
            </p>
          )}
        </div>

        {visibleDeals.length > 0 ? (
          <div
            className={
              shopLayout === LayoutModel.Comfortable
                ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                : "grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4"
            }
          >
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
