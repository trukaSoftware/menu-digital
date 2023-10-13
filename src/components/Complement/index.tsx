import { useState } from 'react';

import { Complement, ComplementItemProp } from '@/types/complement';

import ComplementItem from './ComplementItem';
import styles from './styles.module.css';

export interface ComplementProps {
  complement: Complement;
  addComplementPriceToCartItem: (price: number) => void;
  removeComplementPriceToCartItem: (price: number) => void;
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
  const [complementsSelected, setComplementsSelected] = useState<
    ComplementSelectedProps[]
  >([]);

  const totalComplements = complementsSelected.reduce(
    (acc, current) => acc + current.amount,
    0
  );

  const handleAddComplement = (complementItem: ComplementItemProp) => {
    if (totalComplements + 1 <= complement.maxAmount) {
      const complementSelected = complementsSelected.find(
        (comp) => comp.id === complementItem.id
      );

      if (complementSelected) {
        setComplementsSelected(
          complementsSelected.map((comp) =>
            comp.id === complementItem.id
              ? { ...comp, amount: comp.amount + 1 }
              : comp
          )
        );
      } else {
        setComplementsSelected([
          ...complementsSelected,
          {
            id: complementItem.id,
            amount: 1,
            price: Number(complementItem.price),
            name: complementItem.name,
          },
        ]);
      }

      addComplementPriceToCartItem(Number(complementItem.price));
    }
  };

  const handleRemoveComplement = (
    complementItem: ComplementItemProp,
    selectedComplementItemAmount: number
  ) => {
    removeComplementPriceToCartItem(Number(complementItem.price));
    if (selectedComplementItemAmount > 1) {
      setComplementsSelected(
        complementsSelected.map((comp) =>
          comp.id === complementItem.id
            ? { ...comp, amount: comp.amount - 1 }
            : comp
        )
      );

      return;
    }

    const newComplementsSelected = complementsSelected.filter(
      (comp) => comp.id !== complementItem.id
    );

    setComplementsSelected(newComplementsSelected);
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
            complementsSelected={complementsSelected}
          />
        ))}
      </ul>
    </div>
  );
}
