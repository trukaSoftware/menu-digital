'use client';

import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import axios from 'axios';

import ButtonSubmit from '@/components/ButtonSubmit';

import { deleteCategory } from '@/redux/features/categories-slice';
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
}

export default function DeleteCategoryDialog({
  categoryId,
}: DeleteCategoryDialogProps) {
  const dispatch = useDispatch();

  const [showDialog, setShowDialog] = useState(false);
  const [deleteError, setDeleteError] = useState(``);
  const [isDeleting, setIsDeleting] = useState(false);

  const deletedFailed = () => {
    setIsDeleting(false);
    setDeleteError(`Falha ❌`);
    setTimeout(() => setDeleteError(``), 3000);
  };

  const deleteCategoryOnClick = async () => {
    setIsDeleting(true);
    try {
      const deletedProduct = await axios.delete(
        `/api/categories/deleteCategory?id=${categoryId}`
      );

      if (deletedProduct.data?.deleted) {
        dispatch(deleteCategory({ categoryId }));
        setShowDialog(false);

        return;
      }

      throw new Error(`Fail when try to delete a category`);
    } catch {
      deletedFailed();
    }
  };

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <Trigger
        type="button"
        className={styles.deleteCategoryDialogTrigger}
        aria-label="Excluir categoria"
      >
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
              onClick={deleteCategoryOnClick}
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
