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

export type Deal = {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
};
