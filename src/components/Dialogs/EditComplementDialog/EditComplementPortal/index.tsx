import EditComplementForm from '@/components/Forms/EditComplementForm';

import { Portal, Overlay, Content } from '@radix-ui/react-dialog';

import ModalDefaultHeader from '../../../ModalDefaultHeader';
import styles from './styles.module.css';

interface EditComplementPortalProps {
  setShowDialog: (value: boolean) => void;
  complementId: string;
}

export default function EditComplementPortal({
  setShowDialog,
  complementId,
}: EditComplementPortalProps) {
  return (
    <Portal>
      <Overlay className={styles.editComplementOverlay} />
      <Content className={styles.editComplementContent}>
        <ModalDefaultHeader title="Edição de adicionais" />
        <EditComplementForm
          setShowDialog={setShowDialog}
          complementId={complementId}
        />
      </Content>
    </Portal>
  );
}
