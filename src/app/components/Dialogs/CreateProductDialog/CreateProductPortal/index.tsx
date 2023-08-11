import * as Dialog from '@radix-ui/react-dialog';

import CreateProductForm from '../../../Forms/CreateProductForm';
import ModalDefaultHeader from '../../../ModalDefaultHeader';
import DefaultOverlay from '../../DefaultOverlay';
import styles from './styles.module.css';

interface CreateProductFormProps {
  setShowDialog: (value: boolean) => void;
}

export default function CreateProductPortal({
  setShowDialog,
}: CreateProductFormProps) {
  return (
    <Dialog.Portal>
      <DefaultOverlay />
      <Dialog.Content className={styles.createProductContent}>
        <ModalDefaultHeader title="Criação de produto" />
        <CreateProductForm setShowDialog={setShowDialog} />
      </Dialog.Content>
    </Dialog.Portal>
  );
}
