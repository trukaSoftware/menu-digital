'use client';

import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { Root, Trigger } from '@radix-ui/react-dialog';

import CreateCategoryPortal from '../../CreateCategoryDialog/CreateCategoryPortal';
import CreateComplementPortal from '../../CreateComplementsDialog/CreateComplementsPortal';
import CreateProductPortal from '../../CreateProductDialog/CreateProductPortal';
import styles from './styles.module.css';

interface CreateFormTriggerProps {
  title: string;
  formType?: string;
}

export default function CreateFormTrigger({
  title,
  formType = `category-form`,
}: CreateFormTriggerProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <div className={styles.createFormTriggerWrapper}>
        <h2 className={styles.createFormTriggerTitle}>{title}</h2>
        <Trigger className={styles.createFormTrigger}>
          Criar
          <AiOutlinePlus />
        </Trigger>

        {formType === `product-form` ? (
          <CreateProductPortal setShowDialog={setShowDialog} />
        ) : (
          <CreateCategoryPortal setShowDialog={setShowDialog} />
        )}
        {formType === `complement-form` && (
          <CreateComplementPortal setShowDialog={setShowDialog} />
        )}
      </div>
    </Root>
  );
}
