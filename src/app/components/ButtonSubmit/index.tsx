import { CgSpinner } from 'react-icons/cg';

import styles from './styles.module.css';

export interface ButtonSubmitProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmiting: boolean;
  submitError: boolean;
  text: string;
}

export default function ButtonSubmit({
  isSubmiting,
  submitError,
  text,
  ...rest
}: ButtonSubmitProps) {
  const buttonText = submitError ? `Erro ao enviar, tente novamente.` : text;

  return (
    <button type="submit" {...rest}>
      {isSubmiting ? (
        <CgSpinner className={styles.submiteButtonSpinner} size={28} />
      ) : (
        buttonText
      )}
    </button>
  );
}
