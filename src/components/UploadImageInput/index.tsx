import { ReactNode } from 'react';

import styles from './styles.module.css';

interface UploadImageInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  iconImage: ReactNode;
  id: string;
  imageName?: string;
  labelClassName?: string;
  error?: string;
  testId?: string;
}

export default function UploadImageInput({
  iconImage,
  handleFileChange,
  title,
  id,
  imageName,
  labelClassName = ``,
  error,
  testId,
  ...rest
}: UploadImageInputProps) {
  return (
    <div className={styles.uploadImageInputWrapper}>
      <div className={styles.uploadImageInputContainer}>
        <div className={styles.uploadImageIcon}>{iconImage}</div>
        <label
          htmlFor={id}
          className={`${styles.uploadImageLabel} ${labelClassName}`}
        >
          {imageName ? (
            <span className={styles.fileUploadedName}>{imageName}</span>
          ) : (
            title
          )}
          <input
            id={id}
            type="file"
            onChange={handleFileChange}
            className={styles.input}
            data-testid={testId}
            {...rest}
          />
        </label>
      </div>
      {error ? <span className={styles.uploadImageError}>{error}</span> : null}
    </div>
  );
}
