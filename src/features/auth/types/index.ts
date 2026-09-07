import { z } from 'zod';

import { REGEX } from '@/constants/regex';
import { UserRole } from '@/constants';

export * from './phone-auth';

export const loginSchema = z.object({
  email: z.string().regex(REGEX.email, 'Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name is too short').max(80),
    email: z.string().regex(REGEX.email, 'Enter a valid email address'),
    password: z.string().regex(REGEX.strongPassword, 'Min 8 chars with upper, lower and a number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const authUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  role: z.nativeEnum(UserRole),
});

/** Token bundle returned by `POST /auth/login` on `abzar/api`. */
export const authTokensSchema = z.object({
  accessToken: z.string().min(10),
  expiresIn: z.number().int().positive(),
  user: authUserSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;
export type AuthTokens = z.infer<typeof authTokensSchema>;
