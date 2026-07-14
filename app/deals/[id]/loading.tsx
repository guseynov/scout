export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--canvas)]">
      <div className="site-shell flex h-20 items-center border-b border-black/10">
        <div className="h-9 w-40 animate-pulse rounded-full bg-black/10" />
      </div>
      <div className="site-shell py-10 sm:py-14">
        <div className="h-4 w-40 animate-pulse rounded-full bg-black/10" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(23rem,0.86fr)] lg:gap-16">
          <div className="aspect-square animate-pulse rounded-[1.75rem] bg-black/[0.07] sm:rounded-[2.5rem]" />
          <div className="space-y-5">
            <div className="h-3 w-24 animate-pulse rounded-full bg-black/10" />
            <div className="h-24 w-4/5 animate-pulse rounded-2xl bg-black/[0.07]" />
            <div className="h-12 w-full animate-pulse rounded-xl bg-black/[0.06]" />
            <div className="h-8 w-32 animate-pulse rounded-full bg-black/10" />
            <div className="h-20 w-full animate-pulse rounded-xl bg-black/[0.06]" />
          </div>
        </div>
      </div>
    </main>
  );
}
