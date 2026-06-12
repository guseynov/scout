"use client";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="space-y-4 p-6">
      <h1 className="text-xl font-semibold">Could not load deals</h1>
      <p className="text-sm text-gray-600">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded border px-4 py-2"
      >
        Try again
      </button>
    </main>
  );
}
