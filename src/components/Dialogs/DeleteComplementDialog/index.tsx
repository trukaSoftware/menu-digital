'use client';

import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

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

export interface DeleteComplementDialogProps {
  complementId: string;
}

export default function DeleteComplementDialog({
  complementId,
}: DeleteComplementDialogProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [deleteError, setDeleteError] = useState(``);
  const [isDeleting, setIsDeleting] = useState(false);

  const deletedFailed = () => {
    setIsDeleting(false);
    setDeleteError(`Falha ❌`);
    setTimeout(() => setDeleteError(``), 3000);
  };

  const deleteComplementOnClick = async () => {
    setIsDeleting(true);
    try {
      const deletedComplement = await axios.delete(
        `/api/complements/deleteComplement?id=${complementId}`
      );

      if (deletedComplement.data?.deleted) {
        setShowDialog(false);
        toast.success(`Adicional deletado com sucesso!`);
        return;
      }

      throw new Error(`Fail when try to delete a complement`);
    } catch {
      toast.error(`Deleção de adicional falhou, tente novamente em instantes!`);
      deletedFailed();
    }
  };

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <Trigger
        type="button"
        className={styles.deleteComplementDialogTrigger}
        aria-label="Excluir adicional"
      >
        <FaRegTrashAlt size={18} />
      </Trigger>
      <Portal>
        <Overlay className={styles.deleteComplementDialogOverlay} />
        <Content className={styles.deleteComplementDialogContent}>
          <p className={styles.deleteComplementDialogText}>
            Deseja realmente excluir este adicional? Essa ação é
            <span> irreversível</span>.
          </p>
          <div className={styles.deleteComplementDialogButtons}>
            <ButtonSubmit
              isSubmiting={isDeleting}
              className={styles.deleteComplementDialogDelBtn}
              text={deleteError || `Sim`}
              onClick={deleteComplementOnClick}
              type="button"
            />
            <Close
              type="button"
              className={styles.deleteComplementDialogCancelBtn}
            >
              Não
            </Close>
          </div>
        </Content>
      </Portal>
    </Root>
  );
}
