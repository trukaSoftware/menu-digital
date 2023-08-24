import {
  AddNewImagePayload,
  AddNewImageResponse,
  DelImageResponse,
} from '@/types/imageApi';
import { ProductsImage } from '@/types/product';

import { ImageProps } from '../types';
import { del } from './del';
import { post } from './post';

export interface UpdateProductImageReturn {
  error: boolean;
  productsImages: ProductsImage[];
}

export const updateProductImage = async (
  productId: string,
  oldImageId: string,
  images: ImageProps[]
): Promise<UpdateProductImageReturn> => {
  const productNewImage = await post<AddNewImageResponse, AddNewImagePayload>(
    `/api/images/addNewImage`,
    {
      id: productId,
      images,
    }
  );

  const createdImageMessage = productNewImage.data.message;

  if (createdImageMessage === `Imagens adicionadas com sucesso`) {
    const delOldImage = await del<DelImageResponse>(
      `/api/images/deleteImage?id=${oldImageId}`
    );

    if (delOldImage.data.deleted === true) {
      return {
        error: false,
        productsImages: productNewImage.data.productsImages,
      };
    }
  }

  return { error: true, productsImages: productNewImage.data.productsImages };
};
