'use client';

import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import { Root, Trigger, Portal, Content, Close } from '@radix-ui/react-dialog';

import DefaultOverlay from '../DefaultOverlay';
import styles from './styles.module.css';

export interface DeleteProductDialogProps {
  productId: string;
}

export default function DeleteProductDialog({
  productId,
}: DeleteProductDialogProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <Trigger type="button" className={styles.deleteProductDialogTrigger}>
        <span>Excluir</span>
        <FaRegTrashAlt size={18} />
      </Trigger>
      <Portal>
        <DefaultOverlay />
        <Content className={styles.deleteProductDialogContent}>
          <p className={styles.deleteProductDialogText}>
            Deseja realmente excluir esse produto? Essa ação é
            <span> irreversível</span>.
          </p>
          <div className={styles.deleteProductDialogButtons}>
            <button type="button" className={styles.deleteProductDialogDelBtn}>
              Sim
            </button>
            <Close
              type="button"
              className={styles.deleteProductDialogCancelBtn}
            >
              Não
            </Close>
          </div>
        </Content>
      </Portal>
    </Root>
  );
}
