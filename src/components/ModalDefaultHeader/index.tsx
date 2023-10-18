import { CgClose } from 'react-icons/cg';

import { Close, Title } from '@radix-ui/react-dialog';

import styles from './styles.module.css';

export interface ModalDefaultHeaderProps {
  title: string;
  icon?: JSX.Element;
}

export default function ModalDefaultHeader({
  title,
  icon,
}: ModalDefaultHeaderProps) {
  return (
    <div className={styles.modalDefaultHeader}>
      <div className={styles.modalDefaultHeaderContainerIconAndTitle}>
        {icon}
        <Title className={styles.modalDefaultHeaderTitle}>{title}</Title>
      </div>
      <Close>
        <CgClose size={30} className={styles.modalDefaultHeaderCloseIcon} />
      </Close>
    </div>
  );
}
