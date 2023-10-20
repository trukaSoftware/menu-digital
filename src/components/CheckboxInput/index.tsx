import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './styles.module.css';

export interface CheckboxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  id: string;
  dataTestId: string;
  register?: UseFormRegisterReturn;
}

export default function CheckboxInput({
  text,
  id,
  dataTestId,
  register,
  ...rest
}: CheckboxInputProps) {
  return (
    <label htmlFor={id} className={styles.checkboxInputLabel}>
      <input
        data-testid={`checkbox-${dataTestId}`}
        type="checkbox"
        value={id}
        id={id}
        className={styles.checkboxInput}
        {...register}
        {...rest}
      />
      <span className={styles.newCheckBox} />
      <span>{text}</span>
    </label>
  );
}
