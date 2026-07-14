"use client";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--canvas)] px-6 text-center">
      <div className="max-w-lg">
        <p className="utility-label">Collection unavailable</p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">We could not load the Scout list.</h1>
        <p
          title={error.message}
          className="mt-5 line-clamp-4 break-words text-base leading-7 text-[var(--muted)]"
        >
          The latest finds are unavailable right now. {error.message}
        </p>
        <button type="button" onClick={reset} className="button-primary mt-8">
          Try the collection again
        </button>
      </div>
    </main>
  );
}
