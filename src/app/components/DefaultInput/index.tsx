import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './styles.module.css';

export interface DefaultInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: JSX.Element;
  labelText?: string;
  name: string;
  register: UseFormRegisterReturn;
  error: string | undefined;
  labelClassName?: string;
}

export default function DefaultInput({
  Icon,
  name,
  labelText,
  register,
  error,
  labelClassName = ``,
  ...rest
}: DefaultInputProps) {
  return (
    <label
      htmlFor={name}
      className={`${styles.defaultInputFormNameLabel} ${labelClassName}`}
    >
      {labelText ? (
        <span className={styles.defaultInputFormNameTitle}>{labelText}</span>
      ) : null}
      <div className={styles.defaultInputFormInputWrapper}>
        <div className={styles.defaultInputFormIconWrapper}>{Icon}</div>
        <input
          id={name}
          className={styles.defaultInputFormNameInput}
          {...register}
          {...rest}
        />
      </div>
      {error ? (
        <span className={styles.defaultInputErrorMessage}>{error}</span>
      ) : null}
    </label>
  );
}
