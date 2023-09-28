import { useState } from 'react';
import QRCode from 'react-qr-code';

import { useUser } from '@clerk/nextjs';

import styles from './styles.module.css';

export default function QrCode() {
  const { user } = useUser();
  const [qrCodeButtonTitle, setQrCodeButtonTitle] = useState(`Salvar QRCode`);

  const fullURL = window.location.href;
  const urlObj = new URL(fullURL);
  const pathname = urlObj.origin;

  const qrCodeProductsUrl = `${pathname}/produtos/${user?.publicMetadata.slug}/${user?.id}`;

  const handleSaveQrCode = async () => {
    const canvas = document.getElementById(
      `productsQrCode`
    ) as HTMLCanvasElement;
    const image = new Image();
    image.src = `data:image/svg+xml;base64,${btoa(
      new XMLSerializer().serializeToString(canvas)
    )}`;
    try {
      const downloadLink = document.createElement(`a`);
      downloadLink.href = image.src;
      downloadLink.download = `QRCode-${user?.publicMetadata.slug}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setQrCodeButtonTitle(`QRCode salvo!`);
    } catch (error) {
      setQrCodeButtonTitle(`Erro ao salvar, tente novamente.`);
    }
  };

  return (
    <>
      <div className={styles.qrCodeWrapper}>
        <QRCode value={qrCodeProductsUrl} id="productsQrCode" />
        <button
          type="button"
          className={styles.qrCodeButton}
          onClick={handleSaveQrCode}
        >
          {qrCodeButtonTitle}
        </button>
      </div>
    </>
  );
}
