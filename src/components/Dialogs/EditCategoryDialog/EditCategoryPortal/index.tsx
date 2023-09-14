import EditCategoryForm from '@/components/Forms/EditCategoryForm';

import { Portal, Overlay, Content } from '@radix-ui/react-dialog';

import ModalDefaultHeader from '../../../ModalDefaultHeader';
import styles from './styles.module.css';

interface EditCategoryPortalProps {
  setShowDialog: (value: boolean) => void;
  categoryId: string;
}

export default function EditCategoryPortal({
  setShowDialog,
  categoryId,
}: EditCategoryPortalProps) {
  return (
    <Portal>
      <Overlay className={styles.editCategoryOverlay} />
      <Content className={styles.editCategoryContent}>
        <ModalDefaultHeader title="Edição de categoria" />
        <EditCategoryForm
          setShowDialog={setShowDialog}
          categoryId={categoryId}
        />
      </Content>
    </Portal>
  );
}
