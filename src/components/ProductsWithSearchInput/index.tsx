'use client';

import { useEffect, useState } from 'react';

import { Product } from '@/types/product';

import { getProducts } from '@/utils/api/getProducts';

import EditableFoodCard from '../EditableFoodCard';
import SearchInput from '../SearchInput';
import styles from './styles.module.css';

interface ProductsWithSearchInput {
  companyId: string;
}

export default function ProductsWithSearchInput({
  companyId,
}: ProductsWithSearchInput) {
  const [searchInputValue, setSearchInputValue] = useState(``);
  const [products, setProducts] = useState([] as Product[]);

  useEffect(() => {
    const getProductsData = async () => {
      const companyProductsResults = await getProducts(companyId);

      setProducts(companyProductsResults.products);
    };

    getProductsData();
  }, [companyId]);

  const removeProductFromList = (productId: string) => {
    const newProductsList = products.filter(
      (product) => product.id !== productId
    );

    setProducts(newProductsList);
  };

  const editProductFromList = (newProduct: Product) => {
    const newProductsList = products.map((product) =>
      product.id === newProduct.id ? newProduct : product
    );

    setProducts(newProductsList);
  };

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
          <p className={styles.productsWithSearchInputEmptyText}>
            Não existem produtos cadastrados
          </p>
        )}
      </div>
    </div>
  );
}
