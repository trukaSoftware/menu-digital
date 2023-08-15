import { ProductResponse } from './product';

export interface CategoryPayload {
  name: string;
  companyId: string | undefined;
}

export interface GetCategoryReturn {
  id: string;
  name: string;
  categoryProducts: ProductResponse;
}

export interface CategoryReturn {
  id: string;
  name: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryResponse {
  category: CategoryReturn;
}

export interface GetCategoriesResponse {
  categories: CategoryReturn[];
}
