/** Shared regular expressions. Reference these in Zod `.regex()` calls. */

export const REGEX = {
  /** RFC-5322-ish pragmatic email match. */
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  /** Min 8 chars, at least one lowercase, one uppercase, one digit. */
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  /** E.164 phone numbers. */
  phoneE164: /^\+[1-9]\d{1,14}$/,
  /** Iranian mobile number, local format (e.g. 09121234567). */
  phoneIR: /^09\d{9}$/,
  /** 5-digit one-time password. */
  otp5: /^\d{5}$/,
  /** URL-safe slug. */
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  /** UUID v4. */
  uuidV4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
} as const;
