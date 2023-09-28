import QRCode from 'react-qr-code';

import { useUser } from '@clerk/nextjs';

import styles from './styles.module.css';

export default function QrCode() {
  const { user } = useUser();

  const fullURL = window.location.href;
  const urlObj = new URL(fullURL);
  const pathname = urlObj.origin;

  const qrCodeProductsUrl = `${pathname}/produtos/${user?.publicMetadata.slug}/${user?.id}`;

  const handleSaveQrCode = () => {
    window.print();
  };

  return (
    <>
      <div className={styles.qrCodeWrapper}>
        <QRCode value={qrCodeProductsUrl} />
        <button
          type="button"
          className={styles.qrCodeButton}
          onClick={handleSaveQrCode}
        >
          Salvar QRCode
        </button>
      </div>
    </>
  );
}
