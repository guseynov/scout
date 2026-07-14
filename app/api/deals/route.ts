import { DEALS_PAGE_SIZE, getDealsPage } from "@/app/lib/deals";
import { z } from "zod";

const dealsPageParamsSchema = z.object({
  limit: z.coerce.number().int().min(1).max(DEALS_PAGE_SIZE).default(DEALS_PAGE_SIZE),
  skip: z.coerce.number().int().min(0).default(0),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsedParams = dealsPageParamsSchema.safeParse({
    limit: searchParams.get("limit") ?? undefined,
    skip: searchParams.get("skip") ?? undefined,
  });

  if (!parsedParams.success) {
    return Response.json(
      { error: "Pagination parameters are invalid." },
      { status: 400 },
    );
  }

  try {
    return Response.json(await getDealsPage(parsedParams.data));
  } catch {
    return Response.json(
      { error: "The next set of finds is unavailable right now." },
      { status: 502 },
    );
  }
}
