"use client";

import { dealsPageSchema, type Deal } from "@/app/types/deal";
import { ArrowDown, LoaderCircle, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  initialDeals: Deal[];
  totalDeals: number;
};

function getCategories(deals: Deal[]): string[] {
  return Array.from(new Set(deals.map((deal) => deal.category))).sort();
}

export function DealFilters({ initialDeals, totalDeals }: DealFiltersProps) {
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [deals, setDeals] = useState(initialDeals);
  const [availableDealCount, setAvailableDealCount] = useState(totalDeals);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
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
      : "on the current board";
  const resultsSummary = `${visibleDeals.length} ${
    visibleDeals.length === 1 ? "find" : "finds"
  } ${resultsContext}`;

  const shopLayout = useShopStore((state: TStore) => state.layout);
  const setShopLayout = useShopStore((state: TStore) => state.setLayout);
  const hasMoreDeals = deals.length < availableDealCount;

  const handleLoadMore = useCallback(async () => {
    setIsLoadingMore(true);
    setLoadMoreError(null);

    try {
      const response = await fetch(`/api/deals?skip=${deals.length}`);
      const responseBody: unknown = await response.json();

      if (!response.ok) {
        throw new Error("The next set of finds is unavailable right now.");
      }

      const nextPage = dealsPageSchema.parse(responseBody);

      setDeals((currentDeals) => {
        const existingIds = new Set(currentDeals.map((deal) => deal.id));
        const uniqueNewDeals = nextPage.deals.filter(
          (deal) => !existingIds.has(deal.id),
        );

        return [...currentDeals, ...uniqueNewDeals];
      });
      setAvailableDealCount(nextPage.total);
    } catch {
      setLoadMoreError(
        "The next set of finds is unavailable right now. Try again.",
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [deals.length]);

  return (
    <section aria-label="Deal collection">
      <div className="sticky top-0 z-20 border-y border-[var(--line)] bg-[color:rgba(247,248,250,0.97)]">
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
                  placeholder="Search Scout finds"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="site-shell py-7 sm:py-11">
        <div className="mb-6 grid gap-3 border-b border-[var(--line)] pb-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
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
              Search or narrow by category to refine the board.
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
          <div className="grid min-h-80 place-items-center border border-dashed border-[var(--line)] bg-[var(--white)] px-6 text-center">
            <div>
              <p className="text-2xl font-bold tracking-[-0.03em]">
                No finds match that check.
              </p>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Try a broader search or choose another category.
              </p>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center border-t border-[var(--line)] pt-7 text-center">
          {hasMoreDeals ? (
            <>
              <p className="text-sm text-[var(--muted)]">
                Showing {deals.length} of {availableDealCount} finds
              </p>
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="button-primary mt-4 disabled:cursor-not-allowed disabled:opacity-60"
                aria-busy={isLoadingMore}
              >
                {isLoadingMore ? (
                  <LoaderCircle
                    aria-hidden="true"
                    className="size-4 animate-spin"
                  />
                ) : (
                  <ArrowDown
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.8}
                  />
                )}
                {isLoadingMore ? "Loading more finds" : "Load more finds"}
              </button>
              {loadMoreError && (
                <p
                  className="mt-3 text-sm font-medium text-[var(--signal)]"
                  role="alert"
                >
                  {loadMoreError}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-[var(--muted)]">
              You&apos;ve reached the end of the Scout board.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
