"use client";

import type { Deal } from "@/app/types/deal";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { DealDetailsPreview } from "./DealDetailsPreview";

type DealCardProps = {
  deal: Deal;
  priority?: boolean;
};

export function DealCard({ deal, priority = false }: DealCardProps) {
  const { title, description, price, category, imageUrl } = deal;
  const [loading, setLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const previewId = `deal-details-${deal.id}`;

  const handleImageLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handlePreviewOpen = useCallback(() => {
    setIsPreviewOpen(true);
  }, []);

  const handlePreviewClose = useCallback(() => {
    setIsPreviewOpen(false);
  }, []);

  return (
    <article
      className="deal-card group relative z-0 flex min-w-0 flex-col focus-within:z-30 hover:z-30"
      tabIndex={0}
      aria-describedby={isPreviewOpen ? previewId : undefined}
      onMouseEnter={handlePreviewOpen}
      onMouseLeave={handlePreviewClose}
      onFocus={handlePreviewOpen}
      onBlur={handlePreviewClose}
    >
      <div className="relative aspect-[4/4.2] overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-[var(--surface)]">
        <div
          title={category}
          className="absolute left-4 top-4 z-10 max-w-[calc(100%_-_2rem)] truncate rounded-full border border-black/10 bg-[color:rgba(255,255,255,0.78)] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] backdrop-blur-md"
        >
          {category}
        </div>
        <div className={clsx("absolute inset-0", loading && "animate-pulse bg-black/[0.04]")}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={priority}
            onLoad={handleImageLoad}
            className={clsx(
              "object-contain p-8 transition duration-500 ease-out group-hover:scale-[1.04]",
              loading ? "opacity-0" : "opacity-100",
            )}
          />
        </div>
        <div className="absolute bottom-4 right-4 grid size-10 translate-y-2 place-items-center rounded-full bg-[var(--ink)] text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.5}
          />
        </div>
        {isPreviewOpen && (
          <DealDetailsPreview dealId={deal.id} previewId={previewId} />
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pt-5">
        <div className="flex min-w-0 items-start justify-between gap-4">
          <h2
            title={title}
            className="line-clamp-2 min-h-[2.75rem] min-w-0 break-words text-base font-semibold leading-snug tracking-[-0.015em]"
          >
            {title}
          </h2>
          <p
            title={`$${price}`}
            className="max-w-[40%] shrink-0 truncate font-mono text-sm font-semibold"
          >
            ${price}
          </p>
        </div>
        <p
          title={description}
          className="mt-2 line-clamp-2 break-words text-sm leading-6 text-[var(--muted)]"
        >
          {description}
        </p>
      </div>
    </article>
  );
}
