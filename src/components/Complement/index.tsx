import { useState } from 'react';

import { Complement, ComplementItemProp } from '@/types/complement';

import { SelectedComplement } from '../FoodCardDialog';
import ComplementItem from './ComplementItem';
import styles from './styles.module.css';

export interface ComplementProps {
  complement: Complement;
  addComplementPriceToCartItem: (
    price: number,
    selectedComplement: SelectedComplement
  ) => void;
  removeComplementPriceToCartItem: (
    price: number,
    selectedComplement: SelectedComplement
  ) => void;
}

export interface ComplementSelectedProps {
  id: string;
  amount: number;
  price: number;
  name: string;
}

export default function Complement({
  complement,
  addComplementPriceToCartItem,
  removeComplementPriceToCartItem,
}: ComplementProps) {
  const [complementItemsSelected, setComplementItemsSelected] = useState<
    ComplementSelectedProps[]
  >([]);

  const totalComplements = complementItemsSelected.reduce(
    (acc, current) => acc + current.amount,
    0
  );

  const handleAddComplement = (complementItem: ComplementItemProp) => {
    if (totalComplements + 1 <= complement.maxAmount) {
      const complementSelected = complementItemsSelected.find(
        (comp) => comp.id === complementItem.id
      );

      if (complementSelected) {
        const newComplementItemsSelected = complementItemsSelected.map((comp) =>
          comp.id === complementItem.id
            ? { ...comp, amount: comp.amount + 1 }
            : comp
        );

        setComplementItemsSelected(newComplementItemsSelected);

        return addComplementPriceToCartItem(Number(complementItem.price), {
          complementId: complement.id,
          items: newComplementItemsSelected,
        });
      }

      const newComplementItemsSelected = [
        ...complementItemsSelected,
        {
          id: complementItem.id,
          amount: 1,
          price: Number(complementItem.price),
          name: complementItem.name,
        },
      ];

      setComplementItemsSelected(newComplementItemsSelected);

      addComplementPriceToCartItem(Number(complementItem.price), {
        complementId: complement.id,
        items: newComplementItemsSelected,
      });
    }
  };

  const handleRemoveComplement = (
    complementItem: ComplementItemProp,
    selectedComplementItemAmount: number
  ) => {
    if (selectedComplementItemAmount > 1) {
      const newComps = complementItemsSelected.map((comp) =>
        comp.id === complementItem.id
          ? { ...comp, amount: comp.amount - 1 }
          : comp
      );

      removeComplementPriceToCartItem(Number(complementItem.price), {
        complementId: complement.id,
        items: newComps,
      });

      return setComplementItemsSelected(newComps);
    }

    const newComplementsSelected = complementItemsSelected.filter(
      (comp) => comp.id !== complementItem.id
    );

    removeComplementPriceToCartItem(Number(complementItem.price), {
      complementId: complement.id,
      items: newComplementsSelected,
    });

    setComplementItemsSelected(newComplementsSelected);
  };

  return (
    <div className={styles.complementWrapper}>
      <div className={styles.complementContent}>
        <div className={styles.complementTitleWrapper}>
          <h3>{complement.name}</h3>
          <p>
            {complement.maxAmount === 1
              ? `Escolha uma opção`
              : `Escolha até ${complement.maxAmount} opções`}
          </p>
        </div>
        <p className={styles.complementAmount}>
          {totalComplements}/{complement.maxAmount}
        </p>
      </div>
      <ul className={styles.complementItemsWrapper}>
        {complement.items.map((complementItem) => (
          <ComplementItem
            key={complementItem.id}
            complementItem={complementItem}
            handleAddComplement={handleAddComplement}
            handleRemoveComplement={handleRemoveComplement}
            complementsSelected={complementItemsSelected}
          />
        ))}
      </ul>
    </div>
  );
}
