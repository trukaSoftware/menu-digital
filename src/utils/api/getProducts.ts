import { Product, ProductResponse } from '@/types/product';

import api from '@/utils/api';

export async function getProducts(companyId: string) {
  const data = await api.get<ProductResponse>(
    `/products/getProducts?id=${companyId}`,
    {
      headers: {
        'Cache-Control': `no-cache`,
        Pragma: `no-cache`,
        Expires: `0`,
      },
    }
  );

  return { products: data?.data?.products as Product[] };
}
