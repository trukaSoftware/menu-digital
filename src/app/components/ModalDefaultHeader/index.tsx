import { CgClose } from 'react-icons/cg';

import { Close, Title } from '@radix-ui/react-dialog';

import styles from './styles.module.css';

export default function ModalDefaultHeader() {
  return (
    <div className={styles.createCategoryHeader}>
      <Title className={styles.createCategoryTitle}>Criação de produto</Title>
      <Close>
        <CgClose size={30} className={styles.createCategoryCloseIcon} />
      </Close>
    </div>
  );
}
