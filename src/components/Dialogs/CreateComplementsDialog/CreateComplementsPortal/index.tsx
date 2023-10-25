import CreateComplementForm from '@/components/Forms/CreateComplementForm';

import * as Dialog from '@radix-ui/react-dialog';

import ModalDefaultHeader from '../../../ModalDefaultHeader';
import styles from './styles.module.css';

interface CreateComplementFormProps {
  setShowDialog: (value: boolean) => void;
}

export default function CreateComplementPortal({
  setShowDialog,
}: CreateComplementFormProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.createComplementOverlay} />
      <Dialog.Content className={styles.createComplementContent}>
        <ModalDefaultHeader title="Criação de adicionais" />
        <CreateComplementForm setShowDialog={setShowDialog} />
      </Dialog.Content>
    </Dialog.Portal>
  );
}
