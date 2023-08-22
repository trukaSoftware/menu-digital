import Spinner from '../Spinner';

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
      {isSubmiting ? <Spinner size={28} /> : buttonText}
    </button>
  );
}
