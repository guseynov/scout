import * as z from "zod";

const productDtoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  thumbnail: z.url(),
});

export const responseDtoSchema = z.object({
  products: z.array(productDtoSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type ProductDto = z.infer<typeof productDtoSchema>;
export type ProductsResponseDto = z.infer<typeof responseDtoSchema>;

export type Deal = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
};
