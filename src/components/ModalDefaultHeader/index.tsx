import { CgClose } from 'react-icons/cg';

import { Close, Title } from '@radix-ui/react-dialog';

import styles from './styles.module.css';

export interface ModalDefaultHeaderProps {
  title: string;
}

export default function ModalDefaultHeader({ title }: ModalDefaultHeaderProps) {
  return (
    <div className={styles.modalDefaultHeader}>
      <Title className={styles.modalDefaultHeaderTitle}>{title}</Title>
      <Close>
        <CgClose size={30} className={styles.modalDefaultHeaderCloseIcon} />
      </Close>
    </div>
  );
}
