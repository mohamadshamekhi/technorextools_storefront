import { Icon, type IconName } from '@/components/atoms';

const items: Array<{ icon: IconName; label: string }> = [
  { icon: 'shield', label: 'ضمانت اصالت کالا' },
  { icon: 'refresh', label: '۷ روز بازگشت' },
  { icon: 'lock', label: 'پرداخت امن' },
];

export function TrustRow() {
  return (
    <ul className="bg-surface-muted grid grid-cols-3 gap-2 rounded-2xl p-3">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col items-center gap-1.5 text-center">
          <Icon name={item.icon} className="text-foreground size-5" />
          <span className="text-foreground text-xs leading-5 font-semibold">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
