import { UseFormRegisterReturn } from 'react-hook-form';

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
      <label htmlFor={`${itemName}-${index}`} className={styles.teste1}>
        <div className={styles.complementInputWrapper}>
          <input
            id={`${itemName}-${index}`}
            className={styles.complementFormInput}
            {...itemRegister}
            {...rest}
            placeholder="Nome do item"
          />
        </div>
        {itemError ? (
          <span className={styles.inputErrorMessage}>{itemError}</span>
        ) : null}
      </label>
      <label htmlFor={`${priceName}-${index}`} className={styles.teste2}>
        <div className={styles.complementInputWrapper}>
          <input
            type="number"
            id={`${priceName}-${index}`}
            className={styles.complementFormInput}
            {...priceRegister}
            placeholder="R$ 0,00"
            defaultValue={0}
          />
        </div>
        {priceError ? (
          <span className={styles.inputErrorMessage}>{priceError}</span>
        ) : null}
      </label>
    </div>
  );
}
