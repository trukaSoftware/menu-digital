import QRCode from 'react-qr-code';

import { useUser } from '@clerk/nextjs';

import styles from './styles.module.css';

export default function Qrcode() {
  const fullURL = window.location.href;
  const urlObj = new URL(fullURL);
  const pathname = urlObj.origin;

  const user = useUser();
  const qrcodeProductsUrl = `${pathname}/produtos/${user.user?.publicMetadata.slug}/${user.user?.id}`;

  return (
    <div className={styles.qrcodeWrapper}>
      <QRCode value={qrcodeProductsUrl} />
    </div>
  );
}
