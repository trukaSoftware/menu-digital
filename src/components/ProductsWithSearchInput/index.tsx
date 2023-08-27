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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        onChange={(e) => setSearchInputValue(e.target.value)}
        value={searchInputValue}
      />
      {products.length > 0 ? (
        products.map((product) => (
          <EditableFoodCard
            product={product}
            removeProductFromList={removeProductFromList}
            editProductFromList={editProductFromList}
            key={product.id}
            categoryId={product.productCategoriesId}
          />
        ))
      ) : (
        <p>Não existem produtos cadastrados</p>
      )}
    </div>
  );
}
