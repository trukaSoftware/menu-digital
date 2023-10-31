import { Dispatch, SetStateAction } from 'react';

import EditCompanyInfos from '@/components/Forms/EditCompanyInfos';

import { Portal, Overlay, Content } from '@radix-ui/react-dialog';

import ModalDefaultHeader from '../../../ModalDefaultHeader';
import styles from './styles.module.css';

interface EditCompanyPortalProps {
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

export default function EditCompanyPortal({
  setShowDialog,
}: EditCompanyPortalProps) {
  return (
    <Portal>
      <Overlay className={styles.editCompanyOverlay} />
      <Content className={styles.editCompanyContent}>
        <ModalDefaultHeader title="Editar Restaurante" />
        <EditCompanyInfos setShowDialog={setShowDialog} />
      </Content>
    </Portal>
  );
}
