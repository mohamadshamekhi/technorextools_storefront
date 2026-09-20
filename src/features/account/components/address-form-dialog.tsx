'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import { Modal } from '@/components/molecules/modal';
import { useCreateAddress, useUpdateAddress, type Address } from '@/features/checkout';
import {
  createAddressInputSchema,
  updateAddressInputSchema,
  type CreateAddressInput,
} from '@/features/checkout/services/checkout-address.schemas';

import { AddressFormFields } from './address-form-fields';

const EMPTY_FORM: CreateAddressInput = {
  receiverName: '',
  receiverMobile: '',
  province: '',
  city: '',
  fullAddress: '',
  postalCode: '',
  isDefault: false,
};

type FieldErrors = Partial<Record<keyof CreateAddressInput, string>>;

type AddressFormDialogProps = {
  open: boolean;
  onClose: () => void;
  /** Present → edit this address; absent → create a new one. */
  address?: Address;
};

/** Create/edit dialog for a saved address — shared field grid, branches the mutation by mode. */
export function AddressFormDialog({ open, onClose, address }: AddressFormDialogProps) {
  const isEdit = Boolean(address);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();
  const pending = createAddress.isPending || updateAddress.isPending;
  const mutationError = createAddress.isError || updateAddress.isError;

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setForm(
      address
        ? {
            receiverName: address.receiverName,
            receiverMobile: address.receiverMobile,
            province: address.province,
            city: address.city,
            fullAddress: address.fullAddress,
            postalCode: address.postalCode,
            isDefault: address.isDefault,
          }
        : EMPTY_FORM,
    );
  }, [open, address]);

  const handleFieldChange =
    (key: keyof CreateAddressInput) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const schema = isEdit ? updateAddressInputSchema : createAddressInputSchema;
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as FieldErrors);
      return;
    }
    setErrors({});

    if (isEdit && address) {
      updateAddress.mutate({ id: address.id, input: parsed.data }, { onSuccess: onClose });
    } else {
      createAddress.mutate(parsed.data as CreateAddressInput, { onSuccess: onClose });
    }
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="address-form-title" className="max-w-lg">
      <h2 id="address-form-title" className="mb-5 text-[16px] font-black">
        {isEdit ? 'ویرایش آدرس' : 'افزودن آدرس جدید'}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
        <AddressFormFields form={form} errors={errors} onFieldChange={handleFieldChange} />

        <label className="col-span-2 flex items-center gap-2 text-[13px] font-bold">
          <input
            type="checkbox"
            checked={form.isDefault ?? false}
            onChange={(event) => setForm((prev) => ({ ...prev, isDefault: event.target.checked }))}
            className="accent-brand-500 size-4"
          />
          تنظیم به‌عنوان آدرس پیش‌فرض
        </label>

        {mutationError ? (
          <p className="text-sale col-span-2 text-[12.5px]">
            ثبت آدرس ناموفق بود. دوباره تلاش کنید.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="bg-brand-500 hover:bg-brand-600 col-span-2 rounded-xl py-3 text-[13.5px] font-bold text-white transition-colors disabled:opacity-60"
        >
          {pending ? 'در حال ثبت…' : isEdit ? 'ذخیره تغییرات' : 'ثبت آدرس'}
        </button>
      </form>
    </Modal>
  );
}
