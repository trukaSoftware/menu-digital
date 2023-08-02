import { UseFormRegisterReturn } from 'react-hook-form';

import { Product } from '@/types/product';

import styles from './styles.module.css';

export interface SearchProductsListProps {
  filteredProducts: Product[];
  register: UseFormRegisterReturn;
}

export default function SearchProductsList({
  filteredProducts,
  register,
}: SearchProductsListProps) {
  return (
    <div className={styles.searchProductsList}>
      {filteredProducts.map((product) => (
        <label
          htmlFor={product.id}
          className={styles.searchProductItem}
          key={product.id}
        >
          <input
            type="checkbox"
            value={product.id}
            id={product.id}
            className={styles.searchProductItemCheckbox}
            {...register}
          />
          <span className={styles.newCheckBox} />
          <span>{product.name}</span>
        </label>
      ))}
    </div>
  );
}
