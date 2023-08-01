import { useEffect, useState } from 'react';

import { Product, ProductResponse } from '@/types/useProductsResponse';

import { getter } from '@/utils/getter';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProductsResponse = async () => {
    const data = await getter<ProductResponse>(`/api/products/getProducts`);

    setProducts(data.data.products);
  };

  useEffect(() => {
    getProductsResponse();
  }, []);

  return { products };
}
