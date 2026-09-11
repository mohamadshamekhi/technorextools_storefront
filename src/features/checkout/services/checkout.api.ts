import 'server-only';

import { apiClient } from '@/lib/api-client';

import {
  checkoutStartResultSchema,
  payAgainResultSchema,
  type StartCheckoutInput,
} from './checkout.schemas';
import { paymentMethodListSchema } from './payment-methods.schemas';

/** Server-only wrappers over `abzar/api`'s checkout + payment-method endpoints. */
export const checkoutApi = {
  /** Public, admin-configured catalog — cacheable like shipping methods. */
  listPaymentMethods: () =>
    apiClient.get('/storefront/payment-methods', paymentMethodListSchema, {
      auth: false,
      next: { revalidate: 300, tags: ['checkout:payment-methods'] },
    }),

  start: (input: StartCheckoutInput) =>
    apiClient.post('/storefront/checkout', checkoutStartResultSchema, { body: input }),

  payAgain: (orderNumber: string) =>
    apiClient.post(
      `/storefront/checkout/${encodeURIComponent(orderNumber)}/pay`,
      payAgainResultSchema,
    ),
};
