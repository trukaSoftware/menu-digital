'use client';

import { useState } from 'react';

import { GetCategoryReturn } from '@/types/category';

import { useAppSelector } from '@/redux/store';

import EditableCategoryTitle from '../EditableCategoryTitle';
import EditableFoodCard from '../EditableFoodCard';
import styles from './styles.module.css';

export interface YourStoreProps {
  categories: GetCategoryReturn[];
}

export default function YourStore() {
  const reduxCategories = useAppSelector(
    (state) => state.categoriesReducer.categories
  );
  const [categoriesWithProducts, setCategoriesWithProducts] =
    useState(reduxCategories);

  const onlyCategoriesWithProducts = reduxCategories.filter(
    (category) => category.categoryProducts.length > 0
  );

  const removeCategoryFromList = (categoryToDeleteId: string) => {
    const newCategoryList = categoriesWithProducts.filter(
      (category) => category.id !== categoryToDeleteId
    );

    setCategoriesWithProducts(newCategoryList);
  };

  return (
    <section className={styles.yourStoreProductsList}>
      {onlyCategoriesWithProducts.length > 0
        ? onlyCategoriesWithProducts.map((category) => (
            <div
              key={category.id}
              className={styles.yourStoreCategoryContainer}
            >
              <EditableCategoryTitle
                categoryName={category.name}
                categoryId={category.id}
                removeCategoryFromList={removeCategoryFromList}
              />
              {category.categoryProducts.map((product) => (
                <EditableFoodCard
                  product={product}
                  key={product.id}
                  categoryId={category.id}
                />
              ))}
            </div>
          ))
        : null}
    </section>
  );
}
