'use client';

import { useState } from 'react';
import { MdSearchOff } from 'react-icons/md';

import { Root, Trigger } from '@radix-ui/react-dialog';

import CreateComplementPortal from '../Dialogs/CreateComplementsDialog/CreateComplementsPortal';
import styles from './styles.module.css';

export default function ComplementEmptyState() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className={styles.complementEmptyState}>
      <div className={styles.complementEmptyStateContent}>
        <MdSearchOff size={24} />
        <p>Nenhum adicional encontrado</p>
      </div>
      <Root open={showDialog} onOpenChange={setShowDialog}>
        <Trigger className={styles.createComplementButton}>
          Cadastrar adicional
        </Trigger>
        <CreateComplementPortal setShowDialog={setShowDialog} />
      </Root>
    </div>
  );
}
