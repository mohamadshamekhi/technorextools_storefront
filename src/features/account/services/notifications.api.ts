import 'server-only';

import { z } from 'zod';

import { apiClient } from '@/lib/api-client';

import { notificationListSchema } from './notifications.schemas';

/** Server-only fetchers for the authenticated customer's notifications. */
export const notificationsApi = {
  list: () =>
    apiClient.get('/storefront/notifications', notificationListSchema, {
      next: { revalidate: 0 },
    }),
  markRead: (id: string) => apiClient.patch(`/storefront/notifications/${id}/read`, z.unknown()),
  markAllRead: () => apiClient.post('/storefront/notifications/read-all', z.unknown()),
};
