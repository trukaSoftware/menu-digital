import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './styles.module.css';

export interface FormInputProps {
  title: string;
  iconImage: ReactNode;
  id: string;
  type: string;
  placeHolder: string;
  errorMessage: string | undefined;
  register: UseFormRegisterReturn;
}

export default function FormInput({
  title,
  errorMessage,
  iconImage,
  id,
  type,
  placeHolder,
  register,
}: FormInputProps) {
  return (
    <label htmlFor={id} className={styles.formInputLabel}>
      <span className={styles.formInputTitle}>{title}</span>
      <div className={styles.formInputWrapper}>
        <div className={styles.formInputIcon}>{iconImage}</div>
        <input
          className={placeHolder ? styles.formInputValue : styles.formInput}
          type={type}
          id={id}
          placeholder={placeHolder}
          {...register}
        />
      </div>
      <p className={styles.formErrorText}>{errorMessage}</p>
    </label>
  );
}
