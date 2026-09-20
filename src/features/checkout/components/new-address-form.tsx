'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

import { cn } from '@/lib/utils';

import { useCreateAddress } from '../hooks/use-addresses';
import {
  createAddressInputSchema,
  type CreateAddressInput,
} from '../services/checkout-address.schemas';

const FIELD_CLASS =
  'rounded-xl border border-hairline px-3.5 py-3 text-[13.5px] outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15';

const EMPTY_FORM: CreateAddressInput = {
  receiverName: '',
  receiverMobile: '',
  province: '',
  city: '',
  fullAddress: '',
  postalCode: '',
};

type FieldErrors = Partial<Record<keyof CreateAddressInput, string>>;

type NewAddressFormProps = { onCreated: (addressId: string) => void };

/** Creates a new address via `/api/checkout/addresses`, then selects it. */
export function NewAddressForm({ onCreated }: NewAddressFormProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const createAddress = useCreateAddress();

  const setField =
    (key: keyof CreateAddressInput) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const parsed = createAddressInputSchema.safeParse(form);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({
        receiverName: flat.receiverName?.[0],
        receiverMobile: flat.receiverMobile?.[0],
        province: flat.province?.[0],
        city: flat.city?.[0],
        fullAddress: flat.fullAddress?.[0],
        postalCode: flat.postalCode?.[0],
      });
      return;
    }
    setErrors({});
    createAddress.mutate(parsed.data, {
      onSuccess: (address) => {
        setForm(EMPTY_FORM);
        onCreated(address.id);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-hairline grid grid-cols-2 gap-3 border-t pt-4.5"
    >
      <Field
        className="col-span-2"
        placeholder="نام و نام خانوادگی"
        value={form.receiverName}
        onChange={setField('receiverName')}
        error={errors.receiverName}
      />
      <Field
        dir="ltr"
        placeholder="شماره موبایل"
        value={form.receiverMobile}
        onChange={setField('receiverMobile')}
        error={errors.receiverMobile}
      />
      <Field
        dir="ltr"
        placeholder="کد پستی"
        value={form.postalCode}
        onChange={setField('postalCode')}
        error={errors.postalCode}
      />
      <Field
        placeholder="استان"
        value={form.province}
        onChange={setField('province')}
        error={errors.province}
      />
      <Field placeholder="شهر" value={form.city} onChange={setField('city')} error={errors.city} />
      <div className="col-span-2">
        <textarea
          placeholder="آدرس کامل"
          rows={3}
          value={form.fullAddress}
          onChange={setField('fullAddress')}
          className={cn(FIELD_CLASS, 'w-full resize-none', errors.fullAddress && 'border-sale')}
        />
        {errors.fullAddress ? (
          <p className="text-sale mt-1 text-[12px]">{errors.fullAddress}</p>
        ) : null}
      </div>

      {createAddress.isError ? (
        <p className="text-sale col-span-2 text-[12.5px]">ثبت آدرس ناموفق بود. دوباره تلاش کنید.</p>
      ) : null}

      <button
        type="submit"
        disabled={createAddress.isPending}
        className="bg-brand-500 hover:bg-brand-600 col-span-2 rounded-xl py-3 text-[13.5px] font-bold text-white transition-colors disabled:opacity-60"
      >
        {createAddress.isPending ? 'در حال ثبت…' : 'ثبت آدرس'}
      </button>
    </form>
  );
}

type FieldProps = {
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  dir?: string;
};

function Field({ className, error, ...props }: FieldProps) {
  return (
    <div className={className}>
      <input {...props} className={cn(FIELD_CLASS, 'w-full', error && 'border-sale')} />
      {error ? <p className="text-sale mt-1 text-[12px]">{error}</p> : null}
    </div>
  );
}
