import { ImageProps } from '../types';
import { del } from './del';
import { post } from './post';

export interface AddNewImagePayload {
  id: string;
  images: ImageProps[];
}

export interface AddNewImageResponse {
  message: string;
}

export interface DelImageResponse {
  deleted: boolean;
}

export const updateProductImage = async (
  productId: string,
  oldImageId: string,
  images: ImageProps[]
) => {
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
      return true;
    }
  }

  return false;
};
