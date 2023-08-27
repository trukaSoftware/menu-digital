import { Product, ProductResponse } from '@/types/product';

import api from '@/utils/api';

export async function getProducts(companyId: string) {
  const data = await api.get<ProductResponse>(
    `/products/getProducts?id=${companyId}`
  );

  return { products: data?.data?.products as Product[] };
}
