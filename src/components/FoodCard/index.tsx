import Image from 'next/image';

import FoodImageSvg from '../../../public/images/food-image.svg';
import Prices from '../Prices';
import styles from './styles.module.css';

export interface FoodCardProps {
  title: string;
  description: string;
  foodImage: string;
  price: number;
  discountedPrice?: number;
  discountPercentage?: number;
}

export default function FoodCard({
  title,
  description,
  foodImage,
  price,
  discountedPrice,
  discountPercentage,
}: FoodCardProps) {
  return (
    <article className={styles.foodCard}>
      <div className={styles.foodImageWrapper}>
        <Image src={FoodImageSvg} alt={title} fill />
      </div>
      <div className={styles.foodCardTextContent}>
        <div className={styles.foodCardTextWrapper}>
          <h3 className={styles.foodCardTitle}>{title}</h3>
          <p className={styles.foodCardDescription}>{description}</p>
        </div>
        <Prices price={price} discountedPrice={discountedPrice} />
      </div>
      {discountPercentage ? (
        <div className={styles.foodCardDiscountTag}>{discountPercentage}%</div>
      ) : null}
    </article>
  );
}
