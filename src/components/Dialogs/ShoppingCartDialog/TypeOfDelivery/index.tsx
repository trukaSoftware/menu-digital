import { UseFormRegisterReturn } from 'react-hook-form';

import DefaultRadioInput from '@/components/DefaultRadioInput';

import styles from './styles.module.css';

export interface TypeOfDeliveryProps {
  register: UseFormRegisterReturn;
}

export default function TypeOfDelivery({ register }: TypeOfDeliveryProps) {
  return (
    <div className={styles.typeOfDeliveryWrapper}>
      <h2>Escolha o tipo de entrega</h2>
      <div className={styles.typeOfDeliveryCheckboxesWrapper}>
        <DefaultRadioInput
          id="delivery"
          value="delivery"
          inputText="Entrega"
          register={register}
        />
        <DefaultRadioInput
          id="pickup"
          value="pickup"
          inputText="Retirada"
          register={register}
        />
      </div>
    </div>
  );
}
