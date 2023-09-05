import { useEffect, useState } from 'react';

import { Product, ProductResponse } from '@/types/product';

import { getter } from '@/utils/api/getter';

export function useProducts(companyId: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [gettingProducts, setGettingProducts] = useState(true);

  useEffect(() => {
    const getProductsResponse = async () => {
      const data = await getter<ProductResponse>(
        `/api/products/getProducts?id=${companyId}`
      );

      setProducts(data?.data?.products);
      setGettingProducts(false);
    };

    getProductsResponse();
  }, [companyId]);

  return { products, gettingProducts };
}
