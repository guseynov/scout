import Link from "next/link";
import { Suspense } from "react";
import { QueryProvider } from "@/app/components/QueryProvider";
import { getDeals } from "@/app/lib/deals";
import { DealFilters } from "./DealFilters";

export default async function DealsPage() {
  const deals = await getDeals();

  return (
    <main className="min-h-screen bg-[var(--canvas)]">
      <nav
        className="site-shell flex h-20 items-center justify-between border-b border-black/10"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold tracking-[-0.02em]"
        >
          <span className="grid size-9 place-items-center rounded-full bg-[var(--ink)] text-sm font-semibold text-white">
            C
          </span>
          Common Good
        </Link>
      </nav>

      <header className="site-shell pb-10 pt-14 sm:pb-14 sm:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow">The community collection</p>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-8xl">
              Things worth
              <span className="italic text-[var(--accent-dark)]">
                {" "}
                passing on.
              </span>
            </h1>
          </div>
          <p className="max-w-sm text-base leading-7 text-[var(--muted)] lg:pb-2">
            A living shortlist of useful, delightful, and well-priced finds.
            Selected with care, refreshed often.
          </p>
        </div>
      </header>

      <QueryProvider>
        <Suspense fallback={null}>
          <DealFilters deals={deals} />
        </Suspense>
      </QueryProvider>

      <footer className="site-shell mt-20 flex flex-col gap-5 border-t border-black/10 py-10 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>Good finds should travel. Share one with your people.</p>
        <Link href="/" className="text-link text-[var(--ink)]">
          Back to Common Good
        </Link>
      </footer>
    </main>
  );
}
