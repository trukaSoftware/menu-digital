import { ImageProps } from '@/utils/types';

import { Complement } from './complement';

export interface ProductResponse {
  products: Product[];
}

export interface CreateProductResponse {
  product: Product;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  discount?: number;
  companyId: string;
  productCategoriesId: string;
  createdAt: string;
  updatedAt: string;
  productsImages: ProductsImage[];
  productsComplements: ProductsComplement[];
}

export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  companyId: string;
  images?: ImageProps[];
}

export interface ProductsComplement {
  productsId: string;
  complementId: string;
  complements: Complement;
}

export interface ProductsImage {
  id: string;
  name: string;
  imageUrl: string;
  alt: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EditProductPayload {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  complementsId?: string[];
  complementsToRemove?: string[];
}

export interface EditProductResponse {
  productData: Product;
}
