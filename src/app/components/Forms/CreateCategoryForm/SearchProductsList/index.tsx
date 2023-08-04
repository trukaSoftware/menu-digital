import { UseFormRegisterReturn } from 'react-hook-form';
import { MdOutlineSearchOff } from 'react-icons/md';

import { Product } from '@/types/product';

import Spinner from '@/app/components/Spinner';

import styles from './styles.module.css';

export interface SearchProductsListProps {
  filteredProducts: Product[];
  register: UseFormRegisterReturn;
  gettingProducts: boolean;
}

export default function SearchProductsList({
  filteredProducts,
  register,
  gettingProducts,
}: SearchProductsListProps) {
  return (
    <div className={styles.searchProductsList}>
      {gettingProducts ? (
        <div className={styles.searchingProducts}>
          <p>Buscando produtos</p>
          <Spinner size={32} color="#000" />
        </div>
      ) : null}

      {!gettingProducts &&
        (filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <label
              htmlFor={product.id}
              className={styles.searchProductItem}
              key={`${product.id}-label`}
            >
              <input
                type="checkbox"
                value={product.id}
                id={product.id}
                className={styles.searchProductItemCheckbox}
                key={`${product.id}-input`}
                {...register}
              />
              <span className={styles.newCheckBox} />
              <span>{product.name}</span>
            </label>
          ))
        ) : (
          <div className={styles.noProductsFound}>
            <MdOutlineSearchOff size={28} />
            <p>Nenhum produto encontrado</p>
          </div>
        ))}
    </div>
  );
}
