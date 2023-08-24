import { ImageProps } from '@/utils/types';

import { ProductsImage } from './product';

export interface AddNewImagePayload {
  id: string;
  images: ImageProps[];
}

export interface AddNewImageResponse {
  message: string;
  productsImages: ProductsImage[];
}

export interface DelImageResponse {
  deleted: boolean;
}
