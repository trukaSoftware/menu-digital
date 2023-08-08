import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

import Image from 'next/image';

import FoodImageSvg from '../../../../public/images/food-image.svg';
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
}

export default function EditableFoodCard({
  title,
  description,
  foodImage,
  price,
  discountedPrice,
  discountPercentage,
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
        <button type="button" className={styles.editableFoodCardDelBtn}>
          <span>Excluir</span>
          <FaRegTrashAlt size={18} />
        </button>
        <button type="button" className={styles.editableFoodCardEditBtn}>
          <span>Editar</span>
          <FaRegEdit size={18} />
        </button>
      </div>
    </div>
  );
}
