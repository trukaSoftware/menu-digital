import { FaPlus, FaMinus } from 'react-icons/fa6';

import { ComplementItemProp } from '@/types/complement';

import { priceToBrazilCurrency } from '@/utils/priceToBrazilCurrency';

import styles from './styles.module.css';

import { ComplementSelectedProps } from '..';

export interface ComplementItemProps {
  complementItem: ComplementItemProp;
  handleAddComplement: (complementItem: ComplementItemProp) => void;
  handleRemoveComplement: (
    complementItem: ComplementItemProp,
    complementPrice: number
  ) => void;
  complementsSelected: ComplementSelectedProps[];
}

export default function ComplementItem({
  complementItem,
  handleAddComplement,
  complementsSelected,
  handleRemoveComplement,
}: ComplementItemProps) {
  const selectedAmount = complementsSelected.find(
    (compItem) => compItem.id === complementItem.id
  );

  return (
    <li className={styles.complementItemWrapper}>
      <div className={styles.complementItemTitleWrapper}>
        <h4>{complementItem.name}</h4>
        <p>{priceToBrazilCurrency(+complementItem.price)}</p>
      </div>
      <div
        className={`${styles.complementItemButtonsWrapper} ${
          selectedAmount ? styles.complementItemButtonsWrapperSelected : ``
        }`}
      >
        {selectedAmount ? (
          <>
            <button
              type="button"
              onClick={() =>
                handleRemoveComplement(
                  complementItem,
                  Number(selectedAmount.amount)
                )
              }
            >
              <FaMinus size={18} className={styles.complementItemMinusIcon} />
            </button>
            <p>{selectedAmount.amount}</p>
          </>
        ) : null}
        <button
          type="button"
          onClick={() => handleAddComplement(complementItem)}
        >
          <FaPlus size={18} />
        </button>
      </div>
    </li>
  );
}
