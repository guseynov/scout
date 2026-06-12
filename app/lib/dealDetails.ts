import { queryOptions } from "@tanstack/react-query";
import { dealDetailsSchema, type DealDetails } from "@/app/types/deal";

const DEAL_DETAILS_QUERY_KEY = "deal-details";

export async function getDealDetails(id: number): Promise<DealDetails> {
  const response = await fetch(`https://dummyjson.com/product/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch deal details: ${response.statusText}`);
  }

  return dealDetailsSchema.parse(await response.json());
}

export function getDealDetailsQueryOptions(id: number) {
  return queryOptions({
    queryKey: [DEAL_DETAILS_QUERY_KEY, id],
    queryFn: () => getDealDetails(id),
  });
}
