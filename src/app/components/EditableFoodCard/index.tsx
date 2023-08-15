import { FaRegEdit } from 'react-icons/fa';

import Image from 'next/image';

import FoodImageSvg from '../../../../public/images/food-image.svg';
import DeleteProductDialog from '../Dialogs/DeleteProductDialog';
import Prices from '../Prices';
import styles from './styles.module.css';

export interface EditableFoodCardProps {
  title: string;
  description: string;
  foodImage: string;
  price: number;
  discountedPrice?: number;
  discountPercentage?: number;
  id: string;
  categoryId: string;
  removeProductFromList: (productId: string, categoryId: string) => void;
}

export default function EditableFoodCard({
  title,
  description,
  foodImage,
  price,
  discountedPrice,
  discountPercentage,
  id,
  categoryId,
  removeProductFromList,
}: EditableFoodCardProps) {
  return (
    <div>
      <article className={styles.editableFoodCard}>
        <div className={styles.editableFoodImageWrapper}>
          <Image src={FoodImageSvg} alt={title} fill />
        </div>
        <div className={styles.editableFoodCardTextContent}>
          <div className={styles.editableFoodCardTextWrapper}>
            <h3 className={styles.editableFoodCardTitle}>{title}</h3>
            <p className={styles.editableFoodCardDescription}>{description}</p>
          </div>
          <Prices price={price} discountedPrice={discountedPrice} />
        </div>
        {discountPercentage ? (
          <div className={styles.editableFoodCardDiscountTag}>
            {discountPercentage}%
          </div>
        ) : null}
      </article>
      <div className={styles.editableFoodButtonsWrapper}>
        <DeleteProductDialog
          productId={id}
          categoryId={categoryId}
          removeProductFromList={removeProductFromList}
        />
        <button type="button" className={styles.editableFoodCardEditBtn}>
          <span>Editar</span>
          <FaRegEdit size={18} />
        </button>
      </div>
    </div>
  );
}
