import * as Dialog from '@radix-ui/react-dialog';

import CreateCategoryForm from '../Forms/CreateCategoryForm';
import ModalDefaultHeader from '../ModalDefaultHeader';
import styles from './styles.module.css';

export default function CreateCategoryPortal() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.createCategoryOverLay} />
      <Dialog.Content className={styles.createCategoryContent}>
        <ModalDefaultHeader />
        <CreateCategoryForm />
      </Dialog.Content>
    </Dialog.Portal>
  );
}
