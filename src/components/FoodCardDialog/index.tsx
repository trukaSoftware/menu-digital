'use client';

import { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FaMinus, FaPlus } from 'react-icons/fa6';

import Image from 'next/image';

import { priceToBrazilCurrency } from '@/utils/priceToBrazilCurrency';

import * as Dialog from '@radix-ui/react-dialog';

import Complement, { ComplementSelectedProps } from '../Complement';
import FoodCard, { FoodCardProps } from '../FoodCard';
import styles from './styles.module.css';

export interface FoodCardDialogProps {
  foodCard: FoodCardProps;
}

export interface SelectedComplement {
  idComplemento: string;
  items: ComplementSelectedProps[];
}
export interface CartItemProps {
  totalValue: number;
  originalValue: number;
  amount: number;
  observation: string;
  allSelectedComplements: SelectedComplement[];
}

export default function FoodCardDialog({ foodCard }: FoodCardDialogProps) {
  const CART_ITEM_INITIAL_VALUE = {
    totalValue: foodCard.price,
    originalValue: foodCard.price,
    amount: 1,
    observation: ``,
    allSelectedComplements: [],
  };

  const [cartItem, setCartItem] = useState<CartItemProps>(
    CART_ITEM_INITIAL_VALUE
  );

  useEffect(() => {
    setCartItem(CART_ITEM_INITIAL_VALUE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addComplementPriceToCartItem = (price: number) => {
    const newTotalValuePrice = cartItem.totalValue + price * cartItem.amount;
    const newOriginalValuePrice = cartItem.originalValue + price;

    setCartItem({
      ...cartItem,
      totalValue: newTotalValuePrice,
      originalValue: newOriginalValuePrice,
    });
  };

  const removeComplementPriceToCartItem = (price: number) => {
    const newTotalValuePrice = cartItem.totalValue - price * cartItem.amount;
    const newOriginalValuePrice = cartItem.originalValue - price;

    setCartItem({
      ...cartItem,
      totalValue: newTotalValuePrice,
      originalValue: newOriginalValuePrice,
    });
  };

  const addCartProductAmount = () => {
    const newAmount = cartItem.amount + 1;

    setCartItem({
      ...cartItem,
      amount: newAmount,
      totalValue: cartItem.originalValue * newAmount,
    });
  };

  const removeCartProductAmount = () => {
    if (cartItem.amount === 1) return;
    const newAmount = cartItem.amount - 1;

    setCartItem({
      ...cartItem,
      amount: newAmount,
      totalValue: cartItem.originalValue * newAmount,
    });
  };

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
                  addComplementPriceToCartItem={addComplementPriceToCartItem}
                  removeComplementPriceToCartItem={
                    removeComplementPriceToCartItem
                  }
                />
              ))
            : null}
          <label className={styles.observationLabel} htmlFor="observation">
            Observações
            <textarea
              id="observation"
              placeholder="ex: remover pimentão e cenoura"
              value={cartItem.observation}
              onChange={(e) =>
                setCartItem({ ...cartItem, observation: e.target.value })
              }
            />
          </label>
          <div className={styles.foodCardAddToCartWrapper}>
            <div className={styles.addMoreToCart}>
              <button type="button" onClick={removeCartProductAmount}>
                <FaMinus size={18} className={styles.addMoreToCartPlusIcon} />
              </button>
              <p>{cartItem.amount}</p>
              <button type="button" onClick={addCartProductAmount}>
                <FaPlus size={18} className={styles.addMoreToCartMinusIcon} />
              </button>
            </div>
            <button type="button" className={styles.btnAddToCart}>
              <span>Adicionar</span>
              <span>{priceToBrazilCurrency(cartItem.totalValue)}</span>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
