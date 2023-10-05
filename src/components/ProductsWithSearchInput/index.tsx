'use client';

import { useState } from 'react';

import { useAppSelector } from '@/redux/store';

import EditableFoodCard from '../EditableFoodCard';
import ProductsEmptyState from '../ProductsEmptyState';
import SearchInput from '../SearchInput';
import styles from './styles.module.css';

export default function ProductsWithSearchInput() {
  const [searchInputValue, setSearchInputValue] = useState(``);
  const products = useAppSelector((state) => state.productsReducer.products);

  return (
    <div className={styles.productsWithSearchInputContainer}>
      <SearchInput
        id="search-product"
        placeholder="Pesquisar produto por nome..."
        onChange={(e) => setSearchInputValue(e.target.value.toLowerCase())}
        value={searchInputValue}
      />
      <div className={styles.productsWithSearchInputContainerProducts}>
        {products.length > 0 ? (
          products
            .filter((product) =>
              product.name.toLowerCase().includes(searchInputValue)
            )
            .map((product) => (
              <EditableFoodCard
                product={product}
                key={product.id}
                categoryId={product.productCategoriesId}
              />
            ))
        ) : (
          <ProductsEmptyState />
        )}
      </div>
    </div>
  );
}
