import { UseFormRegisterReturn } from 'react-hook-form';

import DefaultInput from '../DefaultInput';
import styles from './styles.module.css';

export interface ComplementInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  itemName: string;
  priceName: string;
  itemRegister: UseFormRegisterReturn;
  priceRegister: UseFormRegisterReturn;
  itemError: string | undefined;
  priceError: string | undefined;
  labelClassName?: string;
  index: number;
}

export default function ComplementInput({
  itemName,
  priceName,
  itemRegister,
  priceRegister,
  itemError,
  priceError,
  index,
  ...rest
}: ComplementInputProps) {
  return (
    <div className={styles.complementFormInputWrapper}>
      <DefaultInput
        name={`${itemName}-${index}`}
        placeholder="Nome Do Item"
        error={itemError}
        register={itemRegister}
        {...rest}
        className={styles.complementFormInput}
        labelClassName={styles.complementFormInputLabel}
      />
      <DefaultInput
        name={`${priceName}-${index}`}
        placeholder="R$ 0,00"
        defaultValue={0}
        register={priceRegister}
        className={styles.complementFormInput}
        labelClassName={styles.complementPriceFormLabel}
        error={priceError}
      />
    </div>
  );
}
