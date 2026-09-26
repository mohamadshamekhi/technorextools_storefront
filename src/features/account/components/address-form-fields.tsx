import type { ChangeEvent } from 'react';

import type { CreateAddressInput } from '@/features/checkout/services/checkout-address.schemas';
import { fieldClassName, fieldInvalidClassName } from '@/components/atoms';
import { cn } from '@/lib/utils';

import { AddressFormField } from './address-form-field';

type FieldErrors = Partial<Record<keyof CreateAddressInput, string>>;

type AddressFormFieldsProps = {
  form: CreateAddressInput;
  errors: FieldErrors;
  onFieldChange: (
    key: keyof CreateAddressInput,
  ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

/** The receiver/location field grid shared by the create and edit address dialogs. */
export function AddressFormFields({ form, errors, onFieldChange }: AddressFormFieldsProps) {
  return (
    <>
      <AddressFormField
        className="col-span-2"
        placeholder="نام و نام خانوادگی"
        value={form.receiverName}
        onChange={onFieldChange('receiverName')}
        error={errors.receiverName}
      />
      <AddressFormField
        dir="ltr"
        placeholder="شماره موبایل"
        value={form.receiverMobile}
        onChange={onFieldChange('receiverMobile')}
        error={errors.receiverMobile}
      />
      <AddressFormField
        dir="ltr"
        placeholder="کد پستی"
        value={form.postalCode}
        onChange={onFieldChange('postalCode')}
        error={errors.postalCode}
      />
      <AddressFormField
        placeholder="استان"
        value={form.province}
        onChange={onFieldChange('province')}
        error={errors.province}
      />
      <AddressFormField
        placeholder="شهر"
        value={form.city}
        onChange={onFieldChange('city')}
        error={errors.city}
      />
      <div className="col-span-2">
        <textarea
          placeholder="آدرس کامل"
          rows={3}
          value={form.fullAddress}
          onChange={onFieldChange('fullAddress')}
          className={cn(
            fieldClassName,
            'resize-none py-3',
            errors.fullAddress && fieldInvalidClassName,
          )}
        />
        {errors.fullAddress ? (
          <p className="text-sale mt-1 text-[12px]">{errors.fullAddress}</p>
        ) : null}
      </div>
    </>
  );
}
