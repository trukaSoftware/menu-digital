export interface CategoryPayload {
  name: string;
  companyId: string | undefined;
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
