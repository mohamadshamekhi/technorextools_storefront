import { SHIPPING_METHODS } from '../data/shipping';
import type { ShippingMethodKey } from '../types';
import { ShippingOption } from './shipping-option';

type ShippingMethodsProps = {
  selected: ShippingMethodKey;
  freeShipping: boolean;
  onSelect: (key: ShippingMethodKey) => void;
};

export function ShippingMethods({ selected, freeShipping, onSelect }: ShippingMethodsProps) {
  return (
    <div className="mb-5">
      <p className="mb-2.5 text-[13.5px] font-bold">روش ارسال</p>
      <div className="flex flex-col gap-2.5">
        {SHIPPING_METHODS.map((method) => (
          <ShippingOption
            key={method.key}
            method={method}
            price={method.key === 'standard' && freeShipping ? 0 : method.price}
            selected={selected === method.key}
            onSelect={() => onSelect(method.key)}
          />
        ))}
      </div>
    </div>
  );
}
