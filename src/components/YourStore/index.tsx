'use client';

import { GetCategoryReturn } from '@/types/category';

import { useAppSelector } from '@/redux/store';

import EditableCategoryTitle from '../EditableCategoryTitle';
import EditableFoodCard from '../EditableFoodCard';
import styles from './styles.module.css';

export interface YourStoreProps {
  categories: GetCategoryReturn[];
}

export default function YourStore() {
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  );

  const onlyCategoriesWithProducts = categories.filter(
    (category) => category.categoryProducts.length > 0
  );

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
