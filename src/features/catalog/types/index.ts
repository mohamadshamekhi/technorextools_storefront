import type { z } from 'zod';

import type {
  brandSchema,
  productCardSchema,
  productCommentsSchema,
  productDetailSchema,
  productListSchema,
} from '../services/catalog.schemas';

export type { CategoryNode } from '../services/catalog.schemas';

export type Brand = z.infer<typeof brandSchema>;
export type ProductCard = z.infer<typeof productCardSchema>;
export type ProductList = z.infer<typeof productListSchema>;
export type ProductDetail = z.infer<typeof productDetailSchema>;
export type ProductComments = z.infer<typeof productCommentsSchema>;
export type ProductComment = ProductComments['items'][number];
export type ProductVariant = ProductDetail['variants'][number];
export type ProductImage = ProductDetail['images'][number];
export type ProductAttributeValue = ProductDetail['attributeValues'][number];
