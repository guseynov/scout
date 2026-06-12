"use client";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--canvas)] px-6 text-center">
      <div className="max-w-lg">
        <p className="eyebrow mx-auto">Collection unavailable</p>
        <h1 className="mt-7 font-serif text-5xl tracking-[-0.04em]">The shelves are quiet.</h1>
        <p
          title={error.message}
          className="mt-5 line-clamp-4 break-words text-base leading-7 text-[var(--muted)]"
        >
          We could not load the latest finds just now. {error.message}
        </p>
        <button type="button" onClick={reset} className="button-primary mt-8">
          Try the collection again
        </button>
      </div>
    </main>
  );
}
