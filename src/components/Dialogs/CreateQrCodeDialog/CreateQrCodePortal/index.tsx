import ModalDefaultHeader from '@/components/ModalDefaultHeader';
import QrCode from '@/components/QrCode';

import * as Dialog from '@radix-ui/react-dialog';

import styles from './styles.module.css';

export default function CreateQrcodePortal() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.createQrCodeOverlay} />
      <Dialog.Content className={styles.createQrCodeContent}>
        <ModalDefaultHeader title="QRCode" />
        <QrCode />
      </Dialog.Content>
    </Dialog.Portal>
  );
}
