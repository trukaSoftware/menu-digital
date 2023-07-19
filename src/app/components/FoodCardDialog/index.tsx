'use client';

import { CgClose } from 'react-icons/cg';

import Image from 'next/image';

import * as Dialog from '@radix-ui/react-dialog';

import FoodImageSvg from '../../../../public/images/food-image-square.svg';
import FoodCard, { FoodCardProps } from '../FoodCard';
import Prices from '../Prices';
import styles from './styles.module.css';

export interface FoodCardDialogProps {
  foodCard: FoodCardProps;
}

export default function FoodCardDialog({ foodCard }: FoodCardDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.foodCardDialogTrigger}>
        <FoodCard {...foodCard} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.foodCardDialogOverlay} />
        <Dialog.Content className={styles.foodCardDialogContent}>
          <Dialog.Close
            className={styles.foodCardDialogClose}
            aria-label="Fechar modal"
          >
            <CgClose size={30} color="#fff" />
          </Dialog.Close>
          {foodCard?.discountPercentage ? (
            <div
              className={styles.foodCardDialogDiscount}
              data-testid="modal-discount-tag"
            >
              <span>{foodCard.discountPercentage}%</span>
            </div>
          ) : null}
          <div className={styles.foodCardDialogImageWrapper}>
            <Image
              src={FoodImageSvg}
              alt="Foto da comida"
              fill
              className={styles.foodCardDialogImage}
            />
          </div>
          <div className={styles.foodCardImageSpace} />
          <div className={styles.foodCardDialogInfo}>
            <Dialog.Title className={styles.foodCardDialogTitle}>
              {foodCard.title}
            </Dialog.Title>
            <Dialog.Description className={styles.foodCardDialogDescription}>
              {foodCard.description}
            </Dialog.Description>
            <Prices
              price={foodCard.price}
              discountedPrice={foodCard.discountedPrice}
              priceClassName={styles.bigPriceClassName}
              discountedPriceClassName={styles.bigPriceClassName}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
