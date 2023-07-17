import styles from './styles.module.css';

export interface PricesProps {
  price: number;
  discountedPrice?: number;
  priceClassName?: string;
  discountedPriceClassName?: string;
}

export default function Prices({
  price,
  discountedPrice,
  priceClassName = ``,
  discountedPriceClassName = ``,
}: PricesProps) {
  return (
    <p className={styles.foodCardPricesWrapper}>
      {discountedPrice ? (
        <span className={`${styles.foodCardDiscountPrice} ${priceClassName}`}>
          R$ {discountedPrice}
        </span>
      ) : null}
      <span
        className={`${styles.foodCardRealPrice} ${discountedPriceClassName} ${
          discountedPrice ? styles.foodCardPriceScratched : ``
        }`}
      >
        R$ {price}
      </span>
    </p>
  );
}