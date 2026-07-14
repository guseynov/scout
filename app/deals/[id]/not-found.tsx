import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--canvas)] px-6 text-center">
      <div className="max-w-lg">
        <p className="eyebrow mx-auto">Find not available</p>
        <h1 className="mt-7 font-serif text-5xl tracking-[-0.04em]">This one has moved on.</h1>
        <p className="mt-5 text-base leading-7 text-[var(--muted)]">
          The product may no longer be part of the current collection. There are plenty more useful finds to explore.
        </p>
        <Link href="/deals" className="button-primary mt-8">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Browse the collection
        </Link>
      </div>
    </main>
  );
}
