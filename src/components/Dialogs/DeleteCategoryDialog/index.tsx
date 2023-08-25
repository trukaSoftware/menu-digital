'use client';

import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import axios from 'axios';

import ButtonSubmit from '@/components/ButtonSubmit';

import {
  Root,
  Trigger,
  Portal,
  Content,
  Close,
  Overlay,
} from '@radix-ui/react-dialog';

import styles from './styles.module.css';

export interface DeleteCategoryDialogProps {
  categoryId: string;
  removeCategoryFromList: (categoryId: string) => void;
}

export default function DeleteCategoryDialog({
  categoryId,
  removeCategoryFromList,
}: DeleteCategoryDialogProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [deleteError, setDeleteError] = useState(``);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteProudct = async () => {
    try {
      setIsDeleting(true);

      const deletedProduct = await axios.delete(
        `/api/categories/deleteCategory?id=${categoryId}`
      );

      if (deletedProduct.data?.deleted) {
        removeCategoryFromList(categoryId);
        setShowDialog(false);
      }
    } catch {
      setIsDeleting(false);
      setDeleteError(`Falha ❌`);
      setTimeout(() => setDeleteError(``), 3000);
    }
  };

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <Trigger type="button" className={styles.deleteCategoryDialogTrigger}>
        <FaRegTrashAlt size={18} />
      </Trigger>
      <Portal>
        <Overlay className={styles.deleteCategoryDialogOverlay} />
        <Content className={styles.deleteCategoryDialogContent}>
          <p className={styles.deleteCategoryDialogText}>
            Deseja realmente excluir esta categoria? Essa ação é
            <span> irreversível</span>.
          </p>
          <div className={styles.deleteCategoryDialogButtons}>
            <ButtonSubmit
              isSubmiting={isDeleting}
              className={styles.deleteCategoryDialogDelBtn}
              text={deleteError || `Sim`}
              onClick={deleteProudct}
              type="button"
            />
            <Close
              type="button"
              className={styles.deleteCategoryDialogCancelBtn}
            >
              Não
            </Close>
          </div>
        </Content>
      </Portal>
    </Root>
  );
}
