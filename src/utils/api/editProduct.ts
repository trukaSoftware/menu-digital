import { EditProductPayload, EditProductResponse } from '@/types/product';

import { put } from './put';

export const editProduct = async (payload: EditProductPayload) => {
  const editedProduct = await put<EditProductResponse, EditProductPayload>(
    `/api/products/editProduct`,
    { ...payload }
  );

  const editedPropduct = editedProduct.data.productData;
  return editedPropduct;
};
