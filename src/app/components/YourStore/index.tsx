'use client';

import { useState } from 'react';

import { Product } from '@/types/product';

import EditableFoodCard from '../EditableFoodCard';
import styles from './styles.module.css';

export interface YourStoreProps {
  products: Product[];
}

export default function YourStore({ products }: YourStoreProps) {
  const [productsToLoad, setProductsToLoad] = useState(products);

  const removeProductFromList = (productId: string) => {
    const newProductsList = productsToLoad.filter(
      (product) => product.id !== productId
    );

    setProductsToLoad(newProductsList);
  };

  return (
    <section className={styles.yourStoreProductsList}>
      {productsToLoad.map((product) => (
        <EditableFoodCard
          description={product.description}
          foodImage={product?.productsImages[0].imageUrl}
          price={+product.price}
          title={product.name}
          id={product.id}
          removeProductFromList={removeProductFromList}
          key={product.id}
        />
      ))}
    </section>
  );
}
