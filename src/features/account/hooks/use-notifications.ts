'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { UnauthorizedError } from '@/lib/api-error';

import { notificationListSchema } from '../services/notifications.schemas';

const NOTIFICATIONS_QUERY_KEY = ['account', 'notifications'];

/** Reads the signed-in customer's notifications from the BFF route. */
export function useNotifications() {
  return useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch('/api/account/notifications', { credentials: 'same-origin' });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) throw new Error('Failed to load notifications');
      return notificationListSchema.parse(await res.json());
    },
    staleTime: 30 * 1000,
  });
}

/** Unread count, sharing the same cached query as `useNotifications`. */
export function useUnreadNotificationsCount() {
  const { data } = useNotifications();
  return data?.filter((n) => !n.read).length ?? 0;
}

/** Marks a single notification as read and refreshes the list on success. */
export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/account/notifications/${id}/read`, {
        method: 'PATCH',
        credentials: 'same-origin',
      });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) throw new Error('Failed to mark notification as read');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });
}

/** Marks every notification as read and refreshes the list on success. */
export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/account/notifications', {
        method: 'POST',
        credentials: 'same-origin',
      });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) throw new Error('Failed to mark notifications as read');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });
}
