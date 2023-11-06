'use client';

import { UseFormRegisterReturn } from 'react-hook-form';

import DefaultInput from '@/components/DefaultInput';

import styles from './styles.module.css';

export interface DeliveryInfoProps {
  nameRegister: UseFormRegisterReturn;
  phoneRegister: UseFormRegisterReturn;
  nameError: string | undefined;
  phoneError: string | undefined;
  labelClassName?: string;
}

export default function DeliveryInfo({
  nameRegister,
  nameError,
  phoneError,
  phoneRegister,
  labelClassName,
}: DeliveryInfoProps) {
  return (
    <div className={styles.deliveryInfoWrapper}>
      <DefaultInput
        register={nameRegister}
        name="clientName"
        error={nameError}
        labelText="Nome*"
        labelClassName={labelClassName}
      />
      <DefaultInput
        register={phoneRegister}
        name="clientPhoneNumber"
        error={phoneError}
        labelText="Telefone*"
        labelClassName={labelClassName}
      />
    </div>
  );
}
