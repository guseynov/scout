import { BenefitCard } from "@/app/components/BenefitCard";
import { benefits } from "@/app/data/home";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--canvas)]">
      <nav
        className="site-shell flex h-20 items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold tracking-[-0.02em]"
        >
          <span className="grid size-9 place-items-center rounded-full bg-[var(--ink)] text-sm text-white">
            C
          </span>
          Common Good
        </Link>
        <Link href="/deals" className="text-link hidden sm:inline-flex">
          Browse the collection
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.6} />
        </Link>
      </nav>

      <section className="site-shell grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="max-w-3xl">
          <div className="eyebrow mb-7">
            <span className="size-2 rounded-full bg-[var(--accent)]" />
            Community-curated marketplace
          </div>
          <h1 className="display-title max-w-[12ch]">
            Better finds,
            <span className="font-serif font-normal italic text-[var(--accent-dark)]">
              {" "}
              shared well.
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            A considered collection of everyday goods, surfaced by people you
            trust and gathered in one quiet corner of the internet.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/deals" className="button-primary">
              Explore today&apos;s finds
              <ArrowRight
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.6}
              />
            </Link>
            <a href="#why" className="button-secondary">
              Why Common Good
            </a>
          </div>
          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--muted)]">
            <span>
              <strong className="text-[var(--ink)]">30</strong> fresh finds
            </span>
            <span>
              <strong className="text-[var(--ink)]">12</strong> categories
            </span>
            <span>
              <strong className="text-[var(--ink)]">0</strong> sponsored
              placements
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end">
          <div className="absolute -left-16 top-12 size-48 rounded-full bg-[#d8e8d5] blur-3xl" />
          <div className="hero-card relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-[#e9b95f] p-6 shadow-[0_32px_80px_rgba(41,49,37,0.16)] sm:p-8">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.15em]">
              <span>Today&apos;s edit</span>
              <span>Vol. 06</span>
            </div>
            <div className="my-14 grid place-items-center sm:my-20">
              <div className="relative grid aspect-square w-52 place-items-center rounded-full border border-black/15 bg-[#f5ddad] sm:w-64">
                <div className="grid size-32 rotate-[-8deg] place-items-center rounded-[2.2rem_2.2rem_3rem_3rem] bg-[var(--ink)] text-center text-[#f7f0df] shadow-2xl sm:size-40">
                  <span className="font-serif text-3xl italic sm:text-4xl">
                    good
                    <br />
                    stuff.
                  </span>
                </div>
                <span className="absolute -right-4 top-6 rotate-12 rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-bold text-white shadow-lg">
                  vetted
                </span>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-end gap-6 border-t border-black/15 pt-5">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-black/60">
                  The premise
                </p>
                <p className="mt-2 max-w-xs font-serif text-2xl leading-tight">
                  Less scrolling. More finding.
                </p>
              </div>
              <ArrowRight
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.6}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="why"
        className="border-t border-black/10 bg-[var(--ink)] text-white"
      >
        <div className="site-shell py-20 sm:py-28">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow !border-white/15 !bg-white/5 !text-white/70">
                How it works
              </p>
              <h2 className="mt-6 max-w-xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
                A marketplace with a point of view.
              </h2>
            </div>
          </div>
          <div className="grid border-t border-white/15 md:grid-cols-3">
            {benefits.map((benefit) => (
              <BenefitCard key={benefit.number} benefit={benefit} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
