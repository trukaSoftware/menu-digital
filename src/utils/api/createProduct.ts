import { ProductPayload, CreateProductResponse } from '@/types/product';

import { post } from './post';

export const createProduct = async ({
  name,
  description,
  price,
  categoryId,
  companyId,
  images,
}: ProductPayload) => {
  const product = await post<CreateProductResponse, ProductPayload>(
    `/api/products/createProduct`,
    {
      name,
      description,
      price,
      categoryId,
      companyId,
      images,
    }
  );

  const createdProduct = product.data.product;

  return createdProduct;
};
