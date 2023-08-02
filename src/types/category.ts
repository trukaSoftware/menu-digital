export interface CategoryPayload {
  name: string;
  companyId: string;
}

export interface CreateCategoryReturn {
  id: string;
  name: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryResponse {
  category: CreateCategoryReturn;
}
