'use client';

import { useState } from 'react';
import { MdSearchOff } from 'react-icons/md';

import { Root, Trigger } from '@radix-ui/react-dialog';

import CreateProductPortal from '../Dialogs/CreateProductDialog/CreateProductPortal';
import styles from './styles.module.css';

export default function ProductsEmptyState() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className={styles.productsEmptyState}>
      <div className={styles.productsEmptyStateContent}>
        <MdSearchOff size={24} />
        <p>Nenhum produto encontrado</p>
      </div>
      <Root open={showDialog} onOpenChange={setShowDialog}>
        <Trigger className={styles.createProductButton}>
          Cadastrar produto
        </Trigger>
        <CreateProductPortal setShowDialog={setShowDialog} />
      </Root>
    </div>
  );
}
