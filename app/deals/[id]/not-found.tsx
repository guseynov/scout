import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--canvas)] px-6 text-center">
      <div className="max-w-lg">
        <p className="utility-label">Find not available</p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">This find is no longer on the board.</h1>
        <p className="mt-5 text-base leading-7 text-[var(--muted)]">
          The product may no longer be part of the current collection. Browse the board for other useful finds.
        </p>
        <Link href="/deals" className="button-primary mt-8">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Browse the collection
        </Link>
      </div>
    </main>
  );
}
