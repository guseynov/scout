import { BrandLockup } from "@/app/components/BrandLockup";
import { FeaturedDealsCarousel } from "@/app/components/FeaturedDealsCarousel";
import { getDeals } from "@/app/lib/deals";
import { ArrowRight, BadgeDollarSign, Share2, ThumbsUp } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const featuredDeals = (await getDeals()).slice(0, 6);

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--canvas)]">
      <nav
        className="site-nav site-shell flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <BrandLockup />
        <Link href="/deals" className="text-link text-sm">
          Browse finds
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </Link>
      </nav>

      <section className="hero-video-section">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/scout-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-tint" aria-hidden="true" />

        <div className="site-shell relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)] lg:items-end lg:py-28">
          <div className="max-w-3xl">
            <h1 className="page-title mt-5 max-w-[12ch] text-white">
              Useful finds, checked by people.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/80 sm:text-xl">
              Scout is where practical recommendations become a shortlist worth
              using. No sponsored placements, no manufactured urgency—just the
              things people would genuinely send to a friend.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/deals" className="hero-button-primary">
                Browse current finds
                <ArrowRight
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.8}
                />
              </Link>
              <a href="#highlighted-finds" className="hero-button-secondary">
                View highlights
              </a>
            </div>
          </div>

          <aside className="flex min-h-[30rem] flex-col border border-white/25 bg-[color:rgba(16,26,46,0.9)] p-6 text-white sm:p-8 lg:min-h-[34rem] lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-white/70">
              The Scout test
            </p>
            <p className="mt-10 max-w-[28ch] text-[clamp(2.25rem,3.2vw,3.75rem)] font-bold leading-[0.98] tracking-[-0.04em]">
              A good find has a clear price, a practical point, and a real
              recommendation behind it.
            </p>
            <div className="mt-auto grid grid-cols-1 gap-3 border-t border-white/25 pt-5 text-sm font-semibold text-white/80 sm:grid-cols-3 sm:gap-4">
              <span className="flex items-center gap-2">
                <BadgeDollarSign
                  aria-hidden="true"
                  className="size-4 shrink-0 text-white"
                  strokeWidth={1.8}
                />
                <span>Price checked</span>
              </span>
              <span className="flex items-center gap-2">
                <ThumbsUp
                  aria-hidden="true"
                  className="size-4 shrink-0 text-white"
                  strokeWidth={1.8}
                />
                <span>Worth using</span>
              </span>
              <span className="flex items-center gap-2">
                <Share2
                  aria-hidden="true"
                  className="size-4 shrink-0 text-white"
                  strokeWidth={1.8}
                />
                <span>Worth sharing</span>
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="highlighted-finds"
        className="featured-finds-section border-y border-[var(--line)]"
      >
        <div className="site-shell py-16 sm:py-20">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="featured-finds-label utility-label">Highlighted finds</p>
              <h2 className="section-title mt-4">
                A few things worth a <span>closer look.</span>
              </h2>
            </div>
            <Link href="/deals" className="featured-finds-link text-link text-sm sm:mb-1">
              See the full board
              <ArrowRight
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.8}
              />
            </Link>
          </div>
          <FeaturedDealsCarousel deals={featuredDeals} />
        </div>
      </section>
    </main>
  );
}
