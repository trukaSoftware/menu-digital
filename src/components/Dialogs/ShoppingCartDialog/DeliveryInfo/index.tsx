'use client';

import { UseFormRegisterReturn } from 'react-hook-form';

import DefaultInput from '@/components/DefaultInput';

import styles from './styles.module.css';

export interface DeliveryInfoProps {
  nameRegister: UseFormRegisterReturn;
  phoneRegister: UseFormRegisterReturn;
  error: string | undefined;
  labelClassName?: string;
}

export default function DeliveryInfo({
  nameRegister,
  error,
  phoneRegister,
  labelClassName,
}: DeliveryInfoProps) {
  return (
    <div className={styles.deliveryInfoWrapper}>
      <DefaultInput
        register={nameRegister}
        name="clientName"
        error={error}
        labelText="Nome*"
        labelClassName={labelClassName}
      />
      <DefaultInput
        register={phoneRegister}
        name="clientPhoneNumber"
        error={error}
        labelText="Telefone*"
        labelClassName={labelClassName}
      />
    </div>
  );
}
