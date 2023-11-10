'use client';

import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useParams } from 'next/navigation';

import axios from 'axios';

import ButtonSubmit from '@/components/ButtonSubmit';

import { getComplements } from '@/utils/api/getComplements';
import { getItems } from '@/utils/api/getItems';

import { setComplements } from '@/redux/features/complements-slice';
import { setItems } from '@/redux/features/items-slice';
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
  const params = useParams();
  const dispatch = useDispatch();

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
        const allComplements = await getComplements(params.companyId);
        const allItems = await getItems(params.companyId);
        dispatch(setComplements(allComplements.complements));
        dispatch(setItems(allItems.items));
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
