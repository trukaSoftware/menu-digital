'use client';

import { useState } from 'react';

import { GetCategoryReturn } from '@/types/category';

import EditableFoodCard from '../EditableFoodCard';
import styles from './styles.module.css';

export interface YourStoreProps {
  categories: GetCategoryReturn[];
}

export default function YourStore({ categories }: YourStoreProps) {
  const [categoriesWithProducts, setProductsToLoad] = useState(categories);
  const onlyCategoriesWithProducts = categoriesWithProducts.filter(
    (category) => category.categoryProducts.length > 0
  );

  const removeProductFromList = (productId: string, categoryId: string) => {
    const indexOfTheCategory = categoriesWithProducts.findIndex(
      (category) => category.id === categoryId
    );

    const newProductsList = categoriesWithProducts[
      indexOfTheCategory
    ].categoryProducts.filter((product) => product.id !== productId);

    const newCategoriesList = categoriesWithProducts.map((category) =>
      category.id === categoryId
        ? { ...category, categoryProducts: newProductsList }
        : category
    );

    setProductsToLoad(newCategoriesList);
  };

  return (
    <section className={styles.yourStoreProductsList}>
      {onlyCategoriesWithProducts.length > 0
        ? onlyCategoriesWithProducts.map((category) => (
            <>
              <h2>{category.name}</h2>
              {category.categoryProducts.map((product) => (
                <EditableFoodCard
                  description={product.description}
                  foodImage={product?.productsImages[0].imageUrl}
                  price={+product.price}
                  title={product.name}
                  id={product.id}
                  removeProductFromList={removeProductFromList}
                  key={product.id}
                  categoryId={category.id}
                />
              ))}
            </>
          ))
        : null}
      {/* {productsToLoad.map((product) => (
        <>
          <h2>{product.name}</h2>
          <EditableFoodCard
            description={product.description}
            foodImage={product?.productsImages[0].imageUrl}
            price={+product.price}
            title={product.name}
            id={product.id}
            removeProductFromList={removeProductFromList}
            key={product.id}
          />
        </>
      ))} */}
    </section>
  );
}
