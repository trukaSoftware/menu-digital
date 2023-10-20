import { UseFormRegisterReturn } from 'react-hook-form';
import { MdOutlineSearchOff } from 'react-icons/md';

import CheckboxInput from '@/components/CheckboxInput';
import Spinner from '@/components/Spinner';

import { Product } from '@/types/product';

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
            <CheckboxInput
              text={product.name}
              id={product.id}
              dataTestId={product.productCategoriesId}
              register={register}
              key={`${product.id}-label`}
            />
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
