import type { IconName } from '@/components/atoms';

export type CheckoutStep = 'address' | 'payment' | 'review' | 'success';

export type Address = {
  id: string;
  title: string;
  text: string;
  isDefault?: boolean;
};

export type CheckoutPaymentMethod = {
  key: string;
  label: string;
  desc: string;
  icon: IconName;
};

/** Snapshot taken at confirm time — the cart may already be cleared by then. */
export type PlacedOrder = {
  code: string;
  total: number;
  itemCount: number;
};
