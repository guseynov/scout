import {
  responseDtoSchema,
  ProductsResponseDto,
  Deal,
  ProductDto,
} from "../types/deal";

export function mapProductDtoToDeal(productDto: ProductDto): Deal {
  return {
    id: productDto.id,
    title: productDto.title,
    description: productDto.description,
    price: productDto.price,
    category: productDto.category,
    imageUrl: productDto.thumbnail,
  };
}

export async function getDeals(): Promise<Deal[]> {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    throw new Error(`Failed to fetch deals: ${response.statusText}`);
  }

  const untrustedData = await response.json();
  const data: ProductsResponseDto = responseDtoSchema.parse(untrustedData);

  return data.products.map((dealDto: ProductDto) =>
    mapProductDtoToDeal(dealDto),
  );
}
