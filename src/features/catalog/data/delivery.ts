export type DeliveryCity = { id: string; label: string; eta: string };

/** Static ETA table until `abzar/api` exposes shipping estimates. */
export const deliveryCities: DeliveryCity[] = [
  { id: 'tehran', label: 'تهران', eta: 'ارسال امروز، تحویل تا فردا' },
  { id: 'karaj', label: 'کرج', eta: 'تحویل ۱ تا ۲ روز کاری' },
  { id: 'isfahan', label: 'اصفهان', eta: 'تحویل ۲ تا ۳ روز کاری' },
  { id: 'mashhad', label: 'مشهد', eta: 'تحویل ۲ تا ۴ روز کاری' },
  { id: 'shiraz', label: 'شیراز', eta: 'تحویل ۲ تا ۴ روز کاری' },
  { id: 'tabriz', label: 'تبریز', eta: 'تحویل ۲ تا ۴ روز کاری' },
];
