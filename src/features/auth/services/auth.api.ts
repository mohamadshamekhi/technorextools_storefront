import 'server-only';

import { apiClient } from '@/lib/api-client';
import {
  authTokensSchema,
  authUserSchema,
  type LoginInput,
  type RegisterInput,
} from '@/features/auth/types';

/** Thin, typed wrappers over the `abzar/api` auth endpoints. */
export const authApi = {
  login: (input: LoginInput) =>
    apiClient.post('/auth/login', authTokensSchema, { body: input, auth: false }),

  register: (input: Omit<RegisterInput, 'confirmPassword'>) =>
    apiClient.post('/auth/register', authTokensSchema, { body: input, auth: false }),

  me: () => apiClient.get('/auth/me', authUserSchema, { next: { revalidate: 0 } }),

  logout: () => apiClient.post('/auth/logout', authUserSchema.nullable().catch(null)),
};
