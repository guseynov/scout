"use client";

import { getDealDetailsQueryOptions } from "@/app/lib/dealDetails";
import { useQuery } from "@tanstack/react-query";
import { PackageCheck, Star, Truck } from "lucide-react";

type DealDetailsPreviewProps = {
  dealId: number;
  previewId: string;
};

export function DealDetailsPreview({
  dealId,
  previewId,
}: DealDetailsPreviewProps) {
  const { data, isPending, isError } = useQuery(
    getDealDetailsQueryOptions(dealId),
  );

  return (
    <div
      id={previewId}
      role="status"
      className="pointer-events-none absolute inset-x-4 bottom-4 z-20 rounded-lg bg-[var(--ink)] p-4 text-white"
    >
      {isPending && (
        <div className="space-y-3" aria-label="Loading deal details">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white/60">
              Quick facts
            </span>
            <div className="h-2.5 w-16 animate-pulse rounded-full bg-white/15" />
          </div>
          <div className="h-3 w-24 animate-pulse rounded-full bg-white/25" />
          <div className="h-3 w-full animate-pulse rounded-full bg-white/15" />
          <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/15" />
        </div>
      )}

      {isError && (
        <p className="text-sm text-white/75">
          Details are unavailable right now. Try another card.
        </p>
      )}

      {data && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white/60">
              Quick facts
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-sm font-semibold" title={data.brand ?? data.title}>
              {data.brand ?? data.title}
            </p>
            {data.discountPercentage > 0 && (
              <span className="status-badge shrink-0">
                {Math.round(data.discountPercentage)}% off
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-white/75">
            <span className="flex min-w-0 items-center gap-1.5">
              <Star aria-hidden="true" className="size-3.5 text-[#8db0ff]" fill="currentColor" />
              {data.rating.toFixed(1)} rating
            </span>
            <span className="flex min-w-0 items-center gap-1.5 truncate" title={data.availabilityStatus}>
              <PackageCheck aria-hidden="true" className="size-3.5 shrink-0" />
              <span className="truncate">{data.availabilityStatus}</span>
            </span>
            <span className="col-span-2 flex min-w-0 items-center gap-1.5" title={data.shippingInformation}>
              <Truck aria-hidden="true" className="size-3.5 shrink-0" />
              <span className="truncate">{data.shippingInformation}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
