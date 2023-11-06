import { UseFormRegisterReturn } from 'react-hook-form';

import DefaultInput from '@/components/DefaultInput';

import styles from './styles.module.css';

export interface DeliveryAddressProps {
  register: UseFormRegisterReturn;
  error?: string;
  labelClassName?: string;
}

export default function DeliveryAddress({
  register,
  error,
  labelClassName,
}: DeliveryAddressProps) {
  return (
    <div className={styles.deliveryAddressWrapper}>
      <DefaultInput
        labelClassName={labelClassName}
        name="address"
        labelText="Endereço*"
        error={error}
        register={register}
        placeholder="Ex: Rua 1, nº 1, casa 1 - Bairro luz"
      />
    </div>
  );
}
