export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--canvas)]">
      <div className="site-nav site-shell flex items-center">
        <div className="h-4 w-40 animate-pulse bg-black/10" />
      </div>
      <div className="site-shell py-20">
        <div className="h-3 w-44 animate-pulse bg-black/10" />
        <div className="mt-7 h-20 max-w-3xl animate-pulse rounded-lg bg-black/10" />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="aspect-[4/4.2] animate-pulse rounded-xl bg-black/[0.07]" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-black/10" />
              <div className="h-3 w-full animate-pulse rounded bg-black/[0.06]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
