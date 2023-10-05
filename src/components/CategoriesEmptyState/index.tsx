'use client';

import { useState } from 'react';
import { MdSearchOff } from 'react-icons/md';

import { Root, Trigger } from '@radix-ui/react-dialog';

import CreateCategoryPortal from '../Dialogs/CreateCategoryDialog/CreateCategoryPortal';
import styles from './styles.module.css';

export default function CategoriesEmptyState() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className={styles.categoriesEmptyState}>
      <div className={styles.categoriesEmptyStateContent}>
        <MdSearchOff size={24} />
        <p>Nenhuma categoria encontrada</p>
      </div>
      <Root open={showDialog} onOpenChange={setShowDialog}>
        <Trigger className={styles.createCategoryButton}>
          Cadastrar categoria
        </Trigger>
        <CreateCategoryPortal setShowDialog={setShowDialog} />
      </Root>
    </div>
  );
}
