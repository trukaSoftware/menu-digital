import { useState } from 'react';
import QRCode from 'react-qr-code';

import JSZip from 'jszip';

import { useUser } from '@clerk/nextjs';

import styles from './styles.module.css';

interface QrCodeProps {
  setShowDialog: (value: boolean) => void;
  qrCodeProductsUrl: string[];
}

export default function QrCode({
  qrCodeProductsUrl,
  setShowDialog,
}: QrCodeProps) {
  const { user } = useUser();
  const [qrCodeButtonTitle, setQrCodeButtonTitle] = useState(`Salvar QRCode`);

  const handleSaveQrCode = async () => {
    const zip = new JSZip();

    qrCodeProductsUrl.forEach((qrcode, index) => {
      const canvas = document.getElementById(
        `qrcode-table-${index + 1}`
      ) as HTMLCanvasElement;

      const svgData = new XMLSerializer().serializeToString(canvas);

      zip.file(
        `QRCode-${user?.publicMetadata.slug}-Mesa ${index + 1}.svg`,
        svgData
      );
    });

    try {
      zip.generateAsync({ type: `blob` }).then((content: any) => {
        const downloadLink = document.createElement(`a`);
        downloadLink.href = URL.createObjectURL(content);
        downloadLink.download = `QRCode-${user?.publicMetadata.slug}.zip`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });

      setQrCodeButtonTitle(`QRCode salvo!`);
    } catch (error) {
      setQrCodeButtonTitle(`Erro ao salvar, tente novamente.`);
    } finally {
      setShowDialog(false);
    }
  };

  return (
    <>
      <div className={styles.qrCodeWrapper}>
        <div className={styles.qrCodeContainer}>
          {qrCodeProductsUrl?.map((qrcode, index) => (
            <QRCode
              key={qrcode}
              value={qrcode}
              id={`qrcode-table-${index + 1}`}
            />
          ))}
        </div>
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
