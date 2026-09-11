import type { z } from 'zod';

import type {
  articleCardSchema,
  articleDetailSchema,
  articleListSchema,
} from '../services/content.schemas';

export type ArticleCardData = z.infer<typeof articleCardSchema>;
export type ArticleList = z.infer<typeof articleListSchema>;
export type ArticleDetail = z.infer<typeof articleDetailSchema>;
