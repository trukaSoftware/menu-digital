import { useEffect, useState } from 'react';

import { Product, ProductResponse } from '@/types/product';

import { getter } from '@/app/utils/api/getter';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [gettingProducts, setGettingProducts] = useState(true);

  const getProductsResponse = async () => {
    const data = await getter<ProductResponse>(`/api/products/getProducts`);

    setProducts(data?.data?.products);
    setGettingProducts(false);
  };

  useEffect(() => {
    getProductsResponse();
  }, []);

  return { products, gettingProducts };
}
