import type { ShippingMethod } from '../types';
import { ShippingOption } from './shipping-option';

type ShippingMethodsProps = {
  methods: ShippingMethod[];
  selected: string;
  subtotal: number;
  onSelect: (id: string) => void;
};

export function ShippingMethods({ methods, selected, subtotal, onSelect }: ShippingMethodsProps) {
  if (methods.length === 0) return null;

  return (
    <div className="mb-5">
      <p className="mb-2.5 text-[13.5px] font-bold">روش ارسال</p>
      <div className="flex flex-col gap-2.5">
        {methods.map((method) => {
          const free = method.freeOverAmount !== null && subtotal >= method.freeOverAmount;
          return (
            <ShippingOption
              key={method.id}
              method={method}
              price={free ? 0 : method.cost}
              selected={selected === method.id}
              onSelect={() => onSelect(method.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
