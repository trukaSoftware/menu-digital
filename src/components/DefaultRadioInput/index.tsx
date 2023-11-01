import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './styles.module.css';

export interface DefaultRadioInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  register: UseFormRegisterReturn;
  inputText: string;
  value: string;
  Icon?: JSX.Element;
  labelClassName?: string;
}
export default function DefaultRadioInput({
  id,
  register,
  inputText,
  value,
  Icon,
  labelClassName,
  ...rest
}: DefaultRadioInputProps) {
  return (
    <label
      htmlFor={id}
      className={`${styles.defaultRadioInpuLabel} ${labelClassName || ``}`}
    >
      <input id={id} type="radio" value={value} {...register} {...rest} />
      {Icon || null}
      {inputText}
    </label>
  );
}
