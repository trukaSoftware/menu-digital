import ModalDefaultHeader from '@/components/ModalDefaultHeader';
import Qrcode from '@/components/Qrcode';

import * as Dialog from '@radix-ui/react-dialog';

import styles from './styles.module.css';

export default function CreateQrcodePortal() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.createQrcodeOverlay} />
      <Dialog.Content className={styles.createQrcodeContent}>
        <ModalDefaultHeader title="QRcode" />
        <Qrcode />
      </Dialog.Content>
    </Dialog.Portal>
  );
}
