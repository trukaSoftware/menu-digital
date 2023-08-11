import * as Dialog from '@radix-ui/react-dialog';

import CreateCategoryForm from '../../../Forms/CreateCategoryForm';
import ModalDefaultHeader from '../../../ModalDefaultHeader';
import DefaultOverlay from '../../DefaultOverlay';
import styles from './styles.module.css';

interface CreateCategoryFormProps {
  setShowDialog: (value: boolean) => void;
}

export default function CreateCategoryPortal({
  setShowDialog,
}: CreateCategoryFormProps) {
  return (
    <Dialog.Portal>
      <DefaultOverlay />
      <Dialog.Content className={styles.createCategoryContent}>
        <ModalDefaultHeader title="Criação de categoria" />
        <CreateCategoryForm setShowDialog={setShowDialog} />
      </Dialog.Content>
    </Dialog.Portal>
  );
}
