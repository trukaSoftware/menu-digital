import Image from 'next/image';

import FoodImageSvg from '../../../../public/images/food-image.svg';
import styles from './styles.module.css';
import { priceToBrazilCurrency } from './utils/utils';

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
        <Image src={FoodImageSvg} alt="Foto da comida" fill />
      </div>
      <div className={styles.foodCardTextContent}>
        <div className={styles.foodCardTextWrapper}>
          <h3 className={styles.foodCardTitle}>{title}</h3>
          <p className={styles.foodCardDescription}>{description}</p>
        </div>
        <p className={styles.foodCardPricesWrapper}>
          {discountedPrice ? (
            <span className={`${styles.foodCardDiscountPrice}`}>
              {priceToBrazilCurrency(discountedPrice)}
            </span>
          ) : null}
          <span
            className={`${styles.foodCardRealPrice} ${
              discountedPrice ? styles.foodCardPriceScratched : ``
            }`}
          >
            {priceToBrazilCurrency(price)}
          </span>
        </p>
      </div>
      {discountPercentage ? (
        <div className={styles.foodCardDiscountTag}>{discountPercentage}%</div>
      ) : null}
    </article>
  );
}
