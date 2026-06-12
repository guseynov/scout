import type { Deal } from "@/app/types/deal";
import Image from "next/image";

type DealCardProps = {
  deal: Deal;
};

export function DealCard({ deal }: DealCardProps) {
  const { title, description, price, category, imageUrl } = deal || {};

  return (
    <article className="rounded-lg border p-4 shadow-sm">
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={300}
        className="mb-4 h-40 w-full rounded object-cover"
      />

      <h2 className="font-medium">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{description}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-semibold">{price}</span>
        <span className="rounded bg-gray-100 px-2 py-1 text-xs">
          {category}
        </span>
      </div>
    </article>
  );
}
