import * as z from "zod";

const productDtoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  thumbnail: z.url(),
});

export const dealDetailsSchema = productDtoSchema.extend({
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string().optional(),
  images: z.array(z.url()).min(1),
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
});

export const responseDtoSchema = z.object({
  products: z.array(productDtoSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type ProductDto = z.infer<typeof productDtoSchema>;
export type ProductsResponseDto = z.infer<typeof responseDtoSchema>;
export type DealDetails = z.infer<typeof dealDetailsSchema>;

export const dealSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  category: z.string(),
  imageUrl: z.url(),
});

export const dealsPageSchema = z.object({
  deals: z.array(dealSchema),
  total: z.number().int().nonnegative(),
  skip: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
});

export type Deal = z.infer<typeof dealSchema>;
export type DealsPage = z.infer<typeof dealsPageSchema>;
