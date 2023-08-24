import EditProductForm from '@/components/Forms/EditProductForm';
import ModalDefaultHeader from '@/components/ModalDefaultHeader';

import { Product } from '@/types/product';

import { Portal, Overlay, Content } from '@radix-ui/react-dialog';

import styles from './styles.module.css';

export interface EditProductPortalProps {
  setShowDialog: (value: boolean) => void;
  product: Product;
  categoryId: string;
  editProductFromList: (newProduct: Product, categoryId: string) => void;
}

export default function EditProductPortal({
  setShowDialog,
  product,
  categoryId,
  editProductFromList,
}: EditProductPortalProps) {
  return (
    <Portal>
      <Overlay className={styles.editProductOverlay} />
      <Content className={styles.editProductContent}>
        <ModalDefaultHeader title="Edição de produto" />
        <EditProductForm
          setShowDialog={setShowDialog}
          product={product}
          categoryId={categoryId}
          editProductFromList={editProductFromList}
        />
      </Content>
    </Portal>
  );
}
