import { useState } from 'react';
import { useForm } from 'react-hook-form';

import DefaultInput from '@/components/DefaultInput';
import ModalDefaultHeader from '@/components/ModalDefaultHeader';
import QrCode from '@/components/QrCode';

import { useUser } from '@clerk/nextjs';
import * as Dialog from '@radix-ui/react-dialog';

import styles from './styles.module.css';

type Input = {
  tableQuantityInput: string;
};

interface CreateQrCodePortalProps {
  setShowDialog: (value: boolean) => void;
}

export default function CreateQrcodePortal({
  setShowDialog,
}: CreateQrCodePortalProps) {
  const [qrCodeProductsUrl, setQrCodeProductsUrl] = useState<string[]>([]);
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Input>({
    mode: `onChange`,
  });

  const onSubmit = async (value: Input) => {
    const fullURL = window.location.href;
    const urlObj = new URL(fullURL);
    const pathname = urlObj.origin;

    const auxQrCodeArray = [] as string[];

    for (let i = 0; i < Number(value.tableQuantityInput); i++) {
      auxQrCodeArray.push(
        `${pathname}/produtos/${user?.publicMetadata.slug}/${user?.id}?table=${
          i + 1
        }`
      );
    }

    setQrCodeProductsUrl(auxQrCodeArray);
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.createQrCodeOverlay} />
      <Dialog.Content
        onOpenAutoFocus={() => reset()}
        onCloseAutoFocus={() => setQrCodeProductsUrl([])}
        className={styles.createQrCodeContent}
      >
        <ModalDefaultHeader title="QRCode" />
        {qrCodeProductsUrl.length === 0 ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.createQrCodeForm}
          >
            <DefaultInput
              labelText="Quantas mesas existem em seu estabelecimento?"
              labelClassName={styles.createQrcodelabelClassName}
              register={register(`tableQuantityInput`, { required: true })}
              name="tableQuantityInput"
              error={
                errors.tableQuantityInput ? `Esse campo é obrigatório` : ``
              }
              placeholder="3"
            />

            <button type="submit" className={styles.createQrcodeButton}>
              Gerar QRCodes
            </button>
          </form>
        ) : (
          <QrCode
            qrCodeProductsUrl={qrCodeProductsUrl}
            setShowDialog={setShowDialog}
          />
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
