import Image from 'next/image';

import { Product } from '@/types/product';

import DeleteProductDialog from '../Dialogs/DeleteProductDialog';
import EditProductDialog from '../Dialogs/EditProductDialog';
import Prices from '../Prices';
import styles from './styles.module.css';

export interface EditableFoodCardProps {
  product: Product;
  categoryId: string;
  removeProductFromList: (productId: string, categoryId: string) => void;
}

export default function EditableFoodCard({
  product,
  categoryId,
  removeProductFromList,
}: EditableFoodCardProps) {
  return (
    <div>
      <article className={styles.editableFoodCard}>
        <div className={styles.editableFoodImageWrapper}>
          <Image
            src={product?.productsImages[0].imageUrl}
            alt={product.name}
            fill
          />
        </div>
        <div className={styles.editableFoodCardTextContent}>
          <div className={styles.editableFoodCardTextWrapper}>
            <h3 className={styles.editableFoodCardTitle}>{product.name}</h3>
            <p className={styles.editableFoodCardDescription}>
              {product.description}
            </p>
          </div>
          <Prices price={+product.price} discountedPrice={product.discount} />
        </div>
        {product.discount ? (
          <div className={styles.editableFoodCardDiscountTag}>
            {product.discount}%
          </div>
        ) : null}
      </article>
      <div className={styles.editableFoodButtonsWrapper}>
        <DeleteProductDialog
          productId={product.id}
          categoryId={categoryId}
          removeProductFromList={removeProductFromList}
        />
        <EditProductDialog product={product} categoryId={categoryId} />
      </div>
    </div>
  );
}
