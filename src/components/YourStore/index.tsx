'use client';

import { useState } from 'react';

import { GetCategoryReturn } from '@/types/category';
import { Product } from '@/types/product';

import EditableCategoryTitle from '../EditableCategoryTitle';
import EditableFoodCard from '../EditableFoodCard';
import styles from './styles.module.css';

export interface YourStoreProps {
  categories: GetCategoryReturn[];
}

export default function YourStore({ categories }: YourStoreProps) {
  const [categoriesWithProducts, setCategoriesWithProducts] =
    useState(categories);
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

    setCategoriesWithProducts(newCategoriesList);
  };

  const editProductFromList = (newProduct: Product, categoryId: string) => {
    const indexOfTheCategory = categoriesWithProducts.findIndex(
      (category) => category.id === categoryId
    );

    const newProductsList = categoriesWithProducts[
      indexOfTheCategory
    ].categoryProducts.map((product) =>
      product.id === newProduct.id ? newProduct : product
    );

    const newCategoriesList = categoriesWithProducts.map((category) =>
      category.id === categoryId
        ? { ...category, categoryProducts: newProductsList }
        : category
    );

    setCategoriesWithProducts(newCategoriesList);
  };

  const removeCategoryFromList = (categoryToDeleteId: string) => {
    const newCategoryList = categoriesWithProducts.filter(
      (category) => category.id !== categoryToDeleteId
    );

    setCategoriesWithProducts(newCategoryList);
  };

  const editProductFromList = (newProduct: Product, categoryId: string) => {
    const indexOfTheCategory = categoriesWithProducts.findIndex(
      (category) => category.id === categoryId
    );

    const newProductsList = categoriesWithProducts[
      indexOfTheCategory
    ].categoryProducts.map((product) =>
      product.id === newProduct.id ? newProduct : product
    );

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
                  removeProductFromList={removeProductFromList}
                  editProductFromList={editProductFromList}
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
