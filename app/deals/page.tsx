import Link from "next/link";
import { Suspense } from "react";
import { BrandLockup } from "@/app/components/BrandLockup";
import { QueryProvider } from "@/app/components/QueryProvider";
import { getDealsPage } from "@/app/lib/deals";
import { DealFilters } from "./DealFilters";

export default async function DealsPage() {
  const { deals, total } = await getDealsPage();

  return (
    <main className="min-h-screen bg-[var(--canvas)]">
      <nav
        className="site-nav site-shell flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <BrandLockup />
        <Link href="/" className="text-link text-sm">
          About Scout
        </Link>
      </nav>

      <header className="site-shell py-11 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="utility-label">Current find board</p>
            <h1 className="page-title mt-4 max-w-4xl">The current Scout list.</h1>
          </div>
          <p className="max-w-sm text-base leading-7 text-[var(--muted)] lg:justify-self-end lg:pb-2">
            A practical shortlist of products people think are worth a look.
            Filter the board, then open a find for the facts.
          </p>
        </div>
      </header>

      <QueryProvider>
        <Suspense fallback={null}>
          <DealFilters initialDeals={deals} totalDeals={total} />
        </Suspense>
      </QueryProvider>

      <footer className="site-shell mt-20 flex flex-col gap-5 border-t border-[var(--line)] py-10 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>Found something useful? Pass it on.</p>
        <Link href="/" className="text-link text-[var(--ink)]">
          Back to Scout
        </Link>
      </footer>
    </main>
  );
}
