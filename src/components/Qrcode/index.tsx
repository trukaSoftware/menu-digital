import QRCode from 'react-qr-code';

import { useUser } from '@clerk/nextjs';

import styles from './styles.module.css';

export default function Qrcode() {
  const user = useUser();

  const fullURL = window.location.href;
  const urlObj = new URL(fullURL);
  const pathname = urlObj.origin;

  const qrcodeProductsUrl = `${pathname}/produtos/${user.user?.publicMetadata.slug}/${user.user?.id}`;

  const handleSaveQrcode = () => {
    window.print();
  };

  return (
    <>
      <div className={styles.qrcodeWrapper}>
        <QRCode value={qrcodeProductsUrl} />
        <button
          type="button"
          className={styles.qrcodeButton}
          onClick={handleSaveQrcode}
        >
          Salvar QRcode
        </button>
      </div>
    </>
  );
}
