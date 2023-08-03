import { ReactNode } from 'react';

import styles from './styles.module.css';

interface UploadImageInputProps {
  title: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  iconImage: ReactNode;
  id: string;
  style: string;
  imageName?: string;
}

export default function uploadImageInput({
  iconImage,
  handleFileChange,
  title,
  id,
  style,
  imageName,
}: UploadImageInputProps) {
  return (
    <>
      <div className={styles.imageInput}>
        <div className={styles.inputIcon}>{iconImage}</div>
        <label htmlFor={id} className={style}>
          <span>
            {title}
            <p className={styles.fileUploadedName}>{imageName}</p>
          </span>
          <input
            id={id}
            type="file"
            onChange={handleFileChange}
            className={styles.input}
          />
        </label>
      </div>
    </>
  );
}
