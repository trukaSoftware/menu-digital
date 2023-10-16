'use client';

import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { toast } from 'react-toastify';

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
  complementId: string;
  items: ComplementSelectedProps[];
}
export interface CartItemProps {
  productImage: string;
  productName: string;
  totalValue: number;
  originalValue: number;
  amount: number;
  observation: string;
  allSelectedComplements: SelectedComplement[];
}

export default function FoodCardDialog({ foodCard }: FoodCardDialogProps) {
  const CART_ITEM_INITIAL_VALUE = {
    productImage: foodCard.foodImage,
    productName: foodCard.title,
    totalValue: foodCard.price,
    originalValue: foodCard.price,
    amount: 1,
    observation: ``,
    allSelectedComplements: [],
  } as CartItemProps;

  const [cartItem, setCartItem] = useState<CartItemProps>(
    CART_ITEM_INITIAL_VALUE
  );
  const addComplementPriceToCartItem = (
    price: number,
    selectedComplement: SelectedComplement
  ) => {
    const newTotalValuePrice = cartItem.totalValue + price * cartItem.amount;
    const newOriginalValuePrice = cartItem.originalValue + price;
    const complementIsNotInArray = !cartItem.allSelectedComplements.find(
      (comp) => comp.complementId === selectedComplement.complementId
    );

    if (
      cartItem.allSelectedComplements.length === 0 ||
      complementIsNotInArray
    ) {
      return setCartItem({
        ...cartItem,
        totalValue: newTotalValuePrice,
        originalValue: newOriginalValuePrice,
        allSelectedComplements: [
          ...cartItem.allSelectedComplements,
          selectedComplement,
        ],
      });
    }

    const newAllSelectedComplements = cartItem.allSelectedComplements.map(
      (comp) =>
        comp.complementId === selectedComplement.complementId
          ? selectedComplement
          : comp
    );

    setCartItem({
      ...cartItem,
      totalValue: newTotalValuePrice,
      originalValue: newOriginalValuePrice,
      allSelectedComplements: newAllSelectedComplements,
    });
  };

  const removeComplementPriceToCartItem = (
    price: number,
    selectedComplement: SelectedComplement
  ) => {
    const newTotalValuePrice = cartItem.totalValue - price * cartItem.amount;
    const newOriginalValuePrice = cartItem.originalValue - price;

    const isComplementWithNoItens = selectedComplement.items.length === 0;

    if (isComplementWithNoItens) {
      const newAllSelectedComplements = cartItem.allSelectedComplements.filter(
        (comp) => comp.complementId !== selectedComplement.complementId
      );

      return setCartItem({
        ...cartItem,
        totalValue: newTotalValuePrice,
        originalValue: newOriginalValuePrice,
        allSelectedComplements: newAllSelectedComplements,
      });
    }

    const newAllSelectedComplements = cartItem.allSelectedComplements.map(
      (comp) =>
        comp.complementId === selectedComplement.complementId
          ? selectedComplement
          : comp
    );

    setCartItem({
      ...cartItem,
      totalValue: newTotalValuePrice,
      originalValue: newOriginalValuePrice,
      allSelectedComplements: newAllSelectedComplements,
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

  const handleAddToCart = () => {
    localStorage.setItem(`mdFoodCartItems`, JSON.stringify(cartItem));
    toast.success(`${foodCard.title} adicionado ao carrinho!`);
  };

  return (
    <Dialog.Root onOpenChange={() => setCartItem(CART_ITEM_INITIAL_VALUE)}>
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
            <Dialog.Close
              type="button"
              className={styles.btnAddToCart}
              onClick={handleAddToCart}
            >
              <span>Adicionar</span>
              <span>{priceToBrazilCurrency(cartItem.totalValue)}</span>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
