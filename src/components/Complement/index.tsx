import { useState } from 'react';

import { Complement } from '@/types/complement';

import ComplementItem from './ComplementItem';
import styles from './styles.module.css';

export interface ComplementProps {
  complement: Complement;
}

export interface ComplementSelectedProps {
  id: string;
  amount: number;
}

export default function Complement({ complement }: ComplementProps) {
  const [complementsSelected, setComplementsSelected] = useState<
    ComplementSelectedProps[]
  >([]);

  const totalComplements = complementsSelected.reduce(
    (acc, current) => acc + current.amount,
    0
  );

  const handleAddComplement = (id: string) => {
    if (totalComplements + 1 <= complement.maxAmount) {
      const complementSelected = complementsSelected.find(
        (comp) => comp.id === id
      );

      if (complementSelected) {
        setComplementsSelected(
          complementsSelected.map((comp) =>
            comp.id === id ? { ...comp, amount: comp.amount + 1 } : comp
          )
        );
      } else {
        setComplementsSelected([...complementsSelected, { id, amount: 1 }]);
      }
    }
  };

  const handleRemoveComplement = (
    id: string,
    selectedComplementItemAmount: number
  ) => {
    if (selectedComplementItemAmount > 1) {
      setComplementsSelected(
        complementsSelected.map((comp) =>
          comp.id === id ? { ...comp, amount: comp.amount - 1 } : comp
        )
      );

      return;
    }

    const newComplementsSelected = complementsSelected.filter(
      (comp) => comp.id !== id
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
