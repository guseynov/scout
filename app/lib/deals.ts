import {
  responseDtoSchema,
  ProductsResponseDto,
  Deal,
  DealsPage,
  ProductDto,
} from "../types/deal";

export const DEALS_PAGE_SIZE = 30;

export function mapProductDtoToDeal(productDto: ProductDto): Deal {
  return {
    id: productDto.id,
    title: productDto.title,
    description: productDto.description,
    price: productDto.price.toFixed(2),
    category: productDto.category,
    imageUrl: productDto.thumbnail,
  };
}

type DealsPageOptions = {
  limit?: number;
  skip?: number;
};

export async function getDealsPage({
  limit = DEALS_PAGE_SIZE,
  skip = 0,
}: DealsPageOptions = {}): Promise<DealsPage> {
  const searchParams = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });
  const response = await fetch(`https://dummyjson.com/products?${searchParams}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch deals: ${response.statusText}`);
  }

  const untrustedData = await response.json();
  const data: ProductsResponseDto = responseDtoSchema.parse(untrustedData);

  return {
    deals: data.products.map((dealDto: ProductDto) =>
      mapProductDtoToDeal(dealDto),
    ),
    total: data.total,
    skip: data.skip,
    limit: data.limit,
  };
}

export async function getDeals(): Promise<Deal[]> {
  const { deals } = await getDealsPage();

  return deals;
}
