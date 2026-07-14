import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, PackageCheck, Star, Truck } from "lucide-react";
import { getDealDetails } from "@/app/lib/dealDetails";
import { ProductGallery } from "./ProductGallery";
import { ShareDealButton } from "./ShareDealButton";

type DealPageProps = {
  params: Promise<{ id: string }>;
};

function getDealId(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;

  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function formatCategory(category: string) {
  return category.replaceAll("-", " ");
}

function getAvailabilityCopy(stock: number, availabilityStatus: string) {
  if (stock <= 0) return "Currently unavailable";
  return availabilityStatus;
}

async function getPageDeal(idValue: string) {
  const id = getDealId(idValue);
  if (!id) notFound();

  try {
    return await getDealDetails(id);
  } catch {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: DealPageProps): Promise<Metadata> {
  const { id } = await params;
  const deal = await getPageDeal(id);

  return {
    title: deal.title,
    description: deal.description,
  };
}

export default async function DealPage({ params }: DealPageProps) {
  const { id } = await params;
  const deal = await getPageDeal(id);
  const availability = getAvailabilityCopy(deal.stock, deal.availabilityStatus);

  return (
    <main className="min-h-screen bg-[var(--canvas)]">
      <nav
        className="site-shell flex min-h-20 items-center justify-between gap-4 border-b border-black/10"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 font-semibold tracking-[-0.02em]"
        >
          <span className="grid size-9 place-items-center rounded-full bg-[var(--ink)] text-sm font-semibold text-white">
            C
          </span>
          <span className="hidden sm:inline">Common Good</span>
        </Link>
        <Link href="/deals" className="text-link text-sm">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to collection
        </Link>
      </nav>

      <div className="site-shell py-7 sm:py-10 lg:py-14">
        <div className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--muted)] sm:mb-10">
          <Link href="/deals" className="text-link text-[var(--ink)]">
            The collection
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/deals?category=${encodeURIComponent(deal.category)}`}
            className="capitalize transition-colors hover:text-[var(--ink)] hover:underline"
          >
            {formatCategory(deal.category)}
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(23rem,0.86fr)] lg:gap-16 xl:gap-24">
          <ProductGallery images={deal.images} title={deal.title} />

          <section
            className="self-start lg:sticky lg:top-8"
            aria-labelledby="deal-title"
          >
            <div className="flex items-start justify-between gap-5">
              <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
                {deal.brand ?? formatCategory(deal.category)}
              </p>
              {deal.discountPercentage > 0 && (
                <span className="shrink-0 rounded-full bg-[var(--accent)] px-3 py-1.5 text-[0.7rem] font-bold text-white">
                  {Math.round(deal.discountPercentage)}% off
                </span>
              )}
            </div>

            <h1
              id="deal-title"
              className="mt-4 font-serif text-4xl leading-[0.98] tracking-[-0.03em] sm:text-5xl"
            >
              {deal.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-black/10 py-4 text-sm">
              <span className="flex items-center gap-2 font-medium">
                <Star
                  aria-hidden="true"
                  className="size-4 text-[#a8771d]"
                  fill="currentColor"
                />
                {deal.rating.toFixed(1)} rating
              </span>
              <span className="flex items-center gap-2 text-[var(--muted)]">
                <PackageCheck aria-hidden="true" className="size-4" />
                {availability}
              </span>
            </div>

            <p className="mt-6 font-mono text-3xl font-semibold tracking-[-0.04em]">
              ${deal.price.toFixed(2)}
            </p>
            <p className="mt-6 max-w-[65ch] text-base leading-7 text-[var(--muted)]">
              {deal.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ShareDealButton title={deal.title} />
              <Link href="/deals" className="button-primary w-full sm:w-auto">
                Keep browsing
              </Link>
            </div>

            <dl className="mt-10 divide-y divide-black/10 border-y border-black/10 text-sm">
              <div className="grid grid-cols-[auto_1fr] gap-x-3 py-4">
                <Truck
                  aria-hidden="true"
                  className="mt-0.5 size-4 text-[var(--accent-dark)]"
                />
                <div>
                  <dt className="font-semibold">Delivery</dt>
                  <dd className="mt-1 leading-6 text-[var(--muted)]">
                    {deal.shippingInformation}
                  </dd>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 py-4">
                <BadgeCheck
                  aria-hidden="true"
                  className="mt-0.5 size-4 text-[var(--accent-dark)]"
                />
                <div>
                  <dt className="font-semibold">Covered and considered</dt>
                  <dd className="mt-1 leading-6 text-[var(--muted)]">
                    {deal.warrantyInformation} · {deal.returnPolicy}
                  </dd>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 py-4">
                <PackageCheck
                  aria-hidden="true"
                  className="mt-0.5 size-4 text-[var(--accent-dark)]"
                />
                <div>
                  <dt className="font-semibold">Availability</dt>
                  <dd className="mt-1 leading-6 text-[var(--muted)]">
                    {deal.stock > 0 ? `${deal.stock} available · ` : ""}
                    {availability}. Minimum order: {deal.minimumOrderQuantity}.
                  </dd>
                </div>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </main>
  );
}
