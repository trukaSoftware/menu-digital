import { Product, ProductResponse } from '@/types/product';

import api from '@/app/utils/api';

export async function getProducts() {
  const data = await api.get<ProductResponse>(`/products/getProducts`);

  return { products: data?.data?.products as Product[] };
}
