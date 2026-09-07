'use client';

import { useOrderTracking } from '../hooks/use-order-tracking';
import { TrackingHero } from './tracking-hero';
import { TrackingResult } from './tracking-result';

/** Client orchestrator — wires the lookup form to the result panel. */
export function OrderTrackingView() {
  const { order, error, submit } = useOrderTracking();

  return (
    <>
      <TrackingHero error={error} onSubmit={submit} />
      {order ? <TrackingResult order={order} /> : null}
    </>
  );
}
