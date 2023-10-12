'use client';

import { CgClose } from 'react-icons/cg';

import Image from 'next/image';

import * as Dialog from '@radix-ui/react-dialog';

import Complement from '../Complement';
import FoodCard, { FoodCardProps } from '../FoodCard';
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
              src={foodCard.foodImage}
              alt={foodCard.title}
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
          </div>
          {foodCard.complements.length > 0
            ? foodCard.complements?.map((complement) => (
                <Complement
                  key={complement.complementId}
                  complement={complement.complements}
                />
              ))
            : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
