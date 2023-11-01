import { UseFormRegisterReturn } from 'react-hook-form';

import DefaultInput from '@/components/DefaultInput';

import styles from './styles.module.css';

export interface DeliveryAdressProps {
  register: UseFormRegisterReturn;
  error?: string;
  labelClassName?: string;
}

export default function DeliveryAdress({
  register,
  error,
  labelClassName,
}: DeliveryAdressProps) {
  return (
    <div className={styles.deliveryAdressWrapper}>
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
