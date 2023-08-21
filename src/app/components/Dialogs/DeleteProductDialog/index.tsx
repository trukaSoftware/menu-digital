'use client';

import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import axios from 'axios';

import {
  Root,
  Trigger,
  Portal,
  Content,
  Close,
  Overlay,
} from '@radix-ui/react-dialog';

import styles from './styles.module.css';

export interface DeleteProductDialogProps {
  productId: string;
  categoryId: string;
  removeProductFromList: (productId: string, categoryId: string) => void;
}

export default function DeleteProductDialog({
  productId,
  categoryId,
  removeProductFromList,
}: DeleteProductDialogProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [deleteError, setDeleteError] = useState(``);

  const deleteProudct = async () => {
    try {
      const deletedProduct = await axios.delete(
        `/api/products/deleteProduct?id=${productId}`
      );

      if (deletedProduct.data?.deleted) {
        removeProductFromList(productId, categoryId);
        setShowDialog(false);
      }
    } catch {
      setDeleteError(`Falha ao deletar o produto`);
    }
  };

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <Trigger type="button" className={styles.deleteProductDialogTrigger}>
        <span>Excluir</span>
        <FaRegTrashAlt size={18} />
      </Trigger>
      <Portal>
        <Overlay className={styles.deleteProductDialogOverlay} />
        <Content className={styles.deleteProductDialogContent}>
          <p className={styles.deleteProductDialogText}>
            Deseja realmente excluir este produto? Essa ação é
            <span> irreversível</span>.
          </p>
          <div className={styles.deleteProductDialogButtons}>
            <button
              type="button"
              className={styles.deleteProductDialogDelBtn}
              onClick={deleteProudct}
            >
              {deleteError || `Sim`}
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
