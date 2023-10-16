'use client';

import { useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';

import { Root, Trigger } from '@radix-ui/react-dialog';

import ShoppingCartPortal from './ShoppingCartPortal';
import styles from './styles.module.css';

export default function ShoppingCartDialog() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <Trigger type="button" className={styles.shoppingCartDialogTrigger}>
        <FaShoppingBag size={24} fill="#fff" />
        <div className={styles.shoppingCartDialogContainerQuantityOfProducts}>
          1
        </div>
      </Trigger>
      <ShoppingCartPortal setShowDialog={setShowDialog} />
    </Root>
  );
}
