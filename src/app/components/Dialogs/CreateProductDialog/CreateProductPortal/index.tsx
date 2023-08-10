import * as Dialog from '@radix-ui/react-dialog';

import CreateProductForm from '../../../Forms/CreateProductForm';
import ModalDefaultHeader from '../../../ModalDefaultHeader';
import styles from './styles.module.css';

interface CreateProductFormProps {
  setShowDialog: (value: boolean) => void;
}

export default function CreateProductPortal({
  setShowDialog,
}: CreateProductFormProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.createProductOverLay} />
      <Dialog.Content className={styles.createProductContent}>
        <ModalDefaultHeader title="Criação de produto" />
        <CreateProductForm setShowDialog={setShowDialog} />
      </Dialog.Content>
    </Dialog.Portal>
  );
}
