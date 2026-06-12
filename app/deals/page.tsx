import { getDeals } from "@/app/lib/deals";
import { DealCard } from "./DealCard";

export default async function DealsPage() {
  const deals = await getDeals();

  return (
    <main className="space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Community Deals</h1>
        <p className="text-sm text-gray-600">
          Exclusive offers for closed communities.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </section>
    </main>
  );
}
