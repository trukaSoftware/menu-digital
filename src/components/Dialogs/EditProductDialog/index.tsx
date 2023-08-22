import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';

import { Product } from '@/types/product';

import { Root, Trigger } from '@radix-ui/react-dialog';

import EditProductPortal from './EditProductPortal';
import styles from './styles.module.css';

export interface EditProductDialogProps {
  product: Product;
  categoryId: string;
}

export default function EditProductDialog({
  product,
  categoryId,
}: EditProductDialogProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Root open={showDialog} onOpenChange={setShowDialog}>
      <Trigger type="button" className={styles.editProductDialogTrigger}>
        <span>Editar</span>
        <FaRegEdit size={18} />
      </Trigger>
      <EditProductPortal
        product={product}
        setShowDialog={setShowDialog}
        categoryId={categoryId}
      />
    </Root>
  );
}
