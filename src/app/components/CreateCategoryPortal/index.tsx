import * as Dialog from '@radix-ui/react-dialog';

import CreateCategoryForm from '../Forms/CreateCategoryForm';
import ModalDefaultHeader from '../ModalDefaultHeader';
import styles from './styles.module.css';

export interface CreateCategoryPortalProps {
  companyId: string;
}

export default function CreateCategoryPortal({
  companyId,
}: CreateCategoryPortalProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.createCategoryOverLay} />
      <Dialog.Content className={styles.createCategoryContent}>
        <ModalDefaultHeader title="Criação de categoria" />
        <CreateCategoryForm companyId={companyId} />
      </Dialog.Content>
    </Dialog.Portal>
  );
}
